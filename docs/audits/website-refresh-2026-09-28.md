# WakeSharp refresh and SEO audit

Audit and implementation date: September 28, 2026 (America/Toronto).

## Release facts

The website presents an explicitly labeled preview of iPhone 2.14, build 262, submitted to App Store Connect and waiting for review. The public US App Store listing still shows 2.10. Android availability is qualified separately. Do not remove preview notices until the public listing and downloadable app have been checked.

The public directory uses stable IDs and production visibility, not `supportsMission`. It includes 13 missions plus Surprise Me. Squats is excluded because `DeviceValidation.squatsReleased` is false. Serial Sevens is retired and migrates to Math Problems in the app. Word Dash and Reaction Tap appear only as warm-up games.

The source of the assets is `WakeSharp/Design/Store/2.14`, revision 2. `src/data/store-2.14.json` records source paths, SHA-256 checksums, language, platform, order, caption keys and dimensions. The importer verifies the submitted checksums before copying. It imports 56 iPhone store frames, three submitted English Watch frames, and 56 clean feature captures. It does not substitute unsubmitted localized Watch artwork.

## Implemented

- The homepage now leads with Loud tones, Scan an Object and the complete public mission directory. It preserves Lark and the continuous sunrise palette.
- All eight iPhone images appear in order. The Watch section uses all three submitted Watch images with accurate captions. Seven languages use matching iPhone artwork. The other five use English artwork with localized captions and an explanation.
- Responsive AVIF/WebP images have explicit dimensions. The hero is eager and prioritized; subsequent images are lazy loaded. Image links open a larger version without JavaScript. With JavaScript, native dialogs support Escape and restore focus. Gallery links support arrows, Home and End, with RTL-aware navigation. Both galleries remain visible, avoiding the former incomplete tab pattern.
- Nine feature pages and a feature hub are available in all 12 languages. Existing English URLs remain unchanged. Localized routes have self-canonicals, reciprocal hreflang and sitemap entries. Links from mission cards use stable IDs.
- Product copy reconciles Loud, object scanning, retired math/voice names, Watch behavior, daily Sharpness, optional warm-ups, and optional cloud backup. The original uncommitted privacy changes are retained. Only the retired mission name was additionally corrected in the privacy body.
- Research article URLs and original publication dates remain intact. Changed product passages have a September 28 modification date. The Turkish iPhone troubleshooting article links to the localized feature directory and remains at its existing URL and canonical.
- The comparison uses current official Alarmy sources with a checked date and platform qualifications. Volatile rating totals and unverified advertising/price-range claims were removed. `/press` provides factual product information and submitted artwork.
- `npm run seo` now runs with `--strict`. Vercel's existing `npm run verify` deployment command also runs new product checks. These reject missing artwork, incorrect mission visibility, missing locales, missing preview labels and lost attribution.
- The first deployment was blocked by the strict SEO check because its old link allowlist did not recognize the press-kit icon download. The checker now verifies linked files in the build output, including gallery assets. A regression test confirms that the same link fails if its file is missing.
- Visible text, metadata, captions, alt text and structured-data descriptions are checked for em dashes.
- Download attribution now carries the actual feature, article or tool page into the existing AppsFlyer flow. Previously these links rendered `data-page="home"` on other page families. A regression check covers the HTML fallback as well as existing routing tests.
- Language-switch links use system fonts, avoiding unnecessary Arabic and Cyrillic downloads on English pages. Download buttons on the legal reading surface now keep their intended contrast.

## Findings and disposition

