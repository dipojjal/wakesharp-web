import { z } from 'zod';
import { query } from '../_lib/db.js';
import { authenticateInstallation } from '../_lib/install-auth.js';
import { endpoint, json, methodNotAllowed, readJson } from '../_lib/http.js';
import { assertReferralApiEnabled, grantState } from '../_lib/referrals.js';

const emptySchema = z.object({}).strict();

export function GET(): Response { return methodNotAllowed('POST'); }

export async function POST(request: Request): Promise<Response> {
  return endpoint(async () => {
    assertReferralApiEnabled();
    const { raw } = await readJson(request, emptySchema);
    const installation = await authenticateInstallation(request, raw);
    const claims = await query<{ claim_id: string; role: 'inviter' | 'referred'; qualified: boolean }>(
      `SELECT c.id AS claim_id,
              CASE WHEN c.inviter_installation_id = $1 THEN 'inviter' ELSE 'referred' END AS role,
              EXISTS (SELECT 1 FROM growth_reward_grants g WHERE g.claim_id = c.id) AS qualified
         FROM growth_referral_claims c
        WHERE c.inviter_installation_id = $1 OR c.referred_installation_id = $1
        ORDER BY c.claimed_at DESC
        LIMIT 10`,
      [installation.id],
    );
    const referrals = [];
    for (const claim of claims) {
      const state = claim.qualified
        ? await grantState(claim.claim_id, claim.role)
        : { confirmed: false, rewardsEnabled: process.env.REFERRAL_REWARDS_ENABLED === 'true', grants: [] };
      const ownGrant = state.grants.find((grant) => grant.role === claim.role);
      referrals.push({
        role: claim.role,
        qualified: claim.qualified,
        confirmed: state.confirmed,
        ownRewardStatus: ownGrant?.status ?? null,
      });
    }
    return json({ rewardsEnabled: process.env.REFERRAL_REWARDS_ENABLED === 'true', referrals });
  });
}
