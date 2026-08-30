import { z } from 'zod';
import { importInstallPublicKey, newAttestationChallenge, sha256 } from '../_lib/crypto.js';
import { query } from '../_lib/db.js';
import { endpoint, json, methodNotAllowed, readJson } from '../_lib/http.js';
import { assertReferralApiEnabled } from '../_lib/referrals.js';

const requestSchema = z.object({
  platform: z.enum(['ios', 'android']),
  appVersion: z.string().min(1).max(32),
  publicKey: z.string().min(40).max(512),
}).strict();

export function GET(): Response { return methodNotAllowed('POST'); }

export async function POST(request: Request): Promise<Response> {
  return endpoint(async () => {
    assertReferralApiEnabled();
    const { value } = await readJson(request, requestSchema);
    const publicKey = importInstallPublicKey(value.publicKey);
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
