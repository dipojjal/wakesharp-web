import { contact as en } from '../en/contact';

/**
 * Das Kontaktformular und seine zwei Ergebnisseiten. Das `<select>` behält in
 * jeder Sprache die englischen `value=`-Attribute (src/templates/ContactPage.astro),
 * damit das Support-Postfach ein Vokabular liest; nur die sichtbaren
 * Beschriftungen unten werden übersetzt.
 */
export const contact = {
  form: {
    title: `Kontakt — WakeSharp`,
    description: `Schreib dem Entwickler von WakeSharp direkt — Fehlerberichte, Alarmprobleme, Abo-Fragen und Funktionswünsche.`,
    heading: `Kontakt`,
    intro: `WakeSharp ist ein kleines Team, und alles, was hier ankommt, liest ein Mensch.`,
    callout: `Ich antworte meist innerhalb von **2–3 Werktagen**. Wenn du lieber dein eigenes Mailprogramm nutzt, schreib an [{email}](email) — es landet im selben Postfach.`,
    nameLabel: `Dein Name`,
    emailLabel: `Deine E-Mail-Adresse`,
    emailHint: `Damit ich antworten kann. Sie wird für nichts anderes genutzt.`,
    topicLabel: `Worum geht es?`,
    topicPlaceholder: `Bitte wählen …`,
    topics: {
      alarm: `Ein Alarm hat nicht geklingelt`,
      bug: `Fehlerbericht`,
      billing: `Abo oder Abrechnung`,
      feature: `Funktionswunsch`,
      other: `Etwas anderes`,
    },
    deviceLabel: `Telefon und OS-Version`,
    deviceHint: `— optional, beantwortet aber die Hälfte meiner Rückfragen`,
    devicePlaceholder: `z. B. Pixel 9, Android 16`,
    messageLabel: `Nachricht`,
    messageHint: `Bei einem Fehler ist das Nützlichste, was du mir sagen kannst, was du erwartet hast und was stattdessen passiert ist. Hat ein Alarm versagt, hilft die Zeit, auf die er gestellt war, und die Zeit, zu der du das Telefon gefunden hast, ungemein.`,
    honeypotLabel: `Firma`,
    submit: `Nachricht senden`,
    privacyNote: `Deine Nachricht und deine E-Mail-Adresse werden mir per E-Mail zugestellt und sonst nirgends gespeichert. Siehe die [Datenschutzerklärung](privacy).`,
  },
  sent: {
    title: `Nachricht gesendet — WakeSharp`,
    description: `Deine Nachricht an WakeSharp wurde gesendet.`,
    heading: `Nachricht gesendet`,
    intro: `Danke — sie ist auf dem Weg in mein Postfach.`,
    body: `Ich antworte meist innerhalb von **2–3 Werktagen**, von [{email}](email). Wenn du nichts hörst, sieh in deinem Spam-Ordner nach, bevor du sie für verloren hältst.`,
    meanwhile: `Während du wartest: Die [Support-Seite](support) deckt die häufigsten Fragen ab — samt der vollständigen Checkliste für einen Alarm, der nicht geklingelt hat.`,
    backHome: `Zurück zur Startseite`,
  },
  error: {
    title: `Nachricht nicht gesendet — WakeSharp`,
    description: `Das Kontaktformular von WakeSharp konnte deine Nachricht nicht zustellen.`,
    heading: `Das hat nicht geklappt`,
    intro: `Deine Nachricht wurde nicht zugestellt, und ich sage es dir lieber, als so zu tun, als wäre alles gut.`,
    callout: `Bitte schreib stattdessen direkt an [{email}](email). Nichts von dem, was du getippt hast, wurde gespeichert, du musst es also noch einmal tippen — sorry dafür.`,
    body: `Hier landest du auch, wenn ein Pflichtfeld leer ankam, die E-Mail-Adresse ungültig war oder die Nachricht die vom Formular erlaubten 4.000 Zeichen überschritten hat.`,
    backToForm: `Zurück zum Formular`,
    support: `Support`,
    homepage: `Startseite`,
  },
} satisfies typeof en;
