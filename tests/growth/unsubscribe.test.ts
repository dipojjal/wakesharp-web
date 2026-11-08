import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { UNSUBSCRIBE_COPY, UNSUBSCRIBE_LOCALES } from '../../src/i18n/unsubscribe';
import {
  callUnsubscribe,
  matchLocale,
  pickLocale,
  readToken,
  UNSUBSCRIBE_ENDPOINT,
  viewFor,
} from '../../src/lib/unsubscribe';

const TOKEN = '6f1c2e0b-3d4a-4b5c-8d9e-0f1a2b3c4d5e';

test('only a token-shaped t is read, so a mangled link makes no request', () => {
  assert.equal(readToken(`?t=${TOKEN}`), TOKEN);
  assert.equal(readToken(`?x=1&t=${TOKEN.toUpperCase()}`), TOKEN.toUpperCase());
  for (const search of ['', '?t=', '?t=abc', `?t=${TOKEN}x`, `?token=${TOKEN}`]) assert.equal(readToken(search), null, search);
});

test('the page speaks the email locale, else the browser language, else English', () => {
  assert.equal(matchLocale('de'), 'de');
  assert.equal(matchLocale('pt'), null);
  assert.equal(pickLocale(['de-AT', 'en']), 'de');
  assert.equal(pickLocale(['pt-BR', 'fr-CA']), 'fr');
  assert.equal(pickLocale(['AR']), 'ar');
  assert.equal(pickLocale(['ja', undefined]), 'en');
  assert.equal(pickLocale([]), 'en');
});

test('each answer leads to the right view', () => {
  assert.equal(viewFor('status', { found: false }), 'invalid');
  assert.equal(viewFor('status', { found: true, subscribed: true }), 'ask');
  assert.equal(viewFor('status', { found: true, subscribed: false }), 'done');
  assert.equal(viewFor('unsubscribe', { found: true, subscribed: false }), 'done');
  assert.equal(viewFor('subscribe', { found: true, subscribed: true }), 'again');
});

test('the call sends only the token and the action, as JSON, and reads every outcome', async () => {
  let seen: { url: string; init: RequestInit } | undefined;
  const reply = (status: number, body: string) => async (url: RequestInfo | URL, init?: RequestInit) => {
    seen = { url: String(url), init: init ?? {} };
    return new Response(body, { status, headers: { 'Content-Type': 'application/json' } });
  };

  assert.deepEqual(await callUnsubscribe(reply(200, '{"found":true,"locale":"de","subscribed":true}') as typeof fetch, TOKEN, 'status'), {
    found: true,
    locale: 'de',
    subscribed: true,
  });
  assert.equal(seen?.url, UNSUBSCRIBE_ENDPOINT);
  assert.equal(seen?.init.method, 'POST');
  assert.deepEqual(seen?.init.headers, { 'Content-Type': 'application/json' });
  assert.deepEqual(JSON.parse(String(seen?.init.body)), { token: TOKEN, action: 'status' });
  assert.equal(seen?.init.credentials, 'omit');

  assert.deepEqual(await callUnsubscribe(reply(200, '{"found":false}') as typeof fetch, TOKEN, 'unsubscribe'), {
    found: false,
    locale: undefined,
    subscribed: false,
  });
  assert.equal(await callUnsubscribe(reply(400, '{"error":"bad_request"}') as typeof fetch, TOKEN, 'subscribe'), 'invalid');
  assert.equal(await callUnsubscribe(reply(500, '') as typeof fetch, TOKEN, 'status'), 'error');
  assert.equal(await callUnsubscribe(reply(200, 'not json') as typeof fetch, TOKEN, 'status'), 'error');
  assert.equal(await callUnsubscribe((async () => { throw new TypeError('offline'); }) as typeof fetch, TOKEN, 'status'), 'error');
});

test('every language has every string, in plain text', () => {
  const keys = Object.keys(UNSUBSCRIBE_COPY.en).sort();
  assert.deepEqual(Object.keys(UNSUBSCRIBE_COPY).sort(), [...UNSUBSCRIBE_LOCALES].sort());
  for (const locale of UNSUBSCRIBE_LOCALES) {
    const copy = UNSUBSCRIBE_COPY[locale];
    assert.deepEqual(Object.keys(copy).sort(), keys, locale);
    for (const [key, value] of Object.entries(copy)) {
      assert.ok(value.trim().length > 0, `${locale}.${key} is empty`);
      assert.ok(!/[<>—]/.test(value), `${locale}.${key} has markup or an em dash`);
      if (locale !== 'en') assert.notEqual(value, UNSUBSCRIBE_COPY.en[key as keyof typeof copy], `${locale}.${key} is untranslated`);
    }
  }
});

test('the page carries no analytics and keeps its token out of Referer headers', () => {
  const page = readFileSync(new URL('../../src/pages/unsubscribe.astro', import.meta.url), 'utf8');
  const imports = [...page.matchAll(/^\s*import\s[\s\S]*?from\s+['"]([^'"]+)['"]/gm)].map((m) => m[1] as string);
  assert.ok(imports.length > 0);
  // The layouts bring Vercel Web Analytics and the PostHog consent script with them.
  for (const source of imports) {
    assert.ok(!/BaseLayout|LegalLayout|analytics|posthog/i.test(source), `unsubscribe.astro must not import ${source}`);
  }
  assert.match(page, /<meta name="referrer" content="no-referrer" \/>/);
  assert.match(page, /\bnoindex\b/);
});
