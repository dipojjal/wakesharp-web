# WakeSharp website refresh follow-up, October 12, 2026

Review window: September 28 to October 11, 2026, inclusive. This is the scheduled two-week review. The four-week review remains scheduled for October 26.

## Findings

### Public release and website copy

The official US App Store lookup for listing `id6801198703` reports version 2.17, with a current version release date of October 7, 2026. The public listing is downloadable. This confirms that 2.14 is no longer awaiting release, but the website now needs to describe the current public version rather than presenting 2.14 as the latest version. The September 28 baseline document and multiple current site passages still say 2.14 is the live version. Update shared product facts, metadata, localized home and support copy, comparison content, press-kit copy, and the Turkish troubleshooting article against the verified current app behavior.

Do not remove preview labels solely based on the old 2.14 status. Confirm each label against the latest public build and remove or replace it where the feature is now public. Keep Squats excluded from the public mission directory and promotional mission claims while its production visibility gate remains closed. The App Store version history mentions Squats as an unlock, which is not evidence that it is generally visible to all users.

### Turkish troubleshooting article

`https://wakesharp.app/tr/blog/iphone-alarm-didnt-go-off-causes` returned HTTP 200 when opened on October 12. It has a useful Turkish title and readable body, a September 28 modification date, internal links to the feature directory, and the current public mission guidance. Its copy still refers specifically to iPhone 2.14 in the live-release notice and mission paragraph. Update those references to the current release or use version-independent wording after checking the claims against the latest app. This direct fetch does not reveal Search Console's current indexing status.

### Localized feature pages

The available authenticated Search Console and analytics interfaces did not return live page-level data during this review. The browser fetcher could not open several localized feature URLs, so their live HTTP status and hreflang relationships could not be independently rechecked here. The September 28 production crawl remains the latest complete evidence: 285 sitemap URLs and 292 total URLs checked, with all expected pages returning HTTP 200 and no canonical or indexing failures. Treat the October 12 localized-page state as unverified, not as a regression. Recheck the full localized feature set and reciprocal hreflang during the four-week review.

### Search Console

Current indexing counts, nonbrand impressions, organic landing pages, and recent query performance were unavailable. The last recorded Search Console baseline remains September 17–26: 205 impressions, one click, 0.5% CTR, and average position 31.7. The September 20 indexing snapshot showed 55 indexed pages and five exclusions, and the refreshed sitemap was successfully processed on September 27. These are historical baseline values, not measurements for the post-launch period. No traffic or indexing regression can be concluded from missing current data.

### PostHog and download attribution

The current PostHog query could not run because the connected tool required approval that is unavailable in this environment. Therefore, this review has no post-launch organic landing-page counts, website download-click totals, or attributed install/conversion counts. The site code records `website_download_clicked` with page, placement, and locale, while actual app attribution is a separate downstream measure. A download click must not be reported as an install. In the earlier schema check, `$pageview` and `$web_vitals` were not observed in the preceding 30 days; check the configured consent flow and event ingestion before interpreting an empty pageview or download report as zero demand.

### Vercel

Vercel shows the current production deployment as READY on the `main` branch at commit `450afa43603ace238f01755348ac7efc0d7e9543` (`Use branded AppsFlyer domain for website downloads`). The deployment history includes the production release of the refresh. No deployment failure was observed. This does not substitute for a fresh sitemap crawl or Search Console inspection.

## Actions for the October 26 review

1. Obtain Search Console indexing and performance data for September 28 through the latest complete date. Compare nonbrand impressions and organic landing pages with the September 17–26 baseline, while accounting for the small pre-launch sample.
2. Query PostHog for `website_download_clicked` by page, placement, locale, and referrer/source if recorded. Separately verify downstream AppsFlyer-attributed installs and conversion events. First confirm that website pageview and click events are being ingested under the user's consent configuration.
3. Recheck the Turkish article's indexing status and all localized feature URLs, canonical tags, reciprocal hreflang, sitemap inclusion, and HTTP status.
4. Confirm the live iPhone version and any Android release differences before updating version language or removing any remaining preview notice.
5. Keep Squats out of general public mission lists unless production visibility has changed for all users.

## Sources

- Official US App Store listing: https://apps.apple.com/us/app/loud-alarm-clock-wakesharp/id6801198703
- Official App Store lookup: https://itunes.apple.com/lookup?id=6801198703&country=us
- Turkish troubleshooting article: https://wakesharp.app/tr/blog/iphone-alarm-didnt-go-off-causes
- Baseline and launch crawl: [website-refresh-2026-09-28.md](./website-refresh-2026-09-28.md)
