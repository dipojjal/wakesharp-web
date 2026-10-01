# Growth referral service

Status: the 2.16 server work is on `feature/2.16-referral-conversions`. The
service is **not provisioned, migrated, or enabled**. Every signed route answers
503 `referrals_disabled` until `REFERRALS_API_ENABLED=true`, `/config` answers
`referrals: false` until then, and registration answers 503
`attestation_not_configured` until a verifier exists, so the deployed surface
is inert.

Approval boundary: Gate C is required before the API is enabled. Gate G is
required before any database migration, disclosure change, or client rollout.

## The mechanic (2.16)

**One referred friend who starts any trial or paid plan unlocks the Squats
mission for the person who invited them, permanently.** That is the whole
reward:

- The friend (the referee) gets nothing for using a code and pays the normal
  price.
- There are no credits, no Plus time, no entitlement and no cash. The unlock
  is a mission inside an app the inviter already pays for.
- Qualifying plans are the annual plan with its 7-day trial, monthly, and
  annual. Legacy grace, restores, promotional grants and family-shared
  purchases never count: the client excludes them (`ReferralConversion.signal`
  in the app repo), and the server's purchase-time floor refuses old purchases
  whatever the client says.
- "Permanent" means a refund, the referee deleting their data, and the
  referee's retention pruning all leave the unlock in place. The client keeps a
  monotonic local unlock as well, backed up with the optional account.

The app-side mechanic is `Docs/marketing-execution/referral-spec.md` in the
app repo.

### The 2.13 mechanic is dormant

2.13 shipped "twenty confirmed referrals unlock Wake Squad", where confirmed
meant onboarding plus three qualifying mornings. Its tables, functions and
routes (`/success`, `/onboarded`, `growth_evaluate_claim_confirmation`,
`growth_squad_unlocks`) stay compiled and untouched, and `/status` still
returns its fields because shipped clients decode them as required. Nothing
feeds it: 2.16 clients stop calling `/success` and `/onboarded` (wake-up times
no longer buy anything, which is also data minimization), and 2.13 to 2.15
clients only talk to this service when the PostHog flag `growth_referrals_v1`
is on. **Keep `growth_referrals_v1` and `growth_wake_squad_v1` off forever.**
Turning either on would wake old clients that show Wake Squad copy and send
mornings. See "Wake Squad (2.13, dormant)" below for how that path works.

## Trust model

The referee's **attested, signed installation** reports its own purchase with
`POST /api/referrals/converted`. There is no RevenueCat webhook, no RevenueCat
secret and no receipt validation on this server. That is enough because:

- the reward saturates at one Squats unlock per inviter installation, and is a
  mission for someone who already pays;
- forging a conversion takes a hooked client on a second, attested, fresh
  installation that claimed the code within 24 hours of its first open.

Five server guards make even that narrow:

1. **A claim must exist.** No claim is 409 `no_referral_claim`. The server only
   ever stores purchase facts for referred installations.
2. **The purchase is new.** `purchasedAt`, the original purchase date, must be
   at or after `first_open_at - 10 minutes` and at most the database's
   `now() + 10 minutes`. This refuses restores, renewals of older
   subscriptions and lifetime purchases made before this installation existed.
   `first_open_at` comes from the client, but a claim only exists within 24
   hours of it, so backdating it past a day makes the claim impossible.
3. **The store matches the platform.** iOS with `app_store`, Android with
   `play_store`.
4. **Sandbox is gated.** Sandbox purchases count only while
   `REFERRALS_ACCEPT_SANDBOX=true` (TestFlight and internal-track QA).
5. **One purchase converts one claim.** The client sends an optional
   `purchaseRef`; the server stores only an HMAC of it under
   `REFERRAL_CREDENTIAL_PEPPER`, behind a unique index.

