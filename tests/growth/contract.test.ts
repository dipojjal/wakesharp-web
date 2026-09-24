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
  // Floor: created_at, the one timestamp on the installation the client cannot
  // set. first_open_at arrives in the register-install body and is stored
  // verbatim, so anchoring on it would let a backdated device halve the bar.
  assert.match(migration, /a\.occurred_at >= v_install\.created_at/);
  assert.doesNotMatch(migration, /a\.occurred_at >= v_install\.first_open_at/);
  const register = readFileSync(new URL('../../api/referrals/register-install.ts', import.meta.url), 'utf8');
  assert.doesNotMatch(register, /created_at/);
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
  // ...and an inviter who reached twenty is never pruned, or their claims and
  // their unlock would both cascade away and "permanently" would be false.
  assert.match(migration, /NOT EXISTS \(\s*\n\s*SELECT 1 FROM growth_squad_unlocks u/);
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

test('referral routes are wired, and the only scheduled job is retention', () => {
  assert.ok(vercel.rewrites.some((entry: { source: string }) => entry.source === '/r/:code'));
  // G1-04: growth_prune_expired existed and nothing called it.
  assert.deepEqual(vercel.crons, [{ path: '/api/internal/referrals/prune', schedule: '17 3 * * *' }]);
  const prune = readFileSync(new URL('../../api/internal/referrals/prune.ts', import.meta.url), 'utf8');
  assert.match(prune, /growth_prune_expired\(\)/);
  assert.match(prune, /growth_prune_rate_limits\(\)/);
  assert.match(prune, /CRON_SECRET/);
  const components = association.applinks.details[0].components;
  assert.ok(components.some((entry: { '/': string }) => entry['/'] === '/r/*'));
  assert.ok(vercel.functions['api/referrals/*.ts']);
});

const fixes = readFileSync(new URL('../../db/migrations/002_referrals_2_13.sql', import.meta.url), 'utf8');

// G1-01: an existing claim answers before the window and eligibility checks.
test('re-claiming the same code is idempotent at any age', () => {
  const claim = fixes.slice(fixes.indexOf('CREATE OR REPLACE FUNCTION growth_claim_referral'));
  const body = claim.slice(0, claim.indexOf('$$;'));
  const existing = body.indexOf('FROM growth_referral_claims');
  assert.ok(existing > 0);
  assert.ok(existing < body.indexOf("'claim_install_ineligible'"));
  assert.ok(existing < body.indexOf("'claim_window_expired'"));
  assert.ok(body.indexOf("'different_referral_already_claimed'") < body.indexOf("'claim_window_expired'"));
});

// G2-01 / G2-V02: one live installation per App Attest key.
test('an App Attest key stands behind one live installation', () => {
  assert.match(fixes, /CREATE UNIQUE INDEX IF NOT EXISTS growth_installations_live_app_attest_key_idx/);
  assert.match(fixes, /WHERE attestation_provider = 'app_attest'\s*\n\s*AND attestation_key_hash IS NOT NULL\s*\n\s*AND revoked_at IS NULL/);
  const attestation = readFileSync(new URL('../../api/_lib/attestation.ts', import.meta.url), 'utf8');
  assert.doesNotMatch(attestation, /\?\? input\.attestation\.keyId/);
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
  const challenge = readFileSync(new URL('../../api/referrals/challenge.ts', import.meta.url), 'utf8');
  assert.match(challenge, /enforceRateLimit\(request, 'challenge'/);
  assert.match(challenge, /challenge_limit/);
  assert.match(fixes, /CREATE TABLE IF NOT EXISTS growth_rate_limits/);
});

// G1-05 (c): a replayed success assertion appends nothing.
test('a replayed success assertion writes no audit row', () => {
  const success = fixes.slice(fixes.indexOf('CREATE OR REPLACE FUNCTION growth_record_success'));
  const replay = success.indexOf('IF NOT FOUND THEN');
  assert.ok(replay > 0);
  assert.ok(replay < success.indexOf('INSERT INTO growth_referral_audit'));
  assert.ok(success.indexOf('RETURN;', replay) < success.indexOf('INSERT INTO growth_referral_audit'));
  // The ceiling and the floor stay exactly as 001 set them.
  assert.match(success, /p_occurred_at > p_now \+ interval '10 minutes'/);
});
