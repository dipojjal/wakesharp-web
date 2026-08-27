import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

export type BlogPost = CollectionEntry<'blog'>;

/**
 * The single source of truth for "is this post live." The listing page,
 * [slug].astro's getStaticPaths and rss.xml.ts all go through here — nothing
 * else calls getCollection('blog') directly. A page that is never generated is
 * also automatically absent from the sitemap, so there is no separate filter
 * to keep in sync in astro.config.mjs.
 *
 * The date check runs once per build, not in real time. That is safe here
 * because publishing IS pushing: every scheduled post lands as a fresh commit,
 * and that push triggers the build that first evaluates it. A staged
 * future-dated post therefore appears on the first build at-or-after its
 * pubDate — and if the routine ever skips a run, the failure direction is
 * "appears late," never "appears early."
 */
export async function getPublishedPosts(): Promise<BlogPost[]> {
  const posts = await getCollection(
    'blog',
    ({ data }) => !data.draft && data.pubDate.getTime() <= Date.now(),
  );
  return posts.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
}

/** Newest posts sharing the given post's category, excluding itself. */
export function getRelatedPosts(post: BlogPost, allPosts: BlogPost[], limit = 3): BlogPost[] {
  return allPosts
    .filter((p) => p.id !== post.id && p.data.category === post.data.category)
    .slice(0, limit);
}

const WORDS_PER_MINUTE = 200;

export function readingTime(body: string): string {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
  return `${minutes} min read`;
}
