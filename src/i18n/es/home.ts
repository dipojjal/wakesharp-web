import { home as en } from '../en/home';

/**
 * La página de inicio. Los encabezados van en {pre, accent, post} porque la
 * palabra destacada es un <span class="accent"> en la plantilla; los espacios
 * van dentro de las cadenas. `{ios}`, `{android}`, `{annual}`, `{monthly}` y
 * `{trialDays}` vienen de src/config/site.ts.
 *
 * Cada afirmación tiene que valer para la versión que un lector descarga hoy y
 * para la siguiente (de la 2.10 a la 2.13, a 24-09-2026); por eso la página
 * describe las misiones por tipo y nunca cuántas veces vuelve a sonar la
 * alarma: ese mecanismo cambia entre esas versiones. La fuente es
 * Docs/marketing-execution/claims-matrix.md del repositorio de la app y la
 * descripción de App Store. Los nombres de funciones son los de la propia app
 * en español.
 */
export const home = {
  title: `WakeSharp - Despertador para quienes tienen el sueño pesado`,

  hero: {
    /** Va dentro del <h1>, encima del eslogan: la búsqueda a la que apunta la página. */
    kicker: `El despertador para quienes tienen el sueño pesado`,
    heading: { pre: `Despierta `, accent: `lúcido.`, post: `No solo despierto.` },
    lede: `Para quienes tienen el sueño pesado y necesitan algo más que un botón de posponer. Deslizar el dedo lo hace cualquiera, hasta medio dormido, así que WakeSharp te pide una misión -resolver, fotografiar, caminar o responder en voz alta- y después puntúa lo lúcido que despertaste en realidad.`,
    phoneAlt: `Pantalla de inicio de WakeSharp de noche, con una alarma a las 6:40 de la mañana y una regla de calendario inteligente`,
  },

  trust: [
    `Suena en iPhone incluso en modo Silencio y Concentración`,
    `Te avisa la noche anterior de lo que podría impedir que suene`,
    `No hace falta una cuenta de WakeSharp`,
    `El procesamiento de la cámara y del calendario ocurre en tu teléfono`,
    `WakeSharp no muestra anuncios`,
  ],

  ring: {
    alt: `La alarma de WakeSharp sonando, con los botones de iniciar misión y posponer`,
    heading: { pre: `Termina la misión para el `, accent: `crédito completo`, post: `` },
    lede: `En iPhone, AlarmKit de Apple presenta una alarma del sistema sobre la pantalla de bloqueo: a través del modo Silencio y de Concentración una vez concedido el acceso a alarmas, incluso si la app se cerró a la fuerza. En Android, una alarma exacta en el canal de audio de alarmas suena a través del modo silencio, y a través de No molestar cuando este permite las alarmas, con Extra Loud (volumen extra alto) y una rampa progresiva que sube poco a poco en lugar de estallar de golpe. Da igual cómo la silencies: la mañana solo cuenta cuando completas la misión.`,
  },

  reliable: {
    heading: { pre: `Sabrás que va a sonar, `, accent: `la noche anterior`, post: `` },
    lede: `La mayoría de las apps de alarma descubren que fallaron en el mismo momento que tú. WakeSharp comprueba lo que de verdad detiene una alarma -permisos, volumen de alarma, ajustes de notificaciones, superposición en la pantalla de bloqueo, restricciones de batería- y empieza por un veredicto, no por una promesa.`,
    items: [
      { title: `Un veredicto, no una lista de comprobación`, body: `Una sola línea arriba del todo: sonará, puede que no suene o no puede sonar.` },
      { title: `Honesta sobre lo que no puede ver`, body: `Cuando el teléfono no nos lo dice, lo reconoce; nunca una marca verde.` },
      { title: `Arreglos de un toque donde existen`, body: `E instrucciones claras donde no.` },
      { title: `«No sonó» tiene respuesta`, body: `La causa demostrable, o la admisión de que no pudimos saberlo.` },
    ],
    note: `Está en Ajustes, y el recordatorio de antes de dormir incluye el peor hallazgo para que lo veas cuando todavía hay tiempo de arreglarlo.`,
  },

  smart: {
    alt: `El editor de reglas de alarma inteligente, configurado para sonar 90 minutos antes de la primera reunión`,
    heading: { pre: `Te despierta antes de tu `, accent: `primera reunión`, post: `` },
    lede: `«Suena 90 minutos antes de mi primera reunión». WakeSharp lee tu calendario en tu propio dispositivo, lo vuelve a comprobar durante la noche y mueve la alarma cuando la reunión se mueve. Solo lectura, opcional y nunca se transmite.`,
    shifts: `Tampoco todas las semanas son semanas. Las rotaciones de turnos se ocupan de los patrones que no son semanales -dos días, dos noches, cuatro libres- con un calendario de vista previa y una forma de saltarte una fecha concreta sin borrar nada. Los perfiles cambian un conjunto entero de alarmas de golpe: trabajo, vacaciones o guardia. Búsqueda, orden y una vista Hoy mantienen la lista a raya cuando hay muchas.`,
    labels: `Ponle nombre a aquello para lo que te levantas -entrenar, el trayecto al trabajo, el desayuno- y la etiqueta se escribe sola.`,
  },

  mission: {
    alt: `La misión Mind Games: resuelve 9 menos 4 para silenciar la alarma`,
    heading: { pre: `Misiones que `, accent: `te sacan de la cama`, post: `` },
    lede: `Algo tiene que pasar antes de que la mañana cuente, y tú eliges qué: aritmética, un rompecabezas, una foto del lugar que elegiste anoche, pasos de verdad o una respuesta dicha en voz alta. Una alarma puede pedir varias seguidas, en el orden que elijas, y si una no puede funcionar esa mañana -una cámara estropeada, un teléfono sin podómetro-, WakeSharp recurre a otra que sí pueda.`,
    /**
     * Todas las misiones que ofrece el editor de alarmas (las entradas de
     * GameCatalog.json con `supportsMission`), agrupadas por lo que te piden.
     * `kind` es la etiqueta pequeña de la esquina de cada tarjeta. Los nombres y
     * las descripciones son los del catálogo de la app en español.
     */
    missions: [
      { name: `Juegos Mentales`, kind: `Mente`, body: `Rondas rápidas de cálculo que hay que acertar.` },
      { name: `Parejas de Memoria`, kind: `Mente`, body: `Voltea las cartas y encuentra cada pareja.` },
      { name: `Recordar Secuencia`, kind: `Mente`, body: `Repite un patrón de toques que crece cada ronda.` },
      { name: `Choque de Colores`, kind: `Mente`, body: `Toca el color de la tinta, no la palabra.` },
      { name: `Escríbelo`, kind: `Mente`, body: `Escribe una frase palabra por palabra, sin autocorrección.` },
      { name: `Prueba con Foto`, kind: `Cámara`, body: `Vuelve a tomar la foto del lugar que elegiste la noche anterior.` },
      { name: `Escanear un Objeto`, kind: `Cámara`, body: `Levántate y apunta la cámara a una botella, una taza o un lavabo.` },
      { name: `Tráelo`, kind: `Cámara`, body: `Busca algo azul, o algo de lo que bebas.` },
      { name: `Control facial`, kind: `Cámara`, body: `Abre los ojos ante la cámara y sigue la indicación.` },
      { name: `Corta la fruta`, kind: `Cámara`, body: `Corta la fruta en el aire con el dedo.` },
      { name: `Camínalo`, kind: `Movimiento`, body: `Da pasos de verdad, contados por tu teléfono.` },
      { name: `Primera Luz`, kind: `Movimiento`, body: `Ve a una ventana y sostén el teléfono a la luz.` },
      { name: `Restar de Siete`, kind: `Voz`, body: `Cuenta hacia atrás de siete en siete, en voz alta.` },
      { name: `Nombra Cinco`, kind: `Voz`, body: `Nombra en voz alta cinco cosas de una categoría.` },
      { name: `Sorpréndeme`, kind: `Cualquiera`, body: `Una misión distinta cada mañana.` },
    ],
    note: `Las misiones forman parte de la alarma que creas, así que el trato se cierra la noche anterior, no se negocia a las 6 de la mañana.`,
  },

  games: {
    alt: `El juego de calentamiento Memory Match`,
    heading: { pre: `Un `, accent: `calentamiento`, post: ` de dos minutos mientras se hace el café` },
    lede: `Juegos Mentales, Parejas de Memoria, Recordar Secuencia, Carrera de Palabras y Toque de Reacción. Cada mañana se juegan tres, en rotación, así que el conjunto completo pasa en menos de una semana, y el calentamiento nunca repite lo que la misión acaba de pedirte. Nada de esto es obligatorio; para entonces la alarma ya está apagada.`,
  },

  sharp: {
    alt: `La revelación diaria del Sharpness Score`,
    heading: { pre: `Sabrás lo `, accent: `lúcido`, post: ` que despertaste` },
    lede: `Un número sobre 100 que sale del calentamiento -tu puntuación de Agudeza-, medido contra tu propia referencia móvil, no contra desconocidos. Es una puntuación dentro de la app, no una prueba clínica, y tu yo de ayer es la única referencia que significa algo a las 6 de la mañana.`,
  },

  stats: {
    alt: `El gráfico de tendencia de Sharpness con un contador de racha`,
    heading: { pre: `Mira cómo te vuelves `, accent: `más lúcido`, post: `` },
    lede: `Una racha, una línea de tendencia y comodines de congelación para las mañanas en que la vida se interpone. Los hitos llegan a los 7, 30, 100 y 365 días, y tu historial completo de Agudeza llega hasta tu primera mañana con la app.`,
  },

  together: {
    heading: { pre: `Trae a `, accent: `alguien contigo`, post: `` },
    lede: `Comparte un enlace y el teléfono que lo abre configura la misma alarma y luego la hace sonar por su cuenta. Nada a lo que unirse, nada en lo que registrarse y ningún servidor de por medio.`,
    cards: [
      { title: `Despertar con un amigo`, body: `Tú envías un enlace; su teléfono crea la alarma en local. Cada uno conserva su propia copia, así que cambiar la tuya no toca la suya.` },
      { title: `Beat my wake`, body: `Supera mi despertar: termina una misión y podrás retar a alguien al mismo conjunto de problemas -misma semilla, mismas rondas, misma dificultad. Así se sabe cuál de los dos estaba despierto de verdad.` },
    ],
    note: `Las dos cosas son solo enlaces: el teléfono que recibe uno hace todo el trabajo por sí mismo.`,
  },

  platforms: {
    heading: { pre: `La misma app. `, accent: `Los dos teléfonos.`, post: `` },
    lede: `Construida de forma nativa dos veces: SwiftUI en iOS, Kotlin y Compose en Android. No es un envoltorio, y esa es la única razón por la que cada lado puede hacer lo que solo él puede hacer. Requiere {ios} o {android}.`,
    watch: `También hay app de reloj para las dos muñecas: watchOS 26 o Wear OS 3. Te despierta con un toque antes de que la habitación oiga nada, y la alarma del teléfono se desplaza unos minutos más tarde como respaldo. Solo descartarla desde el reloj la cancela: un reloj sin batería, fuera de alcance o que no has abierto en 36 horas dejan la alarma del teléfono exactamente donde estaba. También hay una complicación para la esfera del reloj.`,
    account: `No hay ninguna cuenta que crear, pero puedes iniciar sesión con Apple o Google si quieres una sola cosa de ella: una copia de seguridad, para que tus alarmas, ajustes, puntuaciones y racha vuelvan en un teléfono nuevo. Está desactivada por defecto, todo funciona sin iniciar sesión y nada a las 6 de la mañana espera nunca a la red.`,
  },

  /** La galería de capturas de las tiendas (src/components/StoreGallery.astro). */
  gallery: {
    tablistAria: `Elige una plataforma`,
    rails: {
      ios: { label: `iPhone`, store: `App Store` },
      android: { label: `Android`, store: `Google Play` },
    },
    railHeading: `{label}: tal como aparece en {store}`,
    altTemplate: `WakeSharp en {label}: {caption}`,
    fallbackCaption: `captura de pantalla de la app`,
    /**
     * Número de fotograma → qué muestra, con su titular impreso (en inglés)
     * incluido. Los fotogramas 04 y 07 no se muestran (StoreGallery.astro)
     * porque su arte todavía imprime los precios retirados en la 2.10, así que no
     * tienen pie hasta que el repositorio de la app los vuelva a generar.
     */
    captions: {
      '01': `Pantalla de inicio con la próxima alarma y una regla de calendario inteligente, con el titular «Wake up sharp. Not just awake.» (Despierta lúcido. No solo despierto.)`,
      '02': `La alarma sonando sobre la pantalla de bloqueo, con el titular «Complete a mission for full credit» (Completa una misión para el crédito completo)`,
      '03': `La misión Mind Games que silencia la alarma, con el titular «Solve to silence» (Resuelve para silenciar)`,
      '05': `La revelación diaria del Sharpness Score, medido contra tu propia referencia`,
      '06': `El editor de reglas de alarma inteligente, con el titular «Wakes you before your first meeting» (Te despierta antes de tu primera reunión)`,
    },
  },

  yours: {
    heading: { pre: `Haz `, accent: `tuya`, post: ` la mañana` },
    lede: `La alarma que de verdad quieres oír, detrás de la imagen que de verdad quieres ver.`,
    cards: [
      { title: `Tonos para cada dormilón`, body: `De Dawn (amanecer) a Smoke Alarm (detector de humo), y cada uno de ellos incluye también una versión más suave.` },
      { title: `Fondos y escenas`, body: `Todos los fondos de alarma y todas las escenas de Lark (la alondra mascota) están incluidos, y cada escena trae su propia celebración.` },
      { title: `Claro, oscuro o ninguno`, body: `Elige un aspecto o deja que siga al dispositivo; en cualquier caso, la paleta cambia con la hora.` },
      { title: `Un aterrizaje más suave`, body: `Inicio suave en iPhone abre el tono bajito y sube hasta el volumen completo a los 25 segundos aproximadamente. En Android, un amanecer ilumina la pantalla y sube el volumen antes de la alarma.` },
    ],
  },

  pricing: {
    heading: { pre: `Un plan, `, accent: `todo incluido`, post: `` },
    lede: `WakeSharp Ilimitado es la app entera: todas las misiones para despertar, el calentamiento diario, las alarmas inteligentes de calendario, las rotaciones de turnos y los perfiles, tu historial completo de Agudeza, y todas las escenas de Lark y todos los fondos. WakeSharp no muestra anuncios.`,
    unlimited: {
      name: `WakeSharp Ilimitado`,
      perYear: `/año`,
      /** La prueba y el precio que la sigue van siempre juntos. */
      trial: `Empieza con **{trialDays} días de prueba gratis**, y después {annual} al año`,
      monthly: `o **{monthly} al mes**, sin prueba`,
      features: [
        `Todas las misiones para despertar, y varias seguidas si quieres`,
        `Tres juegos de calentamiento cada mañana, en rotación`,
        `Tu historial completo de Agudeza`,
        `Alarmas inteligentes de calendario que pueden moverse cuando se mueve tu primera reunión`,
        `Rotaciones de turnos, perfiles y todas las alarmas que necesites`,
        `La comprobación de fiabilidad y todos los tonos de alarma`,
        `Todas las escenas de Lark, los fondos de alarma y las celebraciones`,
        `Despertar con un amigo, y la app de reloj para las dos muñecas`,
        `Sin anuncios`,
      ],
    },
    billing: `Los planes anual y mensual los cobra Apple o Google y se renuevan hasta que los canceles; puedes cancelarlos en cualquier momento desde tu cuenta de la tienda, y ten en cuenta que borrar la app no cancela una suscripción. La prueba gratis es para nuevos suscriptores que cumplan los requisitos. Consulta los [Términos](terms).`,
    /** Solo en las páginas localizadas: las tiendas localizan los precios en tiempo de ejecución. */
    usdNote: `Los precios se muestran en dólares estadounidenses; App Store y Google Play muestran el precio para tu país.`,
  },

  faq: {
    heading: { pre: `Preguntas, `, accent: `con respuesta`, post: `` },
    /** Las respuestas pueden usar {annual}, {monthly} y {trialDays}; los precios nunca aparecen en un catálogo. */
    items: [
      {
        q: `¿De verdad suena en Silencio, Concentración o No molestar?`,
        a: `El comportamiento depende de la plataforma, y depende de los permisos. En iPhone, WakeSharp usa AlarmKit de Apple, que permite sonar a través del modo Silencio y de Concentración una vez que has concedido el acceso a alarmas; si lo rechazas o lo revocas, WakeSharp no puede programar absolutamente nada. En Android usa el canal dedicado a las alarmas, que suena a través del modo silencio, y a través de No molestar cuando este permite las alarmas -Silencio total bloquea todos los sonidos, incluidas las alarmas-, y muestra una alerta a pantalla completa sobre la pantalla de bloqueo, siempre que estén concedidos los permisos de alarmas exactas, notificaciones y pantalla de bloqueo. Lo que ninguna app puede hacer es sonar en un teléfono apagado o sin batería, así que para cualquier cosa que de verdad no puedas perderte, pon una segunda alarma en otro dispositivo.`,
      },
      {
        q: `¿Cómo compruebo que mi alarma va a sonar de verdad?`,
        a: `Abre Ajustes → Fiabilidad de la alarma. WakeSharp lee las condiciones de tu teléfono que pueden detener una alarma -permisos, volumen de alarma, ajustes de notificaciones, superposición en la pantalla de bloqueo, restricciones de batería- y empieza por un veredicto claro en lugar de una promesa. Cuando la plataforma no nos dice algo, lo reconoce en vez de mostrar una marca verde, porque una lista que convierte en silencio las incógnitas en aprobados es peor que ninguna lista. Si alguna vez una alarma falla, la app puede decirte después la causa demostrable, o admitir que no pudo averiguarla.`,
      },
      {
        q: `¿Tengo que hacer cuentas a las 6 de la mañana?`,
        a: `Solo si quieres. Hay misiones de varios tipos: aritmética y rompecabezas, una foto de un lugar que elegiste la noche anterior, escanear un objeto real al otro lado de la habitación, caminar o ir hasta una ventana, escribir una frase o responder en voz alta. Elige las que más te convengan, y una alarma puede pedir más de una. Sorpréndeme elige una distinta cada mañana, así que no hay nada que preparar la noche anterior.`,
      },
      {
        q: `¿Puedo hacer trampa y saltarme la misión?`,
        a: `Los controles de tu propio teléfono siempre funcionan: puedes apagarlo, y ninguna app debería poder impedirlo. Dentro de WakeSharp, eso sí, detener o posponer la alarma no completa la mañana: solo cuenta cuando la misión está hecha.`,
      },
      {
        q: `¿Qué hace la cámara?`,
        a: `Solo la usan las misiones que la necesitan -entre ellas Prueba con Foto, Escanear un Objeto, Tráelo, Control facial y Corta la fruta-, y solo mientras una de ellas está en marcha o mientras la configuras. El reconocimiento de objetos y la comparación de fotos ocurren en tu dispositivo. Si rechazas el permiso, todas las misiones que no necesitan la cámara siguen funcionando. La política de privacidad explica exactamente qué sale de tu teléfono, si es que sale algo, y cuándo.`,
      },
      {
        q: `¿WakeSharp registra mi sueño?`,
        a: `No. No hay ningún tipo de seguimiento del sueño: ni micrófono escuchando por la noche, ni fases del sueño, ni puntuación de tu noche, ni opinión sobre cuándo te dormiste. El podómetro se lee durante la misión de caminar y en ningún otro momento. WakeSharp mide lo lúcido que estás una vez que te has levantado, y nada antes de eso. Las únicas cosas con forma de sueño que tiene son una hora de acostarte que planificas tú y sonidos opcionales para relajarte antes de dormir.`,
      },
      {
        q: `¿Qué lee exactamente de mi calendario?`,
        a: `Tus próximos eventos, en solo lectura, enteramente en tu dispositivo, con un único fin: calcular a qué hora despertarte. No se transmite nada a ningún sitio. Es opcional, y todas las demás funciones funcionan si lo rechazas.`,
      },
      {
        q: `¿Necesito una cuenta?`,
        a: `No hace falta una cuenta de WakeSharp: no hay correo ni contraseña en ninguna parte de la app. Opcionalmente puedes iniciar sesión con Apple o Google con un único propósito: hacer una copia de seguridad de tus alarmas, ajustes, puntuaciones y racha para que vuelvan en un teléfono nuevo. Está desactivado por defecto, todas las funciones funcionan sin iniciar sesión y una alarma nunca espera a la red para sonar. Elimínala desde Ajustes → Cuenta, o en wakesharp.app/account/delete.`,
      },
      {
        q: `¿Qué pasa si mi reloj está sin batería?`,
        a: `Tu teléfono suena. El reloj te despierta primero con un toque y WakeSharp desplaza la alarma del teléfono unos minutos más tarde como respaldo, así que solo descartarla en el reloj la cancela. Un reloj sin batería, fuera de alcance o que no has abierto en 36 horas dejan la alarma del teléfono exactamente donde estaba.`,
      },
      {
        q: `¿Cuánto cuesta WakeSharp?`,
        a: `Hay un solo plan, WakeSharp Ilimitado, y lo incluye todo. Los nuevos suscriptores pueden empezar con {trialDays} días de prueba gratis del plan anual, y después {annual} al año, o elegir el plan mensual a {monthly} al mes, que no tiene prueba. Los precios están en dólares estadounidenses; App Store y Google Play muestran el precio para tu país. WakeSharp no muestra anuncios.`,
      },
      {
        q: `Compré Lifetime (de por vida). ¿Lo conservo?`,
        a: `Sí. Lifetime fue un pago único y sigue siendo tuyo: nada se renueva y no hay nada que cancelar. Restaurar compras lo recupera en un teléfono nuevo, con la misma cuenta de Apple o Google.`,
      },
      {
        q: `¿Cómo cancelo?`,
        a: `A través de App Store o Google Play, en cualquier momento, incluso durante la prueba gratis. Borrar la app no cancela una suscripción.`,
      },
      {
        q: `¿Me rastrea?`,
        a: `WakeSharp no muestra anuncios, pero sí compra anuncios en otros sitios, y mide qué anuncio o enlace te trajo a la app y si eso terminó en una prueba o en una suscripción. En iPhone te lo pregunta primero: si te niegas, tu identificador de publicidad nunca se lee y las redes publicitarias solo ven resultados agregados de las campañas. En Android funciona como describe la política de privacidad. Las analíticas del producto se pueden desactivar en Ajustes, y las etiquetas de tus alarmas y los detalles de tu calendario nunca se envían. La política de privacidad enumera exactamente qué sale de tu dispositivo.`,
      },
    ],
  },

  /** The "From the blog" block; shown only where this language has the featured posts. */
  fromBlog: {
    heading: { pre: `Del `, accent: `blog`, post: `` },
    more: `Ver todos los artículos`,
  },

  cta: {
    heading: { pre: `Mañana empieza `, accent: `esta noche`, post: `` },
    lede: `Pon una alarma. Descubre cómo se siente de verdad una mañana lúcida.`,
  },
} satisfies typeof en;
