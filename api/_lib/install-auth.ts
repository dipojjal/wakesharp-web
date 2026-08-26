import { credentialDigest, canonicalInstallRequest, sha256, verifyInstallSignature } from './crypto.js';
import { query } from './db.js';
import { ApiError } from './http.js';

export interface Installation {
  id: string;
  platform: 'ios' | 'android';
  country: string | null;
  app_version: string;
  public_key_spki: Buffer;
  revenuecat_app_user_id: string;
  first_open_at: string;
}

export async function authenticateInstallation(request: Request, rawBody: string): Promise<Installation> {
  const authorization = request.headers.get('authorization') ?? '';
  const match = /^Install (wsic_[A-Za-z0-9_-]{43})$/.exec(authorization);
  if (!match) throw new ApiError(401, 'install_auth_required');
  const timestamp = request.headers.get('x-wakesharp-timestamp') ?? '';
  const nonce = request.headers.get('x-wakesharp-nonce') ?? '';
  const signature = request.headers.get('x-wakesharp-signature') ?? '';
  if (!/^\d{10}$/.test(timestamp) || !/^[A-Za-z0-9_-]{16,86}$/.test(nonce) || !/^[A-Za-z0-9_-]{64,192}$/.test(signature)) {
    throw new ApiError(401, 'invalid_install_signature');
  }
  const requestTime = Number(timestamp) * 1000;
  if (!Number.isSafeInteger(requestTime) || Math.abs(Date.now() - requestTime) > 5 * 60_000) {
    throw new ApiError(401, 'stale_install_signature');
  }

  const rows = await query<Installation>(
    `SELECT id, platform, country, app_version, public_key_spki,
            revenuecat_app_user_id, first_open_at
       FROM growth_anonymous_installations
      WHERE credential_hash = $1 AND revoked_at IS NULL AND expires_at > now()
      LIMIT 1`,
    [credentialDigest(match[1])],
  );
  const installation = rows[0];
  if (!installation) throw new ApiError(401, 'invalid_install_credential');

  const path = new URL(request.url).pathname;
  const canonical = canonicalInstallRequest(request.method, path, timestamp, nonce, rawBody);
  if (!verifyInstallSignature(Buffer.from(installation.public_key_spki), canonical, signature)) {
    throw new ApiError(401, 'invalid_install_signature');
  }

  await query(
    'DELETE FROM growth_request_nonces WHERE installation_id = $1 AND expires_at < now()',
    [installation.id],
  );
  const nonceRows = await query<{ installation_id: string }>(
    `INSERT INTO growth_request_nonces (installation_id, nonce_hash)
     VALUES ($1, $2)
     ON CONFLICT DO NOTHING
     RETURNING installation_id`,
    [installation.id, sha256(nonce)],
  );
  if (!nonceRows[0]) throw new ApiError(409, 'request_replayed');

  await query(
    `UPDATE growth_anonymous_installations
        SET last_activity_at = now(), expires_at = now() + interval '180 days'
      WHERE id = $1`,
    [installation.id],
  );
  return installation;
}
