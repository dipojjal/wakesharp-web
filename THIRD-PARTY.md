# Third-party components

## Nunito (SIL Open Font License 1.1)

Copyright 2014 The Nunito Project Authors — <https://github.com/googlefonts/nunito>

Nunito is the marketing typeface for WakeSharp on both platforms. It is used here
in two places:

- **On the site**, via the [`@fontsource-variable/nunito`](https://fontsource.org/fonts/nunito)
  package. Its licence ships in `node_modules/@fontsource-variable/nunito/LICENSE`.
- **In `scripts/fonts/Nunito[wght].ttf`**, vendored so `scripts/build-og.py` can
  compose the social card without a network fetch. The full OFL text for that copy
  is in [`scripts/fonts/OFL.txt`](scripts/fonts/OFL.txt).

The app itself uses SF Pro Rounded on iOS (Apple-licensed, UI only) and Nunito on
Android. Marketing type is Nunito on both, so the website and the store galleries
render as one piece.

## Astro, Tailwind CSS, sharp

MIT licensed. See each package in `node_modules/` for full terms.

## WakeSharp artwork

The Lark character, the app icon, and all app screenshots in `src/assets/` are
**not** third-party assets and are not covered by any open licence. See
[LICENSE](LICENSE).
