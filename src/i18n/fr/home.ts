import { home as en } from '../en/home';

/**
 * La page d’accueil. Les titres sont découpés en {pre, accent, post} parce que
 * la partie mise en avant est un <span class="accent"> dans le template ; les
 * espaces restent à l’intérieur des chaînes. `{ios}`, `{android}`, `{annual}`,
 * `{monthly}` et `{trialDays}` viennent de src/config/site.ts.
 *
 * Chaque affirmation doit valoir pour la version qu’un lecteur télécharge
 * aujourd’hui et pour la suivante (de la 2.10 à la 2.13, au 24/09/2026) : c’est
 * pourquoi la page décrit les missions par type et ne dit jamais combien de fois
 * l’alarme revient, car ce mécanisme change d’une version à l’autre. La source
 * est Docs/marketing-execution/claims-matrix.md dans le dépôt de l’application,
 * et la description de l’App Store. Les noms des fonctions sont ceux de
 * l’application en français.
 */
export const home = {
  title: `WakeSharp — Réveil pour gros dormeurs, avec des missions`,

  hero: {
    /** Affiché dans le <h1>, au-dessus du slogan : la requête que vise la page. */
    kicker: `Le réveil pour gros dormeurs`,
    heading: { pre: `Réveillez-vous `, accent: `affûté.`, post: `Pas seulement réveillé.` },
    lede: `Pour les gros dormeurs, à qui un bouton snooze ne suffit pas. Balayer l’écran, une personne à peine consciente en est capable : WakeSharp demande donc plutôt une mission — résoudre, photographier, marcher ou répondre à voix haute — puis évalue à quel point vous vous êtes vraiment réveillé affûté.`,
    phoneAlt: `Écran d’accueil de WakeSharp la nuit, avec une alarme à 6 h 40 et une règle d’agenda intelligente`,
  },

  trust: [
    `Sonne en mode Silence et en Concentration sur iPhone`,
    `Vous dit ce qui pourrait l’empêcher de sonner — dès la veille au soir`,
    `Aucun compte WakeSharp requis`,
    `Les images de l’appareil photo et votre agenda sont traités sur votre téléphone`,
    `WakeSharp n’affiche aucune publicité`,
  ],

  ring: {
    alt: `L’alarme WakeSharp qui sonne, avec le bouton pour lancer la mission et celui pour répéter`,
    heading: { pre: `Terminez la mission pour obtenir `, accent: `tout le crédit`, post: `` },
    lede: `Sur iPhone, AlarmKit d’Apple affiche une alarme système par-dessus l’écran verrouillé — à travers le mode Silence et Concentration une fois l’accès aux alarmes accordé, même si l’application a été forcée à quitter. Sur Android, une alarme exacte sur le canal audio des alarmes sonne à travers le mode silencieux, et à travers Ne pas déranger quand ce mode autorise les alarmes, avec Extra Loud (volume renforcé) et une montée progressive du volume plutôt qu’un démarrage brutal. Quelle que soit la façon dont vous la faites taire, la matinée ne compte qu’une fois la mission accomplie.`,
  },

  reliable: {
    heading: { pre: `Sachez qu’elle sonnera, `, accent: `dès la veille au soir`, post: `` },
    lede: `La plupart des applications d’alarme découvrent leur échec en même temps que vous. WakeSharp vérifie ce qui empêche réellement une alarme de sonner — autorisations, volume de l’alarme, réglages de notification, affichage sur l’écran verrouillé, restrictions de batterie — et commence par un verdict, pas par une promesse.`,
    items: [
      { title: `Un verdict, pas une liste à cocher`, body: `Une seule ligne, tout en haut : elle sonnera, elle risque de ne pas sonner, ou elle ne peut pas sonner.` },
      { title: `Honnête sur ce qu’il ne voit pas`, body: `Là où le téléphone ne nous dit rien, il le dit — jamais de coche verte.` },
      { title: `Des correctifs en un geste, quand ils existent`, body: `Et des instructions claires quand ils n’existent pas.` },
      { title: `« Elle n’a pas sonné » a une réponse`, body: `La cause prouvable — ou l’aveu que nous n’avons pas pu la déterminer.` },
    ],
    note: `C’est dans les Réglages, et le rappel d’avant le coucher y intègre le pire constat pour que vous le voyiez pendant qu’il est encore temps d’y remédier.`,
  },

  smart: {
    alt: `L’éditeur de règle d’alarme intelligente, réglé pour sonner 90 minutes avant la première réunion`,
    heading: { pre: `Vous réveille avant votre `, accent: `première réunion`, post: `` },
    lede: `« Sonner 90 minutes avant ma première réunion. » WakeSharp lit votre agenda sur votre appareil, le revérifie pendant la nuit et déplace l’alarme quand la réunion change d’heure. En lecture seule, facultatif, jamais transmis.`,
    shifts: `Et toutes les semaines ne se ressemblent pas. Les rotations d’équipe gèrent les rythmes qui ne sont pas hebdomadaires — deux jours, deux nuits, quatre de repos — avec un calendrier d’aperçu et un moyen de sauter une seule date sans rien supprimer. Les profils changent tout un jeu d’alarmes d’un coup : travail, vacances ou astreinte. La recherche, le tri et la vue Aujourd’hui gardent la liste lisible quand elles sont nombreuses.`,
    labels: `Dites pour quoi vous vous réveillez — une séance de sport, un trajet, le petit-déjeuner — et l’étiquette s’écrit toute seule.`,
  },

  mission: {
    alt: `La mission Mind Games : résolvez 9 moins 4 pour faire taire l’alarme`,
    heading: { pre: `Des missions pour `, accent: `vous faire lever`, post: `` },
    lede: `Il faut que quelque chose se passe avant que la matinée compte, et c’est vous qui choisissez quoi : du calcul, une énigme, une photo de l’endroit choisi la veille, de vrais pas ou une réponse à voix haute. Une alarme peut en demander plusieurs à la suite, dans l’ordre de votre choix, et si l’une d’elles ne peut pas fonctionner ce matin-là — un appareil photo en panne, un téléphone sans podomètre —, WakeSharp se rabat sur une autre qui le peut.`,
    /**
     * Toutes les missions que propose l’éditeur d’alarme (les entrées de
     * GameCatalog.json marquées `supportsMission`), regroupées selon ce qu’elles
     * vous demandent. `kind` est la petite étiquette dans le coin de chaque carte.
     * Les noms et les descriptions sont ceux du catalogue de l’application en
     * français.
     */
    missions: [
      { name: `Jeux d’esprit`, kind: `Esprit`, body: `Des calculs rapides qu’il faut réussir.` },
      { name: `Paires de mémoire`, kind: `Esprit`, body: `Retournez les cartes et trouvez toutes les paires.` },
      { name: `Rappel de séquence`, kind: `Esprit`, body: `Répétez un motif de touches qui s’allonge à chaque tour.` },
      { name: `Choc des couleurs`, kind: `Esprit`, body: `Touchez la couleur de l’encre, pas le mot.` },
      { name: `Recopier`, kind: `Esprit`, body: `Recopiez une phrase mot pour mot, sans correction automatique.` },
      { name: `Preuve photo`, kind: `Caméra`, body: `Reprenez la photo de l’endroit que vous avez choisi la veille.` },
      { name: `Scanner un objet`, kind: `Caméra`, body: `Levez-vous et pointez la caméra vers une bouteille, une tasse ou un lavabo.` },
      { name: `Va chercher`, kind: `Caméra`, body: `Allez chercher quelque chose de bleu, ou dans quoi vous buvez.` },
      { name: `Contrôle du visage`, kind: `Caméra`, body: `Ouvrez les yeux devant la caméra, puis suivez la consigne.` },
      { name: `Tranche-fruits`, kind: `Caméra`, body: `Tranchez les fruits en vol avec votre doigt.` },
      { name: `Marchez un peu`, kind: `Mouvement`, body: `Faites de vrais pas, comptés par votre téléphone.` },
      { name: `Première lumière`, kind: `Mouvement`, body: `Allez à une fenêtre et tenez votre téléphone dans la lumière.` },
      { name: `Sept en sept`, kind: `Voix`, body: `Comptez à rebours de sept en sept, à voix haute.` },
      { name: `Nommez cinq`, kind: `Voix`, body: `Nommez cinq choses d’une catégorie, à voix haute.` },
      { name: `Surprenez-moi`, kind: `Toutes`, body: `Une mission différente chaque matin.` },
    ],
    note: `Les missions font partie de l’alarme que vous créez : le marché se conclut la veille, il ne se négocie pas à 6 h du matin.`,
  },

  games: {
    alt: `Le jeu d’échauffement Memory Match`,
    heading: { pre: `Un `, accent: `échauffement`, post: ` de deux minutes, le temps que la bouilloire chauffe` },
    lede: `Jeux d’esprit, Paires de mémoire, Rappel de séquence, Sprint de mots et Réaction. Trois se jouent chaque matin, en rotation, si bien que l’ensemble passe en moins d’une semaine — et l’échauffement ne répète jamais ce que la mission vient de vous faire faire. Rien de tout cela n’est obligatoire ; à ce stade, l’alarme est déjà éteinte.`,
  },

  sharp: {
    alt: `La révélation quotidienne du Sharpness Score`,
    heading: { pre: `Sachez à quel point vous vous êtes réveillé `, accent: `affûté`, post: `` },
    lede: `Un seul nombre sur 100, issu de l’échauffement — votre score de Vivacité —, calculé par rapport à votre propre référence glissante, pas par rapport à des inconnus. C’est un score propre à l’application, pas un test clinique, et votre vous d’hier est la seule référence qui veuille dire quelque chose à 6 h du matin.`,
  },

  stats: {
    alt: `La courbe de tendance Sharpness avec un compteur de série`,
    heading: { pre: `Voyez-vous devenir `, accent: `plus affûté`, post: `` },
    lede: `Une série, une courbe de tendance et des jetons de gel pour les matins où la vie s’en mêle. Les paliers tombent à 7, 30, 100 et 365, et tout votre historique de Vivacité remonte jusqu’à votre premier matin.`,
  },

  together: {
    heading: { pre: `Emmenez `, accent: `quelqu’un avec vous`, post: `` },
    lede: `Partagez un lien : le téléphone qui l’ouvre programme la même alarme, puis la fait sonner tout seul. Rien à rejoindre, aucun compte à créer, et aucun serveur au milieu.`,
    cards: [
      { title: `Se réveiller avec un ami`, body: `Vous envoyez un lien ; le téléphone d’en face construit l’alarme en local. Chacun garde sa propre copie, donc modifier la vôtre ne touche pas la sienne.` },
      { title: `Beat my wake`, body: `Battez mon réveil : terminez une mission et vous pouvez défier quelqu’un sur le même jeu de problèmes — même graine, mêmes manches, même difficulté. Vous saurez ensuite lequel de vous deux était vraiment réveillé.` },
    ],
    note: `Les deux ne sont que des liens : le téléphone qui en reçoit un fait tout le travail lui-même.`,
  },

  platforms: {
    heading: { pre: `La même application. `, accent: `Sur les deux téléphones.`, post: `` },
    lede: `Développée nativement deux fois — SwiftUI sur iOS, Kotlin et Compose sur Android. Pas une coquille web, et c’est la seule raison pour laquelle chaque plateforme peut faire ce qu’elle seule sait faire. Nécessite {ios} ou {android}.`,
    watch: `Il y a aussi une application de montre aux deux poignets — watchOS 26 ou Wear OS 3. Elle vous réveille par vibrations avant que la pièce n’entende quoi que ce soit, et l’alarme du téléphone se décale de quelques minutes en secours. Seul un arrêt depuis la montre l’annule : une montre déchargée, hors de portée ou que vous n’avez pas ouverte depuis 36 heures laisse l’alarme du téléphone exactement où elle était. Il existe aussi une complication pour le cadran de la montre.`,
    account: `Il n’y a aucun compte à créer, mais vous pouvez vous connecter avec Apple ou Google si vous en attendez une seule chose : une sauvegarde, pour que vos alarmes, réglages, scores et série reviennent sur un nouveau téléphone. C’est désactivé par défaut, tout fonctionne sans connexion, et rien à 6 h du matin n’attend le réseau.`,
  },

  /** La galerie de captures des boutiques (src/components/StoreGallery.astro). */
  gallery: {
    tablistAria: `Choisissez une plateforme`,
    rails: {
      ios: { label: `iPhone`, store: `App Store` },
      android: { label: `Android`, store: `Google Play` },
    },
    railHeading: `{label} — tel qu’affiché sur {store}`,
    altTemplate: `WakeSharp sur {label} : {caption}`,
    fallbackCaption: `capture d’écran de l’application`,
    /**
     * Numéro de vue → ce qu’elle montre, titre anglais incrusté compris. Les vues
     * 04 et 07 ne sont pas affichées (StoreGallery.astro), car leur visuel montre
     * encore les tarifs retirés avec la 2.10 : elles n’ont pas de légende tant que
     * le dépôt de l’application ne les a pas régénérées.
     */
    captions: {
      '01': `Écran d’accueil avec la prochaine alarme et une règle d’agenda intelligente, sous le titre « Wake up sharp. Not just awake. » (Réveillez-vous affûté. Pas seulement réveillé.)`,
      '02': `L’alarme qui sonne par-dessus l’écran verrouillé, sous le titre « Complete a mission for full credit » (Terminez une mission pour obtenir tout le crédit)`,
      '03': `La mission Mind Games qui fait taire l’alarme, sous le titre « Solve to silence » (Résolvez pour faire taire)`,
      '05': `La révélation quotidienne du Sharpness Score, calculé par rapport à votre propre référence`,
      '06': `L’éditeur de règle d’alarme intelligente, sous le titre « Wakes you before your first meeting » (Vous réveille avant votre première réunion)`,
    },
  },

  yours: {
    heading: { pre: `Faites de la matinée `, accent: `la vôtre`, post: `` },
    lede: `L’alarme que vous avez vraiment envie d’entendre, derrière l’image que vous avez vraiment envie de voir.`,
    cards: [
      { title: `Des sonneries pour tous les dormeurs`, body: `De Dawn (aube) à Smoke Alarm (détecteur de fumée), et chacune est livrée avec sa jumelle plus douce.` },
      { title: `Fonds d’écran et scènes`, body: `Tous les fonds d’écran d’alarme et toutes les scènes du Lark (l’alouette mascotte) sont inclus, et chaque scène apporte sa propre célébration.` },
      { title: `Clair, sombre, ou ni l’un ni l’autre`, body: `Choisissez une apparence ou laissez-la suivre votre appareil ; dans les deux cas, la palette évolue avec l’heure.` },
      { title: `Un atterrissage en douceur`, body: `Démarrage en douceur sur iPhone lance la sonnerie en sourdine et monte au volume plein vers 25 secondes. Sur Android, un lever de soleil éclaircit l’écran et augmente le volume avant l’alarme.` },
    ],
  },

  pricing: {
    heading: { pre: `Une formule, `, accent: `tout compris`, post: `` },
    lede: `WakeSharp Illimité, c’est toute l’application : toutes les missions de réveil, l’échauffement quotidien, les alarmes d’agenda intelligentes, les rotations d’équipe et les profils, tout votre historique de Vivacité, ainsi que toutes les scènes du Lark et tous les fonds d’écran. WakeSharp n’affiche aucune publicité.`,
    unlimited: {
      name: `WakeSharp Illimité`,
      perYear: `/an`,
      /** L’essai et le prix qui le suit vont toujours ensemble. */
      trial: `Commencez par **{trialDays} jours d’essai gratuit**, puis {annual} par an`,
      monthly: `ou **{monthly} par mois**, sans essai`,
      features: [
        `Toutes les missions de réveil, et plusieurs à la suite si vous voulez`,
        `Trois jeux d’échauffement chaque matin, en rotation`,
        `Tout votre historique de Vivacité`,
        `Des alarmes d’agenda intelligentes qui peuvent se déplacer quand votre première réunion bouge`,
        `Les rotations d’équipe, les profils et autant d’alarmes que nécessaire`,
        `La vérification de fiabilité et toutes les sonneries d’alarme`,
        `Toutes les scènes du Lark, tous les fonds d’écran d’alarme et toutes les célébrations`,
        `Se réveiller avec un ami, et l’application de montre aux deux poignets`,
        `Sans publicité`,
      ],
    },
    billing: `Les formules annuelle et mensuelle sont facturées par Apple ou Google et se renouvellent jusqu’à résiliation — résiliez quand vous voulez depuis le compte de votre boutique, et notez que supprimer l’application ne résilie pas un abonnement. L’essai gratuit est réservé aux nouveaux abonnés éligibles. Voir les [Conditions](terms).`,
    /** Pages localisées uniquement : les boutiques localisent les prix à l’exécution. */
    usdNote: `Les prix sont affichés en dollars américains ; l’App Store et Google Play affichent le prix pour votre pays.`,
  },

  faq: {
    heading: { pre: `Vos questions, `, accent: `nos réponses`, post: `` },
    /** Les réponses peuvent utiliser {annual}, {monthly} et {trialDays} ; aucun prix n’est écrit dans un catalogue. */
    items: [
      {
        q: `Sonne-t-elle vraiment en mode Silence, en Concentration ou en Ne pas déranger ?`,
        a: `Le comportement dépend de la plateforme, et il dépend d’une autorisation. Sur iPhone, WakeSharp utilise AlarmKit d’Apple, qui permet de sonner à travers le mode Silence et Concentration une fois que vous avez accordé l’accès aux alarmes — refusez-le ou révoquez-le et WakeSharp ne peut plus rien programmer du tout. Sur Android, elle joue sur le canal dédié aux alarmes, qui sonne à travers le mode silencieux, et à travers Ne pas déranger quand ce mode autorise les alarmes — Silence total coupe tous les sons, alarmes comprises —, et elle affiche une alerte plein écran par-dessus l’écran verrouillé, à condition que les autorisations d’alarme exacte, de notification et d’écran verrouillé soient en place. Ce qu’aucune application ne peut faire, c’est sonner sur un téléphone éteint ou déchargé : pour tout ce que vous ne pouvez vraiment pas manquer, programmez une seconde alarme sur un autre appareil.`,
      },
      {
        q: `Comment vérifier que mon alarme va bien sonner ?`,
        a: `Ouvrez Réglages → Fiabilité du réveil. WakeSharp lit les conditions de votre téléphone qui peuvent empêcher une alarme de sonner — autorisations, volume de l’alarme, réglages de notification, affichage sur l’écran verrouillé, restrictions de batterie — et commence par un verdict clair plutôt que par une promesse. Là où la plateforme refuse de nous dire quelque chose, il le dit au lieu d’afficher une coche verte, parce qu’une liste qui transforme discrètement les inconnues en réussites est pire que pas de liste du tout. Si une alarme échoue un jour, l’application peut vous en donner ensuite la cause prouvable — ou admettre qu’elle n’a pas pu la déterminer.`,
      },
      {
        q: `Dois-je faire des calculs à 6 h du matin ?`,
        a: `Seulement si vous en avez envie. Les missions sont de plusieurs sortes : du calcul et des énigmes, une photo d’un endroit choisi la veille, le scan d’un objet réel à l’autre bout de la pièce, marcher ou aller jusqu’à une fenêtre, recopier une phrase ou répondre à voix haute. Choisissez celles qui vous conviennent, et une alarme peut en demander plusieurs. Surprenez-moi en choisit une différente chaque matin, si bien qu’il n’y a rien à préparer la veille.`,
      },
      {
        q: `Puis-je tricher et sauter la mission ?`,
        a: `Les commandes de votre téléphone fonctionnent toujours — vous pouvez l’éteindre, et aucune application ne devrait pouvoir l’empêcher. Dans WakeSharp, en revanche, arrêter l’alarme ou la reporter ne suffit pas à valider la matinée : elle ne compte qu’une fois la mission accomplie.`,
      },
      {
        q: `Que fait l’appareil photo ?`,
        a: `Seules les missions qui en ont besoin l’utilisent — dont Preuve photo, Scanner un objet, Va chercher, Contrôle du visage et Tranche-fruits —, et uniquement pendant que l’une d’elles est en cours ou que vous la configurez. La reconnaissance d’objets et la comparaison de photos se font sur votre appareil. Refusez l’autorisation et toutes les missions qui n’ont pas besoin de l’appareil photo fonctionnent encore. La politique de confidentialité indique exactement ce qui quitte votre téléphone, s’il y a quoi que ce soit, et quand.`,
      },
      {
        q: `WakeSharp suit-il mon sommeil ?`,
        a: `Non. Il n’y a aucun suivi du sommeil, d’aucune sorte — aucun micro à l’écoute pendant la nuit, aucune phase de sommeil, aucune note pour votre nuit et aucun avis sur l’heure à laquelle vous vous êtes endormi. Le podomètre est lu pendant la mission de marche et à aucun autre moment. WakeSharp mesure à quel point vous êtes affûté une fois levé, et rien avant cela. Les seules choses qui ressemblent au sommeil, ici, sont une heure de coucher que vous prévoyez vous-même et des sons facultatifs pour vous détendre avant de dormir.`,
      },
      {
        q: `Que lit-il exactement dans mon agenda ?`,
        a: `Vos prochains événements, en lecture seule, entièrement sur votre appareil, dans un seul but : calculer à quelle heure vous réveiller. Rien n’est transmis nulle part. C’est facultatif, et toutes les autres fonctions marchent si vous refusez.`,
      },
      {
        q: `Ai-je besoin d’un compte ?`,
        a: `Aucun compte WakeSharp n’est requis — il n’y a ni e-mail ni mot de passe nulle part dans l’application. Vous pouvez, si vous le souhaitez, vous connecter avec Apple ou Google dans un seul but : sauvegarder vos alarmes, réglages, scores et série pour qu’ils reviennent sur un nouveau téléphone. C’est désactivé par défaut, toutes les fonctions marchent sans connexion, et une alarme n’attend jamais le réseau pour sonner. Supprimez-le depuis Réglages → Compte, ou sur wakesharp.app/account/delete.`,
      },
      {
        q: `Que se passe-t-il si ma montre est déchargée ?`,
        a: `Votre téléphone sonne. La montre vous réveille d’abord par vibrations et WakeSharp décale l’alarme du téléphone de quelques minutes en secours, si bien que seul un arrêt sur la montre l’annule. Une montre déchargée, hors de portée ou que vous n’avez pas ouverte depuis 36 heures laisse l’alarme du téléphone exactement où elle était.`,
      },
      {
        q: `Combien coûte WakeSharp ?`,
        a: `Il n’y a qu’une formule, WakeSharp Illimité, et elle comprend tout. Les nouveaux abonnés peuvent commencer par {trialDays} jours d’essai gratuit de la formule annuelle, puis {annual} par an, ou choisir la formule mensuelle à {monthly} par mois, sans essai. Les prix sont en dollars américains ; l’App Store et Google Play affichent le prix pour votre pays. WakeSharp n’affiche aucune publicité.`,
      },
      {
        q: `J’ai acheté Lifetime (à vie). Est-ce que je le garde ?`,
        a: `Oui. Lifetime était un paiement unique, et il reste à vous : rien ne se renouvelle et il n’y a rien à résilier. Restaurer les achats le récupère sur un nouveau téléphone, avec le même compte Apple ou Google.`,
      },
      {
        q: `Comment résilier ?`,
        a: `Depuis l’App Store ou Google Play, quand vous voulez, y compris pendant l’essai gratuit. Supprimer l’application ne résilie pas un abonnement.`,
      },
      {
        q: `Est-ce qu’il me piste ?`,
        a: `WakeSharp n’affiche aucune publicité, mais il en achète ailleurs, et il mesure quelle publicité ou quel lien vous a amené à l’application, et si cela a débouché sur un essai ou un abonnement. Sur iPhone, il vous le demande d’abord : refusez, et votre identifiant publicitaire n’est jamais lu, tandis que les réseaux publicitaires ne voient que des résultats de campagne agrégés. Sur Android, cela fonctionne comme le décrit la politique de confidentialité. Les statistiques produit peuvent être désactivées dans les Réglages, et les étiquettes de vos alarmes et les détails de votre agenda ne sont jamais envoyés. La politique de confidentialité liste exactement ce qui quitte votre appareil.`,
      },
    ],
  },

  /** The "From the blog" block; shown only where this language has the featured posts. */
  fromBlog: {
    heading: { pre: `Sur le `, accent: `blog`, post: `` },
    more: `Lire tous les articles`,
  },

  cta: {
    heading: { pre: `La matinée de demain commence `, accent: `ce soir`, post: `` },
    lede: `Réglez une alarme. Voyez ce que donne vraiment une matinée affûtée.`,
  },
} satisfies typeof en;
