import { notFound as en } from '../en/not-found';

/** Страница 404. */
export const notFound = {
  title: `Страница не найдена — WakeSharp`,
  mascotAlt: `Талисман WakeSharp спит`,
  heading: { pre: `Эта страница ещё `, accent: `спит.`, post: `` },
  body: `Такую страницу мы не нашли. Ларк (the Lark) советует вернуться к началу.`,
  backHome: `На главную WakeSharp`,
  support: `Получить помощь`,
} satisfies typeof en;
