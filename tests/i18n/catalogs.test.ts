import assert from 'node:assert/strict';
import test from 'node:test';
import { CATALOGS } from '../../src/i18n/catalog';
import { en } from '../../src/i18n/en';
import { enabledLocales } from '../../src/i18n/config';
import { compareShape } from '../../src/i18n/shape';

test('every enabled locale has a registered catalog', () => {
  for (const l of enabledLocales()) assert.ok(l.code in CATALOGS, `no catalog registered for "${l.code}"`);
});

test('every registered catalog matches the English shape', () => {
  for (const [code, catalog] of Object.entries(CATALOGS)) {
    if (code === 'en') continue;
    const problems = compareShape(en, catalog).map((p) => `${p.path}: ${p.problem}`);
    assert.deepEqual(problems, [], `${code} catalog:\n  ${problems.join('\n  ')}`);
  }
});

test('the shape checker catches the mistakes a translator can make', () => {
  const reference = { a: 'Email [{email}](email)', list: ['x', 'y'], h: { pre: 'A ', accent: 'b' } };
  const problems = compareShape(reference, { a: 'Correo [{mail}](email)', list: ['x'], h: { pre: 'A ', accent: '' }, extra: 1 });
  assert.deepEqual(
    problems.map((p) => p.path).sort(),
    ['a', 'extra', 'h.accent', 'list'],
  );
});
