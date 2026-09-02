import { share as en } from '../en/share';

/**
 * Die beiden Link-Landeseiten, /c (eine „Schlag meinen Morgen“-Herausforderung)
 * und /p (eine Weck-Verabredung). Die `script`-Strings liest der Inline-Decoder
 * jeder Seite; `{name}`, `{rounds}`, `{difficulty}`, `{seconds}`, `{time}` und
 * `{days}` füllt dieses Skript aus dem Link selbst.
 */
export const share = {
  challenge: {
    title: `Eine Weck-Herausforderung — WakeSharp`,
    description: `Jemand hat dich zu einem WakeSharp-Morgen herausgefordert.`,
    heading: `Schlag meinen Morgen`,
    intro: `Jemand glaubt, hellwacher aufgewacht zu sein, als du es sein wirst.`,
    opening: `Herausforderung wird geöffnet …`,
    cta: `Öffne diesen Link auf deinem Telefon mit installiertem WakeSharp, um dieselbe Morgenmission mit demselben Seed zu spielen, und sieh, ob du sie schlägst.`,
    error: `Dieser Link ließ sich nicht lesen. Chat-Apps schneiden lange Links manchmal in der Mitte ab; bitte also die Person, die ihn geschickt hat, ihn noch einmal zu schicken.`,
    script: {
      anonymous: `Jemand`,
      summary: `{name} hat {rounds} Runden auf {difficulty} in {seconds}s gelöst.`,
      difficulty: { easy: `leicht`, standard: `normal`, hard: `schwer` },
    },
  },
  pact: {
    title: `Eine Weck-Einladung — WakeSharp`,
    description: `Jemand hat einen WakeSharp-Alarm mit dir geteilt.`,
    heading: `Eine Weck-Einladung`,
    intro: `Jemand möchte mit dir zusammen aufwachen.`,
    opening: `Einladung wird geöffnet …`,
    cta: `Öffne diesen Link auf deinem Telefon mit installiertem WakeSharp, und er stellt den Alarm für dich. Geteilt wird nichts außer der Uhrzeit: Dein Telefon klingelt ihn von allein, ohne Konto und ohne Server dazwischen.`,
    error: `Dieser Link ließ sich nicht lesen. Chat-Apps schneiden lange Links manchmal in der Mitte ab; bitte also die Person, die ihn geschickt hat, ihn noch einmal zu schicken.`,
    script: {
      invited: `{name} hat dich eingeladen zu {time} · {days}`,
      invitedAnonymous: `Du wurdest eingeladen zu {time} · {days}`,
      once: `einmalig`,
      /** Sonntag zuerst, passend zur Wochentagsmaske des Codecs. */
      days: [`So`, `Mo`, `Di`, `Mi`, `Do`, `Fr`, `Sa`],
    },
  },
  get: {
    heading: `WakeSharp laden`,
    body: `Sie ist kostenlos, und deinen ersten Alarm stellst du in etwa zehn Sekunden.`,
  },
} satisfies typeof en;
