import { z } from 'zod';
import { safeEqual, sha256 } from './crypto.js';
import { ApiError } from './http.js';

export const attestationSchema = z.object({
  provider: z.enum(['app_attest', 'play_integrity']),
  kind: z.enum(['initial', 'assertion']),
  token: z.string().min(16).max(32_000),
  keyId: z.string().min(1).max(512).optional(),
}).strict();

const verifierResponseSchema = z.object({
  valid: z.literal(true),
  provider: z.enum(['app_attest', 'play_integrity']),
  appId: z.string().min(1).max(256),
  keyId: z.string().min(1).max(512).optional(),
  challengeHash: z.string().regex(/^[a-f0-9]{64}$/),
  requestHash: z.string().regex(/^[a-f0-9]{64}$/),
}).strict();

export function attestationBinding(input: {
  challenge: string;
  platform: 'ios' | 'android';
  publicKey: string;
  appVersion: string;
  firstOpenAt: string;
  revenueCatAppUserId: string;
  claimEligible: boolean;
}): string {
  return [
    input.challenge,
    input.platform,
    input.publicKey,
    input.appVersion,
    input.firstOpenAt,
    input.revenueCatAppUserId,
    String(input.claimEligible),
  ].join('\n');
}

export interface VerifiedAttestation {
  provider: 'app_attest' | 'play_integrity';
  keyHash: Buffer | null;
}

export async function verifyAttestation(input: {
  platform: 'ios' | 'android';
  publicKey: string;
  appVersion: string;
  firstOpenAt: string;
  revenueCatAppUserId: string;
  claimEligible: boolean;
  challengeId: string;
  challenge: string;
  attestation: z.infer<typeof attestationSchema>;
}, fetcher: typeof fetch = fetch): Promise<VerifiedAttestation> {
  const expectedProvider = input.platform === 'ios' ? 'app_attest' : 'play_integrity';
  if (input.attestation.provider !== expectedProvider) throw new ApiError(400, 'attestation_platform_mismatch');

  // Provider-specific cryptographic validation is isolated behind a private,
  // authenticated verifier because App Attest assertion state and Play
  // Integrity service-account credentials must not live in a public client.
  // There is deliberately no development bypass in this production endpoint.
  const verifierUrl = process.env.ATTESTATION_VERIFIER_URL;
  const verifierSecret = process.env.ATTESTATION_VERIFIER_SECRET;
  if (!verifierUrl || !verifierSecret) throw new ApiError(503, 'attestation_not_configured');

  let response: Response;
  try {
    response = await fetcher(verifierUrl, {
      method: 'POST',
      headers: { Authorization: `Bearer ${verifierSecret}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
      signal: AbortSignal.timeout(8_000),
    });
  } catch {
    throw new ApiError(503, 'attestation_unavailable');
  }
  if (!response.ok) {
    // Only the verifier's verdict on the device or its key is a refusal: a 401
    // carrying `attestation_failed` or `attestation_key_unknown`. The iOS
    // client treats either as "this key is no good" and replaces a Secure
    // Enclave key, spending Apple's per-device key-creation and attestation
    // limits. Everything else is not about the device and must never be
    // reported as though it were: a 5xx, and every other non-2xx, such as a
    // secret that does not match the verifier's (401 without a verdict), a
    // wrong URL (404), a gateway's 429, a request the verifier could not read
    // (400) or a challenge spent twice. `attestation_unavailable` means "not
    // your device; this retries on its own" (2.13 review).
    const verdict = await response.json().catch(() => null) as { error?: unknown } | null;
    const code = typeof verdict?.error === 'string' ? verdict.error : '';
    if (response.status === 401 && (code === 'attestation_failed' || code === 'attestation_key_unknown')) {
      throw new ApiError(401, code);
    }
    throw new ApiError(503, 'attestation_unavailable');
  }
  // A 200 that is not the verifier's answer (a wrong ATTESTATION_VERIFIER_URL
  // serving a page, a proxy's own reply, a contract drift) or that names
  // another provider or app is our configuration, not a verdict on the
  // device, and must never read as `attestation_failed`: the iOS client
  // replaces its App Attest key on that code (2.13 review).
  const parsed = verifierResponseSchema.safeParse(await response.json().catch(() => null));
  if (!parsed.success || parsed.data.provider !== expectedProvider) {
    console.error('attestation verifier answered 200 without a valid verdict');
    throw new ApiError(503, 'attestation_unavailable');
  }

  const expectedAppId = input.platform === 'ios'
    ? (process.env.WAKESHARP_IOS_APP_ID ?? 'W4HPRW2JT4.com.wakesharp.app')
    : (process.env.WAKESHARP_ANDROID_PACKAGE ?? 'com.wakesharp.app');
  if (parsed.data.appId !== expectedAppId) {
    console.error('attestation verifier is configured for another app id');
    throw new ApiError(503, 'attestation_unavailable');
  }
  const expectedChallengeHash = sha256(input.challenge);
  const verifiedChallengeHash = Buffer.from(parsed.data.challengeHash, 'hex');
  if (!safeEqual(expectedChallengeHash, verifiedChallengeHash)) {
    throw new ApiError(401, 'attestation_challenge_mismatch');
  }
  const expectedRequestHash = sha256(attestationBinding(input));
  const verifiedRequestHash = Buffer.from(parsed.data.requestHash, 'hex');
  if (!safeEqual(expectedRequestHash, verifiedRequestHash)) {
    throw new ApiError(401, 'attestation_request_mismatch');
  }
  // Only a key the verifier derived itself (G2-01). Android has no provider
  // key, and falling back to the client's `keyId` stored the hash of a value
  // the device chose as if it were an attested key.
  const keyId = parsed.data.keyId;
  return { provider: expectedProvider, keyHash: keyId ? sha256(keyId) : null };
}
