import { localeByCode, type LocaleCode, type LocaleEntry } from './config';

/**
 * One date formatter for the whole site, keyed on the registry's `dateLocale`.
 * Node 22 ships full ICU, so Turkish and Russian month names render at build.
 */
export function formatDate(date: Date, locale: LocaleEntry | LocaleCode, month: 'long' | 'short' = 'long'): string {
  const l = typeof locale === 'string' ? localeByCode(locale) : locale;
  return new Intl.DateTimeFormat(l?.dateLocale ?? 'en-GB', { day: 'numeric', month, year: 'numeric' }).format(date);
}

/**
 * `SITE.lastUpdated` is a bare YYYY-MM-DD. `new Date('2026-08-14')` is UTC
 * midnight, which renders as the previous day west of UTC; parsing at local
 * noon sidesteps that.
 */
export function parseLocalNoon(isoDate: string): Date {
  return new Date(`${isoDate}T12:00:00`);
}
