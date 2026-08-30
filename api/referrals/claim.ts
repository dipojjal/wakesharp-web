import { z } from 'zod';
import { query } from '../_lib/db.js';
import { authenticateInstallation } from '../_lib/install-auth.js';
import { ApiError, endpoint, json, methodNotAllowed, readJson } from '../_lib/http.js';
import { assertReferralApiEnabled } from '../_lib/referrals.js';

const requestSchema = z.object({
  code: z.string().trim().toUpperCase().regex(/^[23456789ABCDEFGHJKLMNPQRSTUVWXYZ]{10}$/),
}).strict();

const KNOWN_ERRORS = new Set([
  'claim_window_expired', 'referral_code_invalid', 'self_referral',
  'different_referral_already_claimed', 'installation_unavailable',
  'claim_install_ineligible',
]);

export function GET(): Response { return methodNotAllowed('POST'); }

export async function POST(request: Request): Promise<Response> {
  return endpoint(async () => {
    assertReferralApiEnabled();
    const { value, raw } = await readJson(request, requestSchema);
    const installation = await authenticateInstallation(request, raw);
    try {
      const rows = await query<{
        claim_id: string;
        already_claimed: boolean;
      }>('SELECT * FROM growth_claim_referral($1, $2)', [installation.id, value.code]);
      const claim = rows[0];
      if (!claim) throw new Error('claim_missing');
      // No `qualificationDeadline`: there is no clock on the three mornings.
      return json({
        claimId: claim.claim_id,
        alreadyClaimed: claim.already_claimed,
      }, claim.already_claimed ? 200 : 201);
    } catch (error) {
      const message = error instanceof Error ? error.message : '';
      const code = [...KNOWN_ERRORS].find((item) => message.includes(item));
      if (code) throw new ApiError(code === 'referral_code_invalid' ? 404 : 409, code);
      throw error;
    }
  });
}
