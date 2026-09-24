-- WakeSharp 2.13 referral fixes, applied after 001. Nothing here enables the
-- API: every route still answers 503 until REFERRALS_API_ENABLED=true.
--
-- G1-01  A claim that already exists answers before the window and
--        eligibility checks, so re-opening an invite link after 24 hours is
--        "already claimed", not claim_window_expired.
-- G2-01  One live installation per App Attest key.
-- G1-05  Per-network rate limits for the unauthenticated routes, and a replayed
--        success assertion no longer appends an audit row.
BEGIN;

-- ---------- G1-01: an existing claim answers first ----------
--
-- The window and eligibility checks used to run before the existing-claim
-- lookup. A friend who claimed a code on day 0 and tapped the link again on
-- day 2 got 409 claim_window_expired for a claim that was already valid, and
-- the app kept retrying it on every launch. Now the claim this installation
-- already holds is looked up first: the same code is idempotent at any age,
-- any other code is different_referral_already_claimed.
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
    v_existing_code text;
    v_claim growth_referral_claims%ROWTYPE;
BEGIN
    SELECT * INTO v_referred
    FROM growth_anonymous_installations
    WHERE id = p_referred_installation_id AND revoked_at IS NULL
    FOR UPDATE;
    IF NOT FOUND THEN RAISE EXCEPTION 'installation_unavailable'; END IF;

    SELECT * INTO v_existing
    FROM growth_referral_claims
    WHERE referred_installation_id = p_referred_installation_id;
    IF FOUND THEN
        SELECT code INTO v_existing_code
        FROM growth_referral_codes
        WHERE id = v_existing.referral_code_id;
        IF v_existing_code IS DISTINCT FROM upper(p_code) THEN
            RAISE EXCEPTION 'different_referral_already_claimed';
        END IF;
        RETURN QUERY SELECT v_existing.id, v_existing.inviter_installation_id, true;
        RETURN;
    END IF;

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

-- ---------- G2-01 / G2-V02: one live installation per App Attest key ----------
--
-- attestation_key_hash was stored and never read, so one attested key could
-- stand behind any number of installations. The WakeSharp verifier now binds
-- each App Attest key to the install key it was attested with (app repo,
-- 20260922230000_app_attest_install_binding); this is the same rule on this
-- side. A second installation with the same key violates the index and
-- register-install answers 409 installation_identity_conflict. The same
-- installation re-registering updates its own row and never conflicts.
CREATE UNIQUE INDEX IF NOT EXISTS growth_installations_live_app_attest_key_idx
    ON growth_anonymous_installations (attestation_key_hash)
    WHERE attestation_provider = 'app_attest'
      AND attestation_key_hash IS NOT NULL
      AND revoked_at IS NULL;

-- ---------- G1-05: per-network limits for the unauthenticated routes ----------
--
-- /challenge inserted a row for anyone, and register-install could be driven
-- without a limit. The routes key a counter on an HMAC of the caller's network
-- (an IPv4 address, or an IPv6 /64) and the route name, so no address is
-- stored. Fixed windows, counted in the row itself; rows go after two days.
CREATE TABLE IF NOT EXISTS growth_rate_limits (
    bucket_hash bytea NOT NULL CHECK (octet_length(bucket_hash) = 32),
    window_start timestamptz NOT NULL,
    hits integer NOT NULL DEFAULT 0 CHECK (hits >= 0),
    PRIMARY KEY (bucket_hash, window_start)
);

CREATE INDEX IF NOT EXISTS growth_rate_limits_window_idx ON growth_rate_limits (window_start);

-- True while the bucket is within p_limit hits in the current p_window_seconds.
CREATE OR REPLACE FUNCTION growth_rate_limit_hit(
    p_bucket_hash bytea,
    p_limit integer,
    p_window_seconds integer,
    p_now timestamptz DEFAULT now()
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
    v_window timestamptz := to_timestamp(
        floor(extract(epoch FROM p_now) / p_window_seconds) * p_window_seconds);
    v_hits integer;
BEGIN
    IF p_window_seconds < 1 OR p_limit < 1 THEN
        RAISE EXCEPTION 'growth_rate_limit_hit: window and limit must be positive';
    END IF;
    INSERT INTO growth_rate_limits (bucket_hash, window_start, hits)
    VALUES (p_bucket_hash, v_window, 1)
    ON CONFLICT (bucket_hash, window_start)
    DO UPDATE SET hits = growth_rate_limits.hits + 1
    RETURNING hits INTO v_hits;
    RETURN v_hits <= p_limit;
END;
$$;

CREATE OR REPLACE FUNCTION growth_prune_rate_limits(p_now timestamptz DEFAULT now())
RETURNS bigint
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
    v_deleted bigint;
BEGIN
    DELETE FROM growth_rate_limits WHERE window_start < p_now - interval '2 days';
    GET DIAGNOSTICS v_deleted = ROW_COUNT;
    RETURN v_deleted;
END;
$$;

-- ---------- G1-05 (c): a replayed success assertion writes nothing ----------
--
-- Every replay of /success with a fresh nonce re-ran the confirmation join and
-- appended an audit row, even when nothing was recorded. A replay now answers
-- from the stored assertion and the claim's current state.
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

    SELECT * INTO v_claim
    FROM growth_referral_claims
    WHERE referred_installation_id = p_installation_id;

    INSERT INTO growth_successful_day_assertions (
        installation_id, event_id, local_day, occurred_at,
        timezone_offset_minutes, mission_completed_minutes, source
    ) VALUES (
        p_installation_id, p_event_id, p_local_day, p_occurred_at,
        p_timezone_offset_minutes, p_mission_completed_minutes, 'real_alarm'
    )
    ON CONFLICT DO NOTHING
    RETURNING * INTO v_assertion;

    IF NOT FOUND THEN
        SELECT * INTO v_assertion
        FROM growth_successful_day_assertions
        WHERE installation_id = p_installation_id
          AND (event_id = p_event_id OR local_day = p_local_day)
        ORDER BY (event_id = p_event_id) DESC
        LIMIT 1;
        IF NOT FOUND THEN RAISE EXCEPTION 'success_conflict'; END IF;
        RETURN QUERY SELECT v_assertion.id,
            false,
            COALESCE(v_claim.confirmed_at IS NOT NULL, false),
            CASE WHEN v_claim.id IS NULL THEN NULL ELSE v_claim.id END;
        RETURN;
    END IF;

    IF v_claim.id IS NOT NULL THEN
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
        true,
        v_qualified,
        CASE WHEN v_claim.id IS NULL THEN NULL ELSE v_claim.id END;
END;
$$;

COMMIT;
