import type { en } from '../en';
export const home = {
  "title": "Réveil puissant avec missions | WakeSharp",
  "hero": {
    "kicker": "Le réveil pour gros dormeurs",
    "heading": {
      "pre": "Réveillez-vous ",
      "accent": "affûté.",
      "post": "Pas seulement réveillé."
    },
    "lede": "Choisissez un son dans la catégorie Forte, puis votre mission au réveil. Résolvez quelques calculs, scannez une bouteille ou faites quelques pas.",
    "phoneAlt": "La prochaine alarme et votre matinée"
  },
  "mission": {
    "alt": "Les missions de réveil disponibles",
    "heading": {
      "pre": "Des missions pour ",
      "accent": "vous faire lever",
      "post": ""
    },
    "lede": "Choisissez une mission ci-dessous ou combinez-en plusieurs. Voici la sélection publique sur iPhone 2.14. Les missions utilisant la caméra, le mouvement ou la voix demandent les autorisations et le matériel correspondants.",
    "missions": [
      {
        "name": "Problèmes de maths",
        "kind": "Esprit",
        "body": "Des calculs rapides qu’il faut réussir.",
        "id": "math_sprint"
      },
      {
        "name": "Paires de mémoire",
        "kind": "Esprit",
        "body": "Retournez les cartes et trouvez toutes les paires.",
        "id": "memory_match"
      },
      {
        "name": "Rappel de séquence",
        "kind": "Esprit",
        "body": "Répétez un motif de touches qui s’allonge à chaque tour.",
        "id": "sequence_recall"
      },
      {
        "name": "Choc des couleurs",
        "kind": "Esprit",
        "body": "Touchez la couleur de l’encre, pas le mot.",
        "id": "colour_clash"
      },
      {
        "name": "Recopier",
        "kind": "Esprit",
        "body": "Recopiez une phrase mot pour mot, sans correction automatique.",
        "id": "type_quote"
      },
      {
        "name": "Preuve photo",
        "kind": "Caméra",
        "body": "Reprenez la photo de l’endroit que vous avez choisi la veille.",
        "id": "photo_proof"
      },
      {
        "name": "Scanner un objet",
        "kind": "Caméra",
        "body": "Levez-vous et pointez la caméra vers une bouteille, une tasse ou un lavabo.",
        "id": "object_scan"
      },
      {
        "name": "Va chercher",
        "kind": "Caméra",
        "body": "Allez chercher quelque chose de bleu, ou dans quoi vous buvez.",
        "id": "fetch"
      },
      {
        "name": "Contrôle du visage",
        "kind": "Caméra",
        "body": "Ouvrez les yeux devant la caméra, puis suivez la consigne.",
        "id": "face_check"
      },
      {
        "name": "Tranche-fruits",
        "kind": "Caméra",
        "body": "Tranchez les fruits en vol avec votre doigt.",
        "id": "fruit_slash"
      },
      {
        "name": "Marchez un peu",
        "kind": "Mouvement",
        "body": "Faites de vrais pas, comptés par votre téléphone.",
        "id": "walk_steps"
      },
      {
        "name": "Première lumière",
        "kind": "Mouvement",
        "body": "Allez à une fenêtre et tenez votre téléphone dans la lumière.",
        "id": "first_light"
      },
      {
        "name": "Nommez cinq",
        "kind": "Voix",
        "body": "Nommez cinq choses d’une catégorie, à voix haute.",
        "id": "name_five"
      },
      {
        "name": "Surprenez-moi",
        "kind": "Toutes",
        "body": "Une mission différente chaque matin.",
        "id": "surprise"
      }
    ],
    "note": "Les missions font partie de l’alarme que vous créez : le marché se conclut la veille, il ne se négocie pas à 6 h du matin."
  },
  "smart": {
    "alt": "L’éditeur de règle d’alarme intelligente, réglé pour sonner 90 minutes avant la première réunion",
    "heading": {
      "pre": "Vous réveille avant votre ",
      "accent": "première réunion",
      "post": ""
    },
    "lede": "« Sonner 90 minutes avant ma première réunion. » WakeSharp lit votre agenda sur votre appareil, le revérifie pendant la nuit et déplace l’alarme quand la réunion change d’heure. En lecture seule, facultatif, jamais transmis.",
    "shifts": "Et toutes les semaines ne se ressemblent pas. Les rotations d’équipe gèrent les rythmes qui ne sont pas hebdomadaires (deux jours, deux nuits, quatre de repos) avec un calendrier d’aperçu et un moyen de sauter une seule date sans rien supprimer. Les profils changent tout un jeu d’alarmes d’un coup : travail, vacances ou astreinte. La recherche, le tri et la vue Aujourd’hui gardent la liste lisible quand elles sont nombreuses.",
    "labels": "Dites pour quoi vous vous réveillez (une séance de sport, un trajet, le petit-déjeuner) et l’étiquette s’écrit toute seule."
  },
  "together": {
    "heading": {
      "pre": "Emmenez ",
      "accent": "quelqu’un avec vous",
      "post": ""
    },
    "lede": "Partagez un lien : le téléphone qui l’ouvre programme la même alarme, puis la fait sonner tout seul. Rien à rejoindre, aucun compte à créer, et aucun serveur au milieu.",
    "cards": [
      {
        "title": "Se réveiller avec un ami",
        "body": "Vous envoyez un lien ; le téléphone d’en face construit l’alarme en local. Chacun garde sa propre copie, donc modifier la vôtre ne touche pas la sienne."
      },
      {
        "title": "Beat my wake",
        "body": "Battez mon réveil : terminez une mission et vous pouvez défier quelqu’un sur le même jeu de problèmes: même graine, mêmes manches, même difficulté. Vous saurez ensuite lequel de vous deux était vraiment réveillé."
      }
    ],
    "note": "Les deux ne sont que des liens : le téléphone qui en reçoit un fait tout le travail lui-même."
  },
  "platforms": {
    "heading": {
      "pre": "La même application. ",
      "accent": "Sur les deux téléphones.",
      "post": ""
    },
    "lede": "WakeSharp existe aussi sur Android. Le canal audio, les autorisations et les réglages de batterie diffèrent. Ces images montrent l’iPhone et l’Apple Watch, pas Android ni Wear OS. Consultez les missions et commandes de votre application installée. WakeSharp nécessite {ios} sur iPhone, ou {android} sur Android. Les applications de montre nécessitent watchOS 26 ou Wear OS 3.",
    "watch": "Sur iPhone 2.14, toucher « Je suis debout » sur Apple Watch repousse l’alarme du téléphone d’une minute. Terminez la mission sur l’iPhone pour arrêter les répétitions. La montre doit être chargée, connectée et configurée. Voici les trois captures Apple Watch soumises.",
    "account": "Aucun compte WakeSharp n’est obligatoire. Une connexion facultative avec Apple ou Google sauvegarde les alarmes, l’historique, les préférences et de petites vignettes des photos cibles. La comparaison des photos et le calendrier sont traités sur l’appareil. Le contenu des événements y reste. Consultez la politique de confidentialité."
  },
  "reliable": {
    "heading": {
      "pre": "Sachez qu’elle sonnera, ",
      "accent": "dès la veille au soir",
      "post": ""
    },
    "lede": "La plupart des applications d’alarme découvrent leur échec en même temps que vous. WakeSharp vérifie ce qui empêche réellement une alarme de sonner (autorisations, volume de l’alarme, réglages de notification, affichage sur l’écran verrouillé, restrictions de batterie) et commence par un verdict, pas par une promesse.",
    "items": [
      {
        "title": "Un verdict, pas une liste à cocher",
        "body": "Une seule ligne, tout en haut : elle sonnera, elle risque de ne pas sonner, ou elle ne peut pas sonner."
      },
      {
        "title": "Honnête sur ce qu’il ne voit pas",
        "body": "Là où le téléphone ne nous dit rien, il le dit: jamais de coche verte."
      },
      {
        "title": "Des correctifs en un geste, quand ils existent",
        "body": "Et des instructions claires quand ils n’existent pas."
      },
      {
        "title": "« Elle n’a pas sonné » a une réponse",
        "body": "La cause prouvable, ou l’aveu que nous n’avons pas pu la déterminer."
      }
    ],
    "note": "C’est dans les Réglages, et le rappel d’avant le coucher y intègre le pire constat pour que vous le voyiez pendant qu’il est encore temps d’y remédier."
  },
  "pricing": {
    "heading": {
      "pre": "Une formule, ",
      "accent": "tout compris",
      "post": ""
    },
    "lede": "WakeSharp Illimité, c’est toute l’application : toutes les missions de réveil, l’échauffement quotidien, les alarmes d’agenda intelligentes, les rotations d’équipe et les profils, tout votre historique de Vivacité, ainsi que toutes les scènes du Lark et tous les fonds d’écran. WakeSharp n’affiche aucune publicité.",
    "unlimited": {
      "name": "WakeSharp Illimité",
      "perYear": "/an",
      "trial": "Commencez par **{trialDays} jours d’essai gratuit**, puis {annual} par an",
      "monthly": "ou **{monthly} par mois**, sans essai",
      "features": [
        "Toutes les missions de réveil, et plusieurs à la suite si vous voulez",
        "Trois jeux d’échauffement chaque matin, en rotation",
        "Tout votre historique de Vivacité",
        "Des alarmes d’agenda intelligentes qui peuvent se déplacer quand votre première réunion bouge",
        "Les rotations d’équipe, les profils et autant d’alarmes que nécessaire",
        "La vérification de fiabilité et toutes les sonneries d’alarme",
        "Toutes les scènes du Lark, tous les fonds d’écran d’alarme et toutes les célébrations",
        "Se réveiller avec un ami, et l’application de montre aux deux poignets",
        "Sans publicité"
      ]
    },
    "billing": "Les formules annuelle et mensuelle sont facturées par Apple ou Google et se renouvellent jusqu’à résiliation: résiliez quand vous voulez depuis le compte de votre boutique, et notez que supprimer l’application ne résilie pas un abonnement. L’essai gratuit est réservé aux nouveaux abonnés éligibles. Voir les [Conditions](terms).",
    "usdNote": "Les prix sont affichés en dollars américains ; l’App Store et Google Play affichent le prix pour votre pays."
  },
  "faq": {
    "heading": {
      "pre": "Vos questions, ",
      "accent": "nos réponses",
      "post": ""
    },
    "items": [
      {
        "q": "Sonne-t-elle vraiment en mode Silence, en Concentration ou en Ne pas déranger ?",
        "a": "Le comportement dépend de la plateforme, et il dépend d’une autorisation. Sur iPhone, WakeSharp utilise AlarmKit d’Apple, qui permet de sonner à travers le mode Silence et Concentration une fois que vous avez accordé l’accès aux alarmes: refusez-le ou révoquez-le et WakeSharp ne peut plus rien programmer du tout. Sur Android, elle joue sur le canal dédié aux alarmes, qui sonne à travers le mode silencieux, et à travers Ne pas déranger quand ce mode autorise les alarmes (Silence total coupe tous les sons, alarmes comprises), et elle affiche une alerte plein écran par-dessus l’écran verrouillé, à condition que les autorisations d’alarme exacte, de notification et d’écran verrouillé soient en place. Ce qu’aucune application ne peut faire, c’est sonner sur un téléphone éteint ou déchargé : pour tout ce que vous ne pouvez vraiment pas manquer, programmez une seconde alarme sur un autre appareil."
      },
      {
        "q": "Comment vérifier que mon alarme va bien sonner ?",
        "a": "Ouvrez Réglages → Fiabilité du réveil. WakeSharp lit les conditions de votre téléphone qui peuvent empêcher une alarme de sonner (autorisations, volume de l’alarme, réglages de notification, affichage sur l’écran verrouillé, restrictions de batterie) et commence par un verdict clair plutôt que par une promesse. Là où la plateforme refuse de nous dire quelque chose, il le dit au lieu d’afficher une coche verte, parce qu’une liste qui transforme discrètement les inconnues en réussites est pire que pas de liste du tout. Si une alarme échoue un jour, l’application peut vous en donner ensuite la cause prouvable, ou admettre qu’elle n’a pas pu la déterminer."
      },
      {
        "q": "Dois-je faire des calculs à 6 h du matin ?",
        "a": "Choisissez une mission ci-dessous ou combinez-en plusieurs. Voici la sélection publique sur iPhone 2.14. Les missions utilisant la caméra, le mouvement ou la voix demandent les autorisations et le matériel correspondants."
      },
      {
        "q": "Puis-je tricher et sauter la mission ?",
        "a": "Sur iPhone 2.14, arrêter ou reporter l’alarme la repousse d’une minute. Elle peut se répéter pendant une heure au maximum si la mission reste inachevée. Les commandes du téléphone restent utilisables."
      },
      {
        "q": "Que fait l’appareil photo ?",
        "a": "Choisissez une bouteille, une tasse ou un lavabo. Quand l’alarme sonne, dirigez la caméra vers cet objet. La confirmation verte indique que WakeSharp l’a reconnu. La reconnaissance se fait sur votre téléphone. Aucun compte WakeSharp n’est obligatoire. Une connexion facultative avec Apple ou Google sauvegarde les alarmes, l’historique, les préférences et de petites vignettes des photos cibles. La comparaison des photos et le calendrier sont traités sur l’appareil. Le contenu des événements y reste. Consultez la politique de confidentialité."
      },
      {
        "q": "WakeSharp suit-il mon sommeil ?",
        "a": "Non. Il n’y a aucun suivi du sommeil, d’aucune sorte: aucun micro à l’écoute pendant la nuit, aucune phase de sommeil, aucune note pour votre nuit et aucun avis sur l’heure à laquelle vous vous êtes endormi. Le podomètre est lu pendant la mission de marche et à aucun autre moment. WakeSharp mesure à quel point vous êtes affûté une fois levé, et rien avant cela. Les seules choses qui ressemblent au sommeil, ici, sont une heure de coucher que vous prévoyez vous-même et des sons facultatifs pour vous détendre avant de dormir."
      },
      {
        "q": "Que lit-il exactement dans mon agenda ?",
        "a": "Vos prochains événements, en lecture seule, entièrement sur votre appareil, dans un seul but : calculer à quelle heure vous réveiller. Rien n’est transmis nulle part. C’est facultatif, et toutes les autres fonctions marchent si vous refusez."
      },
      {
        "q": "Ai-je besoin d’un compte ?",
        "a": "Aucun compte WakeSharp n’est obligatoire. Une connexion facultative avec Apple ou Google sauvegarde les alarmes, l’historique, les préférences et de petites vignettes des photos cibles. La comparaison des photos et le calendrier sont traités sur l’appareil. Le contenu des événements y reste. Consultez la politique de confidentialité."
      },
      {
        "q": "Que se passe-t-il si ma montre est déchargée ?",
        "a": "Sur iPhone 2.14, toucher « Je suis debout » sur Apple Watch repousse l’alarme du téléphone d’une minute. Terminez la mission sur l’iPhone pour arrêter les répétitions. La montre doit être chargée, connectée et configurée. Voici les trois captures Apple Watch soumises."
      },
      {
        "q": "Combien coûte WakeSharp ?",
        "a": "Il n’y a qu’une formule, WakeSharp Illimité, et elle comprend tout. Les nouveaux abonnés peuvent commencer par {trialDays} jours d’essai gratuit de la formule annuelle, puis {annual} par an, ou choisir la formule mensuelle à {monthly} par mois, sans essai. Les prix sont en dollars américains ; l’App Store et Google Play affichent le prix pour votre pays. WakeSharp n’affiche aucune publicité."
      },
      {
        "q": "J’ai acheté Lifetime (à vie). Est-ce que je le garde ?",
        "a": "Oui. Lifetime était un paiement unique, et il reste à vous : rien ne se renouvelle et il n’y a rien à résilier. Restaurer les achats le récupère sur un nouveau téléphone, avec le même compte Apple ou Google."
      },
      {
        "q": "Comment résilier ?",
        "a": "Depuis l’App Store ou Google Play, quand vous voulez, y compris pendant l’essai gratuit. Supprimer l’application ne résilie pas un abonnement."
      },
      {
        "q": "Est-ce qu’il me piste ?",
        "a": "WakeSharp n’affiche aucune publicité, mais il en achète ailleurs, et il mesure quelle publicité ou quel lien vous a amené à l’application, et si cela a débouché sur un essai ou un abonnement. Sur iPhone, il vous le demande d’abord : refusez, et votre identifiant publicitaire n’est jamais lu, tandis que les réseaux publicitaires ne voient que des résultats de campagne agrégés. Sur Android, cela fonctionne comme le décrit la politique de confidentialité. Les statistiques produit peuvent être désactivées dans les Réglages, et les étiquettes de vos alarmes et les détails de votre agenda ne sont jamais envoyés. La politique de confidentialité liste exactement ce qui quitte votre appareil."
      }
    ]
  },
  "fromBlog": {
    "heading": {
      "pre": "Sur le ",
      "accent": "blog",
      "post": ""
    },
    "more": "Lire tous les articles"
  },
  "cta": {
    "heading": {
      "pre": "La matinée de demain commence ",
      "accent": "ce soir",
      "post": ""
    },
    "lede": "Réglez une alarme. Voyez ce que donne vraiment une matinée affûtée."
  }
} satisfies typeof en.home;
