import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { GET, isDue } from '../../api/internal/blog/publish';

test('the publish cron runs daily at 23:05 UTC (6:05 PM EST) with its own function config', () => {
  const vercel = JSON.parse(readFileSync(new URL('../../vercel.json', import.meta.url), 'utf8'));
  assert.ok(vercel.crons.some((c: { path: string; schedule: string }) => c.path === '/api/internal/blog/publish' && c.schedule === '5 23 * * *'));
  assert.ok(vercel.functions['api/internal/blog/*.ts']);
});

const route = 'https://wakesharp.app/api/internal/blog/publish';

/** Runs `work` with the given environment variables set (or removed), then restores them. */
async function withEnv(vars: Record<string, string | undefined>, work: () => Promise<void>): Promise<void> {
  const saved = Object.fromEntries(Object.keys(vars).map((key) => [key, process.env[key]]));
  for (const [key, value] of Object.entries(vars)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  try {
    await work();
  } finally {
    for (const [key, value] of Object.entries(saved)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
}

test('a staged post is due once its pubDate has passed, and only then', () => {
  const now = Date.parse('2026-11-14T23:05:00Z');
  assert.equal(isDue('2026-11-14T23:00:00.000Z', now), true);
  assert.equal(isDue('2026-11-14T23:05:00.000Z', now), true);
  assert.equal(isDue('2026-11-15T23:00:00.000Z', now), false);
  assert.equal(isDue(null, now), false);
  assert.equal(isDue(undefined, now), false);
  assert.equal(isDue('not a date', now), false);
});

test('the publish route refuses calls without the cron secret', async () => {
  await withEnv({ CRON_SECRET: 'cron-test-secret', BLOG_DEPLOY_HOOK_URL: undefined }, async () => {
    assert.equal((await GET(new Request(route))).status, 401);
    const wrong = await GET(new Request(route, { headers: { authorization: 'Bearer not-the-secret' } }));
    assert.equal(wrong.status, 401);
  });
  await withEnv({ CRON_SECRET: undefined }, async () => {
    const unset = await GET(new Request(route, { headers: { authorization: 'Bearer anything' } }));
    assert.equal(unset.status, 401);
  });
});

test('without a deploy hook the route does nothing', async () => {
  await withEnv({ CRON_SECRET: 'cron-test-secret', BLOG_DEPLOY_HOOK_URL: undefined }, async () => {
    const response = await GET(new Request(route, { headers: { authorization: 'Bearer cron-test-secret' } }));
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { action: 'publish', skipped: 'no_deploy_hook' });
  });
});
