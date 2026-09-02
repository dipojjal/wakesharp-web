import { notFound as en } from '../en/not-found';

/** La página 404. Se prerrenderiza un bloque por idioma habilitado; ver src/pages/404.astro. */
export const notFound = {
  title: `Página no encontrada — WakeSharp`,
  mascotAlt: `Mascota de WakeSharp, dormida`,
  heading: { pre: `Esta página sigue `, accent: `dormida.`, post: `` },
  body: `No encontramos esa página. Lark, la alondra, sugiere volver al principio.`,
  backHome: `Volver a WakeSharp`,
  support: `Obtener soporte`,
} satisfies typeof en;
