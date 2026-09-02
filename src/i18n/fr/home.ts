import { home as en } from '../en/home';

/**
 * La page d’accueil. Les titres sont découpés en {pre, accent, post} parce que
 * la partie mise en avant est un <span class="accent"> dans le template ; les
 * espaces restent à l’intérieur des chaînes. `{ios}`, `{android}`, `{annual}`,
 * `{lifetime}` et `{trialDays}` viennent de src/config/site.ts.
 */
export const home = {
  title: `WakeSharp — Réveillez-vous affûté. Pas seulement réveillé.`,

  hero: {
    heading: { pre: `Réveillez-vous `, accent: `affûté.`, post: `Pas seulement réveillé.` },
    lede: `Balayer l’écran, une personne à peine consciente en est capable. WakeSharp demande plutôt une mission — la résoudre, la photographier, scanner un objet ou faire les pas — puis évalue à quel point vous vous êtes vraiment réveillé affûté.`,
    phoneAlt: `Écran d’accueil de WakeSharp la nuit, avec une alarme à 6 h 40 et une règle d’agenda intelligente`,
  },

  trust: [
    `Sonne en mode Silence et en Concentration sur iPhone`,
    `Vous dit ce qui pourrait l’empêcher de sonner — dès la veille au soir`,
    `Sans inscription et sans publicité`,
    `Votre agenda et votre appareil photo ne quittent jamais votre téléphone`,
    `Votre alarme sonne gratuitement, pour toujours`,
  ],

  ring: {
    alt: `L’alarme WakeSharp qui sonne, avec le bouton pour lancer la mission et celui pour répéter`,
    heading: { pre: `Terminez la mission pour obtenir `, accent: `tout le crédit`, post: `` },
    lede: `Sur iPhone, AlarmKit d’Apple affiche une alarme système par-dessus l’écran verrouillé — à travers le mode Silence et Concentration une fois l’accès aux alarmes accordé, même si l’application a été forcée à quitter. Sur Android, une alarme exacte sur le canal audio des alarmes, que Ne pas déranger ne fait pas taire, avec Extra Loud (volume renforcé) et une montée progressive du volume plutôt qu’un démarrage brutal. Le bouton d’arrêt du système fonctionne toujours ; la mission, elle, est ce qui mérite la matinée.`,
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
    note: `C’est gratuit, c’est dans les Réglages, et le rappel d’avant le coucher y intègre le pire constat pour que vous le voyiez pendant qu’il est encore temps d’y remédier.`,
  },

  smart: {
    alt: `L’éditeur de règle d’alarme intelligente, réglé pour sonner 90 minutes avant la première réunion`,
    heading: { pre: `Vous réveille avant votre `, accent: `première réunion`, post: `` },
    lede: `« Sonner 90 minutes avant ma première réunion. » WakeSharp lit votre agenda sur votre appareil, le revérifie pendant la nuit et déplace l’alarme quand la réunion change d’heure. En lecture seule, facultatif, jamais transmis.`,
    shifts: `Et toutes les semaines ne se ressemblent pas. Les rotations d’équipe gèrent les rythmes qui ne sont pas hebdomadaires — deux jours, deux nuits, quatre de repos — avec un calendrier d’aperçu et un moyen de sauter une seule date sans rien supprimer. Les profils changent tout un jeu d’alarmes d’un coup : travail, vacances ou astreinte. La recherche, le tri et la vue Aujourd’hui gardent la liste lisible quand elles sont nombreuses.`,
    labels: `Dites pour quoi vous vous réveillez — une séance de sport, un trajet, le petit-déjeuner — et l’étiquette s’écrit toute seule. Une règle intelligente, une rotation et un profil sont gratuits ; Plus lève les trois limites.`,
  },

  mission: {
    alt: `La mission Mind Games : résolvez 6 moins 3 pour faire taire l’alarme`,
    heading: { pre: `Sept façons de `, accent: `vous faire lever`, post: `` },
    lede: `Il faut que quelque chose se passe avant que la matinée compte, et c’est vous qui choisissez quoi. Mind Games (calcul mental) et Photo Proof (preuve par photo) sont gratuites ; les autres viennent avec Plus. Chacune a une porte de sortie qui se termine par Mind Games avec tout le crédit, pour qu’un appareil photo en panne ou un téléphone sans podomètre ne vous laisse jamais coincé.`,
    /** Les sept missions proposées par l’éditeur d’alarme, dans son ordre. `tier` vaut Gratuit ou Plus. */
    missions: [
      { name: `Mind Games`, tier: `Gratuit`, body: `Trois opérations d’arithmétique, en niveau facile, standard ou difficile. Celle vers laquelle toutes les autres se replient.` },
      { name: `Photo Proof`, tier: `Gratuit`, body: `Photographiez le ciel, votre lit fait, un verre d’eau. Six consignes en rotation quotidienne, donc rien à préparer la veille.` },
      { name: `Memory Match`, tier: `Plus`, body: `Retrouvez les paires : retournez les cartes deux par deux jusqu’à les avoir toutes appariées. Quatre paires en niveau facile, huit en difficile.` },
      { name: `Sequence Recall`, tier: `Plus`, body: `Répétez la séquence : regardez-la, puis rejouez-la. Elle commence à trois étapes et gagne une étape à chaque manche.` },
      { name: `Scan an Object`, tier: `Plus`, body: `Scannez un objet : pointez l’appareil photo vers quelque chose à l’autre bout de la pièce. Vingt objets du quotidien au catalogue, reconnus sur le téléphone lui-même.` },
      { name: `Walk It Off`, tier: `Plus`, body: `Marchez pour émerger : sortez du lit et faites les pas. Elle lit le podomètre et surveille votre cadence, donc secouer le téléphone ne compte pour rien.` },
      { name: `Surprise me`, tier: `Plus`, body: `Surprenez-moi : tire au sort l’une des autres — fixée pour cette alarme ce jour-là, donc vous le découvrez quand elle sonne.` },
    ],
    note: `La mission se choisit quand vous créez l’alarme, jamais quand elle sonne — une alarme qui porte déjà un scan ou une marche continue de l’exécuter, quoi qu’il arrive à un abonnement. Strict Mode (mode strict), là où c’est pris en charge, réserve à l’avance quatre nouvelles sonneries, et le rappel d’alarme est un réglage que vous définissez plutôt qu’une règle qu’on vous impose.`,
  },

  games: {
    alt: `Le jeu d’échauffement Memory Match`,
    heading: { pre: `Un `, accent: `échauffement`, post: ` de deux minutes, le temps que la bouilloire chauffe` },
    lede: `Mind Games, Memory Match, Sequence Recall, Word Dash et Reaction Tap : calcul rapide, mémoire, séquences, mots et réflexes. En version gratuite, vous en jouez un après votre mission, tiré d’un lot de deux. Plus en propose trois chaque matin et les fait tourner, si bien que l’ensemble passe en moins d’une semaine — et ne répète jamais ce que la mission vient de vous faire faire. Rien de tout cela n’est obligatoire ; à ce stade, l’alarme est déjà éteinte.`,
  },

  sharp: {
    alt: `La révélation quotidienne du Sharpness Score`,
    heading: { pre: `Sachez à quel point vous vous êtes réveillé `, accent: `affûté`, post: `` },
    lede: `Un seul nombre sur 100 — le Sharpness Score, votre note de vivacité au réveil —, calculé par rapport à votre propre référence glissante, pas par rapport à des inconnus. Les missions physiques n’y entrent pas : un scan, une marche et une photo ne sont jamais comparés qu’à eux-mêmes, parce que traverser la pièce n’est pas une note de calcul mental. Votre vous d’hier est la seule référence qui veuille dire quelque chose à 6 h du matin.`,
  },

  stats: {
    alt: `La courbe de tendance Sharpness avec un compteur de série`,
    heading: { pre: `Voyez-vous devenir `, accent: `plus affûté`, post: `` },
    lede: `Une série, une courbe de tendance et un jeton de gel tous les sept matins — vous pouvez en garder deux, donc la vie a le droit de s’inviter deux fois. Les paliers tombent à 7, 30, 100 et 365. Ratez complètement un matin et une mission de rattrapage maintient la chaîne avec un demi-crédit. Sept jours d’historique gratuitement ; avec Plus, tout ce que vous avez jamais enregistré, aussi loin que cela remonte.`,
  },

  together: {
    heading: { pre: `Emmenez `, accent: `quelqu’un avec vous`, post: `` },
    lede: `Partagez un lien : le téléphone qui l’ouvre programme la même alarme, puis la fait sonner tout seul. Rien à rejoindre, aucun compte à créer, et aucun serveur au milieu.`,
    cards: [
      { title: `Réveillez-vous avec un ami`, body: `Vous envoyez un lien ; le téléphone d’en face construit l’alarme en local. Chacun garde sa propre copie, donc modifier la vôtre ne touche pas la sienne.` },
      { title: `Battez mon réveil`, body: `Terminez une mission et vous pouvez défier quelqu’un sur le même jeu de problèmes — même graine, mêmes manches, même difficulté. Vous saurez ensuite lequel de vous deux était vraiment réveillé.` },
    ],
    note: `Les deux sont gratuits, et les deux ne sont que des liens : le téléphone qui en reçoit un fait tout le travail lui-même.`,
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
    /** Numéro de vue → ce qu’elle montre, titre anglais incrusté compris. */
    captions: {
      '01': `Écran d’accueil avec la prochaine alarme et une règle d’agenda intelligente, sous le titre « Wake up sharp. Not just awake. » (Réveillez-vous affûté. Pas seulement réveillé.)`,
      '02': `L’alarme qui sonne par-dessus l’écran verrouillé, sous le titre « Complete a mission for full credit » (Terminez une mission pour obtenir tout le crédit)`,
      '03': `La mission Mind Games qui fait taire l’alarme, sous le titre « Solve to silence » (Résolvez pour faire taire)`,
      '04': `Les jeux d’échauffement, sous le titre « 5 brain games. 3 every morning. » (5 jeux de réflexion. 3 chaque matin.), avec la mention que la rotation vient avec WakeSharp Plus`,
      '05': `La révélation quotidienne du Sharpness Score, calculé par rapport à votre propre référence`,
      '06': `L’éditeur de règle d’alarme intelligente, sous le titre « Wakes you before your first meeting » (Vous réveille avant votre première réunion)`,
      '07': `Les statistiques de tendance et de série Sharpness : séries et gels gratuits, historique complet avec WakeSharp Plus`,
    },
  },

  yours: {
    heading: { pre: `Faites de la matinée `, accent: `la vôtre`, post: `` },
    lede: `L’alarme que vous avez vraiment envie d’entendre, derrière l’image que vous avez vraiment envie de voir.`,
    cards: [
      { title: `13 sonneries, toutes gratuites`, body: `De Dawn (aube) à Smoke Alarm (détecteur de fumée), et chacune est livrée avec sa jumelle plus douce.` },
      { title: `Fonds d’écran et scènes`, body: `Trois fonds d’écran gratuits et cinq avec Plus, et le Lark (l’alouette mascotte) gagne quatre scènes de plus, chacune avec sa propre célébration.` },
      { title: `Clair, sombre, ou ni l’un ni l’autre`, body: `Choisissez une apparence ou laissez-la suivre votre appareil ; dans les deux cas, la palette évolue avec l’heure.` },
      { title: `Un atterrissage en douceur`, body: `Gentle start (démarrage en douceur) sur iPhone lance la sonnerie en sourdine et monte au volume plein vers 25 secondes. Sur Android, un lever de soleil éclaircit l’écran et augmente le volume avant l’alarme.` },
    ],
  },

  pricing: {
    heading: { pre: `Votre alarme sonne `, accent: `gratuitement, pour toujours`, post: `` },
    lede: `Sans publicité non plus. Deux des sept missions sont gratuites elles aussi, avec les 13 sonneries, Strict Mode, les préréglages de rappel d’alarme et la vérification de fiabilité. Plus, c’est pour la matinée d’après l’alarme — les autres missions, plus de jeux d’échauffement, plus de règles intelligentes, et tout l’historique.`,
    free: {
      name: `Gratuit`,
      price: `$0`,
      tagline: `Sans inscription, sans période d’essai à ne pas oublier.`,
      /** Reflète les limites que le paywall applique réellement. */
      features: [
        `Autant d’alarmes que nécessaire`,
        `Deux missions de réveil — Mind Games et Photo Proof`,
        `Les 13 sonneries d’alarme`,
        `Strict Mode, les préréglages de rappel d’alarme et la vérification de fiabilité`,
        `Une alarme d’agenda intelligente, une rotation d’équipe, un profil`,
        `La recherche, le tri et la vue Aujourd’hui`,
        `Séries, jetons de gel et paliers`,
        `Un jeu d’échauffement après chaque mission, et votre tendance sur 7 jours`,
        `Réveillez-vous avec un ami, et l’application de montre aux deux poignets`,
        `Trois fonds d’écran d’alarme et la scène Classic Lark`,
      ],
    },
    plus: {
      name: `WakeSharp Plus`,
      perMonth: `/mois`,
      annual: `ou **{annual}/an**, avec {trialDays} jours d’essai gratuit`,
      lifetime: `ou **{lifetime} une seule fois** — Lifetime (à vie), qui ne se renouvelle jamais`,
      /** Les points 2 à 6 sont les cinq puces du paywall, dans son ordre. */
      features: [
        `Tout ce que contient l’offre Gratuit`,
        `Toutes les missions de réveil au-delà de Mind Games et Photo Proof`,
        `Trois jeux d’échauffement chaque matin, en rotation`,
        `Tout votre historique Sharpness`,
        `Des alarmes d’agenda intelligentes sans limite`,
        `Les scènes du Lark, les fonds d’écran d’alarme et les célébrations`,
        `Autant de rotations d’équipe et de profils que vous voulez, et une politique de rappel d’alarme personnalisée`,
      ],
    },
    lapse: `Plus est vérifié quand vous créez une alarme, pas quand elle sonne. Une alarme qui porte déjà un scan ou une marche continue de l’exécuter, que l’abonnement soit actif ou non — rien de ce que vous avez déjà réglé ne cesse de fonctionner. Ce qui expire, c’est la possibilité d’en créer de nouvelles.`,
    billing: `Les formules mensuelle et annuelle sont facturées par Apple ou Google et se renouvellent jusqu’à résiliation — résiliez quand vous voulez depuis le compte de votre boutique, et notez que supprimer l’application ne résilie pas un abonnement. Lifetime est un paiement unique, sans rien à résilier. Voir les [Conditions](terms).`,
    /** Pages localisées uniquement : les boutiques localisent les prix à l’exécution. */
    usdNote: `Les prix sont affichés en dollars américains ; l’App Store et Google Play affichent le prix pour votre pays.`,
  },

  faq: {
    heading: { pre: `Vos questions, `, accent: `nos réponses`, post: `` },
    items: [
      {
        q: `Sonne-t-elle vraiment en mode Silence, en Concentration ou en Ne pas déranger ?`,
        a: `Le comportement dépend de la plateforme, et il dépend d’une autorisation. Sur iPhone, WakeSharp utilise AlarmKit d’Apple, qui permet de sonner à travers le mode Silence et Concentration une fois que vous avez accordé l’accès aux alarmes — refusez-le ou révoquez-le et WakeSharp ne peut plus rien programmer du tout. Sur Android, elle joue sur le canal audio dédié aux alarmes, que Ne pas déranger ne fait pas taire, et affiche une alerte plein écran par-dessus l’écran verrouillé, à condition que les autorisations d’alarme exacte, de notification et d’écran verrouillé soient en place. Ce qu’aucune application ne peut faire, c’est sonner sur un téléphone éteint ou déchargé : pour tout ce que vous ne pouvez vraiment pas manquer, programmez une seconde alarme sur un autre appareil.`,
      },
      {
        q: `Comment vérifier que mon alarme va bien sonner ?`,
        a: `Ouvrez Réglages → Alarm reliability (fiabilité de l’alarme). WakeSharp lit les conditions de votre téléphone qui peuvent empêcher une alarme de sonner — autorisations, volume de l’alarme, réglages de notification, affichage sur l’écran verrouillé, restrictions de batterie — et commence par un verdict clair plutôt que par une promesse. Là où la plateforme refuse de nous dire quelque chose, il le dit au lieu d’afficher une coche verte, parce qu’une liste qui transforme discrètement les inconnues en réussites est pire que pas de liste du tout. Si une alarme échoue un jour, l’application peut vous en donner ensuite la cause prouvable — ou admettre qu’elle n’a pas pu la déterminer.`,
      },
      {
        q: `Dois-je faire des calculs à 6 h du matin ?`,
        a: `Seulement si vous en avez envie. Les deux missions gratuites sont Mind Games, qui consiste en trois opérations d’arithmétique, et Photo Proof, qui demande simplement une photo de quelque chose — le ciel, votre lit fait, un verre d’eau, selon une consigne qui change chaque jour. Plus ajoute Memory Match, Sequence Recall, le scan d’un objet réel à l’autre bout de la pièce, la marche d’un nombre de pas donné, et « Surprise me », qui en choisit une et la fixe pour cette alarme ce jour-là, si bien qu’il n’y a rien à préparer la veille. Chaque mission a une porte de sortie qui se termine par Mind Games avec tout le crédit, pour qu’un appareil photo en panne ou un téléphone laissé sur la table de nuit ne vous piège jamais.`,
      },
      {
        q: `Puis-je tricher et sauter la mission ?`,
        a: `Vous pouvez arrêter l’alarme sans en faire — le bouton d’arrêt de votre téléphone fonctionne toujours, et nous ne voudrions pas qu’il en soit autrement. WakeSharp affiche alors un écran de mission due à la prochaine ouverture, et une mission de rattrapage peut maintenir votre série avec un demi-crédit. Le rappel d’alarme est un réglage que vous choisissez plutôt qu’une règle qu’on vous impose : désactivé, le réglage standard de deux rappels de cinq minutes, ou Tighten, qui raccourcit chaque intervalle et augmente la difficulté au fil des rappels. Chaque rappel coûte du Sharpness. Strict Mode, là où c’est pris en charge, réserve à l’avance quatre nouvelles sonneries — à 45 secondes, puis à 4, 8 et 12 minutes — et terminer la mission annule celles qui n’ont pas encore sonné.`,
      },
      {
        q: `Que fait l’appareil photo ?`,
        a: `Deux missions l’utilisent, et seulement pendant que cette mission se déroule ou pendant que vous la configurez. Scan an Object classe les images sur votre appareil — le framework Vision d’Apple sur iPhone, un petit modèle embarqué sur Android — pour vérifier que vous regardez bien la chose que vous avez choisie. Photo Proof demande une photographie, et la version vérifiée la compare à une référence que vous avez enregistrée, également sur votre appareil. Rien n’est envoyé, rien n’est ajouté à votre photothèque, et la photographie complète n’est jamais conservée — seulement une petite empreinte. Refusez l’autorisation et toutes les autres missions fonctionnent encore.`,
      },
      {
        q: `WakeSharp suit-il mon sommeil ?`,
        a: `Non. Il n’y a aucun suivi du sommeil, d’aucune sorte — aucun micro à l’écoute pendant la nuit, aucune phase de sommeil, aucune note pour votre nuit et aucun avis sur l’heure à laquelle vous vous êtes endormi. Le podomètre est lu pendant la mission de marche et à aucun autre moment. WakeSharp mesure à quel point vous êtes affûté une fois levé, et rien avant cela. Les seules choses qui ressemblent au sommeil, ici, sont une heure de coucher que vous définissez vous-même et un rappel facultatif pour lever le pied.`,
      },
      {
        q: `Que lit-il exactement dans mon agenda ?`,
        a: `Vos prochains événements, en lecture seule, entièrement sur votre appareil, dans un seul but : calculer à quelle heure vous réveiller. Rien n’est transmis nulle part. C’est facultatif, et toutes les autres fonctions marchent si vous refusez.`,
      },
      {
        q: `Ai-je besoin d’un compte ?`,
        a: `Non, et rien n’est réservé à ceux qui en ont un — il n’y a ni e-mail ni mot de passe nulle part dans l’application. Vous pouvez, si vous le souhaitez, vous connecter avec Apple ou Google dans un seul but : sauvegarder vos alarmes, réglages, scores et série pour qu’ils reviennent sur un nouveau téléphone. C’est désactivé par défaut, toutes les fonctions marchent sans connexion, et une alarme n’attend jamais le réseau pour sonner. Supprimez-le depuis Réglages → Compte, ou sur wakesharp.app/account/delete.`,
      },
      {
        q: `Que se passe-t-il si ma montre est déchargée ?`,
        a: `Votre téléphone sonne. La montre vous réveille d’abord par vibrations et WakeSharp décale l’alarme du téléphone de quelques minutes en secours, si bien que seul un arrêt sur la montre l’annule. Une montre déchargée, hors de portée ou que vous n’avez pas ouverte depuis 36 heures laisse l’alarme du téléphone exactement où elle était. Les alarmes de garde de Strict Mode sonnent sur le téléphone dans tous les cas.`,
      },
      {
        q: `Qu’est-ce qui est gratuit et qu’est-ce qui relève de Plus ?`,
        a: `Votre alarme sonne gratuitement, pour toujours, sans publicité. L’offre gratuite couvre autant d’alarmes que nécessaire, les missions Mind Games et Photo Proof, les 13 sonneries d’alarme, Strict Mode, les préréglages de rappel d’alarme, la vérification de fiabilité, les séries et les jetons de gel, un jeu d’échauffement après chaque mission, une alarme d’agenda intelligente, une rotation d’équipe, un profil, l’application de montre et votre tendance Sharpness sur 7 jours. Plus ajoute les cinq autres missions — Memory Match, Sequence Recall, le scan, la marche et Surprise me —, trois jeux d’échauffement en rotation chaque matin, des alarmes d’agenda intelligentes sans limite, autant de rotations et de profils que vous voulez, tout votre historique Sharpness, une politique de rappel d’alarme personnalisée, ainsi que les scènes du Lark, les fonds d’écran et les célébrations.`,
      },
      {
        q: `Qu’arrive-t-il à mes alarmes Plus si j’arrête de payer ?`,
        a: `Elles continuent de fonctionner. La vérification a lieu quand vous créez une alarme, pas quand elle sonne : une alarme qui porte déjà un scan ou une marche continue donc de l’exécuter, que l’abonnement soit actif ou non. Ce que vous perdez, c’est la possibilité d’en créer de nouvelles, ainsi que les jeux d’échauffement supplémentaires et l’historique complet.`,
      },
      {
        q: `Lifetime est-il un abonnement ?`,
        a: `Non. Lifetime (à vie) est un paiement unique pour les mêmes fonctions de WakeSharp Plus — il ne se renouvelle pas, et il n’y a rien à résilier. Les formules mensuelle et annuelle, elles, se renouvellent jusqu’à ce que vous les arrêtiez. L’essai gratuit de 7 jours appartient à la formule annuelle.`,
      },
      {
        q: `Comment résilier ?`,
        a: `Depuis l’App Store ou Google Play, quand vous voulez. Supprimer l’application ne résilie pas un abonnement. Lifetime n’a rien à résilier — c’est un achat unique, et Restaurer les achats le récupère sur un nouveau téléphone.`,
      },
      {
        q: `Est-ce qu’il me piste ?`,
        a: `Aucun identifiant publicitaire, aucune localisation, et aucun suivi à travers d’autres applications. Ce qui quitte votre appareil : des statistiques d’usage anonymes (un identifiant aléatoire et les écrans que vous utilisez — jamais vos alarmes, votre agenda ni votre appareil photo), les données d’abonnement si vous achetez Plus, et votre propre sauvegarde si vous avez choisi de créer un compte. Votre compte n’est jamais rapproché de ces statistiques. La politique de confidentialité liste chaque octet.`,
      },
    ],
  },

  cta: {
    heading: { pre: `La matinée de demain commence `, accent: `ce soir`, post: `` },
    lede: `Réglez une alarme. Voyez ce que donne vraiment une matinée affûtée.`,
  },
} satisfies typeof en;
