#!/usr/bin/env node
/**
 * Write the 108 feature pages (9 slugs x 12 languages) under
 * src/content/features/ from the copy that already lives in
 * src/data/refresh/<locale>.json and src/i18n/<locale>/home.ts.
 *
 *   npm run features:build          # write the pages
 *   npm run features:build -- --check   # fail if any page would change
 *   npm run features:build -- --lenient # skip missions a locale lacks so far
 *
 * The pages have always been assembled from those two sources (the 2.14
 * refresh pasted them by hand); this makes the assembly repeatable, so a
 * product change is made once, in the JSON and the catalog, and the pages
 * follow. Each slug names which sentences it is built from below. Run it with
 * tsx (the npm script does), because it imports the TypeScript catalogs.
 */
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { CATALOGS } from '../src/i18n/catalog';
import { REFRESH } from '../src/lib/refresh';
import { enabledLocales } from '../src/i18n/config';
import { RELEASE } from '../src/lib/product';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'src', 'content', 'features');
/** The date stamped on every page: when the copy was last checked against the apps. */
const UPDATED = RELEASE.checked;
const CHECK = process.argv.includes('--check');
const LENIENT = process.argv.includes('--lenient');
/** The seven languages the store artwork exists in (src/lib/store-assets.ts); the rest show the English frames. */
const artworkLocale = (code) => (['en', 'es', 'ru', 'tr', 'de', 'fr', 'ar'].includes(code) ? code : 'en');

/**
 * One row per page. `intro` and `check` are the paragraphs around the
 * numbered steps, read from the refresh copy (r), a mission's catalog entry
 * (m), the home catalog (h) or the support catalog (s); `bullets` lists
 * missions by their catalog name and blurb.
 * `feature` indexes refresh `features`, `capture` the English store capture
 * and `caption` the refresh caption that describes it.
 */
const PAGES = [
  { slug: 'loud-alarm-clock', order: 0, feature: 0, capture: '04-tones', caption: 1, missions: [], intro: (r) => r.loud, check: (r) => r.volume },
  { slug: 'object-scan-alarm', order: 1, feature: 1, capture: '02-scan', caption: 2, missions: ['object_scan'], intro: (r) => r.scan, check: (r) => r.backup },
  { slug: 'math-alarm-clock', order: 2, feature: 2, capture: '03-missions', caption: 3, missions: ['math_sprint'], intro: (r) => r.missionsIntro, check: (r) => r.repeat },
  { slug: 'puzzle-alarm-clock', order: 3, feature: 3, capture: '03-missions', caption: 3, missions: ['memory_match', 'sequence_recall', 'colour_clash', 'type_quote', 'name_five', 'surprise'], bullets: true, intro: (r) => r.missionsIntro, check: (r) => r.repeat },
  { slug: 'photo-alarm-clock', order: 4, feature: 4, capture: '03-missions', caption: 3, missions: ['photo_proof', 'fetch', 'face_check', 'fruit_slash'], bullets: true, intro: (r, m) => m('photo_proof').body, check: (r) => r.backup },
  { slug: 'walking-alarm-clock', order: 5, feature: 5, capture: '03-missions', caption: 3, missions: ['walk_steps', 'first_light', 'squats', 'push_ups'], bullets: true, intro: (r, m) => m('walk_steps').body, check: (r) => `${r.missionsIntro} ${r.repeat}` },
  { slug: 'calendar-alarm-clock', order: 6, feature: 6, capture: '01-home', caption: 0, missions: [], intro: (r, m, h) => h.smart.lede, check: (r, m, h, s) => s.smartAlarms.limits },
  { slug: 'shift-work-alarm-clock', order: 7, feature: 7, capture: '07-rotation', caption: 6, missions: [], intro: (r, m, h) => h.smart.shifts, check: (r, m, h) => h.smart.labels },
  { slug: 'sharpness-score', order: 8, feature: 8, capture: '06-sharpness', caption: 5, missions: [], intro: (r) => r.score, check: (r) => r.warmup },
];

const quote = (s) => JSON.stringify(s);

function render(locale, page) {
  const r = REFRESH[locale.code];
  const { home, support } = CATALOGS[locale.code];
  const mission = (id) => {
    const m = home.mission.missions.find((x) => x.id === id);
    if (m) return m;
    // --lenient: a locale still being translated may lack a new mission; the
    // bullet is left out and the run reports it instead of stopping.
    if (LENIENT) { console.error(`  ${locale.code}: home.mission.missions has no ${id} yet`); return null; }
    throw new Error(`${locale.code}: home.mission.missions has no ${id}`);
  };
  const [title, lede, steps] = r.features[page.feature];
  const art = artworkLocale(locale.code);
  const depth = locale.code === 'en' ? '../../' : '../../../';
  const screenshot = `${depth}assets/store/2.14/sources/ios/${art}/${page.capture}.png`;
  const lines = [
    '---',
    `title: ${quote(title)}`,
    `seoTitle: ${quote(title)}`,
    `description: ${quote(lede)}`,
    `lede: ${quote(lede)}`,
    `lang: ${quote(locale.code)}`,
    `translationOf: ${quote(page.slug)}`,
    `order: ${page.order}`,
    `missions: [${page.missions.map(quote).join(', ')}]`,
    `updatedDate: ${quote(UPDATED)}`,
    `release: ${quote(RELEASE.version)}`,
    `screenshot: ${quote(screenshot)}`,
    `screenshotAlt: ${quote(r.captions[page.caption])}`,
    '---',
    '',
    page.intro(r, mission, home, support),
    '',
    `## ${r.how}`,
    '',
    ...steps.map((step, i) => `${i + 1}. ${step}`),
  ];
  if (page.bullets) {
    const known = page.missions.map(mission).filter(Boolean);
    lines.push('', ...known.map((m) => `- **${m.name}**: ${m.body}`));
  }
  lines.push('', `## ${r.limits}`, '', page.check(r, mission, home, support), '');
  return lines.join('\n');
}

let changed = 0;
for (const locale of enabledLocales()) {
  const dir = locale.code === 'en' ? OUT : join(OUT, locale.path);
  mkdirSync(dir, { recursive: true });
  for (const page of PAGES) {
    const file = join(dir, `${page.slug}.md`);
    const next = render(locale, page);
    const current = existsSync(file) ? readFileSync(file, 'utf8') : null;
    if (current === next) continue;
    changed += 1;
    if (CHECK) console.error(`  would change ${file.replace(ROOT + '/', '')}`);
    else writeFileSync(file, next);
  }
}
if (CHECK && changed) {
  console.error(`\n  ${changed} feature page(s) are out of date: run npm run features:build\n`);
  process.exit(1);
}
console.log(CHECK ? '  Feature pages are up to date.' : `  Wrote ${changed} feature page(s).`);
