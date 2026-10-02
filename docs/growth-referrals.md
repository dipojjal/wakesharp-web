# Growth referral service

Status (2026-10-01): **enabled in production for iOS.** The schema is applied
to the WakeSharp Supabase project, the operations GET answers counts, and
`REFERRALS_API_ENABLED=true` with `REFERRALS_PLATFORMS=ios`, so
`/config?platform=ios` answers `referrals: true` and Android stays
`referrals: false` until Play Integrity works (activation step 3). No 2.16
client has shipped yet, so nothing calls these routes in the wild; 2.13-2.15
clients never read `/config`. Setting `REFERRALS_API_ENABLED` to anything but
`true` makes every signed route 503 `referrals_disabled` again.

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

## Database (WakeSharp Supabase project, `growth` schema)

The referral database is the WakeSharp Supabase project (`wakesharp`,
`ltwchaijzcvncxzexdnk`), not a database of its own. The schema is one migration
in the app repository, `supabase/migrations/20261001153843_growth_referrals.sql`:
this repository's former `db/migrations/001`, `002` and `003`, in order and
unchanged in substance, placed in a private `growth` schema. It is applied with
the rest of the project's migrations (`supabase db push`), never from here, so
the project's migration history stays the one `Docs/SUPABASE-MIGRATIONS.md`
describes.

- **Placement.** `growth` is not a PostgREST schema, so nothing in it is
  reachable through the project's REST API. Schema, tables, sequences and
  functions are revoked from `public`, `anon` and `authenticated`; row-level
  security is on for every table as a second wall.
- **The API's role.** The routes connect as `referrals_api` through the
  transaction pooler (port 6543). The migration creates it `NOLOGIN` with
  `search_path = growth`, usage on the schema, DML on its tables, and execute
  on its functions, plus one permissive policy per table. Nothing else. The
  owner gives it a password at activation, so no credential is in a migration.
- **TLS.** `api/_lib/db.ts` always verifies the server certificate. The
  pooler's certificate chains to Supabase Root 2021 CA, not a public root, so
  that root is bundled in `api/_lib/supabase-root-ca.ts` (SHA-256
  `80:70:25:AD…E6:CA:FA`, valid until 2031-04-26) and trusted alongside the
  public roots. `DATABASE_CA_CERT` is optional and only adds roots, such as a
  successor before it is bundled; a PEM whose line breaks a paste mangled is
  rebuilt, and one that does not parse is dropped with a warning. It was an
  environment variable until 2026-10-01, when a mangled paste was silently
  ignored by Node and every query failed `SELF_SIGNED_CERT_IN_CHAIN`. An
  `sslmode` in the URL is stripped so it can never downgrade any of this.
- **Tests.** The SQL's text contracts are
  `tools/supabase/test_growth_referrals_contract.py` and its behaviour is the
  pgTAP suite `supabase/tests/growth_referrals_test.sql`, both in the app
  repository's CI. This repository keeps the routes' side and the matrix
  below.

The conversion SQL itself (formerly `003`):

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

The app repository's contract test pins all of this statically, including
that the prune and delete bodies are 001's apart from the additions.
`conversion-sql.test.ts` here runs the full SQL matrix (claim then convert,
convert without a claim, replay, ordered checks, sandbox gate, time window,
reference reuse, revoked inviter, two concurrent referees, both deletions,
retention, the CHECKs) when `GROWTH_TEST_DATABASE_URL` names a Supabase branch
or a local `supabase start` with the app's migrations applied:

```sh
GROWTH_TEST_DATABASE_URL='postgres://…supabase branch…' npm run growth:test
```

It refuses to run when that URL equals `DATABASE_URL`, creates its own rows
only, and deletes them afterwards.

### When a database route answers `internal_error`

The function log line `[growth-api] unhandled error class: <class> code: <code>`
names the cause without any request data:

| Code | Cause |
|---|---|
| `SELF_SIGNED_CERT_IN_CHAIN` | The pooler's root is not trusted: a build from before the bundled root, or Supabase rotated its root (set `DATABASE_CA_CERT`). |
| `28P01` | Wrong password for `referrals_api` in `DATABASE_URL`. |
| `XX000` | The pooler found no such tenant or user: the wrong pooler host (`aws-1` instead of `aws-0`), or a user without the `.ltwchaijzcvncxzexdnk` suffix. |
| `ENETUNREACH`, `ENOTFOUND`, `ETIMEDOUT` | Not the pooler: usually the IPv6-only direct `db.<ref>.supabase.co` host. |
| `42P01`, `42501` | Connected, but the role is wrong: no `search_path = growth`, or missing grants. Re-check the migration's placement section. |

Check a URL locally before setting it in Vercel; this connects exactly as
production does and prints the host, user and outcome, never the URL:

```sh
DATABASE_URL='postgresql://…' npx tsx scripts/check-referrals-db.ts
```

The authenticated operations GET (`/api/internal/referrals/operations`)
touches every table, so it is the end-to-end check after any change here.

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

The privacy policy section for all of this, "Inviting friends" in
`src/templates/PrivacyBody.astro`, is published (2026-10-01,
`REFERRAL_DISCLOSURE.published` in `src/templates/legal-copy.ts`). Every claim
in it was checked against the code first; the comment above the section lists
the behaviour it relies on (lazy registration, the derived install identifier
only, masked code fields, no automatic deep-link capture on Android). Change
the text whenever a route, the schema, the verifier or either app's invite
code changes what is collected or how long it is kept.

