import { z } from 'zod';
import { newReferralCode } from '../_lib/crypto.js';
import { query } from '../_lib/db.js';
import { authenticateInstallation } from '../_lib/install-auth.js';
import { endpoint, json, methodNotAllowed, readJson } from '../_lib/http.js';
import { assertReferralApiEnabled } from '../_lib/referrals.js';

const emptySchema = z.object({}).strict();

export function GET(): Response { return methodNotAllowed('POST'); }

export async function POST(request: Request): Promise<Response> {
  return endpoint(async () => {
    assertReferralApiEnabled();
    const { raw } = await readJson(request, emptySchema);
    const installation = await authenticateInstallation(request, raw);
    let rows = await query<{ code: string }>(
      'SELECT code FROM growth_referral_codes WHERE inviter_installation_id = $1',
      [installation.id],
    );
    for (let attempt = 0; !rows[0] && attempt < 6; attempt += 1) {
      rows = await query<{ code: string }>(
        `INSERT INTO growth_referral_codes (inviter_installation_id, code)
         VALUES ($1, $2)
         ON CONFLICT DO NOTHING
         RETURNING code`,
        [installation.id, newReferralCode()],
      );
      if (!rows[0]) {
        rows = await query<{ code: string }>(
          'SELECT code FROM growth_referral_codes WHERE inviter_installation_id = $1',
          [installation.id],
        );
      }
    }
    if (!rows[0]) throw new Error('referral_code_collision_limit');
    return json({ code: rows[0].code, url: `https://wakesharp.app/r/${rows[0].code}` });
  });
}
