import { CATEGORY_LABELS } from '../../lib/blog-categories';

/**
 * The blog shell: the index page, the post chrome and the end-of-article card.
 * Post bodies are Markdown under src/content/blog/<locale path>/, not here.
 * `{date}` and `{minutes}` are supplied by the layouts.
 */
export const blog = {
  index: {
    title: `Sleep Science & Wake-Up Tips — WakeSharp Blog`,
    description: `Research-backed guides to waking up on time and clear-headed: sleep inertia, snoozing, alarms that fail, caffeine, melatonin and better mornings.`,
    heading: `The WakeSharp Blog`,
    intro: `Sleep science, morning routines and the occasional product update — from the maker of the alarm that checks you're actually sharp.`,
    empty: `The first article is on its way — check back shortly.`,
  },
  /** Appended to a post's title in the browser tab, when the whole title still fits in 60 characters. */
  titleSuffix: ` — WakeSharp`,
  /** The line under a post's headline when the founder has reviewed it. `{name}` is a link to /about. */
  reviewedBy: `Reviewed by {name}`,
  /** Carries its own arrow, so a right-to-left language can point it the other way. */
  allArticles: `← All articles`,
  updated: `Updated {date}`,
  minRead: `{minutes} min read`,
  tagsAria: `Tags`,
  related: { aria: `Related articles`, heading: `Related reading` },
  cta: {
    aria: `Get WakeSharp`,
    heading: `Wake up sharp tomorrow`,
    /** `{trialDays}` and `{annual}` come from src/config/site.ts; the trial never appears without its price. */
    body: `Start with a {trialDays}-day free trial of WakeSharp Unlimited, then {annual} a year. Setting your first alarm takes about ten seconds.`,
  },
  /** One label per category in src/lib/blog-categories.ts; a new category needs one in every locale. */
  categories: CATEGORY_LABELS,
};
