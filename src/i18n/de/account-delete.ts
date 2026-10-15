import { accountDelete as en } from '../en/account-delete';

/** /account/delete - die Löschseite, auf die das Data-safety-Formular von Google Play verweist. */
export const accountDelete = {
  title: `Konto löschen - WakeSharp`,
  description: `Wie du dein optionales WakeSharp-Konto und sein Cloud-Backup löschst: in der App oder per E-Mail.`,
  heading: `Dein WakeSharp-Konto löschen`,
  intro: `WakeSharp-Konten sind optional: es gibt sie nur, um deine Alarme, Einstellungen, Werte und Serie zu sichern, damit du sie auf einem neuen Telefon wiederherstellen kannst. Deins zu löschen entfernt dieses Backup und den Login selbst, dauerhaft.`,
  inApp: {
    heading: `In der App löschen`,
    steps: [
      `Öffne WakeSharp und geh zu **Einstellungen**.`,
      `Tippe auf **Konto**.`,
      `Tippe auf **Konto löschen** und bestätige.`,
    ],
    body: `Das ist der ganze Ablauf. Er löscht dauerhaft deinen Login („Mit Apple anmelden“ oder Google), dein Cloud-Backup (Alarme, Einstellungen, Weckverlauf, Werte, Serie und alle hinterlegten Miniaturbilder von Foto- oder Scan-Referenzen) und widerruft bei „Mit Apple anmelden“ das Anmelde-Token bei Apple. Es gibt keine Wartezeit: Der Kontoeintrag und alles, was damit in deinem Backup gespeichert ist, verschwinden zusammen. Einige Daten werden länger aufbewahrt, wie unten aufgeführt.`,
  },
  kept: {
    heading: `Was nicht gelöscht wird`,
    items: [
      `**Die Daten auf deinem Telefon.** Deine Alarme, Werte und Einstellungen bleiben auf deinem Gerät: das Konto zu löschen löscht nicht deine Alarme. Entferne die App selbst, wenn auch die Daten auf dem Gerät weg sollen.`,
      `**Käufe.** Ein Abo von WakeSharp Unbegrenzt gehört, genau wie ein gekaufter lebenslanger Zugang, zu deinem App-Store- oder Google-Play-Konto, nicht zu deinem WakeSharp-Konto, und übersteht die Löschung.`,
      `**Unsere Kopie der Kaufereignisse.** Jedes Abo-Ereignis, das RevenueCat uns schickt, wird 400 Tage lang aufbewahrt, auch nach der Löschung des Kontos, und dann gelöscht.`,
      `**E-Mail-Kopien von Kündigungsantworten und Support-Nachrichten.** Sie bleiben in unserem Support-Postfach, bis wir sie nicht mehr brauchen; schreib uns, wenn du sie löschen lassen möchtest.`,
      `**Analyse- und Marketingdaten** bei PostHog und AppsFlyer. Sie verwenden pseudonyme IDs, die nach der Anmeldung mit deinem Konto verknüpft werden können, und werden auf Anfrage gelöscht: siehe die [Datenschutzerklärung](privacy).`,
    ],
  },
  byEmail: {
    heading: `Wenn du die App nicht mehr hast`,
    body: `Schreib an [{email}](email) von der Adresse, mit der du dich angemeldet hast (bei „Mit Apple anmelden“ mit verborgener Adresse nenne stattdessen das ungefähre Anmeldedatum), und wir löschen das Konto für dich. Wir prüfen die Anfrage und schließen die Löschung innerhalb von 30 Tagen ab, fast immer viel früher.`,
  },
} satisfies typeof en;
