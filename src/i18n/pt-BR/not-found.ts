import { notFound as en } from '../en/not-found';

/** A página 404. Um bloco por idioma ativado é pré-renderizado; veja src/pages/404.astro. */
export const notFound = {
  title: `Página não encontrada — WakeSharp`,
  mascotAlt: `Mascote do WakeSharp, dormindo`,
  heading: { pre: `Esta página ainda está `, accent: `dormindo.`, post: `` },
  body: `Não encontramos essa página. O Lark (a cotovia mascote) sugere voltar ao começo.`,
  backHome: `Voltar para o WakeSharp`,
  support: `Falar com o suporte`,
} satisfies typeof en;
