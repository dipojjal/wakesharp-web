#!/usr/bin/env node
/**
 * Import the store screenshots the site shows, from the app repo's Design folder.
 *
 *  1. The gallery (`iphone`): the "Bold designed screenshots" set,
 *     Design/Store/ab-bold, the nine iPhone 6.9" frames in each of the seven
 *     languages they are drawn in (English at the top level, the rest under
 *     <lang>/). Stored 1000 px wide as WebP at quality 92: the frames are painted
 *     art that PNG cannot compress (about 2 MB a frame even at 1000 px), and
 *     Astro re-encodes every one at build time anyway.
 *  2. The in-app screens beside the copy (`capture`: the hero, the feature rows
 *     and the feature pages, inside the site's own PhoneFrame): cut out of the
 *     2.29 App Store listing frames, Design/Screenshots/[<lang>/]ios-6.9, along
 *     the screen box each frame records in its placements.json, so each is the
 *     real 2.29 capture as the listing shows it. The corners outside the screen's
 *     radius are filled with PhoneFrame's bezel colour. Lossless WebP, because
 *     they are UI text.
 *  3. The Apple Watch frames (`watch`) stay the 2.14 files already committed
 *     under src/assets/store/2.14/watch; nothing newer exists.
 *
 * The sources are never modified. src/data/store-assets.json records the source
 * file and its SHA-256 for every derivative, and the derivative's own SHA-256,
 * which tests/product/refresh.test.ts checks against the committed files.
 *
 *   WAKESHARP_DESIGN_DIR=/path/to/WakeSharp/Design npm run assets:store
 */
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const design = resolve(process.env.WAKESHARP_DESIGN_DIR ?? join(root, '..', 'WakeSharp', 'Design'));
const LANGUAGES = ['en', 'ru', 'de', 'fr', 'tr', 'es', 'ar'];
const sha256 = (bytes) => createHash('sha256').update(bytes).digest('hex');
/** English sits at the top of both source folders; every other language in its own. */
const langDir = (lang) => (lang === 'en' ? '' : `${lang}/`);

/** The gallery set, frames 01 to 09, in upload order. */
const GALLERY = { set: 'ab-bold', drawn: '2026-11-07', dir: 'Store/ab-bold', frames: 9 };
/**
 * The 2.29 listing frame each in-app screen is cut from. Frame 01 is left out:
 * its phone runs off the bottom of the canvas. 05 (the pact) is shown nowhere.
 */
const CAPTURES = { version: '2.29', captured: '2026-10-28', dir: 'Screenshots' };
const CAPTURE_FRAMES = [
  ['home', '06'],
  ['scan', '02'],
  ['missions', '03'],
  ['tones', '04'],
  ['rotation', '07'],
  ['stats', '08'],
];
/** Every capture is normalised to the screen box most frames have, 924 x 2008. */
const SCREEN = { width: 924, height: 2008 };
/** PhoneFrame's bezel (src/components/PhoneFrame.astro), behind the screen's corners. */
const BEZEL = '#08080a';

if (!existsSync(join(design, GALLERY.dir)) || !existsSync(join(design, CAPTURES.dir))) {
  console.error(`\nDesign folder not found or incomplete: ${design}`);
  console.error("Set WAKESHARP_DESIGN_DIR to the WakeSharp repo's Design directory.\n");
  process.exit(1);
}

const assets = [];

async function emit(entry, pipeline) {
  const out = join(root, entry.file);
  await mkdir(dirname(out), { recursive: true });
  const bytes = await pipeline.toBuffer();
  await writeFile(out, bytes);
  const { width, height } = await sharp(bytes).metadata();
  assets.push({ ...entry, sha256: sha256(bytes), width, height });
}

await rm(join(root, 'src/assets/store/bold'), { recursive: true, force: true });
await rm(join(root, `src/assets/store/${CAPTURES.version}`), { recursive: true, force: true });

