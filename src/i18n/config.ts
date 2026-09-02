/**
 * The locale registry: THE one place a language is declared.
 *
 * Everything else derives from this list — astro.config.mjs (the i18n block and
 * the sitemap's hreflang map), BaseLayout (`lang`/`dir`), BaseHead (hreflang and
 * og:locale), the language selector, the date formatter, api/contact.ts (which
 * result page to redirect to) and scripts/check-copy.mjs (which pages must exist).
 *
 * Deliberately dependency-free: no `astro:*` imports, so astro.config.mjs, the
 * Vercel function and the linter can all import it.
 *
 * A locale ships in two steps: translate every file under src/i18n/<code>/ and
 * register it in src/i18n/catalog.ts, then flip `enabled` here. Flipping first
 * fails `astro check` on the catalog map, which is the point — a locale can never
 * be routed without a complete catalog behind it.
 *
 * English stays at the root with no prefix (prefixDefaultLocale: false): both
 * shipped apps hardcode https://wakesharp.app/privacy and /terms, /support is the
 * App Store Connect support URL and /account/delete is filed with Google Play.
 * Those paths must keep serving English with no redirect hop.
 */

export type Dir = 'ltr' | 'rtl';

export interface Locale {
  /** BCP 47 tag: the key of the catalog map and the value of Astro.currentLocale. */
  code: string;
  /** URL segment, lowercase (`pt-br`). Never a reserved root segment. */
  path: string;
  /** For `hreflang`, `<html lang>` and `og:locale:alternate`. */
  hreflang: string;
  /** For `og:locale`. */
  og: string;
  /** The language's own name for itself. Never translated. */
  name: string;
  dir: Dir;
  /** Passed to Intl.DateTimeFormat. */
  dateLocale: string;
  /** Only enabled locales are built, listed in the sitemap, or offered in the selector. */
  enabled: boolean;
}

export const LOCALES = [
  { code: 'en', path: 'en', hreflang: 'en', og: 'en_US', name: 'English', dir: 'ltr', dateLocale: 'en-GB', enabled: true },
  // Phase 1
  { code: 'es', path: 'es', hreflang: 'es', og: 'es_ES', name: 'Español', dir: 'ltr', dateLocale: 'es', enabled: true },
  { code: 'ru', path: 'ru', hreflang: 'ru', og: 'ru_RU', name: 'Русский', dir: 'ltr', dateLocale: 'ru', enabled: true },
  { code: 'tr', path: 'tr', hreflang: 'tr', og: 'tr_TR', name: 'Türkçe', dir: 'ltr', dateLocale: 'tr', enabled: true },
  // Phase 2
  { code: 'pt-BR', path: 'pt-br', hreflang: 'pt-BR', og: 'pt_BR', name: 'Português (Brasil)', dir: 'ltr', dateLocale: 'pt-BR', enabled: true },
  { code: 'id', path: 'id', hreflang: 'id', og: 'id_ID', name: 'Bahasa Indonesia', dir: 'ltr', dateLocale: 'id', enabled: true },
  { code: 'uk', path: 'uk', hreflang: 'uk', og: 'uk_UA', name: 'Українська', dir: 'ltr', dateLocale: 'uk', enabled: true },
  { code: 'de', path: 'de', hreflang: 'de', og: 'de_DE', name: 'Deutsch', dir: 'ltr', dateLocale: 'de', enabled: true },
  // Phase 3 — `ar` is the first right-to-left locale; see docs/i18n/glossary.md
  { code: 'ar', path: 'ar', hreflang: 'ar', og: 'ar_AR', name: 'العربية', dir: 'rtl', dateLocale: 'ar', enabled: false },
  { code: 'fr', path: 'fr', hreflang: 'fr', og: 'fr_FR', name: 'Français', dir: 'ltr', dateLocale: 'fr', enabled: false },
  { code: 'hi', path: 'hi', hreflang: 'hi', og: 'hi_IN', name: 'हिन्दी', dir: 'ltr', dateLocale: 'hi', enabled: false },
  { code: 'ja', path: 'ja', hreflang: 'ja', og: 'ja_JP', name: '日本語', dir: 'ltr', dateLocale: 'ja', enabled: false },
] as const satisfies readonly Locale[];

export type LocaleEntry = (typeof LOCALES)[number];
export type LocaleCode = LocaleEntry['code'];
export type EnabledLocale = Extract<LocaleEntry, { enabled: true }>;
export type EnabledLocaleCode = EnabledLocale['code'];

export const DEFAULT_LOCALE = 'en' satisfies EnabledLocaleCode;

/**
 * First URL segments that already mean something at the root. A locale path
 * equal to one of these would shadow a real page, so the registry refuses it.
 */
export const RESERVED_ROOT_SEGMENTS = [
  'blog', 'privacy', 'terms', 'support', 'contact', 'contact-sent', 'contact-error',
  'c', 'p', 'r', 'account', 'api', '404', 'rss.xml', '_astro', 'badges',
] as const;

export function enabledLocales(): EnabledLocale[] {
  return LOCALES.filter((l): l is EnabledLocale => l.enabled);
}

export function localeByCode(code: string): LocaleEntry | undefined {
  return LOCALES.find((l) => l.code === code);
}

export function localeByPath(path: string): LocaleEntry | undefined {
  return LOCALES.find((l) => l.path === path);
}

export function isEnabledLocaleCode(code: string): code is EnabledLocaleCode {
  const l = localeByCode(code);
  return l !== undefined && l.enabled;
}

export function isDefaultLocale(locale: Pick<Locale, 'code'> | string): boolean {
  return (typeof locale === 'string' ? locale : locale.code) === DEFAULT_LOCALE;
}

/* ── Registry invariants, checked once at import time ─────────────────────── */
{
  const codes = new Set<string>();
  const paths = new Set<string>();
  for (const l of LOCALES) {
    if (!/^[a-z]{2,3}(-[a-z0-9]{2,8})?$/.test(l.path)) {
      throw new Error(`Locale "${l.code}": path "${l.path}" must be lowercase, e.g. "pt-br".`);
    }
    if ((RESERVED_ROOT_SEGMENTS as readonly string[]).includes(l.path)) {
      throw new Error(`Locale "${l.code}": path "${l.path}" is a reserved root segment.`);
    }
    if (codes.has(l.code) || paths.has(l.path)) {
      throw new Error(`Locale "${l.code}" / path "${l.path}" is declared twice.`);
    }
    codes.add(l.code);
    paths.add(l.path);
  }
  const def = localeByCode(DEFAULT_LOCALE);
  if (!def || !def.enabled) throw new Error(`The default locale "${DEFAULT_LOCALE}" must be enabled.`);
}

export function defaultLocale(): EnabledLocale {
  return localeByCode(DEFAULT_LOCALE) as EnabledLocale;
}

/** Every declared code, enabled or not, as a tuple for zod enums. */
export const LOCALE_CODES = LOCALES.map((l) => l.code) as [LocaleCode, ...LocaleCode[]];
