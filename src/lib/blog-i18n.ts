/**
 * Placement rules for blog posts, kept free of `astro:content` so the tests
 * and the linter can import them.
 *
 * English posts are flat files at src/content/blog/<slug>.md. A translation
 * lives at src/content/blog/<locale path>/<slug>.md with `lang` set, keeps the
 * English filename by default (that is what lets the sitemap pair them), and
 * may name a different English source through `translationOf`. The glob
 * loader's id is the path without the extension, so the folder IS the locale.
 */
import { DEFAULT_LOCALE, localeByCode, localeByPath } from '../i18n/config';

export interface PostLike {
  id: string;
  data: { lang: string; translationOf?: string | undefined };
}

/** The URL segment of a post: its filename without the folder. */
export function slugOfId(id: string): string {
  const i = id.lastIndexOf('/');
  return i === -1 ? id : id.slice(i + 1);
}

export function folderOfId(id: string): string {
  const i = id.lastIndexOf('/');
  return i === -1 ? '' : id.slice(0, i);
}

/** The English article this post is a version of (itself, for English). */
export function sourceSlugOf(post: PostLike): string {
  return post.data.translationOf ?? slugOfId(post.id);
}

/** Every rule a misplaced or mislabelled post can break, as messages. Empty means fine. */
export function placementProblems(posts: readonly PostLike[]): string[] {
  const problems: string[] = [];
  const englishSlugs = new Set(posts.filter((p) => p.data.lang === DEFAULT_LOCALE).map((p) => slugOfId(p.id)));

  for (const p of posts) {
    const folder = folderOfId(p.id);
    const slug = slugOfId(p.id);
    const locale = localeByCode(p.data.lang);
    if (!locale) {
      problems.push(`${p.id}: unknown lang "${p.data.lang}"`);
      continue;
    }
    if (localeByPath(slug)) {
      problems.push(`${p.id}: the slug "${slug}" is a locale path and would be read as a language prefix`);
    }
    if (slug === 'page') {
      problems.push(`${p.id}: the literal slug "page" is reserved for a future /blog/page/[page] route`);
    }
    if (locale.code === DEFAULT_LOCALE) {
      if (folder !== '') problems.push(`${p.id}: English posts live flat in src/content/blog/, never in a folder`);
      if (p.data.translationOf) problems.push(`${p.id}: an English post cannot declare translationOf`);
    } else {
      if (folder !== locale.path) {
        problems.push(`${p.id}: a "${locale.code}" post must live in src/content/blog/${locale.path}/`);
      }
      if (!englishSlugs.has(sourceSlugOf(p))) {
        problems.push(`${p.id}: translates "${sourceSlugOf(p)}", which is not an English post`);
      }
    }
  }
  return problems;
}
