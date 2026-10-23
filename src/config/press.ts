/**
 * The "As seen on" badge: which outlets it names, where each one ran the
 * launch announcement, and the one switch that removes it from every page.
 *
 * What it is. On 2026-10-08 WakeSharp's launch announcement ("WakeSharp
 * Launches Alarm Clock App that Makes Users Scan Household Objects to Silence
 * the Alarm") ran as a PAID PRESS RELEASE, distributed by Plentisoft through
 * the Evertise network. It is not editorial coverage: the Markets Insider page
 * says in its footer that the Markets Insider and Business Insider editorial
 * teams were not involved, StreetInsider files it under Press Releases, and
 * the IPS page carries the Evertise byline. "As seen on" is literally true of
 * each page and goes no further; the site never says "featured in", "covered
 * by" or "in the press" (scripts/check-copy.mjs holds the bans, with the
 * app's localized equivalents). The label is translated literally
 * (shell.press.label).
 *
 * The owner's decisions, 2026-10-22, recorded as accepted risks rather than
 * as settled facts:
 *   - The website draws the outlets' own logo artwork, supplied by the owner
 *     (src/assets/press/as-seen-on-source.png). The app repo's claims matrix
 *     (Docs/marketing-execution/claims-matrix.md, the press badge row) allows
 *     only Business Insider's name in WakeSharp's own type on the in-app
 *     surfaces and App Store screenshot 01, and it does not list the website;
 *     that row still needs the website surfaces and this decision added.
 *   - AP is kept on the badge without a source: no apnews.com page carrying
 *     the release was found on 2026-10-22. Its `source` is null, so /press
 *     lists the three pages it can name and nothing for AP.
 *
 * Before every refresh of this site, open the three source pages again. If
 * one is gone or changed, set `enabled` to false (every placement reads it)
 * and plan the removal of the artwork; a takedown request arrives through
 * the release distributor, not through the outlet.
 *
 * The badge is never a link, as in the app, so a reader is never sent to the
 * release from a trust signal; /press cites the pages as sources instead.
 */

export interface PressOutlet {
  /** The outlet's name, as the logo's accessible name. Never translated. */
  name: string;
  /** The piece scripts/prep-press-badge.mjs cut for it, under src/assets/press/. */
  logo: 'business-insider' | 'ap' | 'streetinsider' | 'ips';
  /** The page that ran the announcement, verified live on `verified`, or null when none is known. */
  source: string | null;
  /** How /press describes the page. */
  host: string;
}

export const PRESS = {
  /** The kill switch: false removes the badge from every page in one build. */
  enabled: true,
  /** The release's publication date, as the pages carry it. */
  published: '2026-10-08',
  /** When each `source` below was last opened and found to carry the release. */
  verified: '2026-10-22',
  outlets: [
    {
      name: 'Business Insider',
      logo: 'business-insider',
      source: 'https://markets.businessinsider.com/news/stocks/wakesharp-launches-alarm-clock-app-that-makes-users-scan-household-objects-to-silence-the-alarm-1036609156',
      host: 'Markets Insider, a Business Insider site',
    },
    { name: 'AP', logo: 'ap', source: null, host: 'AP' },
    {
      name: 'StreetInsider.com',
      logo: 'streetinsider',
      source: 'https://www.streetinsider.com/Press+Releases/WakeSharp+Launches+Alarm+Clock+App+that+Makes+Users+Scan+Household+Objects+to+Silence+the+Alarm/27165304.html',
      host: 'StreetInsider.com, under Press Releases',
    },
    {
      name: 'IPS',
      logo: 'ips',
      source: 'https://ipsnews.net/business/2026/10/08/wakesharp-launches-alarm-clock-app-that-makes-users-scan-household-objects-to-silence-the-alarm/',
      host: 'IPS News, Business section',
    },
  ],
} as const satisfies { enabled: boolean; published: string; verified: string; outlets: readonly PressOutlet[] };

/** The sources /press can cite: every outlet with a page. */
export const pressSources = () => PRESS.outlets.filter((o): o is typeof o & { source: string } => o.source !== null);
