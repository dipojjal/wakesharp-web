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
    referred_installation_id uuid NOT NULL UNIQUE REFERENCES growth_anonymous_installations(id) ON DELETE CASCADE,
    claimed_at timestamptz NOT NULL DEFAULT now(),
    qualification_deadline timestamptz NOT NULL,
    CHECK (inviter_installation_id <> referred_installation_id),
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

CREATE TABLE growth_reward_grants (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    claim_id uuid NOT NULL REFERENCES growth_referral_claims(id) ON DELETE CASCADE,
    beneficiary_installation_id uuid NOT NULL REFERENCES growth_anonymous_installations(id) ON DELETE CASCADE,
    role text NOT NULL CHECK (role IN ('inviter', 'referred')),
    status text NOT NULL DEFAULT 'queued' CHECK (status IN (
        'queued', 'granting', 'granted', 'recognition_only', 'failed',
        'permanent_failure', 'cap_blocked'
    )),
    idempotency_key text NOT NULL UNIQUE CHECK (length(idempotency_key) BETWEEN 16 AND 128),
    desired_expiration_at timestamptz,
    attempts smallint NOT NULL DEFAULT 0 CHECK (attempts BETWEEN 0 AND 8),
    next_attempt_at timestamptz NOT NULL DEFAULT now(),
    last_failure_code text CHECK (last_failure_code IS NULL OR length(last_failure_code) <= 64),
    last_failure_detail text CHECK (last_failure_detail IS NULL OR length(last_failure_detail) <= 500),
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    confirmed_at timestamptz,
    UNIQUE (claim_id, beneficiary_installation_id),
    UNIQUE (claim_id, role)
);

CREATE TABLE growth_apple_attribution_aggregates (
    postback_identifier uuid PRIMARY KEY,
    key_identifier text NOT NULL CHECK (length(key_identifier) BETWEEN 1 AND 80),
    environment text NOT NULL CHECK (environment IN ('production', 'development')),
    impression_type text NOT NULL CHECK (length(impression_type) BETWEEN 1 AND 40),
    ad_network_identifier text NOT NULL CHECK (length(ad_network_identifier) BETWEEN 1 AND 128),
    source_identifier text CHECK (source_identifier IS NULL OR source_identifier ~ '^[0-9]{2,4}$'),
    advertised_item_identifier text NOT NULL CHECK (length(advertised_item_identifier) BETWEEN 1 AND 128),
    publisher_item_identifier text CHECK (publisher_item_identifier IS NULL OR length(publisher_item_identifier) <= 128),
    marketplace_identifier text CHECK (marketplace_identifier IS NULL OR length(marketplace_identifier) <= 64),
    country_code text CHECK (country_code IS NULL OR country_code ~ '^[A-Z]{2}$'),
    conversion_type text NOT NULL CHECK (length(conversion_type) BETWEEN 1 AND 40),
    conversion_value smallint CHECK (conversion_value BETWEEN 0 AND 63),
    coarse_conversion_value text CHECK (coarse_conversion_value IN ('low', 'medium', 'high')),
    did_win boolean NOT NULL,
    postback_sequence_index smallint NOT NULL CHECK (postback_sequence_index BETWEEN 0 AND 2),
    payload_hash bytea NOT NULL CHECK (octet_length(payload_hash) = 32),
    received_at timestamptz NOT NULL DEFAULT now()
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
CREATE INDEX growth_grants_retry_idx ON growth_reward_grants(status, next_attempt_at);
CREATE INDEX growth_grants_beneficiary_idx ON growth_reward_grants(beneficiary_installation_id, created_at DESC);
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
RETURNS TABLE (claim_id uuid, inviter_installation_id uuid, qualification_deadline timestamptz, already_claimed boolean)
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
        RETURN QUERY SELECT v_existing.id, v_existing.inviter_installation_id,
            v_existing.qualification_deadline, true;
        RETURN;
    END IF;

    INSERT INTO growth_referral_claims (
        referral_code_id, inviter_installation_id, referred_installation_id,
        claimed_at, qualification_deadline
    ) VALUES (
        v_code.id, v_code.inviter_installation_id, p_referred_installation_id,
        p_now, v_referred.first_open_at + interval '168 hours'
    ) RETURNING * INTO v_claim;

    UPDATE growth_anonymous_installations
    SET last_activity_at = p_now, expires_at = p_now + interval '180 days'
    WHERE id IN (p_referred_installation_id, v_code.inviter_installation_id);

    INSERT INTO growth_referral_audit (installation_id, claim_id, event_type, outcome)
    VALUES (p_referred_installation_id, v_claim.id, 'claim', 'accepted');

    RETURN QUERY SELECT v_claim.id, v_claim.inviter_installation_id,
        v_claim.qualification_deadline, false;
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
    v_inviter_status text := 'queued';
    v_recent_inviter_rewards integer := 0;
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
              AND c.occurred_at <= v_claim.qualification_deadline
        ) INTO v_qualified;

        IF v_qualified THEN
            PERFORM 1 FROM growth_anonymous_installations
            WHERE id = v_claim.inviter_installation_id
            FOR UPDATE;

            SELECT count(DISTINCT claim_id) INTO v_recent_inviter_rewards
            FROM growth_reward_grants
            WHERE beneficiary_installation_id = v_claim.inviter_installation_id
              AND role = 'inviter'
              AND status NOT IN ('cap_blocked', 'permanent_failure')
              AND created_at >= p_now - interval '30 days';
            IF v_recent_inviter_rewards >= 5 THEN v_inviter_status := 'cap_blocked'; END IF;

            INSERT INTO growth_reward_grants (
                claim_id, beneficiary_installation_id, role, status, idempotency_key
            ) VALUES (
                v_claim.id, v_claim.inviter_installation_id, 'inviter', v_inviter_status,
                'ws-referral-' || v_claim.id::text || '-inviter'
            ) ON CONFLICT (claim_id, role) DO NOTHING;

            INSERT INTO growth_reward_grants (
                claim_id, beneficiary_installation_id, role, status, idempotency_key
            ) VALUES (
                v_claim.id, p_installation_id, 'referred', 'queued',
                'ws-referral-' || v_claim.id::text || '-referred'
            ) ON CONFLICT (claim_id, role) DO NOTHING;
        END IF;
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

    DELETE FROM growth_anonymous_installations
    WHERE expires_at < p_now
      AND NOT EXISTS (
          SELECT 1 FROM growth_reward_grants g
          WHERE g.beneficiary_installation_id = growth_anonymous_installations.id
            AND g.status IN ('queued', 'granting', 'failed')
      )
      AND NOT EXISTS (
          SELECT 1
          FROM growth_referral_claims c
          JOIN growth_reward_grants g ON g.claim_id = c.id
          WHERE (c.inviter_installation_id = growth_anonymous_installations.id
                 OR c.referred_installation_id = growth_anonymous_installations.id)
            AND g.status IN ('queued', 'granting', 'failed')
      );
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

    UPDATE growth_reward_grants
    SET status = 'permanent_failure',
        last_failure_code = 'installation_deleted',
        last_failure_detail = 'Installation requested deletion before fulfillment.',
        updated_at = p_now
    WHERE beneficiary_installation_id = p_installation_id
      AND status IN ('queued', 'granting', 'failed');

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
