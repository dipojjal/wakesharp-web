import type { en } from '../en';
export const home = {
  "title": "Lauter Wecker mit Missionen | WakeSharp",
  "hero": {
    "kicker": "Der Wecker für Tiefschläfer",
    "heading": {
      "pre": "Wach auf. Und zwar ",
      "accent": "hellwach.",
      "post": "Nicht nur wach."
    },
    "lede": "Wähle einen Ton aus der Kategorie Laut und eine Aufgabe für den Wecker. Löse ein paar Rechnungen, scanne eine Flasche oder komm mit einer Gehmission in Bewegung.",
    "phoneAlt": "Nächster Wecker und Morgenübersicht"
  },
  "mission": {
    "alt": "Verfügbare Weckmissionen",
    "heading": {
      "pre": "Missionen, die dich ",
      "accent": "aus dem Bett holen",
      "post": ""
    },
    "lede": "Wähle eine der folgenden Missionen oder mehrere nacheinander. Das ist die öffentliche Auswahl für iPhone 2.14. Kamera, Bewegung und Sprache benötigen passende Berechtigungen und Hardware.",
    "missions": [
      {
        "name": "Rechenaufgaben",
        "kind": "Kopf",
        "body": "Schnelle Rechenrunden, die du richtig lösen musst.",
        "id": "math_sprint"
      },
      {
        "name": "Memory",
        "kind": "Kopf",
        "body": "Deck die Karten auf und finde jedes Paar.",
        "id": "memory_match"
      },
      {
        "name": "Reihenfolge",
        "kind": "Kopf",
        "body": "Wiederhole ein Tippmuster, das mit jeder Runde wächst.",
        "id": "sequence_recall"
      },
      {
        "name": "Farbkonflikt",
        "kind": "Kopf",
        "body": "Tippe die Tintenfarbe an, nicht das Wort.",
        "id": "colour_clash"
      },
      {
        "name": "Abtippen",
        "kind": "Kopf",
        "body": "Tippe eine Zeile Wort für Wort ab, ohne Autokorrektur.",
        "id": "type_quote"
      },
      {
        "name": "Fotobeweis",
        "kind": "Kamera",
        "body": "Fotografiere noch einmal die Stelle, die du am Abend vorher gewählt hast.",
        "id": "photo_proof"
      },
      {
        "name": "Objekt scannen",
        "kind": "Kamera",
        "body": "Steh auf und richte die Kamera auf eine Flasche, eine Tasse oder ein Waschbecken.",
        "id": "object_scan"
      },
      {
        "name": "Hol was",
        "kind": "Kamera",
        "body": "Geh los und finde etwas Blaues oder etwas, aus dem du trinkst.",
        "id": "fetch"
      },
      {
        "name": "Gesichtscheck",
        "kind": "Kamera",
        "body": "Öffne die Augen für die Kamera und folge dann der Anweisung.",
        "id": "face_check"
      },
      {
        "name": "Obst schnippeln",
        "kind": "Kamera",
        "body": "Schneide das Obst mit dem Finger aus der Luft.",
        "id": "fruit_slash"
      },
      {
        "name": "Lauf dich wach",
        "kind": "Bewegung",
        "body": "Mach echte Schritte, gezählt von deinem Telefon.",
        "id": "walk_steps"
      },
      {
        "name": "Erstes Licht",
        "kind": "Bewegung",
        "body": "Geh zum Fenster und halte dein Telefon ins Licht.",
        "id": "first_light"
      },
      {
        "name": "Nenne fünf",
        "kind": "Stimme",
        "body": "Nenne laut fünf Dinge aus einer Kategorie.",
        "id": "name_five"
      },
      {
        "name": "Überrasch mich",
        "kind": "Beliebig",
        "body": "Jeden Morgen eine andere Mission.",
        "id": "surprise"
      }
    ],
    "note": "Missionen sind Teil des Alarms, den du anlegst: Der Deal steht also schon am Abend vorher und wird nicht um 6 Uhr morgens verhandelt."
  },
  "smart": {
    "alt": "Der Editor für smarte Alarmregeln, eingestellt auf 90 Minuten vor dem ersten Meeting",
    "heading": {
      "pre": "Weckt dich vor deinem ",
      "accent": "ersten Meeting",
      "post": ""
    },
    "lede": "„Klingle 90 Minuten vor meinem ersten Meeting.“ WakeSharp liest deinen Kalender auf deinem Gerät, prüft ihn über Nacht erneut und verschiebt den Alarm, wenn sich das Meeting verschiebt. Nur lesend, optional, nie übertragen.",
    "shifts": "Und nicht jede Woche ist eine Woche. Schichtrhythmen kümmern sich um die Muster, die nicht wöchentlich sind (zwei Tage, zwei Nächte, vier frei) mit Vorschaukalender und der Möglichkeit, ein einzelnes Datum zu überspringen, ohne etwas zu löschen. Profile tauschen einen ganzen Satz Alarme auf einmal: Arbeit, Urlaub oder Bereitschaft. Suche, Sortierung und eine Heute-Ansicht halten die Liste übersichtlich, wenn es viele werden.",
    "labels": "Sag, wofür du aufstehst (Sport, Arbeitsweg, Frühstück) und die Bezeichnung schreibt sich von selbst."
  },
  "together": {
    "heading": {
      "pre": "Nimm ",
      "accent": "jemanden mit",
      "post": ""
    },
    "lede": "Teile einen Link, und das Telefon, das ihn öffnet, stellt denselben Alarm ein und klingelt ihn dann von allein. Nichts, dem man beitreten muss, nichts, wofür man sich anmeldet, und kein Server dazwischen.",
    "cards": [
      {
        "title": "Mit einem Freund aufwachen",
        "body": "Du schickst einen Link; das Telefon der anderen Person baut den Alarm lokal. Jede Seite behält ihre eigene Kopie, deine Änderungen greifen also nicht in ihre ein."
      },
      {
        "title": "Beat my wake",
        "body": "Schlag meinen Morgen: Beende eine Mission und du kannst jemanden zum identischen Aufgabensatz herausfordern: gleicher Seed, gleiche Runden, gleiche Schwierigkeit. Danach weißt du, wer von euch wirklich wach war."
      }
    ],
    "note": "Beides sind einfach Links: Das Telefon, das einen empfängt, erledigt die ganze Arbeit selbst."
  },
  "platforms": {
    "heading": {
      "pre": "Dieselbe App. ",
      "accent": "Beide Telefone.",
      "post": ""
    },
    "lede": "WakeSharp gibt es auch für Android. Audiokanal, Berechtigungen und Akkueinstellungen unterscheiden sich. Diese Bilder zeigen iPhone und Apple Watch, nicht Android oder Wear OS. Prüfe die verfügbaren Missionen und Einstellungen in deiner installierten App. WakeSharp braucht {ios} auf dem iPhone oder {android} auf Android. Die Uhren-Apps brauchen watchOS 26 oder Wear OS 3.",
    "watch": "Unter iPhone 2.14 verschiebt „Ich bin wach“ auf der Apple Watch den Telefonwecker um eine Minute. Beende die Mission auf dem iPhone, um die Wiederholungen zu stoppen. Die Watch muss geladen, verbunden und eingerichtet sein. Hier sind die drei eingereichten Watch-Bilder.",
    "account": "Ein WakeSharp-Konto ist nicht nötig. Die freiwillige Anmeldung mit Apple oder Google sichert Wecker, Verlauf, Einstellungen und kleine Vorschaubilder von Fotozielen. Fotoabgleich und Kalenderverarbeitung laufen auf deinem Gerät. Kalenderinhalte bleiben dort. Details stehen in der Datenschutzerklärung."
  },
  "reliable": {
    "heading": {
      "pre": "Schon ",
      "accent": "am Abend vorher",
      "post": " wissen, dass er klingelt"
    },
    "lede": "Die meisten Wecker-Apps merken im selben Moment wie du, dass sie versagt haben. WakeSharp prüft, was Alarme tatsächlich stoppt (Berechtigungen, Alarmlautstärke, Benachrichtigungseinstellungen, Anzeige über dem Sperrbildschirm, Akku-Beschränkungen) und beginnt mit einem Urteil, nicht mit einem Versprechen.",
    "items": [
      {
        "title": "Ein Urteil, keine Checkliste",
        "body": "Eine Zeile ganz oben: Er klingelt, er klingelt vielleicht nicht, oder er kann es nicht."
      },
      {
        "title": "Ehrlich über blinde Flecken",
        "body": "Wo das Telefon nichts verrät, sagt die App es: nie ein grüner Haken."
      },
      {
        "title": "Lösungen mit einem Tipp, wo es sie gibt",
        "body": "Und klare Anleitungen, wo nicht."
      },
      {
        "title": "„Hat nicht geklingelt“ bekommt eine Antwort",
        "body": "Die belegbare Ursache, oder das Eingeständnis, dass wir es nicht sagen konnten."
      }
    ],
    "note": "Die Prüfung steckt in den Einstellungen, und die Erinnerung vor dem Schlafengehen nimmt den schlimmsten Fund mit auf, damit du ihn siehst, solange noch Zeit bleibt, ihn zu beheben."
  },
  "pricing": {
    "heading": {
      "pre": "Ein Plan, ",
      "accent": "alles drin",
      "post": ""
    },
    "lede": "WakeSharp Unbegrenzt ist die ganze App: jede Weck-Mission, das tägliche Aufwärmen, smarte Kalenderalarme, Schichtrhythmen und Profile, dein vollständiger Wachheitsverlauf sowie jede Lark-Szene und jedes Hintergrundbild. WakeSharp zeigt keine Werbung.",
    "unlimited": {
      "name": "WakeSharp Unbegrenzt",
      "perYear": "/Jahr",
      "trial": "Starte mit **{trialDays} Tagen kostenlos**, danach {annual} pro Jahr",
      "monthly": "oder **{monthly} pro Monat**, ohne Testphase",
      "features": [
        "Jede Weck-Mission, auf Wunsch mehrere hintereinander",
        "Drei Aufwärmspiele jeden Morgen, im Wechsel",
        "Dein vollständiger Wachheitsverlauf",
        "Smarte Kalenderalarme, die mitwandern, wenn sich dein erstes Meeting verschiebt",
        "Schichtrhythmen, Profile und so viele Alarme, wie du brauchst",
        "Die Zuverlässigkeitsprüfung und jeder Alarmton",
        "Jede Lark-Szene, jedes Alarm-Hintergrundbild und jede Feier",
        "„Mit einem Freund aufwachen“ und die Uhren-App für beide Handgelenke",
        "Keine Werbung"
      ]
    },
    "billing": "Jahres- und Monatsabo rechnen Apple oder Google ab und verlängern sich bis zur Kündigung: kündige jederzeit in deinem Store-Konto, und denk daran: Die App zu löschen kündigt kein Abo. Die kostenlose Testphase gilt für berechtigte Neuabonnenten. Siehe die [Nutzungsbedingungen](terms).",
    "usdNote": "Die Preise stehen in US-Dollar; App Store und Google Play zeigen den Preis für dein Land."
  },
  "faq": {
    "heading": {
      "pre": "Fragen, ",
      "accent": "beantwortet",
      "post": ""
    },
    "items": [
      {
        "q": "Klingelt er wirklich im Lautlos-Modus, in Fokus oder bei „Nicht stören“?",
        "a": "Das Verhalten hängt von der Plattform ab, und es hängt von einer Berechtigung ab. Auf dem iPhone nutzt WakeSharp Apples AlarmKit, das durch Lautlos-Modus und Fokus hindurch klingeln kann, sobald du den Alarmzugriff erlaubt hast: lehnst du ihn ab oder entziehst ihn, kann WakeSharp überhaupt nichts planen. Auf Android läuft er über den eigenen Alarm-Audiokanal, der auch im Lautlos-Modus klingelt und bei „Nicht stören“, sofern dort Alarme erlaubt sind (Totenstille schaltet jeden Ton stumm, Alarme eingeschlossen), und er zeigt eine Vollbildmeldung über dem Sperrbildschirm, sofern die Berechtigungen für exakte Alarme, Benachrichtigungen und den Sperrbildschirm vorliegen. Was keine App kann: auf einem Telefon klingeln, das ausgeschaltet oder leer ist. Für alles, was du wirklich nicht verpassen darfst, stell also einen zweiten Alarm auf einem anderen Gerät."
      },
      {
        "q": "Wie prüfe ich, ob mein Alarm wirklich klingelt?",
        "a": "Öffne Einstellungen → Weckzuverlässigkeit. WakeSharp liest die Bedingungen auf deinem Telefon, die einen Alarm stoppen können (Berechtigungen, Alarmlautstärke, Benachrichtigungseinstellungen, Anzeige über dem Sperrbildschirm, Akku-Beschränkungen) und beginnt mit einem klaren Urteil statt mit einem Versprechen. Wo die Plattform uns etwas nicht verrät, sagt die App das, statt einen grünen Haken zu zeigen, denn eine Checkliste, die Unbekanntes stillschweigend zu Bestandenem macht, ist schlimmer als gar keine. Fällt ein Alarm doch einmal aus, kann die App dir hinterher die belegbare Ursache nennen, oder zugeben, dass sie es nicht herausfinden konnte."
      },
      {
        "q": "Muss ich um 6 Uhr morgens rechnen?",
        "a": "Wähle eine der folgenden Missionen oder mehrere nacheinander. Das ist die öffentliche Auswahl für iPhone 2.14. Kamera, Bewegung und Sprache benötigen passende Berechtigungen und Hardware."
      },
      {
        "q": "Kann ich die Mission umgehen?",
        "a": "Unter iPhone 2.14 verschiebt Stoppen oder Schlummern den Wecker um eine Minute. Ohne abgeschlossene Mission kann er sich bis zu einer Stunde wiederholen. Die eigenen Bedienelemente des Telefons funktionieren weiter."
      },
      {
        "q": "Was macht die Kamera?",
        "a": "Wähle etwa eine Flasche, einen Becher oder ein Waschbecken. Richte beim Klingeln die Kamera darauf. Die grüne Bestätigung zeigt, dass WakeSharp das Objekt erkannt hat. Die Erkennung läuft auf deinem Telefon. Ein WakeSharp-Konto ist nicht nötig. Die freiwillige Anmeldung mit Apple oder Google sichert Wecker, Verlauf, Einstellungen und kleine Vorschaubilder von Fotozielen. Fotoabgleich und Kalenderverarbeitung laufen auf deinem Gerät. Kalenderinhalte bleiben dort. Details stehen in der Datenschutzerklärung."
      },
      {
        "q": "Erfasst WakeSharp meinen Schlaf?",
        "a": "Nein. Es gibt keinerlei Schlaftracking: kein Mikrofon, das nachts mithört, keine Schlafphasen, keine Note für deine Nacht und keine Meinung dazu, wann du eingeschlafen bist. Der Schrittzähler wird während der Lauf-Mission gelesen und zu keinem anderen Zeitpunkt. WakeSharp misst, wie hellwach du bist, sobald du auf bist, und nichts davor. Das Einzige mit Schlaf darin sind eine Schlafenszeit, die du selbst planst, und optionale Klänge zum Runterkommen."
      },
      {
        "q": "Was genau liest die App aus meinem Kalender?",
        "a": "Deine anstehenden Termine, nur lesend, vollständig auf deinem Gerät, zu einem einzigen Zweck: auszurechnen, wann sie dich wecken soll. Nichts wird irgendwohin übertragen. Es ist optional, und jede andere Funktion arbeitet auch, wenn du ablehnst."
      },
      {
        "q": "Brauche ich ein Konto?",
        "a": "Ein WakeSharp-Konto ist nicht nötig. Die freiwillige Anmeldung mit Apple oder Google sichert Wecker, Verlauf, Einstellungen und kleine Vorschaubilder von Fotozielen. Fotoabgleich und Kalenderverarbeitung laufen auf deinem Gerät. Kalenderinhalte bleiben dort. Details stehen in der Datenschutzerklärung."
      },
      {
        "q": "Was passiert, wenn meine Uhr leer ist?",
        "a": "Unter iPhone 2.14 verschiebt „Ich bin wach“ auf der Apple Watch den Telefonwecker um eine Minute. Beende die Mission auf dem iPhone, um die Wiederholungen zu stoppen. Die Watch muss geladen, verbunden und eingerichtet sein. Hier sind die drei eingereichten Watch-Bilder."
      },
      {
        "q": "Was kostet WakeSharp?",
        "a": "Es gibt einen einzigen Plan, WakeSharp Unbegrenzt, und der enthält alles. Wenn du neu abonnierst, kannst du den Jahresplan mit {trialDays} Tagen kostenlos starten, danach kostet er {annual} pro Jahr, oder du wählst den Monatsplan für {monthly} pro Monat, der keine Testphase hat. Die Preise stehen in US-Dollar; App Store und Google Play zeigen den Preis für dein Land. WakeSharp zeigt keine Werbung."
      },
      {
        "q": "Ich habe den lebenslangen Zugang gekauft. Behalte ich ihn?",
        "a": "Ja. Der lebenslange Zugang war eine einmalige Zahlung und bleibt dir: Nichts verlängert sich, und es gibt nichts zu kündigen. „Käufe wiederherstellen“ holt ihn auf einem neuen Telefon zurück, mit demselben Apple- oder Google-Konto."
      },
      {
        "q": "Wie kündige ich?",
        "a": "Über den App Store oder Google Play, jederzeit, auch während der kostenlosen Testphase. Die App zu löschen kündigt kein Abo."
      },
      {
        "q": "Verfolgt mich die App?",
        "a": "WakeSharp zeigt keine Werbung, schaltet aber selbst Werbung an anderer Stelle und misst, welche Anzeige oder welcher Link dich zur App gebracht hat und ob daraus eine Testphase oder ein Abo wurde. Auf dem iPhone fragt die App vorher: Lehnst du ab, wird deine Werbe-ID nie gelesen, und Werbenetzwerke sehen nur zusammengefasste Kampagnenergebnisse. Auf Android gilt, was die Datenschutzerklärung beschreibt. Die Produktanalyse lässt sich in den Einstellungen abschalten, und deine Alarmbezeichnungen und Kalenderdetails werden nie gesendet. Die Datenschutzerklärung listet genau auf, was dein Gerät verlässt."
      }
    ]
  },
  "fromBlog": {
    "heading": {
      "pre": "Aus dem ",
      "accent": "Blog",
      "post": ""
    },
    "more": "Alle Artikel lesen"
  },
  "cta": {
    "heading": {
      "pre": "Morgen früh beginnt ",
      "accent": "heute Abend",
      "post": ""
    },
    "lede": "Stell einen Alarm. Und sieh, wie sich ein hellwacher Morgen wirklich anfühlt."
  }
} satisfies typeof en.home;
