import { z } from 'zod';
import { importInstallPublicKey, newAttestationChallenge, sha256 } from '../_lib/crypto.js';
import { query } from '../_lib/db.js';
import { ApiError, endpoint, json, methodNotAllowed, readJson } from '../_lib/http.js';
import { enforceRateLimit } from '../_lib/rate-limit.js';
import { assertReferralApiEnabled } from '../_lib/referrals.js';

/** A real install asks once per registration attempt. */
const CHALLENGES_PER_NETWORK_PER_HOUR = 30;
/** Live, unspent challenges one install key may hold at a time. */
const LIVE_CHALLENGES_PER_KEY = 3;

const requestSchema = z.object({
  platform: z.enum(['ios', 'android']),
  appVersion: z.string().min(1).max(32),
  publicKey: z.string().min(40).max(512),
}).strict();

export function GET(): Response { return methodNotAllowed('POST'); }

export async function POST(request: Request): Promise<Response> {
  return endpoint(async () => {
    assertReferralApiEnabled();
    // Every call inserted a row for anyone, without limit (G1-05).
    await enforceRateLimit(request, 'challenge', CHALLENGES_PER_NETWORK_PER_HOUR, 3600);
    const { value } = await readJson(request, requestSchema);
    const publicKey = importInstallPublicKey(value.publicKey);
    const live = await query<{ count: string }>(
      `SELECT count(*)::text AS count
         FROM growth_attestation_challenges
        WHERE public_key_hash = $1 AND consumed_at IS NULL AND expires_at > now()`,
      [sha256(publicKey.der)],
    );
    if (Number(live[0]?.count ?? 0) >= LIVE_CHALLENGES_PER_KEY) throw new ApiError(429, 'challenge_limit');
    const challenge = newAttestationChallenge();
    const rows = await query<{ id: string; expires_at: string }>(
      `INSERT INTO growth_attestation_challenges (
          platform, public_key_hash, challenge_hash
       ) VALUES ($1, $2, $3)
       RETURNING id, expires_at`,
      [value.platform, sha256(publicKey.der), sha256(challenge)],
    );
    const issued = rows[0];
    if (!issued) throw new Error('attestation_challenge_missing');
    return json({
      challengeId: issued.id,
      challenge,
      expiresAt: issued.expires_at,
    }, 201);
  });
}
