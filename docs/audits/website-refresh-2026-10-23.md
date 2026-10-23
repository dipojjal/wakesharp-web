# WakeSharp website refresh, October 23, 2026

The site described app version 2.14 as live on both stores. This refresh brings it to the apps as they are and adds the "As seen on" badge. Everything below was checked on October 22 and 23, 2026.

## What the stores serve

| Store | Version | Evidence |
| --- | --- | --- |
| App Store | **2.25**, released 2026-10-21 10:26 UTC; "minor UI & UX bug fixes"; rating 4.0 from 4; iOS 26.0+ | `itunes.apple.com/lookup?id=6801198703&country=us`, read 2026-10-22 |
| Google Play | **2.9**, updated 2026-09-11; "50+" downloads | The listing, read 2026-10-22; app repo `Docs/PLAY-STORE-METADATA.md:3-10` (2.14 was prepared, never submitted; the upload key was lost 2026-09-23); `Docs/BILLING-AUDIT-2026-10-20.md:7` |

The App Store listing's screenshots are still the 2.14 revision 2 set (frame 01 shows the Lark, not the press badge; the 2.19 badge gallery in `Design/Store/2.18/` was never uploaded, README "Pending"), so `src/data/store-2.14.json` and its PNGs stay.

Owner decision (2026-10-22): name both versions. The release notice reads "2.25 is live on the App Store. Google Play has version 2.9, so some features described here are iPhone-only for now", and Squats, Push-ups, group alarms and the 30-second re-ring carry an iPhone mark wherever they appear.

## Claims changed, with their sources in the app repo

| Claim | Was | Now | Source |
| --- | --- | --- | --- |
| Monthly price | $4.99 | $9.99 (App Store from 2026-10-06, Play from 2026-10-04); yearly $34.99 and the 7-day trial unchanged | `Docs/releases/2.16-paywall-v2.md:184-227`, `Docs/BILLING-AUDIT-2026-10-20.md:139` |
| Missions | 14, Squats hidden | 16 named: Squats public (`DeviceValidation.squatsReleased`, `ReferralReward.missionLockInEffect = false`, server unlock 2026-10-14) and Push-ups (2.18, no gate); "Colour Clash" renamed "Color Clash" (2026-10-16); Scan an Object's blurb | `WSGames/Resources/GameCatalog.json`, `Docs/releases/2.21-owner-changes.md:321-328`, `Docs/releases/2.18-push-ups.md:5-6` |
| Re-ring | one minute, up to an hour | iPhone: "stop it or snooze it and it rings again within 30 seconds, until your mission is done"; Play 2.9: a minute apart, up to an hour | claims matrix row "the wake-up contract" (30 s, no one-hour limit since 2026-09-30); `Docs/PLAY-STORE-METADATA.md:19-25` |
| Easier fallbacks | "falls back to one that can" | a dark room or a refused permission never swaps in an easier mission; only a real fault (no camera, no step counter) hands over to Math Problems | claims matrix row "No easy way out" (owner rule 2026-10-06) |
| Shared alarm | wake-up pact, no account, no server | group alarms: invite link, every phone rings at the same time, the group sees who is up, needs an account, iPhone for now; old `/p` links still open in the app | `Docs/releases/2.23-owner-round.md:95-110`, `Docs/releases/2.18-android-parity.md:133-142,235-241` |
| Names | Smart alarm, Insights | Calendar alarm, Achievements | `Docs/AUDIT-2026-10-16.md:123,197,224` |
| Warm-ups | optional brain warm-ups, three a morning | not offered: the Sharpness warm-up has had no entry point since iOS 2.23; the score comes from missions | `Docs/releases/2.23-owner-round.md:65-68,204-206`; `WarmupFlowViews.swift:56` |
| Account | optional | optional, except for group alarms | `Localizable.xcstrings` "Group alarms need an account so your friends can see you are up." |
| Trial reminder promise | (none on the site) | still none; "we'll remind you" was retired in 2.24 | claims matrix row 59 |
| After access ends | (nothing promised) | still nothing: live 2.24/2.25 keeps ringing alarms set during access; iOS 2.27 and Android 2.18 will stop them, with warnings | `Docs/releases/2.27-alarms-stop-when-access-ends.md` |

Not changed, checked: languages (7), minimum OS (iOS 26, Android 8.0), the listing names, the yearly price and trial, "no ads", Lifetime no longer sold.

## The "As seen on" badge

