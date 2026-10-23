import { share as en } from '../en/share';

/**
 * Les pages d’atterrissage des liens : /c (un défi « Beat my wake »), /p (un
 * pacte de réveil, l’alarme partagée d’avant les réveils de groupe ; les anciens
 * liens ouvrent toujours l’application) et /g (une invitation à un réveil de
 * groupe). Les chaînes `script` sont lues par le décodeur en
 * ligne de chaque page ; `{name}`, `{rounds}`, `{difficulty}`, `{seconds}`,
 * `{time}` et `{days}` sont remplis par ce script à partir du lien lui-même.
 */
export const share = {
  challenge: {
    title: `Un défi du réveil - WakeSharp`,
    description: `Quelqu’un vous a lancé un défi pour une matinée WakeSharp.`,
    heading: `Beat my wake (battez mon réveil)`,
    intro: `Quelqu’un pense s’être réveillé plus affûté que vous ne le ferez.`,
    opening: `Ouverture du défi…`,
    cta: `Ouvrez ce lien sur votre téléphone, avec WakeSharp installé, pour jouer la même mission du matin, avec la même graine, et voir si vous faites mieux.`,
    error: `Ce lien n’a pas pu être lu. Les messageries coupent parfois les longs liens en deux : demandez à la personne qui vous l’a envoyé de le renvoyer.`,
    script: {
      anonymous: `Quelqu’un`,
      summary: `{name} a résolu {rounds} manches de niveau {difficulty} en {seconds} s.`,
      difficulty: { easy: `facile`, standard: `standard`, hard: `difficile` },
    },
  },
  pact: {
    title: `Une invitation au réveil - WakeSharp`,
    description: `Quelqu’un a partagé une alarme WakeSharp avec vous.`,
    heading: `Une invitation au réveil`,
    intro: `Quelqu’un veut se réveiller avec vous.`,
    opening: `Ouverture de votre invitation…`,
    cta: `Ouvrez ce lien sur votre téléphone, avec WakeSharp installé, et il réglera l’alarme pour vous. Rien n’est partagé à part l’heure : votre téléphone la fait sonner tout seul, sans compte et sans serveur.`,
    error: `Ce lien n’a pas pu être lu. Les messageries coupent parfois les longs liens en deux : demandez à la personne qui vous l’a envoyé de le renvoyer.`,
    script: {
      invited: `{name} vous invite à {time} · {days}`,
      invitedAnonymous: `Vous êtes invité à {time} · {days}`,
      once: `une fois`,
      /** Dimanche en premier, comme le masque des jours du codec. */
      days: [`dim.`, `lun.`, `mar.`, `mer.`, `jeu.`, `ven.`, `sam.`],
    },
  },
  group: {
    title: `Une invitation à un réveil de groupe - WakeSharp`,
    description: `Quelqu’un vous a invité à un réveil de groupe WakeSharp.`,
    heading: `Une invitation à un réveil de groupe`,
    intro: `Quelqu’un veut se réveiller avec vous.`,
    opening: `Ouverture de votre invitation…`,
    /** Affiché une fois le code du lien vérifié. */
    cta: `Ouvrez ce lien sur un iPhone avec WakeSharp installé pour rejoindre le groupe. L’alarme de chacun sonne à la même heure, sur son propre téléphone, et le groupe voit qui est debout. Rejoindre le groupe nécessite un compte WakeSharp, pour que vos amis voient que vous êtes debout. Les réveils de groupe sont sur iPhone pour l’instant : la version 2.9 de Google Play ne les a pas.`,
    /** Le bouton qui transmet le code à l’application installée. */
    open: `Ouvrir WakeSharp`,
    error: `Ce lien n’a pas pu être lu. Demandez à la personne qui vous l’a envoyé de le renvoyer, ou de partager un nouveau lien d’invitation depuis le groupe.`,
    script: {
      /** Quand le lien contient l’horaire. */
      invited: `Vous êtes invité à un réveil de groupe à {time} · {days}`,
      /** Quand il ne le contient pas (lien d’une application plus ancienne). */
      invitedNoTime: `Vous êtes invité à un réveil de groupe.`,
      once: `une fois`,
      /** Dimanche en premier, comme le masque des jours de l’application. */
      days: [`dim.`, `lun.`, `mar.`, `mer.`, `jeu.`, `ven.`, `sam.`],
    },
  },
  get: {
    heading: `Obtenir WakeSharp`,
    /** `{trialDays}` et `{annual}` viennent de src/config/site.ts ; l’essai n’apparaît jamais sans son prix. */
    body: `Commencez par {trialDays} jours d’essai gratuit de WakeSharp Illimité, puis {annual} par an. Régler votre première alarme prend une dizaine de secondes.`,
  },
} satisfies typeof en;
