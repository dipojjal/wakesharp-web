import { notFound as en } from '../en/not-found';

/** La page 404. Un bloc par langue activée est prérendu ; voir src/pages/404.astro. */
export const notFound = {
  title: `Page introuvable — WakeSharp`,
  mascotAlt: `Mascotte WakeSharp, endormie`,
  heading: { pre: `Cette page est encore `, accent: `endormie.`, post: `` },
  body: `Nous n’avons pas trouvé celle-ci. Le Lark vous suggère de revenir au début.`,
  backHome: `Retour à WakeSharp`,
  support: `Obtenir de l’aide`,
} satisfies typeof en;
