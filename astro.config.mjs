// @ts-check
import { readdir, rename, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { DEFAULT_LOCALE, enabledLocales } from './src/i18n/config';
import { includeInSitemap } from './src/lib/sitemap';

const locales = enabledLocales();

// Static output, no adapter. Vercel auto-detects the Astro preset and serves `dist/`.
//
// trailingSlash 'never' + build.format 'file' is deliberate and load-bearing:
// both shipped apps hardcode https://wakesharp.app/privacy and /terms in their
// paywalls, so those paths must return 200 with no redirect hop.
//
// Typed as AstroUserConfig rather than inferred: defineConfig's locale generic
// cannot infer from a computed `locales` array and collapses `defaultLocale` to
// `never`.
/** @type {import('astro').AstroUserConfig} */
const config = {
  site: 'https://wakesharp.app',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file' },
  /**
   * English stays un-prefixed at the root (see above); every other enabled
   * locale lives under /<path>/ via src/pages/[lang]/. src/i18n/config.ts is the
   * single source of truth. No `fallback`: in a static build Astro would
   * synthesize meta-refresh redirect pages for every un-localized route, and the
   * sitemap would list them.
   */
  i18n: {
    defaultLocale: DEFAULT_LOCALE,
    locales: locales.map((l) => (l.path === l.code ? l.code : { path: l.path, codes: [l.code] })),
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      filter: includeInSitemap,
      // Keys are URL segments, values hreflang tags. The integration groups URLs
      // by the path after the segment and emits xhtml:link alternates for each
      // group with more than one member. x-default is emitted by BaseHead only.
      i18n: {
        defaultLocale: DEFAULT_LOCALE,
        locales: Object.fromEntries(locales.map((l) => [l.path, l.hreflang])),
      },
    }),
    // Search consoles look for /sitemap.xml. @astrojs/sitemap always writes an
    // index (sitemap-index.xml) pointing at numbered chunks (sitemap-0.xml, …),
    // one per 45,000 URLs. The site fits in one chunk, so that chunk becomes
    // /sitemap.xml itself and the index is dropped: one file, every URL.
    // vercel.json 308s the old paths here.
    {
      name: 'single-sitemap-xml',
      hooks: {
        'astro:build:done': async ({ dir, logger }) => {
          const destDir = fileURLToPath(dir);
          const chunks = (await readdir(destDir)).filter((f) => /^sitemap-\d+\.xml$/.test(f));
          if (chunks.length !== 1) {
            throw new Error(
              `Expected exactly one sitemap chunk, found ${chunks.length} (${chunks.join(', ')}). ` +
                'Past 45,000 URLs /sitemap.xml has to become a sitemap index again.',
            );
          }
          await rename(path.join(destDir, chunks[0]), path.join(destDir, 'sitemap.xml'));
          await rm(path.join(destDir, 'sitemap-index.xml'));
          logger.info(`\`sitemap.xml\` created at \`${path.relative(process.cwd(), destDir)}\``);
        },
      },
    },
  ],
  vite: { plugins: [tailwindcss()] },
  // URL-variant safety nets live in vercel.json as real 308s. Astro's `redirects`
  // would emit meta-refresh HTML pages instead, which are slower and which search
  // engines treat as a weaker signal.
};

export default defineConfig(config);
