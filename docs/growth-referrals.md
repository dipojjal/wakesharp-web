# Growth referral and attribution service

Status: local implementation; not provisioned, deployed, migrated, enabled, or rewarded.

Approval boundary: Gate C is required before referral rewards are enabled. Gate G is required before any database migration, Vercel deployment, disclosure change, Apple copy-endpoint change, client rollout, or entitlement grant. The checked-in environment defaults keep the API and reward worker disabled.

## Service boundary

The app keeps essential alarms and all detailed morning data on-device. The optional service stores anonymous installation keys, referral codes and claims, signed full-credit-day assertions, reward state, aggregate Apple postbacks, and an append-only audit. It has no WakeSharp user account and never accepts alarm labels, times, calendar or meeting contents, Sharpness results, sensor data, raw Play referrers, Apple attribution tokens, or attestation payloads for storage.

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
| `POST /api/referrals/success` | Signed install request | Record an idempotent full-credit local day and evaluate the three-day chain. |
| `POST /api/referrals/status` | Signed install request | Return bounded status without exposing another installation or provider identifier. |
| `POST /api/referrals/delete` | Signed install request plus explicit confirmation | Revoke and anonymize the installation and delete its success assertions. |
| `GET /r/{code}` | Public code | Universal/app-link destination; provides explicit iOS code copying and a Play referrer. |
| `POST /api/attribution/apple` | Apple-signed JWS | Verify and deduplicate aggregate AdAttributionKit `jws-string` postbacks; normalize privacy-tiered outer conversion and country fields. |
| `GET/POST /api/internal/referrals/operations` | Operations bearer secret | Counts, bounded reward retry, and 180-day pruning. No cron is scheduled. |

## Qualification and fulfillment

The database accepts only `source=real_alarm`, full-credit assertions completed within 30 minutes. A unique event ID and local day prevent replay and makeup duplication. Qualification requires three distinct local days between first open and hour 168, with at least 18 hours between the chosen records.

Qualification creates two idempotent reward jobs. The inviter has a default five-reward rolling-30-day cap; the referred installation remains independently eligible. RevenueCat access is read before the first grant attempt and the desired expiry is persisted before the write:

- no active Plus or expired Plus: reward time plus 14 days;
- active finite Plus: latest known expiry plus 14 days;
- lifetime Plus: recognition only.

Retries reuse the persisted expiry and idempotency key, back off to six hours, and stop after eight attempts. If RevenueCat reports a conflict while a shorter finite entitlement is active, the job is visibly deferred until five minutes after that entitlement's expiry instead of burning through the retry budget; a later entitlement that already reaches the persisted target confirms the job without another write. Each client receives `confirmed=true` only when its own entitlement grant is confirmed, or its own lifetime entitlement is confirmed and recorded as recognition-only. An inviter blocked by the rolling cap is never reported as rewarded and does not prevent the referred installation from confirming independently. With `REFERRAL_REWARDS_ENABLED=false`, jobs remain queued and no RevenueCat request occurs.

## Gate C/G activation checklist

1. Provision a dedicated Neon database through the existing Vercel project and record region, owner and recovery policy.
2. Review and apply `db/migrations/001_growth_referrals.sql` to a non-production branch first; execute the concurrency, replay, deletion, retention and provider-timeout integration matrix.
3. Configure the private stateful App Attest and Play Integrity verifier. Verify invalid, expired, replayed and reinstall-risk verdicts on physical devices.
4. Add the Play signing certificate fingerprint to `assetlinks.json`; it is intentionally not guessed in this branch.
5. Configure RevenueCat API v2 project and entitlement resource IDs with a least-privilege server secret; verify free, paid, lifetime, timeout and retry fixtures.
6. Configure Apple's advertised-item identifier and copy endpoint, then verify production-signed postbacks. Development keys stay disabled in production.
7. Review and approve the staged privacy and terms changes. Confirm store privacy/data-safety disclosures separately.
8. Deploy with both toggles false; run contract and production-like smoke tests.
9. Gate C may enable the API for an internal cohort. Gate G separately governs migrations, deployment and each rollout step. Reward fulfillment remains false until the audit and entitlement checks pass.

## Current blockers

- No Neon resource or migration has been created or applied.
- No attestation-verifier credentials or physical-device verdicts exist.
- RevenueCat resource IDs and least-privilege secret are not configured.
- The Play production signing fingerprint is unavailable without Play Console access.
- Apple attribution copy-endpoint configuration has not been changed.
- Native iOS and Android referral screens, signed requests, outboxes, App Attest, Play Integrity, universal/app links, and explicit iOS code entry are implemented on the isolated Sprint 3 native branch. Physical-device verdict validation remains blocked on credentials and devices.
