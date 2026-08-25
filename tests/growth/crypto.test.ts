import assert from 'node:assert/strict';
import { generateKeyPairSync, sign } from 'node:crypto';
import test from 'node:test';
import {
  canonicalInstallRequest,
  importInstallPublicKey,
  newReferralCode,
  verifyInstallSignature,
} from '../../api/_lib/crypto';

test('installation requests use the documented canonical signature', () => {
  const { publicKey, privateKey } = generateKeyPairSync('ed25519');
  const der = publicKey.export({ format: 'der', type: 'spki' });
  const imported = importInstallPublicKey(Buffer.from(der).toString('base64url'));
  const message = canonicalInstallRequest('post', '/api/referrals/success', '1787695200', 'nonce_1234567890ab', '{"ok":true}');
  const signature = sign(null, Buffer.from(message), privateKey).toString('base64url');
  assert.equal(verifyInstallSignature(imported.der, message, signature), true);
  assert.equal(verifyInstallSignature(imported.der, `${message}x`, signature), false);
});

test('P-256 installation signatures use the same canonical request', () => {
  const { publicKey, privateKey } = generateKeyPairSync('ec', { namedCurve: 'prime256v1' });
  const der = publicKey.export({ format: 'der', type: 'spki' });
  const imported = importInstallPublicKey(Buffer.from(der).toString('base64url'));
  const message = canonicalInstallRequest('post', '/api/referrals/claim', '1787695200', 'nonce_1234567890ab', '{"code":"23456789AB"}');
  const signature = sign('sha256', Buffer.from(message), privateKey).toString('base64url');
  assert.equal(imported.algorithm, 'p256');
  assert.equal(verifyInstallSignature(imported.der, message, signature), true);
  assert.equal(verifyInstallSignature(imported.der, `${message}x`, signature), false);
});

test('referral codes exclude ambiguous characters and have useful collision space', () => {
  const codes = new Set(Array.from({ length: 2_000 }, () => newReferralCode()));
  assert.equal(codes.size, 2_000);
  for (const code of codes) assert.match(code, /^[23456789ABCDEFGHJKLMNPQRSTUVWXYZ]{10}$/);
});
