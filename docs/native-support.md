# Native support delivery (2.15)

`POST /api/support` accepts the four native forms. The schema and canonical email mapping live in `api/_lib/support.ts`; `npm run support:test` runs validation, failure, tagging and deduplication regressions. The existing website contact endpoint remains separate.

Messages go exclusively to support@wakesharp.app through the existing server-side `RESEND_API_KEY`. User addresses are Reply-To only. Never put the delivery key in mobile configuration, analytics or logs.

Persistent metadata uses WakeSharp's existing Supabase project. Apply the mobile repository migration `supabase/migrations/20261001014028_native_support_delivery.sql` before deploying this route. Tables in `support_private` have RLS and no client grants; the sole RPC requires a purpose-specific 256-bit server credential. Its SHA-256 hash is provisioned in `support_private.credentials`, not committed to Git. The server derives that credential as HMAC-SHA256(RESEND_API_KEY, `wakesharp-support-metadata-v1`). **When rotating RESEND_API_KEY, provision the new derived credential hash in the same release.** Unconfigured or mismatched credentials fail closed with 503.

The public Supabase publishable key only selects the project; it cannot authorize the private metadata operation. The RPC has a fixed empty search path and no dynamic SQL. It stores submission UUID, keyed payload hash, creation time and Resend receipt only. Rate budgets use HMAC network hashes, with 12 attempts/hour per IPv4 or IPv6 /64 and 96/hour per IPv6 /48. Counters expire after two days. Confirmed retries return the original receipt without another provider request. Receipt metadata is retained for future deduplication; ticket content is never stored in this database.

Native clients freeze their submission UUID and full payload on first send and persist that draft through timeouts/restarts. Resend receives `Idempotency-Key: support/<uuid>`. A timeout after delivery can be retried safely. If receipt persistence failed and more than 23 hours passed, the server returns `delivery_unknown` instead of risking another send beyond Resend's 24-hour cache. Editing a draft intentionally starts a new submission.

Deployment: run `npm run verify`, push the website main branch, wait for Vercel READY, then POST a clearly labeled test message and retry the same payload. Expect 201 then 200 with the same receipt. Inspect provider delivery and the support inbox. Deploy this endpoint before distributing mobile builds which use it.
