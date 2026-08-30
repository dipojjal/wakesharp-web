import { z } from 'zod';
import { query } from '../_lib/db.js';
import { authenticateInstallation } from '../_lib/install-auth.js';
import { ApiError, endpoint, json, methodNotAllowed, readJson } from '../_lib/http.js';
import { assertReferralApiEnabled } from '../_lib/referrals.js';

/**
 * The second of the three confirmation conditions: this installation finished
 * onboarding.
 *
 * Idempotent by construction — the first call stamps `onboarding_completed_at`
 * and every later one is a no-op that still re-evaluates the claim. That matters
 * because the third morning and the end of onboarding can arrive in either
 * order, and a client retrying after a dropped response must not be able to
 * strand itself permanently unconfirmed.
 */
const requestSchema = z.object({}).strict();

const KNOWN_ERRORS = new Set(['installation_unavailable']);

export function GET(): Response { return methodNotAllowed('POST'); }

export async function POST(request: Request): Promise<Response> {
  return endpoint(async () => {
    assertReferralApiEnabled();
    const { raw } = await readJson(request, requestSchema);
    const installation = await authenticateInstallation(request, raw);
    try {
      const rows = await query<{ recorded: boolean; confirmed: boolean }>(
        'SELECT * FROM growth_record_onboarding_completed($1)',
        [installation.id],
      );
      const result = rows[0];
      if (!result) throw new Error('onboarding_missing');
      return json({ recorded: result.recorded, confirmed: result.confirmed },
        result.recorded ? 201 : 200);
    } catch (error) {
      const message = error instanceof Error ? error.message : '';
      const code = [...KNOWN_ERRORS].find((item) => message.includes(item));
      if (code) throw new ApiError(401, code);
      throw error;
    }
  });
}
