#!/usr/bin/env node
/**
 * Walk every sunrise band and assert WCAG AA at 21 interpolated steps.
 *
 * This exists because Lighthouse's contrast audit silently SKIPS any node whose
 * background it cannot resolve to a flat colour — which is every section on this
 * page. A green a11y score would be measuring nothing here.
 *
 * Thresholds: body and dim text 4.5:1 (AA normal), accent 3.0:1 (AA large — the
 * accent only ever appears inside a headline).
 */
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = dirname(fileURLToPath(import.meta.url)) + '/..';
const src = readFileSync(join(ROOT, 'src/config/sunrise.ts'), 'utf8');

// Parse the config without a TS toolchain — the shapes are fixed and literal.
const SUNRISE = [...src.matchAll(
  /\{\s*id:\s*'([^']+)',\s*from:\s*'(#[0-9A-Fa-f]{6})',\s*to:\s*'(#[0-9A-Fa-f]{6})',\s*tone:\s*'(\w+)'(,\s*scrim:\s*true)?\s*\}/g
)].map((m) => ({ id: m[1], from: m[2], to: m[3], tone: m[4], scrim: Boolean(m[5]) }));

const TONES = Object.fromEntries([...src.matchAll(
  /^\s{2}(\w+):\s*\{\s*text:\s*'(#[0-9A-Fa-f]{6})',\s*dim:\s*'(#[0-9A-Fa-f]{6})',\s*accent:\s*'(#[0-9A-Fa-f]{6})'\s*\}/gm
)].map((m) => [m[1], { text: m[2], dim: m[3], accent: m[4] }]));

const scrimMatch = src.match(/SCRIM = \{\s*color:\s*'(#[0-9A-Fa-f]{6})',\s*alpha:\s*([\d.]+)/);
const SCRIM = { color: scrimMatch[1], alpha: Number(scrimMatch[2]) };

if (!SUNRISE.length || !Object.keys(TONES).length) {
  console.error('Could not parse src/config/sunrise.ts — did its shape change?');
  process.exit(1);
}

const rgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const lin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
const lum = (c) => 0.2126 * lin(c[0]) + 0.7152 * lin(c[1]) + 0.0722 * lin(c[2]);
const ratio = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
const mix = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t));
const over = (fg, bg, alpha) => fg.map((v, i) => Math.round(v * alpha + bg[i] * (1 - alpha)));
const hex = (c) => '#' + c.map((v) => v.toString(16).padStart(2, '0')).join('');

const STEPS = 21;
const MIN = { text: 4.5, dim: 4.5, accent: 3.0 };

let failures = 0;
const rows = [];

for (const band of SUNRISE) {
  const tone = TONES[band.tone];
  if (!tone) { console.error(`Unknown tone "${band.tone}" on section "${band.id}"`); process.exit(1); }
  const from = rgb(band.from), to = rgb(band.to);
  const worst = { text: Infinity, dim: Infinity, accent: Infinity };
  const worstAt = {};

  for (let i = 0; i < STEPS; i++) {
    let bg = mix(from, to, i / (STEPS - 1));
    // Content in a scrimmed section never touches the raw band.
    if (band.scrim) bg = over(rgb(SCRIM.color), bg, SCRIM.alpha);
    for (const key of ['text', 'dim', 'accent']) {
      const r = ratio(rgb(tone[key]), bg);
      if (r < worst[key]) { worst[key] = r; worstAt[key] = hex(bg); }
    }
  }

  const bad = Object.keys(MIN).filter((k) => worst[k] < MIN[k]);
  failures += bad.length;
  rows.push({ band, worst, worstAt, bad });
}

const pad = (s, n) => String(s).padEnd(n);
console.log(`\n  Sunrise contrast — ${STEPS} steps per band, AA thresholds text/dim 4.5:1, accent 3.0:1\n`);
console.log(`  ${pad('section', 11)}${pad('tone', 10)}${pad('text', 9)}${pad('dim', 9)}${pad('accent', 9)}worst bg`);
for (const { band, worst, worstAt, bad } of rows) {
  const f = (k) => `${worst[k].toFixed(2)}${bad.includes(k) ? '✗' : ' '}`;
  console.log(
    `  ${pad(band.id, 11)}${pad(band.tone + (band.scrim ? '*' : ''), 10)}` +
    `${pad(f('text'), 9)}${pad(f('dim'), 9)}${pad(f('accent'), 9)}${worstAt.dim}`
  );
}

if (failures) {
  console.error(`\n  ${failures} contrast failure(s). Fix TONES or the band stops in src/config/sunrise.ts.\n`);
  process.exit(1);
}
console.log('\n  All bands pass AA at every step.\n');
