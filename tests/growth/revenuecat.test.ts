import assert from 'node:assert/strict';
import test from 'node:test';
import {
  grantConflictResolution,
  isConfirmedGrantStatus,
  referralRewardPolicy,
} from '../../api/_lib/revenuecat';

const NOW = new Date('2026-08-25T12:00:00.000Z');
const FOURTEEN_DAYS = 14 * 24 * 60 * 60 * 1_000;

test('free and expired users receive fourteen days from reward time', () => {
  for (const expirations of [[], [NOW.getTime() - 1_000]]) {
    const policy = referralRewardPolicy(NOW, expirations);
    assert.equal(policy.kind, 'grant');
    if (policy.kind === 'grant') assert.equal(policy.expiresAt.getTime(), NOW.getTime() + FOURTEEN_DAYS);
  }
});

test('active paid access is extended from the latest known expiry', () => {
  const paidExpiry = NOW.getTime() + 20 * 24 * 60 * 60 * 1_000;
  const policy = referralRewardPolicy(NOW, [NOW.getTime() + 10_000, paidExpiry]);
  assert.equal(policy.kind, 'grant');
  if (policy.kind === 'grant') assert.equal(policy.expiresAt.getTime(), paidExpiry + FOURTEEN_DAYS);
});

test('lifetime access produces recognition without a redundant grant', () => {
  assert.deepEqual(referralRewardPolicy(NOW, [null]), { kind: 'lifetime_recognition' });
});

test('only a confirmed entitlement or lifetime recognition is reported as rewarded', () => {
  assert.equal(isConfirmedGrantStatus('granted'), true);
  assert.equal(isConfirmedGrantStatus('recognition_only'), true);
  assert.equal(isConfirmedGrantStatus('cap_blocked'), false);
  assert.equal(isConfirmedGrantStatus('failed'), false);
});

test('an entitlement conflict is confirmed only when access reaches the persisted target', () => {
  const desired = new Date(NOW.getTime() + FOURTEEN_DAYS);
  assert.deepEqual(grantConflictResolution(NOW, desired, [null]), { kind: 'confirmed' });
  assert.deepEqual(grantConflictResolution(NOW, desired, [desired.getTime()]), { kind: 'confirmed' });
  assert.deepEqual(grantConflictResolution(NOW, desired, []), { kind: 'retry' });
});

test('an active shorter entitlement defers the grant until shortly after its expiry', () => {
  const activeExpiry = NOW.getTime() + 2 * 24 * 60 * 60 * 1_000;
  const desired = new Date(NOW.getTime() + FOURTEEN_DAYS);
  assert.deepEqual(grantConflictResolution(NOW, desired, [activeExpiry]), {
    kind: 'defer',
    retryAt: new Date(activeExpiry + 5 * 60 * 1_000),
  });
});
