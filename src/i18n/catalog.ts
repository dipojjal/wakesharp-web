/**
 * Every enabled locale's catalog, keyed by code.
 *
 * `satisfies Record<EnabledLocaleCode, Catalog>` is the guard: enabling a locale
 * in config.ts without a complete, shape-identical catalog here fails
 * `astro check`, which is the first step of `npm run build`. Each locale file
 * ends `satisfies typeof en.<file>`, so a missing or extra key is reported at
 * the exact key.
 */
import { en } from './en';
import { es } from './es';
import { ru } from './ru';
import { tr } from './tr';
import type { EnabledLocaleCode } from './config';

export type Catalog = typeof en;

export const CATALOGS = {
  en,
  es,
  ru,
  tr,
} satisfies Record<EnabledLocaleCode, Catalog>;

export function getCatalog(locale: EnabledLocaleCode | { code: EnabledLocaleCode }): Catalog {
  const code = typeof locale === 'string' ? locale : locale.code;
  return CATALOGS[code];
}
