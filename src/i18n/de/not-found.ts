import { notFound as en } from '../en/not-found';

/** Die 404-Seite. Ein Block je aktivierter Sprache wird vorgerendert; siehe src/pages/404.astro. */
export const notFound = {
  title: `Seite nicht gefunden — WakeSharp`,
  mascotAlt: `WakeSharp-Maskottchen, schlafend`,
  heading: { pre: `Diese Seite `, accent: `schläft`, post: ` noch.` },
  body: `Wir konnten sie nicht finden. Der Lark (das Maskottchen, eine Lerche) schlägt vor, zurück zum Anfang zu gehen.`,
  backHome: `Zurück zu WakeSharp`,
  support: `Zum Support`,
} satisfies typeof en;
