// @ts-check
import { readFile, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { DEFAULT_LOCALE, enabledLocales } from './src/i18n/config';
import { includeInSitemap, sitemapLastmod, sitemapPriority } from './src/lib/sitemap';

const locales = enabledLocales();

/** The build's output directory, recorded at astro:config:done for the sitemap's lastmod. */
let outDir = '';

/**
 * One element per line, two-space indent. @astrojs/sitemap writes the whole
 * file on a single line. Safe only because a sitemap has no mixed content: the
 * sole text nodes are <loc> values, which never contain `<` or `>`.
 * @param {string} xml
 */
function indentXml(xml) {
  let depth = 0;
  const lines = xml.replace(/>\s*</g, '>\n<').trim().split('\n');
  return (
    lines
      .map((line) => {
        if (line.startsWith('</')) depth--;
        const out = '  '.repeat(Math.max(depth, 0)) + line;
        // An opening tag alone on its line: not <?…?>, </…>, <!…> or <…/>.
        if (/^<[^?/!][^>]*>$/.test(line) && !line.endsWith('/>')) depth++;
        return out;
      })
      .join('\n') + '\n'
  );
}

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
      // Runs in astro:build:done, after every page is written to outDir.
      serialize: (item) => ({
        ...item,
        lastmod: sitemapLastmod(item.url, outDir)?.toISOString(),
        priority: sitemapPriority(item.url),
      }),
      // No `i18n` option, on purpose: hreflang lives in each page's <head>
      // (BaseHead), which Google treats as equivalent. Sitemap xhtml:link
      // alternates only repeated it, and any XHTML-namespace element makes
      // Chrome render the file as a page — one run-on line of URLs — instead
      // of its XML tree view. Plain <urlset>, no extension namespaces.
      namespaces: { news: false, xhtml: false, image: false, video: false },
    }),
    // Search consoles look for /sitemap.xml. @astrojs/sitemap always writes an
    // index (sitemap-index.xml) pointing at numbered chunks (sitemap-0.xml, …),
    // one per 45,000 URLs. The site fits in one chunk, so that chunk becomes
    // /sitemap.xml itself and the index is dropped: one file, every URL.
    // vercel.json 308s the old paths here.
    {
      name: 'single-sitemap-xml',
      hooks: {
        'astro:config:done': ({ config }) => {
          outDir = fileURLToPath(config.outDir);
        },
        'astro:build:done': async ({ dir, logger }) => {
          const destDir = fileURLToPath(dir);
          const chunks = (await readdir(destDir)).filter((f) => /^sitemap-\d+\.xml$/.test(f));
          if (chunks.length !== 1) {
            throw new Error(
              `Expected exactly one sitemap chunk, found ${chunks.length} (${chunks.join(', ')}). ` +
                'Past 45,000 URLs /sitemap.xml has to become a sitemap index again.',
            );
          }
          const chunk = path.join(destDir, chunks[0]);
          await writeFile(path.join(destDir, 'sitemap.xml'), indentXml(await readFile(chunk, 'utf8')));
          await rm(chunk);
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
