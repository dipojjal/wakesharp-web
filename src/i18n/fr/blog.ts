import { blog as en } from '../en/blog';

/**
 * La coquille du blog : la page d’index, l’habillage des articles et la carte de
 * fin d’article. Le corps des articles est en Markdown sous
 * src/content/blog/<chemin de langue>/, pas ici. `{date}` et `{minutes}` sont
 * fournis par les layouts.
 */
export const blog = {
  index: {
    title: `Blog — WakeSharp`,
    description: `Science du sommeil, routines matinales et actualités produit, par le créateur de WakeSharp — l’alarme qui vous rend opérationnel pour votre réunion.`,
    heading: `Le blog WakeSharp`,
    intro: `Science du sommeil, routines matinales et, de temps en temps, une actualité produit — par le créateur de l’alarme qui vérifie que vous êtes vraiment affûté.`,
    empty: `Le premier article arrive — repassez bientôt.`,
  },
  /** Ajouté au titre d’un article dans l’onglet du navigateur. */
  titleSuffix: ` — Blog WakeSharp`,
  /** Porte sa propre flèche, pour qu’une langue de droite à gauche puisse l’inverser. */
  allArticles: `← Tous les articles`,
  updated: `Mis à jour le {date}`,
  minRead: `{minutes} min de lecture`,
  tagsAria: `Étiquettes`,
  related: { aria: `Articles liés`, heading: `À lire aussi` },
  cta: {
    aria: `Obtenir WakeSharp`,
    heading: `Réveillez-vous affûté demain`,
    body: `Votre alarme sonne gratuitement, pour toujours, sans publicité. Mind Games, Photo Proof et la vérification de fiabilité sont inclus. Régler votre première alarme prend une dizaine de secondes.`,
  },
  /** Un libellé par catégorie de src/lib/blog-categories.ts ; une nouvelle catégorie en exige un dans chaque langue. */
  categories: {
    'sleep-science': `Science du sommeil`,
    'morning-routines': `Routines matinales`,
    productivity: `Productivité`,
    'product-updates': `Nouveautés produit`,
    'tips-and-tricks': `Trucs et astuces`,
    company: `L’entreprise`,
  },
} satisfies typeof en;
