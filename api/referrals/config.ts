import { endpoint, methodNotAllowed } from '../_lib/http.js';

/**
 * The programme switch the 2.16 apps read instead of PostHog flags, so whether
 * referrals exist no longer depends on analytics consent.
 *
 * Unauthenticated, cacheable, and deliberately free of the database and of the
 * `referrals_disabled` kill switch: it must answer "off" while the API is off,
 * and it must keep answering when the database is not provisioned. Every value
 * is derived from the environment on each request.
 *
 *   referrals   REFERRALS_API_ENABLED === 'true' AND the platform is listed in
 *               REFERRALS_PLATFORMS (comma list, default "ios,android"). An
 *               unknown or missing platform is false.
 *   squatsLock  REFERRALS_SQUATS_LOCK !== 'false' (default true).
 *
 * Clients cache the answer for six hours and treat "never fetched" or a failed
 * fetch as referrals off and Squats locked.
 */
const PROTOCOL = 1;
const KNOWN_PLATFORMS = new Set(['ios', 'android']);
const DEFAULT_PLATFORMS = 'ios,android';

function enabledPlatforms(): Set<string> {
  const configured = process.env.REFERRALS_PLATFORMS?.trim() || DEFAULT_PLATFORMS;
  return new Set(configured.split(',').map((item) => item.trim().toLowerCase()).filter(Boolean));
}

export function GET(request: Request): Promise<Response> {
  return endpoint(async () => {
    const platform = new URL(request.url).searchParams.get('platform') ?? '';
    const referrals = process.env.REFERRALS_API_ENABLED === 'true'
      && KNOWN_PLATFORMS.has(platform)
      && enabledPlatforms().has(platform);
    const squatsLock = process.env.REFERRALS_SQUATS_LOCK !== 'false';
    return new Response(JSON.stringify({ protocol: PROTOCOL, referrals, squatsLock }), {
      status: 200,
      headers: {
        'Cache-Control': 'public, max-age=300, s-maxage=300',
        'Content-Type': 'application/json; charset=utf-8',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  });
}

export function POST(): Response { return methodNotAllowed('GET'); }
