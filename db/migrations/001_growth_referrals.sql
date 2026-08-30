BEGIN;

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE growth_anonymous_installations (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    platform text NOT NULL CHECK (platform IN ('ios', 'android')),
    country text CHECK (country ~ '^[A-Z]{2}$'),
    app_version text NOT NULL CHECK (length(app_version) BETWEEN 1 AND 32),
    public_key_spki bytea NOT NULL CHECK (octet_length(public_key_spki) BETWEEN 32 AND 256),
    public_key_hash bytea NOT NULL UNIQUE CHECK (octet_length(public_key_hash) = 32),
    credential_hash bytea NOT NULL UNIQUE CHECK (octet_length(credential_hash) = 32),
    attestation_provider text NOT NULL CHECK (attestation_provider IN ('app_attest', 'play_integrity')),
    attestation_key_hash bytea CHECK (attestation_key_hash IS NULL OR octet_length(attestation_key_hash) = 32),
    revenuecat_app_user_id text NOT NULL UNIQUE CHECK (length(revenuecat_app_user_id) BETWEEN 1 AND 128),
    first_open_at timestamptz NOT NULL,
    claim_eligible boolean NOT NULL DEFAULT false,
    -- Second of the three confirmation conditions. On the installation rather
    -- than the claim because the claim and the end of onboarding can land in
    -- either order, and neither should have to wait for the other.
    onboarding_completed_at timestamptz,
    created_at timestamptz NOT NULL DEFAULT now(),
    last_activity_at timestamptz NOT NULL DEFAULT now(),
    expires_at timestamptz NOT NULL DEFAULT (now() + interval '180 days'),
    revoked_at timestamptz,
    CHECK (expires_at >= created_at)
);

CREATE TABLE growth_request_nonces (
    installation_id uuid NOT NULL REFERENCES growth_anonymous_installations(id) ON DELETE CASCADE,
    nonce_hash bytea NOT NULL CHECK (octet_length(nonce_hash) = 32),
    created_at timestamptz NOT NULL DEFAULT now(),
    expires_at timestamptz NOT NULL DEFAULT (now() + interval '10 minutes'),
    PRIMARY KEY (installation_id, nonce_hash)
);

CREATE TABLE growth_attestation_challenges (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    platform text NOT NULL CHECK (platform IN ('ios', 'android')),
    public_key_hash bytea NOT NULL CHECK (octet_length(public_key_hash) = 32),
    challenge_hash bytea NOT NULL UNIQUE CHECK (octet_length(challenge_hash) = 32),
    created_at timestamptz NOT NULL DEFAULT now(),
    expires_at timestamptz NOT NULL DEFAULT (now() + interval '10 minutes'),
    consumed_at timestamptz,
    CHECK (expires_at > created_at)
);

CREATE TABLE growth_referral_codes (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    inviter_installation_id uuid NOT NULL UNIQUE REFERENCES growth_anonymous_installations(id) ON DELETE CASCADE,
    code text NOT NULL UNIQUE CHECK (code ~ '^[23456789ABCDEFGHJKLMNPQRSTUVWXYZ]{10}$'),
    created_at timestamptz NOT NULL DEFAULT now(),
    revoked_at timestamptz
);

CREATE TABLE growth_referral_claims (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    referral_code_id uuid NOT NULL REFERENCES growth_referral_codes(id) ON DELETE CASCADE,
    inviter_installation_id uuid NOT NULL REFERENCES growth_anonymous_installations(id) ON DELETE CASCADE,
    -- Nullable, and ON DELETE SET NULL rather than CASCADE: retention deletes
    -- the referred installation 180 days after its last activity, and cascading
    -- would silently decrement an inviter who had already earned the referral.
    -- The claim survives the person, which is also the better privacy answer.
    referred_installation_id uuid UNIQUE REFERENCES growth_anonymous_installations(id) ON DELETE SET NULL,
    claimed_at timestamptz NOT NULL DEFAULT now(),
    -- Set once, never cleared. Monotonic by construction, which is what makes
    -- "unlocks permanently" true without a separate reconciliation job.
    confirmed_at timestamptz,
    CHECK (inviter_installation_id IS DISTINCT FROM referred_installation_id),
    UNIQUE (referral_code_id, referred_installation_id)
);

