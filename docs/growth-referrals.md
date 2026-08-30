# Growth referral service

Status: merged to `main`, **not provisioned, migrated, or enabled**. Every route
answers 503 `referrals_disabled` until `REFERRALS_API_ENABLED=true`, and
registration answers 503 `attestation_not_configured` until a verifier exists,
so the deployed surface is inert.

**The mechanic is `Docs/marketing-execution/referral-spec.md` in the app repo.**
Twenty confirmed referrals unlock Wake Squad, and nothing else: no credits, no
ladder, no cap, no deadline, and **no entitlement of any kind**. A referral
confirms when the referred installation has claimed within 24 hours of first
open, completed onboarding, and recorded three qualifying mornings.

Approval boundary: Gate C is required before the API is enabled. Gate G is
required before any database migration, disclosure change, or client rollout.

## Service boundary

The app keeps essential alarms and all detailed morning data on-device. The optional service stores anonymous installation keys, referral codes and claims, signed full-credit-day assertions, squad unlocks, and an append-only audit. It has no WakeSharp user account and never accepts alarm labels, times, calendar or meeting contents, Sharpness results, sensor data, raw Play referrers, Apple attribution tokens, or attestation payloads for storage.

Every authenticated request uses:

- `Authorization: Install wsic_...`
- `X-WakeSharp-Timestamp`: Unix seconds, accepted within five minutes
- `X-WakeSharp-Nonce`: a fresh base64url value
- `X-WakeSharp-Signature`: Ed25519 or hardware-backed P-256 over `METHOD\nPATH\nTIMESTAMP\nNONCE\nSHA256(body)`

The server stores only an HMAC of the opaque credential. A request nonce can be used once. Before registration, the app obtains a ten-minute, single-use attestation challenge bound to the installation public key. App Attest initial attestations, later assertions, and Play Integrity standard requests must cryptographically bind their verdict to that challenge plus the platform, public key, app version, first-open instant, RevenueCat anonymous ID, and fresh-install eligibility. The private provider adapter returns only the known app identifier, provider key identifier, challenge hash, and bound request hash; a mismatch, replay, expiry, or missing configuration fails closed. Existing installations can invite, but only an attested fresh-install cohort may claim within its first 24 hours. There is no production bypass.

## Endpoints

| Route | Authentication | Purpose |
| --- | --- | --- |
| `POST /api/referrals/challenge` | Public key-bound, single-use challenge | Issue the nonce that App Attest or Play Integrity must cover. |
| `POST /api/referrals/register-install` | App Attest or Play Integrity | Register or re-attest an anonymous public key and return an opaque credential. |
| `POST /api/referrals/create` | Signed install request | Return the installation's stable ten-character code and `https://wakesharp.app/r/{code}`. |
| `POST /api/referrals/claim` | Signed install request | Claim one valid code within 24 hours of first open. |
| `POST /api/referrals/success` | Signed install request | Record an idempotent full-credit local day and re-evaluate confirmation. |
| `POST /api/referrals/onboarded` | Signed install request | Idempotently record that onboarding finished, and re-evaluate confirmation. |
| `POST /api/referrals/status` | Signed install request | Return bounded status without exposing another installation or provider identifier. |
| `POST /api/referrals/delete` | Signed install request plus explicit confirmation | Revoke and anonymize the installation and delete its success assertions. |
| `GET /r/{code}` | Public code | Universal/app-link destination; provides explicit iOS code copying and a Play referrer. |
| `GET/POST /api/internal/referrals/operations` | Operations bearer secret | Counts and 180-day pruning. No cron is scheduled. |

Apple aggregate attribution (`/api/attribution/apple`) is **not part of this
merge** and remains on `codex/growth-s3-organic` with the organic guides.

## Confirmation, and why it cannot be faked

The database accepts only `source=real_alarm`, full-credit assertions completed
within 30 minutes, deduplicated by event id and by local day. A claim confirms
when all three of these hold:

1. it was claimed within 24 hours of the referred installation's first open;
2. that installation has recorded `onboarding_completed_at`;
3. it has three qualifying mornings on distinct local days, at least 18 hours
   apart, all at or after the database-written `created_at`.

There is **no window** on the three mornings. Three in three days and three
across three weeks are the same outcome.

Three mornings on their own would stop nothing: backdating a phone's clock mints
three distinct local days in under a minute. What makes the bar real is that both
ends of the range are pinned to a clock the device does not own.

- **Floor** — `a.occurred_at >= v_install.created_at`, the registration instant
  the database wrote. This is what defeats backdating.

  ⚠️ **Not `first_open_at`.** That column looks like a server value and is not:
  it arrives in the `register-install` body (`firstOpenAt`) and is stored
  verbatim, bounded only against the future. Anchoring on it let an attacker
  register now while claiming a first open 23h59m ago, post two mornings at
  once, and confirm about twelve real hours later. `created_at` is absent from
  that INSERT's column list and untouched by its `ON CONFLICT` update, so it is
  `now()` as the database saw it.
