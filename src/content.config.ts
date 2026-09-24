/**
 * Content collections. One collection: the blog.
 *
 * English posts are flat files at src/content/blog/<slug>.md, where the
 * filename IS the slug IS the URL segment (/blog/<slug>) — pre-slugified names
 * (lowercase, digits, hyphens) pass through the glob loader's id algorithm
 * unchanged, so there is exactly one name to keep straight and it can never be
 * changed without breaking the URL.
 *
 * A translation lives at src/content/blog/<locale path>/<slug>.md with `lang`
 * set; its id becomes "<locale path>/<slug>" and it is served at
 * /<locale path>/blog/<slug>. src/lib/blog-i18n.ts enforces the placement.
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
import { LOCALE_CODES } from './i18n/config';
import { REVIEWERS } from './config/people';
import { TITLE_MAX } from './lib/seo';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: ({ image }) =>
    z
    .object({
      title: z.string().min(1),
      /**
       * The <title> search results show, when the headline (the <h1>, and the
       * social card's title) runs past what fits. At most 60 characters; the
       * layout appends " — WakeSharp" only when the total still fits. Colons,
       * never dashes (the style law), and the post's target phrase up front.
       */
      seoTitle: z.string().min(1).max(TITLE_MAX).optional(),
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
      /** Relative to the .md file, e.g. ../../assets/blog/<slug>/hero.jpg (one more ../ from a locale folder). */
      heroImage: image(),
      heroImageAlt: z.string().min(1),
      category: z.enum(CATEGORIES),
      tags: z.array(z.string().min(1)).default([]),
      /** Kill-switch independent of pubDate: flips a post off without re-dating it. */
      draft: z.boolean().default(false),
      /** The post's language. English posts omit it; a translation must set it to match its folder. */
      lang: z.enum(LOCALE_CODES).default('en'),
      /** The English slug this post translates, only when the translated filename differs from it. */
      translationOf: z
        .string()
        .regex(/^[a-z0-9-]+$/)
        .optional(),
      /**
       * Who reviewed the post, from src/config/people.ts, and when. Set only by
       * the person named, after reading the post; the drafting routine never
       * writes it. Shown under the headline and as WebPage.reviewedBy.
       */
      reviewedBy: z.enum(REVIEWERS).optional(),
      reviewedDate: z.coerce.date().optional(),
    })
    .refine((d) => !d.reviewedBy === !d.reviewedDate, {
      message: 'reviewedBy and reviewedDate go together: name the reviewer and the date they read it',
    })
    .refine((d) => !d.reviewedDate || (d.reviewedDate >= d.pubDate && d.reviewedDate.getTime() <= Date.now()), {
      message: 'reviewedDate must fall between pubDate and now',
    }),
});

export const collections = { blog };
