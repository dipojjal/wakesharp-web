import { SAFETY_NOTICE, SITE } from '../../config/site';

/**
 * Strings shared by every page: head metadata, header, footer, layouts and the
 * mascot's alt text. `{publisher}`, `{year}`, `{email}` and `{date}` are
 * supplied by the templates from src/config/site.ts.
 */
export const shell = {
  /** The sitewide meta + OG description; the JSON-LD one reads it too. */
  siteDescription: SITE.description as string,
  /** The footer strapline; the hero heading carries the same words split for emphasis. */
  tagline: SITE.tagline as string,
  /** Minimum OS versions, mirrored from SITE.requirements so the sentence around them translates. */
  requirements: { ios: SITE.requirements.ios as string, android: SITE.requirements.android as string },
  ogImageAlt: `WakeSharp — wake up sharp, not just awake.`,
  rssTitle: `WakeSharp Blog`,
  skipLink: `Skip to content`,
  brandHome: `WakeSharp — home`,

  nav: {
    aria: `Main`,
    features: `Features`,
    pricing: `Pricing`,
    blog: `Blog`,
    contact: `Contact`,
    faq: `FAQ`,
    cta: `Get WakeSharp`,
  },

  language: {
    /** Visually hidden label on the header disclosure and the footer list heading. */
    label: `Language`,
    /** aria-label of the footer language list. */
    listAria: `Site language`,
  },

  footer: {
    product: `Product`,
    legal: `Legal`,
    contact: `Contact`,
    features: `Features`,
    sharpnessScore: `Sharpness Score`,
    pricing: `Pricing`,
    blog: `Blog`,
    faq: `FAQ`,
    privacy: `Privacy Policy`,
    terms: `Terms of Service`,
    support: `Support`,
    deleteAccount: `Delete your account`,
    contactForm: `Contact form`,
    builtBy: `Built by {publisher}, a small independent studio.`,
    pleaseNote: `Please note.`,
    /** The liability sentence. Translate it faithfully; never soften it. */
    safetyNotice: SAFETY_NOTICE,
    fullSafetyNotice: `Full safety notice`,
    rights: `© {year} {publisher}. All rights reserved.`,
  },

  /**
   * Shown near the store buttons on every localized page (never on English).
   * The apps ship in English only; the site must not imply otherwise.
   */
  appLanguageNote: `The WakeSharp app itself is currently in English.`,

  legalLayout: {
    lastUpdated: `Last updated {date}`,
    questions: `Questions about this page? Email [{email}](email).`,
  },

  /** Alt text per mascot pose (src/components/Lark.astro). */
  lark: {
    hero: `WakeSharp mascot, hero`,
    asleep: `WakeSharp mascot, asleep`,
    waking: `WakeSharp mascot, waking`,
    focused: `WakeSharp mascot, focused`,
    celebrating: `WakeSharp mascot, celebrating`,
    encouraging: `WakeSharp mascot, encouraging`,
  },
};
