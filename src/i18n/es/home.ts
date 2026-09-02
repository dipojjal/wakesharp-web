import { home as en } from '../en/home';

/**
 * La página de inicio. Los encabezados van en {pre, accent, post} porque la
 * palabra destacada es un <span class="accent"> en la plantilla; los espacios
 * van dentro de las cadenas. `{ios}`, `{android}`, `{annual}`, `{lifetime}` y
 * `{trialDays}` vienen de src/config/site.ts.
 */
export const home = {
  title: `WakeSharp — Despierta lúcido. No solo despierto.`,

  hero: {
    heading: { pre: `Despierta `, accent: `lúcido.`, post: `No solo despierto.` },
    lede: `Deslizar el dedo lo hace cualquiera, hasta medio dormido. WakeSharp, en cambio, te pide una misión —resolver, fotografiar, escanear o caminar— y después puntúa lo lúcido que despertaste en realidad.`,
    phoneAlt: `Pantalla de inicio de WakeSharp de noche, con una alarma a las 6:40 de la mañana y una regla de calendario inteligente`,
  },

  trust: [
    `Suena en iPhone incluso en modo Silencio y Concentración`,
    `Te avisa la noche anterior de lo que podría impedir que suene`,
    `Sin registro y sin anuncios`,
    `Tu calendario y tu cámara nunca salen de tu teléfono`,
    `Tu alarma suena gratis, para siempre`,
  ],

  ring: {
    alt: `La alarma de WakeSharp sonando, con los botones de iniciar misión y posponer`,
    heading: { pre: `Termina la misión para el `, accent: `crédito completo`, post: `` },
    lede: `En iPhone, AlarmKit de Apple presenta una alarma del sistema sobre la pantalla de bloqueo: a través del modo Silencio y de Concentración una vez concedido el acceso a alarmas, incluso si la app se cerró a la fuerza. En Android, una alarma exacta en el canal de audio de alarmas, que No molestar no silencia, con Extra Loud (volumen extra alto) y una rampa progresiva que sube poco a poco en lugar de estallar de golpe. El botón de detener del propio sistema siempre funciona; la misión es lo que se gana la mañana.`,
  },

  reliable: {
    heading: { pre: `Sabrás que va a sonar, `, accent: `la noche anterior`, post: `` },
    lede: `La mayoría de las apps de alarma descubren que fallaron en el mismo momento que tú. WakeSharp comprueba lo que de verdad detiene una alarma —permisos, volumen de alarma, ajustes de notificaciones, superposición en la pantalla de bloqueo, restricciones de batería— y empieza por un veredicto, no por una promesa.`,
    items: [
      { title: `Un veredicto, no una lista de comprobación`, body: `Una sola línea arriba del todo: sonará, puede que no suene o no puede sonar.` },
      { title: `Honesta sobre lo que no puede ver`, body: `Cuando el teléfono no nos lo dice, lo reconoce; nunca una marca verde.` },
      { title: `Arreglos de un toque donde existen`, body: `E instrucciones claras donde no.` },
      { title: `«No sonó» tiene respuesta`, body: `La causa demostrable, o la admisión de que no pudimos saberlo.` },
    ],
    note: `Es gratis, está en Ajustes, y el recordatorio de antes de dormir incluye el peor hallazgo para que lo veas cuando todavía hay tiempo de arreglarlo.`,
  },

  smart: {
    alt: `El editor de reglas de alarma inteligente, configurado para sonar 90 minutos antes de la primera reunión`,
    heading: { pre: `Te despierta antes de tu `, accent: `primera reunión`, post: `` },
    lede: `«Suena 90 minutos antes de mi primera reunión». WakeSharp lee tu calendario en tu propio dispositivo, lo vuelve a comprobar durante la noche y mueve la alarma cuando la reunión se mueve. Solo lectura, opcional y nunca se transmite.`,
    shifts: `Tampoco todas las semanas son semanas. Las rotaciones de turnos se ocupan de los patrones que no son semanales —dos días, dos noches, cuatro libres— con un calendario de vista previa y una forma de saltarte una fecha concreta sin borrar nada. Los perfiles cambian un conjunto entero de alarmas de golpe: trabajo, vacaciones o guardia. Búsqueda, orden y una vista Hoy mantienen la lista a raya cuando hay muchas.`,
    labels: `Ponle nombre a aquello para lo que te levantas —entrenar, el trayecto al trabajo, el desayuno— y la etiqueta se escribe sola. Una regla inteligente, una rotación y un perfil son gratis; Plus quita el límite a los tres.`,
  },

  mission: {
    alt: `La misión Mind Games: resuelve 6 menos 3 para silenciar la alarma`,
    heading: { pre: `Cinco formas de `, accent: `sacarte de la cama`, post: `` },
    lede: `Algo tiene que pasar antes de que la mañana cuente, y tú eliges qué. Mind Games (aritmética) y Photo Proof (prueba con foto) son gratis; el resto viene con Plus. Todas tienen una salida que termina en Mind Games con el crédito completo, así que una cámara muerta o un teléfono sin podómetro nunca te dejan atascado.`,
    /** Las cinco misiones del editor de alarmas, en su orden. `tier` es Gratis o Plus. */
    missions: [
      { name: `Mind Games`, tier: `Gratis`, body: `Tres problemas de aritmética en nivel fácil, estándar o difícil. La misión a la que recurren todas las demás.` },
      { name: `Photo Proof`, tier: `Gratis`, body: `Fotografía el cielo, tu cama hecha, un vaso de agua. Seis consignas en rotación diaria, así que no hay nada que preparar la noche anterior.` },
      { name: `Scan an Object`, tier: `Plus`, body: `Escanea un objeto: apunta con la cámara a algo al otro lado de la habitación. Veinte objetos cotidianos en el catálogo, reconocidos en el propio teléfono.` },
      { name: `Walk It Off`, tier: `Plus`, body: `Camina para despejarte: sal de la cama y da los pasos. Lee el podómetro y vigila tu cadencia, así que agitar el teléfono no cuenta para nada.` },
      { name: `Surprise me`, tier: `Plus`, body: `Sorpréndeme: sortea entre Mind Games, un escaneo o una caminata, fijado para esa alarma ese día, así que lo descubres cuando suena.` },
    ],
    note: `La misión se elige cuando creas la alarma, nunca cuando suena: una alarma que ya lleva un escaneo o una caminata lo sigue ejecutando pase lo que pase con la suscripción. Strict Mode (modo estricto), en dispositivos compatibles, reserva por adelantado cuatro repeticiones de la alarma, y posponer es una política que fijas tú, no una regla que te imponen.`,
  },

  games: {
    alt: `El juego de calentamiento Memory Match`,
    heading: { pre: `Un `, accent: `calentamiento`, post: ` de dos minutos mientras se hace el café` },
    lede: `Math Sprint, Memory Match, Sequence Recall, Word Dash y Reaction Tap: cálculo rápido, memoria, secuencias, palabras y reflejos. En el plan Gratis juegas uno después de tu misión, sacado de un grupo de dos. Con Plus juegas tres cada mañana y van rotando, así que el conjunto completo pasa en menos de una semana, y nunca repite lo que la misión te acaba de hacer. Nada de esto es obligatorio; para entonces la alarma ya está apagada.`,
  },

  sharp: {
    alt: `La revelación diaria del Sharpness Score`,
    heading: { pre: `Sabrás lo `, accent: `lúcido`, post: ` que despertaste` },
    lede: `Un número sobre 100 —tu Sharpness Score (puntuación de lucidez)—, medido contra tu propia referencia móvil, no contra desconocidos. Las misiones físicas quedan fuera: un escaneo, una caminata y una foto solo se comparan consigo mismos, porque cruzar la habitación no es una puntuación de aritmética. Tu yo de ayer es la única referencia que significa algo a las 6 de la mañana.`,
  },

  stats: {
    alt: `El gráfico de tendencia de Sharpness con un contador de racha`,
    heading: { pre: `Mira cómo te vuelves `, accent: `más lúcido`, post: `` },
    lede: `Una racha, una línea de tendencia y un comodín para congelar la racha cada siete mañanas; puedes guardar dos, así que la vida tiene permiso para ocurrir dos veces. Los hitos llegan a los 7, 30, 100 y 365 días. Si te saltas una mañana del todo, una misión de recuperación mantiene viva la cadena a medio crédito. Siete días de historial gratis; con Plus, todo lo que hayas registrado alguna vez, por muy atrás que llegue.`,
  },

  together: {
    heading: { pre: `Trae a `, accent: `alguien contigo`, post: `` },
    lede: `Comparte un enlace y el teléfono que lo abre configura la misma alarma y luego la hace sonar por su cuenta. Nada a lo que unirse, nada en lo que registrarse y ningún servidor de por medio.`,
    cards: [
      { title: `Despierta con un amigo`, body: `Tú envías un enlace; su teléfono crea la alarma en local. Cada uno conserva su propia copia, así que cambiar la tuya no toca la suya.` },
      { title: `Supera mi despertar`, body: `Termina una misión y podrás retar a alguien al mismo conjunto de problemas: misma semilla, mismas rondas, misma dificultad. Así se sabe cuál de los dos estaba despierto de verdad.` },
    ],
    note: `Las dos cosas son gratis, y las dos son solo enlaces: el teléfono que recibe uno hace todo el trabajo por sí mismo.`,
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
    railHeading: `{label} — tal como aparece en {store}`,
    altTemplate: `WakeSharp en {label}: {caption}`,
    fallbackCaption: `captura de pantalla de la app`,
    /** Número de fotograma → qué muestra, con su titular impreso (en inglés) incluido. */
    captions: {
      '01': `Pantalla de inicio con la próxima alarma y una regla de calendario inteligente, con el titular «Wake up sharp. Not just awake.» (Despierta lúcido. No solo despierto.)`,
      '02': `La alarma sonando sobre la pantalla de bloqueo, con el titular «Complete a mission for full credit» (Completa una misión para el crédito completo)`,
      '03': `La misión Mind Games que silencia la alarma, con el titular «Solve to silence» (Resuelve para silenciar)`,
      '04': `Los juegos de calentamiento, con el titular «5 brain games. 3 every morning.» (5 juegos mentales. 3 cada mañana.) y la nota de que la rotación viene con WakeSharp Plus`,
      '05': `La revelación diaria del Sharpness Score, medido contra tu propia referencia`,
      '06': `El editor de reglas de alarma inteligente, con el titular «Wakes you before your first meeting» (Te despierta antes de tu primera reunión)`,
      '07': `Las estadísticas de tendencia y racha de Sharpness: rachas y congelaciones gratis, historial completo con WakeSharp Plus`,
    },
  },

  yours: {
    heading: { pre: `Haz `, accent: `tuya`, post: ` la mañana` },
    lede: `La alarma que de verdad quieres oír, detrás de la imagen que de verdad quieres ver.`,
    cards: [
      { title: `13 tonos, todos gratis`, body: `De Dawn (amanecer) a Smoke Alarm (detector de humo), y cada uno de ellos incluye también una versión más suave.` },
      { title: `Fondos y escenas`, body: `Tres fondos gratis y cinco con Plus, y Lark (la alondra mascota) gana cuatro escenas más, cada una con su propia celebración.` },
      { title: `Claro, oscuro o ninguno`, body: `Elige un aspecto o deja que siga al dispositivo; en cualquier caso, la paleta cambia con la hora.` },
      { title: `Un aterrizaje más suave`, body: `Gentle start (inicio suave) en iPhone abre el tono bajito y sube hasta el volumen completo a los 25 segundos aproximadamente. En Android, un amanecer ilumina la pantalla y sube el volumen antes de la alarma.` },
    ],
  },

  pricing: {
    heading: { pre: `Tu alarma suena `, accent: `gratis, para siempre`, post: `` },
    lede: `Sin anuncios, además. Dos de las cinco misiones también son gratis, junto con los 13 tonos, Strict Mode, los preajustes de posponer y la comprobación de fiabilidad. Plus es para la mañana después de la alarma: las otras misiones, más juegos de calentamiento, más reglas inteligentes y el historial completo.`,
    free: {
      name: `Gratis`,
      price: `$0`,
      tagline: `Sin registro, sin prueba de la que olvidarte.`,
      /** Refleja los límites que el muro de pago realmente aplica. */
      features: [
        `Todas las alarmas que necesites`,
        `Dos misiones para despertar: Mind Games y Photo Proof`,
        `Los 13 tonos de alarma`,
        `Strict Mode, los preajustes de posponer y la comprobación de fiabilidad`,
        `Una alarma inteligente de calendario, una rotación de turnos, un perfil`,
        `Búsqueda, orden y la vista Hoy`,
        `Rachas, comodines de congelación e hitos`,
        `Un juego de calentamiento después de cada misión, y tu tendencia de 7 días`,
        `Despierta con un amigo, y la app de reloj para las dos muñecas`,
        `Tres fondos de alarma y la escena Classic Lark`,
      ],
    },
    plus: {
      name: `WakeSharp Plus`,
      perMonth: `/mes`,
      annual: `o **{annual}/año**, con {trialDays} días de prueba gratis`,
      lifetime: `o **{lifetime} una sola vez** — Lifetime (de por vida), que nunca se renueva`,
      /** Los elementos 2-6 son los cinco puntos del muro de pago, en su orden. */
      features: [
        `Todo lo del plan Gratis`,
        `Todas las misiones para despertar más allá de Mind Games y Photo Proof`,
        `Tres juegos de calentamiento cada mañana, en rotación`,
        `Tu historial completo de Sharpness`,
        `Alarmas inteligentes de calendario sin límite`,
        `Escenas de Lark, fondos de alarma y celebraciones`,
        `Todas las rotaciones de turnos y perfiles que quieras, y una política de posponer personalizada`,
      ],
    },
    lapse: `Plus se comprueba cuando creas una alarma, no cuando suena. Una alarma que ya lleva un escaneo o una caminata lo sigue ejecutando esté o no activa la suscripción: nada de lo que ya configuraste deja de funcionar. Lo que caduca es poder configurar nuevas.`,
    billing: `Los planes mensual y anual los cobra Apple o Google y se renuevan hasta que los canceles; puedes cancelarlos en cualquier momento desde tu cuenta de la tienda, y ten en cuenta que borrar la app no cancela una suscripción. Lifetime es un único pago sin nada que cancelar. Consulta los [Términos](terms).`,
    /** Solo en las páginas localizadas: las tiendas localizan los precios en tiempo de ejecución. */
    usdNote: `Los precios se muestran en dólares estadounidenses; App Store y Google Play muestran el precio para tu país.`,
  },

  faq: {
    heading: { pre: `Preguntas, `, accent: `con respuesta`, post: `` },
    items: [
      {
        q: `¿De verdad suena en Silencio, Concentración o No molestar?`,
        a: `El comportamiento depende de la plataforma, y depende de los permisos. En iPhone, WakeSharp usa AlarmKit de Apple, que permite sonar a través del modo Silencio y de Concentración una vez que has concedido el acceso a alarmas; si lo rechazas o lo revocas, WakeSharp no puede programar absolutamente nada. En Android suena en el canal de audio dedicado a las alarmas, que No molestar no silencia, y muestra una alerta a pantalla completa sobre la pantalla de bloqueo, siempre que estén concedidos los permisos de alarmas exactas, notificaciones y pantalla de bloqueo. Lo que ninguna app puede hacer es sonar en un teléfono apagado o sin batería, así que para cualquier cosa que de verdad no puedas perderte, pon una segunda alarma en otro dispositivo.`,
      },
      {
        q: `¿Cómo compruebo que mi alarma va a sonar de verdad?`,
        a: `Abre Ajustes → Alarm reliability (fiabilidad de la alarma). WakeSharp lee las condiciones de tu teléfono que pueden detener una alarma —permisos, volumen de alarma, ajustes de notificaciones, superposición en la pantalla de bloqueo, restricciones de batería— y empieza por un veredicto claro en lugar de una promesa. Cuando la plataforma no nos dice algo, lo reconoce en vez de mostrar una marca verde, porque una lista que convierte en silencio las incógnitas en aprobados es peor que ninguna lista. Si alguna vez una alarma falla, la app puede decirte después la causa demostrable, o admitir que no pudo averiguarla.`,
      },
      {
        q: `¿Tengo que hacer cuentas a las 6 de la mañana?`,
        a: `Solo si quieres. Las dos misiones gratis son Mind Games, que son tres problemas de aritmética, y Photo Proof, que solo pide una foto de algo —el cielo, tu cama hecha, un vaso de agua— según una consigna que rota a diario. Plus añade escanear un objeto real al otro lado de la habitación, caminar un número fijado de pasos y «Surprise me», que elige una y la fija para esa alarma ese día, así que no hay nada que preparar la noche anterior. Todas las misiones tienen una salida que termina en Mind Games con el crédito completo, así que una cámara muerta o un teléfono olvidado en la mesita de noche nunca te atrapan.`,
      },
      {
        q: `¿Puedo hacer trampa y saltarme la misión?`,
        a: `Puedes descartar la alarma sin hacerla: el botón de detener de tu propio teléfono siempre funciona, y no querríamos que fuera de otra manera. WakeSharp muestra entonces una pantalla de misión pendiente la próxima vez que la abres, y una misión de recuperación puede mantener viva tu racha a medio crédito. Posponer es una política que eliges, no una regla que te imponen: desactivado, el estándar de dos posposiciones de cinco minutos, o Tighten (cada vez más corto), que acorta cada intervalo y sube la dificultad sobre la marcha. Cada posposición cuesta Sharpness. Strict Mode, en dispositivos compatibles, reserva cuatro repeticiones por adelantado —a los 45 segundos y luego a los 4, 8 y 12 minutos— y completar la misión cancela las que aún no hayan sonado.`,
      },
      {
        q: `¿Qué hace la cámara?`,
        a: `La usan dos misiones, y solo mientras esa misión está en marcha o mientras la configuras. Scan an Object clasifica los fotogramas en tu dispositivo —el framework Vision de Apple en iPhone, un pequeño modelo incluido en la app en Android— para comprobar que estás mirando lo que elegiste. Photo Proof pide una fotografía, y la versión verificada la compara con una referencia que registraste, también en tu dispositivo. No se sube nada, no se añade nada a tu galería de fotos y la fotografía completa nunca se guarda: solo una pequeña huella de ella. Rechaza el permiso y todas las demás misiones siguen funcionando.`,
      },
      {
        q: `¿WakeSharp registra mi sueño?`,
        a: `No. No hay ningún tipo de seguimiento del sueño: ni micrófono escuchando por la noche, ni fases del sueño, ni puntuación de tu noche, ni opinión sobre cuándo te dormiste. El podómetro se lee durante la misión de caminar y en ningún otro momento. WakeSharp mide lo lúcido que estás una vez que te has levantado, y nada antes de eso. Las únicas cosas con forma de sueño que tiene son una hora de acostarte que fijas tú y un recordatorio opcional para ir relajándote.`,
      },
      {
        q: `¿Qué lee exactamente de mi calendario?`,
        a: `Tus próximos eventos, en solo lectura, enteramente en tu dispositivo, con un único fin: calcular a qué hora despertarte. No se transmite nada a ningún sitio. Es opcional, y todas las demás funciones funcionan si lo rechazas.`,
      },
      {
        q: `¿Necesito una cuenta?`,
        a: `No, y nada está bloqueado detrás de una: no hay correo ni contraseña en ninguna parte de la app. Opcionalmente puedes iniciar sesión con Apple o Google con un único propósito: hacer una copia de seguridad de tus alarmas, ajustes, puntuaciones y racha para que vuelvan en un teléfono nuevo. Está desactivado por defecto, todas las funciones funcionan sin iniciar sesión y una alarma nunca espera a la red para sonar. Elimínala desde Ajustes → Cuenta, o en wakesharp.app/account/delete.`,
      },
      {
        q: `¿Qué pasa si mi reloj está sin batería?`,
        a: `Tu teléfono suena. El reloj te despierta primero con un toque y WakeSharp desplaza la alarma del teléfono unos minutos más tarde como respaldo, así que solo descartarla en el reloj la cancela. Un reloj sin batería, fuera de alcance o que no has abierto en 36 horas dejan la alarma del teléfono exactamente donde estaba. Las alarmas de guardia de Strict Mode suenan en el teléfono de todos modos.`,
      },
      {
        q: `¿Qué es gratis y qué es Plus?`,
        a: `Tu alarma suena gratis, para siempre, y sin anuncios. El plan Gratis incluye todas las alarmas que necesites, las misiones Mind Games y Photo Proof, los 13 tonos de alarma, Strict Mode, los preajustes de posponer, la comprobación de fiabilidad, rachas y comodines de congelación, un juego de calentamiento después de cada misión, una alarma inteligente de calendario, una rotación de turnos, un perfil, la app de reloj y tu tendencia de Sharpness de 7 días. Plus añade las otras misiones —escanear, caminar y Surprise me—, tres juegos de calentamiento en rotación cada mañana, alarmas inteligentes de calendario sin límite, todas las rotaciones y perfiles que quieras, tu historial completo de Sharpness, una política de posponer personalizada, y las escenas de Lark, los fondos y las celebraciones.`,
      },
      {
        q: `¿Qué pasa con mis alarmas Plus si dejo de pagar?`,
        a: `Siguen funcionando. La comprobación ocurre cuando creas una alarma, no cuando suena, así que una alarma que ya lleva un escaneo o una caminata lo sigue ejecutando esté o no activa la suscripción. Lo que pierdes es poder configurar nuevas, junto con los juegos de calentamiento extra y el historial completo.`,
      },
      {
        q: `¿Lifetime es una suscripción?`,
        a: `No. Lifetime es un único pago por las mismas funciones de WakeSharp Plus: no se renueva y no hay nada que cancelar. Los planes mensual y anual sí se renuevan hasta que los detengas. La prueba gratis de 7 días pertenece al plan anual.`,
      },
      {
        q: `¿Cómo cancelo?`,
        a: `A través de App Store o Google Play, en cualquier momento. Borrar la app no cancela una suscripción. Lifetime no tiene nada que cancelar: es una compra única, y Restaurar compras la recupera en un teléfono nuevo.`,
      },
      {
        q: `¿Me rastrea?`,
        a: `Sin ID de publicidad, sin ubicación y sin rastreo entre otras apps. Lo que sale de tu dispositivo: analíticas de uso anónimas (un ID aleatorio y qué pantallas usas; nunca tus alarmas, calendario ni cámara), datos de suscripción si compras Plus, y tu propia copia de seguridad si decidiste crear una cuenta. Tu cuenta nunca se cruza con las analíticas. La política de privacidad enumera cada byte.`,
      },
    ],
  },

  cta: {
    heading: { pre: `Mañana empieza `, accent: `esta noche`, post: `` },
    lede: `Pon una alarma. Descubre cómo se siente de verdad una mañana lúcida.`,
  },
} satisfies typeof en;
