import { query } from './db.js';
import { ApiError } from './http.js';

export function assertReferralApiEnabled(): void {
  if (process.env.REFERRALS_API_ENABLED !== 'true') throw new ApiError(503, 'referrals_disabled');
}

/**
 * What an inviter has actually earned.
 *
 * `confirmed` counts claims that cleared the whole bar — onboarding plus three
 * qualifying mornings. `pending` counts the ones that joined, can still get
 * there, and have not yet, and it exists so the client's counter never reads as broken: an
 * inviter who sent eleven links and sees "4 of 20" needs to know the other
 * seven are still warming up rather than lost.
 *
 * Deliberately counted rather than stored. `confirmed_at` is set once and never
 * cleared, and a pruned referred installation detaches from its claim instead of
 * deleting it, so the count is monotonic without a reconciliation job.
 */
export const SQUAD_UNLOCK_THRESHOLD = 20;

export async function inviterProgress(installationId: string): Promise<{
  confirmedSignups: number;
  pendingSignups: number;
  squadUnlocked: boolean;
}> {
  const rows = await query<{ confirmed: string; pending: string; unlocked: boolean }>(
    `SELECT
        count(*) FILTER (WHERE c.confirmed_at IS NOT NULL)::text AS confirmed,
        count(*) FILTER (WHERE c.confirmed_at IS NULL)::text     AS pending,
        EXISTS (SELECT 1 FROM growth_squad_unlocks u WHERE u.installation_id = $1) AS unlocked
       FROM growth_referral_claims c
       LEFT JOIN growth_anonymous_installations i
              ON i.id = c.referred_installation_id
      WHERE c.inviter_installation_id = $1
        -- A confirmed claim counts forever, even after its referred install is
        -- pruned or deletes itself. A pending one counts only while it could
        -- still confirm: a detached (pruned) or revoked (deleted) referee never
        -- can, and leaving those in would let "warming up" drift upward for
        -- years and quietly become a lie.
        AND (c.confirmed_at IS NOT NULL OR (i.id IS NOT NULL AND i.revoked_at IS NULL))`,
    [installationId],
  );
  const row = rows[0];
  return {
    confirmedSignups: Number(row?.confirmed ?? 0),
    pendingSignups: Number(row?.pending ?? 0),
    squadUnlocked: Boolean(row?.unlocked),
  };
}
