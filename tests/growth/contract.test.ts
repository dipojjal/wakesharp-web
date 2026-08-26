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
    'growth_successful_day_assertions', 'growth_reward_grants',
    'growth_apple_attribution_aggregates', 'growth_referral_audit',
  ]) assert.match(migration, new RegExp(`CREATE TABLE ${name}`));
  assert.match(migration, /UNIQUE \(installation_id, local_day\)/);
  assert.match(migration, /interval '18 hours'/);
  assert.match(migration, /interval '168 hours'/);
  assert.match(migration, /AT TIME ZONE 'UTC'/);
  assert.match(migration, /v_recent_inviter_rewards >= 5/);
  assert.match(migration, /interval '180 days'/);
  assert.match(migration, /append-only/);
  assert.match(migration, /growth_delete_installation/);
  assert.match(migration, /claim_eligible boolean NOT NULL DEFAULT false/);
  assert.match(migration, /claim_install_ineligible/);
  assert.match(migration, /consumed_at timestamptz/);
  assert.match(registerRoute, /consumed_at IS NULL/);
});

test('raw referrers and attestation payloads have no database columns', () => {
  assert.doesNotMatch(migration, /raw_referrer|attestation_token|apple_token/i);
});

test('referral routes are wired without a scheduled production job', () => {
  assert.ok(vercel.rewrites.some((entry: { source: string }) => entry.source === '/r/:code'));
  assert.equal('crons' in vercel, false);
  const components = association.applinks.details[0].components;
  assert.ok(components.some((entry: { '/': string }) => entry['/'] === '/r/*'));
  assert.ok(vercel.functions['api/referrals/challenge.ts']);
});
