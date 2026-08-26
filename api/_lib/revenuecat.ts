import { query } from './db.js';
import { ApiError } from './http.js';

const DAY_MS = 24 * 60 * 60 * 1_000;
const API_BASE = 'https://api.revenuecat.com/v2';

interface ActiveEntitlement {
  entitlement_id: string;
  expires_at: number | null;
}

interface GrantRow extends Record<string, unknown> {
  id: string;
  status: string;
  attempts: number;
  idempotency_key: string;
  desired_expiration_at: string | null;
  revenuecat_app_user_id: string;
}

export type RewardPolicy =
  | { kind: 'lifetime_recognition' }
  | { kind: 'grant'; expiresAt: Date };

export type GrantConflictResolution =
  | { kind: 'confirmed' }
  | { kind: 'defer'; retryAt: Date }
  | { kind: 'retry' };

export function referralRewardPolicy(now: Date, activeExpirations: Array<number | null>): RewardPolicy {
  if (activeExpirations.some((value) => value === null)) return { kind: 'lifetime_recognition' };
  const future = activeExpirations.filter((value): value is number => typeof value === 'number' && value > now.getTime());
  const base = future.length ? Math.max(...future) : now.getTime();
  return { kind: 'grant', expiresAt: new Date(base + 14 * DAY_MS) };
}

export function grantConflictResolution(
  now: Date,
  desired: Date,
  activeExpirations: Array<number | null>,
): GrantConflictResolution {
  if (activeExpirations.some((value) => value === null)) return { kind: 'confirmed' };
  if (activeExpirations.some((value) => typeof value === 'number' && value >= desired.getTime())) {
    return { kind: 'confirmed' };
  }
  const future = activeExpirations.filter((value): value is number =>
    typeof value === 'number' && value > now.getTime(),
  );
  if (!future.length) return { kind: 'retry' };
  return { kind: 'defer', retryAt: new Date(Math.max(...future) + 5 * 60 * 1_000) };
}

function configuration() {
  const secret = process.env.REVENUECAT_V2_SECRET_KEY;
  const project = process.env.REVENUECAT_PROJECT_ID;
  const entitlement = process.env.REVENUECAT_PLUS_ENTITLEMENT_ID;
  if (!secret || !project || !entitlement) throw new ApiError(503, 'revenuecat_not_configured');
  return { secret, project, entitlement };
}

async function rcFetch(path: string, init: RequestInit = {}, fetcher: typeof fetch = fetch): Promise<Response> {
  const { secret } = configuration();
  return fetcher(`${API_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${secret}`,
      Accept: 'application/json',
      ...init.headers,
    },
    signal: AbortSignal.timeout(10_000),
  });
}

async function activeExpirations(customerId: string, fetcher: typeof fetch): Promise<Array<number | null>> {
  const { project, entitlement } = configuration();
  const response = await rcFetch(
    `/projects/${encodeURIComponent(project)}/customers/${encodeURIComponent(customerId)}/active_entitlements?limit=100`,
    {},
    fetcher,
  );
  if (!response.ok) throw new Error(`active_entitlements_${response.status}`);
  const body = await response.json() as { items?: ActiveEntitlement[] };
  if (!Array.isArray(body.items)) throw new Error('active_entitlements_shape');
  return body.items
    .filter((item) => item && item.entitlement_id === entitlement)
    .map((item) => item.expires_at);
}

async function markFailure(grant: GrantRow, code: string): Promise<void> {
  const permanent = Number(grant.attempts) >= 8;
  const delayMinutes = Math.min(360, 5 * (2 ** Math.max(0, Number(grant.attempts) - 1)));
  await query(
    `UPDATE growth_reward_grants
        SET status = $2,
            next_attempt_at = now() + make_interval(mins => $3),
            last_failure_code = $4,
            last_failure_detail = $5,
            updated_at = now()
      WHERE id = $1`,
    [grant.id, permanent ? 'permanent_failure' : 'failed', delayMinutes, code.slice(0, 64), code.slice(0, 500)],
  );
  await query(
    `INSERT INTO growth_referral_audit (event_type, outcome, reason, details)
     VALUES ('reward_grant', $1, $2, jsonb_build_object('grant_id', $3::text, 'attempt', $4::int))`,
    [permanent ? 'permanent_failure' : 'retry_scheduled', code.slice(0, 160), grant.id, Number(grant.attempts)],
  );
}

