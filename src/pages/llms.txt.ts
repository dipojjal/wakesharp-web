import { SITE } from '../config/site';
import { getPublishedPosts } from '../lib/blog';
import { featurePath, getFeaturePages } from '../lib/features';
import { TOOL_SLUGS, toolCopy } from '../i18n/tools';

/**
 * /llms.txt - a plain-text map of the site for AI assistants and answer
 * engines, in the llmstxt.org shape: a title, a one-paragraph summary, then
 * sections of links with one line each. Built from the same collections the
 * pages are, so a published post or a new tool appears here in the same build
 * and nothing listed can be a page that was not built. English only: the
 * localized pages are reachable from each English page's hreflang links.
 */
export async function GET(): Promise<Response> {
  const abs = (path: string) => new URL(path, SITE.url).href;
  const line = (title: string, path: string, description: string) => `- [${title}](${abs(path)}): ${description}`;

  const posts = await getPublishedPosts('en');
  const features = await getFeaturePages('en');
  const tools = toolCopy('en');

  const body = [
    `# ${SITE.name}`,
    '',
    `> ${SITE.description}`,
    '',
    `${SITE.name} is published by ${SITE.publisher.replace(/\.$/, '')}. The blog explains the science of waking up, sleep inertia and alarm reliability on iPhone and Android, with named sources. Every page below is in English; many have translations, linked from the page itself.`,
    '',
    '## Blog',
    '',
    ...posts.map((post) => line(post.data.title, `/blog/${post.id}`, post.data.description)),
    '',
    '## Tools',
    '',
    ...TOOL_SLUGS.map((slug, i) => line(tools.pages[i].title, `/tools/${slug}`, tools.pages[i].description)),
    '',
    '## Features',
    '',
    ...features.map((page) => line(page.data.title, featurePath(page), page.data.description)),
    '',
    '## About the app',
    '',
    line('WakeSharp vs Alarmy', '/compare/wakesharp-vs-alarmy', 'How the two alarm apps differ, feature by feature.'),
    line('Support', '/support', 'How WakeSharp alarms, missions and permissions work, and fixes for common problems.'),
    line('About', '/about', 'Who makes WakeSharp and why.'),
    line('Privacy policy', '/privacy', 'What data the apps and this site collect, and why.'),
    '',
  ].join('\n');

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
