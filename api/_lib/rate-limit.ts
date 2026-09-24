import { createHmac } from 'node:crypto';
import { isIP } from 'node:net';
import { query } from './db.js';
import { ApiError } from './http.js';

/**
 * How much more a whole IPv6 /48 may send than one /64 in it. A /64 is one
 * subscriber line or one server; a /48 is a site, a tunnel broker's free
 * allocation, or a mobile carrier's pool shared by many subscribers.
 */
export const IPV6_SITE_FACTOR = 8;

/**
 * The network of the first `groups` 16-bit groups of an IPv6 address, as
 * `a:b:c::/48` (3) or `a:b:c:d::/64` (4), or null when the text is not an
 * IPv6 address.
 */
function ipv6Prefix(address: string, groupCount: 3 | 4): string | null {
  const plain = address.split('%', 1)[0] ?? '';
  if (isIP(plain) !== 6) return null;
  const halves = plain.split('::');
  if (halves.length > 2) return null;
  const groupsOf = (part: string): string[] => {
    if (!part) return [];
    const groups = part.split(':');
    // A dotted IPv4 tail stands for the last two groups; only the prefix matters.
    if (groups.at(-1)?.includes('.')) groups.splice(-1, 1, '0', '0');
    return groups;
  };
  const left = groupsOf(halves[0] ?? '');
  const right = groupsOf(halves[1] ?? '');
  const fill = halves.length === 2 ? 8 - left.length - right.length : 0;
  if (fill < 0) return null;
  const groups = [...left, ...Array<string>(fill).fill('0'), ...right];
  if (groups.length !== 8) return null;
  const prefix = groups.slice(0, groupCount).map((group) => parseInt(group, 16).toString(16)).join(':');
  return `${prefix}::/${groupCount * 16}`;
}

/**
 * The /48 an IPv6 address sits in, as `a:b:c::/48`, or null when the text is
 * not an IPv6 address. A /48 (65,536 /64s) comes free with a tunnel broker,
 * so a limit on anything narrower alone is a fresh bucket on demand (2.13
 * review).
 */
export function ipv6Network48(address: string): string | null {
  return ipv6Prefix(address, 3);
}

/**
 * The /64 an IPv6 address sits in. One subscriber line or one server holds at
 * least a /64 and can send each request from a new address in it.
 */
export function ipv6Network64(address: string): string | null {
  return ipv6Prefix(address, 4);
}

/** One budget a request counts against: a network, and its multiple of the route's limit. */
export interface RateBucket {
  network: string;
  factor: number;
}

/**
 * The budgets the caller's request counts against: its IPv4 address, or for
 * IPv6 both its /64 at the route's limit and its /48 at `IPV6_SITE_FACTOR`
 * times that (2.13 review). A /48 alone was too tight for a carrier pool of
 * many subscribers, and a /64 alone is free by the thousand.
 *
 * Vercel's edge sets `x-real-ip` to the connecting client and overwrites
 * `x-forwarded-for`, so neither can be chosen by the caller once a request has
 * come through it. With no usable address, requests share one bucket per
 * route rather than going unlimited.
 */
export function clientNetworks(request: Request): RateBucket[] {
  const raw = request.headers.get('x-real-ip') ?? request.headers.get('x-forwarded-for')?.split(',')[0] ?? '';
  const address = raw.trim();
  if (isIP(address) === 4) return [{ network: address, factor: 1 }];
  const mapped = /^::ffff:(\d{1,3}(?:\.\d{1,3}){3})$/i.exec(address);
  if (mapped && isIP(mapped[1]) === 4) return [{ network: mapped[1], factor: 1 }];
  const line = ipv6Network64(address);
  const site = ipv6Network48(address);
  if (line && site) return [{ network: line, factor: 1 }, { network: site, factor: IPV6_SITE_FACTOR }];
  return [{ network: 'unknown', factor: 1 }];
}

/**
 * Counts this request against `route`'s budgets for the caller's network (see
 * `clientNetworks`) and refuses it with 429 `rate_limited` once any of them is
 * past its limit in the current window (G1-05, G2-02). Each key is an HMAC
 * under the credential pepper with its own domain label, so no address is
 * stored and a table dump cannot be reversed by enumerating the IPv4 space.
 */
export async function enforceRateLimit(
  request: Request,
  route: string,
  limit: number,
  windowSeconds: number,
): Promise<void> {
  const pepper = process.env.REFERRAL_CREDENTIAL_PEPPER;
  if (!pepper || pepper.length < 32) throw new ApiError(503, 'referrals_not_configured');
  for (const { network, factor } of clientNetworks(request)) {
    const rows = await query<{ allowed: boolean }>(
      'SELECT growth_rate_limit_hit($1, $2, $3) AS allowed',
      [rateBucketKey(pepper, route, network), limit * factor, windowSeconds],
    );
    if (rows[0]?.allowed !== true) throw new ApiError(429, 'rate_limited');
  }
}

/** The stored key of one budget: an HMAC, never the address. */
export function rateBucketKey(pepper: string, route: string, network: string): Buffer {
  return createHmac('sha256', pepper).update(`rate_limit\n${route}\n${network}`).digest();
}
