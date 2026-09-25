import { shell as en } from '../en/shell';

/**
 * Cadenas compartidas por todas las páginas. `{publisher}`, `{year}`, `{email}`
 * y `{date}` los aportan las plantillas desde src/config/site.ts. Las tres
 * cadenas que en inglés se importan de site.ts van aquí como texto literal.
 */
export const shell = {
  siteDescription: `Un despertador para quienes tienen el sueño pesado: lo silencias con cuentas rápidas, una foto de un lugar o unos pasos, y ves lo lúcido que despertaste.`,
  tagline: `Despierta lúcido. No solo despierto.`,
  requirements: { ios: `iOS 26 o posterior`, android: `Android 8.0 o posterior` },
  ogImageAlt: `WakeSharp - despierta lúcido, no solo despierto.`,
  rssTitle: `Blog de WakeSharp`,
  skipLink: `Saltar al contenido`,
  brandHome: `WakeSharp - inicio`,

  nav: {
    aria: `Principal`,
    features: `Funciones`,
    pricing: `Precios`,
    blog: `Blog`,
    contact: `Contacto`,
    faq: `Preguntas`,
    cta: `Descarga WakeSharp`,
  },

  language: {
    label: `Idioma`,
    listAria: `Idioma del sitio`,
  },

  footer: {
    product: `Producto`,
    legal: `Legal`,
    contact: `Contacto`,
    features: `Funciones`,
    sharpnessScore: `Puntuación de Agudeza`,
    pricing: `Precios`,
    blog: `Blog`,
    faq: `Preguntas frecuentes`,
    privacy: `Política de privacidad`,
    terms: `Términos del servicio`,
    support: `Soporte`,
    deleteAccount: `Eliminar tu cuenta`,
    about: `Acerca de`,
    contactForm: `Formulario de contacto`,
    builtBy: `Creado por {publisher}, un pequeño estudio independiente.`,
    pleaseNote: `Importante.`,
    safetyNotice: `WakeSharp no es un dispositivo médico. Los ajustes de tu teléfono, las restricciones de batería o que esté apagado o sin batería pueden impedir que suene cualquier alarma. Usa una segunda alarma independiente para todo aquello a lo que no puedas permitirte llegar tarde.`,
    fullSafetyNotice: `Aviso de seguridad completo`,
    rights: `© {year} {publisher}. Todos los derechos reservados.`,
  },

  /**
   * Se muestra junto a los botones de las tiendas solo en las páginas cuyo idioma
   * la app no incluye (StoreButtons lee SITE.appLanguages); en español no se ve,
   * pero cada catálogo lleva la clave.
   */
  appLanguageNote: `La app de WakeSharp está disponible en inglés, español, ruso, turco, alemán, francés y árabe.`,

  legalLayout: {
    lastUpdated: `Última actualización: {date}`,
    questions: `¿Dudas sobre esta página? Escribe a [{email}](email).`,
  },

  lark: {
    hero: `Mascota de WakeSharp, en pose principal`,
    asleep: `Mascota de WakeSharp, dormida`,
    waking: `Mascota de WakeSharp, despertando`,
    focused: `Mascota de WakeSharp, concentrada`,
    celebrating: `Mascota de WakeSharp, celebrando`,
    encouraging: `Mascota de WakeSharp, animando`,
  },
} satisfies typeof en;
