# wakesharp.app

The marketing site for **WakeSharp** — the alarm that wakes you up *sharp*, not just
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
URLs — a redirect hop there sits on an App-Review-critical path.

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
| `npm run contrast` | Walks all 15 sunrise bands at 21 interpolated steps and fails if any tone's text, dim or accent colour drops below WCAG AA. Bands marked `cards: true` are walked twice, once on the raw band and once through the translucent card fill they carry — a card grid lightens its background by 6%, which is enough to fail `dim` on the darker stops. Lighthouse **cannot** catch any of this — its contrast audit skips text sitting on a gradient. |
| `npm run build` | `astro check` (typecheck) then the static build. |
| `npm run copy` | Greps `dist/` for marketing claims the app doesn't actually make good on, for un-scoped platform claims ("Focus" without naming iOS), for unfilled `[[PLACEHOLDER]]`s, and for any store link that isn't one of the two canonical listing URLs. It also fails if *no* page links a listing at all, so the site can never silently regress to its pre-launch state. |

## The contact form

`/contact` is a plain HTML form that POSTs to **`api/contact.ts`** and gets a 303 back to
`/contact-sent` or `/contact-error`. No client-side JavaScript is involved, which is the
whole point of doing it this way.

`api/` at the repo root is a **Vercel** convention, not an Astro one — Vercel builds it
with `@vercel/node` alongside Astro's static `dist/`, so `output: 'static'` stays adapter-free
and `npm run verify` keeps working. Astro never sees the file, but `tsconfig.json` includes
`**/*`, so `astro check` **does** typecheck it and a type error there fails `npm run build`.

Two consequences worth remembering:

- **`npm run dev` cannot serve `/api/contact`.** `astro dev` knows nothing about `api/`.
  Use `npx vercel dev` to exercise the round trip locally.
- The endpoint needs `RESEND_API_KEY` (see `.env.example`). It is server-side only — never
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
originals — those are gitignored there and live only on the author's machine and in a
separate archive. Don't treat this repo as the system of record for screenshots.

## Store state

Both apps are live — Google Play since 2026-08-18, the App Store since 2026-08-22, both
as *WakeSharp: Math Alarm Clock* from KineticBit Inc.

The two listing **names have since diverged**: verified 2026-08-30, the App Store reads
*WakeSharp: Loud Alarm Clock* (2.1, released 2026-08-26) while Play still reads *WakeSharp:
Math Alarm Clock*. `itunes.apple.com/lookup?id=6801198703&country=us` settles the Apple half with
no credential. Re-read both before quoting either name.

**`src/config/site.ts` is the only file to edit when that changes.** `StoreButtons`, the
JSON-LD, the Smart App Banner, the footer and the install CTAs on `/c`, `/p` and `/404`
all read from it. If a listing is ever pulled, set that store's `state` back to
`'coming-soon'`: the badges revert to custom pills and every store link disappears in the
same build. `npm run copy` enforces the pairing in both directions.

The buttons are the official Apple and Google badge artwork, served byte-identical from
`public/badges/` with no image pipeline — both vendors forbid modifying it, and not
processing it is the surest way not to. `src/components/StoreButtons.astro` records the
sizing maths (the two files bake in different clear space) and why the pills existed
before launch.

## Where the copy comes from

The **app source is authoritative, not the live store description** — the App Store text
is an older draft that still says "all five games on a daily rotation", which the app's
own paywall retired on 2026-08-16. When a claim on this site needs settling, read:

- `ios/Packages/WakeSharpKit/Sources/WSGames/GameRegistry.swift` — how many warm-up games
  exist, how many a Plus morning runs, and which are free.
- `ios/WakeSharp/Features/Paywall/PaywallView.swift` — the five Plus gates, verbatim. The
  site's `plusFeatures` list mirrors it so the two can never contradict each other in
  front of a reviewer.

`scripts/check-copy.mjs` encodes the decisions that came out of that reading, with the
constant or file that settles each one in its `why` string.

## Structure

```
src/
├─ config/
│  ├─ site.ts        ← store state, pricing, publisher, governing law
│  └─ sunrise.ts     ← the night→morning gradient ramp + per-tone ink
├─ styles/global.css ← brand tokens ported from the app's Palette.swift
├─ layouts/          ← BaseLayout, LegalLayout
├─ components/       ← Header, Footer, SunriseSection, PhoneFrame, Lark, …
├─ pages/            ← index, privacy, terms, support, contact(+sent/error),
│                      c, p, 404
└─ assets/           ← screens/, store/, mascot/  (generated, committed)
public/badges/       ← official App Store / Google Play artwork, unmodified
scripts/             ← prep-assets, build-og, check-contrast, check-copy
api/contact.ts       ← Vercel function, not Astro — see "The contact form"
```

## Licence

Source-available, not open source — see [LICENSE](LICENSE) and
[THIRD-PARTY.md](THIRD-PARTY.md). The Lark and the app screenshots are not openly
licensed.

## Vercel project settings

`RESEND_API_KEY` must exist under Settings → Environment Variables for Production, Preview
and Development, or `/contact` sends every submission to `/contact-error`.

The framework preset is pinned in-repo: `vercel.json` sets `"framework": "astro"` (build
`astro build`, output `dist`), which overrides the dashboard. The project was first
created by `vercel link`, which does not detect the framework — it was left as "Other",
whose default output directory is `public/`, and a git-triggered build would have served
the wrong directory.
