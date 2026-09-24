/**
 * THE one file to edit when the stores change.
 *
 * Both apps are live — iOS on the App Store since 2026-08-22 (2.1 since
 * 2026-08-26), Android on Google Play since 2026-08-18, both from KineticBit Inc.
 * StoreButtons, the JSON-LD, the Smart App Banner and the footer all read from
 * here, so a store change is a one-file change.
 *
 * The two listing NAMES differ and neither is ours to guess. Verified
 * 2026-09-24: the App Store reads "Loud Alarm Clock - WakeSharp" and Play reads
 * "WakeSharp: Loud Alarm Clock". Re-read both before quoting either name
 * anywhere on this site — itunes.apple.com/lookup?id=6801198703&country=us needs
 * no credential and settles the Apple half in one request.
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
  /**
   * The sitewide meta + OG description (BaseHead) and the JSON-LD one. At most
   * 155 characters, so search results show all of it, and it leads with the
   * query the homepage targets. "Quiet", never "turn off": the phone's own
   * controls always work, so no mission is the only way to stop an alarm.
   */
  description:
    'An alarm clock for heavy sleepers: quiet it by solving quick math, photographing a spot or walking it off, then see how sharp you woke up.',
  url: 'https://wakesharp.app',
  email: 'support@wakesharp.app',
  /** The entity that publishes both apps, and the one named in the legal pages. */
  publisher: 'KineticBit Inc.',
  /** Stamped on the legal pages. Bump when their content materially changes. */
  lastUpdated: '2026-09-24',

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
   * WakeSharp Unlimited, the only way the app is sold since 2.10: there is no
   * free tier. Both plans renew; the free trial is attached to the yearly plan
   * only, for eligible new subscribers, and every mention of it must sit beside
   * the price that follows it (claims-matrix.md, App Review 3.1.2(c)). Lifetime
   * is no longer sold; existing Lifetime purchases stay valid, which the Terms
   * say. The app itself never hardcodes these; RevenueCat serves them at runtime.
   */
  unlimited: { monthly: '$4.99', annual: '$34.99', trialDays: 7 },

  /**
   * The languages the app itself ships in (iOS CFBundleLocalizations and the
   * Android values-* folders, and the live App Store listing's languages, all
   * checked 2026-09-24), as this site's locale codes. A localized page in any
   * other language says which languages the app offers (StoreButtons).
   */
  appLanguages: ['en', 'es', 'ru', 'tr', 'de', 'fr', 'ar'],

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
  unlimited: { monthly: string; annual: string; trialDays: number };
  appLanguages: readonly string[];
  appStoreId: string;
  stores: { ios: StoreConfig; android: StoreConfig };
};

export const isLive = (s: StoreConfig): boolean => s.state === 'live';
export const anyStoreLive = (): boolean => isLive(SITE.stores.ios) || isLive(SITE.stores.android);

/**
 * Shown in the footer of every page, and echoed in Terms section 8.
 *
 * This belongs on the marketing page, not only in the legal text. The homepage
 * makes strong reliability claims ("Know it will ring, the night before"); the
 * qualification has to be visible to the same reader.
 */
export const SAFETY_NOTICE =
  'WakeSharp is not a medical device. Your phone’s settings, battery restrictions or power state can prevent any alarm from sounding. Use a second, independent alarm for anything you cannot afford to be late for.';

export const TRADEMARKS = [
  'Apple, the Apple logo and iPhone are trademarks of Apple Inc., registered in the U.S. and other countries and regions. App Store is a service mark of Apple Inc.',
  'Google Play and the Google Play logo are trademarks of Google LLC.',
];
