import {
  createHash,
  createHmac,
  createPublicKey,
  randomBytes,
  timingSafeEqual,
  verify,
} from 'node:crypto';
import { ApiError } from './http.js';

export const base64url = (value: Buffer): string => value.toString('base64url');
export const decodeBase64url = (value: string): Buffer => Buffer.from(value, 'base64url');
export const sha256 = (value: string | Buffer): Buffer => createHash('sha256').update(value).digest();
export const sha256Hex = (value: string | Buffer): string => sha256(value).toString('hex');

export function credentialDigest(credential: string): Buffer {
  const pepper = process.env.REFERRAL_CREDENTIAL_PEPPER;
  if (!pepper || pepper.length < 32) throw new ApiError(503, 'referrals_not_configured');
  return createHmac('sha256', pepper).update(credential).digest();
}

export function newInstallCredential(): string {
  return `wsic_${base64url(randomBytes(32))}`;
}

export function newAttestationChallenge(): string {
  return base64url(randomBytes(32));
}

export function newReferralCode(): string {
  const alphabet = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  const bytes = randomBytes(10);
  return [...bytes].map((byte) => alphabet[byte % alphabet.length]).join('');
}

export function importInstallPublicKey(encoded: string) {
  let der: Buffer;
  try {
    der = decodeBase64url(encoded);
  } catch {
    throw new ApiError(400, 'invalid_public_key');
  }
  if (der.length < 32 || der.length > 256) throw new ApiError(400, 'invalid_public_key');
  try {
    const key = createPublicKey({ key: der, format: 'der', type: 'spki' });
    const isEd25519 = key.asymmetricKeyType === 'ed25519';
    const isP256 = key.asymmetricKeyType === 'ec'
      && key.asymmetricKeyDetails?.namedCurve === 'prime256v1';
    if (!isEd25519 && !isP256) throw new Error('wrong key type');
    return { key, der, algorithm: isEd25519 ? 'ed25519' as const : 'p256' as const };
  } catch {
    throw new ApiError(400, 'invalid_public_key');
  }
}

export function canonicalInstallRequest(
  method: string,
  path: string,
  timestamp: string,
  nonce: string,
  rawBody: string,
): string {
  return [method.toUpperCase(), path, timestamp, nonce, sha256Hex(rawBody)].join('\n');
}

export function verifyInstallSignature(publicKeyDer: Buffer, message: string, encodedSignature: string): boolean {
  try {
    const key = createPublicKey({ key: publicKeyDer, format: 'der', type: 'spki' });
    const signature = decodeBase64url(encodedSignature);
    if (key.asymmetricKeyType === 'ed25519') {
      return signature.length === 64 && verify(null, Buffer.from(message), key, signature);
    }
    if (key.asymmetricKeyType === 'ec'
        && key.asymmetricKeyDetails?.namedCurve === 'prime256v1') {
      return signature.length >= 64 && signature.length <= 80
        && verify('sha256', Buffer.from(message), key, signature);
    }
    return false;
  } catch {
    return false;
  }
}

export function safeEqual(left: Buffer, right: Buffer): boolean {
  return left.length === right.length && timingSafeEqual(left, right);
}