| Priority | Finding | Resolution or required follow-up |
| --- | --- | --- |
| High | Outdated homepage omitted prominent Loud/object-scan explanations | Rebuilt and linked directly after the hero |
| High | Old seven-frame gallery hid pricing-obsolete screenshots | Replaced with the submitted eight iPhone and three Watch frames |
| High | Mission inventory contained retired names and could include gated catalog entries | Stable public facts, localized directory, production-gate regression checks |
| High | Retired tone and Watch claims, and score described only as a warm-up result | Rewritten with explicit iPhone 2.14 preview scope |
| High | Backup/privacy claims conflated on-device processing with no uploaded photo data | Clarified optional thumbnail backup and deletion behavior; preserved privacy edits |
| High | Downloads from features/articles/tools were attributed to the homepage | Explicit page IDs now travel through shared download controls |
| Medium | English-only feature destinations | 108 feature pages plus 12 hubs, localized metadata and reciprocal language links |
| Medium | SEO warnings did not block deploys | Strict gate in the deployment verification command |
| Medium | Incomplete gallery tab keyboard behavior | Two independent rails with native links, keyboard navigation and accessible enlargement |
| Medium | Unmeasured performance | Eight Lighthouse runs completed; table below. Field INP still unavailable |
| Medium | Extra font downloads slowed initial rendering | System-font language labels reduced mobile homepage LCP from 3.2 to 2.1 seconds locally |
| Medium | Feature download button failed contrast | Fixed CSS selector specificity; accessibility now scores 100 in all audited templates |
| Medium | Turkish troubleshooting page crawled but unindexed | Refreshed product paragraphs and local links; request indexing after deployment |
| Medium | Concentrated backlinks and historical “free forever” anchors | Separate external-copy brief prepared. No third-party pages edited and no outreach sent |
| Low | Software-app rich result lacks qualifying review/rating | Retain truthful application markup. Do not invent or import store ratings |
| Low | Existing deprecated `navigator.platform` browser-detection hint | Non-blocking type-check hint. Existing iPad routing is preserved |

## Crawl and Search Console baseline

The pre-refresh crawl covered 192 live pages, including every one of the 170 sitemap URLs, without page-fetch failures or broken internal anchors. Checked pages had titles, descriptions, one H1, self-canonicals where appropriate, image alt text and reciprocal language links. HTTPS and canonical-domain redirects worked, unknown routes returned 404, and utility pages carried noindex.

The initial build contained 253 pages. The refreshed site contains 368 pages, including the new press page. The legal endpoints `/privacy`, `/terms`, `/support` and `/account/delete` must continue to return HTTP 200 directly. Utility routes, download pages and share decoders remain excluded from the sitemap.

Search Console's available September 17–26 data showed 205 impressions, one click, 0.5% CTR and average position 31.7. This is a small baseline, not evidence of declining traffic. Keyword priorities reflect relevance and observed queries; search volume and difficulty have not been established.

The September 20 indexing snapshot showed 55 indexed pages and five exclusions: three redirects, RSS and the Turkish article. This is not evidence that 115 URLs in the newer sitemap failed indexing. Google reported successful processing of the 170-URL sitemap on September 27. No manual actions or security issues were reported.

The Turkish article inspection showed a successful mobile fetch, crawl and indexing allowed, matching declared/selected canonical, and a September 16 crawl. Its existing URL is retained. Indexing remains Google's decision.

A fresh GET audit of 215 distinct external links returned 101 HTTP 200 responses, 49 HTTP 203 responses from an intermediary, 62 HTTP 403 responses and three HTTP 503 responses. No 404 or 410 response was observed. Blocking and intermediary responses remain inconclusive rather than being labeled broken. Details: [external GET results](./external-links-2026-09-28.json).

## Performance and verification

Lighthouse 13.5.0 against the production build served locally, default mobile simulation and desktop preset. These are lab measurements, not real-user Core Web Vitals. All eight runs have zero measured total blocking time. This does not establish INP.

| Page | Mobile performance | Mobile LCP | Mobile CLS | Desktop performance | Desktop LCP | Desktop CLS |
| --- | --- | --- | --- | --- | --- | --- |
| Homepage | 99 | 2.1 s | 0 | 100 | 0.5 s | 0.009 |
| Object-scan feature | 99 | 1.8 s | 0.001 | 100 | 0.4 s | 0.005 |
| iPhone troubleshooting article | 100 | 1.1 s | 0.001 | 100 | 0.4 s | 0.007 |
| Sleep calculator | 99 | 1.7 s | 0 | 100 | 0.4 s | 0.001 |

