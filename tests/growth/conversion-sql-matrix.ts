/**
 * The 2.16 conversion matrix, written against any Postgres session whose
 * search_path reaches the referral schema (WakeSharp's
 * supabase/migrations/*_growth_referrals.sql). Not a test file on its own (the
 * growth suite runs `*.test.ts` only): `conversion-sql.test.ts` drives it
 * against a test database when GROWTH_TEST_DATABASE_URL is set.
 *
 * Every case builds its own installations, codes and claims and records their
 * ids so the runner can remove them afterwards. Nothing here prunes or reads
 * rows it did not create, so it is safe on a shared staging branch.
 */
import assert from 'node:assert/strict';
import { createHash, randomBytes, randomUUID } from 'node:crypto';
import { newReferralCode } from '../../api/_lib/crypto';
import {
  INVITER_PROGRESS_SQL,
  type InviterProgressRow,
  progressFromRow,
  REWARD_MISSION_ID,
} from '../../api/_lib/referrals';

export interface SqlSession {
  query<T extends object = Record<string, unknown>>(text: string, params?: unknown[]): Promise<T[]>;
}

export interface MatrixContext {
  /** The session every case uses. */
  sql: SqlSession;
  /** A second, independent session for the concurrency case; `sql` again where only one exists. */
  other: SqlSession;
  /** Every installation a case creates, for the runner's cleanup. */
  created: string[];
}

export interface MatrixCase {
  name: string;
  run(context: MatrixContext): Promise<void>;
}

type Platform = 'ios' | 'android';
type Store = 'app_store' | 'play_store';

const MINUTE = 60_000;
const iso = (offsetMs: number, from = Date.now()): string => new Date(from + offsetMs).toISOString();
const ref = (): Buffer => createHash('sha256').update(randomBytes(32)).digest();
const storeFor = (platform: Platform): Store => (platform === 'ios' ? 'app_store' : 'play_store');

async function install(
  context: MatrixContext,
  platform: Platform = 'ios',
  firstOpenOffsetMs = -60 * MINUTE,
): Promise<{ id: string; firstOpenAt: string }> {
  const firstOpenAt = iso(firstOpenOffsetMs);
  const rows = await context.sql.query<{ id: string }>(
    `INSERT INTO growth_anonymous_installations (
        platform, app_version, public_key_spki, public_key_hash, credential_hash,
        attestation_provider, revenuecat_app_user_id, first_open_at, claim_eligible
     ) VALUES ($1, '2.16.0-matrix', $2, $3, $4, $5, $6, $7, true)
     RETURNING id`,
    [
      platform, randomBytes(64), randomBytes(32), randomBytes(32),
      platform === 'ios' ? 'app_attest' : 'play_integrity',
      `install-matrix-${randomUUID()}`, firstOpenAt,
    ],
  );
  const id = rows[0]!.id;
  context.created.push(id);
  return { id, firstOpenAt };
}

async function codeFor(context: MatrixContext, inviterId: string): Promise<string> {
  for (let attempt = 0; attempt < 6; attempt += 1) {
    const rows = await context.sql.query<{ code: string }>(
      `INSERT INTO growth_referral_codes (inviter_installation_id, code)
       VALUES ($1, $2) ON CONFLICT DO NOTHING RETURNING code`,
      [inviterId, newReferralCode()],
    );
    if (rows[0]) return rows[0].code;
  }
  throw new Error('matrix: referral code collision limit');
}

async function claim(context: MatrixContext, refereeId: string, code: string): Promise<string> {
  const rows = await context.sql.query<{ claim_id: string }>(
    'SELECT * FROM growth_claim_referral($1, $2)',
    [refereeId, code],
  );
  return rows[0]!.claim_id;
}

/** An inviter with a code, and `count` fresh referees who claimed it. */
async function referral(context: MatrixContext, count = 1, platform: Platform = 'ios') {
  const inviter = await install(context, platform, -30 * 24 * 60 * MINUTE);
  const code = await codeFor(context, inviter.id);
  const referees: { id: string; firstOpenAt: string; claimId: string }[] = [];
  for (let index = 0; index < count; index += 1) {
    const referee = await install(context, platform);
    referees.push({ ...referee, claimId: await claim(context, referee.id, code) });
  }
  return { inviter, code, referees };
}

interface Conversion {
  kind?: 'trial' | 'paid';
  store?: Store;
  environment?: 'production' | 'sandbox';
  purchasedAt?: string;
  refHash?: Buffer | null;
  acceptSandbox?: boolean | null;
}

