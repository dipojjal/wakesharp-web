import { shell as en } from '../en/shell';

/**
 * Chaînes communes à toutes les pages. `{publisher}`, `{year}`, `{email}` et
 * `{date}` sont fournis par les templates depuis src/config/site.ts. Les chaînes
 * qui, en anglais, viennent de site.ts sont écrites ici en toutes lettres.
 */
export const shell = {
  siteDescription: `Un réveil pour gros dormeurs : faites-le taire en résolvant un calcul, en photographiant un endroit ou en marchant, puis obtenez votre score de Vivacité.`,
  tagline: `Réveillez-vous affûté. Pas seulement réveillé.`,
  requirements: { ios: `iOS 26 ou version ultérieure`, android: `Android 8.0 ou version ultérieure` },
  ogImageAlt: `WakeSharp - réveillez-vous affûté, pas seulement réveillé.`,
  rssTitle: `Blog WakeSharp`,
  skipLink: `Aller au contenu`,
  brandHome: `WakeSharp - accueil`,

  nav: {
    aria: `Principal`,
    features: `Fonctions`,
    pricing: `Tarifs`,
    blog: `Blog`,
    contact: `Contact`,
    faq: `FAQ`,
    cta: `Obtenir WakeSharp`,
  },

  language: {
    label: `Langue`,
    listAria: `Langue du site`,
  },

  footer: {
    product: `Produit`,
    legal: `Mentions légales`,
    contact: `Contact`,
    features: `Fonctions`,
    sharpnessScore: `Score de Vivacité`,
    pricing: `Tarifs`,
    blog: `Blog`,
    faq: `Questions fréquentes`,
    privacy: `Politique de confidentialité`,
    terms: `Conditions d’utilisation`,
    support: `Assistance`,
    deleteAccount: `Supprimer votre compte`,
    about: `À propos`,
    contactForm: `Formulaire de contact`,
    builtBy: `Conçu par {publisher}, un petit studio indépendant.`,
    pleaseNote: `À noter.`,
    safetyNotice: `WakeSharp n’est pas un dispositif médical. Les réglages de votre téléphone, les restrictions de batterie ou son état d’alimentation peuvent empêcher n’importe quelle alarme de sonner. Utilisez une seconde alarme, indépendante, pour tout ce pour quoi vous ne pouvez pas vous permettre d’être en retard.`,
    fullSafetyNotice: `Avis de sécurité complet`,
    rights: `© {year} {publisher}. Tous droits réservés.`,
  },

  /**
   * Affiché près des boutons des boutiques uniquement sur les pages dont
   * l’application ne parle pas la langue (StoreButtons lit SITE.appLanguages) ;
   * invisible en français, mais chaque catalogue porte la clé.
   */
  appLanguageNote: `L’application WakeSharp est disponible en anglais, espagnol, russe, turc, allemand, français et arabe.`,

  legalLayout: {
    lastUpdated: `Dernière mise à jour : {date}`,
    questions: `Des questions sur cette page ? Écrivez à [{email}](email).`,
  },

  lark: {
    hero: `Mascotte WakeSharp, pose principale`,
    asleep: `Mascotte WakeSharp, endormie`,
    waking: `Mascotte WakeSharp, en train de se réveiller`,
    focused: `Mascotte WakeSharp, concentrée`,
    celebrating: `Mascotte WakeSharp, en train de célébrer`,
    encouraging: `Mascotte WakeSharp, encourageante`,
  },
} satisfies typeof en;
