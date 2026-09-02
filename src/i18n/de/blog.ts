import { blog as en } from '../en/blog';

/**
 * Die Blog-Hülle: die Übersichtsseite, der Rahmen eines Artikels und die Karte
 * am Ende. Die Artikeltexte liegen als Markdown unter
 * src/content/blog/<Sprachpfad>/, nicht hier. `{date}` und `{minutes}` liefern
 * die Layouts.
 */
export const blog = {
  index: {
    title: `Blog — WakeSharp`,
    description: `Schlafforschung, Morgenroutinen und Produktneuigkeiten vom Macher von WakeSharp — dem Wecker, der dich meetingfit macht.`,
    heading: `Der WakeSharp Blog`,
    intro: `Schlafforschung, Morgenroutinen und ab und zu ein Produkt-Update — vom Macher des Weckers, der prüft, ob du wirklich hellwach bist.`,
    empty: `Der erste Artikel ist unterwegs — schau bald wieder vorbei.`,
  },
  /** Wird im Browser-Tab an den Titel eines Artikels angehängt. */
  titleSuffix: ` — WakeSharp Blog`,
  /** Trägt den eigenen Pfeil, damit eine Sprache von rechts nach links ihn andersherum zeigen kann. */
  allArticles: `← Alle Artikel`,
  updated: `Aktualisiert am {date}`,
  minRead: `{minutes} Min. Lesezeit`,
  tagsAria: `Tags`,
  related: { aria: `Verwandte Artikel`, heading: `Passend dazu` },
  cta: {
    aria: `WakeSharp laden`,
    heading: `Morgen hellwach aufwachen`,
    body: `Dein Alarm klingelt kostenlos, für immer, ohne Werbung. Mind Games (Kopfrechnen), Photo Proof (Fotobeweis) und die Zuverlässigkeitsprüfung sind dabei. Deinen ersten Alarm stellst du in etwa zehn Sekunden.`,
  },
  /** Ein Label je Kategorie aus src/lib/blog-categories.ts; eine neue Kategorie braucht eins in jeder Sprache. */
  categories: {
    'sleep-science': `Schlafforschung`,
    'morning-routines': `Morgenroutinen`,
    productivity: `Produktivität`,
    'product-updates': `Produkt-Updates`,
    'tips-and-tricks': `Tipps und Tricks`,
    company: `Unternehmen`,
  },
} satisfies typeof en;