/** Exactly the route's call: seven arguments, p_now left to default. */
async function convert(session: SqlSession, installationId: string, conversion: Conversion = {}) {
  const rows = await session.query<{ claim_id: string; recorded: boolean }>(
    'SELECT * FROM growth_record_conversion($1, $2, $3, $4, $5, $6, $7)',
    [
      installationId,
      conversion.kind ?? 'trial',
      conversion.store ?? 'app_store',
      conversion.environment ?? 'production',
      conversion.purchasedAt ?? iso(-5 * MINUTE),
      conversion.refHash === undefined ? ref() : conversion.refHash,
      conversion.acceptSandbox === undefined ? false : conversion.acceptSandbox,
    ],
  );
  return rows[0]!;
}

async function rejects(promise: Promise<unknown>, code: string): Promise<void> {
  await assert.rejects(promise, (error: unknown) => {
    assert.ok(error instanceof Error, 'expected an Error');
    assert.match(error.message, new RegExp(code));
    return true;
  });
}

async function claimRow(context: MatrixContext, claimId: string) {
  const rows = await context.sql.query<{
    converted_at: string | null;
    conversion_kind: string | null;
    conversion_store: string | null;
    conversion_environment: string | null;
    conversion_ref_hash: Uint8Array | null;
    referred_installation_id: string | null;
  }>(
    `SELECT converted_at, conversion_kind, conversion_store, conversion_environment,
            conversion_ref_hash, referred_installation_id
       FROM growth_referral_claims WHERE id = $1`,
    [claimId],
  );
  return rows[0];
}

async function unlocks(context: MatrixContext, installationId: string) {
  return context.sql.query<{ mission_id: string; source_claim_id: string | null; unlocked_at: string }>(
    'SELECT mission_id, source_claim_id, unlocked_at::text AS unlocked_at FROM growth_mission_unlocks WHERE installation_id = $1',
    [installationId],
  );
}

async function auditCount(context: MatrixContext, installationId: string, eventType: string): Promise<number> {
  const rows = await context.sql.query<{ count: string }>(
    'SELECT count(*)::text AS count FROM growth_referral_audit WHERE installation_id = $1 AND event_type = $2',
    [installationId, eventType],
  );
  return Number(rows[0]?.count ?? 0);
}

async function progress(context: MatrixContext, installationId: string) {
  const rows = await context.sql.query<InviterProgressRow>(INVITER_PROGRESS_SQL, [installationId, REWARD_MISSION_ID]);
  return progressFromRow(rows[0]);
}

const sameBytes = (left: Uint8Array | null | undefined, right: Uint8Array): boolean =>
  !!left && Buffer.from(left).equals(Buffer.from(right));

