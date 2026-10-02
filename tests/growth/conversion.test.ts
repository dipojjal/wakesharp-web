import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';
import { credentialDigest } from '../../api/_lib/crypto';
import { ApiError } from '../../api/_lib/http';
import {
  acceptsSandboxConversions,
  conversionRefDigest,
  conversionRequestSchema,
  INVITER_PROGRESS_SQL,
  REWARD_MISSION_ID,
} from '../../api/_lib/referrals';
import * as configRoute from '../../api/referrals/config';
import * as convertedRoute from '../../api/referrals/converted';

/**
 * 2.16: one converted referral unlocks Squats for the inviter. Static checks
 * over the routes in the style of contract.test.ts, plus unit tests of the
 * request schema, the purchase-reference digest, the database connection and
 * the routes' database-free paths. The SQL is a migration in the WakeSharp
 * Supabase project, pinned there (tools/supabase/test_growth_referrals_contract.py
 * and supabase/tests/growth_referrals_test.sql); conversion-sql.test.ts runs
 * conversion-sql-matrix.ts against it when a test database is configured.
 */
const read = (path: string): string => readFileSync(new URL(path, import.meta.url), 'utf8');
const convertedSource = read('../../api/referrals/converted.ts');
const configSource = read('../../api/referrals/config.ts');
const statusSource = read('../../api/referrals/status.ts');
const librarySource = read('../../api/_lib/referrals.ts');
const operationsSource = read('../../api/internal/referrals/operations.ts');
const landingSource = read('../../api/referrals/landing.ts');
const vercel = JSON.parse(read('../../vercel.json'));

// Every refusal growth_record_conversion raises, in the contract's order; the
// migration's own test pins the SQL to this same list.
const ERROR_CODES = [
  'installation_unavailable', 'conversion_store_mismatch', 'conversion_sandbox_rejected',
  'conversion_time_invalid', 'no_referral_claim', 'purchase_already_counted',
] as const;

const validBody = {
  kind: 'trial',
  productId: 'com.wakesharp.app.plus.annual',
  store: 'app_store',
  environment: 'production',
  purchasedAt: '2026-10-01T07:12:00Z',
  purchaseRef: 'A'.repeat(43),
};

