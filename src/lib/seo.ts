/**
 * The <title> a page gets: the base, plus the site suffix only when the whole
 * thing still fits. Google shows roughly 60 characters of a title; past that it
 * truncates or rewrites it, and a long post title with " — WakeSharp" appended
 * is exactly what used to push 34 of 35 posts over (median 78).
 *
 * Counted in characters (code points), as a results page shows them.
 */
export const TITLE_MAX = 60;

export function pageTitle(base: string, suffix: string, max = TITLE_MAX): string {
  const full = base + suffix;
  return [...full].length <= max ? full : base;
}
