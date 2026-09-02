import { blog as en } from '../en/blog';

export const blog = {
  index: {
    title: `Blog — WakeSharp`,
    description: `Ciencia del sueño, rutinas matutinas y novedades del producto, del creador de WakeSharp: la alarma que te deja listo para tu primera reunión.`,
    heading: `El blog de WakeSharp`,
    intro: `Ciencia del sueño, rutinas matutinas y alguna que otra novedad del producto, del creador de la alarma que comprueba si de verdad estás lúcido.`,
    empty: `El primer artículo está en camino: vuelve dentro de poco.`,
  },
  titleSuffix: ` — Blog de WakeSharp`,
  allArticles: `← Todos los artículos`,
  updated: `Actualizado el {date}`,
  minRead: `{minutes} min de lectura`,
  tagsAria: `Etiquetas`,
  related: { aria: `Artículos relacionados`, heading: `Lecturas relacionadas` },
  cta: {
    aria: `Descarga WakeSharp`,
    heading: `Despierta lúcido mañana`,
    body: `Tu alarma suena gratis, para siempre, y sin anuncios. Mind Games, Photo Proof y la comprobación de fiabilidad están incluidos. Poner tu primera alarma lleva unos diez segundos.`,
  },
  categories: {
    'sleep-science': `Ciencia del sueño`,
    'morning-routines': `Rutinas matutinas`,
    productivity: `Productividad`,
    'product-updates': `Novedades del producto`,
    'tips-and-tricks': `Consejos y trucos`,
    company: `Empresa`,
  },
} satisfies typeof en;
