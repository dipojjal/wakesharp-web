import { support as en } from '../en/support';

/**
 * /support — die Support-URL für App Store Connect. Verwendete Link-Keys:
 * email, terms-safety, privacy, account-delete, apple-subs, google-subs.
 * `{ios}` und `{android}` sind die Anforderungs-Strings aus src/config/site.ts.
 */
export const support = {
  title: `Support — WakeSharp`,
  description: `Hilfe zu WakeSharp: warum ein Alarm nicht klingelt, wie Missionen und der Sharpness Score funktionieren und wie du dein Abo verwaltest.`,
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
    callout: `**Fang in der App an, nicht hier.** Öffne WakeSharp → Einstellungen → _Alarm reliability_ (Alarm-Zuverlässigkeit). Die Prüfung liest den aktuellen Zustand deines Telefons — Berechtigungen, Alarmlautstärke, „Nicht stören“, Benachrichtigungseinstellungen, Anzeige über dem Sperrbildschirm, Akku-Beschränkungen — und beginnt mit einem klaren Urteil: Er wird klingeln, er könnte es nicht, oder er kann es nicht. Wo eine Lösung einen Tipp entfernt ist, bietet sie den Tipp an; wo das Telefon uns etwas nicht verrät, sagt sie es, statt einen grünen Haken zu zeigen. Sie läuft außerdem vor dem Schlafengehen und meldet den schlimmsten Fund.`,
    report: `Wurde ein Alarm bereits verpasst, zeigt WakeSharp an diesem Morgen einen Bericht, der die Ursache nennt, wo er sie belegen kann — Berechtigung entzogen, Alarmlautstärke auf null, Totenstille, das Telefon war aus — und „Wir konnten nicht feststellen, warum“ sagt, wo er es nicht kann. Die Checklisten unten sind für den Fall, dass er es nicht kann.`,
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
  },

  ringsThrough: {
    heading: `Klingelt WakeSharp wirklich durch Lautlos-Modus, Fokus und „Nicht stören“?`,
    body: `Unter normalen Umständen ja — das ist der ganze Sinn der App, und es ist derselbe Mechanismus, den auch die eingebaute Uhr auf der jeweiligen Plattform nutzt.`,
    items: [
      `**Auf dem iPhone** nutzt WakeSharp Apples AlarmKit, das durch Lautlos-Modus und Fokus hindurch klingeln kann, **sobald du die Alarmberechtigung erteilt hast**. Lehnst du sie ab oder entziehst sie, kann WakeSharp überhaupt keinen Alarm planen.`,
      `**Auf Android** läuft der Alarm über den eigenen Alarm-Audiokanal, den „Nicht stören“ nicht stummschaltet, und zeigt eine Vollbildmeldung über dem Sperrbildschirm — **wenn die Berechtigungen für exakte Alarme, Benachrichtigungen und den Sperrbildschirm vorliegen**. Für den Alarmkanal selbst gibt es keine zusätzliche Abfrage, aber eine blockierte Benachrichtigung oder eine Akku-Beschränkung kann die Meldung trotzdem verhindern.`,
    ],
    limit: `Was keine der beiden Plattformen kann: auf einem Telefon klingeln, das ausgeschaltet oder leer ist oder dem die Berechtigungen der App entzogen wurden.`,
  },

  missions: {
    heading: `Missionen, Schlummern und Strict Mode`,
    items: [
      `**Die Mission** ist das, was dir die volle Wertung für den Morgen einbringt. Zwei sind kostenlos: _Mind Games_, drei schnelle Rechenaufgaben in leicht, normal oder schwer, und _Photo Proof_, das eine einzige Aufnahme verlangt — das wechselnde Tagesmotiv oder ein Ziel, das du für diesen Alarm hinterlegt hast. WakeSharp Plus ergänzt _Memory Match_, _Sequence Recall_, _Scan an Object_, _Walk It Off_ und _Surprise Me_, das eine für dich auswählt und für diesen Alarm an diesem Tag festlegt, sodass du sie am Abend vorher nicht vorbereiten kannst. **Geprüft wird die Auswahl, wenn du einen Alarm anlegst oder bearbeitest, nie wenn er klingelt** — ein Alarm, der bereits auf eine Plus-Mission eingestellt ist, führt sie weiter aus.`,
      `**My spots & codes** ist die Stelle, an der _Scan an Object_ persönlich wird. Fotografiere einen Ort, zu dem du hinlaufen wirst, etwa den Wasserkocher oder die Wohnungstür, oder registriere einen QR- oder Barcode, den du dorthin klebst, wohin der Morgen dich schicken soll, etwa an den Badezimmerspiegel oder die Kaffeedose. Ein Alarm kann dann genau nach diesem Ziel fragen. Es ist eine Funktion _innerhalb_ der Scan-Mission und keine eigene Mission, und weder das Foto noch der Code wird gespeichert — nur je ein Fingerabdruck davon.`,
      `**Jede Mission hat einen Ausweg**, der in Mind Games mit voller Wertung endet, sodass eine kaputte Kamera oder ein Telefon ohne Schrittzähler dich nie mit einem Alarm zurücklässt, den du nicht stoppen kannst.`,
      `**Schlummern** ist eine Einstellung pro Alarm, keine feste Regel. _Aus_ entfernt den Knopf ganz. _Standard_ erlaubt zwei Schlummerpausen von fünf Minuten, für je 5 Sharpness und nicht schlechter als −10 am Tag. _Tighten_ erlaubt drei, mit 10, dann 5, dann 2 Minuten, hebt jedes Mal die Schwierigkeit der Mission an und stoppt bei −15. Alle drei Voreinstellungen sind kostenlos; eine völlig eigene Regel gehört zu WakeSharp Plus.`,
      `**Strict Mode** plant, wo unterstützt, vier Wächter-Alarme im Voraus — 45 Sekunden später, dann nach 4, 8 und 12 Minuten. Es sind echte, im Voraus gebuchte Alarme, sie klingeln also, ob die App läuft oder nicht, und wenn du die Mission erledigst, werden die noch nicht ausgelösten abgesagt. Es sind vier Wiederholungen, keine Endlosschleife, und der Stopp-Knopf des Systems beendet weiterhin jeden einzelnen davon. Schalte ihn pro Alarm ein.`,
      `**Ohne Mission beenden** geht — der Stopp-Knopf des Systems funktioniert immer. WakeSharp zeigt dir dann beim nächsten Öffnen die offene Mission an, deine Serie lässt sich also noch reparieren.`,
    ],
  },

  smartAlarms: {
    heading: `Smarte Kalenderalarme`,
    body: `Eine smarte Regel klingelt eine festgelegte Zahl Minuten vor deinem ersten Meeting, begrenzt durch eine früheste und eine späteste Weckzeit, die du wählst. WakeSharp prüft deinen Kalender über Nacht erneut; verschiebt sich das Meeting, verschiebt sich der Alarm. Lehnst du den Kalenderzugriff ab, funktioniert alles andere weiter — du stellst die Zeiten dann selbst. Deine Termine verlassen dein Gerät nie; siehe die [Datenschutzerklärung](privacy).`,
    limits: `Kostenlos sind eine smarte Regel, ein Schichtrhythmus und ein Alarmprofil enthalten; Plus hebt alle drei Grenzen auf. Ein Schichtrhythmus ist für Muster, die nicht wöchentlich sind — 4 Tage an, 4 Tage frei ab einem Startdatum, jede Phase mit eigener Zeit, und ein Vorschaukalender, damit du es prüfen kannst, bevor du eine Nacht darüber schläfst.`,
  },

  sharpness: {
    heading: `Der Sharpness Score`,
    body: `Nach einer Mission kannst du ein optionales Aufwärmen starten. Kostenlos wird ein Spiel aus einem Paar gezogen, Math Sprint und Reaction Tap; mit Plus spielst du jeden Morgen drei der fünf im Wechsel, insgesamt etwa zwei Minuten. So oder so lässt das Aufwärmen das Spiel aus, das die Mission dir gerade abverlangt hat, damit Rechnen zum Stummschalten des Alarms dir nicht noch mehr Rechnen als Aufwärmen einbringt. Dein Wert wird an deiner eigenen gleitenden Basislinie gemessen, nicht an anderen Menschen, und pendelt sich um 100 ein, sobald die App dein Normal kennt. Ein schlechter Morgen ist ein Ausschlag nach unten gegenüber deinem Ich von gestern, mehr nicht. Es ist kein klinischer oder kognitiver Test.`,
    physical: `**Die körperlichen Missionen fließen nicht in den Wert ein.** Scan an Object, Walk It Off und Photo Proof werden vollständig festgehalten, aber immer nur mit sich selbst verglichen. Ein Gang ins Bad dauert dreißig Sekunden und eine Kopfrechenaufgabe zwei; einen davon in einen Wert aus Genauigkeit und Tempo zu falten, würde einen makellosen Morgen fast auf den Boden drücken. Aufstehen zählt — nur nicht als Sharpness.`,
  },

  backup: {
    heading: `Backup und der Umzug auf ein neues Telefon`,
    body: `Es gibt kein Konto anzulegen, und nichts hängt hinter einem. Du kannst dich optional mit **Apple** oder **Google** anmelden — das sind die einzigen Optionen, ein Login mit E-Mail und Passwort gibt es nicht — zu genau einem Zweck: um deine Alarme, Einstellungen, Werte und Serie zu sichern, damit sie auf einem neuen Telefon zurückkommen.`,
    items: [
      `**Standardmäßig ist es aus**, und jede Funktion arbeitet auch abgemeldet. Das Backup läuft still, nachdem sich deine Daten geändert haben, und ein Alarm wartet zum Klingeln nie auf das Netz.`,
      `**Für den Umzug auf ein neues Telefon** installierst du WakeSharp, meldest dich mit demselben Apple- oder Google-Konto an und stellst wieder her. Neuere Änderungen, die schon auf dem neuen Gerät liegen, bleiben erhalten.`,
      `**Abmelden** behält alles auf deinem Telefon und hört einfach auf, es zu sichern.`,
      `**Das Konto zu löschen** — in der App unter _Einstellungen → Konto → Konto löschen_ oder wie auf [wakesharp.app/account/delete](account-delete) beschrieben — entfernt Backup und Login dauerhaft, während die Daten auf deinem Telefon bleiben.`,
    ],
    subscription: `Ein Abo ist davon völlig getrennt: Es hängt an deinem App-Store- oder Google-Play-Konto, „Käufe wiederherstellen“ holt Plus also zurück, ganz gleich ob du dich je bei WakeSharp anmeldest.`,
  },

  purchases: {
    heading: `Käufe und WakeSharp Plus`,
    items: [
      `**Was Plus ergänzt:** jede Weck-Mission über Mind Games und Photo Proof hinaus, drei Aufwärmspiele jeden Morgen im Wechsel, deinen vollständigen Sharpness-Verlauf, smarte Kalenderalarme ohne Limit sowie die Lark-Szenen, Alarm-Hintergrundbilder und Feiern. Es hebt außerdem die Grenze von je einem Alarmprofil und einem Schichtrhythmus auf, schaltet die zwei Plus-Hintergrundbilder und die vier Plus-Lark-Szenen frei und lässt dich eine eigene Schlummer-Regel schreiben. **Dein Alarm klingelt kostenlos, für immer. Ohne Werbung.** Jeder Alarm, den du stellst, beide kostenlosen Missionen, Strict Mode wo unterstützt, die Schlummer-Voreinstellungen, alle 13 Alarmtöne, Serien und Freezes sowie die Zuverlässigkeitsprüfung kosten nichts.`,
      `**Plus Lifetime** ist ein einmaliger Kauf und kein Abo: Es verlängert sich nie, und es gibt nichts zu kündigen.`,
      `**Einen Kauf wiederherstellen:** Öffne die Kaufseite und tippe auf _Wiederherstellen_. Achte darauf, dass du mit demselben Apple- oder Google-Konto angemeldet bist, mit dem du gekauft hast.`,
      `**Kündigen:** [Abos im App Store](apple-subs) oder [Abos bei Google Play](google-subs). Die App zu löschen kündigt kein Abo.`,
      `**Erstattungen** wickeln Apple oder Google ab, nicht wir — aber schreib mir, wenn etwas schiefgegangen ist, und ich helfe, wo ich kann.`,
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
