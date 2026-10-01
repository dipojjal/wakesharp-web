-- WakeSharp 2.16 referral conversions, applied after 001 and 002. Nothing here
-- enables the API: every route still answers 503 until REFERRALS_API_ENABLED=true.
--
-- The 2.16 mechanic: one referred friend who starts any trial or paid plan
-- unlocks the Squats mission for the person who invited them, permanently.
-- It sits beside the 2.13 mechanic rather than replacing it: the twenty-referral
-- Wake Squad path (growth_evaluate_claim_confirmation, growth_squad_unlocks)
-- stays compiled and dormant, fed only by pre-2.16 builds whose PostHog flag
-- is off.
--
-- The referee's attested, signed installation reports its own purchase through
-- POST /api/referrals/converted. What is stored is the minimum that makes the
-- reward safe to grant: when, trial or paid, which store, which environment,
-- and a keyed HMAC of an opaque purchase reference so one purchase can convert
-- at most one claim. No product id, transaction id, price or RevenueCat id is
-- ever stored.
--
-- Privileges follow 001 and 002: no GRANT or REVOKE, the API connects as the
-- role that owns these objects (DATABASE_URL), and every function is SECURITY
-- DEFINER with search_path pinned.
--
-- Not re-runnable by design: applying it twice fails on the first ALTER and
-- the transaction rolls back, changing nothing.
BEGIN;

-- ---------- conversion state on the claim ----------
--
-- All or nothing: a claim is either unconverted (every field NULL) or
-- converted with its time, kind, store and environment. The purchase
-- reference stays optional on a converted claim, because the client may not
-- have one and because deleting the referee's installation clears it.
ALTER TABLE growth_referral_claims
    ADD COLUMN converted_at timestamptz,
    ADD COLUMN conversion_kind text CHECK (conversion_kind IN ('trial', 'paid')),
    ADD COLUMN conversion_store text CHECK (conversion_store IN ('app_store', 'play_store')),
    ADD COLUMN conversion_environment text CHECK (conversion_environment IN ('production', 'sandbox')),
    ADD COLUMN conversion_ref_hash bytea CHECK (conversion_ref_hash IS NULL OR octet_length(conversion_ref_hash) = 32),
    ADD CONSTRAINT growth_claims_conversion_whole CHECK (
        (converted_at IS NULL
            AND conversion_kind IS NULL
            AND conversion_store IS NULL
            AND conversion_environment IS NULL
            AND conversion_ref_hash IS NULL)
        OR (converted_at IS NOT NULL
            AND conversion_kind IS NOT NULL
            AND conversion_store IS NOT NULL
            AND conversion_environment IS NOT NULL)
    );

-- One purchase converts at most one claim. Partial, so the many claims that
-- carry no reference never collide with each other.
CREATE UNIQUE INDEX growth_claims_conversion_ref_idx
    ON growth_referral_claims (conversion_ref_hash)
    WHERE conversion_ref_hash IS NOT NULL;

-- /status lists an inviter's claims newest first (LIMIT 50); 001 indexed only
-- the confirmed ones.
CREATE INDEX growth_claims_inviter_time_idx
    ON growth_referral_claims (inviter_installation_id, claimed_at DESC);

CREATE INDEX growth_claims_inviter_converted_idx
    ON growth_referral_claims (inviter_installation_id)
    WHERE converted_at IS NOT NULL;

-- ---------- the reward ----------
--
-- The only durable artefact of a conversion. Monotonic: a row is written once
-- and never deleted while its installation lives, so a refund, the referee's
-- deletion or the referee's retention pruning cannot take the unlock back.
-- The CHECK is the whole catalogue of missions a referral can unlock.
CREATE TABLE growth_mission_unlocks (
    installation_id uuid NOT NULL REFERENCES growth_anonymous_installations(id) ON DELETE CASCADE,
    mission_id text NOT NULL CHECK (mission_id IN ('squats')),
    unlocked_at timestamptz NOT NULL DEFAULT now(),
    source_claim_id uuid REFERENCES growth_referral_claims(id) ON DELETE SET NULL,
    PRIMARY KEY (installation_id, mission_id)
);

