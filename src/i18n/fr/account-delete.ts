import { accountDelete as en } from '../en/account-delete';

/** /account/delete - la page de suppression de compte liée depuis le formulaire « Sécurité des données » de Google Play. */
export const accountDelete = {
  title: `Supprimer votre compte - WakeSharp`,
  description: `Comment supprimer votre compte WakeSharp facultatif et sa sauvegarde dans le cloud, depuis l’application ou par e-mail.`,
  heading: `Supprimer votre compte WakeSharp`,
  intro: `Les comptes WakeSharp sont facultatifs : ils n’existent que pour sauvegarder vos alarmes, réglages, scores et série afin que vous puissiez les restaurer sur un nouveau téléphone. Supprimer le vôtre retire cette sauvegarde et l’identifiant lui-même, définitivement.`,
  inApp: {
    heading: `Le supprimer dans l’application`,
    steps: [
      `Ouvrez WakeSharp et allez dans **Réglages**.`,
      `Touchez **Compte**.`,
      `Touchez **Supprimer le compte**, puis confirmez.`,
    ],
    body: `C’est tout le parcours. Cela supprime définitivement votre identifiant (Se connecter avec Apple ou Google), votre sauvegarde dans le cloud (alarmes, réglages, historique de réveils, scores, série, ainsi que toutes les vignettes de référence photo ou de scan enregistrées) et, pour Se connecter avec Apple, révoque le jeton de connexion auprès d’Apple. Il n’y a pas de délai d’attente : la ligne du compte et tout ce qui est stocké avec elle dans votre sauvegarde sont supprimés ensemble. Certaines données sont conservées plus longtemps, comme indiqué ci-dessous.`,
  },
  kept: {
    heading: `Ce qui n’est pas supprimé`,
    items: [
      `**Les données sur votre téléphone.** Vos alarmes, scores et réglages restent sur votre appareil: supprimer le compte, ce n’est pas supprimer vos alarmes. Retirez l’application elle-même si vous voulez aussi effacer les données locales.`,
      `**Les achats.** Un abonnement WakeSharp Illimité, comme un achat Lifetime (à vie), appartient à votre compte App Store ou Google Play, pas à votre compte WakeSharp, et survit à la suppression.`,
      `**Notre copie des événements d’achat.** Chaque événement d’abonnement que RevenueCat nous envoie est conservé 400 jours, même après la suppression du compte, puis supprimé.`,
      `**Les copies par e-mail des réponses de résiliation et des messages au support.** Elles restent dans notre boîte de support tant que nous en avons besoin ; écrivez-nous pour les faire supprimer.`,
      `**Les données d’analyse et de marketing** chez PostHog et AppsFlyer. Elles utilisent des identifiants pseudonymes qui peuvent être liés à votre compte après la connexion, et sont supprimées sur demande : voir la [politique de confidentialité](privacy).`,
    ],
  },
  byEmail: {
    heading: `Si vous n’avez plus l’application`,
    body: `Écrivez à [{email}](email) depuis l’adresse avec laquelle vous vous êtes connecté (pour Se connecter avec Apple avec une adresse masquée, indiquez plutôt la date approximative d’inscription) et nous supprimerons le compte pour vous. Nous vérifions la demande et menons la suppression à bien sous 30 jours, presque toujours bien plus tôt.`,
  },
} satisfies typeof en;
