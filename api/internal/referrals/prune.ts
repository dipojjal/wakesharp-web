import { safeEqual } from '../../_lib/crypto.js';
import { query } from '../../_lib/db.js';
import { ApiError, endpoint, json, methodNotAllowed } from '../../_lib/http.js';

/**
 * The daily retention run (G1-04), called by the Vercel cron in vercel.json.
 *
 * growth_prune_expired existed, and nothing ever called it: installations,
 * their wake-up assertions and the audit trail were kept forever instead of
 * 180 days after the last activity. Vercel sends `Authorization: Bearer
 * $CRON_SECRET` when that variable is set; without it the route refuses.
 * Before the database is provisioned there is nothing to prune.
 */
export async function GET(request: Request): Promise<Response> {
  return endpoint(async () => {
    const secret = process.env.CRON_SECRET;
    const supplied = request.headers.get('authorization')?.replace(/^Bearer /, '') ?? '';
    if (!secret || !supplied || !safeEqual(Buffer.from(secret), Buffer.from(supplied))) {
      throw new ApiError(401, 'cron_auth_required');
    }
    if (!process.env.DATABASE_URL) return json({ action: 'prune', skipped: 'not_provisioned' });
    const expired = await query<{ nonces_deleted: string; installations_deleted: string; audit_deleted: string }>(
      'SELECT * FROM growth_prune_expired()',
    );
    const limits = await query<{ deleted: string }>('SELECT growth_prune_rate_limits() AS deleted');
    return json({
      action: 'prune',
      result: expired[0] ?? null,
      rateLimitRowsDeleted: Number(limits[0]?.deleted ?? 0),
    });
  });
}

export function POST(): Response { return methodNotAllowed('GET'); }
