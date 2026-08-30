import assert from 'node:assert/strict';
import test from 'node:test';
import { createHash } from 'node:crypto';
import { attestationBinding, verifyAttestation } from '../../api/_lib/attestation';
import { ApiError } from '../../api/_lib/http';

const original = { url: process.env.ATTESTATION_VERIFIER_URL, secret: process.env.ATTESTATION_VERIFIER_SECRET };
test.after(() => {
  if (original.url === undefined) delete process.env.ATTESTATION_VERIFIER_URL;
  else process.env.ATTESTATION_VERIFIER_URL = original.url;
  if (original.secret === undefined) delete process.env.ATTESTATION_VERIFIER_SECRET;
  else process.env.ATTESTATION_VERIFIER_SECRET = original.secret;
});

const base = {
  platform: 'android' as const,
  publicKey: 'public-key',
  appVersion: '2.1',
  firstOpenAt: '2026-08-25T12:00:00Z',
  revenueCatAppUserId: '$RCAnonymousID:test',
  claimEligible: true,
  challengeId: '019c9999-1111-7111-8111-111111111111',
  challenge: 'AQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQE',
  attestation: { provider: 'play_integrity' as const, kind: 'assertion' as const, token: 'token-token-token-token' },
};

test('provider mismatch is rejected before any network call', async () => {
  await assert.rejects(
    verifyAttestation({ ...base, attestation: { provider: 'app_attest', kind: 'initial', token: 'token-token-token-token' } }),
    (error: unknown) => error instanceof ApiError && error.code === 'attestation_platform_mismatch',
  );
});

test('attestation has no unconfigured development bypass', async () => {
  delete process.env.ATTESTATION_VERIFIER_URL;
  delete process.env.ATTESTATION_VERIFIER_SECRET;
  await assert.rejects(
    verifyAttestation(base),
    (error: unknown) => error instanceof ApiError && error.code === 'attestation_not_configured',
  );
});

test('private verifier result is bound to the expected app ID', async () => {
  process.env.ATTESTATION_VERIFIER_URL = 'https://verifier.invalid/check';
  process.env.ATTESTATION_VERIFIER_SECRET = 'test-secret';
  const fetcher: typeof fetch = async () => new Response(JSON.stringify({
    valid: true,
    provider: 'play_integrity',
    appId: 'com.wakesharp.app',
    keyId: 'provider-key-1',
    challengeHash: createHash('sha256').update(base.challenge).digest('hex'),
    requestHash: createHash('sha256').update(attestationBinding(base)).digest('hex'),
  }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  const result = await verifyAttestation(base, fetcher);
  assert.equal(result.provider, 'play_integrity');
  assert.equal(result.keyHash?.length, 32);
});

test('private verifier must prove the single-use challenge binding', async () => {
  process.env.ATTESTATION_VERIFIER_URL = 'https://verifier.invalid/check';
  process.env.ATTESTATION_VERIFIER_SECRET = 'test-secret';
  const fetcher: typeof fetch = async () => new Response(JSON.stringify({
    valid: true,
    provider: 'play_integrity',
    appId: 'com.wakesharp.app',
    challengeHash: '0'.repeat(64),
    requestHash: createHash('sha256').update(attestationBinding(base)).digest('hex'),
  }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  await assert.rejects(
    verifyAttestation(base, fetcher),
    (error: unknown) => error instanceof ApiError && error.code === 'attestation_challenge_mismatch',
  );
});

test('private verifier must bind install and entitlement identity fields', async () => {
  process.env.ATTESTATION_VERIFIER_URL = 'https://verifier.invalid/check';
  process.env.ATTESTATION_VERIFIER_SECRET = 'test-secret';
  const fetcher: typeof fetch = async () => new Response(JSON.stringify({
    valid: true,
    provider: 'play_integrity',
    appId: 'com.wakesharp.app',
    challengeHash: createHash('sha256').update(base.challenge).digest('hex'),
    requestHash: '0'.repeat(64),
  }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  await assert.rejects(
    verifyAttestation(base, fetcher),
    (error: unknown) => error instanceof ApiError && error.code === 'attestation_request_mismatch',
  );
});
