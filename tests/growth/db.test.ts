import assert from 'node:assert/strict';
import { rootCertificates } from 'node:tls';
import test from 'node:test';
import { database, tlsOptions, withoutSslMode } from '../../api/_lib/db';
import { ApiError } from '../../api/_lib/http';

const PEM = '-----BEGIN CERTIFICATE-----\nSUPABASE\n-----END CERTIFICATE-----';

test('no DATABASE_URL is referrals_not_configured, before any connection', () => {
  const saved = process.env.DATABASE_URL;
  delete process.env.DATABASE_URL;
  try {
    assert.throws(() => database(), (error: unknown) =>
      error instanceof ApiError && error.status === 503 && error.code === 'referrals_not_configured');
  } finally {
    if (saved !== undefined) process.env.DATABASE_URL = saved;
  }
});

test('TLS is always verified, with Supabase\'s root trusted alongside the public ones', () => {
  const saved = process.env.DATABASE_CA_CERT;
  try {
    delete process.env.DATABASE_CA_CERT;
    assert.deepEqual(tlsOptions(), { ca: [...rootCertificates], rejectUnauthorized: true });
    process.env.DATABASE_CA_CERT = `\n${PEM}\n`;
    const options = tlsOptions();
    assert.equal(options.rejectUnauthorized, true);
    assert.equal(options.ca[0], PEM);
    assert.equal(options.ca.length, rootCertificates.length + 1);
  } finally {
    if (saved === undefined) delete process.env.DATABASE_CA_CERT;
    else process.env.DATABASE_CA_CERT = saved;
  }
});

test('a URL\'s sslmode can never replace the verified TLS options', () => {
  const pooled = 'postgresql://referrals_api.ref:secret@aws-0-us-east-1.pooler.supabase.com:6543/postgres';
  assert.equal(withoutSslMode(`${pooled}?sslmode=disable`), pooled);
  assert.equal(withoutSslMode(`${pooled}?sslmode=require&application_name=referrals`),
    `${pooled}?application_name=referrals`);
  assert.equal(withoutSslMode(pooled), pooled);
});
