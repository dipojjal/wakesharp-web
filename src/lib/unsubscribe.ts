/**
 * What https://wakesharp.app/unsubscribe?t=<token> does, kept apart from the
 * page so it can be tested.
 *
 * Every lifecycle email's unsubscribe (or email preferences) link opens the
 * page with the contact's unsubscribe token. The page asks the
 * lifecycle-unsubscribe edge function (app repo,
 * supabase/functions/lifecycle-unsubscribe/handler.ts) for the token's status
 * and flips offer emails off or on. The function answers
 * `{found: false}` for an unknown token and `{found: true, locale, subscribed}`
 * otherwise, 400 for a malformed request, and allows this site's origin only.
 * The token is the only thing the page sends, and the page has no analytics.
 */
import { UNSUBSCRIBE_LOCALES, type UnsubscribeLocale } from '../i18n/unsubscribe';

export const UNSUBSCRIBE_ENDPOINT = 'https://ltwchaijzcvncxzexdnk.supabase.co/functions/v1/lifecycle-unsubscribe';

export type UnsubscribeAction = 'status' | 'unsubscribe' | 'subscribe';

/** What the page shows. */
export type UnsubscribeView = 'loading' | 'ask' | 'done' | 'again' | 'invalid' | 'error';

export interface UnsubscribeAnswer {
  found: boolean;
  locale?: string;
  subscribed?: boolean;
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** The `t` query parameter when it is a token's shape, else null (no request is made). */
export function readToken(search: string): string | null {
  const token = new URLSearchParams(search).get('t')?.trim() ?? '';
  return UUID.test(token) ? token : null;
}

/** The language the page speaks for a locale code or browser language tag, or null. */
export function matchLocale(candidate: string | null | undefined): UnsubscribeLocale | null {
  const primary = (candidate ?? '').toLowerCase().split(/[-_]/)[0] ?? '';
  return (UNSUBSCRIBE_LOCALES as readonly string[]).includes(primary) ? (primary as UnsubscribeLocale) : null;
}

/** The first of `candidates` the page speaks, else English. */
export function pickLocale(candidates: ReadonlyArray<string | null | undefined>): UnsubscribeLocale {
  for (const candidate of candidates) {
    const locale = matchLocale(candidate);
    if (locale) return locale;
  }
  return 'en';
}

/** The view an answer to `action` leads to. */
export function viewFor(action: UnsubscribeAction, answer: UnsubscribeAnswer): UnsubscribeView {
  if (!answer.found) return 'invalid';
  if (!answer.subscribed) return 'done';
  return action === 'subscribe' ? 'again' : 'ask';
}

/**
 * Calls the function. `'invalid'` for a token it rejects as malformed, `'error'`
 * when it cannot be reached or fails, else its answer.
 */
export async function callUnsubscribe(
  fetchImpl: typeof fetch,
  token: string,
  action: UnsubscribeAction,
): Promise<UnsubscribeAnswer | 'invalid' | 'error'> {
  let response: Response;
  try {
    response = await fetchImpl(UNSUBSCRIBE_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, action }),
      credentials: 'omit',
      referrerPolicy: 'no-referrer',
      cache: 'no-store',
    });
  } catch {
    return 'error';
  }
  if (response.status === 400) return 'invalid';
  if (!response.ok) return 'error';
  try {
    const body: unknown = await response.json();
    if (!body || typeof body !== 'object' || typeof (body as UnsubscribeAnswer).found !== 'boolean') return 'error';
    const answer = body as UnsubscribeAnswer;
    return {
      found: answer.found,
      locale: typeof answer.locale === 'string' ? answer.locale : undefined,
      subscribed: answer.subscribed === true,
    };
  } catch {
    return 'error';
  }
}
