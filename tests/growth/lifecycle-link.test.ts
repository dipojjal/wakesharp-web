import assert from 'node:assert/strict';
import test from 'node:test';
import { appUrlFor, LIFECYCLE_ROUTES, readLifecycleLink, sitePathFor } from '../../src/lib/lifecycle-link';
import { DEFAULT_LOCALE, enabledLocales } from '../../src/i18n/config';

const LOCALE_PATHS = enabledLocales().filter((l) => l.code !== DEFAULT_LOCALE).map((l) => l.path);
const SID = '0b6f1c2e-3d4a-4b5c-8d9e-0f1a2b3c4d5e';

test('every contract route is read from the path, with and without a locale prefix', () => {
  for (const route of LIFECYCLE_ROUTES) {
    assert.deepEqual(readLifecycleLink(`/o/${route}`, '', LOCALE_PATHS), { route, known: true, query: '' });
    assert.deepEqual(readLifecycleLink(`/pt-br/o/${route}/`, '', LOCALE_PATHS), { route, known: true, query: '' });
  }
  assert.equal(readLifecycleLink('/o/OFFER', '', LOCALE_PATHS).route, 'offer');
});

test('a missing or malformed route goes Home, a new well-formed one passes through', () => {
  for (const path of ['/o', '/o/', '/de/o', '/o/%E0%A4%A', '/o/..', '/o/a%20b', '/o/' + 'x'.repeat(33), '/g/ABCDEFGHJK']) {
    assert.deepEqual(readLifecycleLink(path, '', LOCALE_PATHS), { route: 'app', known: true, query: '' }, path);
  }
  assert.deepEqual(readLifecycleLink('/o/settings', '', LOCALE_PATHS), { route: 'settings', known: false, query: '' });
});

test('only the contract keys survive, in a fixed order, and only when well formed', () => {
  const link = readLifecycleLink('/o/offer', `?utm_source=x&sid=${SID}&c=email&s=e2&j=trial_cancel&extra=1`, LOCALE_PATHS);
  assert.equal(link.query, `j=trial_cancel&s=e2&c=email&sid=${SID}`);
  assert.equal(appUrlFor(link), `wakesharp://o/offer?j=trial_cancel&s=e2&c=email&sid=${SID}`);
  assert.equal(sitePathFor('/de/o', link), `/de/o/offer?j=trial_cancel&s=e2&c=email&sid=${SID}`);

  const junk = readLifecycleLink('/o/plan', '?j=<script>&s=&c=email%0A&sid=not-a-uuid', LOCALE_PATHS);
  assert.equal(junk.query, '');
  assert.equal(appUrlFor(junk), 'wakesharp://o/plan');
});
