import { contact as en } from '../en/contact';

/**
 * Le formulaire de contact et ses deux pages de résultat. Le `<select>` garde
 * ses attributs `value=` anglais dans toutes les langues
 * (src/templates/ContactPage.astro) afin que la boîte d’assistance lise un seul
 * vocabulaire ; seuls les libellés visibles ci-dessous sont traduits.
 */
export const contact = {
  form: {
    title: `Contact — WakeSharp`,
    description: `Écrivez directement au développeur de WakeSharp : rapports de bug, problèmes d’alarme, questions d’abonnement et suggestions de fonctions.`,
    heading: `Contact`,
    intro: `WakeSharp est une petite équipe, et un humain lit tout ce qui arrive ici.`,
    callout: `Je réponds en général sous **2 à 3 jours ouvrés**. Si vous préférez utiliser votre propre messagerie, écrivez à [{email}](email) — cela arrive dans la même boîte de réception.`,
    nameLabel: `Votre nom`,
    emailLabel: `Votre e-mail`,
    emailHint: `Pour que je puisse vous répondre. Il ne sert à rien d’autre.`,
    topicLabel: `De quoi s’agit-il ?`,
    topicPlaceholder: `Choisissez…`,
    topics: {
      alarm: `Une alarme n’a pas sonné`,
      bug: `Rapport de bug`,
      billing: `Abonnement ou facturation`,
      feature: `Suggestion de fonction`,
      other: `Autre chose`,
    },
    deviceLabel: `Téléphone et version de l’OS`,
    deviceHint: `— facultatif, mais cela répond à la moitié de mes questions de suivi`,
    devicePlaceholder: `p. ex. Pixel 9, Android 16`,
    messageLabel: `Message`,
    messageHint: `Pour un bug, ce que vous attendiez et ce qui s’est passé à la place est la chose la plus utile que vous puissiez me dire. Si une alarme a échoué, l’heure pour laquelle elle était réglée et l’heure à laquelle vous avez retrouvé le téléphone aident énormément.`,
    honeypotLabel: `Société`,
    submit: `Envoyer le message`,
    privacyNote: `Votre message et votre adresse e-mail me sont envoyés par e-mail et ne sont stockés nulle part ailleurs. Voir la [Politique de confidentialité](privacy).`,
  },
  sent: {
    title: `Message envoyé — WakeSharp`,
    description: `Votre message à WakeSharp a bien été envoyé.`,
    heading: `Message envoyé`,
    intro: `Merci — il est en route vers ma boîte de réception.`,
    body: `Je réponds en général sous **2 à 3 jours ouvrés**, depuis [{email}](email). Si vous n’avez aucune nouvelle, vérifiez vos spams avant de le croire perdu.`,
    meanwhile: `En attendant, la [page d’assistance](support) couvre les questions qui reviennent le plus — dont la liste complète pour une alarme qui n’a pas sonné.`,
    backHome: `Retour à la page d’accueil`,
  },
  error: {
    title: `Message non envoyé — WakeSharp`,
    description: `Le formulaire de contact de WakeSharp n’a pas pu transmettre votre message.`,
    heading: `Cela n’est pas passé`,
    intro: `Votre message n’a pas été transmis, et je préfère vous le dire plutôt que de faire comme si de rien n’était.`,
    callout: `Écrivez plutôt directement à [{email}](email). Rien de ce que vous avez tapé n’a été conservé, il faudra donc le retaper — désolé pour ça.`,
    body: `Vous arrivez aussi ici si un champ obligatoire est arrivé vide, si l’adresse e-mail n’était pas valide, ou si le message a dépassé la limite de 4 000 caractères autorisée par le formulaire.`,
    backToForm: `Retour au formulaire`,
    support: `Assistance`,
    homepage: `Page d’accueil`,
  },
} satisfies typeof en;
