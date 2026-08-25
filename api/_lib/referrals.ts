import { query } from './db.js';
import { ApiError } from './http.js';
import { fulfillRewardGrant, isConfirmedGrantStatus } from './revenuecat.js';

export function assertReferralApiEnabled(): void {
  if (process.env.REFERRALS_API_ENABLED !== 'true') throw new ApiError(503, 'referrals_disabled');
}

export interface GrantStatus extends Record<string, unknown> {
  id: string;
  role: 'inviter' | 'referred';
  status: string;
}

export async function grantState(claimId: string, role: 'inviter' | 'referred'): Promise<{
  confirmed: boolean;
  rewardsEnabled: boolean;
  grants: Array<{ role: string; status: string }>;
}> {
  const rewardsEnabled = process.env.REFERRAL_REWARDS_ENABLED === 'true';
  let rows = await query<GrantStatus>(
    `SELECT id, role, status
       FROM growth_reward_grants
      WHERE claim_id = $1
      ORDER BY role`,
    [claimId],
  );
  if (rewardsEnabled) {
    await Promise.all(rows
      .filter((grant) => grant.status === 'queued' || grant.status === 'failed')
      .map((grant) => fulfillRewardGrant(grant.id)));
    rows = await query<GrantStatus>(
      `SELECT id, role, status
         FROM growth_reward_grants
        WHERE claim_id = $1
        ORDER BY role`,
      [claimId],
    );
  }
  const ownGrant = rows.find((grant) => grant.role === role);
  return {
    confirmed: rewardsEnabled && Boolean(ownGrant && isConfirmedGrantStatus(ownGrant.status)),
    rewardsEnabled,
    grants: rows.map(({ role, status }) => ({ role, status })),
  };
}
