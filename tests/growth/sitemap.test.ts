import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { includeInSitemap } from '../../src/lib/sitemap';

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
