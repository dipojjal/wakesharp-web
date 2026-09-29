/**
 * The sunrise ramp.
 *
 * The page background travels the app's own night -> dawn -> morning gradient as you
 * scroll, because that is literally what the product does. Colour is pinned to
 * CONTENT, not to pixels: each section owns a `from`/`to` pair and section N's `to`
 * is section N+1's `from`, so seams are structurally impossible and adding a
 * paragraph anywhere can never shift a boundary into a colour that fails contrast.
 *
 * Rejected alternatives:
 *  - one page-height gradient layer: couples colour to document height, so editing
 *    copy silently re-tunes every contrast ratio.
 *  - `animation-timeline: scroll()`: not Baseline (Firefox still gates it). It is
 *    used here only for the decorative sun glow, never for anything load-bearing.
 *
 * `npm run contrast` walks every band at 21 interpolated steps and fails if any
 * token a tone declares drops below WCAG AA. Lighthouse cannot catch this: its
 * contrast audit skips text whose background is a gradient.
 */

export type Tone = 'night' | 'twilight' | 'amber' | 'dawn' | 'morning';

export interface SunriseStop {
  id: string;
  from: string;
  to: string;
  tone: Tone;
  /** Content must sit inside a scrim card; the raw band fails AA for light AND dark text. */
  scrim?: true;
  /**
   * This band carries a translucent `bg-white/[0.06]` feature-card grid, so
   * `npm run contrast` must measure the card interior as well as the raw band.
   * The 6% white wash lightens the background and `dim` has the least headroom
   * of the three tokens: at #4C2E59 the band reads 5.22:1 and the card reads
   * 4.35:1. Set it on any dark band that gains a card grid.
   *
   * Not needed on the light bands: `.card` there is opaque #ffffff.
   */
  cards?: true;
}

export const SUNRISE = [
  { id: 'hero', from: '#10111F', to: '#16172E', tone: 'night' },
  { id: 'loud', from: '#16172E', to: '#241D3E', tone: 'night' },
  { id: 'scan', from: '#241D3E', to: '#2E2246', tone: 'night' },
  { id: 'mission', from: '#2E2246', to: '#452A57', tone: 'night', cards: true },
  { id: 'gallery', from: '#452A57', to: '#452A57', tone: 'night' },
  { id: 'smart', from: '#452A57', to: '#5B355E', tone: 'night' },
  { id: 'sharp', from: '#5B355E', to: '#F5A578', tone: 'twilight', scrim: true },
  { id: 'platforms', from: '#F5A578', to: '#FCC88E', tone: 'amber' },
  { id: 'reliable', from: '#FCC88E', to: '#FDDCBA', tone: 'dawn' },
  { id: 'pricing', from: '#FDDCBA', to: '#FFF3E2', tone: 'morning' },
  { id: 'faq', from: '#FFF3E2', to: '#FFF7EB', tone: 'morning' },
  { id: 'from-blog', from: '#FFF7EB', to: '#FFF7EB', tone: 'morning' },
  { id: 'developer', from: '#FFF7EB', to: '#FFF7EB', tone: 'morning' },
  { id: 'cta', from: '#FFF7EB', to: '#FFF7EB', tone: 'morning' },
] as const satisfies readonly SunriseStop[];

/**
 * Per-tone ink. `accent` is the single emphasised run in a headline - amber on dark,
 * burnt coral on light. `dim` is secondary body copy and is held to the same 4.5:1
 * as body text, because "secondary" is not "decorative".
 *
 * The dark-tone values are darker than the app's own morning palette (#7A6B61 dim,
 * coral #F58C6B accent) because the app renders them on cream, while these bands
 * start at #F5A578 / #FAB462 where the app's values measure below 4:1.
 */
export const TONES: Record<Tone, { text: string; dim: string; accent: string }> = {
  night: { text: '#F5F2FA', dim: '#ADADCC', accent: '#FABF59' },
  // Measured against the scrim composite, not the raw band.
  twilight: { text: '#F5F2FA', dim: '#ADADCC', accent: '#FABF59' },
  amber: { text: '#332921', dim: '#4A3B2F', accent: '#121229' },
  dawn: { text: '#332921', dim: '#4F3F33', accent: '#121229' },
  morning: { text: '#332921', dim: '#655750', accent: '#935440' },
};

/** The scrim card behind the `sharp` section: nightSurface at 92% over the band. */
export const SCRIM = { color: '#1F1F3D', alpha: 0.92 } as const;
