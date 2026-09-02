import { shell as en } from '../en/shell';

/**
 * Strings, die alle Seiten teilen. `{publisher}`, `{year}`, `{email}` und
 * `{date}` liefern die Templates aus src/config/site.ts. Die Strings, die im
 * Englischen aus site.ts kommen, stehen hier als übersetzter Text.
 */
export const shell = {
  siteDescription: `Der Wecker, der dich meetingfit macht. Eine Mission verdient dir den Morgen — rechnen, fotografieren, scannen oder laufen —, ein Denk-Warm-up bewertet, wie hellwach du aufgewacht bist, und smarte Alarme lesen deinen Kalender, damit du vor deinem ersten Meeting wach bist.`,
  tagline: `Hellwach aufwachen. Nicht nur wach.`,
  requirements: { ios: `iOS 26 oder neuer`, android: `Android 8.0 oder neuer` },
  ogImageAlt: `WakeSharp — hellwach aufwachen, nicht nur wach.`,
  rssTitle: `WakeSharp Blog`,
  skipLink: `Zum Inhalt springen`,
  brandHome: `WakeSharp — Startseite`,

  nav: {
    aria: `Hauptmenü`,
    features: `Funktionen`,
    pricing: `Preise`,
    blog: `Blog`,
    contact: `Kontakt`,
    faq: `FAQ`,
    cta: `WakeSharp laden`,
  },

  language: {
    label: `Sprache`,
    listAria: `Sprache der Website`,
  },

  footer: {
    product: `Produkt`,
    legal: `Rechtliches`,
    contact: `Kontakt`,
    features: `Funktionen`,
    sharpnessScore: `Sharpness Score`,
    pricing: `Preise`,
    blog: `Blog`,
    faq: `Häufige Fragen`,
    privacy: `Datenschutzerklärung`,
    terms: `Nutzungsbedingungen`,
    support: `Support`,
    deleteAccount: `Konto löschen`,
    contactForm: `Kontaktformular`,
    builtBy: `Gebaut von {publisher}, einem kleinen unabhängigen Studio.`,
    pleaseNote: `Bitte beachte.`,
    /** Der Haftungssatz. Treu übersetzen, nie abschwächen. */
    safetyNotice: `WakeSharp ist kein Medizinprodukt. Die Einstellungen deines Telefons, Akku-Beschränkungen oder ein ausgeschaltetes oder leeres Gerät können jeden Alarm am Klingeln hindern. Nutze einen zweiten, unabhängigen Wecker für alles, wozu du nicht zu spät kommen darfst.`,
    fullSafetyNotice: `Vollständiger Sicherheitshinweis`,
    rights: `© {year} {publisher}. Alle Rechte vorbehalten.`,
  },

  /**
   * Steht auf jeder lokalisierten Seite neben den Store-Buttons (nie auf der
   * englischen). Die Apps gibt es nur auf Englisch; die Website darf nichts
   * anderes suggerieren.
   */
  appLanguageNote: `Die WakeSharp-App selbst ist derzeit auf Englisch.`,

  legalLayout: {
    lastUpdated: `Zuletzt aktualisiert am {date}`,
    questions: `Fragen zu dieser Seite? Schreib an [{email}](email).`,
  },

  /** Alternativtext je Pose des Maskottchens (src/components/Lark.astro). */
  lark: {
    hero: `WakeSharp-Maskottchen, Hauptpose`,
    asleep: `WakeSharp-Maskottchen, schlafend`,
    waking: `WakeSharp-Maskottchen, aufwachend`,
    focused: `WakeSharp-Maskottchen, konzentriert`,
    celebrating: `WakeSharp-Maskottchen, feiernd`,
    encouraging: `WakeSharp-Maskottchen, aufmunternd`,
  },
} satisfies typeof en;
