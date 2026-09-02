import { notFound as en } from '../en/not-found';

/** The 404 page in Turkish. */
export const notFound = {
  title: `Sayfa bulunamadı — WakeSharp`,
  mascotAlt: `WakeSharp maskotu, uykuda`,
  heading: { pre: `Bu sayfa hâlâ `, accent: `uyuyor.`, post: `` },
  body: `Onu bulamadık. Lark (maskot kuşumuz) başa dönmenizi öneriyor.`,
  backHome: `WakeSharp’a dön`,
  support: `Destek alın`,
} satisfies typeof en;
