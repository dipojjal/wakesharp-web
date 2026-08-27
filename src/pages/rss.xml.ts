import rss from '@astrojs/rss';
import { getPublishedPosts } from '../lib/blog';
import { SITE } from '../config/site';

/**
 * /rss.xml — the blog feed. Endpoint routes keep their literal basename under
 * build.format 'file', so this prerenders to dist/rss.xml.
 */
export async function GET(): Promise<Response> {
  const posts = await getPublishedPosts();
  return rss({
    title: `${SITE.name} Blog`,
    description:
      'Sleep science, morning routines and product news from the maker of WakeSharp.',
    site: SITE.url,
    // @astrojs/rss defaults trailingSlash to TRUE, the opposite of this site's
    // trailingSlash:'never' — without this, every item link gains a slash and
    // a redirect hop.
    trailingSlash: false,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${post.id}`,
      categories: [post.data.category, ...post.data.tags],
    })),
    customData: '<language>en</language>',
  });
}
