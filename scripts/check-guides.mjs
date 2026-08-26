#!/usr/bin/env node
/** Contract test for the ten component-driven organic acquisition pages. */

import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const guides = {
  'alarmy-alternative-without-ads': 'shp-v01',
  'why-an-alarm-may-not-go-off': 'rel-v01',
  'silent-focus-and-dnd-alarm-behavior': 'rel-v01',
  'alarm-for-heavy-sleepers': 'hsl-v01',
  'math-and-puzzle-alarm-clock': 'hsl-v01',
  'wake-before-first-calendar-meeting': 'mtg-v01',
  'how-to-know-an-alarm-is-ready': 'rel-v01',
  'wake-up-brain-games-and-morning-sharpness': 'shp-v01',
  'privacy-first-alarm-clock': 'shp-v01',
  'wakesharp-vs-standard-phone-alarm': 'rel-v01',
};

let failures = 0;
const check = (condition, message) => {
  if (condition) return;
  console.error(`  ✗ ${message}`);
  failures++;
};

const sitemap = readFileSync(join(DIST, 'sitemap-0.xml'), 'utf8');
for (const [slug, destination] of Object.entries(guides)) {
  const path = join(DIST, `${slug}.html`);
  const html = readFileSync(path, 'utf8');
  const url = `https://wakesharp.app/${slug}`;
  check(html.includes(`<link rel="canonical" href="${url}">`), `${slug}: canonical mismatch`);
  check(html.includes(`<meta property="og:url" content="${url}">`), `${slug}: missing OG URL`);
  check(/<meta property="og:title" content="[^"]+">/.test(html), `${slug}: missing OG title`);
  check(/<meta property="og:description" content="[^"]+">/.test(html), `${slug}: missing OG description`);
  check(/<meta property="og:image" content="https:\/\/wakesharp\.app\/[^"]+">/.test(html), `${slug}: missing absolute OG image`);
  check(html.includes('data-real-app-ui="true"'), `${slug}: no real-UI screenshot marker`);
  check(html.includes(`data-growth-cta="${destination}"`), `${slug}: wrong store destination`);
  check(html.includes('data-growth-store="ios"') && html.includes('data-growth-store="android"'), `${slug}: both stores are required`);
  check(html.includes('"@type":"Article"'), `${slug}: missing Article JSON-LD`);
  check(html.includes('"@type":"FAQPage"'), `${slug}: missing FAQ JSON-LD`);
  check(html.includes('"@type":"BreadcrumbList"'), `${slug}: missing breadcrumb JSON-LD`);
  check((html.match(/checked August 25, 2026/g) ?? []).length >= 3, `${slug}: fewer than three dated sources`);
  check((html.match(/href="\/(?:alarm|why|silent|math|wake|privacy|how|wakesharp)[^"]+"/g) ?? []).length >= 3, `${slug}: fewer than three internal guide links`);
  check(sitemap.includes(`<loc>${url}</loc>`), `${slug}: missing from sitemap`);
  check(!html.includes('name="robots" content="noindex'), `${slug}: must be indexable`);
}

const index = readFileSync(join(DIST, 'guides.html'), 'utf8');
for (const slug of Object.keys(guides)) {
  check(index.includes(`href="/${slug}"`), `guides hub: missing ${slug}`);
}

if (failures) {
  console.error(`\n  ${failures} guide contract problem(s).\n`);
  process.exit(1);
}
console.log(`\n  Guide check passed across ${Object.keys(guides).length} pages.\n`);
