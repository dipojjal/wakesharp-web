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
| `npm run contrast` | Walks all 12 sunrise bands at 21 interpolated steps and fails if any tone's text, dim or accent colour drops below WCAG AA. Lighthouse **cannot** catch this — its contrast audit skips text sitting on a gradient. |
| `npm run build` | `astro check` (typecheck) then the static build. |
| `npm run copy` | Greps `dist/` for marketing claims the app doesn't actually make good on, for un-scoped platform claims ("Focus" without naming iOS), and for store links that shouldn't exist yet. |

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

## Launching

When the App Store and Play listings go live, edit **`src/config/site.ts`** only: set
each store's `state` to `'live'` and paste its real URL. `StoreButtons`, the JSON-LD
and the footer all read from that one file.

Until then the buttons are custom-styled pills that anchor to `#features`. They are
deliberately **not** the official Apple/Google badges: that artwork is licensed for
apps that are actually on the store, and a "Download on the App Store" button that
scrolls the page instead of downloading is deceptive UI. See the comment at the top of
`src/components/StoreButtons.astro`.

## Structure

```
src/
├─ config/
│  ├─ site.ts        ← the one file to edit on launch day
│  └─ sunrise.ts     ← the night→morning gradient ramp + per-tone ink
├─ styles/global.css ← brand tokens ported from the app's Palette.swift
├─ layouts/          ← BaseLayout, LegalLayout
├─ components/       ← Header, Footer, SunriseSection, PhoneFrame, Lark, …
├─ pages/            ← index, privacy, terms, support, 404
└─ assets/           ← screens/, store/, mascot/  (generated, committed)
scripts/             ← prep-assets, build-og, check-contrast, check-copy
```

## Licence

Source-available, not open source — see [LICENSE](LICENSE) and
[THIRD-PARTY.md](THIRD-PARTY.md). The Lark and the app screenshots are not openly
licensed.
