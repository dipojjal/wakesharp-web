import { share as en } from '../en/share';

/**
 * Las páginas de aterrizaje de enlaces: /c (un reto «Beat my wake»), /p (un
 * pacto para despertar, la alarma compartida anterior a las alarmas de grupo;
 * los enlaces antiguos siguen abriendo la app) y /g (una invitación a una
 * alarma de grupo). Las cadenas de `script` las lee el
 * decodificador de cada página; `{name}`, `{rounds}`, `{difficulty}`,
 * `{seconds}`, `{time}` y `{days}` los rellena ese script desde el enlace.
 */
export const share = {
  challenge: {
    title: `Un reto para despertar - WakeSharp`,
    description: `Alguien te ha retado a una mañana de WakeSharp.`,
    heading: `Beat my wake (supera mi despertar)`,
    intro: `Alguien cree que despertó más lúcido de lo que tú vas a despertar.`,
    opening: `Abriendo el reto…`,
    cta: `Abre este enlace en tu teléfono con WakeSharp instalado para jugar la misma misión matutina, con la misma semilla, y ver si lo superas.`,
    error: `No se pudo leer este enlace. Las apps de chat a veces cortan los enlaces largos por la mitad, así que pide a quien te lo envió que lo mande otra vez.`,
    script: {
      anonymous: `Alguien`,
      summary: `{name} resolvió {rounds} rondas en nivel {difficulty} en {seconds} s.`,
      difficulty: { easy: `fácil`, standard: `estándar`, hard: `difícil` },
    },
  },
  pact: {
    title: `Una invitación para despertar - WakeSharp`,
    description: `Alguien ha compartido una alarma de WakeSharp contigo.`,
    heading: `Una invitación para despertar`,
    intro: `Alguien quiere despertar contigo.`,
    opening: `Abriendo tu invitación…`,
    cta: `Abre este enlace en tu teléfono con WakeSharp instalado y configurará la alarma por ti. Solo se comparte la hora: tu teléfono la hace sonar por su cuenta, sin cuenta ni servidor de por medio.`,
    error: `No se pudo leer este enlace. Las apps de chat a veces cortan los enlaces largos por la mitad, así que pide a quien te lo envió que lo mande otra vez.`,
    script: {
      invited: `{name} te invita a las {time} · {days}`,
      invitedAnonymous: `Te han invitado a las {time} · {days}`,
      once: `una vez`,
      /** Domingo primero, como la máscara de días del códec. */
      days: [`dom`, `lun`, `mar`, `mié`, `jue`, `vie`, `sáb`],
    },
  },
  group: {
    title: `Una invitación a una alarma de grupo - WakeSharp`,
    description: `Alguien te ha invitado a una alarma de grupo de WakeSharp.`,
    heading: `Una invitación a una alarma de grupo`,
    intro: `Alguien quiere despertar contigo.`,
    opening: `Abriendo tu invitación…`,
    /** Se muestra cuando el código del enlace es válido. */
    cta: `Abre este enlace en un iPhone con WakeSharp instalado para unirte al grupo. La alarma de todos suena a la misma hora, cada uno en su teléfono, y el grupo puede ver quién ya se ha levantado. Para unirte necesitas una cuenta de WakeSharp, para que tus amigos vean que te has levantado. Las alarmas de grupo por ahora son solo para iPhone: la versión 2.9 de Google Play no las tiene.`,
    /** El botón que entrega el código a la app instalada. */
    open: `Abrir WakeSharp`,
    error: `No se pudo leer este enlace. Pide a quien te lo envió que lo mande otra vez, o que comparta un enlace de invitación nuevo desde el grupo.`,
    script: {
      /** Cuando el enlace lleva el horario. */
      invited: `Te han invitado a una alarma de grupo a las {time} · {days}`,
      /** Cuando no lo lleva (un enlace de una app anterior). */
      invitedNoTime: `Te han invitado a una alarma de grupo.`,
      once: `una vez`,
      /** Domingo primero, como la máscara de días de la app. */
      days: [`dom`, `lun`, `mar`, `mié`, `jue`, `vie`, `sáb`],
    },
  },
  get: {
    heading: `Descarga WakeSharp`,
    /** `{trialDays}` y `{annual}` vienen de src/config/site.ts; la prueba nunca aparece sin su precio. */
    body: `Empieza con {trialDays} días de prueba gratis de WakeSharp Ilimitado, y después {annual} al año. Poner tu primera alarma lleva unos diez segundos.`,
  },
} satisfies typeof en;
