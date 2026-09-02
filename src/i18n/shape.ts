/**
 * Structural comparison of a translated catalog against the English one.
 *
 * `satisfies typeof en` already fails typecheck on a missing or extra key, but
 * it cannot see array lengths, `{placeholders}`, `[link](keys)` or unbalanced
 * markup — a translator can drop the fifth mission or rename `{email}` and the
 * types stay happy. This walks both trees and reports every such difference.
 * Used by tests/i18n/catalogs.test.ts for registered locales and by
 * scripts/check-i18n.mjs for a locale that is still being translated.
 */

export interface ShapeProblem {
  path: string;
  problem: string;
}

const PLACEHOLDER = /\{([A-Za-z0-9_]+)\}/g;
const LINK = /\[[^\]]+\]\(([A-Za-z0-9_.-]+)\)/g;
const ZERO_WIDTH = /[​-‍﻿⁠]/;

const keySet = (s: string, re: RegExp): string =>
  [...s.matchAll(re)]
    .map((m) => m[1] as string)
    .sort()
    .join(',');

export function compareShape(reference: unknown, candidate: unknown, path = ''): ShapeProblem[] {
  const out: ShapeProblem[] = [];
  const at = (k: string): string => (path ? `${path}.${k}` : k);

  if (typeof reference === 'string') {
    if (typeof candidate !== 'string') {
      out.push({ path, problem: `expected a string, got ${typeof candidate}` });
      return out;
    }
    if (reference.trim() !== '' && candidate.trim() === '') out.push({ path, problem: 'empty translation' });
    const refVars = keySet(reference, PLACEHOLDER);
    const candVars = keySet(candidate, PLACEHOLDER);
    if (refVars !== candVars) out.push({ path, problem: `placeholders differ: English has {${refVars}}, translation has {${candVars}}` });
    const refLinks = keySet(reference, LINK);
    const candLinks = keySet(candidate, LINK);
    if (refLinks !== candLinks) out.push({ path, problem: `link keys differ: English has (${refLinks}), translation has (${candLinks})` });
    if (((candidate.match(/\*\*/g) ?? []).length) % 2 !== 0) out.push({ path, problem: 'unbalanced **' });
    if (ZERO_WIDTH.test(candidate)) out.push({ path, problem: 'zero-width character' });
    if (/<[a-z][^>]*>/i.test(candidate)) out.push({ path, problem: 'raw HTML is not allowed in a catalog string' });
    return out;
  }

  if (Array.isArray(reference)) {
    if (!Array.isArray(candidate)) {
      out.push({ path, problem: 'expected an array' });
      return out;
    }
    if (candidate.length !== reference.length) {
      out.push({ path, problem: `array has ${candidate.length} items, English has ${reference.length}` });
    }
    const n = Math.min(candidate.length, reference.length);
    for (let i = 0; i < n; i++) out.push(...compareShape(reference[i], candidate[i], at(String(i))));
    return out;
  }

  if (reference !== null && typeof reference === 'object') {
    if (candidate === null || typeof candidate !== 'object' || Array.isArray(candidate)) {
      out.push({ path, problem: 'expected an object' });
      return out;
    }
    const ref = reference as Record<string, unknown>;
    const cand = candidate as Record<string, unknown>;
    for (const k of Object.keys(ref)) if (!(k in cand)) out.push({ path: at(k), problem: 'missing key' });
    for (const k of Object.keys(cand)) if (!(k in ref)) out.push({ path: at(k), problem: 'unexpected key' });
    for (const k of Object.keys(ref)) if (k in cand) out.push(...compareShape(ref[k], cand[k], at(k)));
    return out;
  }

  if (typeof reference !== typeof candidate) out.push({ path, problem: `expected a ${typeof reference}` });
  return out;
}
