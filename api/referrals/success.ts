import { z } from 'zod';
import { query } from '../_lib/db.js';
import { authenticateInstallation } from '../_lib/install-auth.js';
import { ApiError, endpoint, json, methodNotAllowed, readJson } from '../_lib/http.js';
import { assertReferralApiEnabled } from '../_lib/referrals.js';

const requestSchema = z.object({
  eventId: z.uuid(),
  localDay: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  occurredAt: z.iso.datetime({ offset: true }),
  timezoneOffsetMinutes: z.number().int().min(-840).max(840),
  missionCompletedMinutes: z.number().int().min(0).max(30),
  fullCredit: z.literal(true),
  source: z.literal('real_alarm'),
}).strict();

const KNOWN_ERRORS = new Set([
  'installation_unavailable', 'success_time_invalid', 'local_day_mismatch', 'success_conflict',
]);

export function GET(): Response { return methodNotAllowed('POST'); }

export async function POST(request: Request): Promise<Response> {
  return endpoint(async () => {
    assertReferralApiEnabled();
    const { value, raw } = await readJson(request, requestSchema);
    const installation = await authenticateInstallation(request, raw);
    try {
      const rows = await query<{
        assertion_id: string;
        recorded: boolean;
        qualified: boolean;
        referral_claim_id: string | null;
      }>(
        'SELECT * FROM growth_record_success($1, $2, $3, $4, $5, $6)',
        [
          installation.id, value.eventId, value.localDay, value.occurredAt,
          value.timezoneOffsetMinutes, value.missionCompletedMinutes,
        ],
      );
      const result = rows[0];
      if (!result) throw new Error('success_missing');
      // `reward` is a shape, not a reward: referrals grant no entitlement now.
      // It stays on the wire because shipped clients decode it as a required
      // field, and `grants` is always empty. `confirmed` means the referral
      // cleared the whole bar on this assertion.
      return json({
        assertionId: result.assertion_id,
        recorded: result.recorded,
        qualified: result.qualified,
        reward: { confirmed: result.qualified, rewardsEnabled: true, grants: [] },
      }, result.recorded ? 201 : 200);
    } catch (error) {
      const message = error instanceof Error ? error.message : '';
      const code = [...KNOWN_ERRORS].find((item) => message.includes(item));
      if (code) throw new ApiError(code === 'installation_unavailable' ? 401 : 409, code);
      throw error;
    }
  });
}
