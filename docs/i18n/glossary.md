# WakeSharp website: translation glossary and style sheet

This is the contract for every language the site ships in. The English catalog under
`src/i18n/en/` is the schema; a locale is a mirror of those files with every key
translated. `astro check` fails on a missing or extra key, and `npm run copy` fails on an
English sentence that survived untranslated. Read this whole page before drafting.

## How the catalogs work

- One file per page under `src/i18n/<code>/`: `shell.ts`, `home.ts`, `support.ts`,
  `contact.ts`, `account-delete.ts`, `share.ts`, `legal.ts`, `not-found.ts`, plus an
  `index.ts` that mirrors `src/i18n/en/index.ts`. Every file ends with
  `satisfies typeof en.<name>` so a missing or extra key is reported at the key.
- Strings may use exactly this inline markup and nothing else: `**strong**`, `_em_`
  (underscores at word boundaries), `[label](key)` for a link whose `key` must be kept as
  in English, and `{name}` placeholders that must be kept verbatim. No HTML, no nesting.
- Headings come as `{ pre, accent, post }`: `accent` is the highlighted word. Keep the
  surrounding spaces inside `pre` and `post`; leave a part empty (` `` `) when your
  language needs no text there.
- Arrays may be reordered only where the English comment says the order is not
  load-bearing. The five missions, the pricing feature lists and the FAQ keep their order.
- Register any new locale in `src/i18n/catalog.ts` and flip `enabled` in
  `src/i18n/config.ts`; nothing else is needed to route it.

## Terms that stay in English

Product and feature names are not translated, because the app itself is in English and a
reader has to be able to find the same words on screen. Gloss a feature name in
parentheses the first time it appears on a page when the meaning is not obvious.

| Keep | Meaning, for the gloss |
|---|---|
| WakeSharp, WakeSharp Plus, Plus, Lifetime | the app, its paid tier, the one-time purchase |
| Sharpness, Sharpness Score | the morning score out of 100 against your own baseline |
| the Lark | the mascot bird |
| Mind Games | the arithmetic mission |
| Photo Proof | the photograph mission |
| Scan an Object | the camera-recognition mission |
| Walk It Off | the step-count mission |
| Surprise me / Surprise Me | the randomised mission |
| Strict Mode | four pre-booked re-rings |
| Tighten | the snooze preset that shortens each gap |
| Mind Games, Memory Match, Sequence Recall, Word Dash, Reaction Tap | the five warm-up games. Mind Games, Memory Match and Sequence Recall are also missions, so they appear in both lists |
| Wake with a friend | the shared-alarm feature; a literal row title in the alarm editor on both platforms |
| Beat my wake | the challenge you send after a mission; the app's own share text reads "Beat my wake: 12s on 5 problems" |
| My spots & codes | the registered targets inside Scan an Object |
| Gentle start | the iOS quiet-opening tone option |
| Extra Loud | the Android volume option |
| Alarm reliability | the Settings screen that checks the phone |
| App Store, Google Play, Apple, Google, iPhone, Android, watchOS, Wear OS, AlarmKit, Focus, Do Not Disturb, Silent mode | vendor names and OS features; use the vendor's official localized name where one exists (for example Apple's localized name for Focus and Silent mode, Google's for Do Not Disturb) |

These two are easy to miss because they read like sentences rather than product names, and
every locale translated them before they were listed here. They are shipped English UI: a
reader who was sent a "Beat my wake" link has already seen those exact words in the message,
and "Wake with a friend" is a row they will tap in the alarm editor. Both keep their sentence
case, matching the app.

Store buttons, prices (`$4.99`), the email address and the trademark lines are supplied by
the site and never appear in a catalog.

## Voice

Precise, safety-forward, lightly wry, anti-hype. The English says what the app cannot do
in the same breath as what it can; keep that balance. Prefer short sentences. Never add a
claim that is not in the English, and never drop a qualifier ("where supported", "once you
have granted alarm permission", "it may not ring").

Formality: Spanish `tú`, German `du`, Russian `вы` (lowercase), Turkish `siz`, Ukrainian
`ви`, Portuguese `você`, Indonesian `kamu` is too casual for the legal-adjacent pages so
use `Anda`, French `vous`, Arabic formal register, Japanese です/ます.

Punctuation follows the target language's own conventions (Russian and Spanish dashes,
Spanish inverted marks, French spacing before `:` and `?`, Japanese full-width marks). Do
not copy English quotation marks or apostrophes where your language uses others.

