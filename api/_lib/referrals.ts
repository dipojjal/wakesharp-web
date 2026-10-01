import { z } from 'zod';
import { credentialDigest } from './crypto.js';
import { query } from './db.js';
import { ApiError } from './http.js';

export function assertReferralApiEnabled(): void {
  if (process.env.REFERRALS_API_ENABLED !== 'true') throw new ApiError(503, 'referrals_disabled');
}

/**
 * The one mission a converted referral unlocks (2.16). The database CHECK on
 * growth_mission_unlocks.mission_id is the authoritative list; this names it
 * for the API.
 */
export const REWARD_MISSION_ID = 'squats';

/**
 * `POST /api/referrals/converted`: the referred installation reports that it
 * started a trial or a paid plan. Strict, so an unknown key is 400
 * `invalid_request`.
 *
 * `productId` is validated and never stored: it only proves the purchase is a
 * WakeSharp plan (`com.wakesharp.app.plus.*`, including Play's
 * `product:baseplan` form). `purchasedAt` is the ORIGINAL purchase date of the
 * earliest qualifying purchase, which is what lets the database refuse
 * restores and old subscriptions. `purchaseRef` is base64url SHA-256 of
 * `"wakesharp.referral.conversion.v1\n" + store + "\n" + storeTransactionId`,
 * computed on the device; only an HMAC of it is stored.
 *
 * `purchaseRef: null` is read as absent rather than refused. The contract says
 * "optional", and a client whose serializer writes nulls would otherwise drop
 * a real conversion on a 400 it treats as final.
 */
export const conversionRequestSchema = z.object({
  kind: z.enum(['trial', 'paid']),
  productId: z.string().regex(/^com\.wakesharp\.app\.plus\.[a-z0-9_.:-]{1,80}$/),
  store: z.enum(['app_store', 'play_store']),
  environment: z.enum(['production', 'sandbox']),
  purchasedAt: z.iso.datetime({ offset: true }),
  purchaseRef: z.string().regex(/^[A-Za-z0-9_-]{43}$/).nullish(),
}).strict();

export type ConversionRequest = z.infer<typeof conversionRequestSchema>;

/**
 * Sandbox purchases count only while `REFERRALS_ACCEPT_SANDBOX` is exactly
 * "true", for TestFlight and internal-track QA. Store builds report
 * `production`; turn this off before the store release.
 */
export function acceptsSandboxConversions(): boolean {
  return process.env.REFERRALS_ACCEPT_SANDBOX === 'true';
}

/**
 * The stored form of a purchase reference: an HMAC under
 * `REFERRAL_CREDENTIAL_PEPPER` with its own domain label, the same pattern as
 * the rate-limit keys. A unique index on it means one purchase converts at most
 * one claim, and a table dump cannot be matched against store transactions.
 */
export function conversionRefDigest(ref: string): Buffer {
  return credentialDigest(`conversion_ref\n${ref}`);
}

/**
 * What an inviter has actually earned.
 *
 * 2.16 (`convertedSignups`, `awaitingConversion`, `squatsUnlocked`): one
 * referred friend who starts a trial or a paid plan unlocks Squats.
 * `convertedSignups` counts every converted claim forever, even after its
 * referee is pruned or deletes itself. `awaitingConversion` counts the
 * unconverted claims that still could convert: a detached (pruned) or revoked
 * (deleted) referee never can. `squatsUnlocked` is the stored unlock, which is
 * monotonic.
 *
 * 2.13 (`confirmedSignups`, `pendingSignups`, `squadUnlocked`): twenty
 * confirmed referrals unlock Wake Squad, where confirmed means onboarding plus
 * three qualifying mornings. Dormant from 2.16, and kept on the wire because
 * shipped clients decode these fields as required. `pendingSignups` uses the
 * same live-referee filter as `awaitingConversion`, and exists so a counter
 * never reads as broken: an inviter who sent eleven links and sees "4 of 20"
 * needs to know the other seven are still warming up rather than lost.
 *
 * Deliberately counted rather than stored. `confirmed_at` and `converted_at`
 * are set once and never cleared, and a pruned referred installation detaches
 * from its claim instead of deleting it, so the counts are monotonic without a
 * reconciliation job.
 */
export const SQUAD_UNLOCK_THRESHOLD = 20;

/**
 * The progress query, exported so the SQL matrix (tests/growth) runs the very
 * text the route runs. $1 is the installation, $2 the reward mission.
 *
 * A confirmed or converted claim counts forever, even after its referred
 * install is pruned or deletes itself. A pending or awaiting one counts only
 * while its referee could still get there: a detached (pruned) or revoked
 * (deleted) referee never can, and leaving those in would let "still waiting"
 * drift upward for years and quietly become a lie.
 */
export const INVITER_PROGRESS_SQL = `SELECT
    count(*) FILTER (WHERE c.confirmed_at IS NOT NULL)::text AS confirmed,
    count(*) FILTER (WHERE c.confirmed_at IS NULL
                       AND i.id IS NOT NULL AND i.revoked_at IS NULL)::text AS pending,
    count(*) FILTER (WHERE c.converted_at IS NOT NULL)::text AS converted,
    count(*) FILTER (WHERE c.converted_at IS NULL
                       AND i.id IS NOT NULL AND i.revoked_at IS NULL)::text AS awaiting,
    EXISTS (SELECT 1 FROM growth_squad_unlocks u WHERE u.installation_id = $1) AS unlocked,
    EXISTS (SELECT 1 FROM growth_mission_unlocks m
             WHERE m.installation_id = $1 AND m.mission_id = $2) AS squats_unlocked
   FROM growth_referral_claims c
   LEFT JOIN growth_anonymous_installations i
          ON i.id = c.referred_installation_id
  WHERE c.inviter_installation_id = $1`;

export interface InviterProgressRow {
  confirmed: string;
  pending: string;
  unlocked: boolean;
  converted: string;
  awaiting: string;
  squats_unlocked: boolean;
}

export interface InviterProgress {
  confirmedSignups: number;
  pendingSignups: number;
  squadUnlocked: boolean;
  convertedSignups: number;
  awaitingConversion: number;
  squatsUnlocked: boolean;
}

export function progressFromRow(row: InviterProgressRow | undefined): InviterProgress {
  return {
    confirmedSignups: Number(row?.confirmed ?? 0),
    pendingSignups: Number(row?.pending ?? 0),
    squadUnlocked: Boolean(row?.unlocked),
    convertedSignups: Number(row?.converted ?? 0),
    awaitingConversion: Number(row?.awaiting ?? 0),
    squatsUnlocked: Boolean(row?.squats_unlocked),
  };
}

export async function inviterProgress(installationId: string): Promise<InviterProgress> {
  const rows = await query<InviterProgressRow>(INVITER_PROGRESS_SQL, [installationId, REWARD_MISSION_ID]);
  return progressFromRow(rows[0]);
}
