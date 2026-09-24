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

// A verifier outage must not look like a rejected device. The iOS client keys
// its App Attest key rotation off the error code alone (it never reads the HTTP
// status), so collapsing 5xx into `attestation_failed` makes every foreground
// throw away a healthy Secure Enclave key and re-attest, burning Apple's
// per-device limits on an outage.
test('a verifier 5xx is unavailable, not a failed attestation', async () => {
  const base = {
    platform: 'ios' as const,
    publicKey: 'cHVibGlj',
    appVersion: '2.5',
    firstOpenAt: '2026-08-30T00:00:00Z',
    revenueCatAppUserId: '$RCAnonymousID:abc',
    claimEligible: true,
    challengeId: '0f8bcb1c-1f0f-4a2f-9a0f-2e2f3a4b5c6d',
    challenge: 'Zm9vYmFyYmF6cXV4Zm9vYmFyYmF6cXV4Zm9vYmFyYmE',
    attestation: { provider: 'app_attest' as const, kind: 'initial' as const, token: 'dG9rZW4' },
  };
  const previous = { url: process.env.ATTESTATION_VERIFIER_URL, secret: process.env.ATTESTATION_VERIFIER_SECRET };
  process.env.ATTESTATION_VERIFIER_URL = 'https://verifier.invalid/check';
  process.env.ATTESTATION_VERIFIER_SECRET = 'secret';
  try {
    // Only a verdict on the device or its key is a refusal (2.13 review).
    const cases: [number, string, string][] = [
      [401, '{"error":"attestation_failed"}', 'attestation_failed'],
      [401, '{"error":"attestation_key_unknown"}', 'attestation_key_unknown'],
      [503, '{"error":"verifier_error"}', 'attestation_unavailable'],
      [500, '{}', 'attestation_unavailable'],
      [401, '{"error":"unauthorized"}', 'attestation_unavailable'],
      [401, '{}', 'attestation_unavailable'],
      [400, '{"error":"request_malformed"}', 'attestation_unavailable'],
      [404, 'Not Found', 'attestation_unavailable'],
      [409, '{"error":"challenge_replayed"}', 'attestation_unavailable'],
      [429, '{}', 'attestation_unavailable'],
    ];
    for (const [status, body, expected] of cases) {
      const stub = (async () => new Response(body, { status })) as unknown as typeof fetch;
      await assert.rejects(() => verifyAttestation(base, stub), (error: unknown) => {
        assert.equal((error as { code: string }).code, expected, `status ${status} ${body}`);
        return true;
      });
    }
  } finally {
    if (previous.url === undefined) delete process.env.ATTESTATION_VERIFIER_URL;
    else process.env.ATTESTATION_VERIFIER_URL = previous.url;
    if (previous.secret === undefined) delete process.env.ATTESTATION_VERIFIER_SECRET;
    else process.env.ATTESTATION_VERIFIER_SECRET = previous.secret;
  }
});

// 2.13 review, LOW 7: a 200 that is not a verdict is configuration too. A
// wrong ATTESTATION_VERIFIER_URL that serves a page answers 200.
test('a 200 that is not a valid verdict is unavailable, not a failed attestation', async () => {
  process.env.ATTESTATION_VERIFIER_URL = 'https://verifier.invalid/check';
  process.env.ATTESTATION_VERIFIER_SECRET = 'test-secret';
  const verdict = {
    valid: true,
    provider: 'play_integrity',
    appId: 'com.wakesharp.app',
    challengeHash: createHash('sha256').update(base.challenge).digest('hex'),
    requestHash: createHash('sha256').update(attestationBinding(base)).digest('hex'),
  };
  const bodies = [
    '<!doctype html><title>Welcome</title>',
    '{}',
    JSON.stringify({ ...verdict, valid: false }),
    JSON.stringify({ ...verdict, extra: 'field' }),
    JSON.stringify({ ...verdict, provider: 'app_attest' }),
    JSON.stringify({ ...verdict, appId: 'com.example.other' }),
  ];
  const original = console.error;
  console.error = () => {};
  try {
    for (const body of bodies) {
      const fetcher = (async () => new Response(body, { status: 200 })) as unknown as typeof fetch;
      await assert.rejects(verifyAttestation(base, fetcher), (error: unknown) => {
        assert.ok(error instanceof ApiError, body);
        assert.equal(error.code, 'attestation_unavailable', body);
        assert.equal(error.status, 503, body);
        return true;
      });
    }
  } finally {
    console.error = original;
  }
});

// G2-01: Android has no provider key. The client's own `keyId` used to be
// hashed and stored as though the verifier had attested it.
test('a key id the verifier did not derive is never stored', async () => {
  process.env.ATTESTATION_VERIFIER_URL = 'https://verifier.invalid/check';
  process.env.ATTESTATION_VERIFIER_SECRET = 'test-secret';
  const input = { ...base, attestation: { ...base.attestation, keyId: 'client-chosen-key' } };
  const fetcher: typeof fetch = async () => new Response(JSON.stringify({
    valid: true,
    provider: 'play_integrity',
    appId: 'com.wakesharp.app',
    challengeHash: createHash('sha256').update(base.challenge).digest('hex'),
    requestHash: createHash('sha256').update(attestationBinding(input)).digest('hex'),
  }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  const result = await verifyAttestation(input, fetcher);
  assert.equal(result.keyHash, null);
});