CREATE TABLE growth_successful_day_assertions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    installation_id uuid NOT NULL REFERENCES growth_anonymous_installations(id) ON DELETE CASCADE,
    event_id uuid NOT NULL,
    local_day date NOT NULL,
    occurred_at timestamptz NOT NULL,
    timezone_offset_minutes smallint NOT NULL CHECK (timezone_offset_minutes BETWEEN -840 AND 840),
    mission_completed_minutes smallint NOT NULL CHECK (mission_completed_minutes BETWEEN 0 AND 30),
    source text NOT NULL CHECK (source = 'real_alarm'),
    created_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (installation_id, event_id),
    UNIQUE (installation_id, local_day)
);

-- Wake Squad is the only thing a referral buys, so the unlock is the only
-- durable artefact. There is deliberately no grants table: referrals confer no
-- entitlement, no Plus time and no currency.
CREATE TABLE growth_squad_unlocks (
    installation_id uuid PRIMARY KEY REFERENCES growth_anonymous_installations(id) ON DELETE CASCADE,
    unlocked_at timestamptz NOT NULL DEFAULT now(),
    confirmed_at_unlock integer NOT NULL CHECK (confirmed_at_unlock >= 20)
);

CREATE TABLE growth_referral_audit (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    occurred_at timestamptz NOT NULL DEFAULT now(),
    installation_id uuid,
    claim_id uuid,
    event_type text NOT NULL CHECK (length(event_type) BETWEEN 1 AND 64),
    outcome text NOT NULL CHECK (length(outcome) BETWEEN 1 AND 64),
    reason text CHECK (reason IS NULL OR length(reason) <= 160),
    details jsonb NOT NULL DEFAULT '{}'::jsonb,
    CHECK (jsonb_typeof(details) = 'object')
);

CREATE INDEX growth_installations_expiry_idx ON growth_anonymous_installations(expires_at);
CREATE INDEX growth_nonces_expiry_idx ON growth_request_nonces(expires_at);
CREATE INDEX growth_attestation_challenges_expiry_idx ON growth_attestation_challenges(expires_at);
CREATE INDEX growth_assertions_install_time_idx ON growth_successful_day_assertions(installation_id, occurred_at);
-- The inviter's progress is counted, not stored, so this is the hot path.
CREATE INDEX growth_claims_inviter_confirmed_idx
    ON growth_referral_claims(inviter_installation_id) WHERE confirmed_at IS NOT NULL;
CREATE INDEX growth_audit_time_idx ON growth_referral_audit(occurred_at DESC);

CREATE OR REPLACE FUNCTION growth_reject_audit_mutation()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
    IF current_setting('wakesharp.retention_mode', true) = 'on' AND TG_OP = 'DELETE' THEN
        RETURN OLD;
    END IF;
    RAISE EXCEPTION 'growth_referral_audit is append-only';
END;
$$;

CREATE TRIGGER growth_referral_audit_append_only
BEFORE UPDATE OR DELETE ON growth_referral_audit
FOR EACH ROW EXECUTE FUNCTION growth_reject_audit_mutation();

CREATE OR REPLACE FUNCTION growth_claim_referral(
    p_referred_installation_id uuid,
    p_code text,
    p_now timestamptz DEFAULT now()
)
RETURNS TABLE (claim_id uuid, inviter_installation_id uuid, already_claimed boolean)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
    v_referred growth_anonymous_installations%ROWTYPE;
    v_code growth_referral_codes%ROWTYPE;
    v_existing growth_referral_claims%ROWTYPE;
    v_claim growth_referral_claims%ROWTYPE;
