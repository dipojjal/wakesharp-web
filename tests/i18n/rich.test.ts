import assert from 'node:assert/strict';
import test from 'node:test';
import { interpolate, parseRich, plainText, richNodes } from '../../src/i18n/rich';
import { localePath } from '../../src/i18n/routes';
import { LOCALES, RESERVED_ROOT_SEGMENTS, enabledLocales } from '../../src/i18n/config';

test('plain text is a single node', () => {
  assert.deepEqual(parseRich('Wake up sharp.'), [{ type: 'text', value: 'Wake up sharp.' }]);
});

test('strong, em and links tokenize in order', () => {
  assert.deepEqual(parseRich('I reply within **2–3 days** to _most_ mail, see the [Privacy Policy](privacy).'), [
    { type: 'text', value: 'I reply within ' },
    { type: 'strong', value: '2–3 days' },
    { type: 'text', value: ' to ' },
    { type: 'em', value: 'most' },
    { type: 'text', value: ' mail, see the ' },
    { type: 'link', key: 'privacy', value: 'Privacy Policy' },
    { type: 'text', value: '.' },
  ]);
});

test('underscores inside words are not emphasis', () => {
  assert.deepEqual(parseRich('snake_case_name stays'), [{ type: 'text', value: 'snake_case_name stays' }]);
  assert.deepEqual(parseRich('Ayarlar → _Alarm güvenilirliği_.'), [
    { type: 'text', value: 'Ayarlar → ' },
    { type: 'em', value: 'Alarm güvenilirliği' },
    { type: 'text', value: '.' },
  ]);
});

test('unbalanced markup throws', () => {
  assert.throws(() => parseRich('This **never closes'), /Unbalanced/);
  assert.throws(() => parseRich('A [label](no-close'), /Malformed link|Unbalanced/);
});

test('variables substitute per node and never inject markup', () => {
  assert.equal(interpolate('or {annual}/year', { annual: '$34.99' }), 'or $34.99/year');
  assert.throws(() => interpolate('Email {email}', {}), /Missing variable/);
  const nodes = richNodes('Write to [{email}](email).', { email: '**not**@x.y' });
  assert.deepEqual(nodes[1], { type: 'link', key: 'email', value: '**not**@x.y' });
});

test('plainText strips markup for titles and alt text', () => {
  assert.equal(plainText('**Bold** and [linked](k) with {n}', { n: 3 }), 'Bold and linked with 3');
});

test('localePath prefixes non-default locales and never adds a trailing slash', () => {
  assert.equal(localePath('en', '/'), '/');
  assert.equal(localePath('en', '/support'), '/support');
  assert.equal(localePath('es', '/'), '/es');
  assert.equal(localePath('es', '/support'), '/es/support');
  assert.equal(localePath('es', '/#faq'), '/es#faq');
  assert.equal(localePath('en', '/#faq'), '/#faq');
  assert.equal(localePath('pt-BR', '/blog/a-post'), '/pt-br/blog/a-post');
  assert.equal(localePath('es', 'support/'), '/es/support');
});

test('registry paths never shadow a root page and the default is enabled', () => {
  for (const l of LOCALES) assert.ok(!(RESERVED_ROOT_SEGMENTS as readonly string[]).includes(l.path), l.path);
  assert.ok(enabledLocales().some((l) => l.code === 'en'));
});
