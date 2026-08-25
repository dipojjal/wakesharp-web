import { z } from 'zod';
import { safeEqual } from '../../_lib/crypto.js';
import { query } from '../../_lib/db.js';
import { ApiError, endpoint, json, methodNotAllowed, readJson } from '../../_lib/http.js';
import { fulfillRewardGrant } from '../../_lib/revenuecat.js';

const actionSchema = z.discriminatedUnion('action', [
  z.object({ action: z.literal('retry'), limit: z.number().int().min(1).max(25).default(10) }).strict(),
  z.object({ action: z.literal('prune') }).strict(),
]);

function authorize(request: Request): void {
  const secret = process.env.REFERRAL_OPERATIONS_SECRET;
  const supplied = request.headers.get('authorization')?.replace(/^Bearer /, '') ?? '';
  if (!secret || !supplied || !safeEqual(Buffer.from(secret), Buffer.from(supplied))) {
    throw new ApiError(401, 'operations_auth_required');
  }
}

export async function GET(request: Request): Promise<Response> {
  return endpoint(async () => {
    authorize(request);
    const [installs, claims, assertions, grants] = await Promise.all([
      query<{ count: string }>('SELECT count(*)::text AS count FROM growth_anonymous_installations WHERE revoked_at IS NULL AND expires_at > now()'),
      query<{ count: string }>('SELECT count(*)::text AS count FROM growth_referral_claims'),
      query<{ count: string }>("SELECT count(*)::text AS count FROM growth_successful_day_assertions WHERE occurred_at >= now() - interval '8 days'"),
      query<{ status: string; count: string }>('SELECT status, count(*)::text AS count FROM growth_reward_grants GROUP BY status ORDER BY status'),
    ]);
    return json({
      generatedAt: new Date().toISOString(),
      activeInstallations: Number(installs[0]?.count ?? 0),
      claims: Number(claims[0]?.count ?? 0),
      assertionsLastEightDays: Number(assertions[0]?.count ?? 0),
      grants: grants.map((row) => ({ status: row.status, count: Number(row.count) })),
      rewardsEnabled: process.env.REFERRAL_REWARDS_ENABLED === 'true',
    });
  });
}

export async function POST(request: Request): Promise<Response> {
  return endpoint(async () => {
    authorize(request);
    const { value } = await readJson(request, actionSchema);
    if (value.action === 'prune') {
      const rows = await query<{ nonces_deleted: string; installations_deleted: string; audit_deleted: string }>(
        'SELECT * FROM growth_prune_expired()',
      );
      return json({ action: 'prune', result: rows[0] ?? null });
    }
    if (process.env.REFERRAL_REWARDS_ENABLED !== 'true') throw new ApiError(409, 'referral_rewards_disabled');
    const due = await query<{ id: string }>(
      `SELECT id
         FROM growth_reward_grants
        WHERE attempts < 8
          AND ((status IN ('queued', 'failed') AND next_attempt_at <= now())
               OR (status = 'granting' AND updated_at < now() - interval '10 minutes'))
        ORDER BY next_attempt_at
        LIMIT $1`,
      [value.limit],
    );
    const results = [];
    for (const row of due) results.push(await fulfillRewardGrant(row.id));
    return json({ action: 'retry', attempted: due.length, results });
  });
}

export function PUT(): Response { return methodNotAllowed('GET, POST'); }

