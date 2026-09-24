import assert from 'node:assert/strict';
import test from 'node:test';
import {
  clientNetworks,
  enforceRateLimit,
  IPV6_SITE_FACTOR,
  ipv6Network48,
  ipv6Network64,
  rateBucketKey,
} from '../../api/_lib/rate-limit';
import { ApiError } from '../../api/_lib/http';

const request = (headers: Record<string, string>) => new Request('https://wakesharp.app/api/referrals/challenge', { headers });

test('an IPv6 caller is counted by its /48, whichever /64 in it it sends from', () => {
  assert.equal(ipv6Network48('2001:db8:1:2:aaaa::1'), '2001:db8:1::/48');
  assert.equal(ipv6Network48('2001:0db8:0001:ffff:ffff:ffff:ffff:ffff'), '2001:db8:1::/48');
  assert.equal(ipv6Network48('2001:db8:1:beef::1'), ipv6Network48('2001:db8:1:2::1'));
  assert.notEqual(ipv6Network48('2001:db8:2::1'), ipv6Network48('2001:db8:1::1'));
  assert.equal(ipv6Network48('2001:db8::1'), '2001:db8:0::/48');
  assert.equal(ipv6Network48('::1'), '0:0:0::/48');
  assert.equal(ipv6Network48('fe80::1%en0'), 'fe80:0:0::/48');
  assert.equal(ipv6Network48('64:ff9b::192.0.2.1'), '64:ff9b:0::/48');
  assert.equal(ipv6Network48('203.0.113.9'), null);
  assert.equal(ipv6Network48('not an address'), null);
});

test('an IPv6 caller\'s line is its /64', () => {
  assert.equal(ipv6Network64('2001:db8:1:2:aaaa::1'), '2001:db8:1:2::/64');
  assert.equal(ipv6Network64('2001:0db8:0001:0002:ffff:ffff:ffff:ffff'), '2001:db8:1:2::/64');
  assert.notEqual(ipv6Network64('2001:db8:1:3::1'), ipv6Network64('2001:db8:1:2::1'));
  assert.equal(ipv6Network64('2001:db8::1'), '2001:db8:0:0::/64');
  assert.equal(ipv6Network64('203.0.113.9'), null);
});

// 2.13 review, LOW 10c: a /64 is one line and stays tight; a /48 is a site or
// a carrier pool and gets a larger share, so neither one alone decides.
test('the budgets come from the address Vercel saw: IPv4 once, IPv6 by line and by site', () => {
  assert.deepEqual(clientNetworks(request({ 'x-real-ip': '203.0.113.9' })), [{ network: '203.0.113.9', factor: 1 }]);
  assert.deepEqual(
    clientNetworks(request({ 'x-forwarded-for': '198.51.100.7, 10.0.0.1' })),
    [{ network: '198.51.100.7', factor: 1 }],
  );
  assert.deepEqual(clientNetworks(request({ 'x-real-ip': '2001:db8:1:2:aaaa::1' })), [
    { network: '2001:db8:1:2::/64', factor: 1 },
    { network: '2001:db8:1::/48', factor: IPV6_SITE_FACTOR },
  ]);
  assert.ok(IPV6_SITE_FACTOR > 1);
  // An IPv4 host written in IPv6 form is that IPv4 host, not one shared /64.
  assert.deepEqual(clientNetworks(request({ 'x-real-ip': '::ffff:203.0.113.9' })), [{ network: '203.0.113.9', factor: 1 }]);
  assert.deepEqual(clientNetworks(request({ 'x-real-ip': 'garbage' })), [{ network: 'unknown', factor: 1 }]);
  assert.deepEqual(clientNetworks(request({})), [{ network: 'unknown', factor: 1 }]);
});

test('each budget has its own key, and no key holds the address', () => {
  const pepper = 'p'.repeat(32);
  const line = rateBucketKey(pepper, 'challenge', '2001:db8:1:2::/64');
  const site = rateBucketKey(pepper, 'challenge', '2001:db8:1::/48');
  assert.notDeepEqual(line, site);
  assert.notDeepEqual(line, rateBucketKey(pepper, 'register-install', '2001:db8:1:2::/64'));
  assert.equal(line.length, 32);
  assert.ok(!line.toString('latin1').includes('2001'));
});

test('without the pepper the limiter refuses rather than letting everything through', async () => {
  const previous = process.env.REFERRAL_CREDENTIAL_PEPPER;
  delete process.env.REFERRAL_CREDENTIAL_PEPPER;
  try {
    await assert.rejects(
      enforceRateLimit(request({ 'x-real-ip': '203.0.113.9' }), 'challenge', 30, 3600),
      (error: unknown) => error instanceof ApiError && error.status === 503,
    );
  } finally {
    if (previous !== undefined) process.env.REFERRAL_CREDENTIAL_PEPPER = previous;
  }
});
