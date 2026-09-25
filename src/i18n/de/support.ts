import { support as en } from '../en/support';

/**
 * /support - die Support-URL für App Store Connect. Verwendete Link-Keys:
 * email, terms-safety, privacy, account-delete, apple-subs, google-subs.
 * `{ios}` und `{android}` sind die Anforderungs-Strings, `{annual}`, `{monthly}`
 * und `{trialDays}` die Preise, alle aus src/config/site.ts.
 */
export const support = {
  title: `WakeSharp-Support: Wecker klingelt nicht, Missionen & Abo`,
  description: `Hilfe zu WakeSharp: warum ein Alarm nicht klingelt, wie Missionen und der Wachheitswert funktionieren und wie du dein Abo verwaltest.`,
  heading: `Support`,
  intro: `WakeSharp ist ein kleines Team, und auf E-Mails antwortet ein Mensch.`,

  getInTouch: {
    heading: `Kontakt aufnehmen`,
    body: `Schreib an [{email}](email). Ich antworte meist innerhalb von **2–3 Werktagen**. Wenn du dein Telefonmodell, deine OS-Version und die WakeSharp-Version aus den Einstellungen mitschickst, geht es fast immer schneller.`,
  },

  requirements: {
    heading: `Voraussetzungen`,
    body: `WakeSharp braucht {ios} auf dem iPhone oder {android} auf Android. Die Uhren-Apps brauchen watchOS 26 oder Wear OS 3.`,
  },

  didntRing: {
    heading: `Mein Alarm hat nicht geklingelt`,
    callout: `**Fang in der App an, nicht hier.** Öffne WakeSharp → Einstellungen → _Weckzuverlässigkeit_. Die Prüfung liest den aktuellen Zustand deines Telefons (Berechtigungen, Alarmlautstärke, „Nicht stören“, Benachrichtigungseinstellungen, Anzeige über dem Sperrbildschirm, Akku-Beschränkungen) und beginnt mit einem klaren Urteil: Er wird klingeln, er könnte es nicht, oder er kann es nicht. Wo eine Lösung einen Tipp entfernt ist, bietet sie den Tipp an; wo das Telefon uns etwas nicht verrät, sagt sie es, statt einen grünen Haken zu zeigen. Sie läuft außerdem vor dem Schlafengehen und meldet den schlimmsten Fund.`,
    report: `Wurde ein Alarm bereits verpasst, zeigt WakeSharp an diesem Morgen einen Bericht, der die Ursache nennt, wo er sie belegen kann (Berechtigung entzogen, Alarmlautstärke auf null, Totenstille, das Telefon war aus) und „Wir konnten nicht feststellen, warum“ sagt, wo er es nicht kann. Die Checklisten unten sind für den Fall, dass er es nicht kann.`,
    iphone: {
      heading: `Auf dem iPhone`,
      steps: [
        `**Prüfe auf dem Startbildschirm, ob der Alarm wirklich aktiv ist** und ob seine Wiederholungstage den heutigen Tag einschließen.`,
        `**Prüfe die Alarmberechtigung.** Einstellungen → WakeSharp. Wurde der Alarmzugriff abgelehnt, kann WakeSharp nichts planen. Schalte ihn ein und speichere den Alarm erneut.`,
        `**Prüfe Lautstärke und Lautlos-Schalter.** WakeSharp klingelt durch Lautlos-Modus und Fokus hindurch, aber nicht auf einem Gerät, das ausgeschaltet oder leer ist.`,
        `**Prüfe Bluetooth.** Ist dein Telefon noch mit Kopfhörern oder dem Auto verbunden, spielt der Alarm womöglich dort.`,
        `**Starte das Telefon neu** und speichere den Alarm erneut, wenn er sich weiter danebenbenimmt.`,
      ],
    },
    android: {
      heading: `Auf Android`,
      steps: [
        `**Prüfe, ob der Alarm aktiv ist** und ob seine Wiederholungstage den heutigen Tag einschließen.`,
        `**Erlaube Benachrichtigungen.** Einstellungen → Apps → WakeSharp → Benachrichtigungen. Der Klingelbildschirm kommt als Vollbild-Benachrichtigung; blockierte Benachrichtigungen unterdrücken ihn.`,
        `**Schalte die Akku-Optimierung für WakeSharp ab.** Einstellungen → Apps → WakeSharp → Akku → _Nicht eingeschränkt_. Das ist mit Abstand die häufigste Ursache auf Geräten von Samsung, Xiaomi, OPPO, vivo und OnePlus, die strenger vorgehen als reines Android. Prüfe auf Samsung zusätzlich Einstellungen → Akku → Nutzungslimits im Hintergrund und stelle sicher, dass WakeSharp nicht unter „Apps im Ruhemodus“ oder „Apps im Tiefschlaf“ steht.`,
        `**Prüfe, dass „Nicht stören“ nicht auf Totenstille steht.** Die Modi „Nur Wichtiges“ und „Nur Wecker“ lassen Alarme durch; Totenstille schaltet auch sie stumm, und keine App kann das übergehen.`,
        `**Beende WakeSharp nicht per „Stopp erzwingen“.** Das Erzwingen des Stopps löscht die geplanten Alarme, bis du die App wieder öffnest.`,
        `**Öffne WakeSharp nach einem Neustart einmal.** Die App richtet deine Alarme beim Hochfahren neu ein, aber das Öffnen garantiert, dass die Synchronisierung gelaufen ist.`,
      ],
    },
    warning: `**Wenn es wirklich darauf ankommt, geweckt zu werden, stell einen zweiten Alarm auf einem anderen Gerät.** WakeSharp plant Alarme über das Betriebssystem, und das Betriebssystem entscheidet, ob sie klingeln. Siehe den [Sicherheitshinweis](terms-safety).`,
    /** Heading over the same-language troubleshooting posts, when there are any. */
    guidesHeading: `Ausführliche Anleitungen`,
  },

  ringsThrough: {
    heading: `Klingelt WakeSharp wirklich durch Lautlos-Modus, Fokus und „Nicht stören“?`,
    body: `Unter normalen Umständen ja: das ist der ganze Sinn der App, und es ist derselbe Mechanismus, den auch die eingebaute Uhr auf der jeweiligen Plattform nutzt.`,
    items: [
      `**Auf dem iPhone** nutzt WakeSharp Apples AlarmKit, das durch Lautlos-Modus und Fokus hindurch klingeln kann, **sobald du die Alarmberechtigung erteilt hast**. Lehnst du sie ab oder entziehst sie, kann WakeSharp überhaupt keinen Alarm planen.`,
      `**Auf Android** läuft der Alarm über den eigenen Alarm-Audiokanal, der auch im Lautlos-Modus klingelt und bei „Nicht stören“, sofern dort Alarme erlaubt sind (Totenstille schaltet jeden Ton stumm, Alarme eingeschlossen), und zeigt eine Vollbildmeldung über dem Sperrbildschirm: **wenn die Berechtigungen für exakte Alarme, Benachrichtigungen und den Sperrbildschirm vorliegen**. Für den Alarmkanal selbst gibt es keine zusätzliche Abfrage, aber eine blockierte Benachrichtigung oder eine Akku-Beschränkung kann die Meldung trotzdem verhindern.`,
    ],
    limit: `Was keine der beiden Plattformen kann: auf einem Telefon klingeln, das ausgeschaltet oder leer ist oder dem die Berechtigungen der App entzogen wurden.`,
  },

  missions: {
    heading: `Missionen und Schlummern`,
    items: [
      `**Die Mission** ist das, was dir den Morgen einbringt, und es gibt mehr als ein Dutzend: Rechen- und Gedächtnisrätsel wie _Kopfrechnen_ und _Farbkonflikt_, ein Foto einer Stelle, die du am Abend vorher gewählt hast (_Fotobeweis_), ein echter Gegenstand auf der anderen Seite des Zimmers (_Objekt scannen_, _Hol was_), Schritte (_Lauf dich wach_), Tageslicht am Fenster (_Erstes Licht_), eine Zeile Wort für Wort (_Abtippen_) oder eine laut gesprochene Antwort (_Siebener-Reihe_, _Nenne fünf_). _Überrasch mich_ wählt jeden Morgen eine andere. Ein Alarm kann mehrere Missionen hintereinander verlangen, in der Reihenfolge, die du festlegst.`,
      `Mit **Meine Stellen und Codes** wird _Objekt scannen_ persönlich. Fotografiere einen Ort, zu dem du hinlaufen wirst, etwa den Wasserkocher oder die Wohnungstür, oder registriere einen QR- oder Barcode, den du dorthin klebst, wohin der Morgen dich schicken soll, etwa an den Badezimmerspiegel oder die Kaffeedose. Ein Alarm kann dann genau nach diesem Ziel fragen. Es ist eine Funktion _innerhalb_ der Scan-Mission und keine eigene Mission, und weder das Foto noch der Code wird gespeichert: nur je ein Fingerabdruck davon.`,
      `**Wenn eine Mission an diesem Morgen nicht laufen kann** (eine kaputte Kamera, ein Telefon ohne Schrittzähler), weicht WakeSharp auf eine aus, die funktioniert, damit du nicht mit einem Alarm dastehst, den du nicht abschließen kannst.`,
      `**Schlummern und Stoppen schließen den Morgen nicht ab.** Wie auch immer du den Alarm verstummen lässt, der Morgen zählt erst, wenn die Mission erledigt ist. Die Bedienelemente deines Telefons funktionieren immer: Das Telefon auszuschalten etwa wird nie blockiert.`,
    ],
  },

  smartAlarms: {
    heading: `Smarte Kalenderalarme`,
    body: `Eine smarte Regel klingelt eine festgelegte Zahl Minuten vor deinem ersten Meeting, begrenzt durch eine früheste und eine späteste Weckzeit, die du wählst. WakeSharp prüft deinen Kalender über Nacht erneut; verschiebt sich das Meeting, verschiebt sich der Alarm. Lehnst du den Kalenderzugriff ab, funktioniert alles andere weiter: du stellst die Zeiten dann selbst. Deine Termine verlassen dein Gerät nie; siehe die [Datenschutzerklärung](privacy).`,
    limits: `Ein Schichtrhythmus ist für Muster, die nicht wöchentlich sind: 4 Tage an, 4 Tage frei ab einem Startdatum, jede Phase mit eigener Zeit, und ein Vorschaukalender, damit du es prüfen kannst, bevor du eine Nacht darüber schläfst.`,
  },

  sharpness: {
    heading: `Der Wachheitswert`,
    body: `Nach einer Mission kannst du ein optionales Aufwärmen starten: jeden Morgen drei der fünf Aufwärmspiele im Wechsel, insgesamt etwa zwei Minuten, ohne das Spiel, das die Mission dir gerade abverlangt hat. Dein Wert wird an deiner eigenen gleitenden Basislinie gemessen, nicht an anderen Menschen, und pendelt sich um 100 ein, sobald die App dein Normal kennt. Ein schlechter Morgen ist ein Ausschlag nach unten gegenüber deinem Ich von gestern, mehr nicht. Es ist ein App-interner Wert, kein klinischer oder kognitiver Test.`,
    physical: `**Der Wert kommt aus dem Aufwärmen.** Die Mission bringt dich aus dem Bett; das optionale Aufwärmen für den Kopf danach ergibt deinen Wachheitswert: ein langer Weg in die Küche zählt also nie gegen dich.`,
  },

  backup: {
    heading: `Backup und der Umzug auf ein neues Telefon`,
    body: `Es gibt kein Konto anzulegen, und nichts hängt hinter einem. Du kannst dich optional mit **Apple** oder **Google** anmelden (das sind die einzigen Optionen, ein Login mit E-Mail und Passwort gibt es nicht) zu genau einem Zweck: um deine Alarme, Einstellungen, Werte und Serie zu sichern, damit sie auf einem neuen Telefon zurückkommen.`,
    items: [
      `**Standardmäßig ist es aus**, und jede Funktion arbeitet auch abgemeldet. Das Backup läuft still, nachdem sich deine Daten geändert haben, und ein Alarm wartet zum Klingeln nie auf das Netz.`,
      `**Für den Umzug auf ein neues Telefon** installierst du WakeSharp, meldest dich mit demselben Apple- oder Google-Konto an und stellst wieder her. Neuere Änderungen, die schon auf dem neuen Gerät liegen, bleiben erhalten.`,
      `**Abmelden** behält alles auf deinem Telefon und hört einfach auf, es zu sichern.`,
      `**Das Konto zu löschen** (in der App unter _Einstellungen → Konto → Konto löschen_ oder wie auf [wakesharp.app/account/delete](account-delete) beschrieben) entfernt Backup und Login dauerhaft, während die Daten auf deinem Telefon bleiben.`,
    ],
    subscription: `Ein Abo ist davon völlig getrennt: Es hängt an deinem App-Store- oder Google-Play-Konto, „Käufe wiederherstellen“ holt WakeSharp Unbegrenzt also zurück, ganz gleich ob du dich je bei WakeSharp anmeldest.`,
  },

  purchases: {
    heading: `Käufe und WakeSharp Unbegrenzt`,
    items: [
      `**WakeSharp Unbegrenzt** ist die ganze App: jede Weck-Mission, der tägliche Wechsel der Aufwärmspiele, dein vollständiger Wachheitsverlauf, smarte Kalenderalarme, Schichtrhythmen und Profile sowie jede Lark-Szene und jedes Hintergrundbild. Wenn du neu abonnierst, kannst du den Jahresplan mit **{trialDays} Tagen kostenlos** starten, danach {annual} pro Jahr, oder du wählst den Monatsplan für {monthly} pro Monat, der keine Testphase hat. WakeSharp zeigt keine Werbung.`,
      `**Der lebenslange Zugang** war ein einmaliger Kauf und bleibt für alle gültig, die ihn gekauft haben: Er verlängert sich nie, und es gibt nichts zu kündigen.`,
      `**Einen Kauf wiederherstellen:** Öffne die Kaufseite und tippe auf _Wiederherstellen_. Achte darauf, dass du mit demselben Apple- oder Google-Konto angemeldet bist, mit dem du gekauft hast.`,
      `**Kündigen:** [Abos im App Store](apple-subs) oder [Abos bei Google Play](google-subs), jederzeit, auch während der kostenlosen Testphase. Die App zu löschen kündigt kein Abo.`,
      `**Erstattungen** wickeln Apple oder Google ab, nicht wir, aber schreib mir, wenn etwas schiefgegangen ist, und ich helfe, wo ich kann.`,
    ],
  },

  deleting: {
    heading: `Deine Daten löschen`,
    body: `Alles, was WakeSharp aufzeichnet, liegt auf deinem Telefon. Die App zu deinstallieren löscht all das, und wir haben keine Kopie. Zum anonymen Abo-Datensatz bei unserem Zahlungsdienstleister siehe [wie lange Daten aufbewahrt werden](privacy).`,
  },

  feedback: {
    heading: `Fehler, Feedback und Funktionswünsche`,
    body: `Alles willkommen, an [{email}](email). Bei einem Fehler helfen mir am meisten dein Telefonmodell, deine OS-Version, was du erwartet hast und was stattdessen passiert ist. Hat ein Alarm nicht geklingelt, hilft die Zeit, auf die er gestellt war, und die Zeit, zu der du das Telefon gefunden hast, ungemein.`,
  },
} satisfies typeof en;
