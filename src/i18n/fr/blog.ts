import { blog as en } from '../en/blog';

/**
 * La coquille du blog : la page d’index, l’habillage des articles et la carte de
 * fin d’article. Le corps des articles est en Markdown sous
 * src/content/blog/<chemin de langue>/, pas ici. `{date}` et `{minutes}` sont
 * fournis par les layouts.
 */
export const blog = {
  index: {
    title: `Science du sommeil et conseils de réveil: Blog WakeSharp`,
    description: `Guides fondés sur la recherche pour se réveiller à l’heure, l’esprit clair : inertie du sommeil, snooze, alarmes ratées, caféine, mélatonine, meilleurs matins.`,
    heading: `Le blog WakeSharp`,
    intro: `Science du sommeil, routines matinales et, de temps en temps, une actualité produit: par le créateur de l’alarme qui vérifie que vous êtes vraiment affûté.`,
    empty: `Le premier article arrive: repassez bientôt.`,
  },
  /** Ajouté au titre d’un article dans l’onglet du navigateur, quand le titre complet tient encore en 60 caractères. */
  titleSuffix: ` - WakeSharp`,
  /** La ligne sous le titre d’un article quand le fondateur l’a relu. `{name}` est un lien vers /about. */
  reviewedBy: `Relu par {name}`,
  /** Porte sa propre flèche, pour qu’une langue de droite à gauche puisse l’inverser. */
  allArticles: `← Tous les articles`,
  updated: `Mis à jour le {date}`,
  minRead: `{minutes} min de lecture`,
  tagsAria: `Étiquettes`,
  related: { aria: `Articles liés`, heading: `À lire aussi` },
  cta: {
    aria: `Obtenir WakeSharp`,
    heading: `Réveillez-vous affûté demain`,
    /** `{trialDays}` et `{annual}` viennent de src/config/site.ts ; l’essai n’apparaît jamais sans son prix. */
    body: `Commencez par {trialDays} jours d’essai gratuit de WakeSharp Illimité, puis {annual} par an. Régler votre première alarme prend une dizaine de secondes.`,
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
