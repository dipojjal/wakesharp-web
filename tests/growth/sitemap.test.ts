import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { SITE } from '../../src/config/site';
import { includeInSitemap, sitemapLastmod, sitemapPriority } from '../../src/lib/sitemap';
import { PRIVACY } from '../../src/templates/legal-copy';

const url = (path: string): string => `https://wakesharp.app${path}`;

test('indexable marketing, legal, support and blog URLs stay in the sitemap', () => {
  for (const path of [
    '/',
    '/es',
    '/pt-br',
    '/privacy',
    '/terms',
    '/support',
    '/es/support',
    '/contact',
    '/ja/contact',
    '/account/delete',
    '/ar/account/delete',
    '/blog',
    '/es/blog',
    '/blog/sleep-inertia-why-you-wake-up-groggy',
    '/tr/blog/sleep-inertia-why-you-wake-up-groggy',
  ]) {
    assert.equal(includeInSitemap(url(path)), true, path);
  }
});

test('noindex, duplicate-canonical and decoder-shell URLs stay out', () => {
  for (const path of [
    '/contact-sent',
    '/fr/contact-error',
    '/es/privacy',
    '/pt-br/terms',
    '/c',
    '/p',
    '/de/c',
    '/uk/p',
  ]) {
    assert.equal(includeInSitemap(url(path)), false, path);
  }
});

test('robots.txt and the document head advertise /sitemap.xml', () => {
  const robots = readFileSync(new URL('../../public/robots.txt', import.meta.url), 'utf8');
  assert.match(robots, /^Sitemap: https:\/\/wakesharp\.app\/sitemap\.xml$/m);
  const head = readFileSync(new URL('../../src/components/BaseHead.astro', import.meta.url), 'utf8');
  assert.match(head, /rel="sitemap" href="\/sitemap\.xml"/);
});

test('priority ranks by page type and is the same in every language', () => {
  for (const [path, priority] of [
    ['/', 1],
    ['/es', 1],
    ['/blog', 0.8],
    ['/ru/blog', 0.8],
    ['/blog/sleep-inertia-why-you-wake-up-groggy', 0.7],
    ['/tr/blog/alarm-reliability-checklist-tonight', 0.7],
    ['/support', 0.6],
    ['/ja/support', 0.6],
    ['/contact', 0.5],
    ['/privacy', 0.3],
    ['/terms', 0.3],
    ['/ar/account/delete', 0.3],
  ] as const) {
    assert.equal(sitemapPriority(url(path)), priority, path);
  }
});

test('lastmod comes from the built post, the newest post per index, and the legal stamps', () => {
  const dist = mkdtempSync(join(tmpdir(), 'sitemap-'));
  const post = (file: string, modified: string) => {
    mkdirSync(join(dist, file, '..'), { recursive: true });
    writeFileSync(join(dist, file), `<head><meta property="article:modified_time" content="${modified}" /></head>`);
  };
  try {
    post('blog/old.html', '2026-08-01T23:00:00.000Z');
    post('blog/new.html', '2026-09-10T23:00:00.000Z');
    post('es/blog/old.html', '2026-08-15T23:00:00.000Z');

    assert.equal(sitemapLastmod(url('/blog/old'), dist)?.toISOString(), '2026-08-01T23:00:00.000Z');
    assert.equal(sitemapLastmod(url('/es/blog/old'), dist)?.toISOString(), '2026-08-15T23:00:00.000Z');
    // An index changes when its newest post does, and only its own language counts.
    assert.equal(sitemapLastmod(url('/blog'), dist)?.toISOString(), '2026-09-10T23:00:00.000Z');
    assert.equal(sitemapLastmod(url('/es/blog'), dist)?.toISOString(), '2026-08-15T23:00:00.000Z');

    assert.equal(sitemapLastmod(url('/privacy'), dist)?.toISOString().slice(0, 10), PRIVACY.lastUpdated);
    assert.equal(sitemapLastmod(url('/terms'), dist)?.toISOString().slice(0, 10), SITE.lastUpdated);
    // No recorded date means no lastmod, never a guessed one.
    for (const path of ['/', '/es', '/support', '/contact', '/account/delete']) {
      assert.equal(sitemapLastmod(url(path), dist), undefined, path);
    }
  } finally {
    rmSync(dist, { recursive: true, force: true });
  }
});
