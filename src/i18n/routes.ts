/**
 * URL helpers for the locale-prefixed page tree.
 *
 * English lives at the root; every other enabled locale lives under
 * `/<path>/…` via src/pages/[lang]/. These helpers are the only place that rule
 * is spelled out, so a component never concatenates a prefix by hand.
 */
import {
  DEFAULT_LOCALE,
  enabledLocales,
  localeByCode,
  localeByPath,
  type EnabledLocale,
  type LocaleCode,
  type LocaleEntry,
} from './config';

export interface Alternate {
  locale: EnabledLocale;
  href: string;
}

/**
 * `getStaticPaths` for every route under src/pages/[lang]/: enabled locales
 * other than the default. NEVER emits `en` — Astro would write the 404 body of
 * `/en/…` to disk and Vercel would then serve it as a 200.
 */
export function localeStaticPaths(): { params: { lang: string } }[] {
  return enabledLocales()
    .filter((l) => l.code !== DEFAULT_LOCALE)
    .map((l) => ({ params: { lang: l.path } }));
}

/** The locale a `[lang]` route was generated for. Throws on anything unexpected. */
export function localeFromParams(params: Record<string, string | undefined>): EnabledLocale {
  const lang = params.lang;
  const l = lang ? localeByPath(lang) : undefined;
  if (!l || !l.enabled || l.code === DEFAULT_LOCALE) {
    throw new Error(`Not an enabled non-default locale path: "${lang}"`);
  }
  return l as EnabledLocale;
}

/** `Astro.currentLocale` → registry entry, defaulting to English. */
export function resolveLocale(code: string | undefined): EnabledLocale {
  const l = code ? localeByCode(code) : undefined;
  if (l && l.enabled) return l as EnabledLocale;
  return localeByCode(DEFAULT_LOCALE) as EnabledLocale;
}

/**
 * The same root-relative path in another locale: `/` → `/es`, `/support` →
 * `/es/support`, `/#faq` → `/es#faq`. Never emits a trailing slash (the site is
 * trailingSlash: 'never' and Vercel would answer `/es/` with a 308).
 */
export function localePath(locale: LocaleEntry | LocaleCode, path: string): string {
  const l = typeof locale === 'string' ? localeByCode(locale) : locale;
  if (!l) throw new Error(`Unknown locale "${String(locale)}"`);
  const [rawPath, hash] = path.split('#', 2);
  let p = (rawPath ?? '').startsWith('/') ? (rawPath as string) : `/${rawPath ?? ''}`;
  if (p.length > 1) p = p.replace(/\/+$/, '');
  const suffix = hash ? `#${hash}` : '';
  if (l.code === DEFAULT_LOCALE) return `${p}${suffix}`;
  return `${p === '/' ? `/${l.path}` : `/${l.path}${p}`}${suffix}`;
}

/**
 * Where this page exists. Defaults to every enabled locale (Tier A pages); pass
 * `[english]` for the legal pages and `[]` for pages that emit no hreflang.
 */
export function alternatesFor(path: string, available: readonly LocaleEntry[] = enabledLocales()): Alternate[] {
  return available
    .filter((l): l is EnabledLocale => l.enabled)
    .map((l) => ({ locale: l, href: localePath(l, path) }));
}

/**
 * Where the header and footer "Blog" links go. The blog is English-only until
 * Phase 2 localizes it (translated posts under src/content/blog/<lang>/), so
 * every locale links to the English index for now.
 */
export function blogPath(_locale: LocaleEntry): string {
  return '/blog';
}
