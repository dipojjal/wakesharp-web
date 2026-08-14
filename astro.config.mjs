// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Static output, no adapter. Vercel auto-detects the Astro preset and serves `dist/`.
//
// trailingSlash 'never' + build.format 'file' is deliberate and load-bearing:
// both shipped apps hardcode https://wakesharp.app/privacy and /terms in their
// paywalls, so those paths must return 200 with no redirect hop.
export default defineConfig({
  site: 'https://wakesharp.app',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [sitemap()],
  vite: { plugins: [tailwindcss()] },
  // URL-variant safety nets live in vercel.json as real 308s. Astro's `redirects`
  // would emit meta-refresh HTML pages instead, which are slower and which search
  // engines treat as a weaker signal.
});
