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
