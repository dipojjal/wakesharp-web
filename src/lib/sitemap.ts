/**
 * Which built pages belong in the sitemap, and the <priority> and <lastmod>
 * each one carries. astro.config.mjs passes these to `@astrojs/sitemap`; the
 * tests import them so a new noindex route cannot land without an explicit
 * include/exclude decision.
 *
 * Pages that are never generated (drafts, future-dated posts) are already
 * absent — see src/lib/blog.ts. This list is only the pages that ARE built
 * and still must not be offered to crawlers.
 */
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { SITE } from '../config/site';
import { DEFAULT_LOCALE, enabledLocales, localeByPath } from '../i18n/config';
import { localePath } from '../i18n/routes';
import { PRIVACY } from '../templates/legal-copy';

const EXCLUDED_PATHS = new Set<string>();

for (const locale of enabledLocales()) {
  // 303 destinations after the contact form; they carry noindex in the head.
  for (const path of ['/contact-sent', '/contact-error'] as const) {
    EXCLUDED_PATHS.add(localePath(locale, path));
  }
  // Share-link decoder shells. The useful URL is /c/:payload (a rewrite), not
  // the bare page the rewrite lands on.
  for (const path of ['/c', '/p'] as const) {
    EXCLUDED_PATHS.add(localePath(locale, path));
  }
  // Localized legal wrappers canonicalize to the English page, so listing them
  // would advertise a duplicate.
  if (locale.code !== DEFAULT_LOCALE) {
    EXCLUDED_PATHS.add(localePath(locale, '/privacy'));
    EXCLUDED_PATHS.add(localePath(locale, '/terms'));
  }
}

/** Absolute page URL as `@astrojs/sitemap` hands it to `filter`. */
export function includeInSitemap(page: string): boolean {
  const path = new URL(page).pathname.replace(/\/+$/, '') || '/';
  return !EXCLUDED_PATHS.has(path);
}

/** `https://…/es/blog/x` → ['/es', '/blog/x']. English pages have no prefix. */
function splitLocale(page: string): [prefix: string, path: string] {
  const pathname = new URL(page).pathname.replace(/\/+$/, '') || '/';
  const [, first = '', ...rest] = pathname.split('/');
  const locale = localeByPath(first);
  if (!locale || locale.code === DEFAULT_LOCALE) return ['', pathname];
  return [`/${first}`, `/${rest.join('/')}`];
}

const PRIORITY: Record<string, number> = {
  '/': 1,
  '/blog': 0.8,
  '/support': 0.6,
  '/contact': 0.5,
  '/privacy': 0.3,
  '/terms': 0.3,
  '/account/delete': 0.3,
  '/about': 0.5,
  '/features': 0.6,
};

/**
 * <priority> by page type, the same in every language; posts and landing pages are 0.7 and
 * anything unlisted gets the protocol default, 0.5. Google ignores the tag.
 */
export function sitemapPriority(page: string): number {
  const [, path] = splitLocale(page);
  return PRIORITY[path] ?? (path.startsWith('/blog/') || path.startsWith('/features/') ? 0.7 : 0.5);
}

const MODIFIED_TIME = /<meta property="article:modified_time" content="([^"]+)"/;

/** A built post's own article:modified_time, i.e. updatedDate ?? pubDate (BlogPostLayout). */
function postModified(file: string): Date {
  const match = MODIFIED_TIME.exec(readFileSync(file, 'utf8'));
  if (!match) throw new Error(`${file} has no article:modified_time meta`);
  return new Date(match[1]);
}

/**
 * <lastmod>, only where the site records when a page changed: a post's
 * modified time, a blog index's newest post, the legal pages' stamped dates.
 * Every other page gets none rather than a guess — Google stops trusting
 * lastmod on a site whose dates turn out to be wrong. Reads the built pages,
 * so `distDir` must already hold them (true when @astrojs/sitemap runs).
 */
export function sitemapLastmod(page: string, distDir: string): Date | undefined {
  const [prefix, path] = splitLocale(page);
  if (path === '/privacy') return new Date(PRIVACY.lastUpdated);
  if (path === '/terms') return new Date(SITE.lastUpdated);
  if (path.startsWith('/blog/')) return postModified(join(distDir, `${prefix}${path}.html`));
  if (path === '/blog') {
    // Each language's index lists exactly its own live posts: the files built here.
    const dir = join(distDir, prefix, 'blog');
    const posts = readdirSync(dir).filter((f) => f.endsWith('.html'));
    return new Date(Math.max(...posts.map((f) => postModified(join(dir, f)).getTime())));
  }
  return undefined;
}
