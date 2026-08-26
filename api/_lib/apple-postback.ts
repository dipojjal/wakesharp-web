import { createPublicKey, verify } from 'node:crypto';
import { z } from 'zod';
import { decodeBase64url, sha256 } from './crypto.js';
import { ApiError } from './http.js';

const APPLE_KEYS = {
  'apple-cas-identifier/0': {
    environment: 'production' as const,
    der: 'MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEWdp8GPcGqmhgzEFj9Z2nSpQVddayaPe4FMzqM9wib1+aHaaIzoHoLN9zW4K8y4SPykE3YVK3sVqW6Af0lfx3gg==',
  },
  'apple-development-identifier/0': {
    environment: 'development' as const,
    der: 'MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAELeEDzpJEP+/qRSE5hJVC1p1J0ssUnQGMzBBbvnACBok8OVGGLgxL0myrKiy6lvRtSlLRsWit87i+vftD8AEqeQ==',
  },
  'apple-development-identifier/1': {
    environment: 'development' as const,
    der: 'MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE8YzdO7eM97s/IJ25kdW5CZ3A14USE5IJ5Ha/vhWaxI6UBI1ZxCEvjrKxVluVGe6qWwF1BDFq+QHqKfH5u+wxHQ==',
  },
} as const;

const headerSchema = z.object({ alg: z.literal('ES256'), kid: z.string() }).loose();
const itemIdentifierSchema = z.union([
  z.string().min(1).max(128),
  z.number().int().nonnegative().max(Number.MAX_SAFE_INTEGER),
]);
const payloadSchema = z.object({
  'impression-type': z.string().min(1).max(40),
  'ad-network-identifier': z.string().min(1).max(128),
  'source-identifier': z.string().regex(/^\d{2,4}$/).optional(),
  'advertised-item-identifier': itemIdentifierSchema,
  'publisher-item-identifier': itemIdentifierSchema.optional(),
  'marketplace-identifier': z.string().min(1).max(64).optional(),
  'country-code': z.string().regex(/^[A-Z]{2}$/).optional(),
  'conversion-type': z.string().min(1).max(40),
  'conversion-value': z.number().int().min(0).max(63).optional(),
  'coarse-conversion-value': z.enum(['low', 'medium', 'high']).optional(),
  'postback-identifier': z.uuid(),
  'did-win': z.boolean(),
  'postback-sequence-index': z.number().int().min(0).max(2),
}).loose();

export type ApplePostback = z.infer<typeof payloadSchema> & {
  keyIdentifier: keyof typeof APPLE_KEYS;
  environment: 'production' | 'development';
  payloadHash: Buffer;
};

function decodeJsonPart(value: string): unknown {
  try {
    return JSON.parse(decodeBase64url(value).toString('utf8'));
  } catch {
    throw new ApiError(400, 'invalid_apple_postback');
  }
}

export function verifyApplePostback(jws: string): ApplePostback {
  if (jws.length > 24_000) throw new ApiError(413, 'body_too_large');
  const parts = jws.split('.');
  if (parts.length !== 3 || parts.some((part) => !part)) throw new ApiError(400, 'invalid_apple_postback');
  const header = headerSchema.safeParse(decodeJsonPart(parts[0]));
  const payload = payloadSchema.safeParse(decodeJsonPart(parts[1]));
  if (!header.success || !payload.success || !(header.data.kid in APPLE_KEYS)) {
    throw new ApiError(400, 'invalid_apple_postback');
  }
  const keyIdentifier = header.data.kid as keyof typeof APPLE_KEYS;
  const selected = APPLE_KEYS[keyIdentifier];
  const allowDevelopment = process.env.VERCEL_ENV !== 'production'
    && process.env.ALLOW_APPLE_DEVELOPMENT_POSTBACKS === 'true';
  if (selected.environment !== 'production' && !allowDevelopment) {
    throw new ApiError(400, 'development_postback_disabled');
  }
  const expectedItem = process.env.APPLE_ADVERTISED_ITEM_IDENTIFIER;
  if (!expectedItem) throw new ApiError(503, 'apple_attribution_not_configured');
  if (String(payload.data['advertised-item-identifier']) !== expectedItem) {
    throw new ApiError(400, 'wrong_advertised_item');
  }

  let valid = false;
  try {
    const key = createPublicKey({ key: Buffer.from(selected.der, 'base64'), format: 'der', type: 'spki' });
    const signature = decodeBase64url(parts[2]);
    valid = signature.length === 64 && verify(
      'sha256',
      Buffer.from(`${parts[0]}.${parts[1]}`),
      { key, dsaEncoding: 'ieee-p1363' },
      signature,
    );
  } catch {
    valid = false;
  }
  if (!valid) throw new ApiError(400, 'invalid_apple_signature');
  return {
    ...payload.data,
    keyIdentifier,
    environment: selected.environment,
    payloadHash: sha256(parts[1]),
  };
}