- **Ceiling** — `p_occurred_at > p_now + interval '10 minutes'` is rejected,
  where `p_now` is the database's own `now()`. This is what defeats
  fast-forwarding. The route must therefore call `growth_record_success` with
  **six** arguments and let `p_now` default; passing a client timestamp into it
  would make the ceiling compare a value against itself. `contract.test.ts`
  pins that.
- **Spacing** — 18 hours between consecutive mornings, so three of them need
  36 hours of room between the floor and the ceiling.

Together: a confirmed referral requires an installation that has genuinely
existed for about a day and a half, whatever its clock claims. Verified against
Postgres 17 — a one-minute-old installation could bank only one of three
backdated mornings.

Spacing is judged on `occurred_at` rather than on arrival time, deliberately: a
phone that spent three days offline flushes its whole outbox at once and must
still qualify. A receipt-time rule would reject exactly that user while stopping
nothing an attacker does.

Confirmation is idempotent and order-independent. `growth_evaluate_claim_confirmation`
is the single place the answer is computed, and both the success path and the
onboarding path call it, because the third morning and the end of onboarding can
arrive in either order and whichever lands last must be the one that confirms.

## The unlock

At 20 confirmed claims the inviter gets a `growth_squad_unlocks` row, written
once under `ON CONFLICT DO NOTHING`. The inviter's installation row is locked
**before** the count, or two referrals confirming simultaneously would each read
19 and the twentieth would unlock nothing.

Progress is counted, not stored, and the count only ever goes up:
`confirmed_at` is set once and never cleared, and a pruned referred installation
**detaches** from its claim (`ON DELETE SET NULL`) instead of cascading it away,
so 180-day retention can never quietly take back progress somebody earned. The
claim survives the person, which is also the better privacy answer.

The inviter side needs an explicit guard rather than a detach, because their
claims and their unlock both cascade from their installation row: `growth_prune_expired`
skips any installation holding a `growth_squad_unlocks` row, or someone who
reached twenty and then stopped opening the app for 180 days would be silently
un-unlocked.

`pendingSignups` counts only claims that could still confirm — a detached
(pruned) or revoked (deleted) referee is excluded, or "still warming up" would
drift upward for years and quietly become a lie.

`/api/referrals/status` returns `confirmedSignups`, `pendingSignups` and
`squadUnlocked`. `pendingSignups` exists so the client's counter never reads as
broken: an inviter who sent eleven links and sees "4 of 20" needs to know the
other seven are still warming up.

`rewardsEnabled`, `qualified` and `ownRewardStatus` remain on the wire only so
already-shipped clients keep decoding the payload — their structs are
non-optional and a missing field is a hard decode failure, not a degraded
screen. There is no reward state left behind them.

## Gate C/G activation checklist

1. Provision a dedicated Neon database through the existing Vercel project and record region, owner and recovery policy.
2. Review and apply `db/migrations/001_growth_referrals.sql` to a non-production branch first; execute the concurrency, replay, deletion, retention and provider-timeout integration matrix.
3. Configure the private stateful App Attest and Play Integrity verifier. Verify invalid, expired, replayed and reinstall-risk verdicts on physical devices.
4. Add the Play signing certificate fingerprint to `assetlinks.json`; it is intentionally not guessed in this branch.
5. **Write the privacy disclosure for referrals against current `main`.** The
   staged wording on `codex/growth-s3-organic` predates the optional-accounts
   revision and must not be merged over it.
6. Deploy with `REFERRALS_API_ENABLED=false`; run contract and production-like smoke tests.
7. Gate C may enable the API for an internal cohort. Gate G separately governs
   migrations, deployment and each rollout step.

## Current blockers

In rough order of how much work each is:

- ~~The attestation verifier does not exist.~~ **Built 2026-08-30**, in the
  private app repo at `supabase/functions/attestation-verifier` (Supabase edge
  function, `verify_jwt = false`, authenticated by the shared
  `ATTESTATION_VERIFIER_SECRET` which is set here as a Vercel production secret).
  It verifies App Attest attestations and assertions in full — certificate chain
  to Apple's embedded root, nonce binding, app id, key identifier, and a
  strictly increasing signature counter held in `app_attest_keys`.

  Two things remain before it can pass a real device:
  - **A Play Integrity service account.** `PLAY_INTEGRITY_SERVICE_ACCOUNT` is
    unset, so the Android half answers 503 and only iOS can register.
  - **No real device has attested yet.** The suite covers every check against
    synthetic devices, which proves the logic and not Apple's actual bytes.
- No Neon database is provisioned and the migration has not been applied.
  `DATABASE_URL` is unset in production.
- The referral privacy disclosure has not been written against current `main`.
- The Play production signing fingerprint is unavailable without Play Console
  access, so `assetlinks.json` is not complete.
- Native clients are implemented on both platforms behind `growth_referrals_v1`
  (off). Physical-device verdict validation remains blocked on the verifier.
