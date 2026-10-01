import assert from 'node:assert/strict';
import { X509Certificate } from 'node:crypto';
import { rootCertificates } from 'node:tls';
import test from 'node:test';
import { certificatesIn, database, tlsOptions, withoutSslMode } from '../../api/_lib/db';
import { ApiError, safeErrorCode } from '../../api/_lib/http';
import { SUPABASE_ROOT_2021_CA } from '../../api/_lib/supabase-root-ca';

/** prod-ca-2021.crt as Supabase publishes it, and as the pooler presents it. */
const SUPABASE_ROOT_SHA256 =
  '80:70:25:AD:50:D4:ED:21:9D:2C:9C:7D:29:9C:00:4F:82:4E:B0:0C:F7:F6:5A:FE:F6:07:D0:7B:72:E6:CA:FA';

function withCaCert(value: string | undefined, body: () => void): void {
  const saved = process.env.DATABASE_CA_CERT;
  const warn = console.warn;
  console.warn = () => {};
  try {
    if (value === undefined) delete process.env.DATABASE_CA_CERT;
    else process.env.DATABASE_CA_CERT = value;
    body();
  } finally {
    console.warn = warn;
    if (saved === undefined) delete process.env.DATABASE_CA_CERT;
    else process.env.DATABASE_CA_CERT = saved;
  }
}

const fingerprint = (pem: string): string => new X509Certificate(pem).fingerprint256;

/** The ways a paste into a dashboard field has mangled a PEM. */
const mangled = (pem: string): string[] => [
  `\n${pem}\n`,
  pem.replace(/\n/g, ' '),
  pem.replace(/\n/g, '\\n'),
  pem.replace(/\n/g, '\r\n'),
];

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

test('the bundled root is Supabase Root 2021 CA, a CA certificate', () => {
  const root = new X509Certificate(SUPABASE_ROOT_2021_CA);
  assert.equal(root.fingerprint256, SUPABASE_ROOT_SHA256);
  assert.match(root.subject, /CN=Supabase Root 2021 CA/);
  assert.equal(root.ca, true);
});

test('TLS is always verified, trusting the bundled Supabase root with no configuration', () => {
  withCaCert(undefined, () => {
    assert.deepEqual(tlsOptions(), { ca: [SUPABASE_ROOT_2021_CA, ...rootCertificates], rejectUnauthorized: true });
  });
});

test('a DATABASE_CA_CERT holding the bundled root, however it was pasted, adds nothing', () => {
  for (const value of mangled(SUPABASE_ROOT_2021_CA)) {
    withCaCert(value, () => {
      const options = tlsOptions();
      assert.equal(options.rejectUnauthorized, true);
      assert.deepEqual(options.ca, [SUPABASE_ROOT_2021_CA, ...rootCertificates]);
    });
  }
});

test('a further root in DATABASE_CA_CERT is rebuilt from any mangled paste and trusted', () => {
  const successor = rootCertificates[0];
  for (const value of mangled(successor.trim())) {
    withCaCert(value, () => {
      const options = tlsOptions();
      assert.equal(options.ca[0], SUPABASE_ROOT_2021_CA);
      assert.equal(fingerprint(options.ca[1]), fingerprint(successor));
      assert.equal(options.ca.length, rootCertificates.length + 2);
    });
  }
});

test('a DATABASE_CA_CERT that is not a certificate is dropped, and TLS stays verified', () => {
  for (const value of ['', 'not a pem', '-----BEGIN CERTIFICATE-----\nSUPABASE\n-----END CERTIFICATE-----']) {
    withCaCert(value, () => {
      assert.deepEqual(tlsOptions(), { ca: [SUPABASE_ROOT_2021_CA, ...rootCertificates], rejectUnauthorized: true });
    });
  }
  assert.deepEqual(certificatesIn(undefined), []);
});

test('only a machine error code is ever logged, never a message', () => {
  assert.equal(safeErrorCode(Object.assign(new Error('self-signed certificate in certificate chain'), { code: 'SELF_SIGNED_CERT_IN_CHAIN' })), 'SELF_SIGNED_CERT_IN_CHAIN');
  assert.equal(safeErrorCode(Object.assign(new Error('password authentication failed for user "referrals_api"'), { code: '28P01' })), '28P01');
  assert.equal(safeErrorCode(Object.assign(new Error('x'), { code: 'tenant/user referrals_api not found' })), '-');
  assert.equal(safeErrorCode(Object.assign(new Error('x'), { code: 42 })), '-');
  assert.equal(safeErrorCode(new Error('no code')), '-');
  assert.equal(safeErrorCode(null), '-');
});

test('a URL\'s sslmode can never replace the verified TLS options', () => {
  const pooled = 'postgresql://referrals_api.ref:secret@aws-0-us-east-1.pooler.supabase.com:6543/postgres';
  assert.equal(withoutSslMode(`${pooled}?sslmode=disable`), pooled);
  assert.equal(withoutSslMode(`${pooled}?sslmode=require&application_name=referrals`),
    `${pooled}?application_name=referrals`);
  assert.equal(withoutSslMode(pooled), pooled);
});
