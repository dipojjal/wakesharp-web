import { z } from 'zod';
import { verifyApplePostback } from '../_lib/apple-postback.js';
import { query } from '../_lib/db.js';
import { ApiError, endpoint, json, methodNotAllowed } from '../_lib/http.js';

const postbackStringSchema = z.string().min(16).max(24_000);
const officialEnvelopeSchema = z.object({
  'jws-string': postbackStringSchema,
  'conversion-value': z.number().int().min(0).max(63).optional(),
  'coarse-conversion-value': z.enum(['low', 'medium', 'high']).optional(),
  'ad-interaction-type': z.enum(['click', 'view']).optional(),
  'country-code': z.string().regex(/^[A-Z]{2}$/).optional(),
}).loose();
const legacyEnvelopeSchema = z.object({ postback: postbackStringSchema }).strict();
const envelopeSchema = z.union([officialEnvelopeSchema, legacyEnvelopeSchema]);

export function GET(): Response { return methodNotAllowed('POST'); }

export async function POST(request: Request): Promise<Response> {
  return endpoint(async () => {
    if (process.env.APPLE_ATTRIBUTION_ENABLED !== 'true') throw new ApiError(503, 'apple_attribution_disabled');
    const contentType = request.headers.get('content-type')?.split(';', 1)[0]?.trim();
    const raw = await request.text();
    if (raw.length > 25_000) throw new ApiError(413, 'body_too_large');
    let jws = raw.trim();
    let envelopeConversionValue: number | undefined;
    let envelopeCoarseValue: 'low' | 'medium' | 'high' | undefined;
    let envelopeCountryCode: string | undefined;
    if (contentType === 'application/json') {
      let parsed: unknown;
      try { parsed = JSON.parse(raw); } catch { throw new ApiError(400, 'invalid_json'); }
      const envelope = envelopeSchema.safeParse(parsed);
      if (!envelope.success) throw new ApiError(400, 'invalid_request');
      if ('jws-string' in envelope.data) {
        jws = envelope.data['jws-string'];
        envelopeConversionValue = envelope.data['conversion-value'];
        envelopeCoarseValue = envelope.data['coarse-conversion-value'];
        envelopeCountryCode = envelope.data['country-code'];
      } else {
        jws = envelope.data.postback;
      }
    } else if (contentType !== 'text/plain' && contentType !== 'application/jwt') {
      throw new ApiError(415, 'postback_content_type_unsupported');
    }
    const postback = verifyApplePostback(jws);
    if (
      envelopeConversionValue !== undefined
      && postback['conversion-value'] !== undefined
      && envelopeConversionValue !== postback['conversion-value']
    ) throw new ApiError(400, 'apple_postback_value_mismatch');
    if (
      envelopeCoarseValue !== undefined
      && postback['coarse-conversion-value'] !== undefined
      && envelopeCoarseValue !== postback['coarse-conversion-value']
    ) throw new ApiError(400, 'apple_postback_value_mismatch');
    if (
      envelopeCountryCode !== undefined
      && postback['country-code'] !== undefined
      && envelopeCountryCode !== postback['country-code']
    ) throw new ApiError(400, 'apple_postback_value_mismatch');
    const conversionValue = postback['conversion-value'] ?? envelopeConversionValue ?? null;
    const coarseConversionValue = postback['coarse-conversion-value'] ?? envelopeCoarseValue ?? null;
    const countryCode = postback['country-code'] ?? envelopeCountryCode ?? null;
    const rows = await query<{ postback_identifier: string }>(
      `INSERT INTO growth_apple_attribution_aggregates (
          postback_identifier, key_identifier, environment, impression_type,
          ad_network_identifier, source_identifier, advertised_item_identifier,
          publisher_item_identifier, marketplace_identifier, country_code,
          conversion_type, conversion_value, coarse_conversion_value, did_win,
          postback_sequence_index, payload_hash
       ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
       ON CONFLICT (postback_identifier) DO NOTHING
       RETURNING postback_identifier`,
      [
        postback['postback-identifier'], postback.keyIdentifier, postback.environment,
        postback['impression-type'], postback['ad-network-identifier'],
        postback['source-identifier'] ?? null, String(postback['advertised-item-identifier']),
        postback['publisher-item-identifier'] === undefined ? null : String(postback['publisher-item-identifier']),
        postback['marketplace-identifier'] ?? null,
        countryCode, postback['conversion-type'],
        conversionValue, coarseConversionValue,
        postback['did-win'], postback['postback-sequence-index'], postback.payloadHash,
      ],
    );
    return json({ accepted: true, duplicate: !rows[0] });
  });
}
