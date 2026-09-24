#!/usr/bin/env node
/**
 * On-page SEO rules for the built site, checked on every page in dist/.
 *
 * check-copy.mjs guards what the copy CLAIMS; this guards what search engines
 * READ: the title and description a results page shows, one H1, a canonical
 * that names the page itself, a social image, structured data that parses,
 * and a sitemap that lists exactly the pages that want to be indexed. Posts are
 * written by an unattended routine, and before this ran nothing stopped a
 * 90-character title or a page that was noindexed and listed at once.
 *
 *   npm run seo              # warnings only
 *   npm run seo -- --strict  # any problem fails (what `npm run verify` runs)
 *
 * Length limits are in characters as a results page shows them (Unicode code
 * points). Japanese, Hindi and Arabic are exempt from the length limits: their
 * characters are not comparable in width to Latin ones, and a single number
 * would be wrong for all three.
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { DEFAULT_LOCALE, enabledLocales } from '../src/i18n/config';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = process.env.SEO_DIST ?? join(ROOT, 'dist');
const SITE = 'https://wakesharp.app';
const STRICT = process.argv.includes('--strict');

const TITLE_MAX = 60;
const DESCRIPTION_MIN = 70;
const DESCRIPTION_MAX = 160;
/** Locales whose script makes a Latin character count meaningless. */
const NO_LENGTH_LIMITS = new Set(['ja', 'hi', 'ar']);

/** Pages that must never be indexed, relative to dist/ or dist/<locale>/. */
const MUST_BE_NOINDEX = ['404.html', 'c.html', 'p.html', 'contact-sent.html', 'contact-error.html'];

const OTHER_LOCALES = enabledLocales().filter((l) => l.code !== DEFAULT_LOCALE);

const html = [];
(function walk(dir) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p);
    else if (e.endsWith('.html')) html.push(p);
  }
})(DIST);

/** dist/es/support.html → /es/support; dist/index.html → / */
const urlPath = (name) => {
  const p = '/' + name.replace(/\.html$/, '');
  return p === '/index' ? '/' : p;
};
const absolute = (path) => (path === '/' ? SITE : SITE + path);

/** The locale a built file belongs to, by its first path segment. */
const localeOf = (name) => {
  const first = name.split('/')[0].replace(/\.html$/, '');
  return OTHER_LOCALES.find((l) => l.path === first) ?? { code: DEFAULT_LOCALE, path: '' };
};

const decode = (s) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#x27;/g, "'");
const chars = (s) => [...s].length;
const attr = (tag, name) => tag.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1];

const sitemapFile = join(DIST, 'sitemap.xml');
const sitemap = new Set(
  existsSync(sitemapFile) ? [...readFileSync(sitemapFile, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]) : [],
);

const problems = [];
const report = (name, message) => problems.push(`${name}: ${message}`);
const indexable = new Set();

for (const file of html) {
  const name = file.slice(DIST.length + 1);
  const raw = readFileSync(file, 'utf8');
  const head = raw.split('</head>')[0];
  const loc = localeOf(name);
  const own = absolute(urlPath(name));
  const relative = loc.path ? name.slice(loc.path.length + 1) : name;

  const robots = head.match(/<meta name="robots" content="([^"]*)"/)?.[1] ?? '';
  const noindex = /noindex/.test(robots);
  if (MUST_BE_NOINDEX.includes(relative) && !noindex) report(name, 'must be noindex');

  // Structured data must parse wherever it appears, indexed or not.
  for (const m of raw.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    try {
      JSON.parse(m[1]);
    } catch (err) {
      report(name, `JSON-LD does not parse (${err instanceof Error ? err.message : err})`);
    }
  }

  if (noindex) {
    if (sitemap.has(own)) report(name, 'is noindex but listed in sitemap.xml');
    continue;
  }

  const title = decode(head.match(/<title>([^<]*)<\/title>/)?.[1] ?? '').trim();
  const description = decode(head.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '').trim();
  const canonical = head.match(/<link rel="canonical" href="([^"]*)"/)?.[1];
  const ogImage = head.match(/<meta property="og:image" content="([^"]*)"/)?.[1];
  const h1s = (raw.match(/<h1[\s>]/g) ?? []).length;
  const limits = !NO_LENGTH_LIMITS.has(loc.code);

  if (!title) report(name, 'no <title>');
  else if (limits && chars(title) > TITLE_MAX) report(name, `<title> is ${chars(title)} characters (max ${TITLE_MAX}): "${title}"`);

  if (!description) report(name, 'no meta description');
  else if (limits && chars(description) > DESCRIPTION_MAX) report(name, `meta description is ${chars(description)} characters (max ${DESCRIPTION_MAX})`);
  else if (limits && chars(description) < DESCRIPTION_MIN) report(name, `meta description is ${chars(description)} characters (min ${DESCRIPTION_MIN})`);

  if (h1s !== 1) report(name, `has ${h1s} <h1> elements (want exactly one)`);
  if (!ogImage) report(name, 'no og:image');

  if (!canonical) report(name, 'indexable but names no canonical');
  else if (canonical !== own) {
    // The localized legal wrappers carry the English text on purpose and point at it.
    const legalWrapper = loc.path && (relative === 'privacy.html' || relative === 'terms.html');
    if (!(legalWrapper && canonical === absolute('/' + relative.replace(/\.html$/, '')))) {
      report(name, `canonical is ${canonical}, not the page's own URL ${own}`);
    }
  }
  if (canonical === own) indexable.add(own);
}

// The sitemap lists exactly the pages that want to be indexed under their own URL.
for (const url of sitemap) {
  if (!indexable.has(url)) report('sitemap.xml', `lists ${url}, which is not an indexable, self-canonical page`);
}
for (const url of indexable) {
  if (!sitemap.has(url)) report('sitemap.xml', `leaves out ${url}, which is indexable and self-canonical`);
}

// No page links to a sibling page that does not exist.
const built = new Set(html.map((f) => urlPath(f.slice(DIST.length + 1))));
const extras = new Set(['/rss.xml', '/sitemap.xml', '/robots.txt', '/site.webmanifest', '/og.png', '/favicon.ico']);
for (const file of html) {
  const name = file.slice(DIST.length + 1);
  const raw = readFileSync(file, 'utf8');
  for (const m of raw.matchAll(/<a\b[^>]*>/g)) {
    const href = attr(m[0], 'href');
    if (!href || !href.startsWith('/') || href.startsWith('//')) continue;
    const path = href.split(/[?#]/)[0].replace(/\/$/, '') || '/';
    if (built.has(path) || extras.has(path) || path.startsWith('/_astro/') || path.startsWith('/badges/')) continue;
    report(name, `links to ${href}, which is not a built page`);
  }
}

if (problems.length) {
  const mark = STRICT ? '✗' : '!';
  for (const p of problems) console.error(`  ${mark} ${p}`);
  console.error(`\n  ${problems.length} SEO problem(s) across ${html.length} pages${STRICT ? '' : ' (warnings; --strict fails on them)'}.\n`);
  if (STRICT) process.exit(1);
} else {
  console.log(`\n  SEO check passed across ${html.length} pages.\n`);
}
