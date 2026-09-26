import { pageIdFor } from '../lib/download';
import type { PostHog } from 'posthog-js/dist/module.no-external';
import { WEBSITE_EVENTS, sanitizeDimensions, sanitizedCampaign, sanitizeEnvelope, type WebEvent } from '../lib/website-events';
const KEY = 'ws_website_analytics';
let client: Pick<PostHog, 'capture' | 'opt_out_capturing' | 'reset'> | undefined;
let consent = false;
let generation = 0;
const metadata = () => ({ surface: 'website', page: pageIdFor(location.pathname), locale: document.documentElement.lang, environment: location.hostname === 'wakesharp.app' ? 'production' : 'qa' });
export function trackWebsite(event: WebEvent, props: Record<string, string> = {}) {
  if (!consent || !client) return;
  const filtered = sanitizeDimensions(props);
  client.capture(event, { ...metadata(), ...sanitizedCampaign(location.search), ...filtered });
}
async function enable() {
  const key = import.meta.env.PUBLIC_POSTHOG_KEY;
  if (!key) return;
  consent = true;
  const version = ++generation;
  const { default: posthog } = await import('posthog-js/dist/module.no-external');
  if (!consent || version !== generation) return;
  client = posthog.init(key, {
    api_host: 'https://us.i.posthog.com', persistence_name: 'wakesharp_website', persistence: 'localStorage',
    autocapture: false, capture_pageview: false, capture_pageleave: false, disable_session_recording: true,
    disable_surveys: true, advanced_disable_feature_flags: true, advanced_disable_decide: true,
    capture_exceptions: false, save_campaign_params: false, capture_performance: false, person_profiles: 'never', respect_dnt: true,
    before_send: event => {
      if (!event || !consent || !WEBSITE_EVENTS.includes(event.event as WebEvent)) return null;
      // Explicit allowlist also removes SDK-added URLs, referrers and campaign data.
      event.properties = sanitizeEnvelope(event.properties);
      return event;
    },
    loaded: instance => {
      if (!consent) return;
      client = instance;
      instance.opt_in_capturing();
      const tool = document.querySelector<HTMLElement>('[data-tool]')?.dataset.tool;
      if (tool) trackWebsite('website_tool_viewed', { tool });
      if (document.querySelector('[data-download-page]')) trackWebsite('website_qr_viewed');
    },
  }, 'website');
}
export function initWebsiteAnalytics() {
  const panel = document.querySelector<HTMLElement>('[data-consent-panel]');
  let saved: string | null = null;
  try { saved = localStorage.getItem(KEY); } catch { /* Storage optional. */ }
  if (panel) panel.hidden = saved !== null;
  if (saved === 'yes') void enable().catch(() => {});
  document.addEventListener('click', e => {
    const el = e.target instanceof Element ? e.target : null;
    const choice = el?.closest<HTMLElement>('[data-consent]')?.dataset.consent;
    if (choice) {
      consent = choice === 'yes'; ++generation;
      try { localStorage.setItem(KEY, choice); } catch { /* In-memory choice still honored. */ }
      if (panel) panel.hidden = true;
      if (consent) void enable().catch(() => {});
      else { client?.opt_out_capturing(); client?.reset(); client = undefined; }
    }
    if (el?.closest('[data-analytics-settings]') && panel) { panel.hidden = false; panel.querySelector<HTMLButtonElement>('button')?.focus(); }
    const link = el?.closest<HTMLElement>('[data-download]');
    if (link) trackWebsite('website_download_clicked', { page: link.dataset.page ?? 'home', placement: link.dataset.placement ?? 'download', locale: link.dataset.locale ?? 'en' });
  });
}
