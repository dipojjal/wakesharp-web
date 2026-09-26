# WakeSharp free tools and website attribution

Implementation / account audit: 2026-09-26. **Not deployed; real-device acquisition and subscription delivery validation remains a launch gate.** This setup is prospective. Do not backfill historical unattributed users.

## Delivered

- Five client-side tools and their hub in all 12 site languages: 72 indexable pages. Localized controls, metadata, methods, sources, privacy FAQ, breadcrumbs, WebApplication schema, canonical/hreflang, and sitemap coverage.
- Desktop Free Tools menu, mobile disclosure navigation, contextual article links, localized app promotion with paid-app disclosure.
- One shared download component and URL builder. Canonical store URLs remain in application metadata. The untracked Safari Smart App Banner was removed. Existing challenge/pact parsing and open-app actions were retained.
- Localized noindex QR download pages, tracked platform fallback links, desktop routing, consent-gated PostHog events, withdrawal control and privacy disclosure. No calculator inputs/results enter the analytics contract.
- AppsFlyer custom link created: **[WakeSharp Website](https://wakesharp.onelink.me/yhik/website)** under `yhik`. Existing creator links/template unchanged.
- **[WakeSharp Website PostHog dashboard](https://us.posthog.com/project/559689/dashboard/2137569)**: seven insights plus interpretation/validation note. Saved definitions: `website-dashboard.json`.
- Native attribution implementations inspected; no native source changes were required by this audit. Targeted existing tests: iOS MarketingAttributionTests **47 passed**, Android MarketingAttributionTest **18 passed**. These are unit/simulator results, not proof of real store attribution.

## Download contract

`src/lib/download.ts` generates the complete tracked URL in HTML. It does not accept upstream attribution parameters.

| Field | Production value |
|---|---|
| OneLink | `https://wakesharp.onelink.me/yhik` |
| `pid` | `wakesharp_website` |
| `c` | `WakeSharp Website` |
| `af_channel` | `website` |
| `af_adset` | Stable page ID, e.g. `tools-sleep-calculator`, `home`, `blog-…` |
| `af_ad` | `header`, `hero`, `article-bottom`, `tool-result`, `tools-bottom`, `footer`, or `download` |
| `af_sub1` | Site locale |
| `af_click_lookback` | `7d` |
| `deep_link_value` / `af_dp` | `welcome` / `wakesharp://welcome` |
| `af_web_dp` | First-party localized `/download?page=…&placement=…` only |

The console short link and website long links share the same template and acquisition contract. Long links carry distinct page/placement values without changing creator links. Share payloads never become attribution dimensions. Store fallback links use `app.appsflyer.com/id6801198703` and `app.appsflyer.com/com.wakesharp.app`.

JavaScript-enabled desktop browsers go directly to the local QR page; the phone's QR journey follows AppsFlyer with the original page/placement. Header/footer buttons on the QR page move to its store choices, avoiding a repeat QR journey. Mobile buttons retain OneLink. Without JavaScript, complete tracked links and a default server-rendered QR remain usable, but the static QR page cannot recover query-specific page/placement (it falls back to `home` / `download`). No alarm configuration is transferred into the app.

### AppsFlyer redirect restriction

The console warned that `wakesharp.app` was not on the redirect allowlist. Security Center displayed **Manage redirect allowlist: disabled**. A QA desktop HTTP GET on 2026-09-26 returned an App Store redirect instead of `af_web_dp`; the warning is material. The site's desktop routing above avoids depending on that redirect for ordinary JavaScript-enabled visits. An AppsFlyer admin/support must allowlist `wakesharp.app` and retest OneLink desktop fallback before claiming full no-JavaScript routing support. Do not change paid plans or security settings without an appropriate user decision.

## Analytics / privacy

Set `PUBLIC_POSTHOG_KEY` to the **public ingestion key** for WakeSharp project **559689**, US region, in the production build environment. It is configured locally in ignored `.env.local`; production hosting configuration has not been changed. Do not use a personal API key. The SDK loads only after affirmative consent and uses its own website persistence namespace. `person_profiles=never`, autocapture, replay, surveys, automatic pageviews, feature flags, exceptions and performance capture are disabled. SDK-generated URLs/referrers and all unknown payload keys are removed before transmission.

Events: `website_tool_viewed`, `website_tool_started`, `website_tool_completed`, `website_download_clicked`, `website_qr_viewed`. Allowed business properties: `surface=website`, `environment`, `page`, `tool`, `placement`, `locale`, and sanitized `utm_source`/`utm_medium`/`utm_campaign`. Web events on hosts other than `wakesharp.app` are `environment=qa`; production charts exclude them. The existing Vercel aggregate website analytics remains in place.

Website IDs never identify/alias app IDs. Device/consent restrictions mean installs cannot always be matched. RevenueCat new customers are not store downloads. Do not force dashboard totals to agree.

## App identity and verified subscription events

Existing iOS/Android code already maps AppsFlyer `media_source`, `campaign`, `adset`, `ad` to PostHog `af_media_source`, `af_campaign`, `af_adset`, `af_ad`, and to RevenueCat `$mediaSource`, `$campaign`, `$adGroup`, `$ad`. RevenueCat reserved acquisition attributes are write-once; never seed Unknown/Organic. Preserve existing first-touch, retargeting and consent checks. AppsFlyer's customer ID tracks the current RevenueCat app user ID; `$posthogUserId` tracks the native PostHog identity. Verify these before checkout and after login/logout/restore.

RevenueCat remains the subscription-revenue sender. Do not add another SDK purchase/revenue sender. Existing configured event names include `rc_trial_started_event`, `rc_trial_cancelled_event`, `rc_initial_purchase_event`, `rc_trial_converted_event`, `rc_renewal_event`, `rc_cancellation_event`, and `rc_expiration_event`. Renewal and cancellation revenue series are prospective. Confirm refund adjustments in actual payloads; ordinary cancellations are not refunds. PostHog revenue is USD; the integration is configured for gross revenue before commission/tax. [RevenueCat integration contract](https://www.revenuecat.com/docs/integrations/third-party-integrations/posthog).

Live integrations observed active: RevenueCat → AppsFlyer and PostHog. PostHog integration includes subscriber attributes; its sandbox key is blank, so sandbox deliveries to that project must not be assumed. Do not enable sandbox delivery into production to manufacture a successful test.

## Reports still gated on first attributed data

**RevenueCat:** Both Customer Audiences → Media source and Charts v3 → Attribution Source offer observed values only. Entering `wakesharp_website` returned “No matching options” / “No options”. No unfiltered audience or chart was saved under a misleading website name.

After the first verified website customer arrives, save an audience named **WakeSharp Website**, exact media source `wakesharp_website` and campaign `WakeSharp Website`. Save the same exact filters on:

- [New Customers](https://app.revenuecat.com/projects/faa6b54d/charts/customers_new_v3)
- [Trial Conversion Rate](https://app.revenuecat.com/projects/faa6b54d/charts/trial_conversion_rate_v3)
- [Paid Subscriptions](https://app.revenuecat.com/projects/faa6b54d/charts/actives_new_v3)
- [Revenue](https://app.revenuecat.com/projects/faa6b54d/charts/revenue_v3)
- Refunds (select from Charts → Churn).

These are chart entry links, **not saved filtered report links**. Keep production/sandbox separate. [Charts v3 attribution filtering](https://www.revenuecat.com/docs/dashboard-and-metrics/charts/real-time-charts).

**AppsFlyer:** A saved acquisition dashboard has not been created. The Performance Analysis media-source filter currently offers only Organic and Apple Search Ads, so the website source cannot yet be selected. After verified attribution arrives, save **WakeSharp Website** with exact source/campaign, both platform apps, install-date cohort metrics (installs, trials, first purchases, cumulative revenue), and page/adset + placement/ad breakdowns. Keep a separate transaction-date revenue view. Retain organic/unattributed in an account-wide comparison. Do not infer LTV from a transaction-date chart.

**PostHog:** Seven saved charts cover tools, download clicks by page/placement, QR views, first matching app opens, RC lifecycle outcomes, RC revenue components, and overall attribution coverage. It uses event-date person attribution, which may be absent on events emitted before a delayed callback. The first-open chart is a proxy; AppsFlyer remains authoritative for attributed installs. Charts are awaiting observed website data. Sum-of-events revenue must be checked against unique transaction records before it is treated as financial reporting. No person-level web-to-app funnel was created.

## Validation and launch sequence

1. Configure production `PUBLIC_POSTHOG_KEY`, deploy a preview, and confirm optional consent/withdrawal using network inspection. Tool values/results, raw URLs, share payloads and free text must be absent from all analytics requests. Rejecting analytics must leave tools/downloads functional.
2. Use **registered test devices** and a QA link with `pid=wakesharp_website_qa`, `c=WakeSharp Website QA`, and placement `qa`; retain the same template/deep-link route. Never overwrite production source/campaign via incoming query strings. Exclude QA source and the existing project test-account cohort. Do not make paid purchases automatically.
3. Test iOS and Android fresh install with consent accepted/declined; installed-app open; late attribution; login/logout identity changes; an existing-user website click. Confirm no existing customer's first acquisition is replaced.
4. For an eligible controlled subscription journey, verify trial, direct purchase, conversion, renewal while closed, cancellation, expiration and refund across RC delivery logs, AppsFlyer and PostHog. Check one revenue event per store+transaction ID (refund adjustments separately), using secure local inspection without committing customer IDs. Confirm RC `$posthogUserId`, AF customer ID, campaign/source/page/placement and correct platform.
5. Test desktop QR scan preserving page/placement, mobile store redirects, installed-app welcome route, and challenge/pact open-app payloads. Resolve the allowlist warning for the OneLink-only desktop fallback.
6. Only after those journeys pass, publish all tools. Save the RC/AF reports above and change the dashboard note from pending to verified with date and release versions. Submit the sitemap in Search Console if available.
7. Record launch baseline and actual launch date: organic impressions/clicks by tool+locale, consented usage, download clicks, AF attributed installs, RC trial conversion/payers/revenue/refunds. Compare after 30/60/90 days with consistent date basis, production/QA exclusions and consent caveats. No traffic or ranking promise.

### Automated / browser checks completed

`npm run verify` includes contrast, blog content checks, Astro typecheck/build, copy/download URL validation, SEO, growth tests, locale tests and ten tool tests. Tests cover all 72 tool pages, 12 noindex QR pages, locale schema parity, midnight/decimal calculations, caffeine decay, non-offset sleep debt, timestamp suspension/pause/resume/cancel and analytics sanitization. Browser checks covered pointer/keyboard calculations, timer start/pause/resume/stop, Arabic at 390px with no horizontal overflow, mobile menu Escape, and QR page context. Browser limitations (blocked audio, denied wake lock and locked-phone alarms) are handled in code, but are not claimed as real-device end-to-end tests.

Native test evidence: `/tmp/wakesharp-native-ios.log`, `/tmp/wakesharp-native-android.log`. Screenshot: `docs/evidence/caffeine-calculator.png`. No native code was changed, no purchases were initiated, no production deployment was performed.
