import { z } from 'zod';
import { safeEqual } from '../../_lib/crypto.js';
import { query } from '../../_lib/db.js';
import { ApiError, endpoint, json, methodNotAllowed, readJson } from '../../_lib/http.js';

type ConversionKind = 'trial' | 'paid';
type ConversionEnvironment = 'production' | 'sandbox';

/**
 * Operator surface. `retry` is gone with the reward grants - there is no
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
    const [installs, claims, assertions, unlocks, conversions, conversionTiming, missionUnlocks] = await Promise.all([
      query<{ count: string }>("SELECT count(*)::text AS count FROM growth_anonymous_installations WHERE revoked_at IS NULL AND expires_at > now()"),
      query<{ confirmed: string; pending: string; converted: string }>(
        `SELECT count(*) FILTER (WHERE confirmed_at IS NOT NULL)::text AS confirmed,
                count(*) FILTER (WHERE confirmed_at IS NULL)::text     AS pending,
                count(*) FILTER (WHERE converted_at IS NOT NULL)::text AS converted
           FROM growth_referral_claims`),
      query<{ count: string }>("SELECT count(*)::text AS count FROM growth_successful_day_assertions WHERE occurred_at >= now() - interval '8 days'"),
      query<{ count: string }>('SELECT count(*)::text AS count FROM growth_squad_unlocks'),
      query<{ kind: ConversionKind; environment: ConversionEnvironment; count: string }>(
        `SELECT conversion_kind AS kind, conversion_environment AS environment, count(*)::text AS count
           FROM growth_referral_claims
          WHERE converted_at >= now() - interval '7 days'
          GROUP BY conversion_kind, conversion_environment`),
      query<{ minutes: number | null }>(
        `SELECT round((percentile_cont(0.5) WITHIN GROUP (
                    ORDER BY extract(epoch FROM converted_at - claimed_at)) / 60)::numeric, 1)::float8 AS minutes
           FROM growth_referral_claims
          WHERE converted_at >= now() - interval '7 days'`),
      query<{ count: string }>('SELECT count(*)::text AS count FROM growth_mission_unlocks'),
    ]);
    const conversionsLastSevenDays: Record<ConversionKind, Record<ConversionEnvironment, number>> = {
      trial: { production: 0, sandbox: 0 },
      paid: { production: 0, sandbox: 0 },
    };
    for (const row of conversions) {
      const bucket = conversionsLastSevenDays[row.kind];
      if (bucket && row.environment in bucket) bucket[row.environment] = Number(row.count);
    }
    return json({
      generatedAt: new Date().toISOString(),
      activeInstallations: Number(installs[0]?.count ?? 0),
      // 2.13 mechanic, dormant from 2.16. The ratio of these two was the abuse
      // tell: a real cohort confirms gradually, a farm all at once.
      confirmedClaims: Number(claims[0]?.confirmed ?? 0),
      pendingClaims: Number(claims[0]?.pending ?? 0),
      assertionsLastEightDays: Number(assertions[0]?.count ?? 0),
      squadUnlocks: Number(unlocks[0]?.count ?? 0),
      // 2.16 mechanic. Sandbox conversions should exist only while
      // REFERRALS_ACCEPT_SANDBOX is on for QA. Watch the claim-to-conversion
      // median for a sudden shift rather than for its level: the paywall sits
      // inside onboarding, so genuine friends also convert minutes after the
      // claim.
      convertedClaims: Number(claims[0]?.converted ?? 0),
      conversionsLastSevenDays,
      claimToConversionMedianMinutesLastSevenDays: conversionTiming[0]?.minutes ?? null,
      missionUnlocks: Number(missionUnlocks[0]?.count ?? 0),
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