## Environment variables

| Variable | Values | Effect |
| --- | --- | --- |
| `REFERRALS_API_ENABLED` | `true` / anything else | Kill switch. Anything but exactly `true` makes every signed route 503 `referrals_disabled` and `/config` say `referrals: false`. Set last. |
| `REFERRALS_PLATFORMS` | comma list, default `ios,android` | Which platforms `/config` turns on. Use `ios` alone until Play Integrity works. |
| `REFERRALS_SQUATS_LOCK` | `false` / anything else (default locked) | `false` lifts the Squats lock on every client with no app release (App Review fallback). |
| `REFERRALS_ACCEPT_SANDBOX` | `true` / anything else | Accept sandbox conversions. QA only; set `false` before the store release. |
| `REFERRAL_CREDENTIAL_PEPPER` | 32+ random bytes | HMAC key for install credentials, rate-limit buckets and purchase references. **Never rotate after launch**: rotation invalidates every credential and lets an already-counted purchase count again. |
| `DATABASE_URL` | Supabase transaction-pooler URI as `referrals_api` | `postgresql://referrals_api.ltwchaijzcvncxzexdnk:<password>@aws-0-us-east-1.pooler.supabase.com:6543/postgres`, from Dashboard > Connect > Transaction pooler with the user swapped. The project is on the `aws-0` pooler (`aws-1` answers "tenant/user not found"), and the direct `db.<ref>.supabase.co` host is IPv6 only, which Vercel cannot reach. Without it, database routes answer 503 `referrals_not_configured`. |
| `DATABASE_CA_CERT` | PEM, optional | Extra roots to trust. Supabase's current root is bundled, so leave it unset unless Supabase rotates its root before an update bundles the new one. TLS is verified either way. |
| `ATTESTATION_VERIFIER_URL`, `ATTESTATION_VERIFIER_SECRET` | | The private App Attest / Play Integrity verifier. Without them registration is 503. |
| `WAKESHARP_IOS_APP_ID`, `WAKESHARP_ANDROID_PACKAGE` | | Expected app identities for attestation. |
| `CRON_SECRET` | random | Authenticates the daily prune cron. Without it the route refuses. |
| `REFERRAL_OPERATIONS_SECRET` | random | Bearer secret for `/api/internal/referrals/operations`. |
| `GROWTH_TEST_DATABASE_URL` | Supabase branch or local URL | Local only: enables `conversion-sql.test.ts`. Never production. |

## Activation checklist (in order)

1. **Decide and approve.** The two copy items in the 2.16 plan, and a Gate C/G
   scope entry in the decision log.
2. **Apple.** Enable App Attest on App ID `com.wakesharp.app` before the app's
   entitlement commit merges, or the Xcode Cloud export fails.
3. **Google.** Create the Play Integrity service account in Cloud project
   `346044402255`, set `PLAY_INTEGRITY_SERVICE_ACCOUNT` on the Supabase
   `attestation-verifier`, confirm the Play Console link, and verify that
   `assetlinks.json` carries the Play app-signing certificate.
4. **Supabase.** The schema is applied (2026-10-01, the app repository's
   `20261001153843_growth_referrals.sql` and its follow-up). Give the API's
   role a password in the SQL editor,
   `alter role referrals_api with login password '<new random password>';`,
   and build `DATABASE_URL` from the transaction pooler string with that user
   and password. No certificate is needed: Supabase's root is bundled.
   Optionally run `GROWTH_TEST_DATABASE_URL=… npm run growth:test` against a
   Supabase branch first.
5. **Vercel Production environment.** Set `REFERRAL_CREDENTIAL_PEPPER`,
   confirm `ATTESTATION_VERIFIER_URL` and `_SECRET`, set `CRON_SECRET`,
   `REFERRAL_OPERATIONS_SECRET`, `REFERRALS_SQUATS_LOCK=true`,
   `REFERRALS_PLATFORMS=ios,android` (or `ios` until step 3 is done),
   `REFERRALS_ACCEPT_SANDBOX=true` for QA, and `REFERRALS_API_ENABLED=false`.
   Deploy, then smoke-test: `/api/referrals/config?platform=ios` answers
   `referrals: false`, signed routes answer 503, operations answers with the
   secret. Only then set `REFERRALS_API_ENABLED=true`.
6. **Privacy.** Done 2026-10-01: the "Inviting friends" section is published
   and `PRIVACY.lastUpdated` moved. Still the owner's: re-confirm the App
   Privacy and Play Data safety answers (App functionality) before 2.16 is
   submitted.
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

- Steps 4 and 5 are done (2026-10-01): `DATABASE_URL` reaches the `aws-0`
  pooler as `referrals_api`, the operations GET answers counts, and the API
  is enabled for iOS. The privacy section (step 6) is published; the App
  Privacy and Play Data safety answers still need the owner's re-check.
- iOS registration needs the app's App Attest entitlement (the Gate C
  activation commit, after App Attest is enabled on the App ID).
- The attestation verifier exists (built 2026-08-30, private app repo,
  `supabase/functions/attestation-verifier`) but no real device has attested
  yet, and Android needs the Play Integrity service account (step 3).
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

## 2.13 fixes (formerly `db/migrations/002_referrals_2_13.sql`)

Part of the `growth` migration, after `001`'s statements. It re-creates two
functions and adds one table and one index; nothing in it enables the API.

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
