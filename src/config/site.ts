/**
 * THE one file to edit when the stores change.
 *
 * Both apps are live — iOS 1.0 on the App Store since 2026-08-22, Android on
 * Google Play since 2026-08-18, both as "WakeSharp: Math Alarm Clock" from
 * KineticBit Inc. StoreButtons, the JSON-LD, the Smart App Banner and the footer
 * all read from here, so a store change is a one-file change.
 *
 * `state` stays in the type because it is load-bearing in the other direction:
 * if a listing is ever pulled, flipping it back to 'coming-soon' removes every
 * badge and store link on the site in one edit, rather than leaving buttons that
 * lead to a 404. scripts/check-copy.mjs asserts the live URLs below are the only
 * store links the built site contains.
 */

export type StoreState = 'coming-soon' | 'live';

export interface StoreConfig {
  state: StoreState;
  url: string;
  platform: string;
  /**
   * The badge's own words. Apple and Google both require their artwork to carry
   * this exact wording, so it doubles as the image's alt text — which is what
   * keeps the link's accessible name matching what a voice-control user can see.
   */
  note: string;
}

export const SITE = {
  name: 'WakeSharp',
  tagline: 'Wake up sharp. Not just awake.',
  description:
    'The alarm that gets you meeting-ready. A mission silences it — solve, scan or walk — a brain warm-up scores how sharp you woke up, and smart alarms read your calendar so you wake before your first meeting.',
  url: 'https://wakesharp.app',
  email: 'support@wakesharp.app',
  /** The entity that publishes both apps, and the one named in the legal pages. */
  publisher: 'KineticBit Inc.',
  /** Stamped on the legal pages. Bump when their content materially changes. */
  lastUpdated: '2026-08-23',

  /**
   * Governing law for the Terms. KineticBit Inc. is at 1044 Acoustic Way,
   * Manotick ON — the address declared as its DSA trader identity in App Store
   * Connect. The dual formulation is the standard Canadian one and is correct
   * whether the company is incorporated provincially or federally.
   */
  jurisdiction: {
    law: 'the Province of Ontario and the federal laws of Canada applicable therein',
    courts: 'Ontario, Canada',
  },

  /** Verified against the shipped builds: IPHONEOS_DEPLOYMENT_TARGET 26.0, minSdk 26. */
  requirements: { ios: 'iOS 26 or later', android: 'Android 8.0 or later' },

  /**
   * Monthly and annual renew; lifetime is a single payment. The trial is attached
   * to the annual plan only — the terms say so, and it is not ours to widen.
   * The app itself never hardcodes these; RevenueCat serves them at runtime.
   */
  plus: { monthly: '$4.99', annual: '$34.99', lifetime: '$59.99', trialDays: 7 },

  /** Needed by the Smart App Banner, which takes the bare id and not a URL. */
  appStoreId: '6801198703',

  stores: {
    ios: {
      state: 'live',
      url: 'https://apps.apple.com/app/id6801198703',
      platform: 'iPhone',
      note: 'Download on the App Store',
    },
    android: {
      state: 'live',
      url: 'https://play.google.com/store/apps/details?id=com.wakesharp.app',
      platform: 'Android',
      note: 'Get it on Google Play',
    },
  },
} as const satisfies {
  name: string;
  tagline: string;
  description: string;
  url: string;
  email: string;
  publisher: string;
  lastUpdated: string;
  jurisdiction: { law: string; courts: string };
  requirements: { ios: string; android: string };
  plus: { monthly: string; annual: string; lifetime: string; trialDays: number };
  appStoreId: string;
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
  'Apple, the Apple logo and iPhone are trademarks of Apple Inc., registered in the U.S. and other countries and regions. App Store is a service mark of Apple Inc.',
  'Google Play and the Google Play logo are trademarks of Google LLC.',
];