## Claims that must survive translation exactly

These are enforced on the English pages by `scripts/check-copy.mjs` and seeded per locale
in `BANNED_BY_LOCALE` there. They are product truths, not style.

- The alarm can always be dismissed with the phone's own stop button. Never "impossible to
  dismiss", never "won't stop until", never "the only way out". Strict Mode is **four**
  re-rings (45 seconds, then 4, 8 and 12 minutes) and always "where supported".
- "Your alarm rings free, forever. No ads." is the canonical free-tier line. Never "every
  mission is free" or "every alarm and every mission, free forever": five of the seven
  missions are Plus.
- Say "as many alarms as you need", never "unlimited alarms".
- There is no barcode or QR mission. Codes are targets registered inside Scan an Object.
- The app has no sleep tracking. Never imply it does.
- No social proof ("trusted by", ratings) may be invented.
- The apps are in English. Every localized page carries `shell.appLanguageNote` next to
  the store buttons; translate it plainly.

## Length and layout

German and Russian run about 30% longer than English. Watch the header navigation (six
short words), the pricing cards and the four-card grids; the reviewer checks each locale
at 375px and 1280px. Where a heading wraps badly, shorten the translation, never the
template.

## Review checklist (native reviewer, Phase 1 languages)

1. Meaning and register, sentence by sentence, against the English.
2. Feature names kept and glossed once per page.
3. `{placeholders}`, `[link](keys)` and markup untouched.
4. The safety notice, the "app is in English" note and the free-tier line.
5. Dates render correctly at the bottom of the legal pages (`Intl.DateTimeFormat`).
6. Nothing in the English "claims" list above has been softened or dropped.

## Blog posts

Translated articles live at `src/content/blog/<locale path>/<slug>.md` and keep the English
filename. Translate `title`, `description` (160 characters or fewer, still), `heroImageAlt` and
the body; copy `pubDate`, `category` and `tags`; add `lang: <code>`; `heroImage` gains one more
`../` (`../../../assets/blog/<slug>/hero.jpg`). The blog's style laws apply in every language:
no em or en dashes anywhere (restructure the sentence instead), no zero-width characters, no AI
attribution or meta commentary, and every cited source stays the same link. Internal links stay
`/blog/<slug>` unless that post exists in your language, in which case use
`/<locale path>/blog/<slug>`. Run `npx tsx scripts/check-blog-post.mjs <file>` on every file.

## Language notes

- **Portuguese (pt-BR)**: Brazilian, `você`; App Store and Google Play keep their names.
- **Indonesian**: `Anda`; Indonesian rarely needs glosses for Latin feature names, but add them
  on first use anyway.
- **Ukrainian**: `ви` in lowercase; never fall back to Russian phrasing for product terms.
- **German**: `du`; about 30% longer than English, so keep nav labels, card titles and pricing
  lines tight; compound nouns may hyphenate at the template's discretion.
- **Arabic**: formal Modern Standard Arabic. The site renders these pages right-to-left
  (`dir="rtl"`), so write naturally in Arabic order; keep Latin feature names as they are and let
  the browser handle the bidirectional text. An arrow in a path like "Settings → Alarm reliability"
  should point the way the reader reads (←). Use Western digits (0-9) so numbers match the prices.
- **Hindi**: `आप` register, standard Devanagari; keep feature names in Latin script with a
  Devanagari gloss on first use.
- **Japanese**: です/ます; full-width punctuation (、。「」); no spaces between Japanese text and
  Latin feature names are needed. Headings' `pre`, `accent` and `post` carry no surrounding spaces.

### OS feature names, per vendor

Use the vendor's own name for the reader's platform. Getting these wrong names a real but
different feature, which is worse than leaving the term in English.

| English | iOS (Apple) | Android (Google) |
|---|---|---|
| Silent mode | 消音モード / Sessiz mod / وضع الصامت / mode Silence | マナーモード |
| Focus | 集中モード / Odak / التركيز / Concentration | — |
| Do Not Disturb | — | サイレントモード / Rahatsız Etmeyin / عدم الإزعاج / Ne pas déranger |

Japanese is the trap: **Do Not Disturb is サイレントモード**, not おやすみ時間モード, which is
Bedtime mode — a Digital Wellbeing feature that does not gate alarms. Because サイレントモード
sits awkwardly beside Apple's 消音モード, name the platform when a sentence lists both
(「消音モードや集中モード、Androidのサイレントモードでも…」).
