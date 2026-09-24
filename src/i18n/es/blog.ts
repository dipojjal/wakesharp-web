import { blog as en } from '../en/blog';

export const blog = {
  index: {
    title: `Ciencia del sueño y despertar — Blog de WakeSharp`,
    description: `Guías respaldadas por estudios para despertar a tiempo y despejado: inercia del sueño, posponer, alarmas que fallan, cafeína, melatonina y mañanas mejores.`,
    heading: `El blog de WakeSharp`,
    intro: `Ciencia del sueño, rutinas matutinas y alguna que otra novedad del producto, del creador de la alarma que comprueba si de verdad estás lúcido.`,
    empty: `El primer artículo está en camino: vuelve dentro de poco.`,
  },
  /** Se añade al título de un artículo en la pestaña del navegador, cuando el título completo cabe en 60 caracteres. */
  titleSuffix: ` — WakeSharp`,
  /** La línea bajo el titular de un artículo cuando el fundador lo ha revisado. `{name}` es un enlace a /about. */
  reviewedBy: `Revisado por {name}`,
  allArticles: `← Todos los artículos`,
  updated: `Actualizado el {date}`,
  minRead: `{minutes} min de lectura`,
  tagsAria: `Etiquetas`,
  related: { aria: `Artículos relacionados`, heading: `Lecturas relacionadas` },
  cta: {
    aria: `Descarga WakeSharp`,
    heading: `Despierta lúcido mañana`,
    /** `{trialDays}` y `{annual}` vienen de src/config/site.ts; la prueba nunca aparece sin su precio. */
    body: `Empieza con {trialDays} días de prueba gratis de WakeSharp Ilimitado, y después {annual} al año. Poner tu primera alarma lleva unos diez segundos.`,
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
