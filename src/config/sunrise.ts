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
}

export const SUNRISE = [
  { id: 'hero', from: '#10111F', to: '#16172E', tone: 'night' },
  { id: 'trust', from: '#16172E', to: '#1B1A34', tone: 'night' },
  { id: 'ring', from: '#1B1A34', to: '#241D3E', tone: 'night' },
  { id: 'reliable', from: '#241D3E', to: '#2E2246', tone: 'night' },
  { id: 'smart', from: '#2E2246', to: '#3D2654', tone: 'night' },
  { id: 'mission', from: '#3D2654', to: '#4C2E59', tone: 'night' },
  { id: 'games', from: '#4C2E59', to: '#5B355E', tone: 'night' },
  // The night -> day flip. Its midpoint (~#A86D6B) measures ~3.4:1 against light text
  // and ~3.9:1 against dark text: it fails AA for both, so there is no text colour
  // that works on it. Everything in this section lives inside the scrim card.
  { id: 'sharp', from: '#5B355E', to: '#F5A578', tone: 'twilight', scrim: true },
  { id: 'stats', from: '#F5A578', to: '#FAB462', tone: 'amber' },
  { id: 'platforms', from: '#FAB462', to: '#FDDCBA', tone: 'dawn' },
  { id: 'pricing', from: '#FDDCBA', to: '#FFF3E2', tone: 'morning' },
  { id: 'faq', from: '#FFF3E2', to: '#FFF7EB', tone: 'morning' },
  { id: 'cta', from: '#FFF7EB', to: '#FFF7EB', tone: 'morning' },
] as const satisfies readonly SunriseStop[];

/**
 * Per-tone ink. `accent` is the single emphasised run in a headline — amber on dark,
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
