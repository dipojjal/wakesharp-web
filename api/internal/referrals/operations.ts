import { z } from 'zod';
import { safeEqual } from '../../_lib/crypto.js';
import { query } from '../../_lib/db.js';
import { ApiError, endpoint, json, methodNotAllowed, readJson } from '../../_lib/http.js';

/**
 * Operator surface. `retry` is gone with the reward grants — there is no
 * fulfilment queue any more, so the only action left is retention pruning.
 */
const actionSchema = z.discriminatedUnion('action', [
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
    const [installs, claims, assertions, unlocks] = await Promise.all([
      query<{ count: string }>("SELECT count(*)::text AS count FROM growth_anonymous_installations WHERE revoked_at IS NULL AND expires_at > now()"),
      query<{ confirmed: string; pending: string }>(
        `SELECT count(*) FILTER (WHERE confirmed_at IS NOT NULL)::text AS confirmed,
                count(*) FILTER (WHERE confirmed_at IS NULL)::text     AS pending
           FROM growth_referral_claims`),
      query<{ count: string }>("SELECT count(*)::text AS count FROM growth_successful_day_assertions WHERE occurred_at >= now() - interval '8 days'"),
      query<{ count: string }>('SELECT count(*)::text AS count FROM growth_squad_unlocks'),
    ]);
    return json({
      generatedAt: new Date().toISOString(),
      activeInstallations: Number(installs[0]?.count ?? 0),
      // The ratio of these two is the abuse tell worth watching: a real cohort
      // converts pending to confirmed gradually, a farm converts all at once.
      confirmedClaims: Number(claims[0]?.confirmed ?? 0),
      pendingClaims: Number(claims[0]?.pending ?? 0),
      assertionsLastEightDays: Number(assertions[0]?.count ?? 0),
      squadUnlocks: Number(unlocks[0]?.count ?? 0),
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
    throw new ApiError(400, 'unknown_action');
  });
}

export function PUT(): Response { return methodNotAllowed('GET, POST'); }
