/**
 * THE one file to edit on launch day.
 *
 * The App Store and Play listings do not exist yet, so both store buttons are
 * `coming-soon` and anchor to #features. When the listings go live, set `state`
 * to 'live' and paste the real `url` — StoreButtons, the JSON-LD and the footer
 * all read from here, so nothing else on the site changes.
 *
 * The real URLs are pre-filled as comments. Do NOT uncomment them until the
 * listings are actually live: a button that says "Download on the App Store" and
 * does not download anything is deceptive UI, and official badge artwork is only
 * licensed for apps that are actually on the store (see components/StoreButtons).
 */

export type StoreState = 'coming-soon' | 'live';

export interface StoreConfig {
  state: StoreState;
  url: string;
  platform: string;
  note: string;
}

export const SITE = {
  name: 'WakeSharp',
  tagline: 'Wake up sharp. Not just awake.',
  description:
    'The alarm that gets you meeting-ready. A quick mission silences it, a two-minute brain warm-up scores how sharp you woke up, and smart alarms read your calendar so you wake before your first meeting.',
  url: 'https://wakesharp.app',
  email: 'cooldipojjal@gmail.com',
  author: 'Dipojjal Chakrabarti',
  /** Stamped on the legal pages. Bump when their content materially changes. */
  lastUpdated: '2026-08-14',

  requirements: { ios: 'iOS 26 or later', android: 'Android 8.0 or later' },

  plus: { monthly: '$4.99', annual: '$34.99', trialDays: 7 },

  stores: {
    ios: {
      state: 'coming-soon',
      url: '#features',
      // url: 'https://apps.apple.com/app/id6801198703',
      platform: 'iPhone',
      note: 'Coming soon',
    },
    android: {
      state: 'coming-soon',
      url: '#features',
      // url: 'https://play.google.com/store/apps/details?id=com.dipojjal.wakesharp',
      platform: 'Android',
      note: 'Coming soon',
    },
  },
} as const satisfies {
  name: string;
  tagline: string;
  description: string;
  url: string;
  email: string;
  author: string;
  lastUpdated: string;
  requirements: { ios: string; android: string };
  plus: { monthly: string; annual: string; trialDays: number };
  stores: { ios: StoreConfig; android: StoreConfig };
};

export const isLive = (s: StoreConfig): boolean => s.state === 'live';
export const anyStoreLive = (): boolean => isLive(SITE.stores.ios) || isLive(SITE.stores.android);

/**
 * Shown in the footer of every page, and echoed in Terms section 8.
 *
 * This belongs on the marketing page, not only in the legal text. The homepage
 * makes strong reliability claims ("it won't stop until you're sharp"); the
 * qualification has to be visible to the same reader.
 */
export const SAFETY_NOTICE =
  'WakeSharp is not a medical device. Your phone’s settings, battery restrictions or power state can prevent any alarm from sounding. Use a second, independent alarm for anything you cannot afford to be late for.';

export const TRADEMARKS = [
  'Apple and the Apple logo are trademarks of Apple Inc., registered in the U.S. and other countries. App Store is a service mark of Apple Inc.',
  'Google Play and the Google Play logo are trademarks of Google LLC.',
];