BEGIN
    SELECT * INTO v_referred
    FROM growth_anonymous_installations
    WHERE id = p_referred_installation_id AND revoked_at IS NULL
    FOR UPDATE;
    IF NOT FOUND THEN RAISE EXCEPTION 'installation_unavailable'; END IF;

    IF NOT v_referred.claim_eligible THEN
        RAISE EXCEPTION 'claim_install_ineligible';
    END IF;

    IF p_now > v_referred.first_open_at + interval '24 hours' THEN
        RAISE EXCEPTION 'claim_window_expired';
    END IF;

    SELECT * INTO v_code
    FROM growth_referral_codes
    WHERE code = upper(p_code) AND revoked_at IS NULL;
    IF NOT FOUND THEN RAISE EXCEPTION 'referral_code_invalid'; END IF;
    IF v_code.inviter_installation_id = p_referred_installation_id THEN
        RAISE EXCEPTION 'self_referral';
    END IF;

    SELECT * INTO v_existing
    FROM growth_referral_claims
    WHERE referred_installation_id = p_referred_installation_id;
    IF FOUND THEN
        IF v_existing.referral_code_id <> v_code.id THEN
            RAISE EXCEPTION 'different_referral_already_claimed';
        END IF;
        RETURN QUERY SELECT v_existing.id, v_existing.inviter_installation_id, true;
        RETURN;
    END IF;

    INSERT INTO growth_referral_claims (
        referral_code_id, inviter_installation_id, referred_installation_id, claimed_at
    ) VALUES (
        v_code.id, v_code.inviter_installation_id, p_referred_installation_id, p_now
    ) RETURNING * INTO v_claim;

    UPDATE growth_anonymous_installations
    SET last_activity_at = p_now, expires_at = p_now + interval '180 days'
    WHERE id IN (p_referred_installation_id, v_code.inviter_installation_id);

    INSERT INTO growth_referral_audit (installation_id, claim_id, event_type, outcome)
    VALUES (p_referred_installation_id, v_claim.id, 'claim', 'accepted');

    RETURN QUERY SELECT v_claim.id, v_claim.inviter_installation_id, false;
END;
$$;

