import { legal as en } from '../en/legal';

/**
 * La politique de confidentialité et les conditions restent en anglais : ce sont
 * les textes qui font foi, et les deux applications codent en dur leurs URL
 * anglaises. Une route localisée existe pour que le sélecteur de langue ne mène
 * jamais à une impasse ; elle porte cet avis au-dessus du texte anglais. Seules
 * les chaînes ci-dessous sont traduites.
 */
export const legal = {
  privacy: {
    title: `Politique de confidentialité — WakeSharp`,
    heading: `Politique de confidentialité`,
  },
  terms: {
    title: `Conditions d’utilisation — WakeSharp`,
    heading: `Conditions d’utilisation`,
  },
  englishOnly: `Ce document n’est disponible qu’en anglais, et c’est le texte anglais ci-dessous qui fait foi. Si quelque chose n’y est pas clair, écrivez à [{email}](email) et un humain vous l’expliquera.`,
} satisfies typeof en;
