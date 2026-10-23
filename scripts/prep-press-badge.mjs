#!/usr/bin/env node
/**
 * Cut the "As seen on" badge artwork into the six transparent pieces
 * `src/components/PressBadge.astro` masks with the band's ink.
 *
 *   npm run assets:press
 *
 * The source, `src/assets/press/as-seen-on-source.png`, is the owner's badge
 * as supplied (2026-10-22): black logos and pale grey laurels on an opaque
 * white ground, with "AS SEEN ON" set between two hairlines across the top.
 * The artwork is pure greyscale, so colour-to-alpha against white is exact:
 * a pixel's coverage is `255 - grey`, and its ink is black. The laurels keep
 * their pale look as low coverage and the logos become solid.
 *
 * The header row is dropped: the label is live, translated text in the
 * component (`shell.press.label`), never part of the image, so the eleven
 * localized pages do not carry English inside a picture.
 *
 * Each piece is cut to its own ink, symmetric about the artwork's centre
 * line: a flex row with `align-items: center` then puts every logo back on
 * the common axis the artwork gave it (the AP bar hangs below its letters,
 * so that piece keeps air above them). The output is byte for byte
 * reproducible (sharp writes no timestamp into a PNG); run it again after
 * replacing the source and commit what changes.
 */
import { mkdir, readdir, unlink } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DIR = join(ROOT, 'src', 'assets', 'press');
const SOURCE = join(DIR, 'as-seen-on-source.png');

/** Left to right, as the artwork reads. The count is asserted below. */
export const PIECES = ['laurel-left', 'business-insider', 'ap', 'streetinsider', 'ips', 'laurel-right'];

/** Anything lighter than this is the white ground. The hairlines and the laurels are darker. */
const GROUND = 250;
/** A column run this wide with no ink separates two pieces; letter gaps are a few pixels. */
const MIN_GAP = 20;

async function main() {
  const { data, info } = await sharp(SOURCE).greyscale().raw().toBuffer({ resolveWithObject: true });
  const { width: W, height: H } = info;
  const grey = (x, y) => data[y * W + x];

  // The header is "AS SEEN ON" and its hairlines: the ink runs above the
  // first gap of several empty rows. Everything below is the badge proper.
  const rowHasInk = (y) => { for (let x = 0; x < W; x++) if (grey(x, y) < GROUND) return true; return false; };
  let top = 0;
  let emptyRun = 0;
  let sawInk = false;
  for (let y = 0; y < H; y++) {
    if (rowHasInk(y)) { sawInk = true; emptyRun = 0; continue; }
    if (!sawInk) continue;
    emptyRun += 1;
    if (emptyRun >= 8) { top = y + 1; break; }
  }
  while (top < H && !rowHasInk(top)) top += 1;
  let bottom = H - 1;
  while (bottom > top && !rowHasInk(bottom)) bottom -= 1;

  // Column runs below the header, merged across gaps narrower than MIN_GAP.
  const colHasInk = (x) => { for (let y = top; y <= bottom; y++) if (grey(x, y) < GROUND) return true; return false; };
  const runs = [];
  let start = null;
  for (let x = 0; x <= W; x++) {
    const ink = x < W && colHasInk(x);
    if (ink && start === null) start = x;
    if (!ink && start !== null) { runs.push([start, x - 1]); start = null; }
  }
  const merged = [];
  for (const run of runs) {
    const last = merged[merged.length - 1];
    if (last && run[0] - last[1] - 1 < MIN_GAP) last[1] = run[1];
    else merged.push([...run]);
  }
  if (merged.length !== PIECES.length) {
    throw new Error(`Expected ${PIECES.length} pieces, found ${merged.length}: ${JSON.stringify(merged)}`);
  }

  await mkdir(DIR, { recursive: true });
  for (const file of await readdir(DIR)) {
    if (file.endsWith('.png') && file !== 'as-seen-on-source.png') await unlink(join(DIR, file));
  }

  const centre = (top + bottom) / 2;
  for (const [i, [x0, x1]] of merged.entries()) {
    const width = x1 - x0 + 1;
    let reach = 0;
    for (let y = top; y <= bottom; y++) {
      for (let x = x0; x <= x1; x++) {
        if (grey(x, y) < GROUND) { reach = Math.max(reach, Math.abs(y - centre)); break; }
      }
    }
    const y0 = Math.max(top, Math.floor(centre - reach));
    const y1 = Math.min(bottom, Math.ceil(centre + reach));
    const rows = y1 - y0 + 1;
    const rgba = Buffer.alloc(width * rows * 4);
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < width; x++) {
        const o = (y * width + x) * 4;
        rgba[o + 3] = 255 - grey(x0 + x, y0 + y); // black ink, coverage from the grey
      }
    }
    const out = join(DIR, `${PIECES[i]}.png`);
    const result = await sharp(rgba, { raw: { width, height: rows, channels: 4 } })
      .png({ compressionLevel: 9, palette: false })
      .toFile(out);
    console.log(`${PIECES[i].padEnd(17)} ${String(result.width).padStart(4)} x ${result.height}  ${Math.round(result.size / 1024)} KB`);
  }
}

main().catch((error) => { console.error(error); process.exit(1); });
