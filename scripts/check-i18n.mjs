#!/usr/bin/env node
/**
 * Check one locale's catalog against the English shape before it is registered:
 *
 *   npx tsx scripts/check-i18n.mjs es
 *
 * Registered locales are covered by tests/i18n/catalogs.test.ts; this exists so
 * a translation in progress can be checked without touching catalog.ts.
 */
import { en } from '../src/i18n/en/index';
import { compareShape } from '../src/i18n/shape';

const code = process.argv[2];
if (!code) {
  console.error('usage: npx tsx scripts/check-i18n.mjs <locale-code>');
  process.exit(2);
}
const exportName = code.replace(/-/g, '');
let mod;
try {
  mod = await import(`../src/i18n/${code}/index.ts`);
} catch (err) {
  console.error(`  ✗ could not load src/i18n/${code}/index.ts: ${err instanceof Error ? err.message : err}`);
  process.exit(1);
}
const catalog = mod[exportName];
if (!catalog) {
  console.error(`  ✗ src/i18n/${code}/index.ts must export "${exportName}" (the locale code without hyphens)`);
  process.exit(1);
}
const problems = compareShape(en, catalog);
for (const p of problems) console.error(`  ✗ ${p.path}: ${p.problem}`);
if (problems.length) {
  console.error(`\n  ${problems.length} problem(s) in the ${code} catalog.\n`);
  process.exit(1);
}
console.log(`\n  OK: the ${code} catalog matches the English shape.\n`);
