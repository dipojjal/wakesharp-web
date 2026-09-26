import { SITE } from '../config/site';
import { localeByCode, localeByPath } from '../i18n/config';
export const WEBSITE_SOURCE = 'wakesharp_website';
export const ONELINK = 'https://wakesharp.onelink.me/yhik';
export interface DownloadContext { pageId: string; placement: string; locale: string }
export function pageIdFor(path: string): string {
  const parts = path.split('/').filter(Boolean);
  if (localeByPath(parts[0] ?? '')) parts.shift();
  // Share payloads must never become analytics dimensions.
  if (['c', 'p', 'r'].includes(parts[0])) return parts[0];
  return clean(parts.join('-'), 'home');
}
const clean = (value: string, fallback: string) => /^[a-zA-Z0-9_-]{1,100}$/.test(value) ? value : fallback;
export function safeContext(c: DownloadContext): DownloadContext {
  return { pageId: clean(c.pageId, 'home'), placement: clean(c.placement, 'download'), locale: localeByCode(c.locale)?.code ?? 'en' };
}
export function buildDownloadUrl(context: DownloadContext, platform?: 'ios' | 'android'): string {
  const c = safeContext(context);
  const u = new URL(platform ? `https://app.appsflyer.com/${platform === 'ios' ? 'id6801198703' : 'com.wakesharp.app'}` : ONELINK);
  u.search = new URLSearchParams({ pid: WEBSITE_SOURCE, c: 'WakeSharp Website', af_channel: 'website', af_adset: c.pageId, af_ad: c.placement, af_sub1: c.locale, af_click_lookback: '7d', deep_link_value: 'welcome', af_dp: 'wakesharp://welcome', af_xp: 'custom' }).toString();
  if (!platform) {
    const locale = localeByCode(c.locale)!;
    const dest = new URL(`${locale.code === 'en' ? '' : '/' + locale.path}/download`, SITE.url);
    dest.search = new URLSearchParams({ page: c.pageId, placement: c.placement }).toString();
    u.searchParams.set('af_web_dp', dest.href);
  }
  return u.href;
}
