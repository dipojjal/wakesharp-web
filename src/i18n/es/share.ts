import { share as en } from '../en/share';

/**
 * Las dos páginas de aterrizaje de enlaces, /c (un reto «Beat my wake»)
 * y /p (un pacto para despertar). Las cadenas de `script` las lee el
 * decodificador de cada página; `{name}`, `{rounds}`, `{difficulty}`,
 * `{seconds}`, `{time}` y `{days}` los rellena ese script desde el enlace.
 */
export const share = {
  challenge: {
    title: `Un reto para despertar — WakeSharp`,
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
    title: `Una invitación para despertar — WakeSharp`,
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
  get: {
    heading: `Descarga WakeSharp`,
    body: `Es gratis, y poner tu primera alarma lleva unos diez segundos.`,
  },
} satisfies typeof en;
