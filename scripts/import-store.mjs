#!/usr/bin/env node
/** Import the submitted package, never the working screenshot folder. Originals
 * remain byte-identical. Astro creates responsive web derivatives at build time. */
import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve, dirname, join } from 'node:path';
import sharp from 'sharp';
const root = resolve(import.meta.dirname, '..');
const source = resolve(process.env.WAKESHARP_STORE_DIR ?? join(root, '../WakeSharp/Design/Store/2.14'));
const submitted = JSON.parse(await readFile(join(source, 'manifest.json'), 'utf8'));
const release = { version: submitted.version, revision: 2, captured: submitted.capture_date, submittedWatchLocale: 'en', assets: [] };
const captions = ['home', 'loud', 'scan', 'missions', 'friend', 'sharpness', 'shifts', 'progress'];
async function take(file, platform, language, order, captionKey, expected) {
  const bytes = await readFile(join(source, file));
  const checksum = createHash('sha256').update(bytes).digest('hex');
  if (expected && expected !== checksum) throw new Error(`Submitted checksum mismatch: ${file}`);
  const output = `src/assets/store/2.14/${file}`;
  await mkdir(dirname(join(root, output)), { recursive: true });
  await copyFile(join(source, file), join(root, output));
  const { width, height } = await sharp(bytes).metadata();
  release.assets.push({ platform, language, order, source: file, file: output, sha256: checksum, width, height, captionKey });
}
for (const [language, assets] of Object.entries(submitted.locales)) {
  for (const [index, asset] of assets.ios.entries()) await take(asset.file, 'iphone', language, index + 1, captions[index], asset.sha256);
}
for (const [index, asset] of submitted.locales.en.watch.entries()) await take(asset.file, 'watch', 'en', index + 1, `watch${index + 1}`, asset.sha256);
const captures = ['01-home', '02-scan', '03-missions', '04-tones', '05-pact', '06-sharpness', '07-rotation', '08-stats'];
for (const language of Object.keys(submitted.locales)) {
  for (const [index, file] of captures.entries()) await take(`sources/ios/${language}/${file}.png`, 'capture', language, index + 1, file.slice(3));
}
await mkdir(join(root, 'src/data'), { recursive: true });
await writeFile(join(root, 'src/data/store-2.14.json'), JSON.stringify(release, null, 2) + '\n');
console.log(`Imported ${release.assets.length} verified assets for ${release.version} revision ${release.revision}.`);
