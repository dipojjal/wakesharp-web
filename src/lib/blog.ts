import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import { DEFAULT_LOCALE, enabledLocales, localeByCode, type EnabledLocale, type LocaleCode } from '../i18n/config';
import { localePath, type Alternate } from '../i18n/routes';
import { placementProblems, slugOfId, sourceSlugOf as sourceOf } from './blog-i18n';

export type BlogPost = CollectionEntry<'blog'>;

/** The URL segment of a post (the filename), whatever folder it sits in. */
export const slugOf = (post: BlogPost): string => slugOfId(post.id);
/** The English article a post is a version of; itself for English. */
export const sourceSlugOf = (post: BlogPost): string => sourceOf(post);
/** A post's own URL, locale prefix included. */
export const postPath = (post: BlogPost): string => localePath(post.data.lang, `/blog/${slugOf(post)}`);

let placementChecked = false;

/**
 * Every post in the collection, after the placement rules have run once per
 * build. A misplaced translation fails the build here with the reason, rather
 * than silently minting a URL like /blog/es/… or /es/blog/<english-only-slug>.
 */
async function allPosts(): Promise<BlogPost[]> {
  const posts = await getCollection('blog');
  if (!placementChecked) {
    const problems = placementProblems(posts);
    if (problems.length) throw new Error(`Blog post placement:\n  ${problems.join('\n  ')}`);
    placementChecked = true;
  }
  return posts;
}

const isLive = (p: BlogPost): boolean => !p.data.draft && p.data.pubDate.getTime() <= Date.now();

/**
 * The single source of truth for "is this post live" in one language. The
 * listing pages, the [slug] routes and rss.xml.ts all go through here — nothing
 * else calls getCollection('blog'). A page that is never generated is also
 * automatically absent from the sitemap, so there is no separate filter to
 * keep in sync in astro.config.mjs.
 *
 * The date check runs once per build, not in real time. That is safe here
 * because publishing IS pushing: every scheduled post lands as a fresh commit,
 * and that push triggers the build that first evaluates it. A staged
 * future-dated post therefore appears on the first build at-or-after its
 * pubDate — and if the routine ever skips a run, the failure direction is
 * "appears late," never "appears early."
 */
export async function getPublishedPosts(locale: LocaleCode = DEFAULT_LOCALE): Promise<BlogPost[]> {
  const posts = (await allPosts()).filter((p) => p.data.lang === locale && isLive(p));
  return posts.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
}

/** Every live version of one article, English included, in enabled locales only. */
export async function translationsOf(sourceSlug: string): Promise<BlogPost[]> {
  return (await allPosts()).filter(
    (p) => isLive(p) && sourceOf(p) === sourceSlug && localeByCode(p.data.lang)?.enabled === true,
  );
}

/** Enabled locales with at least one live post, i.e. the ones that get a /blog index. */
export async function localesWithBlog(): Promise<EnabledLocale[]> {
  const posts = await allPosts();
  return enabledLocales().filter((l) => posts.some((p) => p.data.lang === l.code && isLive(p)));
}

/** Where the header and footer "Blog" links go for a locale: its own index when it has posts, else English. */
export async function blogIndexPath(locale: EnabledLocale): Promise<string> {
  const withBlog = await localesWithBlog();
  return withBlog.some((l) => l.code === locale.code) ? localePath(locale, '/blog') : '/blog';
}

/** hreflang set (and selector targets) for a blog index: every locale that has one. */
export async function blogIndexAlternates(): Promise<Alternate[]> {
  return (await localesWithBlog()).map((l) => ({ locale: l, href: localePath(l, '/blog') }));
}

/** hreflang set for a post: every live version of the same article. */
export async function postAlternates(post: BlogPost): Promise<Alternate[]> {
  const versions = await translationsOf(sourceSlugOf(post));
  return versions.map((p) => ({ locale: localeByCode(p.data.lang) as EnabledLocale, href: postPath(p) }));
}

/** Selector targets for a post: its translation, else that locale's blog index, else its home. */
export async function postSwitchTargets(post: BlogPost): Promise<Alternate[]> {
  const versions = await postAlternates(post);
  const withBlog = await localesWithBlog();
  return enabledLocales().map(
    (l) =>
      versions.find((v) => v.locale.code === l.code) ?? {
        locale: l,
        href: withBlog.some((b) => b.code === l.code) ? localePath(l, '/blog') : localePath(l, '/'),
      },
  );
}

/** Newest posts sharing the given post's category and language, excluding itself. */
export function getRelatedPosts(post: BlogPost, allPostsInLocale: BlogPost[], limit = 3): BlogPost[] {
  return allPostsInLocale
    .filter((p) => p.id !== post.id && p.data.category === post.data.category)
    .slice(0, limit);
}

const WORDS_PER_MINUTE = 200;

/** Whole minutes, never below one. The layout turns it into a localized label. */
export function readingMinutes(body: string): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}
