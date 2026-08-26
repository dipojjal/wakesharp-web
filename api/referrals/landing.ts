import { query } from '../_lib/db.js';
import { endpoint } from '../_lib/http.js';
import { assertReferralApiEnabled } from '../_lib/referrals.js';

const html = (body: string, status = 200): Response => new Response(body, {
  status,
  headers: {
    'Cache-Control': 'no-store',
    'Content-Type': 'text/html; charset=utf-8',
    'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline'; img-src 'self'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'",
    'Referrer-Policy': 'no-referrer',
    'X-Content-Type-Options': 'nosniff',
  },
});

export async function GET(request: Request): Promise<Response> {
  return endpoint(async () => {
    assertReferralApiEnabled();
    const code = new URL(request.url).searchParams.get('code')?.toUpperCase() ?? '';
    if (!/^[23456789ABCDEFGHJKLMNPQRSTUVWXYZ]{10}$/.test(code)) return html('<h1>Referral link not found</h1>', 404);
    const rows = await query<{ code: string }>('SELECT code FROM growth_referral_codes WHERE code = $1 AND revoked_at IS NULL', [code]);
    if (!rows[0]) return html('<h1>Referral link not found</h1>', 404);
    const playReferrer = encodeURIComponent(`utm_source=referral&utm_medium=invite&utm_campaign=organic_referral&referral_code=${code}`);
    const play = `https://play.google.com/store/apps/details?id=com.wakesharp.app&referrer=${playReferrer}`;
    return html(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>WakeSharp referral</title><style>body{font-family:system-ui,sans-serif;background:#111126;color:#fff;margin:0;min-height:100vh;display:grid;place-items:center}.card{max-width:34rem;margin:1.5rem;padding:2rem;border-radius:1.5rem;background:#211d3d;text-align:center}code{display:block;font-size:2rem;letter-spacing:.12em;margin:1.25rem;padding:1rem;background:#0d0d1c;border-radius:.8rem}a,button{display:block;box-sizing:border-box;width:100%;margin:.75rem 0;padding:.9rem;border:0;border-radius:999px;background:#ff8d78;color:#1e1720;font:inherit;font-weight:800;text-decoration:none}button.secondary{background:#fff}p{line-height:1.6;color:#ddd}</style></head><body><main class="card"><h1>A sharper morning is waiting</h1><p>If WakeSharp is installed, reopen this link from Messages or Mail. On iPhone, copy this short code and enter it explicitly in WakeSharp. WakeSharp never reads your clipboard automatically.</p><code id="code">${code}</code><button class="secondary" id="copy" type="button">Copy referral code</button><a href="wakesharp://r/${code}">Open WakeSharp</a><a href="https://apps.apple.com/app/id6801198703">Get WakeSharp for iPhone</a><a href="${play}">Get WakeSharp for Android</a><p id="status" aria-live="polite"></p></main><script>document.getElementById('copy').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(document.getElementById('code').textContent);document.getElementById('status').textContent='Code copied.'}catch{document.getElementById('status').textContent='Select and copy the code above.'}})</script></body></html>`);
  });
}

export function POST(): Response { return new Response(null, { status: 405, headers: { Allow: 'GET' } }); }
