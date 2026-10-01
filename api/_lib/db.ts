import { rootCertificates } from 'node:tls';
import pg from 'pg';
import { ApiError } from './http.js';

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
 * Always verified TLS. The pooler's certificate may chain to Supabase's own
 * root rather than a public one, so `DATABASE_CA_CERT` (the PEM from the
 * dashboard, Database settings > SSL) is trusted alongside the public roots
 * when it is set. It is never downgraded to an unverified connection.
 */
export function tlsOptions(): { ca: string[]; rejectUnauthorized: true } {
  const supabaseRoot = process.env.DATABASE_CA_CERT?.trim();
  return {
    ca: supabaseRoot ? [supabaseRoot, ...rootCertificates] : [...rootCertificates],
    rejectUnauthorized: true,
  };
}

/** node-postgres lets a URL's `sslmode` replace the `ssl` object above; it never may. */
export function withoutSslMode(connectionString: string): string {
  const url = new URL(connectionString);
  url.searchParams.delete('sslmode');
  return url.toString();
}
