import { X509Certificate } from 'node:crypto';
import { rootCertificates } from 'node:tls';
import pg from 'pg';
import { ApiError } from './http.js';
import { SUPABASE_ROOT_2021_CA } from './supabase-root-ca.js';

/**
 * The referral programme's database: the WakeSharp Supabase project, reached
 * as its own `referrals_api` role through the transaction pooler (port 6543).
 * The role's default search_path is the private `growth` schema, so the
 * routes' SQL names its tables unqualified. The schema itself is a migration
 * in the WakeSharp repo (supabase/migrations/*_growth_referrals.sql).
 *
 * One connection per function instance: the pooler multiplexes, and a
 * serverless instance never has two queries in flight worth a second socket.
 */
let pool: pg.Pool | undefined;

export function database(): pg.Pool {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new ApiError(503, 'referrals_not_configured');
  pool ??= new pg.Pool({
    connectionString: withoutSslMode(connectionString),
    ssl: tlsOptions(),
    max: 1,
    idleTimeoutMillis: 10_000,
    connectionTimeoutMillis: 5_000,
  });
  return pool;
}

export async function query<T extends object = Record<string, unknown>>(
  text: string,
  params: unknown[] = [],
): Promise<T[]> {
  return (await database().query(text, params)).rows as T[];
}

/**
 * Always verified TLS, never downgraded. The pooler's certificate chains to
 * Supabase's own root, which is bundled, so the public roots alone would
 * refuse it. `DATABASE_CA_CERT` adds any further roots (a successor Supabase
 * root before it is bundled), and is optional.
 */
export function tlsOptions(): { ca: string[]; rejectUnauthorized: true } {
  const configured = process.env.DATABASE_CA_CERT;
  const extra = certificatesIn(configured);
  if (configured?.trim() && extra.length === 0) {
    console.warn('[growth-api] DATABASE_CA_CERT holds no certificate that parses; using the bundled Supabase root');
  }
  return {
    ca: [SUPABASE_ROOT_2021_CA, ...extra.filter((pem) => pem !== SUPABASE_ROOT_2021_CA), ...rootCertificates],
    rejectUnauthorized: true,
  };
}

/**
 * The certificates in a PEM value, rebuilt so one whose line breaks a paste
 * turned into spaces, CRLFs or literal `\n` still parses. Anything that does
 * not parse as a certificate is dropped: Node would ignore it silently anyway.
 */
export function certificatesIn(value: string | undefined): string[] {
  if (!value) return [];
  const pems: string[] = [];
  const blocks = value.replace(/\\n/g, '\n').matchAll(/-----BEGIN CERTIFICATE-----([\s\S]*?)-----END CERTIFICATE-----/g);
  for (const [, body] of blocks) {
    const base64 = body.replace(/\s+/g, '');
    if (!base64) continue;
    const pem = `-----BEGIN CERTIFICATE-----\n${base64.match(/.{1,64}/g)!.join('\n')}\n-----END CERTIFICATE-----`;
    try {
      new X509Certificate(pem);
    } catch {
      continue;
    }
    pems.push(pem);
  }
  return pems;
}

/** node-postgres lets a URL's `sslmode` replace the `ssl` object above; it never may. */
export function withoutSslMode(connectionString: string): string {
  const url = new URL(connectionString);
  url.searchParams.delete('sslmode');
  return url.toString();
}
