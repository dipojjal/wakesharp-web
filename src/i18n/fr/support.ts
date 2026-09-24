import { support as en } from '../en/support';

/**
 * /support — l’URL d’assistance déclarée dans App Store Connect. Clés de lien
 * utilisées ci-dessous : email, terms-safety, privacy, account-delete,
 * apple-subs, google-subs. `{ios}` et `{android}` sont les configurations
 * requises, et `{annual}`, `{monthly}` et `{trialDays}` les prix, tous issus
 * de src/config/site.ts.
 */
export const support = {
  title: `Aide WakeSharp : alarme qui ne sonne pas, missions, paiement`,
  description: `De l’aide sur WakeSharp : pourquoi une alarme peut ne pas sonner, comment marchent les missions et le score de Vivacité, et comment gérer l’abonnement.`,
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
    callout: `**Commencez dans l’application, pas ici.** Ouvrez WakeSharp → Réglages → _Fiabilité du réveil_. Elle lit l’état réel de votre téléphone — autorisations, volume de l’alarme, Ne pas déranger, réglages de notification, affichage sur l’écran verrouillé, restrictions de batterie — et commence par un verdict clair : elle sonnera, elle risque de ne pas sonner, ou elle ne peut pas sonner. Là où un correctif tient en un geste, elle vous le propose ; là où le téléphone refuse de nous dire quelque chose, elle le dit au lieu d’afficher une coche verte. Elle s’exécute aussi avant le coucher et signale le pire point relevé.`,
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
      `**Sur Android**, l’alarme joue sur le canal audio dédié aux alarmes, qui sonne à travers le mode silencieux, et à travers Ne pas déranger quand ce mode autorise les alarmes (Silence total coupe tous les sons, alarmes comprises), et affiche une alerte plein écran par-dessus l’écran verrouillé — **à condition que les autorisations d’alarme exacte, de notification et d’écran verrouillé soient en place**. Il n’y a pas d’invite supplémentaire pour le canal des alarmes lui-même, mais une notification bloquée ou une restriction de batterie peut malgré tout empêcher l’alerte.`,
    ],
    limit: `Ce qu’aucune des deux plateformes ne peut faire, c’est sonner sur un téléphone éteint, déchargé, ou dont les autorisations de l’application ont été révoquées.`,
  },

  missions: {
    heading: `Missions et rappel d’alarme`,
    items: [
      `**La mission** est ce qui vous vaut la matinée, et il y en a plus d’une douzaine : des énigmes de calcul et de mémoire comme _Jeux d’esprit_ et _Choc des couleurs_, une photo d’un endroit choisi la veille (_Preuve photo_), un objet réel à l’autre bout de la pièce (_Scanner un objet_, _Va chercher_), des pas (_Marchez un peu_), la lumière du jour à une fenêtre (_Première lumière_), recopier une phrase (_Recopier_) ou répondre à voix haute (_Sept en sept_, _Nommez cinq_). _Surprenez-moi_ en choisit une différente chaque matin. Une alarme peut demander plusieurs missions à la suite, dans l’ordre de votre choix.`,
      `**Mes endroits et mes codes**, c’est là que _Scanner un objet_ devient personnel. Photographiez un endroit vers lequel vous marcherez, comme la bouilloire ou la porte d’entrée, ou enregistrez un QR code ou un code-barres que vous collez là où la matinée doit vous envoyer, comme le miroir de la salle de bains ou la boîte à café. Une alarme peut alors demander cette cible précise. C’est une fonction _à l’intérieur_ de la mission de scan plutôt qu’une mission à part entière, et ni la photographie ni le code ne sont stockés — seulement une empreinte de chacun.`,
      `**Si une mission ne peut pas fonctionner** ce matin-là — un appareil photo en panne, un téléphone sans podomètre —, WakeSharp se rabat sur une autre qui le peut, pour que vous ne restiez pas coincé avec une alarme que vous ne pouvez pas terminer.`,
      `**Reporter ou arrêter l’alarme ne termine pas la matinée.** Quelle que soit la façon dont vous faites taire l’alarme, la matinée ne compte qu’une fois la mission accomplie. Les commandes de votre téléphone fonctionnent toujours : l’éteindre, par exemple, n’est jamais bloqué.`,
    ],
  },

  smartAlarms: {
    heading: `Alarmes d’agenda intelligentes`,
    body: `Une règle intelligente sonne un nombre de minutes défini avant votre première réunion, dans les limites d’une heure de réveil au plus tôt et au plus tard que vous choisissez. WakeSharp revérifie votre agenda pendant la nuit : si la réunion se déplace, l’alarme se déplace. Si vous refusez l’accès à l’agenda, tout le reste fonctionne — vous réglez simplement les heures vous-même. Vos événements ne quittent jamais votre appareil ; voir la [Politique de confidentialité](privacy).`,
    limits: `Une rotation d’équipe sert aux rythmes qui ne sont pas hebdomadaires — 4 jours travaillés / 4 de repos à partir d’une date d’ancrage, chaque phase avec sa propre heure, et un calendrier d’aperçu pour vérifier avant d’aller dormir.`,
  },

  sharpness: {
    heading: `Le score de Vivacité`,
    body: `Après une mission, vous pouvez lancer un échauffement facultatif : trois des cinq jeux d’échauffement chaque matin, en rotation, soit environ deux minutes en tout, en sautant le jeu que la mission vient de vous faire jouer. Votre score est mesuré par rapport à votre propre référence glissante, pas par rapport à d’autres personnes : il se stabilise donc autour de 100 à mesure que l’application apprend votre normale. Une mauvaise matinée est un creux par rapport à votre vous d’hier, rien de plus. C’est un score propre à l’application, pas un test clinique ni cognitif.`,
    physical: `**Le score vient de l’échauffement.** La mission est ce qui vous fait lever ; l’échauffement mental facultatif qui suit est ce qui produit votre score de Vivacité, si bien qu’une longue marche jusqu’à la cuisine ne compte jamais contre vous.`,
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
    subscription: `Un abonnement est indépendant de tout cela : il vit avec votre compte App Store ou Google Play, si bien que Restaurer les achats ramène WakeSharp Illimité, que vous vous connectiez un jour à WakeSharp ou non.`,
  },

  purchases: {
    heading: `Achats et WakeSharp Illimité`,
    items: [
      `**WakeSharp Illimité**, c’est toute l’application : toutes les missions de réveil, la rotation quotidienne des jeux d’échauffement, tout votre historique de Vivacité, les alarmes d’agenda intelligentes, les rotations d’équipe et les profils, ainsi que toutes les scènes du Lark et tous les fonds d’écran. Les nouveaux abonnés peuvent commencer par **{trialDays} jours d’essai gratuit** de la formule annuelle, puis {annual} par an, ou choisir la formule mensuelle à {monthly} par mois, sans essai. WakeSharp n’affiche aucune publicité.`,
      `**Lifetime** (à vie) était un achat unique, et il reste valable pour tous ceux qui l’ont acheté : il ne se renouvelle jamais, et il n’y a rien à résilier.`,
      `**Restaurer un achat :** ouvrez la page d’abonnement et touchez _Restaurer_. Assurez-vous d’être connecté avec le compte Apple ou Google qui a servi à l’achat.`,
      `**Résilier :** [abonnements App Store](apple-subs) ou [abonnements Google Play](google-subs), quand vous voulez, y compris pendant l’essai gratuit. Supprimer l’application ne résilie pas un abonnement.`,
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
