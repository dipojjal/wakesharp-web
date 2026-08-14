#!/usr/bin/env node
/**
 * Derive the site's web-sized image assets from the WakeSharp app repo's Design folder.
 *
 * Run once, commit the output. This is a one-way derivation: `src/assets/` holds
 * downsampled derivatives and is NOT a backup of the originals. The sources
 * `Design/Screenshots/_raw/` and `_plates/` are gitignored in the app repo and exist
 * only on the author's machine (archived separately).
 *
 *   WAKESHARP_DESIGN_DIR=/path/to/WakeSharp/Design npm run assets:prep
 */
import { mkdir, writeFile, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = resolve(process.env.WAKESHARP_DESIGN_DIR ?? join(ROOT, '..', 'WakeSharp', 'Design'));
const ASSETS = join(ROOT, 'src', 'assets');
const PUBLIC = join(ROOT, 'public');

if (!existsSync(SRC)) {
  console.error(`\nDesign folder not found: ${SRC}`);
  console.error('Set WAKESHARP_DESIGN_DIR to the WakeSharp repo\'s Design directory.\n');
  process.exit(1);
}

/** Raw device captures → feature-row phone screens. Semantic names, not ordinals. */
const SCREENS = [
  ['01-home', 'home'],
  ['02-ring', 'ring'],
  ['03-mission', 'mission'],
  ['04-games', 'games'],
  ['05-reveal', 'reveal'],
  ['06-smart', 'smart'],
  ['07-stats', 'stats'],
];

/** Mascot cutouts (RGBA). Source names carry pose ordinals; the site uses the pose. */
const MASCOTS = [
  ['hero', 'hero'],
  ['1_asleep', 'asleep'],
  ['2_waking_yawn', 'waking'],
  ['3_focused', 'focused'],
  ['4_celebrating', 'celebrating'],
  ['5_encouraging', 'encouraging'],
];

const done = [];

async function emit(label, out, pipeline) {
  await mkdir(dirname(out), { recursive: true });
  const info = await pipeline.toFile(out);
  done.push({ label, out: out.replace(ROOT + '/', ''), w: info.width, h: info.height, kb: Math.round(info.size / 1024) });
}

async function main() {
  await rm(join(ASSETS, 'screens'), { recursive: true, force: true });
  await rm(join(ASSETS, 'store'), { recursive: true, force: true });
  await rm(join(ASSETS, 'mascot'), { recursive: true, force: true });

  // ── 1. Clean captures → 1000w. These carry the feature rows; the site draws its
  //       own device frame around them and writes its own headlines.
  for (const [platform, dir] of [['ios', 'ios'], ['android', 'android']]) {
    for (const [from, to] of SCREENS) {
      const input = join(SRC, 'Screenshots', '_raw', dir, `${from}.png`);
      if (!existsSync(input)) { console.warn(`  skip (missing): ${input}`); continue; }
      await emit(
        `screen ${platform}/${to}`,
        join(ASSETS, 'screens', platform, `${to}.png`),
        // flatten: captures are opaque already, but this guarantees no stray alpha
        // channel survives into the AVIF/WebP derivatives astro:assets generates.
        sharp(input).resize({ width: 1000, withoutEnlargement: true }).flatten().png({ quality: 90, compressionLevel: 9 })
      );
    }
  }

  // ── 2. Shipped store frames → 800w. These already contain device frame, background
  //       plate and baked-in headline. Carousel only; never rendered above ~400px CSS.
  for (const [platform, dir] of [['ios', 'ios-6.9'], ['android', 'play-phone']]) {
    for (let i = 1; i <= 7; i++) {
      const n = String(i).padStart(2, '0');
      const input = join(SRC, 'Screenshots', dir, `${n}.png`);
      if (!existsSync(input)) { console.warn(`  skip (missing): ${input}`); continue; }
      await emit(
        `store ${platform}/${n}`,
        join(ASSETS, 'store', platform, `${n}.png`),
        sharp(input).resize({ width: 800, withoutEnlargement: true }).flatten().png({ quality: 90, compressionLevel: 9 })
      );
    }
  }

  // ── 3. Mascot cutouts → trimmed to their alpha bbox, then 768w. Trimming matters:
  //       the source PNGs are 1024×1024 with the bird floating in transparency, so
  //       untrimmed they carry huge dead margins that break every layout calculation.
  //       Aspect ratio is preserved and never forced square — components pass width only.
  for (const [from, to] of MASCOTS) {
    const input = join(SRC, 'Mascot', 'cutouts', `${from}.png`);
    if (!existsSync(input)) { console.warn(`  skip (missing): ${input}`); continue; }
    await emit(
      `mascot ${to}`,
      join(ASSETS, 'mascot', `${to}.png`),
      sharp(input).trim({ threshold: 1 }).resize({ width: 768, withoutEnlargement: true }).png({ quality: 90, compressionLevel: 9 })
    );
  }

  // ── 4. Icons → public/. Not hashed, referenced by fixed path from <head>.
  const icon = join(SRC, 'Mascot', 'app_icon.png');
  if (existsSync(icon)) {
    for (const [size, name] of [[512, 'icon-512.png'], [192, 'icon-192.png'], [180, 'apple-touch-icon.png'], [32, 'icon-32.png']]) {
      await emit(`icon ${size}`, join(PUBLIC, name), sharp(icon).resize(size, size, { fit: 'cover' }).flatten().png({ compressionLevel: 9 }));
    }
    // favicon.ico: a single 32×32 PNG wrapped in an ICO container. Valid since Vista,
    // and the only thing that still requests /favicon.ico is old crawlers.
    const png32 = await sharp(icon).resize(32, 32, { fit: 'cover' }).flatten().png({ compressionLevel: 9 }).toBuffer();
    const header = Buffer.alloc(22);
    header.writeUInt16LE(0, 0);            // reserved
    header.writeUInt16LE(1, 2);            // type: icon
    header.writeUInt16LE(1, 4);            // image count
    header.writeUInt8(32, 6);              // width
    header.writeUInt8(32, 7);              // height
    header.writeUInt8(0, 8);               // palette
    header.writeUInt8(0, 9);               // reserved
    header.writeUInt16LE(1, 10);           // colour planes
    header.writeUInt16LE(32, 12);          // bits per pixel
    header.writeUInt32LE(png32.length, 14);
    header.writeUInt32LE(22, 18);          // offset
    await writeFile(join(PUBLIC, 'favicon.ico'), Buffer.concat([header, png32]));
    done.push({ label: 'favicon.ico', out: 'public/favicon.ico', w: 32, h: 32, kb: Math.round((22 + png32.length) / 1024) });
  }

  const total = done.reduce((a, d) => a + d.kb, 0);
  for (const d of done) console.log(`  ${d.label.padEnd(24)} ${String(d.w).padStart(4)}×${String(d.h).padEnd(5)} ${String(d.kb).padStart(5)} KB  ${d.out}`);
  console.log(`\n  ${done.length} files, ${(total / 1024).toFixed(1)} MB committed to the repo.`);
  console.log('  Reminder: these are derivatives. The originals live only in the app repo (gitignored) and the archive.\n');
}

await main();
