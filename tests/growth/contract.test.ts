import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const migration = readFileSync(new URL('../../db/migrations/001_growth_referrals.sql', import.meta.url), 'utf8');
const registerRoute = readFileSync(new URL('../../api/referrals/register-install.ts', import.meta.url), 'utf8');
const vercel = JSON.parse(readFileSync(new URL('../../vercel.json', import.meta.url), 'utf8'));
const association = JSON.parse(readFileSync(new URL('../../public/.well-known/apple-app-site-association', import.meta.url), 'utf8'));

test('migration contains every bounded anonymous record and operation', () => {
  for (const name of [
    'growth_anonymous_installations', 'growth_attestation_challenges',
    'growth_referral_codes', 'growth_referral_claims',
    'growth_successful_day_assertions', 'growth_squad_unlocks',
    'growth_referral_audit',
  ]) assert.match(migration, new RegExp(`CREATE TABLE ${name}`));
  assert.match(migration, /UNIQUE \(installation_id, local_day\)/);
  assert.match(migration, /AT TIME ZONE 'UTC'/);
  assert.match(migration, /interval '180 days'/);
  assert.match(migration, /append-only/);
  assert.match(migration, /growth_delete_installation/);
  assert.match(migration, /claim_eligible boolean NOT NULL DEFAULT false/);
  assert.match(migration, /claim_install_ineligible/);
  assert.match(migration, /consumed_at timestamptz/);
  assert.match(registerRoute, /consumed_at IS NULL/);
});

// A referral confirms on signup + completed onboarding + three qualifying
// mornings. Each clause below is load-bearing, so each is pinned: dropping any
// one of them silently reopens the farm this bar exists to close.
test('confirmation requires onboarding and three qualifying mornings', () => {
  assert.match(migration, /onboarding_completed_at timestamptz/);
  assert.match(migration, /confirmed_at timestamptz/);
  assert.match(migration, /growth_record_onboarding_completed/);
  assert.match(migration, /growth_evaluate_claim_confirmation/);
  // Three assertions joined pairwise, hence exactly two spacing predicates.
  assert.equal(migration.match(/interval '18 hours'/g)?.length, 2);
  assert.match(migration, /IF v_install\.onboarding_completed_at IS NULL THEN RETURN false; END IF;/);
});

test('the three mornings are anchored to the server clock at both ends', () => {
  // Floor: nothing before the server-recorded first open can count. Without it,
  // backdating a device mints three "days" in a minute.
  assert.match(migration, /a\.occurred_at >= v_install\.first_open_at/);
  // Ceiling: nothing after the server's own now. Without it, fast-forwarding does.
  assert.match(migration, /p_occurred_at > p_now \+ interval '10 minutes'/);
  // ...and the route must let p_now default to the database's now(), never pass
  // a client-supplied timestamp into it, or the ceiling compares a value to itself.
  const success = readFileSync(new URL('../../api/referrals/success.ts', import.meta.url), 'utf8');
  assert.match(success, /growth_record_success\(\$1, \$2, \$3, \$4, \$5, \$6\)/);
});

test('no cap, no deadline, and no entitlement is granted', () => {
  assert.doesNotMatch(migration, /qualification_deadline/);
  assert.doesNotMatch(migration, /interval '168 hours'/);
  assert.doesNotMatch(migration, /v_recent_inviter_rewards|cap_blocked/);
  assert.doesNotMatch(migration, /growth_reward_grants/);
  for (const file of ['../../api/_lib/referrals.ts', '../../api/referrals/status.ts',
    '../../api/referrals/success.ts', '../../api/internal/referrals/operations.ts']) {
    const source = readFileSync(new URL(file, import.meta.url), 'utf8');
    assert.doesNotMatch(source, /fulfillRewardGrant|REFERRAL_REWARDS_ENABLED/);
  }
});

test('retention cannot take an inviter\'s earned progress back down', () => {
  // The referred installation detaches from its claim instead of cascading it
  // away, so pruning a dormant referee never decrements the inviter.
  assert.match(migration, /referred_installation_id uuid UNIQUE REFERENCES growth_anonymous_installations\(id\) ON DELETE SET NULL/);
});

test('the unlock is twenty, recorded once, and never fires early', () => {
  assert.match(migration, /IF v_total >= 20 THEN/);
  assert.match(migration, /confirmed_at_unlock integer NOT NULL CHECK \(confirmed_at_unlock >= 20\)/);
  assert.match(migration, /ON CONFLICT \(installation_id\) DO NOTHING/);
  // The inviter row is locked before the count, or two referrals confirming at
  // once both read 19 and the twentieth unlocks nothing.
  assert.match(migration, /WHERE id = v_claim\.inviter_installation_id\s*\n\s*FOR UPDATE;/);
  const lib = readFileSync(new URL('../../api/_lib/referrals.ts', import.meta.url), 'utf8');
  assert.match(lib, /SQUAD_UNLOCK_THRESHOLD = 20/);
});

test('raw referrers and attestation payloads have no database columns', () => {
  assert.doesNotMatch(migration, /raw_referrer|attestation_token|apple_token/i);
});

test('referral routes are wired without a scheduled production job', () => {
  assert.ok(vercel.rewrites.some((entry: { source: string }) => entry.source === '/r/:code'));
  assert.equal('crons' in vercel, false);
  const components = association.applinks.details[0].components;
  assert.ok(components.some((entry: { '/': string }) => entry['/'] === '/r/*'));
  assert.ok(vercel.functions['api/referrals/*.ts']);
});
