import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';

// The referral schema moved to the WakeSharp Supabase project in 2.16
// (supabase/migrations/*_growth_referrals.sql). Its text contracts moved with
// it (tools/supabase/test_growth_referrals_contract.py) and its behaviour is a
// pgTAP suite there; what stays here pins the routes' side of each contract.
const read = (path: string): string => readFileSync(new URL(path, import.meta.url), 'utf8');
const registerRoute = read('../../api/referrals/register-install.ts');
const vercel = JSON.parse(read('../../vercel.json'));
const association = JSON.parse(read('../../public/.well-known/apple-app-site-association'));

test('the schema is not in this repository any more', () => {
  assert.ok(!existsSync(new URL('../../db/migrations', import.meta.url)));
  const db = read('../../api/_lib/db.ts');
  assert.doesNotMatch(db, /neondatabase/);
  assert.match(db, /from 'pg'/);
});

test('a challenge is consumed once and registration never sets created_at', () => {
  assert.match(registerRoute, /consumed_at IS NULL/);
  // created_at is the one timestamp a client cannot set; the confirmation floor
  // in growth_evaluate_claim_confirmation depends on it.
  assert.doesNotMatch(registerRoute, /created_at/);
  // ...and the success route lets p_now default to the database's now().
  const success = read('../../api/referrals/success.ts');
  assert.match(success, /growth_record_success\(\$1, \$2, \$3, \$4, \$5, \$6\)/);
});

test('no route grants an entitlement', () => {
  for (const file of ['../../api/_lib/referrals.ts', '../../api/referrals/status.ts',
    '../../api/referrals/success.ts', '../../api/referrals/converted.ts',
    '../../api/referrals/config.ts', '../../api/internal/referrals/operations.ts']) {
    assert.doesNotMatch(read(file), /fulfillRewardGrant|REFERRAL_REWARDS_ENABLED/);
  }
  assert.match(read('../../api/_lib/referrals.ts'), /SQUAD_UNLOCK_THRESHOLD = 20/);
});

test('referral routes are wired, and the only scheduled job is retention', () => {
  assert.ok(vercel.rewrites.some((entry: { source: string }) => entry.source === '/r/:code'));
  // G1-04: growth_prune_expired existed and nothing called it.
  assert.deepEqual(vercel.crons, [{ path: '/api/internal/referrals/prune', schedule: '17 3 * * *' }]);
  const prune = read('../../api/internal/referrals/prune.ts');
  assert.match(prune, /growth_prune_expired\(\)/);
  assert.match(prune, /growth_prune_rate_limits\(\)/);
  assert.match(prune, /CRON_SECRET/);
  const components = association.applinks.details[0].components;
  assert.ok(components.some((entry: { '/': string }) => entry['/'] === '/r/*'));
  assert.ok(vercel.functions['api/referrals/*.ts']);
  // Every referral route, all inside that glob (conversion.test.ts
  // pins the two new ones).
  for (const route of ['challenge', 'register-install', 'create', 'claim', 'status', 'delete',
    'landing', 'success', 'onboarded', 'converted', 'config']) {
    assert.ok(existsSync(new URL(`../../api/referrals/${route}.ts`, import.meta.url)), route);
  }
});

// G2-01 / G2-V02: one live installation per App Attest key (the unique index
// is in the migration; the route must use the key the device attested).
test('an App Attest key is taken from the attestation, never the request', () => {
  assert.doesNotMatch(read('../../api/_lib/attestation.ts'), /\?\? input\.attestation\.keyId/);
});

// G2-02 / G1-05: a challenge is spent before verification, and the
// unauthenticated routes are limited per network.
test('the challenge is spent before the verifier is called', () => {
  const consume = registerRoute.indexOf('SET consumed_at = now()');
  assert.ok(consume > 0);
  assert.ok(consume < registerRoute.indexOf('await verifyAttestation(value)'));
  // The identity check follows the challenge and only counts live rows (G1-03).
  const identity = registerRoute.indexOf('installation_identity_conflict');
  assert.ok(consume < identity);
  assert.match(registerRoute, /AND expires_at > now\(\)\s*\n\s*LIMIT 1/);
  assert.match(registerRoute, /enforceRateLimit\(request, 'register-install'/);
  // The field is named for RevenueCat but must only ever carry the derived
  // install identifier, never RevenueCat's ID (privacy policy).
  assert.match(registerRoute, /revenueCatAppUserId: z\.string\(\)\.regex\(\/\^install-\[0-9a-f\]\{32\}\$\/\)/);
  const challenge = read('../../api/referrals/challenge.ts');
  assert.match(challenge, /enforceRateLimit\(request, 'challenge'/);
  assert.match(challenge, /challenge_limit/);
});