-- Decides whether a referred installation's claim has become confirmed, and is
-- the single place that answer is computed. Called from BOTH the success path
-- and the onboarding path, because the third morning and the end of onboarding
-- can arrive in either order and whichever lands last must be the one that
-- confirms. Idempotent: a confirmed claim returns true and writes nothing.
CREATE OR REPLACE FUNCTION growth_evaluate_claim_confirmation(
    p_installation_id uuid,
    p_now timestamptz DEFAULT now()
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
    v_install growth_anonymous_installations%ROWTYPE;
    v_claim growth_referral_claims%ROWTYPE;
    v_has_three boolean := false;
    v_total integer := 0;
BEGIN
    SELECT * INTO v_install
    FROM growth_anonymous_installations
    WHERE id = p_installation_id AND revoked_at IS NULL;
    IF NOT FOUND THEN RETURN false; END IF;

    SELECT * INTO v_claim
    FROM growth_referral_claims
    WHERE referred_installation_id = p_installation_id
    FOR UPDATE;
    IF NOT FOUND THEN RETURN false; END IF;
    IF v_claim.confirmed_at IS NOT NULL THEN RETURN true; END IF;

    -- Condition 2. Cheap, so it gates the three-way join below.
    IF v_install.onboarding_completed_at IS NULL THEN RETURN false; END IF;

    -- Condition 3: three qualifying mornings, on distinct local days, at least
    -- 18 hours apart, all at or after the server-recorded first_open_at. That
    -- floor is half the anti-forgery story; the other half is the ceiling
    -- enforced on occurred_at at insert time in growth_record_success. Together
    -- they mean the third morning cannot exist until the installation has
    -- really been around ~36 hours, whatever the device clock claims.
    --
    -- Spacing is judged on occurred_at rather than on arrival, deliberately: a
    -- phone that spent three days offline flushes its whole outbox at once and
    -- must still qualify.
    SELECT EXISTS (
        SELECT 1
        FROM growth_successful_day_assertions a
        JOIN growth_successful_day_assertions b
          ON b.installation_id = a.installation_id
         AND b.occurred_at >= a.occurred_at + interval '18 hours'
         AND b.local_day <> a.local_day
        JOIN growth_successful_day_assertions c
          ON c.installation_id = a.installation_id
         AND c.occurred_at >= b.occurred_at + interval '18 hours'
         AND c.local_day <> a.local_day
         AND c.local_day <> b.local_day
        WHERE a.installation_id = p_installation_id
          AND a.occurred_at >= v_install.first_open_at
    ) INTO v_has_three;
    IF NOT v_has_three THEN RETURN false; END IF;

    UPDATE growth_referral_claims
    SET confirmed_at = p_now
    WHERE id = v_claim.id AND confirmed_at IS NULL;

    -- Lock the inviter BEFORE counting. Two referred installs confirming at the
    -- same moment would otherwise each see the other's claim as uncommitted,
    -- both read 19, and the twentieth referral would unlock nothing.
    PERFORM 1 FROM growth_anonymous_installations
    WHERE id = v_claim.inviter_installation_id
    FOR UPDATE;

    SELECT count(*) INTO v_total
    FROM growth_referral_claims
    WHERE inviter_installation_id = v_claim.inviter_installation_id
      AND confirmed_at IS NOT NULL;

    IF v_total >= 20 THEN
        INSERT INTO growth_squad_unlocks (installation_id, unlocked_at, confirmed_at_unlock)
        VALUES (v_claim.inviter_installation_id, p_now, v_total)
        ON CONFLICT (installation_id) DO NOTHING;
    END IF;

    INSERT INTO growth_referral_audit (installation_id, claim_id, event_type, outcome, details)
    VALUES (p_installation_id, v_claim.id, 'claim_confirmation', 'confirmed',
            jsonb_build_object('inviter_confirmed_total', v_total));
    RETURN true;
END;
$$;

-- The idempotent "onboarding completed" assertion. First write wins; a repeat
-- is a no-op that still re-evaluates, so a client retrying after a dropped
-- response cannot end up permanently unconfirmed.
CREATE OR REPLACE FUNCTION growth_record_onboarding_completed(
    p_installation_id uuid,
    p_now timestamptz DEFAULT now()
)
RETURNS TABLE (recorded boolean, confirmed boolean)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
    v_install growth_anonymous_installations%ROWTYPE;
    v_recorded boolean := false;
BEGIN
    SELECT * INTO v_install
    FROM growth_anonymous_installations
    WHERE id = p_installation_id AND revoked_at IS NULL
    FOR UPDATE;
    IF NOT FOUND THEN RAISE EXCEPTION 'installation_unavailable'; END IF;

    IF v_install.onboarding_completed_at IS NULL THEN
        UPDATE growth_anonymous_installations
        SET onboarding_completed_at = p_now,
            last_activity_at = p_now,
            expires_at = p_now + interval '180 days'
        WHERE id = p_installation_id;
        v_recorded := true;
        INSERT INTO growth_referral_audit (installation_id, event_type, outcome)
        VALUES (p_installation_id, 'onboarding_completed', 'recorded');
    END IF;

    RETURN QUERY SELECT v_recorded,
        growth_evaluate_claim_confirmation(p_installation_id, p_now);
END;
$$;

CREATE OR REPLACE FUNCTION growth_record_success(
    p_installation_id uuid,
    p_event_id uuid,
    p_local_day date,
    p_occurred_at timestamptz,
    p_timezone_offset_minutes smallint,
    p_mission_completed_minutes smallint,
    p_now timestamptz DEFAULT now()
)
RETURNS TABLE (assertion_id uuid, recorded boolean, qualified boolean, referral_claim_id uuid)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
    v_install growth_anonymous_installations%ROWTYPE;
    v_assertion growth_successful_day_assertions%ROWTYPE;
    v_claim growth_referral_claims%ROWTYPE;
    v_qualified boolean := false;
    v_recorded boolean := false;
BEGIN
    SELECT * INTO v_install
    FROM growth_anonymous_installations
    WHERE id = p_installation_id AND revoked_at IS NULL
    FOR UPDATE;
    IF NOT FOUND THEN RAISE EXCEPTION 'installation_unavailable'; END IF;

    IF p_occurred_at < v_install.first_open_at - interval '5 minutes'
       OR p_occurred_at > p_now + interval '10 minutes' THEN
        RAISE EXCEPTION 'success_time_invalid';
    END IF;
    IF ((p_occurred_at AT TIME ZONE 'UTC' + make_interval(mins => p_timezone_offset_minutes))::date <> p_local_day) THEN
        RAISE EXCEPTION 'local_day_mismatch';
    END IF;

    INSERT INTO growth_successful_day_assertions (
        installation_id, event_id, local_day, occurred_at,
        timezone_offset_minutes, mission_completed_minutes, source
    ) VALUES (
        p_installation_id, p_event_id, p_local_day, p_occurred_at,
        p_timezone_offset_minutes, p_mission_completed_minutes, 'real_alarm'
    )
    ON CONFLICT DO NOTHING
    RETURNING * INTO v_assertion;

    IF FOUND THEN
        v_recorded := true;
    ELSE
        SELECT * INTO v_assertion
        FROM growth_successful_day_assertions
        WHERE installation_id = p_installation_id
          AND (event_id = p_event_id OR local_day = p_local_day)
        ORDER BY (event_id = p_event_id) DESC
        LIMIT 1;
        IF NOT FOUND THEN RAISE EXCEPTION 'success_conflict'; END IF;
    END IF;

    SELECT * INTO v_claim
    FROM growth_referral_claims
    WHERE referred_installation_id = p_installation_id;

    IF FOUND THEN
        v_qualified := growth_evaluate_claim_confirmation(p_installation_id, p_now);
    END IF;

    UPDATE growth_anonymous_installations
    SET last_activity_at = p_now, expires_at = p_now + interval '180 days'
    WHERE id = p_installation_id;

    INSERT INTO growth_referral_audit (
        installation_id, claim_id, event_type, outcome, details
    ) VALUES (
        p_installation_id, CASE WHEN v_claim.id IS NULL THEN NULL ELSE v_claim.id END,
        'success_assertion', CASE WHEN v_qualified THEN 'qualified' ELSE 'recorded' END,
        jsonb_build_object('local_day', p_local_day, 'event_id', p_event_id)
    );

    RETURN QUERY SELECT v_assertion.id,
        v_recorded,
        v_qualified,
        CASE WHEN v_claim.id IS NULL THEN NULL ELSE v_claim.id END;
END;
$$;

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

    -- No in-flight work can block expiry any more: there are no reward grants
    -- to fulfil, and a confirmed claim outlives its referred installation on
    -- purpose (referred_installation_id is ON DELETE SET NULL), so retention
    -- can never quietly take an inviter's earned progress back down.
    DELETE FROM growth_anonymous_installations WHERE expires_at < p_now;
    GET DIAGNOSTICS v_installations = ROW_COUNT;

    PERFORM set_config('wakesharp.retention_mode', 'on', true);
    DELETE FROM growth_referral_audit WHERE occurred_at < p_now - interval '180 days';
    GET DIAGNOSTICS v_audit = ROW_COUNT;

    RETURN QUERY SELECT v_nonces, v_installations, v_audit;
END;
$$;

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
