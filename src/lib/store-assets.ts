import type { ImageMetadata } from 'astro';
import manifest from '../data/store-assets.json';
/** Written by scripts/import-store.mjs: the bold gallery, the 2.29 in-app screens and the 2.14 Apple Watch frames. */
const images = import.meta.glob<{ default: ImageMetadata }>('../assets/store/**/*.{png,webp}', { eager: true });
/** The languages the store artwork is drawn in; every other page shows the English frames. */
export const artworkLocale = (locale: string) => ['en','es','ru','tr','de','fr','ar'].includes(locale) ? locale : 'en';
export type CaptureKey = 'home' | 'scan' | 'missions' | 'tones' | 'rotation' | 'stats';
export function storeAssets(locale: string, platform: 'iphone' | 'watch' | 'capture') {
  const language = platform === 'watch' ? 'en' : artworkLocale(locale);
  return manifest.assets.filter(a => a.language === language && a.platform === platform).sort((a,b) => (a.order ?? 0) - (b.order ?? 0)).map(a => {
    const image = images[a.file.replace('src/', '../')]?.default;
    if (!image) throw new Error(`Missing store screenshot: ${a.file}`);
    return { ...a, order: a.order ?? 0, image };
  });
}
/** The in-app screen the hero, a feature row or a feature page shows, in the page's artwork language. */
export function capture(locale: string, key: CaptureKey) {
  const asset = storeAssets(locale, 'capture').find(a => a.key === key);
  if (!asset) throw new Error(`Missing ${locale} capture ${key}`);
  return asset.image;
}
