import { shell as en } from '../en/shell';

/**
 * Cadenas compartidas por todas las páginas. `{publisher}`, `{year}`, `{email}`
 * y `{date}` los aportan las plantillas desde src/config/site.ts. Las tres
 * cadenas que en inglés se importan de site.ts van aquí como texto literal.
 */
export const shell = {
  siteDescription: `La alarma que te deja a punto para la reunión. La mañana se gana con una misión —resolver, fotografiar, escanear o caminar—, un calentamiento mental puntúa lo lúcido que despertaste, y las alarmas inteligentes leen tu calendario para que despiertes antes de tu primera reunión.`,
  tagline: `Despierta lúcido. No solo despierto.`,
  requirements: { ios: `iOS 26 o posterior`, android: `Android 8.0 o posterior` },
  ogImageAlt: `WakeSharp — despierta lúcido, no solo despierto.`,
  rssTitle: `Blog de WakeSharp`,
  skipLink: `Saltar al contenido`,
  brandHome: `WakeSharp — inicio`,

  nav: {
    aria: `Principal`,
    features: `Funciones`,
    sharpness: `Sharpness`,
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
    sharpnessScore: `Sharpness Score`,
    pricing: `Precios`,
    blog: `Blog`,
    faq: `Preguntas frecuentes`,
    privacy: `Política de privacidad`,
    terms: `Términos del servicio`,
    support: `Soporte`,
    deleteAccount: `Eliminar tu cuenta`,
    contactForm: `Formulario de contacto`,
    builtBy: `Creado por {publisher}, un pequeño estudio independiente.`,
    pleaseNote: `Importante.`,
    safetyNotice: `WakeSharp no es un dispositivo médico. Los ajustes de tu teléfono, las restricciones de batería o que esté apagado o sin batería pueden impedir que suene cualquier alarma. Usa una segunda alarma independiente para todo aquello a lo que no puedas permitirte llegar tarde.`,
    fullSafetyNotice: `Aviso de seguridad completo`,
    rights: `© {year} {publisher}. Todos los derechos reservados.`,
  },

  appLanguageNote: `La propia app de WakeSharp está actualmente en inglés.`,

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
