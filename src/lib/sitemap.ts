/**
 * Which built pages belong in the sitemap. astro.config.mjs passes this to
 * `@astrojs/sitemap`; the tests import it so a new noindex route cannot land
 * without an explicit include/exclude decision.
 *
 * Pages that are never generated (drafts, future-dated posts) are already
 * absent — see src/lib/blog.ts. This list is only the pages that ARE built
 * and still must not be offered to crawlers.
 */
import { DEFAULT_LOCALE, enabledLocales } from '../i18n/config';
import { localePath } from '../i18n/routes';

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
