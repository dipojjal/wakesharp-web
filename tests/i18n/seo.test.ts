import assert from 'node:assert/strict';
import test from 'node:test';
import { pageTitle } from '../../src/lib/seo';

test('the suffix is added when the whole title fits', () => {
  assert.equal(pageTitle("iPhone Alarm Didn't Go Off? The 7 Real Causes", ' — WakeSharp'), "iPhone Alarm Didn't Go Off? The 7 Real Causes — WakeSharp");
});

test('the suffix is dropped rather than pushing the title past 60 characters', () => {
  const base = 'Will My Alarm Go Off on Silent? iPhone and Android, Answered';
  assert.equal([...base].length, 60);
  assert.equal(pageTitle(base, ' — WakeSharp'), base);
});

test('length is counted in characters, not bytes', () => {
  const base = 'Инерция сна: почему вы просыпаетесь разбитыми';
  assert.equal(pageTitle(base, ' — WakeSharp'), `${base} — WakeSharp`);
});
