import { legal as en } from '../en/legal';

/**
 * Die Datenschutzerklärung und die Nutzungsbedingungen bleiben auf Englisch:
 * Sie sind der verbindliche Text, und beide Apps haben die englischen URLs fest
 * eingebaut. Eine lokalisierte Route existiert, damit die Sprachauswahl nie in
 * einer Sackgasse endet; sie trägt diesen Hinweis über dem englischen Text. Nur
 * die Strings unten werden übersetzt.
 */
export const legal = {
  privacy: {
    title: `Datenschutzerklärung — WakeSharp`,
    heading: `Datenschutzerklärung`,
  },
  terms: {
    title: `Nutzungsbedingungen — WakeSharp`,
    heading: `Nutzungsbedingungen`,
  },
  englishOnly: `Dieses Dokument gibt es nur auf Englisch, und der englische Text unten ist die Fassung, die gilt. Wenn etwas darin unklar ist, schreib an [{email}](email) und ein Mensch erklärt es dir.`,
} satisfies typeof en;
