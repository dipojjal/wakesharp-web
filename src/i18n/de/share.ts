import { share as en } from '../en/share';

/**
 * Die Link-Landeseiten: /c (eine „Beat my wake“-Herausforderung), /p (eine
 * Weck-Verabredung, der geteilte Alarm vor den Gruppenweckern; alte Links
 * öffnen weiterhin die App) und /g (eine Gruppenwecker-Einladung). Die
 * `script`-Strings liest der Inline-Decoder
 * jeder Seite; `{name}`, `{rounds}`, `{difficulty}`, `{seconds}`, `{time}` und
 * `{days}` füllt dieses Skript aus dem Link selbst.
 */
export const share = {
  challenge: {
    title: `Eine Weck-Herausforderung - WakeSharp`,
    description: `Jemand hat dich zu einem WakeSharp-Morgen herausgefordert.`,
    heading: `Beat my wake (Schlag meinen Morgen)`,
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
    title: `Eine Weck-Einladung - WakeSharp`,
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
  group: {
    title: `Eine Gruppenwecker-Einladung - WakeSharp`,
    description: `Jemand hat dich zu einem WakeSharp-Gruppenwecker eingeladen.`,
    heading: `Eine Gruppenwecker-Einladung`,
    intro: `Jemand möchte mit dir zusammen aufwachen.`,
    opening: `Einladung wird geöffnet …`,
    /** Erscheint, sobald der Code im Link geprüft ist. */
    cta: `Öffne diesen Link auf einem iPhone mit installiertem WakeSharp, um der Gruppe beizutreten. Bei allen klingelt der Wecker zur selben Zeit, auf dem eigenen Telefon, und die Gruppe sieht, wer schon wach ist. Zum Beitreten brauchst du ein WakeSharp-Konto, damit deine Freunde sehen, dass du wach bist. Gruppenwecker gibt es vorerst nur auf dem iPhone: Die Version 2.9 bei Google Play hat sie nicht.`,
    /** Der Button, der den Code an die installierte App übergibt. */
    open: `WakeSharp öffnen`,
    error: `Dieser Link ließ sich nicht lesen. Bitte die Person, die ihn geschickt hat, ihn noch einmal zu schicken oder einen neuen Einladungslink aus der Gruppe zu teilen.`,
    script: {
      /** Wenn der Link den Zeitplan enthält. */
      invited: `Du bist zu einem Gruppenwecker eingeladen: {time} · {days}`,
      /** Wenn nicht (ein Link aus einer älteren App). */
      invitedNoTime: `Du bist zu einem Gruppenwecker eingeladen.`,
      once: `einmalig`,
      /** Sonntag zuerst, passend zur Wochentagsmaske der App. */
      days: [`So`, `Mo`, `Di`, `Mi`, `Do`, `Fr`, `Sa`],
    },
  },
  get: {
    heading: `WakeSharp laden`,
    /** `{trialDays}` und `{annual}` kommen aus src/config/site.ts; die Testphase steht nie ohne ihren Preis. */
    body: `Starte mit {trialDays} Tagen kostenlos in WakeSharp Unbegrenzt, danach {annual} pro Jahr. Deinen ersten Alarm stellst du in etwa zehn Sekunden.`,
  },
} satisfies typeof en;
