import { home as en } from '../en/home';

/**
 * Die Startseite. Überschriften stehen als {pre, accent, post}, weil das
 * hervorgehobene Wort im Template ein <span class="accent"> ist; die Leerzeichen
 * bleiben in den Strings. `{ios}`, `{android}`, `{annual}`, `{lifetime}` und
 * `{trialDays}` kommen aus src/config/site.ts.
 */
export const home = {
  title: `WakeSharp — Hellwach aufwachen. Nicht nur wach.`,

  hero: {
    heading: { pre: `Wach auf. Und zwar `, accent: `hellwach.`, post: `Nicht nur wach.` },
    lede: `Wischen kann auch jemand, der kaum bei Bewusstsein ist. WakeSharp verlangt stattdessen eine Mission — rechnen, fotografieren, scannen oder laufen — und bewertet danach, wie hellwach du wirklich aufgewacht bist.`,
    phoneAlt: `WakeSharp-Startbildschirm bei Nacht, mit einem Alarm um 6:40 Uhr und einer smarten Kalenderregel`,
  },

  trust: [
    `Klingelt auf dem iPhone durch Lautlos-Modus und Fokus`,
    `Sagt dir schon am Abend vorher, was ihn stoppen könnte`,
    `Keine Anmeldung nötig, keine Werbung`,
    `Dein Kalender und deine Kamera verlassen dein Telefon nie`,
    `Dein Alarm klingelt kostenlos, für immer`,
  ],

  ring: {
    alt: `Der WakeSharp-Alarm klingelt, mit „Mission starten“ und „Schlummern“`,
    heading: { pre: `Erledige die Mission für die `, accent: `volle Wertung`, post: `` },
    lede: `Auf dem iPhone zeigt Apples AlarmKit einen Systemalarm über dem Sperrbildschirm — durch Lautlos-Modus und Fokus hindurch, sobald du den Alarmzugriff erlaubt hast, und selbst dann, wenn die App zwangsbeendet wurde. Auf Android ein exakter Alarm auf dem Alarm-Audiokanal, den „Nicht stören“ nicht stummschaltet, mit Extra Loud (besonders laut) und einer Rampe, die ansteigt, statt sofort loszubrüllen. Der Stopp-Knopf des Systems funktioniert immer; die Mission ist das, was den Morgen verdient.`,
  },

  reliable: {
    heading: { pre: `Schon `, accent: `am Abend vorher`, post: ` wissen, dass er klingelt` },
    lede: `Die meisten Wecker-Apps merken im selben Moment wie du, dass sie versagt haben. WakeSharp prüft, was Alarme tatsächlich stoppt — Berechtigungen, Alarmlautstärke, Benachrichtigungseinstellungen, Anzeige über dem Sperrbildschirm, Akku-Beschränkungen — und beginnt mit einem Urteil, nicht mit einem Versprechen.`,
    items: [
      { title: `Ein Urteil, keine Checkliste`, body: `Eine Zeile ganz oben: Er klingelt, er klingelt vielleicht nicht, oder er kann es nicht.` },
      { title: `Ehrlich über blinde Flecken`, body: `Wo das Telefon nichts verrät, sagt die App es — nie ein grüner Haken.` },
      { title: `Lösungen mit einem Tipp, wo es sie gibt`, body: `Und klare Anleitungen, wo nicht.` },
      { title: `„Hat nicht geklingelt“ bekommt eine Antwort`, body: `Die belegbare Ursache — oder das Eingeständnis, dass wir es nicht sagen konnten.` },
    ],
    note: `Sie ist kostenlos, sie steckt in den Einstellungen, und die Erinnerung vor dem Schlafengehen nimmt den schlimmsten Fund mit auf, damit du ihn siehst, solange noch Zeit bleibt, ihn zu beheben.`,
  },

  smart: {
    alt: `Der Editor für smarte Alarmregeln, eingestellt auf 90 Minuten vor dem ersten Meeting`,
    heading: { pre: `Weckt dich vor deinem `, accent: `ersten Meeting`, post: `` },
    lede: `„Klingle 90 Minuten vor meinem ersten Meeting.“ WakeSharp liest deinen Kalender auf deinem Gerät, prüft ihn über Nacht erneut und verschiebt den Alarm, wenn sich das Meeting verschiebt. Nur lesend, optional, nie übertragen.`,
    shifts: `Und nicht jede Woche ist eine Woche. Schichtrhythmen kümmern sich um die Muster, die nicht wöchentlich sind — zwei Tage, zwei Nächte, vier frei — mit Vorschaukalender und der Möglichkeit, ein einzelnes Datum zu überspringen, ohne etwas zu löschen. Profile tauschen einen ganzen Satz Alarme auf einmal: Arbeit, Urlaub oder Bereitschaft. Suche, Sortierung und eine Heute-Ansicht halten die Liste übersichtlich, wenn es viele werden.`,
    labels: `Sag, wofür du aufstehst — Sport, Arbeitsweg, Frühstück — und die Bezeichnung schreibt sich von selbst. Eine smarte Regel, ein Schichtrhythmus und ein Profil sind kostenlos; Plus hebt alle drei Grenzen auf.`,
  },

  mission: {
    alt: `Die Mission Mind Games: Löse 6 minus 3, um den Alarm zu beenden`,
    heading: { pre: `Fünf Wege, dich `, accent: `aus dem Bett zu holen`, post: `` },
    lede: `Bevor der Morgen zählt, muss etwas passieren, und du wählst, was. Mind Games (Kopfrechnen) und Photo Proof (Fotobeweis) sind kostenlos, der Rest kommt mit Plus. Jede Mission hat einen Ausweg, der in Mind Games mit voller Wertung endet — eine kaputte Kamera oder ein Telefon ohne Schrittzähler lässt dich also nie feststecken.`,
    /** Die fünf Missionen, die der Alarm-Editor anbietet, in seiner Reihenfolge. `tier` ist Kostenlos oder Plus. */
    missions: [
      { name: `Mind Games`, tier: `Kostenlos`, body: `Drei Rechenaufgaben in leicht, normal oder schwer. Die Mission, auf die jede andere zurückfällt.` },
      { name: `Photo Proof`, tier: `Kostenlos`, body: `Fotografiere den Himmel, dein gemachtes Bett, ein Glas Wasser. Sechs Motive im Tageswechsel, es gibt also nichts, was du am Abend vorher zurechtlegen könntest.` },
      { name: `Scan an Object`, tier: `Plus`, body: `Objekt scannen: Richte die Kamera auf etwas auf der anderen Seite des Zimmers. Zwanzig Alltagsgegenstände im Katalog, erkannt auf dem Telefon selbst.` },
      { name: `Walk It Off`, tier: `Plus`, body: `Lauf dich wach: Steh auf und mach die Schritte. Die App liest den Schrittzähler und achtet auf deinen Rhythmus, Schütteln bringt also nichts.` },
      { name: `Surprise me`, tier: `Plus`, body: `Überrasch mich: würfelt zwischen Mind Games, einem Scan und einem Spaziergang — festgelegt für diesen Alarm an diesem Tag, du erfährst es also erst, wenn er klingelt.` },
    ],
    note: `Die Mission wird beim Anlegen des Alarms gewählt, nie beim Klingeln — ein Alarm, der bereits einen Scan oder einen Spaziergang trägt, führt ihn weiter aus, was auch immer mit einem Abo passiert. Strict Mode (strenger Modus) bucht, wo unterstützt, vier Wiederholungen im Voraus, und Schlummern ist eine Regel, die du selbst festlegst, keine, die dir vorgegeben wird.`,
  },

  games: {
    alt: `Das Aufwärmspiel Memory Match`,
    heading: { pre: `Zwei Minuten `, accent: `Aufwärmen`, post: `, während das Wasser kocht` },
    lede: `Math Sprint, Memory Match, Sequence Recall, Word Dash und Reaction Tap: Kopfrechnen, Gedächtnis, Sequenzen, Wörter und Reaktion. Kostenlos spielst du eines nach deiner Mission, gezogen aus einem Paar. Mit Plus sind es drei pro Morgen im Wechsel, sodass der ganze Satz innerhalb einer Woche durch ist — und nie das wiederholt, was die Mission dir gerade abverlangt hat. Pflicht ist nichts davon; der Alarm ist zu dem Zeitpunkt längst aus.`,
  },

  sharp: {
    alt: `Die tägliche Enthüllung des Sharpness Score`,
    heading: { pre: `Sieh, wie `, accent: `hellwach`, post: ` du aufgewacht bist` },
    lede: `Eine einzige Zahl auf einer Skala bis 100 — dein Sharpness Score (der Wert dafür, wie hellwach du aufgewacht bist) —, gemessen an deiner eigenen gleitenden Basislinie, nicht an Fremden. Die körperlichen Missionen bleiben außen vor: Ein Scan, ein Spaziergang und ein Foto werden immer nur mit sich selbst verglichen, denn durchs Zimmer zu gehen ist keine Rechenaufgabe. Dein Ich von gestern ist um 6 Uhr morgens der einzige Maßstab, der etwas taugt.`,
  },

  stats: {
    alt: `Das Sharpness-Trenddiagramm mit Serienzähler`,
    heading: { pre: `Sieh dir zu, wie du `, accent: `wacher wirst`, post: `` },
    lede: `Eine Serie, eine Trendlinie und alle sieben Morgen ein Freeze-Token — zwei kannst du ansparen, das Leben darf also zweimal dazwischenkommen. Meilensteine gibt es bei 7, 30, 100 und 365. Verpasst du einen Morgen ganz, hält eine Nachhol-Mission die Kette mit halber Wertung am Leben. Sieben Tage Verlauf kostenlos; mit Plus alles, was du je aufgezeichnet hast, wie weit das auch zurückreicht.`,
  },

  together: {
    heading: { pre: `Nimm `, accent: `jemanden mit`, post: `` },
    lede: `Teile einen Link, und das Telefon, das ihn öffnet, stellt denselben Alarm ein und klingelt ihn dann von allein. Nichts, dem man beitreten muss, nichts, wofür man sich anmeldet, und kein Server dazwischen.`,
    cards: [
      { title: `Mit Freunden aufwachen`, body: `Du schickst einen Link; das Telefon der anderen Person baut den Alarm lokal. Jede Seite behält ihre eigene Kopie, deine Änderungen greifen also nicht in ihre ein.` },
      { title: `Schlag meinen Morgen`, body: `Beende eine Mission und du kannst jemanden zum identischen Aufgabensatz herausfordern — gleicher Seed, gleiche Runden, gleiche Schwierigkeit. Danach weißt du, wer von euch wirklich wach war.` },
    ],
    note: `Beides ist kostenlos, und beides sind einfach Links: Das Telefon, das einen empfängt, erledigt die ganze Arbeit selbst.`,
  },

  platforms: {
    heading: { pre: `Dieselbe App. `, accent: `Beide Telefone.`, post: `` },
    lede: `Zweimal nativ gebaut — SwiftUI auf iOS, Kotlin und Compose auf Android. Kein Wrapper, und nur deshalb kann jede Seite das, was nur sie kann. Erfordert {ios} oder {android}.`,
    watch: `Für beide Handgelenke gibt es außerdem eine Uhren-App — watchOS 26 oder Wear OS 3. Sie tippt dich wach, bevor der Raum etwas hört, und der Telefonalarm rückt als Absicherung ein paar Minuten nach hinten. Nur ein Beenden auf der Uhr sagt ihn ab: eine leere Uhr, eine außer Reichweite oder eine, die du seit 36 Stunden nicht geöffnet hast, lassen den Telefonalarm genau dort, wo er war. Fürs Zifferblatt gibt es ebenfalls eine Komplikation.`,
    account: `Es gibt kein Konto anzulegen, aber du kannst dich mit Apple oder Google anmelden, wenn du eine einzige Sache davon willst: ein Backup, damit Alarme, Einstellungen, Werte und Serie auf einem neuen Telefon zurückkommen. Standardmäßig ist es aus, alles funktioniert auch abgemeldet, und um 6 Uhr morgens wartet nie etwas auf das Netz.`,
  },

  /** Die Screenshot-Galerie der Stores (src/components/StoreGallery.astro). */
  gallery: {
    tablistAria: `Plattform wählen`,
    rails: {
      ios: { label: `iPhone`, store: `App Store` },
      android: { label: `Android`, store: `Google Play` },
    },
    railHeading: `{label} — so zu sehen im {store}`,
    altTemplate: `WakeSharp auf {label}: {caption}`,
    fallbackCaption: `App-Screenshot`,
    /** Nummer des Bildes → was es zeigt, samt der englischen Überschrift im Bild. */
    captions: {
      '01': `Startbildschirm mit dem nächsten Alarm und einer smarten Kalenderregel, überschrieben mit „Wake up sharp. Not just awake.“ (Hellwach aufwachen. Nicht nur wach.)`,
      '02': `Der Alarm klingelt über dem Sperrbildschirm, überschrieben mit „Complete a mission for full credit“ (Erledige eine Mission für die volle Wertung)`,
      '03': `Die Mission Mind Games, die den Alarm beendet, überschrieben mit „Solve to silence“ (Lösen, um stummzuschalten)`,
      '04': `Die Aufwärmspiele, überschrieben mit „5 brain games. 3 every morning.“ (5 Denkspiele. 3 jeden Morgen.) und mit dem Hinweis, dass der Wechsel zu WakeSharp Plus gehört`,
      '05': `Die tägliche Enthüllung des Sharpness Score, gemessen an deiner eigenen Basislinie`,
      '06': `Der Editor für smarte Alarmregeln, überschrieben mit „Wakes you before your first meeting“ (Weckt dich vor deinem ersten Meeting)`,
      '07': `Die Sharpness-Trend- und Serienstatistik: Serien und Freezes kostenlos, der vollständige Verlauf mit WakeSharp Plus`,
    },
  },

  yours: {
    heading: { pre: `Der Morgen gehört `, accent: `dir`, post: `` },
    lede: `Der Alarm, den du wirklich hören willst, hinter dem Bild, das du wirklich sehen willst.`,
    cards: [
      { title: `13 Töne, alle kostenlos`, body: `Von Dawn bis Smoke Alarm, und jeder von ihnen bringt auch einen sanfteren Zwilling mit.` },
      { title: `Hintergründe und Szenen`, body: `Drei Hintergrundbilder kostenlos und fünf mit Plus, und der Lark (das Maskottchen, eine Lerche) bekommt vier weitere Szenen, jede mit eigener Feier.` },
      { title: `Hell, dunkel oder keins davon`, body: `Wähl ein Erscheinungsbild oder lass es dem Gerät folgen; so oder so verschiebt sich die Palette mit der Tageszeit.` },
      { title: `Sanfter landen`, body: `Gentle start (sanfter Start) auf dem iPhone lässt den Ton leise beginnen und nach etwa 25 Sekunden auf volle Lautstärke steigen. Auf Android hellt ein Sonnenaufgang den Bildschirm auf und hebt die Lautstärke schon vor dem Alarm an.` },
    ],
  },

  pricing: {
    heading: { pre: `Dein Alarm klingelt `, accent: `kostenlos, für immer`, post: `` },
    lede: `Und ohne Werbung. Zwei der fünf Missionen sind ebenfalls kostenlos, dazu alle 13 Töne, Strict Mode, die Schlummer-Voreinstellungen und die Zuverlässigkeitsprüfung. Plus ist für den Morgen nach dem Alarm — die übrigen Missionen, mehr Aufwärmspiele, mehr smarte Regeln und der ganze Verlauf.`,
    free: {
      name: `Kostenlos`,
      price: `$0`,
      tagline: `Keine Anmeldung, keine Testphase zum Vergessen.`,
      /** Spiegelt die Grenzen, die das ausgelieferte Paywall wirklich durchsetzt. */
      features: [
        `So viele Alarme, wie du brauchst`,
        `Zwei Weck-Missionen — Mind Games und Photo Proof`,
        `Alle 13 Alarmtöne`,
        `Strict Mode, Schlummer-Voreinstellungen und Zuverlässigkeitsprüfung`,
        `Ein smarter Kalenderalarm, ein Schichtrhythmus, ein Profil`,
        `Suche, Sortierung und die Heute-Ansicht`,
        `Serien, Freeze-Tokens und Meilensteine`,
        `Ein Aufwärmspiel nach jeder Mission und dein 7-Tage-Trend`,
        `Mit Freunden aufwachen und die Uhren-App für beide Handgelenke`,
        `Drei Alarm-Hintergrundbilder und die Szene Classic Lark`,
      ],
    },
    plus: {
      name: `WakeSharp Plus`,
      perMonth: `/Monat`,
      annual: `oder **{annual}/Jahr**, mit {trialDays} Tagen kostenloser Testphase`,
      lifetime: `oder **{lifetime} einmalig** — Lifetime, das sich nie verlängert`,
      /** Punkt 2-6 sind die fünf Zeilen des Paywalls, in dessen Reihenfolge. */
      features: [
        `Alles aus Kostenlos`,
        `Jede Weck-Mission über Mind Games und Photo Proof hinaus`,
        `Drei Aufwärmspiele jeden Morgen, im Wechsel`,
        `Dein vollständiger Sharpness-Verlauf`,
        `Smarte Kalenderalarme ohne Limit`,
        `Lark-Szenen, Alarm-Hintergründe und Feiern`,
        `So viele Schichtrhythmen und Profile, wie du magst, plus eigene Schlummer-Regel`,
      ],
    },
    lapse: `Plus wird geprüft, wenn du einen Alarm anlegst, nicht wenn er klingelt. Ein Alarm, der bereits einen Scan oder einen Spaziergang trägt, führt ihn weiter aus, ob ein Abo aktiv ist oder nicht — nichts, was du schon eingerichtet hast, hört auf zu funktionieren. Was wegfällt, ist das Einrichten neuer.`,
    billing: `Monats- und Jahresabo rechnen Apple oder Google ab und verlängern sich bis zur Kündigung — kündige jederzeit in deinem Store-Konto, und denk daran: Die App zu löschen kündigt kein Abo. Lifetime ist eine einmalige Zahlung, bei der es nichts zu kündigen gibt. Siehe die [Nutzungsbedingungen](terms).`,
    /** Nur auf lokalisierten Seiten: Die Stores lokalisieren die Preise zur Laufzeit. */
    usdNote: `Die Preise stehen in US-Dollar; App Store und Google Play zeigen den Preis für dein Land.`,
  },

  faq: {
    heading: { pre: `Fragen, `, accent: `beantwortet`, post: `` },
    items: [
      {
        q: `Klingelt er wirklich im Lautlos-Modus, in Fokus oder bei „Nicht stören“?`,
        a: `Das Verhalten hängt von der Plattform ab, und es hängt von einer Berechtigung ab. Auf dem iPhone nutzt WakeSharp Apples AlarmKit, das durch Lautlos-Modus und Fokus hindurch klingeln kann, sobald du den Alarmzugriff erlaubt hast — lehnst du ihn ab oder entziehst ihn, kann WakeSharp überhaupt nichts planen. Auf Android läuft er über den eigenen Alarm-Audiokanal, den „Nicht stören“ nicht stummschaltet, und zeigt eine Vollbildmeldung über dem Sperrbildschirm, sofern die Berechtigungen für exakte Alarme, Benachrichtigungen und den Sperrbildschirm vorliegen. Was keine App kann: auf einem Telefon klingeln, das ausgeschaltet oder leer ist. Für alles, was du wirklich nicht verpassen darfst, stell also einen zweiten Alarm auf einem anderen Gerät.`,
      },
      {
        q: `Wie prüfe ich, ob mein Alarm wirklich klingelt?`,
        a: `Öffne Einstellungen → Alarm reliability (Alarm-Zuverlässigkeit). WakeSharp liest die Bedingungen auf deinem Telefon, die einen Alarm stoppen können — Berechtigungen, Alarmlautstärke, Benachrichtigungseinstellungen, Anzeige über dem Sperrbildschirm, Akku-Beschränkungen — und beginnt mit einem klaren Urteil statt mit einem Versprechen. Wo die Plattform uns etwas nicht verrät, sagt die App das, statt einen grünen Haken zu zeigen, denn eine Checkliste, die Unbekanntes stillschweigend zu Bestandenem macht, ist schlimmer als gar keine. Fällt ein Alarm doch einmal aus, kann die App dir hinterher die belegbare Ursache nennen — oder zugeben, dass sie es nicht herausfinden konnte.`,
      },
      {
        q: `Muss ich um 6 Uhr morgens rechnen?`,
        a: `Nur wenn du willst. Die zwei kostenlosen Missionen sind Mind Games, drei Rechenaufgaben, und Photo Proof, das einfach ein Foto von etwas verlangt — dem Himmel, deinem gemachten Bett, einem Glas Wasser, nach einem Motiv, das täglich wechselt. Plus ergänzt das Scannen eines echten Gegenstands auf der anderen Seite des Zimmers, eine festgelegte Zahl Schritte und „Surprise me“, das eine davon auswählt und für diesen Alarm an diesem Tag festlegt, sodass sich am Abend vorher nichts vorbereiten lässt. Jede Mission hat einen Ausweg, der in Mind Games mit voller Wertung endet — eine kaputte Kamera oder ein Telefon auf dem Nachttisch bringt dich also nie in die Falle.`,
      },
      {
        q: `Kann ich die Mission umgehen?`,
        a: `Du kannst den Alarm auch ohne Mission beenden — der Stopp-Knopf deines Telefons funktioniert immer, und wir wollten es gar nicht anders. WakeSharp zeigt dir dann beim nächsten Öffnen die offene Mission an, und eine Nachhol-Mission kann deine Serie mit halber Wertung retten. Schlummern ist eine Regel, die du wählst, keine, die dir vorgegeben wird: aus, standardmäßig zweimal fünf Minuten, oder Tighten, das jede Pause verkürzt und die Schwierigkeit dabei anhebt. Jedes Schlummern kostet Sharpness. Strict Mode bucht, wo unterstützt, vier Wiederholungen im Voraus — nach 45 Sekunden, dann nach 4, 8 und 12 Minuten — und wenn du die Mission erledigst, werden die noch nicht ausgelösten abgesagt.`,
      },
      {
        q: `Was macht die Kamera?`,
        a: `Zwei Missionen nutzen sie, und nur, solange die Mission läuft oder du sie einrichtest. Scan an Object klassifiziert die Bilder auf deinem Gerät — Apples Vision-Framework auf dem iPhone, ein kleines mitgeliefertes Modell auf Android —, um zu prüfen, ob du das Gewählte ansiehst. Photo Proof verlangt eine Aufnahme, und die verifizierte Variante vergleicht sie mit einer Referenz, die du hinterlegt hast, ebenfalls auf deinem Gerät. Nichts wird hochgeladen, nichts landet in deiner Fotomediathek, und das vollständige Foto wird nie behalten — nur ein kleiner Fingerabdruck davon. Lehne die Berechtigung ab, und alle anderen Missionen funktionieren weiter.`,
      },
      {
        q: `Erfasst WakeSharp meinen Schlaf?`,
        a: `Nein. Es gibt keinerlei Schlaftracking — kein Mikrofon, das nachts mithört, keine Schlafphasen, keine Note für deine Nacht und keine Meinung dazu, wann du eingeschlafen bist. Der Schrittzähler wird während der Lauf-Mission gelesen und zu keinem anderen Zeitpunkt. WakeSharp misst, wie hellwach du bist, sobald du auf bist, und nichts davor. Das Einzige mit Schlaf darin sind eine Schlafenszeit, die du selbst festlegst, und eine optionale Erinnerung zum Runterkommen.`,
      },
      {
        q: `Was genau liest die App aus meinem Kalender?`,
        a: `Deine anstehenden Termine, nur lesend, vollständig auf deinem Gerät, zu einem einzigen Zweck: auszurechnen, wann sie dich wecken soll. Nichts wird irgendwohin übertragen. Es ist optional, und jede andere Funktion arbeitet auch, wenn du ablehnst.`,
      },
      {
        q: `Brauche ich ein Konto?`,
        a: `Nein, und nichts hängt hinter einem — es gibt weder E-Mail noch Passwort irgendwo in der App. Du kannst dich optional mit Apple oder Google anmelden, zu genau einem Zweck: um deine Alarme, Einstellungen, Werte und Serie zu sichern, damit sie auf einem neuen Telefon zurückkommen. Standardmäßig ist das aus, jede Funktion arbeitet auch abgemeldet, und ein Alarm wartet zum Klingeln nie auf das Netz. Löschen kannst du es unter Einstellungen → Konto oder auf wakesharp.app/account/delete.`,
      },
      {
        q: `Was passiert, wenn meine Uhr leer ist?`,
        a: `Dein Telefon klingelt. Die Uhr tippt dich zuerst wach, und WakeSharp verschiebt den Telefonalarm als Absicherung um ein paar Minuten, sodass nur ein Beenden auf der Uhr ihn absagt. Eine leere Uhr, eine außer Reichweite oder eine, die du seit 36 Stunden nicht geöffnet hast, lassen den Telefonalarm genau dort, wo er war. Die Wächter-Alarme von Strict Mode klingeln ohnehin auf dem Telefon.`,
      },
      {
        q: `Was ist kostenlos und was ist Plus?`,
        a: `Dein Alarm klingelt kostenlos, für immer, ohne Werbung. Kostenlos sind so viele Alarme, wie du brauchst, die Missionen Mind Games und Photo Proof, alle 13 Alarmtöne, Strict Mode, die Schlummer-Voreinstellungen, die Zuverlässigkeitsprüfung, Serien und Freeze-Tokens, ein Aufwärmspiel nach jeder Mission, ein smarter Kalenderalarm, ein Schichtrhythmus, ein Profil, die Uhren-App und dein 7-Tage-Sharpness-Trend. Plus ergänzt die übrigen Missionen — Scan an Object, Walk It Off und Surprise me —, drei wechselnde Aufwärmspiele pro Morgen, smarte Kalenderalarme ohne Limit, so viele Schichtrhythmen und Profile, wie du magst, deinen vollständigen Sharpness-Verlauf, eine eigene Schlummer-Regel sowie die Lark-Szenen, Hintergrundbilder und Feiern.`,
      },
      {
        q: `Was passiert mit meinen Plus-Alarmen, wenn ich nicht mehr zahle?`,
        a: `Sie funktionieren weiter. Geprüft wird beim Anlegen eines Alarms, nicht beim Klingeln — ein Alarm, der bereits einen Scan oder einen Spaziergang trägt, führt ihn weiter aus, ob ein Abo aktiv ist oder nicht. Was du verlierst, ist das Einrichten neuer, dazu die zusätzlichen Aufwärmspiele und der vollständige Verlauf.`,
      },
      {
        q: `Ist Lifetime ein Abo?`,
        a: `Nein. Lifetime ist eine einmalige Zahlung für dieselben WakeSharp-Plus-Funktionen — es verlängert sich nicht, und es gibt nichts zu kündigen. Monats- und Jahresabo verlängern sich, bis du sie stoppst. Die 7-tägige kostenlose Testphase gehört zum Jahresabo.`,
      },
      {
        q: `Wie kündige ich?`,
        a: `Über den App Store oder Google Play, jederzeit. Die App zu löschen kündigt kein Abo. Bei Lifetime gibt es nichts zu kündigen — es ist ein einmaliger Kauf, und „Käufe wiederherstellen“ holt ihn auf ein neues Telefon zurück.`,
      },
      {
        q: `Verfolgt mich die App?`,
        a: `Keine Werbe-ID, kein Standort und kein Tracking über andere Apps hinweg. Was dein Gerät verlässt: anonyme Nutzungsstatistiken (eine zufällige ID und welche Bildschirme du nutzt — nie deine Alarme, deinen Kalender oder deine Kamera), Abodaten, wenn du Plus kaufst, und dein eigenes Backup, falls du ein Konto angelegt hast. Dein Konto wird nie mit den Statistiken verknüpft. Die Datenschutzerklärung listet jedes Byte auf.`,
      },
    ],
  },

  cta: {
    heading: { pre: `Morgen früh beginnt `, accent: `heute Abend`, post: `` },
    lede: `Stell einen Alarm. Und sieh, wie sich ein hellwacher Morgen wirklich anfühlt.`,
  },
} satisfies typeof en;