async function withEnv(values: Record<string, string | undefined>, work: () => Promise<void> | void): Promise<void> {
  const saved = Object.fromEntries(Object.keys(values).map((key) => [key, process.env[key]]));
  for (const [key, value] of Object.entries(values)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  try {
    await work();
  } finally {
    for (const [key, value] of Object.entries(saved)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
}

// ---------- routes ----------

test('converted.ts passes seven arguments and maps every database refusal', () => {
  assert.match(convertedSource, /growth_record_conversion\(\$1, \$2, \$3, \$4, \$5, \$6, \$7\)/);
  assert.doesNotMatch(convertedSource, /\$8/);
  const enabled = convertedSource.indexOf('assertReferralApiEnabled()');
  const parsed = convertedSource.indexOf('readJson(request, conversionRequestSchema)');
  const authenticated = convertedSource.indexOf('authenticateInstallation(request, raw)');
  assert.ok(enabled > 0 && enabled < parsed && parsed < authenticated);
  assert.match(convertedSource, /new ApiError\(401, 'installation_unavailable'\)/);
  assert.match(convertedSource, /new ApiError\(409, code\)/);
  assert.match(convertedSource, /result\.recorded \? 201 : 200/);
  assert.match(convertedSource, /converted: true/);
  // Every code the function raises is mapped, and nothing else is: the 409s
  // are exactly the CONFLICTS set, and installation_unavailable is the 401.
  const raised = [...ERROR_CODES].sort();
  const start = convertedSource.indexOf('const CONFLICTS = new Set([');
  assert.ok(start > 0);
  const conflicts = convertedSource.slice(start, convertedSource.indexOf(']);', start));
  const mapped = [...conflicts.matchAll(/'([a-z_]+)'/g)].map((match) => match[1]);
  assert.deepEqual([...mapped, 'installation_unavailable'].sort(), raised);
});

test('config.ts never touches the database or the kill switch', () => {
  assert.doesNotMatch(configSource, /assertReferralApiEnabled/);
  assert.doesNotMatch(configSource, /query\(/);
  assert.doesNotMatch(configSource, /_lib\/db|_lib\/referrals|install-auth/);
  assert.match(configSource, /'Cache-Control': 'public, max-age=300, s-maxage=300'/);
});

test('status keeps every shipped field and adds the 2.16 ones', () => {
  assert.match(statusSource, /LIMIT 50/);
  assert.doesNotMatch(statusSource, /LIMIT 10\b/);
  assert.match(statusSource, /ORDER BY c\.claimed_at DESC/);
  assert.match(statusSource, /\(c\.converted_at IS NOT NULL\) AS converted/);
  for (const field of ['rewardsEnabled: true', 'role: claim.role', 'qualified: claim.confirmed', 'confirmed: claim.confirmed', 'ownRewardStatus: null', 'converted: claim.converted', '...progress']) {
    assert.ok(statusSource.includes(field), field);
  }
  for (const field of ['confirmedSignups', 'pendingSignups', 'squadUnlocked', 'convertedSignups', 'awaitingConversion', 'squatsUnlocked']) {
    assert.match(librarySource, new RegExp(`${field}: (?:Number|Boolean)\\(row\\?\\.`), field);
  }
  assert.match(INVITER_PROGRESS_SQL, /FROM growth_mission_unlocks m\s+WHERE m\.installation_id = \$1 AND m\.mission_id = \$2/);
  assert.match(INVITER_PROGRESS_SQL, /c\.converted_at IS NULL\s+AND i\.id IS NOT NULL AND i\.revoked_at IS NULL/);
});

test('operations reports conversions and mission unlocks; landing points at the plans screen', () => {
  assert.match(operationsSource, /conversion_kind AS kind, conversion_environment AS environment/);
  assert.match(operationsSource, /converted_at >= now\(\) - interval '7 days'/);
  assert.match(operationsSource, /FROM growth_mission_unlocks/);
  assert.match(landingSource, /Have a referral code\?/);
  assert.match(landingSource, /plans screen/);
});

test('the new routes are covered by the existing function config', () => {
  assert.ok(vercel.functions['api/referrals/*.ts']);
  assert.ok(existsSync(new URL('../../api/referrals/converted.ts', import.meta.url)));
  assert.ok(existsSync(new URL('../../api/referrals/config.ts', import.meta.url)));
  assert.deepEqual(vercel.crons, [{ path: '/api/internal/referrals/prune', schedule: '17 3 * * *' }]);
});

// ---------- the request schema ----------

test('the conversion body is strict and accepts the contract example', () => {
  assert.equal(conversionRequestSchema.safeParse(validBody).success, true);
  const { purchaseRef: _omitted, ...withoutRef } = validBody;
  assert.equal(conversionRequestSchema.safeParse(withoutRef).success, true);
  assert.equal(conversionRequestSchema.safeParse({ ...validBody, purchaseRef: null }).success, true);
  assert.equal(conversionRequestSchema.safeParse({ ...validBody, kind: 'paid', store: 'play_store', environment: 'sandbox' }).success, true);
  assert.equal(conversionRequestSchema.safeParse({ ...validBody, purchasedAt: '2026-10-01T12:42:00.123+05:30' }).success, true);
  // Play subscriptions arrive as product:baseplan.
  assert.equal(conversionRequestSchema.safeParse({ ...validBody, productId: 'com.wakesharp.app.plus.monthly:monthly-autorenew' }).success, true);
  assert.equal(conversionRequestSchema.safeParse({ ...validBody, purchaseRef: '-_'.repeat(21) + 'Z' }).success, true);
});

test('the conversion body refuses everything outside the contract', () => {
  const refused: Record<string, unknown>[] = [
    { ...validBody, extra: true },
    { ...validBody, revenueCatAppUserId: 'x' },
    { ...validBody, environment: 'xcode' },
    { ...validBody, environment: 'Production' },
    { ...validBody, kind: 'lifetime' },
    { ...validBody, kind: 'promotional' },
    { ...validBody, store: 'promotional' },
    { ...validBody, store: 'stripe' },
    { ...validBody, productId: 'com.other.app.plus.annual' },
    { ...validBody, productId: 'com.wakesharp.app.plus.' },
    { ...validBody, productId: 'com.wakesharp.app.annual' },
    { ...validBody, productId: 'com.wakesharp.app.plus.Annual' },
    { ...validBody, productId: `com.wakesharp.app.plus.${'a'.repeat(81)}` },
    { ...validBody, purchasedAt: '2026-10-01T07:12:00' },
    { ...validBody, purchasedAt: '2026-10-01' },
    { ...validBody, purchasedAt: 1790838720000 },
    { ...validBody, purchaseRef: 'A'.repeat(42) },
    { ...validBody, purchaseRef: 'A'.repeat(44) },
    { ...validBody, purchaseRef: `${'A'.repeat(42)}=` },
    { ...validBody, purchaseRef: `${'A'.repeat(42)}+` },
  ];
  for (const body of refused) {
    assert.equal(conversionRequestSchema.safeParse(body).success, false, JSON.stringify(body));
  }
  for (const key of ['kind', 'productId', 'store', 'environment', 'purchasedAt'] as const) {
    const { [key]: _missing, ...rest } = validBody;
    assert.equal(conversionRequestSchema.safeParse(rest).success, false, `missing ${key}`);
  }
});

// ---------- the purchase-reference digest ----------

test('the purchase reference is stored as a domain-separated HMAC', async () => {
  const pepper = 'p'.repeat(32);
  const reference = 'R'.repeat(43);
  await withEnv({ REFERRAL_CREDENTIAL_PEPPER: pepper }, () => {
    const digest = conversionRefDigest(reference);
    assert.equal(digest.length, 32);
    assert.deepEqual(conversionRefDigest(reference), digest);
    assert.notDeepEqual(conversionRefDigest('S'.repeat(43)), digest);
    // Never the same value an install credential with that text would store.
    assert.notDeepEqual(credentialDigest(reference), digest);
    assert.deepEqual(credentialDigest(`conversion_ref\n${reference}`), digest);
  });
  let first: Buffer | undefined;
  await withEnv({ REFERRAL_CREDENTIAL_PEPPER: pepper }, () => { first = conversionRefDigest(reference); });
  await withEnv({ REFERRAL_CREDENTIAL_PEPPER: 'q'.repeat(32) }, () => {
    assert.notDeepEqual(conversionRefDigest(reference), first);
  });
  for (const missing of [undefined, 'short']) {
    await withEnv({ REFERRAL_CREDENTIAL_PEPPER: missing }, () => {
      assert.throws(() => conversionRefDigest(reference), (error: unknown) =>
        error instanceof ApiError && error.status === 503 && error.code === 'referrals_not_configured');
    });
  }
});

test('sandbox conversions are accepted only when the flag is exactly true', async () => {
  for (const [value, expected] of [[undefined, false], ['false', false], ['TRUE', false], ['1', false], ['true', true]] as const) {
    await withEnv({ REFERRALS_ACCEPT_SANDBOX: value }, () => assert.equal(acceptsSandboxConversions(), expected));
  }
});

// ---------- the routes' database-free paths ----------

const configFor = async (query: string): Promise<{ status: number; body: unknown; cache: string | null }> => {
  const response = await configRoute.GET(new Request(`https://wakesharp.app/api/referrals/config${query}`));
  return { status: response.status, body: await response.json(), cache: response.headers.get('cache-control') };
};

test('/config derives both switches from the environment', async () => {
  await withEnv({ REFERRALS_API_ENABLED: undefined, REFERRALS_PLATFORMS: undefined, REFERRALS_SQUATS_LOCK: undefined }, async () => {
    const off = await configFor('?platform=ios');
    assert.equal(off.status, 200);
    assert.deepEqual(off.body, { protocol: 1, referrals: false, squatsLock: true });
    assert.equal(off.cache, 'public, max-age=300, s-maxage=300');
  });
  await withEnv({ REFERRALS_API_ENABLED: 'true', REFERRALS_PLATFORMS: undefined, REFERRALS_SQUATS_LOCK: undefined }, async () => {
    assert.deepEqual((await configFor('?platform=ios')).body, { protocol: 1, referrals: true, squatsLock: true });
    assert.deepEqual((await configFor('?platform=android')).body, { protocol: 1, referrals: true, squatsLock: true });
    for (const query of ['', '?platform=', '?platform=web', '?platform=IOS', '?platform=ios,android']) {
      assert.deepEqual((await configFor(query)).body, { protocol: 1, referrals: false, squatsLock: true }, query);
    }
  });
  await withEnv({ REFERRALS_API_ENABLED: 'true', REFERRALS_PLATFORMS: 'ios', REFERRALS_SQUATS_LOCK: 'false' }, async () => {
    assert.deepEqual((await configFor('?platform=ios')).body, { protocol: 1, referrals: true, squatsLock: false });
    assert.deepEqual((await configFor('?platform=android')).body, { protocol: 1, referrals: false, squatsLock: false });
  });
  await withEnv({ REFERRALS_API_ENABLED: 'TRUE', REFERRALS_PLATFORMS: ' Android , ios ', REFERRALS_SQUATS_LOCK: 'no' }, async () => {
    assert.deepEqual((await configFor('?platform=android')).body, { protocol: 1, referrals: false, squatsLock: true });
  });
  await withEnv({ REFERRALS_API_ENABLED: 'true', REFERRALS_PLATFORMS: ' Android , ios ', REFERRALS_SQUATS_LOCK: undefined }, async () => {
    assert.deepEqual((await configFor('?platform=android')).body, { protocol: 1, referrals: true, squatsLock: true });
  });
  const post = configRoute.POST();
  assert.equal(post.status, 405);
  assert.equal(post.headers.get('allow'), 'GET');
});

const conversionRequest = (body: unknown, headers: Record<string, string> = {}): Request =>
  new Request('https://wakesharp.app/api/referrals/converted', {
    method: 'POST',
    headers: { 'content-type': 'application/json', ...headers },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });

const errorOf = async (response: Response): Promise<[number, unknown]> => [response.status, await response.json()];

test('/converted is behind the kill switch, then validates before it authenticates', async () => {
  await withEnv({ REFERRALS_API_ENABLED: undefined, DATABASE_URL: undefined }, async () => {
    assert.deepEqual(await errorOf(await convertedRoute.POST(conversionRequest(validBody))), [503, { error: 'referrals_disabled' }]);
  });
  await withEnv({ REFERRALS_API_ENABLED: 'true', DATABASE_URL: undefined }, async () => {
    assert.deepEqual(await errorOf(await convertedRoute.POST(conversionRequest({ ...validBody, extra: 1 }))), [400, { error: 'invalid_request' }]);
    assert.deepEqual(await errorOf(await convertedRoute.POST(conversionRequest({ ...validBody, environment: 'xcode' }))), [400, { error: 'invalid_request' }]);
    assert.deepEqual(await errorOf(await convertedRoute.POST(conversionRequest('{'))), [400, { error: 'invalid_json' }]);
    assert.deepEqual(
      await errorOf(await convertedRoute.POST(conversionRequest(validBody, { 'content-type': 'text/plain' }))),
      [415, { error: 'json_required' }],
    );
    // A valid body still needs the signed install headers.
    assert.deepEqual(await errorOf(await convertedRoute.POST(conversionRequest(validBody))), [401, { error: 'install_auth_required' }]);
  });
  const get = convertedRoute.GET();
  assert.equal(get.status, 405);
  assert.equal(get.headers.get('allow'), 'POST');
});

// ---------- the privacy disclosure ----------

test('the referral privacy section is published, gated, and states what the code enforces', async () => {
  const privacy = read('../../src/templates/PrivacyBody.astro');
  const { REFERRAL_DISCLOSURE } = await import('../../src/templates/legal-copy');
  assert.equal(REFERRAL_DISCLOSURE.published, true);
  const gate = privacy.indexOf('{REFERRAL_DISCLOSURE.published && (');
  const section = privacy.indexOf('<h2 id="inviting-friends">');
  assert.ok(gate > 0 && gate < section);
  assert.doesNotMatch(privacy, /OWNER REVIEW REQUIRED/);
  assert.match(privacy, /Inviting friends \(2\.16\)\. Published 2026-10-01 after every claim was checked/);
  const body = privacy.slice(section, privacy.indexOf('</Fragment>', section));
  for (const topic of ['anonymous installation key', 'keyed hash', 'trial or a paid plan', '180 days', 'Deleting it', 'What the person who invited you sees',
    // Facts the 2026-10-01 review corrected; each is enforced or verified in code.
    'in either order', 'when the report arrived', 'which of your invites', 'kept with no time',
    'for a year after the key', 'within three days', 'Google Play button', 'blanked out of session recordings']) {
    assert.ok(body.includes(topic), topic);
  }
  // Rendered text must pass scripts/check-copy.mjs as-is once published.
  assert.doesNotMatch(body, /\bSquats\b|\brefer a friend\b|\breferral (?:programme|program|bonus|reward|link)\b|—|WakeSharp Plus/i);
});
