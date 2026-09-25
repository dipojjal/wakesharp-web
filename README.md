# wakesharp.app

The marketing site for **WakeSharp**: the alarm that wakes you up *sharp*, not just
awake. Static Astro, deployed on Vercel.

The app itself lives in a separate private repo (iOS + Android).

## Why this repo exists

Beyond marketing, this site is a **release dependency** for both apps. Their paywall
screens hardcode two URLs:

```
https://wakesharp.app/privacy
https://wakesharp.app/terms
```

Those exact paths must return **200 with no redirect**. `astro.config.mjs` sets
`trailingSlash: 'never'` and `build.format: 'file'` for that reason, and
`vercel.json` sets `cleanUrls`. Don't change either without re-checking those two
URLs: a redirect hop there sits on an App-Review-critical path.

`https://wakesharp.app/support` is the App Store Connect Support URL.

## Develop

```bash
npm install
npm run dev
```

## Verify

```bash
npm run verify     # contrast + typecheck + build + copy rules
```

Individually:

| Command | What it checks |
|---|---|
| `npm run contrast` | Walks all 15 sunrise bands at 21 interpolated steps and fails if any tone's text, dim or accent colour drops below WCAG AA. Bands marked `cards: true` are walked twice, once on the raw band and once through the translucent card fill they carry: a card grid lightens its background by 6%, which is enough to fail `dim` on the darker stops. Lighthouse **cannot** catch any of this: its contrast audit skips text sitting on a gradient. |
| `npm run build` | `astro check` (typecheck) then the static build. |
| `npm run copy` | Greps `dist/` for marketing claims the app doesn't actually make good on, for un-scoped platform claims ("Focus" without naming iOS), for unfilled `[[PLACEHOLDER]]`s, and for any store link that isn't one of the two canonical listing URLs. It also fails if *no* page links a listing at all, so the site can never silently regress to its pre-launch state. On the localized pages it checks each locale's own seed list of prohibited claims instead, and it fails if an enabled locale is only partly built, lacks `<html lang>` or the x-default hreflang link, or still carries an English sentence verbatim. The `/c` and `/p` share-link decoders must be `noindex` with no hreflang in every language, because a rewrite serves each of them for an unbounded set of URLs. |
| `npm run i18n:test` | The rich-text parser, the URL helpers and a structural diff of every registered catalog against the English one (keys, array lengths, `{placeholders}`, link keys, balanced markup). |
| `npm run posts` | Every post under `src/content/blog/` against the authoring contract in `docs/blog-schedule.md`: frontmatter, dates with offsets, hero paths, locale placement, and the no-dash gate. Runs before the build, so a bad post fails fast. |
| `npm run seo` | What search engines read on every built page: a `<title>` of at most 60 characters and a description of 70–160 (Japanese, Hindi and Arabic exempt from the lengths), exactly one `<h1>`, a canonical naming the page itself (the localized legal wrappers excepted), an `og:image`, JSON-LD that parses, noindex on the pages that must never be indexed, a sitemap listing exactly the indexable pages, and no internal link to a page that was not built. Warns by default; `-- --strict` fails. |

## The contact form

`/contact` is a plain HTML form that POSTs to **`api/contact.ts`** and gets a 303 back to
`/contact-sent` or `/contact-error`. No client-side JavaScript is involved, which is the
whole point of doing it this way.

`api/` at the repo root is a **Vercel** convention, not an Astro one: Vercel builds it
with `@vercel/node` alongside Astro's static `dist/`, so `output: 'static'` stays adapter-free
and `npm run verify` keeps working. Astro never sees the file, but `tsconfig.json` includes
`**/*`, so `astro check` **does** typecheck it and a type error there fails `npm run build`.

Two consequences worth remembering:

- **`npm run dev` cannot serve `/api/contact`.** `astro dev` knows nothing about `api/`.
  Use `npx vercel dev` to exercise the round trip locally.
- The endpoint needs `RESEND_API_KEY` (see `.env.example`). It is server-side only: never
  give it a `PUBLIC_` prefix, which is what Astro exposes to the browser bundle.

Mail is sent through Resend from `support@wakesharp.app` back to the same mailbox, with
`Reply-To` set to the submitter, and the submitter gets a short static acknowledgement
from the same address. The From address must stay on the Resend-verified domain
(`wakesharp.app`): using the submitter's address there fails DMARC alignment and gets the
mail quarantined. Resend's Return-Path/bounce records live on the `send.` subdomain, so
its MX never collides with the root MX that carries the `support@` mailbox.

## Assets

Images are derived from the app repo's `Design/` folder and committed here as
web-sized derivatives:

```bash
WAKESHARP_DESIGN_DIR=../WakeSharp/Design npm run assets:prep
python3 scripts/build-og.py     # regenerates public/og.png
```

`src/assets/` holds 1000px-wide derivatives. **It is not a backup** of the app repo's
originals: those are gitignored there and live only on the author's machine and in a
separate archive. Don't treat this repo as the system of record for screenshots.

## Store state

Both apps are live: Google Play since 2026-08-18, the App Store since 2026-08-22, both
as *WakeSharp: Math Alarm Clock* from KineticBit Inc.

The two listing **names have since changed**: verified 2026-09-24, the App Store reads
*Loud Alarm Clock - WakeSharp* and Play reads *WakeSharp: Loud Alarm Clock*.
`itunes.apple.com/lookup?id=6801198703&country=us` settles the Apple half with no credential.
Re-read both before quoting either name.

Since 2.10 the app is sold only as **WakeSharp Unlimited** (a 7-day free trial of the yearly plan,
or monthly with no trial), with no free tier and no ads; Lifetime is no longer sold. The prices
live in `SITE.unlimited`, and every page that states the trial states the price after it.

