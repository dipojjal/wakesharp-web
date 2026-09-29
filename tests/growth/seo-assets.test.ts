import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, unlinkSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

test('strict SEO accepts a built download asset and rejects it when missing', () => {
  const dir = mkdtempSync(join(tmpdir(), 'wakesharp-seo-'));
  try {
    writeFileSync(join(dir, 'index.html'), '<html><head><title>WakeSharp</title><meta name="description" content="WakeSharp offers loud alarm tones and wake-up missions for mornings that need more than a snooze button."><link rel="canonical" href="https://wakesharp.app"><meta property="og:image" content="https://wakesharp.app/og.png"></head><body><h1>WakeSharp</h1><a href="/icon-512.png">Download the app icon</a></body></html>');
    writeFileSync(join(dir, 'sitemap.xml'), '<urlset><url><loc>https://wakesharp.app</loc></url></urlset>');
    writeFileSync(join(dir, 'icon-512.png'), 'asset fixture');
    const run = () => spawnSync(process.execPath, ['--import', 'tsx', 'scripts/check-seo.mjs', '--strict'], {
      encoding: 'utf8', env: { ...process.env, SEO_DIST: dir },
    });
    const present = run();
    assert.equal(present.status, 0, present.stderr);
    unlinkSync(join(dir, 'icon-512.png'));
    const missing = run();
    assert.equal(missing.status, 1);
    assert.match(missing.stderr, /icon-512\.png, which is not a built page or file/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
