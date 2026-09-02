import { notFound as en } from '../en/not-found';

/** Сторінка 404. Один блок на кожну ввімкнену локаль рендериться заздалегідь; див. src/pages/404.astro. */
export const notFound = {
  title: `Сторінку не знайдено — WakeSharp`,
  mascotAlt: `Талісман WakeSharp спить`,
  heading: { pre: `Ця сторінка ще `, accent: `спить.`, post: `` },
  body: `Ми не змогли її знайти. Ларк (the Lark) радить повернутися на початок.`,
  backHome: `Назад до WakeSharp`,
  support: `Отримати підтримку`,
} satisfies typeof en;