Possible later hardening, not needed now: send the StoreKit 2 transaction JWS
(verifiable offline against Apple's root, no secret) and the Play purchase
signature (verifiable with the public licence key).

Watch `claimToConversionMedianMinutesLastSevenDays` and the sandbox counts in
`GET /api/internal/referrals/operations`. The paywall sits inside onboarding,
so genuine friends also convert minutes after claiming: the tell is a sudden
shift or burst, not the level.

## Service boundary

The app keeps essential alarms and all detailed morning data on-device. The
optional service stores anonymous installation keys, referral codes and
claims, the conversion facts below, mission unlocks, and an append-only audit.
It has no WakeSharp user account and never accepts alarm labels, times,
calendar or meeting contents, Sharpness results, sensor data, raw Play
referrers, Apple attribution tokens, or attestation payloads for storage.

For a conversion it stores exactly: when it was recorded (`converted_at`, the
database's clock), `trial` or `paid`, `app_store` or `play_store`,
`production` or `sandbox`, and the HMAC of the purchase reference. **No product
id, transaction id, purchase date, price, receipt or RevenueCat id is stored.**
`productId` is validated (`com.wakesharp.app.plus.*`) and dropped; `purchasedAt`
is checked and dropped.

Every authenticated request uses:

- `Authorization: Install wsic_...`
- `X-WakeSharp-Timestamp`: Unix seconds, accepted within five minutes
- `X-WakeSharp-Nonce`: a fresh base64url value
- `X-WakeSharp-Signature`: Ed25519 or hardware-backed P-256 over `METHOD\nPATH\nTIMESTAMP\nNONCE\nSHA256(body)`

The server stores only an HMAC of the opaque credential. A request nonce can be used once. Before registration, the app obtains a ten-minute, single-use attestation challenge bound to the installation public key. App Attest initial attestations, later assertions, and Play Integrity standard requests must cryptographically bind their verdict to that challenge plus the platform, public key, app version, first-open instant, install identifier, and fresh-install eligibility. The API still names that field `revenueCatAppUserId`, but from app 2.13 the apps send `install-` and the first 16 bytes of SHA-256 over the install public key's DER (`ReferralPolicy.installIdentifier` in the app repo): RevenueCat's id becomes the account's UUID after sign-in, which made every later install of the same account a 409 and stored the UUID beside wake-up times. The private provider adapter returns only the known app identifier, provider key identifier, challenge hash, and bound request hash; a mismatch, replay, expiry, or missing configuration fails closed. Existing installations can invite, but only an attested fresh-install cohort may claim within its first 24 hours. There is no production bypass.

From 2.16 the apps register lazily: only when the Refer a Friend screen opens,
a code is pending or being entered, a claimed installation holds a pending
conversion, or an inviter's status refresh is due. Registration costs an App
Attest key or a Play Integrity token, so this protects both budgets.

## Endpoints

| Route | Authentication | Purpose |
| --- | --- | --- |
| `GET /api/referrals/config?platform=ios\|android` | None (cacheable, no database) | **2.16.** The programme switch: `{protocol, referrals, squatsLock}`. |
| `POST /api/referrals/challenge` | Public key-bound, single-use challenge | Issue the nonce that App Attest or Play Integrity must cover. |
| `POST /api/referrals/register-install` | App Attest or Play Integrity | Register or re-attest an anonymous public key and return an opaque credential. |
| `POST /api/referrals/create` | Signed install request | Return the installation's stable ten-character code and `https://wakesharp.app/r/{code}`. |
| `POST /api/referrals/claim` | Signed install request | Claim one valid code within 24 hours of first open. |
| `POST /api/referrals/converted` | Signed install request | **2.16.** The referee started a trial or paid plan: convert its claim and unlock Squats for the inviter. |
| `POST /api/referrals/status` | Signed install request | Bounded status without exposing another installation or provider identifier. |
| `POST /api/referrals/delete` | Signed install request plus explicit confirmation | Revoke and anonymize the installation. 2.16 apps do not call it yet. |
| `POST /api/referrals/success` | Signed install request | Pre-2.16 builds only (dormant): an idempotent full-credit local day. |
| `POST /api/referrals/onboarded` | Signed install request | Pre-2.16 builds only (dormant): onboarding finished. |
| `GET /r/{code}` | Public code | Universal/app-link destination; explicit iOS code copying ("Have a referral code?" on the plans screen) and a Play referrer. |
| `GET/POST /api/internal/referrals/operations` | Operations bearer secret | Counts, conversion metrics, and a manual 180-day prune. |
| `GET /api/internal/referrals/prune` | `CRON_SECRET` (Vercel cron) | The daily retention run at 03:17 UTC: `growth_prune_expired()` and the rate-limit rows. |

Errors keep the envelope `{"error": "<code>"}`. `vercel.json`'s
`api/referrals/*.ts` entry covers every route above, `/config` and
`/converted` included; the only cron is the retention run.

Apple aggregate attribution (`/api/attribution/apple`) is **not part of this
merge** and remains on `codex/growth-s3-organic` with the organic guides.

### `GET /api/referrals/config`

```json
{"protocol": 1, "referrals": true, "squatsLock": true}
```

- `referrals` is `REFERRALS_API_ENABLED === 'true'` and `platform` listed in
  `REFERRALS_PLATFORMS` (comma list, default `ios,android`). A missing or
  unknown platform is `false`.
- `squatsLock` is `REFERRALS_SQUATS_LOCK !== 'false'` (default `true`).
- `Cache-Control: public, max-age=300, s-maxage=300`. Any other method is 405.
- It never touches the database and is not behind the kill switch, so it
  answers "off" while everything else is 503.

Clients cache the answer for six hours and treat "never fetched" or a failed
fetch as referrals off and Squats locked. Turning referrals off therefore
reaches every client within about six hours and five minutes; the signed
routes stop at once, because their 503 is immediate.

### `POST /api/referrals/converted`

```json
{"kind": "trial", "productId": "com.wakesharp.app.plus.annual", "store": "app_store",
 "environment": "production", "purchasedAt": "2026-10-01T07:12:00Z", "purchaseRef": "<43 base64url>"}
```

| Field | Rule |
| --- | --- |
| `kind` | `trial` or `paid` |
| `productId` | `^com\.wakesharp\.app\.plus\.[a-z0-9_.:-]{1,80}$`; validated, never stored |
| `store` | `app_store` or `play_store` |
| `environment` | `production` or `sandbox` |
| `purchasedAt` | ISO-8601 with offset; the original purchase date of the earliest qualifying purchase |
| `purchaseRef` | optional; `^[A-Za-z0-9_-]{43}$`, base64url SHA-256 of `"wakesharp.referral.conversion.v1\n" + store + "\n" + storeTransactionId`, no padding. `null` is read as absent. |

The schema is strict: an unknown key is 400 `invalid_request`. The route runs
`assertReferralApiEnabled`, then the schema, then `authenticateInstallation`,
then `growth_record_conversion` with **seven** arguments so `p_now` is the
database's `now()` (pinned by `conversion.test.ts`, as `success.ts` is by
`contract.test.ts`).

| Answer | When | Client |
| --- | --- | --- |
| 201 `{"claimId", "recorded": true, "converted": true}` | First record | Done |
| 200 `{"claimId", "recorded": false, "converted": true}` | Replay; writes nothing, not even an audit row | Done |
| 401 `installation_unavailable` | Revoked or unknown installation | Keep |
| 409 `no_referral_claim` | This installation never claimed a code | Keep |
| 409 `conversion_store_mismatch` | Store does not match the platform | Drop |
| 409 `conversion_sandbox_rejected` | Sandbox while not accepted | Drop |
| 409 `conversion_time_invalid` | Outside `[first_open_at - 10 min, now + 10 min]` | Drop |
| 409 `purchase_already_counted` | The purchase reference converted another claim | Drop |
| 400 `invalid_request` | Schema refusal | Drop |
| 5xx, network | | Keep |

### `POST /api/referrals/status`

Unchanged request (`{}`). Every existing field stays, because shipped clients
decode them as required. 2.16 adds, all decoded as optional by new clients (a
missing field means "unknown", never "relock"):

- `referrals[].converted`: the claim has `converted_at`. The list is newest
  first, `LIMIT 50` (was 10).
- `convertedSignups`: the inviter's claims with `converted_at`, forever.
- `awaitingConversion`: the inviter's unconverted claims whose referee
  installation still exists and is not revoked (the same filter as
  `pendingSignups`).
- `squatsUnlocked`: a `growth_mission_unlocks` row exists for this
  installation and `squats`.

The inviter never learns whether a referee chose a trial or a paid plan: only
`converted`.

## Database (`db/migrations/003_referral_conversions.sql`)

Apply `003` after `001` and `002`. It is one transaction and nothing in it
enables the API. It is not re-runnable: a second application fails on its
first `ALTER` and rolls back, changing nothing. Privileges follow 001 and 002:
no `GRANT` or `REVOKE`, the API connects as the owning role, and every function
is `SECURITY DEFINER` with `search_path` pinned.

- **Conversion columns on `growth_referral_claims`:** `converted_at`,
  `conversion_kind`, `conversion_store`, `conversion_environment`,
  `conversion_ref_hash`, with an all-or-nothing CHECK
  (`growth_claims_conversion_whole`). The reference stays optional on a
  converted claim. A partial unique index on `conversion_ref_hash`, plus two
  inviter indexes for `/status` and the counts.
- **`growth_mission_unlocks(installation_id, mission_id)`** with
  `CHECK (mission_id IN ('squats'))`, the only durable artefact of a
  conversion.
- **`growth_record_conversion`**, in order: lock the installation
  (`installation_unavailable`); store matches platform; sandbox gate
  (`p_accept_sandbox IS NOT TRUE` refuses, so a missing flag fails closed);
  purchase time window; lock the claim (`no_referral_claim`); replay returns
  `(claim, false)` and writes nothing; update the claim (a unique violation
  becomes `purchase_already_counted`); lock the inviter and, unless it is
  revoked, insert the unlock `ON CONFLICT DO NOTHING`; refresh activity on the
  live rows; audit `conversion/recorded` with kind, store and environment, and
  `mission_unlock/unlocked` when the insert happened. Two referees of one
  inviter converting at once yield one unlock row.
- **`growth_prune_expired`**: 001's body plus one guard, so an installation
  holding a mission unlock is never pruned (as for squad unlocks).
- **`growth_delete_installation`**: 001's body plus two statements. As a
  referee, its claim's `conversion_ref_hash` is cleared while the conversion
  and the inviter's unlock stay; a reinstall cannot reuse the purchase,
  because its first open is later than the original purchase. As an inviter,
  its own mission unlock goes: a revoked installation can never authenticate
  to read it, and keeping it would exempt the anonymized row from retention
  forever.

`conversion.test.ts` pins all of this statically, including that the prune and
delete bodies are 001's apart from the additions. `conversion-sql.test.ts` runs
the full SQL matrix (claim then convert, convert without a claim, replay,
ordered checks, sandbox gate, time window, reference reuse, revoked inviter,
two concurrent referees, both deletions, retention, the CHECKs) when
`GROWTH_TEST_DATABASE_URL` names a branch with 001 to 003 applied:

```sh
GROWTH_TEST_DATABASE_URL='postgres://…staging branch…' npm run growth:test
```

It refuses to run when that URL equals `DATABASE_URL`, creates its own rows
only, and deletes them afterwards.

## Retention and deletion

- Installations: deleted 180 days after the last authenticated request
  (`expires_at`), except one holding a squad or mission unlock, which is kept
  so the unlock stays permanent. The row is anonymous either way.
- Claims: a referee's pruning or deletion detaches or anonymizes its side, and
  the claim (with `converted_at` and the conversion facts) survives with the
  inviter, so an inviter's earned progress never goes back down. An inviter's
  pruning or deletion cascades their claims away.
- Audit: 180 days. Request nonces: ten minutes. Rate-limit rows: two days.
- `growth_delete_installation` revokes and anonymizes: random keys, no country,
  the code revoked, assertions deleted, the referee purchase reference cleared,
  its own mission unlock removed; the anonymized row then ages out after 180
  days.

The privacy policy section for all of this is drafted in
`src/templates/PrivacyBody.astro` behind `REFERRAL_DISCLOSURE.published`
(`src/templates/legal-copy.ts`), which is `false`: nothing renders until the
owner reviews and publishes it.

## Environment variables

| Variable | Values | Effect |
| --- | --- | --- |
| `REFERRALS_API_ENABLED` | `true` / anything else | Kill switch. Anything but exactly `true` makes every signed route 503 `referrals_disabled` and `/config` say `referrals: false`. Set last. |
| `REFERRALS_PLATFORMS` | comma list, default `ios,android` | Which platforms `/config` turns on. Use `ios` alone until Play Integrity works. |
| `REFERRALS_SQUATS_LOCK` | `false` / anything else (default locked) | `false` lifts the Squats lock on every client with no app release (App Review fallback). |
| `REFERRALS_ACCEPT_SANDBOX` | `true` / anything else | Accept sandbox conversions. QA only; set `false` before the store release. |
| `REFERRAL_CREDENTIAL_PEPPER` | 32+ random bytes | HMAC key for install credentials, rate-limit buckets and purchase references. **Never rotate after launch**: rotation invalidates every credential and lets an already-counted purchase count again. |
| `DATABASE_URL` | Neon connection string | Set by the Vercel Neon integration. Without it, database routes answer 503 `referrals_not_configured`. |
| `ATTESTATION_VERIFIER_URL`, `ATTESTATION_VERIFIER_SECRET` | | The private App Attest / Play Integrity verifier. Without them registration is 503. |
| `WAKESHARP_IOS_APP_ID`, `WAKESHARP_ANDROID_PACKAGE` | | Expected app identities for attestation. |
| `CRON_SECRET` | random | Authenticates the daily prune cron. Without it the route refuses. |
| `REFERRAL_OPERATIONS_SECRET` | random | Bearer secret for `/api/internal/referrals/operations`. |
| `GROWTH_TEST_DATABASE_URL` | staging branch URL | Local only: enables `conversion-sql.test.ts`. Never production. |

## Activation checklist (in order)

1. **Decide and approve.** The two copy items in the 2.16 plan, and a Gate C/G
   scope entry in the decision log.
2. **Apple.** Enable App Attest on App ID `com.wakesharp.app` before the app's
   entitlement commit merges, or the Xcode Cloud export fails.
3. **Google.** Create the Play Integrity service account in Cloud project
   `346044402255`, set `PLAY_INTEGRITY_SERVICE_ACCOUNT` on the Supabase
   `attestation-verifier`, confirm the Play Console link, and verify that
   `assetlinks.json` carries the Play app-signing certificate.
4. **Neon.** Provision a dedicated database through the Vercel project (sets
   `DATABASE_URL`) and record region, owner and recovery policy. Create a
   `staging` branch, apply `001`, `002` and `003` in order, run
   `GROWTH_TEST_DATABASE_URL=… npm run growth:test`, then apply the same three
   to the main branch.
5. **Vercel Production environment.** Set `REFERRAL_CREDENTIAL_PEPPER`,
   confirm `ATTESTATION_VERIFIER_URL` and `_SECRET`, set `CRON_SECRET`,
   `REFERRAL_OPERATIONS_SECRET`, `REFERRALS_SQUATS_LOCK=true`,
   `REFERRALS_PLATFORMS=ios,android` (or `ios` until step 3 is done),
   `REFERRALS_ACCEPT_SANDBOX=true` for QA, and `REFERRALS_API_ENABLED=false`.
   Deploy, then smoke-test: `/api/referrals/config?platform=ios` answers
   `referrals: false`, signed routes answer 503, operations answers with the
   secret. Only then set `REFERRALS_API_ENABLED=true`.
6. **Privacy.** Review and publish the "Inviting friends" section (set
   `REFERRAL_DISCLOSURE.published` and `PRIVACY.lastUpdated`), before or with
   step 5's enablement. Re-confirm the App Privacy and Play Data safety
   answers (App functionality).
7. **PostHog.** Keep `growth_referrals_v1` and `growth_wake_squad_v1` off
   permanently.
8. **QA.** TestFlight and the internal track with sandbox purchases, then set
   `REFERRALS_ACCEPT_SANDBOX=false` before the store release.
9. **App Review notes.** The code unlocks nothing for the person typing it,
   Squats is only reachable inside a paid app, and the referrer earns it;
   `REFERRALS_SQUATS_LOCK=false` lifts the lock without a release.
10. **Squats release gate.** Flip it per platform only when that platform's
    referrals are live, or set `REFERRALS_SQUATS_LOCK=false` until then;
    otherwise Squats shows locked with no way to unlock it.

## Current blockers

- No Neon database is provisioned and no migration has been applied.
  `DATABASE_URL` is unset in production.
- The attestation verifier exists (built 2026-08-30, private app repo,
  `supabase/functions/attestation-verifier`) but no real device has attested
  yet, and Android needs the Play Integrity service account (step 3).
- The referral privacy section is drafted, not published.
- `assetlinks.json` must be confirmed against the Play app-signing
  certificate.

## Wake Squad (2.13, dormant)

Kept for reference while its code stays compiled. A claim confirms when it was
made within 24 hours of the referred installation's first open, that
installation recorded `onboarding_completed_at`, and it has three qualifying
mornings on distinct local days, at least 18 hours apart, all at or after the
database-written `created_at`. Twenty confirmed claims write a
`growth_squad_unlocks` row under `ON CONFLICT DO NOTHING`, with the inviter row
locked before the count.

The two anchors that made the three mornings unforgeable stay pinned by
`contract.test.ts`:

- **Floor**: `a.occurred_at >= v_install.created_at`, the registration instant
  the database wrote. **Not `first_open_at`**, which arrives in the
  `register-install` body and is stored verbatim; anchoring on it let an
  attacker backdate a first open by 23h59m and confirm in about twelve real
  hours.
- **Ceiling**: `p_occurred_at > p_now + interval '10 minutes'` is rejected,
  with `p_now` the database's `now()`; `success.ts` calls
  `growth_record_success` with six arguments so it defaults.

`growth_evaluate_claim_confirmation` is the single place the answer is
computed, called from both the success and onboarding paths, because either can
land last.

## 2.13 fixes (`db/migrations/002_referrals_2_13.sql`)

Apply `002` after `001`. It re-creates two functions and adds one table and
one index; nothing in it enables the API.

- **An existing claim answers first (G1-01).** The same code is idempotent at
  any age; another code is `different_referral_already_claimed`, never
  `claim_window_expired`.
- **One live installation per App Attest key (G2-01, G2-V02).** A partial
  unique index on `attestation_key_hash`; the verifier binds each App Attest
  key to one install key as well. `verifyAttestation` no longer stores a
  client-chosen `keyId` when the verifier returns none (Android).
- **Rate limits (G1-05, G2-02).** `/challenge` and `/register-install` allow 30
  calls per caller network per hour: an IPv4 address, or for IPv6 both the /64
  (one line, 30) and the /48 (a site or a carrier pool, 8 times that). Each
  budget is keyed by an HMAC under `REFERRAL_CREDENTIAL_PEPPER`, so no address
  is stored. An install key holds at most 3 live challenges. `register-install`
  spends the challenge before calling the verifier, whatever the outcome, and
  checks the identity only after that, against live rows.
- **A replayed success assertion writes nothing (G1-05).**
- **Only a verdict is a refusal.** `verifyAttestation` answers 401
  `attestation_failed` or `attestation_key_unknown` only when the verifier
  says so about the device or its key. Anything else is 503
  `attestation_unavailable`, because iOS replaces its App Attest key on a
  refusal.
- **Retention runs (G1-04).** The daily Vercel cron calls
  `/api/internal/referrals/prune`. Set `CRON_SECRET` or the route refuses;
  before `DATABASE_URL` exists it prunes nothing.
