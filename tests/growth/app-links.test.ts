import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

test('Android association trusts the verified Play signer, not the upload or debug key', () => {
  const statements = JSON.parse(readFileSync(new URL('../../public/.well-known/assetlinks.json', import.meta.url), 'utf8'));
  assert.deepEqual(statements, [{
    relation: ['delegate_permission/common.handle_all_urls'],
    target: {
      namespace: 'android_app',
      package_name: 'com.wakesharp.app',
      sha256_cert_fingerprints: ['26:A5:22:90:1C:A7:40:2B:C9:9B:A8:C6:DE:0A:32:E4:5F:31:04:E2:ED:32:EF:B9:A5:36:32:54:06:DC:34:E9'],
    },
  }]);
  const config = JSON.parse(readFileSync(new URL('../../vercel.json', import.meta.url), 'utf8'));
  const path = '/.well-known/assetlinks.json';
  assert.ok(config.headers.find((entry: { source: string }) => entry.source === path)
    .headers.some((header: { key: string; value: string }) => header.key === 'Content-Type' && header.value === 'application/json'));
  assert.ok(!config.redirects.some((entry: { source: string }) => entry.source === path));
});

test('the AASA claims every app link path, lifecycle /o/* included, and is served as JSON', () => {
  const aasa = JSON.parse(readFileSync(new URL('../../public/.well-known/apple-app-site-association', import.meta.url), 'utf8'));
  const [details] = aasa.applinks.details;
  assert.deepEqual(details.appIDs, ['W4HPRW2JT4.com.wakesharp.app']);
  assert.deepEqual(details.components.map((c: { '/': string }) => c['/']), ['/c/*', '/p/*', '/g/*', '/r/*', '/o/*']);
  // The email unsubscribe page must open in the browser, never the app.
  assert.ok(!details.components.some((c: { '/': string }) => c['/'].startsWith('/unsubscribe') || c['/'] === '*' || c['/'] === '/*'));
  const config = JSON.parse(readFileSync(new URL('../../vercel.json', import.meta.url), 'utf8'));
  const path = '/.well-known/apple-app-site-association';
  assert.ok(config.headers.find((entry: { source: string }) => entry.source === path)
    .headers.some((header: { key: string; value: string }) => header.key === 'Content-Type' && header.value === 'application/json'));
  // Apple fetches it without following redirects, and a rewrite would serve a page instead.
  for (const list of [config.redirects, config.rewrites]) {
    assert.ok(!list.some((entry: { source: string }) => entry.source.startsWith('/.well-known')));
  }
});

test('every /o/<route> and /<locale>/o/<route> reaches the lifecycle page', () => {
  const config = JSON.parse(readFileSync(new URL('../../vercel.json', import.meta.url), 'utf8'));
  const rewrites: { source: string; destination: string }[] = config.rewrites;
  assert.ok(rewrites.some((r) => r.source === '/o/:route*' && r.destination === '/o'));
  assert.ok(rewrites.some((r) => /^\/:lang\([^)]+\)\/o\/:route\*$/.test(r.source) && r.destination === '/:lang/o'));
});
