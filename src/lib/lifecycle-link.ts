/**
 * The lifecycle links (app repo plan "Lifecycle email + push", 2026-11-07):
 * every lifecycle email and remote push links to
 * `https://wakesharp.app/o/<route>[?j=&s=&c=&sid=]`, a universal link (the AASA
 * lists `/o/*`) that the app also accepts as `wakesharp://o/<route>`.
 *
 * Routes: `offer|plan|alarm|progress|app|billing`; the app sends an unknown
 * route to Home. The query is for the app's analytics only: `j` journey key,
 * `s` step key, `c` channel (`email|push`), `sid` the send's uuid.
 *
 * This page only reads the link to hand it back to the app. Nothing here is
 * sent anywhere, and src/templates/LifecycleLinkPage.astro keeps the query out
 * of the site's own page-view analytics.
 */

export const LIFECYCLE_ROUTES = ['offer', 'plan', 'alarm', 'progress', 'app', 'billing'] as const;
export type LifecycleRoute = (typeof LIFECYCLE_ROUTES)[number];

/** Where a missing or unreadable route goes: Home, as the app does. */
export const FALLBACK_ROUTE: LifecycleRoute = 'app';

/** A route the app may add later passes through; it only has to look like one. */
const ROUTE = /^[a-z][a-z0-9_-]{0,31}$/;
const TOKEN = /^[A-Za-z0-9_-]{1,64}$/;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** The query keys handed on, in this order, and what each value must look like. */
const QUERY: ReadonlyArray<readonly [key: string, shape: RegExp]> = [
  ['j', TOKEN],
  ['s', TOKEN],
  ['c', TOKEN],
  ['sid', UUID],
];

export interface LifecycleLink {
  /** The route to hand to the app. */
  route: string;
  /** One of LIFECYCLE_ROUTES (the page has copy for it); false for a route a newer app may know. */
  known: boolean;
  /** `j=…&s=…&c=…&sid=…`, only the keys above with well-formed values; empty when none. */
  query: string;
}

function decode(segment: string): string {
  try {
    return decodeURIComponent(segment);
  } catch {
    return '';
  }
}

/**
 * Reads `/o/<route>` (or `/<locale>/o/<route>`) and its query.
 *
 * @param localePaths the URL prefixes of the non-default locales (`es`, `pt-br`, …).
 */
export function readLifecycleLink(pathname: string, search: string, localePaths: readonly string[]): LifecycleLink {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length > 0 && localePaths.includes(segments[0] as string)) segments.shift();
  const raw = segments[0] === 'o' ? decode(segments[1] ?? '').toLowerCase() : '';
  const route = ROUTE.test(raw) ? raw : FALLBACK_ROUTE;

  const params = new URLSearchParams(search);
  const kept = new URLSearchParams();
  for (const [key, shape] of QUERY) {
    const value = params.get(key);
    if (value !== null && shape.test(value)) kept.set(key, value);
  }

  return {
    route,
    known: (LIFECYCLE_ROUTES as readonly string[]).includes(route),
    query: kept.toString(),
  };
}

/** The app's own scheme for the same link, for the "Open WakeSharp" button. */
export function appUrlFor(link: Pick<LifecycleLink, 'route' | 'query'>): string {
  return `wakesharp://o/${link.route}${link.query ? `?${link.query}` : ''}`;
}

/** The same link on this site, for the language switcher: `/de/o/offer?j=…`. */
export function sitePathFor(base: string, link: Pick<LifecycleLink, 'route' | 'query'>): string {
  return `${base}/${link.route}${link.query ? `?${link.query}` : ''}`;
}
