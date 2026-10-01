/**
 * Checks a DATABASE_URL exactly as production uses it (api/_lib/db.ts: the
 * bundled Supabase root, sslmode stripped), without printing the URL or its
 * password:
 *
 *   DATABASE_URL='postgresql://…' npx tsx scripts/check-referrals-db.ts
 *
 * Prints the host and user it read, then either the role and schema it
 * reached or the error code (see docs/growth-referrals.md, "When a database
 * route answers internal_error"). Run it before setting the URL in Vercel.
 */
import { query } from '../api/_lib/db';
import { safeErrorCode } from '../api/_lib/http';

const PROJECT_REF = 'ltwchaijzcvncxzexdnk';
const POOLER_HOST = 'aws-0-us-east-1.pooler.supabase.com';

const raw = process.env.DATABASE_URL;
if (!raw) {
  console.error('DATABASE_URL is not set in this shell.');
  process.exit(2);
}

let url: URL;
try {
  url = new URL(raw);
} catch {
  console.error('DATABASE_URL does not parse as a URL. A password with @ # / ? : must be percent-encoded.');
  process.exit(2);
}

const user = decodeURIComponent(url.username);
console.log(`host ${url.hostname}, port ${url.port || '5432'}, user ${user}, password ${url.password ? 'present' : 'MISSING'}`);
if (url.hostname.endsWith('.supabase.co')) {
  console.log(`  ✗ ${url.hostname} is IPv6 only and Vercel cannot reach it (ENOTFOUND). Use ${POOLER_HOST}.`);
} else if (url.hostname !== POOLER_HOST) {
  console.log(`  ✗ expected the transaction pooler ${POOLER_HOST}.`);
}
if (url.port !== '6543') console.log('  ✗ expected port 6543 (transaction pooler).');
if (user !== `referrals_api.${PROJECT_REF}`) console.log(`  ✗ expected user referrals_api.${PROJECT_REF}.`);

try {
  const [who] = await query<{ role: string; path: string }>(
    "SELECT current_user AS role, current_setting('search_path') AS path",
  );
  const [claims] = await query<{ count: string }>('SELECT count(*)::text AS count FROM growth_referral_claims');
  console.log(`✓ connected as ${who.role}, search_path ${who.path}, growth_referral_claims rows: ${claims.count}`);
  process.exit(0);
} catch (error) {
  console.error(`✗ failed: ${error instanceof Error ? error.name : 'unknown'}, code ${safeErrorCode(error)}`);
  process.exit(1);
}