-- Records that the referred installation started a trial or a paid plan, and
-- unlocks Squats for its inviter. The checks run in a fixed order and each
-- raises the error code the route maps to its HTTP answer:
--
--   installation_unavailable     the caller is revoked or gone (401)
--   conversion_store_mismatch    ios <-> app_store, android <-> play_store (409)
--   conversion_sandbox_rejected  sandbox while the server refuses it (409)
--   conversion_time_invalid      outside [first_open_at - 10 min, now + 10 min] (409)
--   no_referral_claim            this installation was never referred (409)
--   purchase_already_counted     the purchase reference converted another claim (409)
--
-- p_now must default to the database's now(): the route passes exactly seven
-- arguments, as it does for growth_record_success, so the ceiling never
-- compares a client timestamp against itself.
--
-- The floor is first_open_at, which the client supplies at registration. That
-- is acceptable here where it was not for the three mornings: a claim only
-- exists within 24 hours of first_open_at, so backdating it past a day makes
-- the claim impossible, and the reward saturates at one unlock per inviter.
-- What the floor excludes is restores, renewals of an older subscription and
-- lifetime purchases made before this installation existed.
CREATE OR REPLACE FUNCTION growth_record_conversion(
    p_installation_id uuid,
    p_kind text,
    p_store text,
    p_environment text,
    p_purchased_at timestamptz,
    p_ref_hash bytea,
    p_accept_sandbox boolean,
    p_now timestamptz DEFAULT now()
)
RETURNS TABLE (claim_id uuid, recorded boolean)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
    v_install growth_anonymous_installations%ROWTYPE;
    v_claim growth_referral_claims%ROWTYPE;
    v_unlocked boolean := false;
BEGIN
    SELECT * INTO v_install
    FROM growth_anonymous_installations
    WHERE id = p_installation_id AND revoked_at IS NULL
    FOR UPDATE;
    IF NOT FOUND THEN RAISE EXCEPTION 'installation_unavailable'; END IF;

    -- Parenthesized: PL/pgSQL would otherwise end the IF condition at the
    -- CASE's first THEN.
    IF p_store IS DISTINCT FROM (CASE v_install.platform
                                     WHEN 'ios' THEN 'app_store'
                                     WHEN 'android' THEN 'play_store'
                                 END) THEN
        RAISE EXCEPTION 'conversion_store_mismatch';
    END IF;

    -- IS NOT TRUE, so a missing flag refuses sandbox rather than admitting it.
    IF p_environment = 'sandbox' AND p_accept_sandbox IS NOT TRUE THEN
        RAISE EXCEPTION 'conversion_sandbox_rejected';
    END IF;

    IF p_purchased_at IS NULL
       OR p_purchased_at < v_install.first_open_at - interval '10 minutes'
       OR p_purchased_at > p_now + interval '10 minutes' THEN
        RAISE EXCEPTION 'conversion_time_invalid';
    END IF;

    SELECT * INTO v_claim
    FROM growth_referral_claims
    WHERE referred_installation_id = p_installation_id
    FOR UPDATE;
    IF NOT FOUND THEN RAISE EXCEPTION 'no_referral_claim'; END IF;

    -- A replay answers from the claim and writes nothing: no update, no unlock
    -- attempt, no audit row.
    IF v_claim.converted_at IS NOT NULL THEN
        RETURN QUERY SELECT v_claim.id, false;
        RETURN;
    END IF;

    BEGIN
        UPDATE growth_referral_claims
        SET converted_at = p_now,
            conversion_kind = p_kind,
            conversion_store = p_store,
            conversion_environment = p_environment,
            conversion_ref_hash = p_ref_hash
        WHERE id = v_claim.id;
    EXCEPTION WHEN unique_violation THEN
        RAISE EXCEPTION 'purchase_already_counted';
    END;

    -- Lock the inviter before writing their unlock, so a concurrent deletion
    -- of the inviter is seen either wholly before or wholly after. Two
    -- referees of one inviter converting at once still yield one row: the
    -- primary key and ON CONFLICT DO NOTHING see to that. A revoked inviter
    -- gets nothing, because nobody can ever read it back.
    PERFORM 1 FROM growth_anonymous_installations
    WHERE id = v_claim.inviter_installation_id AND revoked_at IS NULL
    FOR UPDATE;
    IF FOUND THEN
        INSERT INTO growth_mission_unlocks (installation_id, mission_id, unlocked_at, source_claim_id)
        VALUES (v_claim.inviter_installation_id, 'squats', p_now, v_claim.id)
        ON CONFLICT (installation_id, mission_id) DO NOTHING;
        v_unlocked := FOUND;
    END IF;

    -- Live rows only: a revoked installation is anonymized and must keep
    -- ageing out on the clock growth_delete_installation set.
    UPDATE growth_anonymous_installations
    SET last_activity_at = p_now, expires_at = p_now + interval '180 days'
    WHERE id IN (p_installation_id, v_claim.inviter_installation_id)
      AND revoked_at IS NULL;

    INSERT INTO growth_referral_audit (installation_id, claim_id, event_type, outcome, details)
    VALUES (p_installation_id, v_claim.id, 'conversion', 'recorded',
            jsonb_build_object('kind', p_kind, 'store', p_store, 'environment', p_environment));

    IF v_unlocked THEN
        INSERT INTO growth_referral_audit (installation_id, claim_id, event_type, outcome, details)
        VALUES (v_claim.inviter_installation_id, v_claim.id, 'mission_unlock', 'unlocked',
                jsonb_build_object('mission_id', 'squats'));
    END IF;

    RETURN QUERY SELECT v_claim.id, true;
