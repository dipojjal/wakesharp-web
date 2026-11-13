import { safeEqual } from '../../_lib/crypto.js';
import { ApiError, endpoint, json, methodNotAllowed } from '../../_lib/http.js';

/**
 * The daily publish check, called by the Vercel cron in vercel.json at 23:05
 * UTC (6:05 PM EST).
 *
 * Blog posts are committed ahead of time with a future pubDate, and the static
 * build only includes a post once its pubDate has passed (isLive in
 * src/lib/blog.ts). So a staged post appears on the first build after its
 * date, and something has to start that build when nobody is pushing. This
 * route reads the live /blog-schedule.json and, once the next scheduled post's
 * moment has passed, starts a production build of main through the deploy hook
 * in BLOG_DEPLOY_HOOK_URL. When nothing is due it does nothing. A build that
 * fails leaves the old schedule live, so the next run simply tries again.
 *
 * Vercel sends `Authorization: Bearer $CRON_SECRET` when that variable is set;
 * without it the route refuses, as the referrals prune route does.
 */
const SITE = 'https://wakesharp.app';

/** True once `next` (an ISO timestamp from /blog-schedule.json) is at or before `now`. */
export const isDue = (next: unknown, now: number): boolean => {
  if (typeof next !== 'string') return false;
  const at = Date.parse(next);
  return Number.isFinite(at) && at <= now;
};

export async function GET(request: Request): Promise<Response> {
  return endpoint(async () => {
    const secret = process.env.CRON_SECRET;
    const supplied = request.headers.get('authorization')?.replace(/^Bearer /, '') ?? '';
    if (!secret || !supplied || !safeEqual(Buffer.from(secret), Buffer.from(supplied))) {
      throw new ApiError(401, 'cron_auth_required');
    }
    const hook = process.env.BLOG_DEPLOY_HOOK_URL;
    if (!hook) return json({ action: 'publish', skipped: 'no_deploy_hook' });

    const live = await fetch(`${SITE}/blog-schedule.json?at=${Date.now()}`, {
      headers: { 'Cache-Control': 'no-cache' },
    });
    if (!live.ok) throw new ApiError(502, 'schedule_unavailable');
    const { next } = (await live.json()) as { next?: unknown };
    if (!isDue(next, Date.now())) return json({ action: 'publish', next: next ?? null, rebuilt: false });

    const started = await fetch(hook, { method: 'POST' });
    if (!started.ok) throw new ApiError(502, 'deploy_hook_failed');
    return json({ action: 'publish', next, rebuilt: true });
  });
}

export function POST(): Response {
  return methodNotAllowed('GET');
}
