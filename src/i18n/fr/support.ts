import type { en } from '../en';
export const support = {
  "title": "Aide WakeSharp : alarme qui ne sonne pas, missions, paiement",
  "description": "De l’aide sur WakeSharp : pourquoi une alarme peut ne pas sonner, comment marchent les missions et le score de Vivacité, et comment gérer l’abonnement.",
  "heading": "Assistance",
  "intro": "WakeSharp est une petite équipe, et c’est un humain qui répond aux e-mails.",
  "getInTouch": {
    "heading": "Nous écrire",
    "body": "Écrivez à [{email}](email). Je réponds en général sous **2 à 3 jours ouvrés**. Indiquer votre modèle de téléphone, votre version d’OS et la version de WakeSharp affichée dans les Réglages vous vaudra presque toujours une réponse plus rapide."
  },
  "requirements": {
    "heading": "Configuration requise",
    "body": "WakeSharp nécessite {ios} sur iPhone, ou {android} sur Android. Les applications de montre nécessitent watchOS 26 ou Wear OS 3."
  },
  "didntRing": {
    "heading": "Mon alarme n’a pas sonné",
    "callout": "**Commencez dans l’application, pas ici.** Ouvrez WakeSharp → Réglages → _Fiabilité du réveil_. Elle lit l’état réel de votre téléphone (autorisations, volume de l’alarme, Ne pas déranger, réglages de notification, affichage sur l’écran verrouillé, restrictions de batterie) et commence par un verdict clair : elle sonnera, elle risque de ne pas sonner, ou elle ne peut pas sonner. Là où un correctif tient en un geste, elle vous le propose ; là où le téléphone refuse de nous dire quelque chose, elle le dit au lieu d’afficher une coche verte. Elle s’exécute aussi avant le coucher et signale le pire point relevé.",
    "report": "Si une alarme a déjà été manquée, WakeSharp affiche ce matin-là un rapport qui nomme la cause quand il peut la prouver (autorisation révoquée, volume de l’alarme à zéro, Silence total, téléphone éteint) et qui dit « Nous n’avons pas pu déterminer pourquoi » quand il ne le peut pas. Les listes ci-dessous servent dans ce dernier cas.",
    "iphone": {
      "heading": "Sur iPhone",
      "steps": [
        "**Vérifiez que l’alarme est bien activée** sur l’écran d’accueil, et que ses jours de répétition incluent aujourd’hui.",
        "**Vérifiez l’autorisation d’alarme.** Réglages → WakeSharp. Si l’accès aux alarmes a été refusé, WakeSharp ne peut rien programmer. Activez-le, puis enregistrez de nouveau l’alarme.",
        "**Vérifiez le volume et le bouton silencieux.** WakeSharp sonne à travers le mode Silence et Concentration, mais il ne peut pas sonner sur un appareil éteint ou déchargé.",
        "**Vérifiez le Bluetooth.** Si votre téléphone est encore connecté à un casque ou à une voiture, l’alarme y joue peut-être.",
        "**Redémarrez le téléphone** et enregistrez de nouveau l’alarme si le problème persiste."
      ]
    },
    "android": {
      "heading": "Sur Android",
      "steps": [
        "**Vérifiez que l’alarme est activée** et que ses jours de répétition incluent aujourd’hui.",
        "**Autorisez les notifications.** Paramètres → Applications → WakeSharp → Notifications. L’écran de sonnerie arrive sous forme de notification plein écran ; bloquer les notifications le supprime.",
        "**Désactivez l’optimisation de la batterie pour WakeSharp.** Paramètres → Applications → WakeSharp → Batterie → _Sans restriction_. C’est de loin la cause la plus fréquente sur les appareils Samsung, Xiaomi, OPPO, vivo et OnePlus, plus agressifs qu’Android d’origine. Sur Samsung, vérifiez aussi Paramètres → Batterie → Limites d’utilisation en arrière-plan et assurez-vous que WakeSharp ne figure pas dans les applications « en veille » ou « en veille profonde ».",
        "**Vérifiez que Ne pas déranger n’est pas réglé sur Silence total.** Les modes Prioritaire et Alarmes uniquement laissent passer les alarmes ; Silence total les coupe aussi, et aucune application ne peut passer outre.",
        "**Ne « forcez pas l’arrêt » de WakeSharp.** Forcer l’arrêt annule ses alarmes programmées jusqu’à ce que vous rouvriez l’application.",
        "**Après un redémarrage, ouvrez WakeSharp une fois.** Il réarme vos alarmes au démarrage, mais l’ouvrir garantit que la synchronisation a bien eu lieu."
      ]
    },
    "warning": "**Si être réveillé compte vraiment, programmez une seconde alarme sur un autre appareil.** WakeSharp programme les alarmes via le système d’exploitation, et c’est le système qui décide si elles sonnent. Voir l’[avis de sécurité](terms-safety).",
    "guidesHeading": "Guides détaillés"
  },
  "ringsThrough": {
    "heading": "WakeSharp sonne-t-il vraiment à travers le mode Silence, Concentration et Ne pas déranger ?",
    "body": "Dans des circonstances normales, oui: c’est tout l’intérêt de l’application, et c’est le mécanisme qu’utilise l’horloge intégrée de chaque plateforme.",
    "items": [
      "**Sur iPhone**, WakeSharp utilise AlarmKit d’Apple, qui permet de sonner à travers le mode Silence et Concentration **une fois que vous avez accordé l’autorisation d’alarme**. Refusez-la ou révoquez-la et WakeSharp ne peut plus programmer d’alarme du tout.",
      "**Sur Android**, l’alarme joue sur le canal audio dédié aux alarmes, qui sonne à travers le mode silencieux, et à travers Ne pas déranger quand ce mode autorise les alarmes (Silence total coupe tous les sons, alarmes comprises), et affiche une alerte plein écran par-dessus l’écran verrouillé: **à condition que les autorisations d’alarme exacte, de notification et d’écran verrouillé soient en place**. Il n’y a pas d’invite supplémentaire pour le canal des alarmes lui-même, mais une notification bloquée ou une restriction de batterie peut malgré tout empêcher l’alerte."
    ],
    "limit": "Ce qu’aucune des deux plateformes ne peut faire, c’est sonner sur un téléphone éteint, déchargé, ou dont les autorisations de l’application ont été révoquées."
  },
  "missions": {
    "heading": "Missions et rappel d’alarme",
    "items": [
      "Choisissez une mission ci-dessous ou combinez-en plusieurs. Voici la sélection publique sur iPhone 2.14. Les missions utilisant la caméra, le mouvement ou la voix demandent les autorisations et le matériel correspondants.",
      "Choisissez une bouteille, une tasse ou un lavabo. Quand l’alarme sonne, dirigez la caméra vers cet objet. La confirmation verte indique que WakeSharp l’a reconnu. La reconnaissance se fait sur votre téléphone.",
      "**Si une mission ne peut pas fonctionner** ce matin-là (un appareil photo en panne, un téléphone sans podomètre), WakeSharp se rabat sur une autre qui le peut, pour que vous ne restiez pas coincé avec une alarme que vous ne pouvez pas terminer.",
      "Sur iPhone 2.14, arrêter ou reporter l’alarme la repousse d’une minute. Elle peut se répéter pendant une heure au maximum si la mission reste inachevée. Les commandes du téléphone restent utilisables."
    ]
  },
  "smartAlarms": {
    "heading": "Alarmes d’agenda intelligentes",
    "body": "Une règle intelligente sonne un nombre de minutes défini avant votre première réunion, dans les limites d’une heure de réveil au plus tôt et au plus tard que vous choisissez. WakeSharp revérifie votre agenda pendant la nuit : si la réunion se déplace, l’alarme se déplace. Si vous refusez l’accès à l’agenda, tout le reste fonctionne: vous réglez simplement les heures vous-même. Vos événements ne quittent jamais votre appareil ; voir la [Politique de confidentialité](privacy).",
    "limits": "Une rotation d’équipe sert aux rythmes qui ne sont pas hebdomadaires: 4 jours travaillés / 4 de repos à partir d’une date d’ancrage, chaque phase avec sa propre heure, et un calendrier d’aperçu pour vérifier avant d’aller dormir."
  },
  "sharpness": {
    "heading": "Le score de Vivacité",
    "body": "Le score d’acuité est un résultat quotidien dans l’application. Retrouvez l’historique, les séries et les badges, puis votre progression avec Lark dans Nest. Ce n’est ni un score de sommeil ni une évaluation médicale. Il ne détermine pas votre aptitude à conduire ou travailler.",
    "physical": "L’échauffement mental est facultatif. Les calculs, les paires et les séquences peuvent aussi servir de missions. Word Dash et Reaction Tap sont des jeux d’échauffement, pas des missions de réveil."
  },
  "backup": {
    "heading": "Sauvegarde et passage à un nouveau téléphone",
    "body": "Aucun compte WakeSharp n’est obligatoire. Une connexion facultative avec Apple ou Google sauvegarde les alarmes, l’historique, les préférences et de petites vignettes des photos cibles. La comparaison des photos et le calendrier sont traités sur l’appareil. Le contenu des événements y reste. Consultez la politique de confidentialité.",
    "items": [
      "**C’est désactivé par défaut**, et toutes les fonctions marchent sans connexion. La sauvegarde s’exécute discrètement après une modification de vos données, et une alarme n’attend jamais le réseau pour sonner.",
      "**Pour passer à un nouveau téléphone**, installez WakeSharp, connectez-vous avec le même compte Apple ou Google, puis restaurez. Les modifications plus récentes déjà présentes sur le nouvel appareil sont conservées.",
      "**Se déconnecter** garde tout sur votre téléphone et cesse simplement de le sauvegarder.",
      "**Supprimer le compte** (dans l’application, à _Réglages → Compte → Supprimer le compte_, ou comme décrit sur [wakesharp.app/account/delete](account-delete)) retire définitivement la sauvegarde et l’identifiant, tandis que les données présentes sur votre téléphone sont conservées."
    ],
    "subscription": "Un abonnement est indépendant de tout cela : il vit avec votre compte App Store ou Google Play, si bien que Restaurer les achats ramène WakeSharp Illimité, que vous vous connectiez un jour à WakeSharp ou non."
  },
  "purchases": {
    "heading": "Achats et WakeSharp Illimité",
    "items": [
      "**WakeSharp Illimité**, c’est toute l’application : toutes les missions de réveil, la rotation quotidienne des jeux d’échauffement, tout votre historique de Vivacité, les alarmes d’agenda intelligentes, les rotations d’équipe et les profils, ainsi que toutes les scènes du Lark et tous les fonds d’écran. Les nouveaux abonnés peuvent commencer par **{trialDays} jours d’essai gratuit** de la formule annuelle, puis {annual} par an, ou choisir la formule mensuelle à {monthly} par mois, sans essai. WakeSharp n’affiche aucune publicité.",
      "**Lifetime** (à vie) était un achat unique, et il reste valable pour tous ceux qui l’ont acheté : il ne se renouvelle jamais, et il n’y a rien à résilier.",
      "**Restaurer un achat :** ouvrez la page d’abonnement et touchez _Restaurer_. Assurez-vous d’être connecté avec le compte Apple ou Google qui a servi à l’achat.",
      "**Résilier :** [abonnements App Store](apple-subs) ou [abonnements Google Play](google-subs), quand vous voulez, y compris pendant l’essai gratuit. Supprimer l’application ne résilie pas un abonnement.",
      "**Les remboursements** sont gérés par Apple ou Google, pas par nous, mais écrivez-moi si quelque chose s’est mal passé et je vous aiderai autant que je le peux."
    ]
  },
  "deleting": {
    "heading": "Supprimer vos données",
    "body": "Désinstaller efface les données locales, mais pas la sauvegarde cloud ni l’abonnement. Supprimez la sauvegarde dans Réglages → Compte → Supprimer le compte ou sur la page dédiée. Gérez l’abonnement séparément dans la boutique. [WakeSharp](privacy)."
  },
  "feedback": {
    "heading": "Bugs, retours et suggestions de fonctions",
    "body": "Tout est bienvenu, à [{email}](email). Pour un bug, les éléments les plus utiles sont votre modèle de téléphone, votre version d’OS, ce que vous attendiez et ce qui s’est passé à la place. Si une alarme n’a pas sonné, l’heure pour laquelle elle était réglée et l’heure à laquelle vous avez retrouvé le téléphone aident énormément."
  }
} satisfies typeof en.support;
