import { home as en } from '../en/home';

/**
 * Die Startseite. Überschriften stehen als {pre, accent, post}, weil das
 * hervorgehobene Wort im Template ein <span class="accent"> ist; die Leerzeichen
 * bleiben in den Strings. `{ios}`, `{android}`, `{annual}`, `{monthly}` und
 * `{trialDays}` kommen aus src/config/site.ts.
 *
 * Jede Aussage hier muss für die Version gelten, die man heute lädt, und für die
 * nächste (2.10 bis 2.13, Stand 2026-09-24). Deshalb beschreibt die Seite
 * Missionen nach ihrer Art und nie, wie oft der Alarm zurückkommt: Dieser
 * Mechanismus ändert sich zwischen diesen Versionen. Quelle sind
 * Docs/marketing-execution/claims-matrix.md im App-Repo und die
 * App-Store-Beschreibung. Die App gibt es auf Deutsch, deshalb stehen
 * Funktionsnamen im Fließtext so, wie die deutsche App sie zeigt
 * (Localizable.xcstrings). Alt-Texte und Bildunterschriften beschreiben die
 * englischen Screenshots und behalten deren Namen.
 */
export const home = {
  title: `WakeSharp - Wecker für Tiefschläfer, mit Missionen`,

  hero: {
    /** Steht im <h1> über dem Slogan: die Suchanfrage, auf die die Seite zielt. */
    kicker: `Der Wecker für Tiefschläfer`,
    heading: { pre: `Wach auf. Und zwar `, accent: `hellwach.`, post: `Nicht nur wach.` },
    lede: `Für Tiefschläfer, denen eine Schlummertaste nicht reicht. Wischen kann auch jemand, der kaum bei Bewusstsein ist, deshalb verlangt WakeSharp stattdessen eine Mission (lösen, fotografieren, laufen oder laut aussprechen) und bewertet danach, wie hellwach du wirklich aufgewacht bist.`,
    phoneAlt: `WakeSharp-Startbildschirm bei Nacht, mit einem Alarm um 6:40 Uhr und einer smarten Kalenderregel`,
  },

  trust: [
    `Klingelt auf dem iPhone durch Lautlos-Modus und Fokus`,
    `Sagt dir schon am Abend vorher, was ihn stoppen könnte`,
    `Kein WakeSharp-Konto nötig`,
    `Kamerabilder und Kalender werden auf deinem Telefon verarbeitet`,
    `WakeSharp zeigt keine Werbung`,
  ],

  ring: {
    alt: `Der WakeSharp-Alarm klingelt, mit „Mission starten“ und „Schlummern“`,
    heading: { pre: `Erledige die Mission für die `, accent: `volle Wertung`, post: `` },
    lede: `Auf dem iPhone zeigt Apples AlarmKit einen Systemalarm über dem Sperrbildschirm: durch Lautlos-Modus und Fokus hindurch, sobald du den Alarmzugriff erlaubt hast, und selbst dann, wenn die App zwangsbeendet wurde. Auf Android klingelt ein exakter Alarm auf dem Alarm-Audiokanal auch im Lautlos-Modus und bei „Nicht stören“, sofern dort Alarme erlaubt sind: mit Extra Loud (besonders laut) und einer Rampe, die ansteigt, statt sofort loszubrüllen. Wie auch immer du ihn verstummen lässt: Der Morgen zählt erst, wenn die Mission erledigt ist.`,
  },

  reliable: {
    heading: { pre: `Schon `, accent: `am Abend vorher`, post: ` wissen, dass er klingelt` },
    lede: `Die meisten Wecker-Apps merken im selben Moment wie du, dass sie versagt haben. WakeSharp prüft, was Alarme tatsächlich stoppt (Berechtigungen, Alarmlautstärke, Benachrichtigungseinstellungen, Anzeige über dem Sperrbildschirm, Akku-Beschränkungen) und beginnt mit einem Urteil, nicht mit einem Versprechen.`,
    items: [
      { title: `Ein Urteil, keine Checkliste`, body: `Eine Zeile ganz oben: Er klingelt, er klingelt vielleicht nicht, oder er kann es nicht.` },
      { title: `Ehrlich über blinde Flecken`, body: `Wo das Telefon nichts verrät, sagt die App es: nie ein grüner Haken.` },
      { title: `Lösungen mit einem Tipp, wo es sie gibt`, body: `Und klare Anleitungen, wo nicht.` },
      { title: `„Hat nicht geklingelt“ bekommt eine Antwort`, body: `Die belegbare Ursache, oder das Eingeständnis, dass wir es nicht sagen konnten.` },
    ],
    note: `Die Prüfung steckt in den Einstellungen, und die Erinnerung vor dem Schlafengehen nimmt den schlimmsten Fund mit auf, damit du ihn siehst, solange noch Zeit bleibt, ihn zu beheben.`,
  },

  smart: {
    alt: `Der Editor für smarte Alarmregeln, eingestellt auf 90 Minuten vor dem ersten Meeting`,
    heading: { pre: `Weckt dich vor deinem `, accent: `ersten Meeting`, post: `` },
    lede: `„Klingle 90 Minuten vor meinem ersten Meeting.“ WakeSharp liest deinen Kalender auf deinem Gerät, prüft ihn über Nacht erneut und verschiebt den Alarm, wenn sich das Meeting verschiebt. Nur lesend, optional, nie übertragen.`,
    shifts: `Und nicht jede Woche ist eine Woche. Schichtrhythmen kümmern sich um die Muster, die nicht wöchentlich sind (zwei Tage, zwei Nächte, vier frei) mit Vorschaukalender und der Möglichkeit, ein einzelnes Datum zu überspringen, ohne etwas zu löschen. Profile tauschen einen ganzen Satz Alarme auf einmal: Arbeit, Urlaub oder Bereitschaft. Suche, Sortierung und eine Heute-Ansicht halten die Liste übersichtlich, wenn es viele werden.`,
    labels: `Sag, wofür du aufstehst (Sport, Arbeitsweg, Frühstück) und die Bezeichnung schreibt sich von selbst.`,
  },

  mission: {
    alt: `Die Mission Mind Games: Löse 9 minus 4, um den Alarm zu beenden`,
    heading: { pre: `Missionen, die dich `, accent: `aus dem Bett holen`, post: `` },
    lede: `Bevor der Morgen zählt, muss etwas passieren, und du wählst, was: Rechenaufgaben, ein Rätsel, ein Foto der Stelle, die du am Abend gewählt hast, echte Schritte oder eine laut gesprochene Antwort. Ein Alarm kann mehrere Missionen hintereinander verlangen, in der Reihenfolge, die du festlegst, und wenn eine davon an diesem Morgen nicht laufen kann (eine kaputte Kamera, ein Telefon ohne Schrittzähler), weicht WakeSharp auf eine aus, die funktioniert.`,
    /**
     * Jede Mission, die der Alarm-Editor anbietet (Einträge in GameCatalog.json
     * mit `supportsMission`), gruppiert nach dem, was sie von dir verlangt.
     * `kind` ist das kleine Label in der Ecke jeder Karte. Namen und Arten sind
     * die der deutschen App; die Einzeiler sind die Kurzbeschreibungen aus dem
     * Katalog - wörtlich aus der App, wo sie eine deutsche Fassung hat, sonst
     * treu übersetzt.
     */
    missions: [
      { name: `Kopfrechnen`, kind: `Kopf`, body: `Schnelle Rechenrunden, die du richtig lösen musst.` },
      { name: `Memory`, kind: `Kopf`, body: `Deck die Karten auf und finde jedes Paar.` },
      { name: `Reihenfolge`, kind: `Kopf`, body: `Wiederhole ein Tippmuster, das mit jeder Runde wächst.` },
      { name: `Farbkonflikt`, kind: `Kopf`, body: `Tippe die Tintenfarbe an, nicht das Wort.` },
      { name: `Abtippen`, kind: `Kopf`, body: `Tippe eine Zeile Wort für Wort ab, ohne Autokorrektur.` },
      { name: `Fotobeweis`, kind: `Kamera`, body: `Fotografiere noch einmal die Stelle, die du am Abend vorher gewählt hast.` },
      { name: `Objekt scannen`, kind: `Kamera`, body: `Steh auf und richte die Kamera auf eine Flasche, eine Tasse oder ein Waschbecken.` },
      { name: `Hol was`, kind: `Kamera`, body: `Geh los und finde etwas Blaues oder etwas, aus dem du trinkst.` },
      { name: `Gesichtscheck`, kind: `Kamera`, body: `Öffne die Augen für die Kamera und folge dann der Anweisung.` },
      { name: `Obst schnippeln`, kind: `Kamera`, body: `Schneide das Obst mit dem Finger aus der Luft.` },
      { name: `Lauf dich wach`, kind: `Bewegung`, body: `Mach echte Schritte, gezählt von deinem Telefon.` },
      { name: `Erstes Licht`, kind: `Bewegung`, body: `Geh zum Fenster und halte dein Telefon ins Licht.` },
      { name: `Siebener-Reihe`, kind: `Stimme`, body: `Zähle laut in Siebenerschritten rückwärts.` },
      { name: `Nenne fünf`, kind: `Stimme`, body: `Nenne laut fünf Dinge aus einer Kategorie.` },
      { name: `Überrasch mich`, kind: `Beliebig`, body: `Jeden Morgen eine andere Mission.` },
    ],
    note: `Missionen sind Teil des Alarms, den du anlegst: Der Deal steht also schon am Abend vorher und wird nicht um 6 Uhr morgens verhandelt.`,
  },

  games: {
    alt: `Das Aufwärmspiel Memory Match`,
    heading: { pre: `Zwei Minuten `, accent: `Aufwärmen`, post: `, während das Wasser kocht` },
    lede: `„Kopfrechnen“, „Memory“, „Reihenfolge“, „Wortsprint“ und „Reaktion“. Drei davon laufen jeden Morgen im Wechsel, sodass der ganze Satz innerhalb einer Woche durch ist, und das Aufwärmen wiederholt nie, was die Mission dir gerade abverlangt hat. Pflicht ist nichts davon; der Alarm ist zu dem Zeitpunkt längst aus.`,
  },

  sharp: {
    alt: `Die tägliche Enthüllung des Sharpness Score`,
    heading: { pre: `Sieh, wie `, accent: `hellwach`, post: ` du aufgewacht bist` },
    lede: `Eine einzige Zahl bis 100 aus dem Aufwärmen (dein Wachheitswert), gemessen an deiner eigenen gleitenden Basislinie, nicht an Fremden. Es ist ein App-interner Wert, kein klinischer Test, und dein Ich von gestern ist um 6 Uhr morgens der einzige Maßstab, der etwas taugt.`,
  },

  stats: {
    alt: `Das Sharpness-Trenddiagramm mit Serienzähler`,
    heading: { pre: `Sieh dir zu, wie du `, accent: `wacher wirst`, post: `` },
    lede: `Eine Serie, eine Trendlinie und Freeze-Tokens für die Morgen, an denen das Leben dazwischenkommt. Meilensteine gibt es bei 7, 30, 100 und 365, und dein vollständiger Wachheitsverlauf reicht so weit zurück, wie du dabei bist.`,
  },

  together: {
    heading: { pre: `Nimm `, accent: `jemanden mit`, post: `` },
    lede: `Teile einen Link, und das Telefon, das ihn öffnet, stellt denselben Alarm ein und klingelt ihn dann von allein. Nichts, dem man beitreten muss, nichts, wofür man sich anmeldet, und kein Server dazwischen.`,
    cards: [
      { title: `Mit einem Freund aufwachen`, body: `Du schickst einen Link; das Telefon der anderen Person baut den Alarm lokal. Jede Seite behält ihre eigene Kopie, deine Änderungen greifen also nicht in ihre ein.` },
      { title: `Beat my wake`, body: `Schlag meinen Morgen: Beende eine Mission und du kannst jemanden zum identischen Aufgabensatz herausfordern: gleicher Seed, gleiche Runden, gleiche Schwierigkeit. Danach weißt du, wer von euch wirklich wach war.` },
    ],
    note: `Beides sind einfach Links: Das Telefon, das einen empfängt, erledigt die ganze Arbeit selbst.`,
  },

  platforms: {
    heading: { pre: `Dieselbe App. `, accent: `Beide Telefone.`, post: `` },
    lede: `Zweimal nativ gebaut: SwiftUI auf iOS, Kotlin und Compose auf Android. Kein Wrapper, und nur deshalb kann jede Seite das, was nur sie kann. Erfordert {ios} oder {android}.`,
    watch: `Für beide Handgelenke gibt es außerdem eine Uhren-App: watchOS 26 oder Wear OS 3. Sie tippt dich wach, bevor der Raum etwas hört, und der Telefonalarm rückt als Absicherung ein paar Minuten nach hinten. Nur ein Beenden auf der Uhr sagt ihn ab: eine leere Uhr, eine außer Reichweite oder eine, die du seit 36 Stunden nicht geöffnet hast, lassen den Telefonalarm genau dort, wo er war. Fürs Zifferblatt gibt es ebenfalls eine Komplikation.`,
    account: `Es gibt kein Konto anzulegen, aber du kannst dich mit Apple oder Google anmelden, wenn du eine einzige Sache davon willst: ein Backup, damit Alarme, Einstellungen, Werte und Serie auf einem neuen Telefon zurückkommen. Standardmäßig ist es aus, alles funktioniert auch abgemeldet, und um 6 Uhr morgens wartet nie etwas auf das Netz.`,
  },

  /** Die Screenshot-Galerie der Stores (src/components/StoreGallery.astro). */
  gallery: {
    tablistAria: `Plattform wählen`,
    rails: {
      ios: { label: `iPhone`, store: `App Store` },
      android: { label: `Android`, store: `Google Play` },
    },
    railHeading: `{label}: so zu sehen im {store}`,
    altTemplate: `WakeSharp auf {label}: {caption}`,
    fallbackCaption: `App-Screenshot`,
    /**
     * Nummer des Bildes → was es zeigt, samt der englischen Überschrift im Bild.
     * Die Bilder 04 und 07 werden zurückgehalten (StoreGallery.astro), weil ihre
     * Grafik noch das alte Preismodell zeigt; sie bekommen erst wieder eine
     * Bildunterschrift, wenn das App-Repo sie neu rendert.
     */
    captions: {
      '01': `Startbildschirm mit dem nächsten Alarm und einer smarten Kalenderregel, überschrieben mit „Wake up sharp. Not just awake.“ (Hellwach aufwachen. Nicht nur wach.)`,
      '02': `Der Alarm klingelt über dem Sperrbildschirm, überschrieben mit „Complete a mission for full credit“ (Erledige eine Mission für die volle Wertung)`,
      '03': `Die Mission Mind Games, die den Alarm beendet, überschrieben mit „Solve to silence“ (Lösen, um stummzuschalten)`,
      '05': `Die tägliche Enthüllung des Sharpness Score, gemessen an deiner eigenen Basislinie`,
      '06': `Der Editor für smarte Alarmregeln, überschrieben mit „Wakes you before your first meeting“ (Weckt dich vor deinem ersten Meeting)`,
    },
  },

  yours: {
    heading: { pre: `Der Morgen gehört `, accent: `dir`, post: `` },
    lede: `Der Alarm, den du wirklich hören willst, hinter dem Bild, das du wirklich sehen willst.`,
    cards: [
      { title: `Töne für jeden Schlaftyp`, body: `Von Dawn bis Smoke Alarm, und jeder von ihnen bringt auch einen sanfteren Zwilling mit.` },
      { title: `Hintergründe und Szenen`, body: `Alle Alarm-Hintergrundbilder und alle Lark-Szenen sind dabei (der Lark ist das Maskottchen, eine Lerche), und jede Szene bringt ihre eigene Feier mit.` },
      { title: `Hell, dunkel oder keins davon`, body: `Wähl ein Erscheinungsbild oder lass es dem Gerät folgen; so oder so verschiebt sich die Palette mit der Tageszeit.` },
      { title: `Sanfter landen`, body: `„Sanfter Start“ auf dem iPhone lässt den Ton leise beginnen und nach etwa 25 Sekunden auf volle Lautstärke steigen. Auf Android hellt ein Sonnenaufgang den Bildschirm auf und hebt die Lautstärke schon vor dem Alarm an.` },
    ],
  },

  pricing: {
    heading: { pre: `Ein Plan, `, accent: `alles drin`, post: `` },
    lede: `WakeSharp Unbegrenzt ist die ganze App: jede Weck-Mission, das tägliche Aufwärmen, smarte Kalenderalarme, Schichtrhythmen und Profile, dein vollständiger Wachheitsverlauf sowie jede Lark-Szene und jedes Hintergrundbild. WakeSharp zeigt keine Werbung.`,
    unlimited: {
      name: `WakeSharp Unbegrenzt`,
      perYear: `/Jahr`,
      /** Die Testphase und der Preis danach stehen immer zusammen. */
      trial: `Starte mit **{trialDays} Tagen kostenlos**, danach {annual} pro Jahr`,
      monthly: `oder **{monthly} pro Monat**, ohne Testphase`,
      features: [
        `Jede Weck-Mission, auf Wunsch mehrere hintereinander`,
        `Drei Aufwärmspiele jeden Morgen, im Wechsel`,
        `Dein vollständiger Wachheitsverlauf`,
        `Smarte Kalenderalarme, die mitwandern, wenn sich dein erstes Meeting verschiebt`,
        `Schichtrhythmen, Profile und so viele Alarme, wie du brauchst`,
        `Die Zuverlässigkeitsprüfung und jeder Alarmton`,
        `Jede Lark-Szene, jedes Alarm-Hintergrundbild und jede Feier`,
        `„Mit einem Freund aufwachen“ und die Uhren-App für beide Handgelenke`,
        `Keine Werbung`,
      ],
    },
    billing: `Jahres- und Monatsabo rechnen Apple oder Google ab und verlängern sich bis zur Kündigung: kündige jederzeit in deinem Store-Konto, und denk daran: Die App zu löschen kündigt kein Abo. Die kostenlose Testphase gilt für berechtigte Neuabonnenten. Siehe die [Nutzungsbedingungen](terms).`,
    /** Nur auf lokalisierten Seiten: Die Stores lokalisieren die Preise zur Laufzeit. */
    usdNote: `Die Preise stehen in US-Dollar; App Store und Google Play zeigen den Preis für dein Land.`,
  },

  faq: {
    heading: { pre: `Fragen, `, accent: `beantwortet`, post: `` },
    /** Antworten dürfen {annual}, {monthly} und {trialDays} verwenden; Preise stehen nie in einem Katalog. */
    items: [
      {
        q: `Klingelt er wirklich im Lautlos-Modus, in Fokus oder bei „Nicht stören“?`,
        a: `Das Verhalten hängt von der Plattform ab, und es hängt von einer Berechtigung ab. Auf dem iPhone nutzt WakeSharp Apples AlarmKit, das durch Lautlos-Modus und Fokus hindurch klingeln kann, sobald du den Alarmzugriff erlaubt hast: lehnst du ihn ab oder entziehst ihn, kann WakeSharp überhaupt nichts planen. Auf Android läuft er über den eigenen Alarm-Audiokanal, der auch im Lautlos-Modus klingelt und bei „Nicht stören“, sofern dort Alarme erlaubt sind (Totenstille schaltet jeden Ton stumm, Alarme eingeschlossen), und er zeigt eine Vollbildmeldung über dem Sperrbildschirm, sofern die Berechtigungen für exakte Alarme, Benachrichtigungen und den Sperrbildschirm vorliegen. Was keine App kann: auf einem Telefon klingeln, das ausgeschaltet oder leer ist. Für alles, was du wirklich nicht verpassen darfst, stell also einen zweiten Alarm auf einem anderen Gerät.`,
      },
      {
        q: `Wie prüfe ich, ob mein Alarm wirklich klingelt?`,
        a: `Öffne Einstellungen → Weckzuverlässigkeit. WakeSharp liest die Bedingungen auf deinem Telefon, die einen Alarm stoppen können (Berechtigungen, Alarmlautstärke, Benachrichtigungseinstellungen, Anzeige über dem Sperrbildschirm, Akku-Beschränkungen) und beginnt mit einem klaren Urteil statt mit einem Versprechen. Wo die Plattform uns etwas nicht verrät, sagt die App das, statt einen grünen Haken zu zeigen, denn eine Checkliste, die Unbekanntes stillschweigend zu Bestandenem macht, ist schlimmer als gar keine. Fällt ein Alarm doch einmal aus, kann die App dir hinterher die belegbare Ursache nennen, oder zugeben, dass sie es nicht herausfinden konnte.`,
      },
      {
        q: `Muss ich um 6 Uhr morgens rechnen?`,
        a: `Nur wenn du willst. Missionen gibt es in mehreren Arten: Rechnen und Rätsel, ein Foto einer Stelle, die du am Abend vorher gewählt hast, das Scannen eines echten Gegenstands auf der anderen Seite des Zimmers, Laufen oder der Gang zum Fenster, das Abtippen einer Zeile oder eine laut gesprochene Antwort. Wähl die, die zu dir passen; ein Alarm kann auch mehr als eine verlangen. „Überrasch mich“ wählt jeden Morgen eine andere, es gibt also am Abend vorher nichts vorzubereiten.`,
      },
      {
        q: `Kann ich die Mission umgehen?`,
        a: `Die Bedienelemente deines Telefons funktionieren immer: du kannst es ausschalten, und keine App sollte das verhindern können. In WakeSharp ist der Morgen aber nicht geschafft, wenn du den Alarm stoppst oder schlummern lässt: Er zählt erst, wenn die Mission erledigt ist.`,
      },
      {
        q: `Was macht die Kamera?`,
        a: `Nur die Missionen, die sie brauchen (darunter „Fotobeweis“, „Objekt scannen“, „Hol was“, „Gesichtscheck“ und „Obst schnippeln“), und nur, solange eine davon läuft oder du sie einrichtest. Objekterkennung und Fotoabgleich geschehen auf deinem Gerät. Lehne die Berechtigung ab, und jede Mission, die keine Kamera braucht, funktioniert weiter. Die Datenschutzerklärung sagt genau, was dein Telefon verlässt, falls überhaupt etwas, und wann.`,
      },
      {
        q: `Erfasst WakeSharp meinen Schlaf?`,
        a: `Nein. Es gibt keinerlei Schlaftracking: kein Mikrofon, das nachts mithört, keine Schlafphasen, keine Note für deine Nacht und keine Meinung dazu, wann du eingeschlafen bist. Der Schrittzähler wird während der Lauf-Mission gelesen und zu keinem anderen Zeitpunkt. WakeSharp misst, wie hellwach du bist, sobald du auf bist, und nichts davor. Das Einzige mit Schlaf darin sind eine Schlafenszeit, die du selbst planst, und optionale Klänge zum Runterkommen.`,
      },
      {
        q: `Was genau liest die App aus meinem Kalender?`,
        a: `Deine anstehenden Termine, nur lesend, vollständig auf deinem Gerät, zu einem einzigen Zweck: auszurechnen, wann sie dich wecken soll. Nichts wird irgendwohin übertragen. Es ist optional, und jede andere Funktion arbeitet auch, wenn du ablehnst.`,
      },
      {
        q: `Brauche ich ein Konto?`,
        a: `Ein WakeSharp-Konto brauchst du nicht: es gibt weder E-Mail noch Passwort irgendwo in der App. Du kannst dich optional mit Apple oder Google anmelden, zu genau einem Zweck: um deine Alarme, Einstellungen, Werte und Serie zu sichern, damit sie auf einem neuen Telefon zurückkommen. Standardmäßig ist das aus, jede Funktion arbeitet auch abgemeldet, und ein Alarm wartet zum Klingeln nie auf das Netz. Löschen kannst du es unter Einstellungen → Konto oder auf wakesharp.app/account/delete.`,
      },
      {
        q: `Was passiert, wenn meine Uhr leer ist?`,
        a: `Dein Telefon klingelt. Die Uhr tippt dich zuerst wach, und WakeSharp verschiebt den Telefonalarm als Absicherung um ein paar Minuten, sodass nur ein Beenden auf der Uhr ihn absagt. Eine leere Uhr, eine außer Reichweite oder eine, die du seit 36 Stunden nicht geöffnet hast, lassen den Telefonalarm genau dort, wo er war.`,
      },
      {
        q: `Was kostet WakeSharp?`,
        a: `Es gibt einen einzigen Plan, WakeSharp Unbegrenzt, und der enthält alles. Wenn du neu abonnierst, kannst du den Jahresplan mit {trialDays} Tagen kostenlos starten, danach kostet er {annual} pro Jahr, oder du wählst den Monatsplan für {monthly} pro Monat, der keine Testphase hat. Die Preise stehen in US-Dollar; App Store und Google Play zeigen den Preis für dein Land. WakeSharp zeigt keine Werbung.`,
      },
      {
        q: `Ich habe den lebenslangen Zugang gekauft. Behalte ich ihn?`,
        a: `Ja. Der lebenslange Zugang war eine einmalige Zahlung und bleibt dir: Nichts verlängert sich, und es gibt nichts zu kündigen. „Käufe wiederherstellen“ holt ihn auf einem neuen Telefon zurück, mit demselben Apple- oder Google-Konto.`,
      },
      {
        q: `Wie kündige ich?`,
        a: `Über den App Store oder Google Play, jederzeit, auch während der kostenlosen Testphase. Die App zu löschen kündigt kein Abo.`,
      },
      {
        q: `Verfolgt mich die App?`,
        a: `WakeSharp zeigt keine Werbung, schaltet aber selbst Werbung an anderer Stelle und misst, welche Anzeige oder welcher Link dich zur App gebracht hat und ob daraus eine Testphase oder ein Abo wurde. Auf dem iPhone fragt die App vorher: Lehnst du ab, wird deine Werbe-ID nie gelesen, und Werbenetzwerke sehen nur zusammengefasste Kampagnenergebnisse. Auf Android gilt, was die Datenschutzerklärung beschreibt. Die Produktanalyse lässt sich in den Einstellungen abschalten, und deine Alarmbezeichnungen und Kalenderdetails werden nie gesendet. Die Datenschutzerklärung listet genau auf, was dein Gerät verlässt.`,
      },
    ],
  },

  /** The "From the blog" block; shown only where this language has the featured posts. */
  fromBlog: {
    heading: { pre: `Aus dem `, accent: `Blog`, post: `` },
    more: `Alle Artikel lesen`,
  },

  cta: {
    heading: { pre: `Morgen früh beginnt `, accent: `heute Abend`, post: `` },
    lede: `Stell einen Alarm. Und sieh, wie sich ein hellwacher Morgen wirklich anfühlt.`,
  },
} satisfies typeof en;
