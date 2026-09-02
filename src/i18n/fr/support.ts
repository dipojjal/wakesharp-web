import { support as en } from '../en/support';

/**
 * /support — l’URL d’assistance déclarée dans App Store Connect. Clés de lien
 * utilisées ci-dessous : email, terms-safety, privacy, account-delete,
 * apple-subs, google-subs. `{ios}` et `{android}` viennent de src/config/site.ts.
 */
export const support = {
  title: `Assistance — WakeSharp`,
  description: `Trouvez de l’aide sur WakeSharp : pourquoi une alarme peut ne pas sonner, comment fonctionnent les missions et le Sharpness Score, et comment gérer votre abonnement.`,
  heading: `Assistance`,
  intro: `WakeSharp est une petite équipe, et c’est un humain qui répond aux e-mails.`,

  getInTouch: {
    heading: `Nous écrire`,
    body: `Écrivez à [{email}](email). Je réponds en général sous **2 à 3 jours ouvrés**. Indiquer votre modèle de téléphone, votre version d’OS et la version de WakeSharp affichée dans les Réglages vous vaudra presque toujours une réponse plus rapide.`,
  },

  requirements: {
    heading: `Configuration requise`,
    body: `WakeSharp nécessite {ios} sur iPhone, ou {android} sur Android. Les applications de montre nécessitent watchOS 26 ou Wear OS 3.`,
  },

  didntRing: {
    heading: `Mon alarme n’a pas sonné`,
    callout: `**Commencez dans l’application, pas ici.** Ouvrez WakeSharp → Réglages → _Alarm reliability_ (fiabilité de l’alarme). Elle lit l’état réel de votre téléphone — autorisations, volume de l’alarme, Ne pas déranger, réglages de notification, affichage sur l’écran verrouillé, restrictions de batterie — et commence par un verdict clair : elle sonnera, elle risque de ne pas sonner, ou elle ne peut pas sonner. Là où un correctif tient en un geste, elle vous le propose ; là où le téléphone refuse de nous dire quelque chose, elle le dit au lieu d’afficher une coche verte. Elle s’exécute aussi avant le coucher et signale le pire point relevé.`,
    report: `Si une alarme a déjà été manquée, WakeSharp affiche ce matin-là un rapport qui nomme la cause quand il peut la prouver — autorisation révoquée, volume de l’alarme à zéro, Silence total, téléphone éteint — et qui dit « Nous n’avons pas pu déterminer pourquoi » quand il ne le peut pas. Les listes ci-dessous servent dans ce dernier cas.`,
    iphone: {
      heading: `Sur iPhone`,
      steps: [
        `**Vérifiez que l’alarme est bien activée** sur l’écran d’accueil, et que ses jours de répétition incluent aujourd’hui.`,
        `**Vérifiez l’autorisation d’alarme.** Réglages → WakeSharp. Si l’accès aux alarmes a été refusé, WakeSharp ne peut rien programmer. Activez-le, puis enregistrez de nouveau l’alarme.`,
        `**Vérifiez le volume et le bouton silencieux.** WakeSharp sonne à travers le mode Silence et Concentration, mais il ne peut pas sonner sur un appareil éteint ou déchargé.`,
        `**Vérifiez le Bluetooth.** Si votre téléphone est encore connecté à un casque ou à une voiture, l’alarme y joue peut-être.`,
        `**Redémarrez le téléphone** et enregistrez de nouveau l’alarme si le problème persiste.`,
      ],
    },
    android: {
      heading: `Sur Android`,
      steps: [
        `**Vérifiez que l’alarme est activée** et que ses jours de répétition incluent aujourd’hui.`,
        `**Autorisez les notifications.** Paramètres → Applications → WakeSharp → Notifications. L’écran de sonnerie arrive sous forme de notification plein écran ; bloquer les notifications le supprime.`,
        `**Désactivez l’optimisation de la batterie pour WakeSharp.** Paramètres → Applications → WakeSharp → Batterie → _Sans restriction_. C’est de loin la cause la plus fréquente sur les appareils Samsung, Xiaomi, OPPO, vivo et OnePlus, plus agressifs qu’Android d’origine. Sur Samsung, vérifiez aussi Paramètres → Batterie → Limites d’utilisation en arrière-plan et assurez-vous que WakeSharp ne figure pas dans les applications « en veille » ou « en veille profonde ».`,
        `**Vérifiez que Ne pas déranger n’est pas réglé sur Silence total.** Les modes Prioritaire et Alarmes uniquement laissent passer les alarmes ; Silence total les coupe aussi, et aucune application ne peut passer outre.`,
        `**Ne « forcez pas l’arrêt » de WakeSharp.** Forcer l’arrêt annule ses alarmes programmées jusqu’à ce que vous rouvriez l’application.`,
        `**Après un redémarrage, ouvrez WakeSharp une fois.** Il réarme vos alarmes au démarrage, mais l’ouvrir garantit que la synchronisation a bien eu lieu.`,
      ],
    },
    warning: `**Si être réveillé compte vraiment, programmez une seconde alarme sur un autre appareil.** WakeSharp programme les alarmes via le système d’exploitation, et c’est le système qui décide si elles sonnent. Voir l’[avis de sécurité](terms-safety).`,
  },

  ringsThrough: {
    heading: `WakeSharp sonne-t-il vraiment à travers le mode Silence, Concentration et Ne pas déranger ?`,
    body: `Dans des circonstances normales, oui — c’est tout l’intérêt de l’application, et c’est le mécanisme qu’utilise l’horloge intégrée de chaque plateforme.`,
    items: [
      `**Sur iPhone**, WakeSharp utilise AlarmKit d’Apple, qui permet de sonner à travers le mode Silence et Concentration **une fois que vous avez accordé l’autorisation d’alarme**. Refusez-la ou révoquez-la et WakeSharp ne peut plus programmer d’alarme du tout.`,
      `**Sur Android**, l’alarme joue sur le canal audio dédié aux alarmes, que Ne pas déranger ne fait pas taire, et affiche une alerte plein écran par-dessus l’écran verrouillé — **à condition que les autorisations d’alarme exacte, de notification et d’écran verrouillé soient en place**. Il n’y a pas d’invite supplémentaire pour le canal des alarmes lui-même, mais une notification bloquée ou une restriction de batterie peut malgré tout empêcher l’alerte.`,
    ],
    limit: `Ce qu’aucune des deux plateformes ne peut faire, c’est sonner sur un téléphone éteint, déchargé, ou dont les autorisations de l’application ont été révoquées.`,
  },

  missions: {
    heading: `Missions, rappel d’alarme et Strict Mode`,
    items: [
      `**La mission** est ce qui vous vaut tout le crédit de la matinée. Deux sont gratuites : _Mind Games_, trois opérations d’arithmétique rapides en niveau facile, standard ou difficile, et _Photo Proof_, qui demande une seule photographie — la consigne du jour, en rotation, ou une cible que vous avez enregistrée pour cette alarme. WakeSharp Plus ajoute _Memory Match_, _Sequence Recall_, _Scan an Object_, _Walk It Off_ et _Surprise Me_, qui en choisit une pour vous et la fixe pour cette alarme ce jour-là, pour que vous ne puissiez pas la préparer la veille. **Le choix est verrouillé quand vous créez ou modifiez une alarme, jamais quand elle sonne** — une alarme déjà réglée sur une mission Plus continue de l’exécuter.`,
      `**My spots & codes**, c’est là que _Scan an Object_ devient personnel. Photographiez un endroit vers lequel vous marcherez, comme la bouilloire ou la porte d’entrée, ou enregistrez un QR code ou un code-barres que vous collez là où la matinée doit vous envoyer, comme le miroir de la salle de bains ou la boîte à café. Une alarme peut alors demander cette cible précise. C’est une fonction _à l’intérieur_ de la mission de scan plutôt qu’une mission à part entière, et ni la photographie ni le code ne sont stockés — seulement une empreinte de chacun.`,
      `**Chaque mission a une porte de sortie** qui se termine par Mind Games avec tout le crédit, pour qu’un appareil photo en panne ou un téléphone sans podomètre ne puisse jamais vous laisser coincé avec une alarme que vous ne pouvez pas faire taire.`,
      `**Le rappel d’alarme** est un réglage propre à chaque alarme, pas une règle fixe. _Désactivé_ retire complètement le bouton. _Standard_ autorise deux rappels de cinq minutes, à 5 points de Sharpness chacun et sans descendre plus bas que −10 pour la journée. _Tighten_ en autorise trois, à 10, puis 5, puis 2 minutes, augmente la difficulté de la mission à chaque fois, et s’arrête à −15. Les trois préréglages sont gratuits ; une politique entièrement personnalisée fait partie de WakeSharp Plus.`,
      `**Strict Mode**, là où c’est pris en charge, préprogramme quatre alarmes de garde — 45 secondes plus tard, puis à 4, 8 et 12 minutes. Ce sont de vraies alarmes réservées à l’avance, donc elles sonnent que l’application tourne ou non, et terminer la mission annule celles qui n’ont pas encore sonné. Ce sont quatre nouvelles sonneries, pas une boucle sans fin, et le bouton d’arrêt du système met fin à chacune d’elles. Activez-le alarme par alarme.`,
      `**Arrêter l’alarme sans mission** est possible — le bouton d’arrêt du système fonctionne toujours. WakeSharp affiche alors un écran de mission due à la prochaine ouverture, pour que votre série puisse quand même être réparée.`,
    ],
  },

  smartAlarms: {
    heading: `Alarmes d’agenda intelligentes`,
    body: `Une règle intelligente sonne un nombre de minutes défini avant votre première réunion, dans les limites d’une heure de réveil au plus tôt et au plus tard que vous choisissez. WakeSharp revérifie votre agenda pendant la nuit : si la réunion se déplace, l’alarme se déplace. Si vous refusez l’accès à l’agenda, tout le reste fonctionne — vous réglez simplement les heures vous-même. Vos événements ne quittent jamais votre appareil ; voir la [Politique de confidentialité](privacy).`,
    limits: `L’offre gratuite comprend une règle intelligente, une rotation d’équipe et un profil d’alarmes ; Plus lève les trois limites. Une rotation d’équipe sert aux rythmes qui ne sont pas hebdomadaires — 4 jours travaillés / 4 de repos à partir d’une date d’ancrage, chaque phase avec sa propre heure, et un calendrier d’aperçu pour vérifier avant d’aller dormir.`,
  },

  sharpness: {
    heading: `Le Sharpness Score`,
    body: `Après une mission, vous pouvez lancer un échauffement facultatif. L’offre gratuite tire un jeu d’un lot de deux, Mind Games et Reaction Tap ; Plus en joue trois des cinq chaque matin, en rotation, soit environ deux minutes en tout. Dans les deux cas, l’échauffement saute le jeu que la mission vient de vous faire jouer, pour que résoudre des opérations afin de faire taire l’alarme ne vous en redonne pas en guise d’échauffement. Votre score est mesuré par rapport à votre propre référence glissante, pas par rapport à d’autres personnes : il se stabilise donc autour de 100 à mesure que l’application apprend votre normale. Une mauvaise matinée est un creux par rapport à votre vous d’hier, rien de plus. Ce n’est ni un test clinique ni un test cognitif.`,
    physical: `**Les missions physiques n’alimentent pas le score.** Scan an Object, Walk It Off et Photo Proof sont enregistrées intégralement, mais elles ne sont jamais comparées qu’à elles-mêmes. Une marche jusqu’à la salle de bains prend trente secondes et un calcul mental en prend deux : intégrer l’une dans un score bâti sur la précision et la vitesse collerait une matinée parfaite tout près du plancher. Se lever est bien compté — simplement pas au titre du Sharpness.`,
  },

  backup: {
    heading: `Sauvegarde et passage à un nouveau téléphone`,
    body: `Il n’y a aucun compte à créer, et rien n’y est réservé. Vous pouvez, si vous le souhaitez, vous connecter avec **Apple** ou **Google** — ce sont les seules options, et il n’existe pas de connexion par e-mail et mot de passe — dans un seul but : sauvegarder vos alarmes, réglages, scores et série pour qu’ils reviennent sur un nouveau téléphone.`,
    items: [
      `**C’est désactivé par défaut**, et toutes les fonctions marchent sans connexion. La sauvegarde s’exécute discrètement après une modification de vos données, et une alarme n’attend jamais le réseau pour sonner.`,
      `**Pour passer à un nouveau téléphone**, installez WakeSharp, connectez-vous avec le même compte Apple ou Google, puis restaurez. Les modifications plus récentes déjà présentes sur le nouvel appareil sont conservées.`,
      `**Se déconnecter** garde tout sur votre téléphone et cesse simplement de le sauvegarder.`,
      `**Supprimer le compte** — dans l’application, à _Réglages → Compte → Supprimer le compte_, ou comme décrit sur [wakesharp.app/account/delete](account-delete) — retire définitivement la sauvegarde et l’identifiant, tandis que les données présentes sur votre téléphone sont conservées.`,
    ],
    subscription: `Un abonnement est indépendant de tout cela : il vit avec votre compte App Store ou Google Play, si bien que Restaurer les achats ramène Plus, que vous vous connectiez un jour à WakeSharp ou non.`,
  },

  purchases: {
    heading: `Achats et WakeSharp Plus`,
    items: [
      `**Ce que Plus ajoute :** toutes les missions de réveil au-delà de Mind Games et Photo Proof, trois jeux d’échauffement chaque matin en rotation, tout votre historique Sharpness, des alarmes d’agenda intelligentes sans limite, ainsi que les scènes du Lark, les fonds d’écran d’alarme et les célébrations. Plus lève aussi la limite d’un seul profil d’alarmes et d’une seule rotation d’équipe, débloque les deux fonds d’écran Plus et les quatre scènes du Lark réservées à Plus, et vous laisse écrire une politique de rappel d’alarme personnalisée. **Votre alarme sonne gratuitement, pour toujours. Sans publicité.** Chaque alarme que vous réglez, les deux missions gratuites, Strict Mode là où c’est pris en charge, les préréglages de rappel d’alarme, les 13 sonneries d’alarme, les séries, les gels et la vérification de fiabilité ne coûtent rien.`,
      `**Plus Lifetime** est un achat unique plutôt qu’un abonnement : il ne se renouvelle jamais, et il n’y a rien à résilier.`,
      `**Restaurer un achat :** ouvrez la page d’abonnement et touchez _Restaurer_. Assurez-vous d’être connecté avec le compte Apple ou Google qui a servi à l’achat.`,
      `**Résilier :** [abonnements App Store](apple-subs) ou [abonnements Google Play](google-subs). Supprimer l’application ne résilie pas un abonnement.`,
      `**Les remboursements** sont gérés par Apple ou Google, pas par nous — mais écrivez-moi si quelque chose s’est mal passé et je vous aiderai autant que je le peux.`,
    ],
  },

  deleting: {
    heading: `Supprimer vos données`,
    body: `Tout ce que WakeSharp enregistre vit sur votre téléphone. Désinstaller l’application supprime l’ensemble, et nous n’en gardons aucune copie. Pour l’enregistrement d’abonnement anonyme conservé par notre prestataire de paiement, voir [combien de temps les données sont conservées](privacy).`,
  },

  feedback: {
    heading: `Bugs, retours et suggestions de fonctions`,
    body: `Tout est bienvenu, à [{email}](email). Pour un bug, les éléments les plus utiles sont votre modèle de téléphone, votre version d’OS, ce que vous attendiez et ce qui s’est passé à la place. Si une alarme n’a pas sonné, l’heure pour laquelle elle était réglée et l’heure à laquelle vous avez retrouvé le téléphone aident énormément.`,
  },
} satisfies typeof en;
