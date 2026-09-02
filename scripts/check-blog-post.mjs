#!/usr/bin/env node
/**
 * Check one blog post against the authoring contract in docs/blog-schedule.md
 * before running a full build:
 *
 *   npx tsx scripts/check-blog-post.mjs src/content/blog/tr/sleep-inertia-why-you-wake-up-groggy.md
 *
 * Frontmatter fields, the hero path, the locale folder against `lang`, the
 * reserved slugs, and the dash / zero-width gate. The zod schema in
 * src/content.config.ts is still the final word at build time.
 */
import { existsSync, readFileSync } from 'node:fs';
import { basename, dirname, resolve } from 'node:path';
import { CATEGORIES } from '../src/lib/blog-categories';
import { DEFAULT_LOCALE, localeByCode, localeByPath } from '../src/i18n/config';

const file = process.argv[2];
if (!file) {
  console.error('usage: npx tsx scripts/check-blog-post.mjs <post.md>');
  process.exit(2);
}
const problems = [];
const raw = readFileSync(file, 'utf8');
const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
if (!m) {
  console.error('  ✗ no frontmatter block');
  process.exit(1);
}
const [, fm, body] = m;
const field = (key) => {
  const line = fm.split('\n').find((l) => l.startsWith(`${key}:`));
  if (!line) return undefined;
  return line
    .slice(key.length + 1)
    .trim()
    .replace(/^"(.*)"$/, '$1')
    .replace(/^'(.*)'$/, '$1');
};

const title = field('title');
const description = field('description');
const pubDate = field('pubDate');
const heroImage = field('heroImage');
const heroImageAlt = field('heroImageAlt');
const category = field('category');
const lang = field('lang') ?? DEFAULT_LOCALE;
const translationOf = field('translationOf');

if (!title) problems.push('title is missing');
if (!description) problems.push('description is missing');
else if (description.length > 160) problems.push(`description is ${description.length} characters; the limit is 160`);
if (!pubDate || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:[+-]\d{2}:\d{2}|Z)$/.test(pubDate)) {
  problems.push(`pubDate must be a full ISO datetime with an offset, e.g. 2026-08-28T08:00:00-04:00 (got "${pubDate ?? ''}")`);
}
if (!heroImage) problems.push('heroImage is missing');
else if (!existsSync(resolve(dirname(file), heroImage))) problems.push(`heroImage "${heroImage}" does not exist relative to the post`);
if (!heroImageAlt) problems.push('heroImageAlt is missing');
if (!category || !CATEGORIES.includes(category)) problems.push(`category must be one of ${CATEGORIES.join(' | ')} (got "${category ?? ''}")`);
if (fm.split('\n').some((l) => l.startsWith('slug:'))) problems.push('never set slug: — it silently replaces the id');

const slug = basename(file).replace(/\.md$/, '');
if (localeByPath(slug)) problems.push(`the slug "${slug}" is a locale path`);
if (slug === 'page') problems.push('the literal slug "page" is reserved');
if (!/^[a-z0-9-]+$/.test(slug)) problems.push(`the filename "${slug}" must be lowercase letters, digits and hyphens`);

const folder = basename(dirname(file));
const locale = localeByCode(lang);
if (!locale) problems.push(`unknown lang "${lang}"`);
else if (locale.code === DEFAULT_LOCALE) {
  if (folder !== 'blog') problems.push('an English post must sit flat in src/content/blog/');
  if (translationOf) problems.push('an English post cannot declare translationOf');
} else {
  if (folder !== locale.path) problems.push(`a "${locale.code}" post must sit in src/content/blog/${locale.path}/ (it is in "${folder}/")`);
  const source = resolve(dirname(file), '..', `${translationOf ?? slug}.md`);
  if (!existsSync(source)) problems.push(`translates "${translationOf ?? slug}", but src/content/blog/${translationOf ?? slug}.md does not exist`);
  if (translationOf && !/^[a-z0-9-]+$/.test(translationOf)) problems.push('translationOf must be a slug');
}

raw.split('\n').forEach((line, i) => {
  if (/[–—]/.test(line)) problems.push(`line ${i + 1}: em or en dash (restructure the sentence)`);
  if (/[​-‍﻿⁠]/.test(line)) problems.push(`line ${i + 1}: zero-width character`);
});
if (!body.trim()) problems.push('the body is empty');

for (const p of problems) console.error(`  ✗ ${p}`);
if (problems.length) {
  console.error(`\n  ${problems.length} problem(s) in ${file}\n`);
  process.exit(1);
}
console.log(`\n  OK: ${file}\n`);
