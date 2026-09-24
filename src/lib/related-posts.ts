/**
 * Which posts a post recommends under "Related reading".
 *
 * The first version took the newest posts in the same category, which on a
 * blog where 18 of 26 posts are sleep science sent 17 links each to the three
 * newest and none at all to 14 others, and reshuffled every time a post was
 * published. This ranks by what the posts share instead:
 *
 *   score = 2 × shared tags + 1 if the category matches
 *
 * and breaks ties by the closest publication date, then by id, so the answer
 * never depends on the order the collection happened to load in. Posts with a
 * score of zero still fill the remaining slots, so no post is left without a
 * block, and nearness in time spreads those links across the archive rather
 * than piling them on the newest.
 *
 * Pure and free of `astro:content`, so the tests can run it under tsx.
 */
export interface RankablePost {
  id: string;
  data: { category: string; tags: readonly string[]; pubDate: Date };
}

export function rankRelated<T extends RankablePost>(post: T, pool: readonly T[], limit = 3): T[] {
  const tags = new Set(post.data.tags);
  const published = post.data.pubDate.getTime();
  return pool
    .filter((p) => p.id !== post.id)
    .map((p) => ({
      p,
      score: 2 * p.data.tags.filter((t) => tags.has(t)).length + (p.data.category === post.data.category ? 1 : 0),
      gap: Math.abs(p.data.pubDate.getTime() - published),
    }))
    .sort((a, b) => b.score - a.score || a.gap - b.gap || (a.p.id < b.p.id ? -1 : a.p.id > b.p.id ? 1 : 0))
    .slice(0, limit)
    .map((x) => x.p);
}
