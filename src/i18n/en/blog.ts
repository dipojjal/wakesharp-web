import { CATEGORY_LABELS } from '../../lib/blog-categories';

/**
 * The blog shell: the index page, the post chrome and the end-of-article card.
 * Post bodies are Markdown under src/content/blog/<locale path>/, not here.
 * `{date}` and `{minutes}` are supplied by the layouts.
 */
export const blog = {
  index: {
    title: `Blog — WakeSharp`,
    description: `Sleep science, morning routines and product news from the maker of WakeSharp — the alarm that gets you meeting-ready.`,
    heading: `The WakeSharp Blog`,
    intro: `Sleep science, morning routines and the occasional product update — from the maker of the alarm that checks you're actually sharp.`,
    empty: `The first article is on its way — check back shortly.`,
  },
  /** Appended to a post's title in the browser tab. */
  titleSuffix: ` — WakeSharp Blog`,
  /** Carries its own arrow, so a right-to-left language can point it the other way. */
  allArticles: `← All articles`,
  updated: `Updated {date}`,
  minRead: `{minutes} min read`,
  tagsAria: `Tags`,
  related: { aria: `Related articles`, heading: `Related reading` },
  cta: {
    aria: `Get WakeSharp`,
    heading: `Wake up sharp tomorrow`,
    body: `Your alarm rings free, forever, with no ads. Mind Games, Photo Proof and the reliability check are included. Setting your first alarm takes about ten seconds.`,
  },
  /** One label per category in src/lib/blog-categories.ts; a new category needs one in every locale. */
  categories: CATEGORY_LABELS,
};
