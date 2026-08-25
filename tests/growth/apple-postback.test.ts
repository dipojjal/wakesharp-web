import assert from 'node:assert/strict';
import test from 'node:test';
import { verifyApplePostback } from '../../api/_lib/apple-postback';
import { ApiError } from '../../api/_lib/http';

const encode = (value: unknown): string => Buffer.from(JSON.stringify(value)).toString('base64url');
const payload = {
  'impression-type': 'app-impression',
  'ad-network-identifier': 'example.network',
  'source-identifier': '1234',
  'advertised-item-identifier': 'com.wakesharp.app',
  'conversion-type': 'download',
  'postback-identifier': '39a0f99c-9bb5-4b50-8806-14c60b546310',
  'did-win': true,
  'postback-sequence-index': 0,
};

test('Apple aggregate postbacks fail closed on signature verification', () => {
  process.env.APPLE_ADVERTISED_ITEM_IDENTIFIER = 'com.wakesharp.app';
  process.env.VERCEL_ENV = 'production';
  const jws = `${encode({ alg: 'ES256', kid: 'apple-cas-identifier/0' })}.${encode(payload)}.${Buffer.alloc(64).toString('base64url')}`;
  assert.throws(
    () => verifyApplePostback(jws),
    (error: unknown) => error instanceof ApiError && error.code === 'invalid_apple_signature',
  );
});

test('development postbacks are not accepted in production', () => {
  process.env.APPLE_ADVERTISED_ITEM_IDENTIFIER = 'com.wakesharp.app';
  process.env.VERCEL_ENV = 'production';
  process.env.ALLOW_APPLE_DEVELOPMENT_POSTBACKS = 'true';
  const jws = `${encode({ alg: 'ES256', kid: 'apple-development-identifier/0' })}.${encode(payload)}.${Buffer.alloc(64).toString('base64url')}`;
  assert.throws(
    () => verifyApplePostback(jws),
    (error: unknown) => error instanceof ApiError && error.code === 'development_postback_disabled',
  );
});

