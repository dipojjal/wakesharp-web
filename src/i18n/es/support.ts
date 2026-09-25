import { support as en } from '../en/support';

/**
 * /support — la URL de soporte de App Store Connect. Claves de enlace usadas:
 * email, terms-safety, privacy, account-delete, apple-subs, google-subs.
 * `{ios}` y `{android}` son las cadenas de requisitos, y `{annual}`,
 * `{monthly}` y `{trialDays}` los precios, todos de src/config/site.ts.
 */
export const support = {
  title: `Soporte de WakeSharp: alarma que no suena, misiones y pagos`,
  description: `Ayuda con WakeSharp: por qué una alarma podría no sonar, cómo funcionan las misiones y la puntuación de Agudeza, y cómo gestionar tu suscripción.`,
  heading: `Soporte`,
  intro: `WakeSharp es un equipo pequeño, y el correo lo responde una persona.`,

  getInTouch: {
    heading: `Ponte en contacto`,
    body: `Escribe a [{email}](email). Suelo responder en **2–3 días hábiles**. Incluir el modelo de tu teléfono, la versión del sistema y la versión de WakeSharp que aparece en Ajustes casi siempre te consigue una respuesta más rápida.`,
  },

  requirements: {
    heading: `Requisitos`,
    body: `WakeSharp necesita {ios} en iPhone, o {android} en Android. Las apps de reloj necesitan watchOS 26 o Wear OS 3.`,
  },

  didntRing: {
    heading: `Mi alarma no sonó`,
    callout: `**Empieza en la app, no aquí.** Abre WakeSharp → Ajustes → _Fiabilidad de la alarma_. Lee el estado real de tu teléfono —permisos, volumen de alarma, No molestar, ajustes de notificaciones, superposición en la pantalla de bloqueo, restricciones de batería— y empieza por un veredicto claro: sonará, puede que no suene o no puede sonar. Cuando el arreglo está a un toque, te ofrece el toque; cuando el teléfono no nos dice algo, lo reconoce en lugar de mostrar una marca verde. También se ejecuta antes de dormir y señala lo peor que encontró.`,
    report: `Si ya se perdió una alarma, WakeSharp muestra esa mañana un informe que nombra la causa cuando puede demostrarla —permiso revocado, volumen de alarma a cero, Silencio total, el teléfono estaba apagado— y dice «No pudimos saber por qué» cuando no puede. Las listas de abajo son para cuando no puede.`,
    iphone: {
      heading: `En iPhone`,
      steps: [
        `**Comprueba que la alarma está activada** en la pantalla de inicio y que sus días de repetición incluyen hoy.`,
        `**Comprueba el permiso de alarmas.** Ajustes → WakeSharp. Si se rechazó el acceso a alarmas, WakeSharp no puede programar nada. Actívalo y vuelve a guardar la alarma.`,
        `**Comprueba el volumen y el interruptor de silencio.** WakeSharp suena a través del modo Silencio y de Concentración, pero no puede sonar en un dispositivo apagado o sin batería.`,
        `**Comprueba el Bluetooth.** Si tu teléfono sigue conectado a unos auriculares o a un coche, puede que la alarma esté sonando ahí.`,
        `**Reinicia el teléfono** y vuelve a guardar la alarma si sigue fallando.`,
      ],
    },
    android: {
      heading: `En Android`,
      steps: [
        `**Comprueba que la alarma está activada** y que sus días de repetición incluyen hoy.`,
        `**Permite las notificaciones.** Ajustes → Aplicaciones → WakeSharp → Notificaciones. La pantalla de la alarma llega como una notificación a pantalla completa; bloquear las notificaciones la suprime.`,
        `**Desactiva la optimización de batería para WakeSharp.** Ajustes → Aplicaciones → WakeSharp → Batería → _Sin restricciones_. Es, con diferencia, la causa más común en dispositivos Samsung, Xiaomi, OPPO, vivo y OnePlus, que son más agresivos que Android puro. En Samsung, comprueba también Ajustes → Batería → Límites de uso en segundo plano y asegúrate de que WakeSharp no está en «Aplicaciones en suspensión» ni en «Aplicaciones en suspensión profunda».`,
        `**Comprueba que No molestar no está en Silencio total.** Los modos Prioridad y Solo alarmas dejan pasar las alarmas; Silencio total las silencia también, y ninguna app puede saltárselo.`,
        `**No uses «Forzar detención» con WakeSharp.** Forzar la detención cancela sus alarmas programadas hasta que vuelvas a abrir la app.`,
        `**Después de un reinicio, abre WakeSharp una vez.** Vuelve a activar tus alarmas al arrancar, pero abrirla garantiza que la sincronización se ejecutó.`,
      ],
    },
    warning: `**Si de verdad importa que te despiertes, pon una segunda alarma en otro dispositivo.** WakeSharp programa las alarmas a través del sistema operativo, y el sistema decide si suenan. Consulta el [aviso de seguridad](terms-safety).`,
    /** Heading over the same-language troubleshooting posts, when there are any. */
    guidesHeading: `Guías más detalladas`,
  },

  ringsThrough: {
    heading: `¿De verdad WakeSharp suena a través de Silencio, Concentración y No molestar?`,
    body: `En circunstancias normales, sí: esa es la razón de ser de la app, y es el mismo mecanismo que usa el reloj integrado de cada plataforma.`,
    items: [
      `**En iPhone**, WakeSharp usa AlarmKit de Apple, que permite sonar a través del modo Silencio y de Concentración **una vez que has concedido el permiso de alarmas**. Si lo rechazas o lo revocas, WakeSharp no puede programar ninguna alarma.`,
      `**En Android**, la alarma se reproduce en el canal de audio dedicado a las alarmas, que suena a través del modo silencio, y a través de No molestar cuando este permite las alarmas (Silencio total bloquea todos los sonidos, incluidas las alarmas), y muestra una alerta a pantalla completa sobre la pantalla de bloqueo, **cuando están concedidos los permisos de alarmas exactas, notificaciones y pantalla de bloqueo**. No hay ningún aviso adicional para el canal de alarmas en sí, pero una notificación bloqueada o una restricción de batería aún pueden detener la alerta.`,
    ],
    limit: `Lo que ninguna de las dos plataformas puede hacer es sonar en un teléfono apagado, sin batería o al que se le han revocado los permisos de la app.`,
  },

  missions: {
    heading: `Misiones y posponer`,
    items: [
      `**La misión** es lo que te gana la mañana, y hay más de una docena: rompecabezas de aritmética y memoria como _Juegos Mentales_ y _Choque de Colores_, una foto de un lugar que elegiste la noche anterior (_Prueba con Foto_), un objeto real al otro lado de la habitación (_Escanear un Objeto_, _Tráelo_), pasos (_Camínalo_), la luz del día en una ventana (_Primera Luz_), escribir una frase (_Escríbelo_) o responder en voz alta (_Restar de Siete_, _Nombra Cinco_). _Sorpréndeme_ elige una distinta cada mañana. Una alarma puede pedir varias misiones seguidas, en el orden que elijas.`,
      `**Mis lugares y códigos** es donde _Escanear un Objeto_ se vuelve personal. Fotografía un lugar hasta el que vas a caminar, como la cafetera o la puerta de entrada, o registra un código QR o de barras que pegues donde la mañana deba mandarte, como el espejo del baño o el bote del café. Una alarma puede entonces pedir ese objetivo concreto. Es una función _dentro_ de la misión de escaneo, no una misión propia, y no se guardan ni la fotografía ni el código: solo una huella de cada uno.`,
      `**Si una misión no puede funcionar** esa mañana —una cámara estropeada, un teléfono sin podómetro—, WakeSharp recurre a otra que sí pueda, para que no te quedes con una alarma que no puedes terminar.`,
      `**Posponer o detener la alarma no completa la mañana.** Da igual cómo silencies la alarma: la mañana solo cuenta cuando la misión está hecha. Los controles de tu propio teléfono siempre funcionan: apagar el teléfono, por ejemplo, nunca se bloquea.`,
    ],
  },

  smartAlarms: {
    heading: `Alarmas inteligentes de calendario`,
    body: `Una regla inteligente suena un número fijado de minutos antes de tu primera reunión, acotado entre una hora más temprana y una más tardía que eliges tú. WakeSharp vuelve a comprobar tu calendario durante la noche, así que si la reunión se mueve, la alarma se mueve. Si rechazas el acceso al calendario, todo lo demás sigue funcionando; simplemente fijas las horas tú. Tus eventos nunca salen de tu dispositivo; consulta la [Política de privacidad](privacy).`,
    limits: `Una rotación de turnos es para patrones que no son semanales —4 de trabajo / 4 libres desde una fecha de anclaje, cada fase con su propia hora— y con un calendario de vista previa para que lo compruebes antes de confiarle tu sueño.`,
  },

  sharpness: {
    heading: `La puntuación de Agudeza`,
    body: `Después de una misión puedes hacer un calentamiento opcional: tres de los cinco juegos de calentamiento cada mañana, en rotación, unos dos minutos en total, y se salta el juego que la misión te acaba de hacer jugar. Tu puntuación se mide contra tu propia referencia móvil, no contra otras personas, así que se asienta alrededor de 100 a medida que la app aprende tu normalidad. Una mala mañana es un bajón respecto a tu yo de ayer, nada más. Es una puntuación dentro de la app, no una prueba clínica ni cognitiva.`,
    physical: `**La puntuación sale del calentamiento.** La misión es lo que te levanta; el calentamiento mental opcional que viene después es lo que produce tu puntuación de Agudeza, así que una larga caminata hasta la cocina nunca cuenta en tu contra.`,
  },

  backup: {
    heading: `Copia de seguridad y cambio a un teléfono nuevo`,
    body: `No hay ninguna cuenta que crear, y nada está bloqueado detrás de una. Opcionalmente puedes iniciar sesión con **Apple** o **Google** —son las únicas opciones, y no hay inicio de sesión con correo y contraseña— con un único propósito: hacer una copia de seguridad de tus alarmas, ajustes, puntuaciones y racha para que vuelvan en un teléfono nuevo.`,
    items: [
      `**Está desactivada por defecto**, y todas las funciones funcionan sin iniciar sesión. La copia de seguridad se ejecuta silenciosamente después de que cambien tus datos, y una alarma nunca espera a la red para sonar.`,
      `**Para pasar a un teléfono nuevo**, instala WakeSharp, inicia sesión con la misma cuenta de Apple o Google y restaura. Los cambios más recientes que ya estén en el dispositivo nuevo se conservan.`,
      `**Cerrar sesión** conserva todo en tu teléfono y simplemente deja de hacer la copia de seguridad.`,
      `**Eliminar la cuenta** —en la app, en _Ajustes → Cuenta → Eliminar cuenta_, o como se describe en [wakesharp.app/account/delete](account-delete)— elimina permanentemente la copia de seguridad y el inicio de sesión, mientras que los datos de tu teléfono se conservan.`,
    ],
    subscription: `La suscripción es independiente de todo esto: vive con tu cuenta de App Store o Google Play, así que Restaurar compras recupera WakeSharp Ilimitado inicies o no sesión alguna vez en WakeSharp.`,
  },

  purchases: {
    heading: `Compras y WakeSharp Ilimitado`,
    items: [
      `**WakeSharp Ilimitado** es la app entera: todas las misiones para despertar, la rotación diaria de calentamiento, tu historial completo de Agudeza, las alarmas inteligentes de calendario, las rotaciones de turnos y los perfiles, y todas las escenas de Lark (la alondra mascota) y todos los fondos. Los nuevos suscriptores pueden empezar con **{trialDays} días de prueba gratis** del plan anual, y después {annual} al año, o elegir el plan mensual a {monthly} al mes, que no tiene prueba. WakeSharp no muestra anuncios.`,
      `**Lifetime** (de por vida) fue una compra única, y sigue siendo válida para todos los que la compraron: nunca se renueva y no hay nada que cancelar.`,
      `**Restaurar una compra:** abre la pantalla de pago y toca _Restaurar_. Asegúrate de haber iniciado sesión con la misma cuenta de Apple o Google con la que compraste.`,
      `**Cancelar:** [suscripciones de App Store](apple-subs) o [suscripciones de Google Play](google-subs), en cualquier momento, incluso durante la prueba gratis. Borrar la app no cancela una suscripción.`,
      `**Los reembolsos** los gestionan Apple o Google, no nosotros; pero escríbeme si algo salió mal y te ayudaré en lo que pueda.`,
    ],
  },

  deleting: {
    heading: `Eliminar tus datos`,
    body: `Todo lo que WakeSharp registra vive en tu teléfono. Desinstalar la app lo borra todo, y no guardamos ninguna copia. Para el registro anónimo de suscripción que conserva nuestro procesador de pagos, consulta [cuánto tiempo se conservan los datos](privacy).`,
  },

  feedback: {
    heading: `Errores, comentarios y peticiones de funciones`,
    body: `Todo es bienvenido en [{email}](email). Para un error, lo más útil que puedes incluir es el modelo de tu teléfono, la versión del sistema, qué esperabas y qué pasó en su lugar. Si una alarma no sonó, la hora a la que estaba puesta y la hora a la que encontraste el teléfono ayudan muchísimo.`,
  },
} satisfies typeof en;
