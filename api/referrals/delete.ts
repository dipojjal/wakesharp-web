import { z } from 'zod';
import { query } from '../_lib/db.js';
import { authenticateInstallation } from '../_lib/install-auth.js';
import { endpoint, json, methodNotAllowed, readJson } from '../_lib/http.js';
import { assertReferralApiEnabled } from '../_lib/referrals.js';

const requestSchema = z.object({ confirm: z.literal(true) }).strict();

export function GET(): Response { return methodNotAllowed('POST'); }

export async function POST(request: Request): Promise<Response> {
  return endpoint(async () => {
    assertReferralApiEnabled();
    const { raw } = await readJson(request, requestSchema);
    const installation = await authenticateInstallation(request, raw);
    const rows = await query<{ deleted: boolean }>(
      'SELECT growth_delete_installation($1) AS deleted',
      [installation.id],
    );
    return json({ deleted: rows[0]?.deleted === true });
  });
}
