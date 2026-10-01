import { query } from '../_lib/db.js';
import { authenticateInstallation } from '../_lib/install-auth.js';
import { ApiError, endpoint, json, methodNotAllowed, readJson } from '../_lib/http.js';
import {
  acceptsSandboxConversions,
  assertReferralApiEnabled,
  conversionRefDigest,
  conversionRequestSchema,
} from '../_lib/referrals.js';

/**
 * The referred installation started a trial or a paid plan (2.16). The first
 * record marks its claim converted and unlocks Squats for the inviter; every
 * later call is a replay that answers 200 and writes nothing.
 *
 * The client keeps a pending conversion on `no_referral_claim`, any 5xx and
 * network errors, and drops it on every other 409 and on 400
 * `invalid_request`, so the split below is part of the contract.
 */
const CONFLICTS = new Set([
  'no_referral_claim', 'conversion_store_mismatch', 'conversion_sandbox_rejected',
  'conversion_time_invalid', 'purchase_already_counted',
]);

export function GET(): Response { return methodNotAllowed('POST'); }

export async function POST(request: Request): Promise<Response> {
  return endpoint(async () => {
    assertReferralApiEnabled();
    const { value, raw } = await readJson(request, conversionRequestSchema);
    const installation = await authenticateInstallation(request, raw);
    const refHash = value.purchaseRef ? conversionRefDigest(value.purchaseRef) : null;
    try {
      // Seven arguments, never eight: p_now must default to the database's
      // now(), or the purchase-time ceiling would compare against the caller.
      const rows = await query<{ claim_id: string; recorded: boolean }>(
        'SELECT * FROM growth_record_conversion($1, $2, $3, $4, $5, $6, $7)',
        [
          installation.id, value.kind, value.store, value.environment,
          value.purchasedAt, refHash, acceptsSandboxConversions(),
        ],
      );
      const result = rows[0];
      if (!result) throw new Error('conversion_missing');
      return json({
        claimId: result.claim_id,
        recorded: result.recorded,
        converted: true,
      }, result.recorded ? 201 : 200);
    } catch (error) {
      const message = error instanceof Error ? error.message : '';
      if (message.includes('installation_unavailable')) throw new ApiError(401, 'installation_unavailable');
      const code = [...CONFLICTS].find((item) => message.includes(item));
      if (code) throw new ApiError(409, code);
      throw error;
    }
  });
}
