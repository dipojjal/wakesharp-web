import type { ImageMetadata } from 'astro';
import manifest from '../data/store-2.14.json';
const images = import.meta.glob<{ default: ImageMetadata }>('../assets/store/2.14/**/*.png', { eager: true });
export const artworkLocale = (locale: string) => ['en','es','ru','tr','de','fr','ar'].includes(locale) ? locale : 'en';
export function storeAssets(locale: string, platform: 'iphone' | 'watch' | 'capture') {
  const language = platform === 'watch' ? 'en' : artworkLocale(locale);
  return manifest.assets.filter(a => a.language === language && a.platform === platform).sort((a,b) => a.order - b.order).map(a => {
    const image = images[a.file.replace('src/', '../')]?.default;
    if (!image) throw new Error(`Missing submitted screenshot: ${a.file}`);
    return { ...a, image };
  });
}
export function capture(locale: string, key: string) {
  const asset = storeAssets(locale, 'capture').find(a => a.captionKey === key);
  if (!asset) throw new Error(`Missing ${locale} capture ${key}`);
  return asset.image;
}
