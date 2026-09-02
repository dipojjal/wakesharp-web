import { contact as en } from '../en/contact';

/**
 * El formulario de contacto y sus dos páginas de resultado. El `<select>`
 * conserva los atributos `value=` en inglés en todos los idiomas
 * (src/templates/ContactPage.astro); solo se traducen las etiquetas visibles.
 */
export const contact = {
  form: {
    title: `Contacto — WakeSharp`,
    description: `Escribe directamente al desarrollador de WakeSharp: informes de errores, problemas con alarmas, dudas sobre suscripciones y peticiones de funciones.`,
    heading: `Contacto`,
    intro: `WakeSharp es un equipo pequeño, y una persona lee todo lo que llega aquí.`,
    callout: `Suelo responder en **2–3 días hábiles**. Si prefieres usar tu propio cliente de correo, escribe a [{email}](email): llega a la misma bandeja de entrada.`,
    nameLabel: `Tu nombre`,
    emailLabel: `Tu correo`,
    emailHint: `Para poder responderte. No se usa para nada más.`,
    topicLabel: `¿De qué se trata?`,
    topicPlaceholder: `Elige una opción…`,
    topics: {
      alarm: `Una alarma no sonó`,
      bug: `Informe de error`,
      billing: `Suscripción o facturación`,
      feature: `Petición de función`,
      other: `Otra cosa`,
    },
    deviceLabel: `Teléfono y versión del sistema`,
    deviceHint: `— opcional, pero responde a la mitad de mis preguntas de seguimiento`,
    devicePlaceholder: `p. ej. Pixel 9, Android 16`,
    messageLabel: `Mensaje`,
    messageHint: `Para un error, lo más útil que puedes contarme es qué esperabas y qué pasó en su lugar. Si una alarma falló, la hora a la que estaba puesta y la hora a la que encontraste el teléfono ayudan muchísimo.`,
    honeypotLabel: `Empresa`,
    submit: `Enviar mensaje`,
    privacyNote: `Tu mensaje y tu dirección de correo me llegan por correo electrónico y no se almacenan en ningún otro sitio. Consulta la [Política de privacidad](privacy).`,
  },
  sent: {
    title: `Mensaje enviado — WakeSharp`,
    description: `Tu mensaje a WakeSharp se ha enviado.`,
    heading: `Mensaje enviado`,
    intro: `Gracias; va de camino a mi bandeja de entrada.`,
    body: `Suelo responder en **2–3 días hábiles**, desde [{email}](email). Si no recibes nada, revisa la carpeta de spam antes de dar por hecho que se perdió.`,
    meanwhile: `Mientras esperas, la [página de soporte](support) cubre las preguntas más habituales, incluida la lista completa de comprobaciones para una alarma que no sonó.`,
    backHome: `Volver a la página de inicio`,
  },
  error: {
    title: `Mensaje no enviado — WakeSharp`,
    description: `El formulario de contacto de WakeSharp no pudo entregar tu mensaje.`,
    heading: `Eso no llegó`,
    intro: `Tu mensaje no se entregó, y prefiero decírtelo antes que fingir lo contrario.`,
    callout: `Por favor, escribe directamente a [{email}](email). Nada de lo que escribiste se guardó, así que tendrás que volver a escribirlo; lo siento.`,
    body: `También acabarás aquí si un campo obligatorio llegó vacío, la dirección de correo no era válida o el mensaje superó el límite de 4000 caracteres que permite el formulario.`,
    backToForm: `Volver al formulario`,
    support: `Soporte`,
    homepage: `Página de inicio`,
  },
} satisfies typeof en;
