import rss from '@astrojs/rss';
import { getPublishedPosts } from '../lib/blog';
import { SITE } from '../config/site';

/**
 * /rss.xml - the English blog feed. Endpoint routes keep their literal basename
 * under build.format 'file', so this prerenders to dist/rss.xml. The channel
 * link is the blog index, not the homepage, and the feed names its own URL
 * (atom:link rel="self"), which feed validators expect. Only English pages
 * advertise it (BaseHead), because it carries only English posts.
 */
export async function GET(): Promise<Response> {
  const posts = await getPublishedPosts();
  return rss({
    title: `${SITE.name} Blog`,
    description:
      'Research-backed guides to waking up on time and clear-headed, from the maker of WakeSharp.',
    // The channel <link>. Item links are root-relative, so they resolve the same.
    site: `${SITE.url}/blog`,
    xmlns: { atom: 'http://www.w3.org/2005/Atom' },
    // @astrojs/rss defaults trailingSlash to TRUE, the opposite of this site's
    // trailingSlash:'never' - without this, every item link gains a slash and
    // a redirect hop.
    trailingSlash: false,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${post.id}`,
      categories: [post.data.category, ...post.data.tags],
    })),
    customData: `<language>en</language><atom:link href="${SITE.url}/rss.xml" rel="self" type="application/rss+xml"/>`,
  });
}
