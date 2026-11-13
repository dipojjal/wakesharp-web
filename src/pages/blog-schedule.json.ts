import type { APIRoute } from 'astro';
import { nextScheduledPubDate } from '../lib/blog';

/**
 * What the daily publish cron (api/internal/blog/publish.ts) needs, and
 * nothing more: when this build was made and when the next staged post goes
 * live. No titles or slugs, so a scheduled post stays unannounced until its
 * date. `next` is null when nothing is scheduled, and the cron then does
 * nothing.
 */
export const GET: APIRoute = async () => {
  const builtAt = new Date();
  const next = await nextScheduledPubDate(builtAt.getTime());
  return new Response(JSON.stringify({ builtAt: builtAt.toISOString(), next: next?.toISOString() ?? null }), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
