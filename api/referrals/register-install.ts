import { z } from 'zod';
import { importInstallPublicKey, credentialDigest, newInstallCredential, sha256 } from '../_lib/crypto.js';
import { query } from '../_lib/db.js';
import { verifyAttestation, attestationSchema } from '../_lib/attestation.js';
import { ApiError, endpoint, json, methodNotAllowed, readJson } from '../_lib/http.js';
import { enforceRateLimit } from '../_lib/rate-limit.js';
import { assertReferralApiEnabled } from '../_lib/referrals.js';

const REGISTRATIONS_PER_NETWORK_PER_HOUR = 30;

const requestSchema = z.object({
  platform: z.enum(['ios', 'android']),
  country: z.string().regex(/^[A-Z]{2}$/).optional(),
  appVersion: z.string().min(1).max(32),
  firstOpenAt: z.iso.datetime({ offset: true }),
  publicKey: z.string().min(40).max(512),
  revenueCatAppUserId: z.string().min(1).max(128),
  claimEligible: z.boolean(),
  challengeId: z.uuid(),
  challenge: z.string().regex(/^[A-Za-z0-9_-]{43}$/),
  attestation: attestationSchema,
}).strict();

export function GET(): Response { return methodNotAllowed('POST'); }

export async function POST(request: Request): Promise<Response> {
  return endpoint(async () => {
    assertReferralApiEnabled();
    await enforceRateLimit(request, 'register-install', REGISTRATIONS_PER_NETWORK_PER_HOUR, 3600);
    const { value } = await readJson(request, requestSchema);
    const firstOpenAt = new Date(value.firstOpenAt);
    if (firstOpenAt.getTime() > Date.now() + 10 * 60_000 || firstOpenAt.getTime() < Date.UTC(2010, 0, 1)) {
      throw new ApiError(400, 'first_open_time_invalid');
    }
    const publicKey = importInstallPublicKey(value.publicKey);
    const publicKeyHash = sha256(publicKey.der);
    // The challenge is spent before verification, whatever its outcome (G2-02).
    // It used to be consumed only after a successful verification, so a failed
    // one left it reusable, and one challenge could drive unlimited calls to
    // the verifier and to Google's quota-limited decode endpoint.
    const consumed = await query<{ id: string }>(
      `UPDATE growth_attestation_challenges
          SET consumed_at = now()
        WHERE id = $1
          AND platform = $2
          AND public_key_hash = $3
          AND challenge_hash = $4
          AND consumed_at IS NULL
          AND expires_at > now()
        RETURNING id`,
      [value.challengeId, value.platform, publicKeyHash, sha256(value.challenge)],
    );
    if (!consumed[0]) throw new ApiError(401, 'attestation_challenge_invalid');
    // After the challenge, so the 409 is no oracle for whether an identity is
    // registered (G1-05), and only against live rows (G1-03). The apps now
    // send an id derived from the install key, not the RevenueCat id that
    // became the account's UUID after sign-in, so a second install of one
    // account no longer collides here.
    const existingIdentity = await query<{ public_key_hash: Uint8Array }>(
      `SELECT public_key_hash
         FROM growth_anonymous_installations
        WHERE revenuecat_app_user_id = $1
          AND revoked_at IS NULL
          AND expires_at > now()
        LIMIT 1`,
      [value.revenueCatAppUserId],
    );
    if (
      existingIdentity[0]
      && !Buffer.from(existingIdentity[0].public_key_hash).equals(Buffer.from(publicKeyHash))
    ) {
      throw new ApiError(409, 'installation_identity_conflict');
    }
    const attestation = await verifyAttestation(value);
    const credential = newInstallCredential();
    let rows: { id: string; expires_at: string }[];
    try {
      rows = await query<{ id: string; expires_at: string }>(
        `INSERT INTO growth_anonymous_installations (
          platform, country, app_version, public_key_spki, public_key_hash,
          credential_hash, attestation_provider, attestation_key_hash,
          revenuecat_app_user_id, first_open_at, claim_eligible
       ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       ON CONFLICT (public_key_hash) DO UPDATE
         SET credential_hash = EXCLUDED.credential_hash,
             app_version = EXCLUDED.app_version,
             country = COALESCE(growth_anonymous_installations.country, EXCLUDED.country),
             attestation_provider = EXCLUDED.attestation_provider,
             attestation_key_hash = EXCLUDED.attestation_key_hash,
             claim_eligible = growth_anonymous_installations.claim_eligible,
             last_activity_at = now(),
             expires_at = now() + interval '180 days'
       WHERE growth_anonymous_installations.platform = EXCLUDED.platform
         AND growth_anonymous_installations.revenuecat_app_user_id = EXCLUDED.revenuecat_app_user_id
         AND growth_anonymous_installations.revoked_at IS NULL
       RETURNING id, expires_at`,
        [
          value.platform, value.country ?? null, value.appVersion, publicKey.der, publicKeyHash,
          credentialDigest(credential), attestation.provider, attestation.keyHash,
          value.revenueCatAppUserId, firstOpenAt.toISOString(), value.claimEligible,
        ],
      );
    } catch (error) {
      if (
        typeof error === 'object'
        && error !== null
        && 'code' in error
        && error.code === '23505'
      ) {
        throw new ApiError(409, 'installation_identity_conflict');
      }
      throw error;
    }
    if (!rows[0]) throw new ApiError(409, 'installation_identity_conflict');
    await query(
      `INSERT INTO growth_referral_audit (installation_id, event_type, outcome)
       VALUES ($1, 'register_install', 'attestation_verified')`,
      [rows[0].id],
    );
    return json({ credential, expiresAt: rows[0].expires_at }, 201);
  });
}
