import { shell as en } from '../en/shell';

/**
 * Strings, die alle Seiten teilen. `{publisher}`, `{year}`, `{email}` und
 * `{date}` liefern die Templates aus src/config/site.ts. Die Strings, die im
 * Englischen aus site.ts kommen, stehen hier als übersetzter Text.
 */
export const shell = {
  siteDescription: `Ein Wecker für Tiefschläfer: Bring ihn mit Kopfrechnen, einem Foto oder ein paar Schritten zum Schweigen und sieh, wie hellwach du aufgewacht bist.`,
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
    sharpnessScore: `Wachheitswert`,
    pricing: `Preise`,
    blog: `Blog`,
    faq: `Häufige Fragen`,
    privacy: `Datenschutzerklärung`,
    terms: `Nutzungsbedingungen`,
    support: `Support`,
    deleteAccount: `Konto löschen`,
    about: `Über uns`,
    contactForm: `Kontaktformular`,
    builtBy: `Gebaut von {publisher}, einem kleinen unabhängigen Studio.`,
    pleaseNote: `Bitte beachte.`,
    /** Der Haftungssatz. Treu übersetzen, nie abschwächen. */
    safetyNotice: `WakeSharp ist kein Medizinprodukt. Die Einstellungen deines Telefons, Akku-Beschränkungen oder ein ausgeschaltetes oder leeres Gerät können jeden Alarm am Klingeln hindern. Nutze einen zweiten, unabhängigen Wecker für alles, wozu du nicht zu spät kommen darfst.`,
    fullSafetyNotice: `Vollständiger Sicherheitshinweis`,
    rights: `© {year} {publisher}. Alle Rechte vorbehalten.`,
  },

  /**
   * Steht neben den Store-Buttons auf einer lokalisierten Seite in einer
   * Sprache, in der es die App selbst nicht gibt (StoreButtons liest
   * SITE.appLanguages), damit die Website nie eine App etwa auf Japanisch
   * suggeriert. Die Sprachen werden in der Sprache dieses Katalogs genannt.
   */
  appLanguageNote: `Die WakeSharp-App gibt es auf Englisch, Spanisch, Russisch, Türkisch, Deutsch, Französisch und Arabisch.`,

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
