import assert from 'node:assert/strict';
import test from 'node:test';
import { folderOfId, placementProblems, slugOfId, sourceSlugOf } from '../../src/lib/blog-i18n';

const en = (slug: string) => ({ id: slug, data: { lang: 'en' } });
const tr = (slug: string, extra: Record<string, string> = {}) => ({ id: `tr/${slug}`, data: { lang: 'tr', ...extra } });

test('ids split into folder and slug', () => {
  assert.equal(slugOfId('sleep-inertia'), 'sleep-inertia');
  assert.equal(slugOfId('pt-br/sleep-inertia'), 'sleep-inertia');
  assert.equal(folderOfId('pt-br/sleep-inertia'), 'pt-br');
  assert.equal(folderOfId('sleep-inertia'), '');
  assert.equal(sourceSlugOf(tr('sleep-inertia')), 'sleep-inertia');
  assert.equal(sourceSlugOf(tr('uyku-atalet', { translationOf: 'sleep-inertia' })), 'sleep-inertia');
});

test('a well-placed English post and its translation pass', () => {
  assert.deepEqual(placementProblems([en('sleep-inertia'), tr('sleep-inertia')]), []);
});

test('every placement mistake is named', () => {
  const problems = placementProblems([
    en('sleep-inertia'),
    { id: 'es/sleep-inertia', data: { lang: 'tr' } },
    { id: 'tr/orphan', data: { lang: 'tr' } },
    { id: 'tr/sleep-inertia', data: { lang: 'xx' } },
    { id: 'de', data: { lang: 'en' } },
    { id: 'page', data: { lang: 'en' } },
    { id: 'legacy/old-post', data: { lang: 'en' } },
    { id: 'wrong', data: { lang: 'en', translationOf: 'sleep-inertia' } },
  ]);
  const ids = problems.map((p) => p.split(':')[0]);
  assert.deepEqual([...new Set(ids)].sort(), ['de', 'es/sleep-inertia', 'legacy/old-post', 'page', 'tr/orphan', 'tr/sleep-inertia', 'wrong']);
  assert.ok(problems.some((p) => p.includes('must live in src/content/blog/tr/')));
  assert.ok(problems.some((p) => p.includes('is not an English post')));
  assert.ok(problems.some((p) => p.includes('locale path')));
});
