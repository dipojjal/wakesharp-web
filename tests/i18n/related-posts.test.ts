import assert from 'node:assert/strict';
import test from 'node:test';
import { rankRelated, type RankablePost } from '../../src/lib/related-posts';

const post = (id: string, category: string, tags: string[], day: number): RankablePost => ({
  id,
  data: { category, tags, pubDate: new Date(Date.UTC(2026, 7, day)) },
});

const current = post('current', 'sleep-science', ['sleep-inertia', 'grogginess'], 15);
const pool = [
  current,
  post('same-tags', 'tips-and-tricks', ['sleep-inertia', 'grogginess'], 1),
  post('one-tag', 'productivity', ['sleep-inertia'], 2),
  post('category-near', 'sleep-science', [], 14),
  post('category-far', 'sleep-science', [], 1),
  post('unrelated', 'company', ['news'], 16),
];

test('shared tags outrank a matching category, and a post never lists itself', () => {
  const ids = rankRelated(current, pool).map((p) => p.id);
  assert.deepEqual(ids, ['same-tags', 'one-tag', 'category-near']);
  assert.ok(!ids.includes('current'));
});

test('equal scores go to the post published closest in time', () => {
  const ids = rankRelated(current, pool, 4).map((p) => p.id);
  assert.equal(ids[2], 'category-near');
  assert.equal(ids[3], 'category-far');
});

test('posts with nothing in common still fill the block', () => {
  const lonely = post('lonely', 'company', ['launch'], 10);
  const ids = rankRelated(lonely, [lonely, post('a', 'sleep-science', [], 9), post('b', 'productivity', [], 20)]).map((p) => p.id);
  assert.deepEqual(ids, ['a', 'b']);
});

test('the result does not depend on the order posts arrive in', () => {
  const forward = rankRelated(current, pool).map((p) => p.id);
  const backward = rankRelated(current, [...pool].reverse()).map((p) => p.id);
  assert.deepEqual(backward, forward);
});

test('an exact tie is broken by id, so builds are repeatable', () => {
  const a = post('twin-a', 'sleep-science', [], 14);
  const b = post('twin-b', 'sleep-science', [], 16);
  assert.deepEqual(rankRelated(current, [b, a], 1).map((p) => p.id), ['twin-a']);
});