export const MATRIX: MatrixCase[] = [
  {
    name: 'claim then convert records once and unlocks Squats for the inviter',
    async run(context) {
      const { inviter, referees: [referee] } = await referral(context);
      const hash = ref();
      const result = await convert(context.sql, referee!.id, { kind: 'trial', refHash: hash });
      assert.deepEqual(result, { claim_id: referee!.claimId, recorded: true });

      const row = await claimRow(context, referee!.claimId);
      assert.ok(row?.converted_at);
      assert.equal(row?.conversion_kind, 'trial');
      assert.equal(row?.conversion_store, 'app_store');
      assert.equal(row?.conversion_environment, 'production');
      assert.ok(sameBytes(row?.conversion_ref_hash, hash));

      const unlocked = await unlocks(context, inviter.id);
      assert.deepEqual(unlocked.map((item) => [item.mission_id, item.source_claim_id]), [['squats', referee!.claimId]]);
      assert.equal(await auditCount(context, referee!.id, 'conversion'), 1);
      assert.equal(await auditCount(context, inviter.id, 'mission_unlock'), 1);

      assert.deepEqual(await progress(context, inviter.id), {
        confirmedSignups: 0, pendingSignups: 1, squadUnlocked: false,
        convertedSignups: 1, awaitingConversion: 0, squatsUnlocked: true,
      });
      // The referee earned nothing for itself.
      assert.equal((await unlocks(context, referee!.id)).length, 0);
    },
  },
  {
    name: 'a replay answers from the claim and writes nothing',
    async run(context) {
      const { inviter, referees: [referee] } = await referral(context);
      await convert(context.sql, referee!.id, { kind: 'trial' });
      const before = await unlocks(context, inviter.id);
      const replay = await convert(context.sql, referee!.id, { kind: 'paid' });
      assert.deepEqual(replay, { claim_id: referee!.claimId, recorded: false });
      assert.equal((await claimRow(context, referee!.claimId))?.conversion_kind, 'trial');
      assert.deepEqual(await unlocks(context, inviter.id), before);
      assert.equal(await auditCount(context, referee!.id, 'conversion'), 1);
      assert.equal(await auditCount(context, inviter.id, 'mission_unlock'), 1);
    },
  },
  {
    name: 'the checks run in the contract order',
    async run(context) {
      await rejects(convert(context.sql, randomUUID()), 'installation_unavailable');
      const unclaimed = await install(context, 'ios');
      await rejects(convert(context.sql, unclaimed.id, { store: 'play_store', environment: 'sandbox' }), 'conversion_store_mismatch');
      await rejects(convert(context.sql, unclaimed.id, { environment: 'sandbox', purchasedAt: iso(-24 * 60 * MINUTE) }), 'conversion_sandbox_rejected');
      await rejects(convert(context.sql, unclaimed.id, { purchasedAt: iso(-24 * 60 * MINUTE) }), 'conversion_time_invalid');
      await rejects(convert(context.sql, unclaimed.id), 'no_referral_claim');
      assert.equal(await auditCount(context, unclaimed.id, 'conversion'), 0);

      const android = await install(context, 'android');
      await rejects(convert(context.sql, android.id, { store: 'app_store' }), 'conversion_store_mismatch');
      await rejects(convert(context.sql, android.id, { store: 'play_store' }), 'no_referral_claim');
    },
  },
  {
    name: 'sandbox counts only while the server accepts it, and a missing flag refuses',
    async run(context) {
      const { referees: [first, second] } = await referral(context, 2);
      await rejects(convert(context.sql, first!.id, { environment: 'sandbox', acceptSandbox: false }), 'conversion_sandbox_rejected');
      await rejects(convert(context.sql, first!.id, { environment: 'sandbox', acceptSandbox: null }), 'conversion_sandbox_rejected');
      assert.equal((await claimRow(context, first!.claimId))?.converted_at, null);
      const accepted = await convert(context.sql, second!.id, { environment: 'sandbox', acceptSandbox: true });
      assert.equal(accepted.recorded, true);
      assert.equal((await claimRow(context, second!.claimId))?.conversion_environment, 'sandbox');
    },
  },
  {
    name: 'the purchase must fall between first open minus ten minutes and now plus ten',
    async run(context) {
      const { referees: [early, late, edge] } = await referral(context, 3);
      const floor = Date.parse(early!.firstOpenAt) - 10 * MINUTE;
      await rejects(convert(context.sql, early!.id, { purchasedAt: iso(-60_000, floor) }), 'conversion_time_invalid');
      await rejects(convert(context.sql, late!.id, { purchasedAt: iso(15 * MINUTE) }), 'conversion_time_invalid');
      const atFloor = Date.parse(edge!.firstOpenAt) - 9 * MINUTE;
      assert.equal((await convert(context.sql, edge!.id, { purchasedAt: iso(0, atFloor) })).recorded, true);
      assert.equal((await convert(context.sql, late!.id, { purchasedAt: iso(5 * MINUTE) })).recorded, true);
    },
  },
  {
    name: 'one purchase converts at most one claim; claims without a reference never collide',
    async run(context) {
      const first = await referral(context);
      const second = await referral(context);
      const hash = ref();
      assert.equal((await convert(context.sql, first.referees[0]!.id, { refHash: hash })).recorded, true);
      await rejects(convert(context.sql, second.referees[0]!.id, { refHash: hash }), 'purchase_already_counted');
      assert.equal((await claimRow(context, second.referees[0]!.claimId))?.converted_at, null);
      assert.equal((await unlocks(context, second.inviter.id)).length, 0);

      const third = await referral(context, 2);
      for (const referee of third.referees) {
        assert.equal((await convert(context.sql, referee.id, { refHash: null })).recorded, true);
      }
    },
  },
  {
    name: 'a revoked inviter gets no unlock, and the conversion still records',
    async run(context) {
      const { inviter, referees: [referee] } = await referral(context);
      await context.sql.query('SELECT growth_delete_installation($1)', [inviter.id]);
      assert.equal((await convert(context.sql, referee!.id)).recorded, true);
      assert.equal((await unlocks(context, inviter.id)).length, 0);
      assert.equal(await auditCount(context, inviter.id, 'mission_unlock'), 0);
    },
  },
  {
    name: 'two referees of one inviter converting at once yield exactly one unlock',
    async run(context) {
      const { inviter, referees } = await referral(context, 2);
      const results = await Promise.all([
        convert(context.sql, referees[0]!.id),
        convert(context.other, referees[1]!.id),
      ]);
      assert.deepEqual(results.map((item) => item.recorded), [true, true]);
      const unlocked = await unlocks(context, inviter.id);
      assert.equal(unlocked.length, 1);
      assert.ok(referees.some((referee) => referee.claimId === unlocked[0]!.source_claim_id));
      assert.equal(await auditCount(context, inviter.id, 'mission_unlock'), 1);
      assert.equal((await progress(context, inviter.id)).convertedSignups, 2);
    },
  },
  {
    name: 'a referee deleting itself clears the purchase reference and keeps the inviter\'s unlock',
    async run(context) {
      const { inviter, referees: [referee, waiting] } = await referral(context, 2);
      await convert(context.sql, referee!.id);
      await context.sql.query('SELECT growth_delete_installation($1)', [referee!.id]);
      const row = await claimRow(context, referee!.claimId);
      assert.equal(row?.conversion_ref_hash, null);
      assert.ok(row?.converted_at);
      assert.equal(row?.conversion_kind, 'trial');
      assert.equal((await unlocks(context, inviter.id)).length, 1);
      // Revoked referees stop counting as awaiting; converted ones count forever.
      await context.sql.query('SELECT growth_delete_installation($1)', [waiting!.id]);
      const after = await progress(context, inviter.id);
      assert.equal(after.convertedSignups, 1);
      assert.equal(after.awaitingConversion, 0);
      assert.equal(after.squatsUnlocked, true);
      await rejects(convert(context.sql, referee!.id), 'installation_unavailable');
    },
  },
  {
    name: 'an inviter deleting itself drops its own unlock',
    async run(context) {
      const { inviter, referees: [referee] } = await referral(context);
      await convert(context.sql, referee!.id);
      assert.equal((await unlocks(context, inviter.id)).length, 1);
      await context.sql.query('SELECT growth_delete_installation($1)', [inviter.id]);
      assert.equal((await unlocks(context, inviter.id)).length, 0);
      assert.ok((await claimRow(context, referee!.claimId))?.converted_at);
    },
  },
  {
    name: 'retention keeps an inviter holding an unlock and detaches a pruned referee',
    async run(context) {
      const { inviter, referees: [referee] } = await referral(context);
      await convert(context.sql, referee!.id);
      const bystander = await install(context, 'android');
      // Age only this case's rows into a window no other row can be in, then
      // prune at an instant inside it, so a shared branch loses nothing else.
      await context.sql.query(
        `UPDATE growth_anonymous_installations
            SET created_at = '1999-01-01T00:00:00Z', expires_at = '2000-01-01T00:00:00Z'
          WHERE id = ANY($1::uuid[])`,
        [[inviter.id, referee!.id, bystander.id]],
      );
      await context.sql.query("SELECT * FROM growth_prune_expired('2000-06-01T00:00:00Z')");
      const remaining = await context.sql.query<{ id: string }>(
        'SELECT id FROM growth_anonymous_installations WHERE id = ANY($1::uuid[])',
        [[inviter.id, referee!.id, bystander.id]],
      );
      assert.deepEqual(remaining.map((row) => row.id), [inviter.id]);
      const row = await claimRow(context, referee!.claimId);
      assert.equal(row?.referred_installation_id, null);
      assert.ok(row?.converted_at);
      const after = await progress(context, inviter.id);
      assert.equal(after.convertedSignups, 1);
      assert.equal(after.awaitingConversion, 0);
      assert.equal(after.squatsUnlocked, true);
    },
  },
  {
    name: 'the conversion columns are all or nothing, and only Squats can be unlocked',
    async run(context) {
      const { inviter, referees: [referee] } = await referral(context);
      await rejects(
        context.sql.query('UPDATE growth_referral_claims SET converted_at = now() WHERE id = $1', [referee!.claimId]),
        'growth_claims_conversion_whole',
      );
      await rejects(
        context.sql.query('UPDATE growth_referral_claims SET conversion_ref_hash = $2 WHERE id = $1', [referee!.claimId, ref()]),
        'growth_claims_conversion_whole',
      );
      await rejects(
        context.sql.query("INSERT INTO growth_mission_unlocks (installation_id, mission_id) VALUES ($1, 'walk_it_off')", [inviter.id]),
        'growth_mission_unlocks_mission_id_check',
      );
      // An Android referee converts through Play only.
      const play = await referral(context, 1, 'android');
      assert.equal((await convert(context.sql, play.referees[0]!.id, { store: storeFor('android'), kind: 'paid' })).recorded, true);
    },
  },
];

/** Removes everything the matrix created. The audit trail is append-only outside retention mode. */
export const CLEANUP_STATEMENTS = [
  "SELECT set_config('wakesharp.retention_mode', 'on', true)",
  'DELETE FROM growth_referral_audit WHERE installation_id = ANY($1::uuid[])',
  'DELETE FROM growth_anonymous_installations WHERE id = ANY($1::uuid[])',
] as const;
