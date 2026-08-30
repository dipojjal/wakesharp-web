import { neon, type NeonQueryFunction } from '@neondatabase/serverless';
import { ApiError } from './http.js';

let cached: NeonQueryFunction<false, false> | undefined;

export function database(): NeonQueryFunction<false, false> {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new ApiError(503, 'referrals_not_configured');
  cached ??= neon(connectionString);
  return cached;
}

export async function query<T extends object = Record<string, unknown>>(
  text: string,
  params: unknown[] = [],
): Promise<T[]> {
  return (await database().query(text, params)) as T[];
}
