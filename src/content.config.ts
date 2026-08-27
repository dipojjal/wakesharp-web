/**
 * Content collections. One collection: the blog.
 *
 * Posts are flat files at src/content/blog/<slug>.md, where the filename IS the
 * slug IS the URL segment (/blog/<slug>) — pre-slugified names (lowercase,
 * digits, hyphens) pass through the glob loader's id algorithm unchanged, so
 * there is exactly one name to keep straight and it can never be changed
 * without breaking the URL.
 *
 * The full authoring contract (field formats, pubDate rules, copy-linter
 * gotchas) is documented in docs/blog-schedule.md — the scheduled routine that
 * writes posts must follow it exactly: a single file that fails this schema
 * fails `astro build`, which blocks every deploy until it is fixed.
 */
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { CATEGORIES } from './lib/blog-categories';

const blog = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string().min(1),
      /** Meta description, OG description, RSS description and card excerpt. */
      description: z.string().min(1).max(160),
      /**
       * Full ISO 8601 datetime WITH an explicit offset or Z, never a bare
       * YYYY-MM-DD (that parses as UTC midnight and renders as the previous
       * day west of UTC — the same bug LegalLayout works around). A post is
       * built only once pubDate has passed at build time; see src/lib/blog.ts.
       */
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      /** Relative to the .md file, e.g. ../../assets/blog/<slug>/hero.jpg */
      heroImage: image(),
      heroImageAlt: z.string().min(1),
      category: z.enum(CATEGORIES),
      tags: z.array(z.string().min(1)).default([]),
      /** Kill-switch independent of pubDate: flips a post off without re-dating it. */
      draft: z.boolean().default(false),
    }),
});

export const collections = { blog };
