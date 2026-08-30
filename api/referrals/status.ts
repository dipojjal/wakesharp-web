import { z } from 'zod';
import { query } from '../_lib/db.js';
import { authenticateInstallation } from '../_lib/install-auth.js';
import { endpoint, json, methodNotAllowed, readJson } from '../_lib/http.js';
import { assertReferralApiEnabled, inviterProgress } from '../_lib/referrals.js';

const emptySchema = z.object({}).strict();

export function GET(): Response { return methodNotAllowed('POST'); }

export async function POST(request: Request): Promise<Response> {
  return endpoint(async () => {
    assertReferralApiEnabled();
    const { raw } = await readJson(request, emptySchema);
    const installation = await authenticateInstallation(request, raw);

    const claims = await query<{
      role: 'inviter' | 'referred';
      confirmed: boolean;
    }>(
      `SELECT CASE WHEN c.inviter_installation_id = $1 THEN 'inviter' ELSE 'referred' END AS role,
              (c.confirmed_at IS NOT NULL) AS confirmed
         FROM growth_referral_claims c
        WHERE c.inviter_installation_id = $1 OR c.referred_installation_id = $1
        ORDER BY c.claimed_at DESC
        LIMIT 10`,
      [installation.id],
    );
    const progress = await inviterProgress(installation.id);

    return json({
      // `rewardsEnabled`, `qualified` and `ownRewardStatus` are retained purely
      // so already-shipped clients keep decoding this payload — their structs
      // are non-optional and a missing field is a hard decode failure, not a
      // degraded screen. Referrals grant no entitlement any more, so there is
      // no reward state left to report: `rewardsEnabled` is simply "the
      // programme is on", which any 200 from here already implies, and
      // `qualified` now carries the same meaning as `confirmed`.
      rewardsEnabled: true,
      referrals: claims.map((claim) => ({
        role: claim.role,
        qualified: claim.confirmed,
        confirmed: claim.confirmed,
        ownRewardStatus: null,
      })),
      ...progress,
    });
  });
}