**`src/config/site.ts` is the only file to edit when that changes.** `StoreButtons`, the
JSON-LD, the Smart App Banner, the footer and the install CTAs on `/c`, `/p` and `/404`
all read from it. If a listing is ever pulled, set that store's `state` back to
`'coming-soon'`: the badges revert to custom pills and every store link disappears in the
same build. `npm run copy` enforces the pairing in both directions.

The buttons are the official Apple and Google badge artwork, served byte-identical from
`public/badges/` with no image pipeline: both vendors forbid modifying it, and not
processing it is the surest way not to. `src/components/StoreButtons.astro` records the
sizing maths (the two files bake in different clear space) and why the pills existed
before launch.

## Where the copy comes from

The **app repo is authoritative, not the live store description**. When a claim on this site
needs settling, read:

- `Docs/marketing-execution/claims-matrix.md`which claims are Supported, Qualified or
  Prohibited, with the approved wording for each. It is the reason the site has no free tier,
  no Strict Mode and no "Plus", and why Do Not Disturb always comes with "when it allows alarms".
- `ios/Packages/WakeSharpKit/Sources/WSGames/Resources/GameCatalog.json`every mission and
  warm-up game, and the one-line `blurb` for each, which the homepage uses verbatim.
- `Docs/store-metadata/listings.json`the store copy per locale, and the app's localized plan
  and feature names, which the `es`, `ru`, `tr`, `de`, `fr` and `ar` pages reuse.

The site describes only what holds for the build a reader downloads today and for the next one,
so it names missions by kind and never how the alarm comes back after a snooze.
`scripts/check-copy.mjs` encodes the decisions that came out of that reading, with the source
that settles each one in its `why` string.

## Structure

```
src/
├─ config/
│  ├─ site.ts        ← store state, pricing, publisher, governing law
│  └─ sunrise.ts     ← the night→morning gradient ramp + per-tone ink
├─ styles/global.css ← brand tokens ported from the app's Palette.swift
├─ i18n/             ← config.ts (the locale registry), one catalog folder per
│                      language (en/ is the schema), rich.ts + Rich.astro
├─ templates/        ← the pages themselves, one per Tier A page, locale-agnostic
├─ layouts/          ← BaseLayout, LegalLayout
├─ components/       ← Header, Footer, LanguageMenu, SunriseSection, Lark, …
├─ pages/            ← English mounts of the templates at the root, plus
│  └─ [lang]/          the same pages for every other enabled locale
└─ assets/           ← screens/, store/, mascot/  (generated, committed)
public/badges/       ← official App Store / Google Play artwork, unmodified
scripts/             ← prep-assets, build-og, check-contrast, check-copy
api/contact.ts       ← Vercel function, not Astro: see "The contact form"
```

## Languages

The site ships in English at the root, un-prefixed, plus every locale flagged `enabled` in
`src/i18n/config.ts`, each under `/<path>/…` (`/es/support`). Copy lives in typed catalogs under
`src/i18n/<code>/`; `src/i18n/en/` is the schema, and a translation ends every file with
`satisfies typeof en.<file>`, so a missing or extra key fails `astro check`. Pages are templates in
`src/templates/`, mounted once by `src/pages/*.astro` for English and once by
`src/pages/[lang]/*.astro` for everything else.

The privacy policy and the terms stay English and binding: both apps hardcode their English URLs.
`/<locale>/privacy` and `/<locale>/terms` wrap the English body under a translated notice and
canonicalize to the English page, so the language selector never dead-ends.

There is no Accept-Language redirect, and there must never be one: App Review and search engines
fetch the English paths, and a redirect would put a hop on `/privacy`. The header `<details>`
menu and the footer list are plain links.

To add a language: copy `src/i18n/en/` to `src/i18n/<code>/` and translate it following
`docs/i18n/glossary.md`; run `npx tsx scripts/check-i18n.mjs <code>` until it passes; register the
catalog in `src/i18n/catalog.ts`; flip `enabled` in `src/i18n/config.ts`; add the path to the two
`/:lang(…)` rewrites in `vercel.json`; `npm run verify`. Translated posts live under
`src/content/blog/<locale path>/<slug>.md` with `lang` set; a locale gets its own `/<path>/blog` index
once it has one, and the header's Blog link follows.

## Licence

Source-available, not open source: see [LICENSE](LICENSE) and
[THIRD-PARTY.md](THIRD-PARTY.md). The Lark and the app screenshots are not openly
licensed.

## Vercel project settings

`RESEND_API_KEY` must exist under Settings → Environment Variables for Production, Preview
and Development, or `/contact` sends every submission to `/contact-error`.

The framework preset is pinned in-repo: `vercel.json` sets `"framework": "astro"` (output
`dist`), which overrides the dashboard. The project was first created by `vercel link`,
which does not detect the framework: it was left as "Other", whose default output
directory is `public/`, and a git-triggered build would have served the wrong directory.

`vercel.json` also sets `"buildCommand": "npm run verify"`, so every deploy (production,
previews, Dependabot, the scheduled blog routine) runs the contrast walk, the typecheck,
the copy rules and both test suites. A failure fails the deploy and the previous one stays
live, which is the point: nothing else gates a push to `main`.

The project's own `wakesharp-web.vercel.app` alias 308s to `https://wakesharp.app` for
every path except `/api/`, `/.well-known/` and `/_vercel/` (the daily cron request to
`/api/internal/referrals/prune` must never meet a redirect, whichever host it uses), and
any `*.vercel.app` host answers with `X-Robots-Tag: noindex`, so preview deployments stay
out of search too.
