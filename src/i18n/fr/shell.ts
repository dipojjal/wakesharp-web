import { shell as en } from '../en/shell';

/**
 * Chaînes communes à toutes les pages. `{publisher}`, `{year}`, `{email}` et
 * `{date}` sont fournis par les templates depuis src/config/site.ts. Les chaînes
 * qui, en anglais, viennent de site.ts sont écrites ici en toutes lettres.
 */
export const shell = {
  siteDescription: `L’alarme qui vous rend opérationnel pour votre réunion. Une mission mérite la matinée : la résoudre, la photographier, scanner un objet ou faire les pas. Un échauffement mental mesure à quel point vous vous êtes réveillé affûté, et les alarmes intelligentes lisent votre agenda pour vous réveiller avant votre première réunion.`,
  tagline: `Réveillez-vous affûté. Pas seulement réveillé.`,
  requirements: { ios: `iOS 26 ou version ultérieure`, android: `Android 8.0 ou version ultérieure` },
  ogImageAlt: `WakeSharp — réveillez-vous affûté, pas seulement réveillé.`,
  rssTitle: `Blog WakeSharp`,
  skipLink: `Aller au contenu`,
  brandHome: `WakeSharp — accueil`,

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
    sharpnessScore: `Sharpness Score`,
    pricing: `Tarifs`,
    blog: `Blog`,
    faq: `Questions fréquentes`,
    privacy: `Politique de confidentialité`,
    terms: `Conditions d’utilisation`,
    support: `Assistance`,
    deleteAccount: `Supprimer votre compte`,
    contactForm: `Formulaire de contact`,
    builtBy: `Conçu par {publisher}, un petit studio indépendant.`,
    pleaseNote: `À noter.`,
    safetyNotice: `WakeSharp n’est pas un dispositif médical. Les réglages de votre téléphone, les restrictions de batterie ou son état d’alimentation peuvent empêcher n’importe quelle alarme de sonner. Utilisez une seconde alarme, indépendante, pour tout ce pour quoi vous ne pouvez pas vous permettre d’être en retard.`,
    fullSafetyNotice: `Avis de sécurité complet`,
    rights: `© {year} {publisher}. Tous droits réservés.`,
  },

  appLanguageNote: `L’application WakeSharp elle-même est actuellement en anglais.`,

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