- Source: the launch announcement ran on 2026-10-08 as a paid press release (Plentisoft, Evertise network). Verified live on 2026-10-22: [Markets Insider](https://markets.businessinsider.com/news/stocks/wakesharp-launches-alarm-clock-app-that-makes-users-scan-household-objects-to-silence-the-alarm-1036609156) ("PRESS RELEASE Plentisoft"; footer: editorial teams not involved), [StreetInsider](https://www.streetinsider.com/Press+Releases/WakeSharp+Launches+Alarm+Clock+App+that+Makes+Users+Scan+Household+Objects+to+Silence+the+Alarm/27165304.html) (Press Releases), [IPS News](https://ipsnews.net/business/2026/10/08/wakesharp-launches-alarm-clock-app-that-makes-users-scan-household-objects-to-silence-the-alarm/) (author Evertise). No apnews.com page was found (web search on "WakeSharp" restricted to apnews.com returned nothing).
- Owner decisions, 2026-10-22, recorded in `src/config/press.ts`: use the supplied logo artwork on the website although the app repo's claims matrix row 35 allows only the outlet's name in WakeSharp's type and does not list the website; keep AP on the badge without a source; translate the label literally; place it on the homepage hero, every download CTA, /press and the footer. These are accepted risks. **The app repo's claims matrix row 35 still needs the website surfaces and this decision added** (left to the owner: that repo's working tree holds uncommitted 2.27 work).
- The wording is only ever "As seen on"; `scripts/check-copy.mjs` bans "featured in", "covered by", "in the press" and the app's localized equivalents. The badge is not a link. `/press` lists the three sources and says the release was paid and that AP has none.
- Artwork: `src/assets/press/as-seen-on-source.png` (the owner's file, 1204 x 280, opaque white) is cut by `scripts/prep-press-badge.mjs` into six transparent pieces (black ink, coverage from the grey), masked with `currentColor` by `src/components/PressBadge.astro`, so the logos take the band's ink. Reproducible byte for byte (checked by running it twice).

## Privacy policy

- New "Group alarms" section and retention bullet, written against `supabase/migrations/20261021220348_wake_groups.sql` (tables, column grants, member_key, 14-day event prune, 30-day single-member prune, `purge_wake_group_memberships` from delete-account), `WSCore/GroupAlarm.swift` (the code and the schedule-only link fragment) and `Docs/releases/2.23-owner-round.md` (no push). "Smart alarm" wording became "calendar alarm". `PRIVACY.lastUpdated` is 2026-10-23.
- **Consent form (UMP) paragraph kept as is.** iOS 2.25 is build 340, from app commit `3828f3074` (2026-10-20 08:09), and the consent-SDK removal is commit `5afbad281` (2026-10-20 20:13), which is not an ancestor of it (`git merge-base --is-ancestor` fails). No later 2.25 build is recorded in `Docs/APP-STORE-METADATA.md`. So the live iPhone app still shows Google's consent form in the regions the paragraph names, and the paragraph stays true for both platforms. Re-check with the build that removes it (2.26 or later).

## Group invite links

`/g/CODE` and `/<lang>/g/CODE` now resolve (app audit ICS-01): `src/templates/GroupPage.astro`, `src/pages/g.astro`, `src/pages/[lang]/g.astro`, rewrites in `vercel.json`, `/g/*` in the AASA, `g` reserved in `src/i18n/config.ts`, noindex and no hreflang like `/c` and `/p` (`check-seo`, `check-copy`, the sitemap exclusions). The page validates the ten-character code (alphabet `23456789ABCDEFGHJKLMNPQRSTUVWXYZ`, any case), shows the schedule from the `#t=HHMM&d=mask` fragment when present, and offers `wakesharp://g/CODE` and the store buttons. Apple's CDN caches the AASA: deploy before the next iOS release.

## How the pages are built now

`scripts/build-feature-pages.mjs` generates the 108 feature pages from `src/data/refresh/<locale>.json` and the `home`/`support` catalogs; `npm run features:check` runs in `verify`. Before switching, the generator was checked against the committed pages: for the untouched locales it reproduced them exactly apart from the stamped `updatedDate`/`release` lines.

## Verification (2026-10-23)

- `npm run verify` passes end to end: contrast walk, 36 posts, `features:check`, `astro check` (0 errors) and the build (380 pages), the copy rules across 380 pages, `seo --strict`, and the growth (49), i18n (25), tools, product (6) and support suites.
- `npm run assets:press` run twice produces identical PNGs (sha256 compared).
- Dev preview, 1280 px and 375 px: the badge is one row with laurels on the homepage hero (night band, light ink), the closing CTA (cream, dark ink), `/download`, the feature pages and `/press`; a 2 x 2 grid of the four logos on phones; compact rows in the footer (night-dim ink) and the blog card. `/es` reads "Visto en", `/ja` "掲載先", `/ar` "كما شوهد على" with the page right-to-left and the logo row kept left-to-right.
- `/g`: a valid code with `#t=0630&d=62` shows "You're invited to a group alarm at 06:30 · Mon Tue Wed Thu Fri", "Open WakeSharp" points at `wakesharp://g/ABCDEFGHJK`, and the language links carry the code and fragment; an invalid code shows the error. Through `vercel dev`: `/privacy`, `/terms` and `/support` answer 200 with no redirect; the AASA lists `/c/*`, `/p/*`, `/g/*`, `/r/*`; `/es/g/abcdefghjk` answers 200. The root `/g/:code` rewrite answers 404 there exactly as the existing `/p/:payload` and `/c/:payload` do (vercel dev proxies the parameter as a query string the Astro dev server cannot route), so it was checked by shape against the `/p` rule that is live in production; confirm `/g/ABCDEFGHJK` on the preview deployment.
- The three press-release pages answered 200 on 2026-10-22 and carry the release text.
- The built site has no "2.14", "$4.99 a month", "Snooze 1 min", "Colour Clash", "Smart alarm" or warm-up promise left; the only "Smart Alarm" is Sleep Cycle's own feature in the comparison post, and "warm-up" survives only in the sentence saying it is not offered.

## Follow-ups

1. App repo: add the website surfaces and the logo decision to claims matrix row 35.
2. Android 2.18 release day: `publicAndroid` in `src/lib/product.ts`, drop the "iPhone for now" qualifiers (grep `for now` across `src/i18n` and `src/data/refresh`), add the "alarms stop when access ends" support answer.
3. New screenshots of the current app once the store artwork is refreshed; the site still shows the 2.14 captures.
4. The App Store rating and the "1K+" users figure are not shown on the site (the Play listing shows "50+", the App Store 4.0 from 4); keep it that way until the counts are large enough to publish with their source.
5. Re-open the three press-release pages before the next refresh (`PRESS.verified`).