All eight scored 100 for accessibility and SEO. Best practices scored 96 because the local server does not serve Vercel's analytics script. The production endpoint was subsequently verified as HTTP 200. The live homepage scored 100 for performance, accessibility, best practices and SEO, with mobile LCP 1.8 seconds, CLS 0.005 and TBT 0 ms. Machine-readable results: [Lighthouse summary](./lighthouse-2026-09-28.json).

Validation includes Astro type checking, all blog checks, copy checks, strict SEO checks, gradient contrast sampling, catalog parity, growth/referral checks, tool calculations/routing and product checks. Arabic was inspected at 390 px: RTL, 14 mission entries, 11 screenshot links and no document overflow. The Turkish article was inspected at the same width. Gallery arrows, Enter, Escape and focus restoration were exercised in the browser.

## Search intent map

| Intent | Destination |
| --- | --- |
| Heavy sleepers; loud alarm app | `/` |
| Mission alarm; alarm that makes you get up | `/features` |
| Super loud tones | `/features/loud-alarm-clock` |
| Scan an object alarm | `/features/object-scan-alarm` |
| Photo alarm | `/features/photo-alarm-clock` |
| Math alarm | `/features/math-alarm-clock` |
| Puzzle alarm | `/features/puzzle-alarm-clock` |
| Walking alarm | `/features/walking-alarm-clock` |
| Shift work alarm | `/features/shift-work-alarm-clock` |
| Calendar alarm | `/features/calendar-alarm-clock` |
| Sharpness Score | `/features/sharpness-score` |
| iPhone alarm not going off | Existing iPhone troubleshooting article |
| Silent / Do Not Disturb | Existing Silent / DND article |
| Alarmy alternative | `/compare/wakesharp-vs-alarmy` |

## Deployment and production verification

The refresh is live at [wakesharp.app](https://wakesharp.app). Vercel marked [deployment 86C85DDdtwXHePehWgjFcVAzrQw5](https://vercel.com/kineticbit/wakesharp-web/86C85DDdtwXHePehWgjFcVAzrQw5) ready for production from content commit `4286fcc`. The full verification command passed, including 74 tests and strict SEO across 368 built pages.

The post-deployment crawl checked all 285 sitemap URLs plus utility and app-link routes, 292 distinct URLs in total. Every expected page returned HTTP 200, the deliberate unknown route returned 404, all 114 distinct homepage image URLs returned 200, and no canonical, indexing, mission, screenshot or retired-copy failure was found. All 12 homepages contain 14 directory entries and 11 screenshot links with preview notices. `/privacy`, `/terms`, `/support` and `/account/delete` return 200 directly. Details: [production checks](./production-2026-09-28.json) and [live homepage screenshot](./homepage-live-2026-09-28.png).

Search Console resubmission and individual indexing requests are still pending. The Mac locked during the deployment, preventing access to the signed-in Search Console tab. The user was asked to unlock it. No indexing request or new sitemap submission is claimed as completed.

Two follow-up reviews were scheduled in this chat for October 12 and October 26 at 9 a.m. local time. They cover indexing, nonbrand impressions, organic landing pages, download conversions and release availability.

## Remaining follow-up

1. Once Search Console access resumes, submit the changed sitemap and request indexing for the homepage, feature hub, four new features and Turkish article. Record any quota or account limitation; do not claim indexing is guaranteed.
2. Complete the scheduled two-week and four-week reviews. Account for sparse baseline data.
3. Remove preview labels only after confirming public 2.14 availability. Keep the gated mission excluded until its production gate is deliberately removed.
4. Refresh external placements with the separately prepared copy. Publish no outreach automatically.

## Primary references

- [Google software-app structured data requirements](https://developers.google.com/search/docs/appearance/structured-data/software-app)
- [Google Search documentation updates](https://developers.google.com/search/updates), including the retirement of FAQ rich results
- [Alarmy official website](https://alar.my/en)
- [Alarmy US iPhone listing](https://apps.apple.com/us/app/alarmy-loud-alarm-clock/id1163786766)
- [WakeSharp US iPhone listing](https://apps.apple.com/us/app/loud-alarm-clock-wakesharp/id6801198703)
- [Search Console performance](https://search.google.com/search-console/performance/search-analytics?resource_id=sc-domain%3Awakesharp.app)