for (const language of LANGUAGES) {
  for (let order = 1; order <= GALLERY.frames; order += 1) {
    const frame = String(order).padStart(2, '0');
    const source = `${GALLERY.dir}/${langDir(language)}ios-6.9/${frame}.png`;
    const bytes = await readFile(join(design, source));
    const { width, height } = await sharp(bytes).metadata();
    if (width !== 1320 || height !== 2868) throw new Error(`${source} is ${width}x${height}, not the 6.9" 1320x2868`);
    await emit(
      { platform: 'iphone', language, order, source, sourceSha256: sha256(bytes), file: `src/assets/store/bold/${language}/${frame}.webp` },
      sharp(bytes).resize({ width: 1000 }).webp({ quality: 92, effort: 6 }),
    );
  }
}

for (const language of LANGUAGES) {
  const listing = `${CAPTURES.dir}/${langDir(language)}ios-6.9`;
  const placements = JSON.parse(await readFile(join(design, listing, 'placements.json'), 'utf8'));
  for (const [key, frame] of CAPTURE_FRAMES) {
    const source = `${listing}/${frame}.png`;
    const place = placements[frame];
    if (!place) throw new Error(`${listing}/placements.json has no frame ${frame}`);
    const [x0, y0, x1, y1] = place.bbox;
    // The phone must sit whole on the canvas: a screen that runs off it would
    // be cut short, as frame 01's is.
    if (place.visible < place.size[1] - 2) throw new Error(`${source}: only ${place.visible} of ${place.size[1]} screen rows are on the canvas`);
    const bytes = await readFile(join(design, source));
    const radius = (place.radius * SCREEN.width) / (x1 - x0);
    const mask = Buffer.from(
      `<svg xmlns="http://www.w3.org/2000/svg" width="${SCREEN.width}" height="${SCREEN.height}"><rect width="${SCREEN.width}" height="${SCREEN.height}" rx="${radius.toFixed(2)}" ry="${radius.toFixed(2)}" fill="#fff"/></svg>`,
    );
    const screen = await sharp(bytes)
      .extract({ left: x0, top: y0, width: x1 - x0, height: y1 - y0 })
      .resize(SCREEN.width, SCREEN.height, { fit: 'fill' })
      .ensureAlpha()
      .composite([{ input: mask, blend: 'dest-in' }])
      .png()
      .toBuffer();
    await emit(
      { platform: 'capture', language, key, source, sourceSha256: sha256(bytes), box: place.bbox, file: `src/assets/store/${CAPTURES.version}/${language}/${key}.webp` },
      sharp(screen).flatten({ background: BEZEL }).webp({ lossless: true, effort: 6 }),
    );
  }
}

for (let order = 1; order <= 3; order += 1) {
  const file = `src/assets/store/2.14/watch/en/0${order}.png`;
  const bytes = await readFile(join(root, file));
  const { width, height } = await sharp(bytes).metadata();
  assets.push({ platform: 'watch', language: 'en', order, source: `Store/2.14/watch/en/0${order}.png`, file, sha256: sha256(bytes), width, height });
}

const manifest = {
  gallery: { set: GALLERY.set, drawn: GALLERY.drawn, source: `Design/${GALLERY.dir}`, frames: GALLERY.frames },
  captures: { version: CAPTURES.version, captured: CAPTURES.captured, source: `Design/${CAPTURES.dir}`, frames: Object.fromEntries(CAPTURE_FRAMES) },
  watch: { version: '2.14', source: 'Design/Store/2.14/watch' },
  assets,
};
await writeFile(join(root, 'src/data/store-assets.json'), JSON.stringify(manifest, null, 2) + '\n');
const kb = (await Promise.all(assets.filter((a) => a.platform !== 'watch').map((a) => readFile(join(root, a.file))))).reduce((n, b) => n + b.length, 0) / 1024;
console.log(`Imported ${assets.filter((a) => a.platform === 'iphone').length} gallery frames and ${assets.filter((a) => a.platform === 'capture').length} in-app screens (${(kb / 1024).toFixed(1)} MB); kept ${assets.filter((a) => a.platform === 'watch').length} Apple Watch frames.`);
