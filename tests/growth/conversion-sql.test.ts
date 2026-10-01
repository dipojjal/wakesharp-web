import test from 'node:test';
import { CLEANUP_STATEMENTS, MATRIX, type SqlSession } from './conversion-sql-matrix';

/**
 * The 2.16 conversion SQL matrix against a real database, skipped unless
 * GROWTH_TEST_DATABASE_URL names one: a Neon branch with 001, 002 and 003
 * applied, never production. It refuses to run when that URL is the same as
 * DATABASE_URL. Every row it creates is deleted afterwards.
 *
 *   GROWTH_TEST_DATABASE_URL=postgres://... npm run growth:test
 */
const url = process.env.GROWTH_TEST_DATABASE_URL;
const skip = !url
  ? 'GROWTH_TEST_DATABASE_URL is not set'
  : url === process.env.DATABASE_URL
    ? 'GROWTH_TEST_DATABASE_URL must not be DATABASE_URL'
    : false;

test('conversion SQL matrix (Neon branch)', { skip }, async (t) => {
  const { Pool } = await import('@neondatabase/serverless');
  const pool = new Pool({ connectionString: url });
  const primary = await pool.connect();
  const secondary = await pool.connect();
  const session = (client: typeof primary): SqlSession => ({
    async query<T extends object>(text: string, params: unknown[] = []) {
      return (await client.query(text, params)).rows as T[];
    },
  });
  const created: string[] = [];
  const context = { sql: session(primary), other: session(secondary), created };
  try {
    const applied = await context.sql.query<{ table: string | null }>(
      "SELECT to_regclass('public.growth_mission_unlocks')::text AS table",
    );
    if (!applied[0]?.table) throw new Error('apply db/migrations 001, 002 and 003 to this branch first');
    for (const item of MATRIX) await t.test(item.name, () => item.run(context));
  } finally {
    if (created.length) {
      await primary.query('BEGIN');
      for (const statement of CLEANUP_STATEMENTS) {
        await primary.query(statement, statement.includes('$1') ? [created] : []);
      }
      await primary.query('COMMIT');
    }
    primary.release();
    secondary.release();
    await pool.end();
  }
});
