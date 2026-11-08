#!/usr/bin/env node
/**
 * The images lifecycle emails show, served from https://wakesharp.app/email/.
 *
 * Derived from the app repo, run once, output committed (like prep-assets.mjs):
 * the Lark poses come from the app's own art, the wordmark from the brand kit.
 *
 *   WAKESHARP_APP_DIR=/path/to/WakeSharp npm run assets:email
 *
 * `lark.png` is the one the emails use today: the Lark facing forward in a
 * 336 px square, which the lifecycle-dispatch renderer (app repo,
 * supabase/functions/lifecycle-dispatch/render.ts) draws at 112x112 CSS px,
 * so it stays sharp on 3x screens. The rest are spares for later templates.
 * Each has a 1x file and an @2x file for sharp screens. All are transparent,
 * so one layout serves light and dark mail clients:
 *   - `lark-<pose>.png`: a 600x240 banner (1200x480 at 2x) for a 600 px wide
 *     email, the pose trimmed to its own outline and centred;
 *   - `lark-<pose>-square.png`: the same pose in a 112 px square (224 at 2x);
 *   - `wordmark-on-light.png` / `wordmark-on-dark.png`: the app icon beside
 *     "WakeSharp", 200 px wide (400 at 2x), in the ink for a light or a dark
 *     background.
 * Nothing is scaled up: the app's art is 640 px square.
 *
 * Which pose goes with which message (app repo plan "Lifecycle email + push",
 * section E) is the email templates' choice; the names say what each shows.
 */
import { mkdir, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const APP = resolve(process.env.WAKESHARP_APP_DIR ?? join(ROOT, '..', 'WakeSharp'));
const ART = join(APP, 'ios', 'Packages', 'WakeSharpKit', 'Sources', 'WSDesignSystem', 'Art');
const LOGOS = join(APP, 'Design', 'UGC', 'UGC Creator Starter Pack', 'Brand Assets', 'Logos');
const OUT = join(ROOT, 'public', 'email');

/** [source under Art/, output name, what it shows]. */
const LARKS = [
  ['mascot_hero.webp', 'lark-hero', 'standing, the default'],
  ['mascot_encouraging.webp', 'lark-waving', 'waving hello'],
  ['onboarding/lark_paywall.webp', 'lark-gift', 'holding a gift box (the exit offer’s art)'],
  ['onboarding/lark_plan_summary.webp', 'lark-plan', 'holding a ticked checklist'],
  ['onboarding/lark_concerned.webp', 'lark-concerned', 'worried'],
  ['mascot_celebrating.webp', 'lark-celebrating', 'cheering, wings up'],
  ['mascot_night_cap.webp', 'lark-night-cap', 'in a night cap, winking'],
];

/** The emails' Lark: facing forward, one 336 px square file (112 CSS px at 3x). */
const MAIN = { source: 'mascot_hero.webp', file: 'lark.png', size: 336, inset: 6 };

/** [source under Logos/, output name]. */
const WORDMARKS = [
  ['WakeSharp Logo (light backgrounds).png', 'wordmark-on-light'],
  ['WakeSharp Logo (dark backgrounds).png', 'wordmark-on-dark'],
];

const BANNER = { width: 600, height: 240 };
const SQUARE = 112;
/** Breathing room inside the banner at 1x, so anti-aliased edges never touch it. */
const INSET = 6;
const WORDMARK_WIDTH = 200;
const TRANSPARENT = { r: 0, g: 0, b: 0, alpha: 0 };

for (const dir of [ART, LOGOS]) {
  if (!existsSync(dir)) {
    console.error(`\nNot found: ${dir}\nSet WAKESHARP_APP_DIR to the WakeSharp app repository.\n`);
    process.exit(1);
  }
}

/**
 * A dithered 256-colour palette with alpha: a third of the full-colour size,
 * and side by side with the source at 2x the fur and gradients look the same.
 * Mail clients download every image on every open, so size counts.
 */
const png = (image) => image.png({ palette: true, effort: 10, compressionLevel: 9 });

const done = [];
async function emit(file, pipeline) {
  const info = await pipeline.toFile(join(OUT, file));
  done.push(`${file.padEnd(28)} ${info.width}x${info.height}  ${Math.round(info.size / 1024)} KB`);
}

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });

/** The trimmed pose, fitted inside a transparent `width` x `height` canvas with `inset` px to spare. */
async function framed(trimmed, width, height, inset) {
  const pose = await sharp(trimmed)
    .resize({ width: width - 2 * inset, height: height - 2 * inset, fit: 'inside', withoutEnlargement: true })
    .toBuffer();
  const meta = await sharp(pose).metadata();
  return png(
    sharp({ create: { width, height, channels: 4, background: TRANSPARENT } }).composite([
      { input: pose, left: Math.round((width - meta.width) / 2), top: Math.round((height - meta.height) / 2) },
    ]),
  );
}

{
  const trimmed = await sharp(join(ART, MAIN.source)).trim({ threshold: 1 }).toBuffer();
  await emit(MAIN.file, await framed(trimmed, MAIN.size, MAIN.size, MAIN.inset));
}

for (const [source, name] of LARKS) {
  const input = join(ART, source);
  // Trim to the pose's own outline, then fit it into the 2x banner's inner box.
  const trimmed = await sharp(input).trim({ threshold: 1 }).toBuffer();
  for (const [suffix, box, inset] of [['', BANNER, INSET], ['-square', { width: SQUARE, height: SQUARE }, 2]]) {
    for (const scale of [2, 1]) {
      await emit(
        `${name}${suffix}${scale === 2 ? '@2x' : ''}.png`,
        await framed(trimmed, box.width * scale, box.height * scale, inset * scale),
      );
    }
  }
}

for (const [source, name] of WORDMARKS) {
  const input = join(LOGOS, source);
  for (const scale of [2, 1]) {
    await emit(`${name}${scale === 2 ? '@2x' : ''}.png`, png(sharp(input).resize({ width: WORDMARK_WIDTH * scale })));
  }
}

console.log(`\n  public/email/\n  ${done.join('\n  ')}\n`);