END;
$$;

-- Same as 001, plus one guard: an installation holding a mission unlock is
-- never pruned either, for the same reason as a squad unlock. The unlock
-- cascades from the installation row, so an inviter who earned Squats and then
-- did not open the app for 180 days would otherwise be silently relocked.
CREATE OR REPLACE FUNCTION growth_prune_expired(p_now timestamptz DEFAULT now())
RETURNS TABLE (nonces_deleted bigint, installations_deleted bigint, audit_deleted bigint)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
    v_nonces bigint;
    v_installations bigint;
    v_audit bigint;
BEGIN
    DELETE FROM growth_request_nonces WHERE expires_at < p_now;
    GET DIAGNOSTICS v_nonces = ROW_COUNT;

    DELETE FROM growth_attestation_challenges
    WHERE expires_at < p_now OR consumed_at < p_now - interval '1 hour';

    -- A confirmed or converted claim outlives its referred installation on
    -- purpose (referred_installation_id is ON DELETE SET NULL), so pruning a
    -- dormant referee never takes an inviter's earned progress back down.
    --
    -- The inviter side needs an explicit guard instead, because their claims and
    -- their unlocks all cascade from this row. The row is anonymous either way,
    -- so keeping it costs nothing anyone can read.
    DELETE FROM growth_anonymous_installations
    WHERE expires_at < p_now
      AND NOT EXISTS (
          SELECT 1 FROM growth_squad_unlocks u
          WHERE u.installation_id = growth_anonymous_installations.id
      )
      AND NOT EXISTS (
          SELECT 1 FROM growth_mission_unlocks m
          WHERE m.installation_id = growth_anonymous_installations.id
      );
    GET DIAGNOSTICS v_installations = ROW_COUNT;

    PERFORM set_config('wakesharp.retention_mode', 'on', true);
    DELETE FROM growth_referral_audit WHERE occurred_at < p_now - interval '180 days';
    GET DIAGNOSTICS v_audit = ROW_COUNT;

    RETURN QUERY SELECT v_nonces, v_installations, v_audit;
END;
$$;

-- Same as 001, plus two statements.
--
-- As the referee: the purchase reference on this installation's claim is
-- cleared. The conversion itself (time, kind, store, environment) stays, and
-- so does the inviter's unlock: they earned it before this person asked to
-- leave, and the reward is permanent. Clearing the reference reopens nothing,
-- because a reinstall is a new installation whose first open is later than the
-- original purchase, so conversion_time_invalid refuses that purchase.
--
-- As the inviter: this installation's own mission unlock goes. Once revoked it
-- can never authenticate again, so nothing can read the unlock, and keeping it
-- would exempt the anonymized row from retention forever.
CREATE OR REPLACE FUNCTION growth_delete_installation(
    p_installation_id uuid,
    p_now timestamptz DEFAULT now()
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
    v_exists boolean;
BEGIN
    SELECT true INTO v_exists
    FROM growth_anonymous_installations
    WHERE id = p_installation_id AND revoked_at IS NULL
    FOR UPDATE;
    IF NOT FOUND THEN RETURN false; END IF;

    INSERT INTO growth_referral_audit (installation_id, event_type, outcome)
    VALUES (p_installation_id, 'delete_installation', 'anonymized');

    -- Assertions go, so an unconfirmed claim can never confirm after deletion.
    -- An already-confirmed one keeps its confirmed_at: the inviter earned it
    -- before this person asked to leave, and revoking it would punish a third
    -- party for someone else's deletion.
    DELETE FROM growth_successful_day_assertions WHERE installation_id = p_installation_id;
    DELETE FROM growth_request_nonces WHERE installation_id = p_installation_id;
    UPDATE growth_referral_codes SET revoked_at = p_now WHERE inviter_installation_id = p_installation_id;
    UPDATE growth_referral_claims SET conversion_ref_hash = NULL WHERE referred_installation_id = p_installation_id;
    DELETE FROM growth_mission_unlocks WHERE installation_id = p_installation_id;

    UPDATE growth_anonymous_installations
    SET country = NULL,
        app_version = 'deleted',
        public_key_spki = gen_random_bytes(32),
        public_key_hash = gen_random_bytes(32),
        credential_hash = gen_random_bytes(32),
        attestation_key_hash = NULL,
        revenuecat_app_user_id = 'deleted-' || id::text,
        last_activity_at = p_now,
        expires_at = p_now + interval '180 days',
        revoked_at = p_now
    WHERE id = p_installation_id;
    RETURN true;
END;
$$;

COMMIT;
