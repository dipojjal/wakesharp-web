import { share as en } from '../en/share';

/**
 * Les deux pages d’atterrissage des liens, /c (un défi « Battez mon réveil ») et
 * /p (un pacte de réveil). Les chaînes `script` sont lues par le décodeur en
 * ligne de chaque page ; `{name}`, `{rounds}`, `{difficulty}`, `{seconds}`,
 * `{time}` et `{days}` sont remplis par ce script à partir du lien lui-même.
 */
export const share = {
  challenge: {
    title: `Un défi du réveil — WakeSharp`,
    description: `Quelqu’un vous a lancé un défi pour une matinée WakeSharp.`,
    heading: `Battez mon réveil`,
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
    title: `Une invitation au réveil — WakeSharp`,
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
  get: {
    heading: `Obtenir WakeSharp`,
    body: `C’est gratuit, et régler votre première alarme prend une dizaine de secondes.`,
  },
} satisfies typeof en;