async function markDeferred(grant: GrantRow, retryAt: Date): Promise<void> {
  await query(
    `UPDATE growth_reward_grants
        SET status = 'failed',
            next_attempt_at = $2,
            last_failure_code = 'active_entitlement_conflict',
            last_failure_detail = 'Deferred until the currently active entitlement expires',
            updated_at = now()
      WHERE id = $1`,
    [grant.id, retryAt.toISOString()],
  );
  await query(
    `INSERT INTO growth_referral_audit (event_type, outcome, reason, details)
     VALUES ('reward_grant', 'retry_deferred', 'active_entitlement_conflict',
             jsonb_build_object('grant_id', $1::text, 'attempt', $2::int, 'retry_at', $3::timestamptz))`,
    [grant.id, Number(grant.attempts), retryAt.toISOString()],
  );
}

export async function fulfillRewardGrant(grantId: string, fetcher: typeof fetch = fetch): Promise<string> {
  if (process.env.REFERRAL_REWARDS_ENABLED !== 'true') return 'disabled';
  const claimed = await query<GrantRow>(
    `UPDATE growth_reward_grants g
        SET status = 'granting', attempts = attempts + 1, updated_at = now()
       FROM growth_anonymous_installations i
      WHERE g.id = $1
        AND i.id = g.beneficiary_installation_id
        AND g.attempts < 8
        AND (
          (g.status IN ('queued', 'failed') AND g.next_attempt_at <= now())
          OR (g.status = 'granting' AND g.updated_at < now() - interval '10 minutes')
        )
      RETURNING g.id, g.status, g.attempts, g.idempotency_key,
                g.desired_expiration_at, i.revenuecat_app_user_id`,
    [grantId],
  );
  const grant = claimed[0];
  if (!grant) {
    const current = await query<{ status: string }>('SELECT status FROM growth_reward_grants WHERE id = $1', [grantId]);
    return current[0]?.status ?? 'missing';
  }

  try {
    let desired = grant.desired_expiration_at ? new Date(grant.desired_expiration_at) : null;
    if (!desired) {
      const policy = referralRewardPolicy(new Date(), await activeExpirations(grant.revenuecat_app_user_id, fetcher));
      if (policy.kind === 'lifetime_recognition') {
        await query(
          `UPDATE growth_reward_grants
              SET status = 'recognition_only', confirmed_at = now(), updated_at = now(),
                  last_failure_code = NULL, last_failure_detail = NULL
            WHERE id = $1`,
          [grant.id],
        );
        return 'recognition_only';
      }
      desired = policy.expiresAt;
      await query('UPDATE growth_reward_grants SET desired_expiration_at = $2 WHERE id = $1', [grant.id, desired.toISOString()]);
    }

    const { project, entitlement } = configuration();
    const path = `/projects/${encodeURIComponent(project)}/customers/${encodeURIComponent(grant.revenuecat_app_user_id)}/actions/grant_entitlement`;
    const response = await rcFetch(path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Idempotency-Key': grant.idempotency_key },
      body: JSON.stringify({ entitlement_id: entitlement, expires_at: desired.getTime() }),
    }, fetcher);

    let confirmed = response.ok;
    if (!confirmed && response.status === 409) {
      const expirations = await activeExpirations(grant.revenuecat_app_user_id, fetcher);
      const resolution = grantConflictResolution(new Date(), desired, expirations);
      confirmed = resolution.kind === 'confirmed';
      if (resolution.kind === 'defer') {
        await markDeferred(grant, resolution.retryAt);
        return 'failed';
      }
    }
    if (!confirmed) throw new Error(`grant_entitlement_${response.status}`);

    await query(
      `UPDATE growth_reward_grants
          SET status = 'granted', confirmed_at = now(), updated_at = now(),
              last_failure_code = NULL, last_failure_detail = NULL
        WHERE id = $1`,
      [grant.id],
    );
    await query(
      `INSERT INTO growth_referral_audit (event_type, outcome, details)
       VALUES ('reward_grant', 'confirmed', jsonb_build_object('grant_id', $1::text))`,
      [grant.id],
    );
    return 'granted';
  } catch (error) {
    const code = error instanceof Error ? error.message : 'unknown_provider_failure';
    await markFailure(grant, code);
    return Number(grant.attempts) >= 8 ? 'permanent_failure' : 'failed';
  }
}

export const isConfirmedGrantStatus = (status: string): boolean =>
  status === 'granted' || status === 'recognition_only';
