/**
 * The words of https://wakesharp.app/unsubscribe, in the seven languages the
 * app and its emails ship in.
 *
 * Not a per-locale catalog like src/i18n/<code>/: the page has one URL for
 * every language, and it speaks the language of the email the link came from,
 * which the lifecycle-unsubscribe function returns with the link's status
 * (app repo, supabase/functions/lifecycle-unsubscribe). Until that answer
 * arrives, and for a link that does not work, it uses the browser's language.
 *
 * Forms of address follow the app: German "du", French "vous", Spanish "tú",
 * Turkish "siz". Plain text only; tests/growth/unsubscribe.test.ts checks every
 * language has every key.
 */
export const UNSUBSCRIBE_LOCALES = ['en', 'de', 'fr', 'es', 'tr', 'ru', 'ar'] as const;
export type UnsubscribeLocale = (typeof UNSUBSCRIBE_LOCALES)[number];

const en = {
  /** The browser tab. */
  title: `Email preferences - WakeSharp`,
  loading: `Checking your link…`,
  /** Offer emails are on: the question, and the button that turns them off. */
  askHeading: `Stop offer emails from WakeSharp?`,
  unsubscribe: `Unsubscribe`,
  /** Offer emails are off. */
  doneHeading: `You’re unsubscribed.`,
  doneBody: `You’ll still get emails about your subscription, like a failed payment.`,
  subscribeAgain: `Subscribe again`,
  /** After "Subscribe again". */
  againHeading: `You’re subscribed again.`,
  /** An unknown, mangled or deleted account's token. */
  invalidHeading: `This link doesn’t work anymore.`,
  invalidBody: `You can also turn offer emails off in the WakeSharp app’s settings.`,
  /** The function could not be reached or failed. */
  errorHeading: `Something went wrong.`,
  errorBody: `Check your connection and try again.`,
  retry: `Try again`,
  privacy: `Privacy policy`,
};

export type UnsubscribeCopy = typeof en;

const NNBSP = ' ';

export const UNSUBSCRIBE_COPY: Record<UnsubscribeLocale, UnsubscribeCopy> = {
  en,
  de: {
    title: `E-Mail-Einstellungen - WakeSharp`,
    loading: `Dein Link wird geprüft …`,
    askHeading: `Keine Angebots-E-Mails mehr von WakeSharp?`,
    unsubscribe: `Abmelden`,
    doneHeading: `Du bist abgemeldet.`,
    doneBody: `E-Mails zu deinem Abo, etwa zu einer fehlgeschlagenen Zahlung, bekommst du weiterhin.`,
    subscribeAgain: `Wieder anmelden`,
    againHeading: `Du bist wieder angemeldet.`,
    invalidHeading: `Dieser Link funktioniert nicht mehr.`,
    invalidBody: `Angebots-E-Mails kannst du auch in den Einstellungen der WakeSharp-App abschalten.`,
    errorHeading: `Etwas ist schiefgelaufen.`,
    errorBody: `Prüfe deine Verbindung und versuche es noch einmal.`,
    retry: `Noch einmal versuchen`,
    privacy: `Datenschutzerklärung`,
  },
  fr: {
    title: `Préférences e-mail - WakeSharp`,
    loading: `Vérification de votre lien…`,
    askHeading: `Ne plus recevoir les e-mails d’offres de WakeSharp${NNBSP}?`,
    unsubscribe: `Se désabonner`,
    doneHeading: `Votre désabonnement est confirmé.`,
    doneBody: `Vous recevrez toujours les e-mails concernant votre abonnement, par exemple en cas d’échec de paiement.`,
    subscribeAgain: `Se réabonner`,
    againHeading: `Vous recevrez de nouveau nos e-mails d’offres.`,
    invalidHeading: `Ce lien ne fonctionne plus.`,
    invalidBody: `Vous pouvez aussi désactiver les e-mails d’offres dans les réglages de l’app WakeSharp.`,
    errorHeading: `Un problème est survenu.`,
    errorBody: `Vérifiez votre connexion et réessayez.`,
    retry: `Réessayer`,
    privacy: `Politique de confidentialité`,
  },
  es: {
    title: `Preferencias de correo - WakeSharp`,
    loading: `Comprobando tu enlace…`,
    askHeading: `¿Dejar de recibir correos con ofertas de WakeSharp?`,
    unsubscribe: `Darme de baja`,
    doneHeading: `Te has dado de baja.`,
    doneBody: `Seguirás recibiendo correos sobre tu suscripción, como un pago fallido.`,
    subscribeAgain: `Volver a suscribirme`,
    againHeading: `Te has vuelto a suscribir.`,
    invalidHeading: `Este enlace ya no funciona.`,
    invalidBody: `También puedes desactivar los correos con ofertas en los ajustes de la app WakeSharp.`,
    errorHeading: `Algo salió mal.`,
    errorBody: `Revisa tu conexión y vuelve a intentarlo.`,
    retry: `Volver a intentarlo`,
    privacy: `Política de privacidad`,
  },
  tr: {
    title: `E-posta tercihleri - WakeSharp`,
    loading: `Bağlantınız kontrol ediliyor…`,
    askHeading: `WakeSharp’tan kampanya e-postaları almayı bırakmak istiyor musunuz?`,
    unsubscribe: `Abonelikten çık`,
    doneHeading: `Abonelikten çıktınız.`,
    doneBody: `Başarısız bir ödeme gibi aboneliğinizle ilgili e-postaları almaya devam edeceksiniz.`,
    subscribeAgain: `Yeniden abone ol`,
    againHeading: `Yeniden abone oldunuz.`,
    invalidHeading: `Bu bağlantı artık çalışmıyor.`,
    invalidBody: `Kampanya e-postalarını WakeSharp uygulamasının ayarlarından da kapatabilirsiniz.`,
    errorHeading: `Bir sorun oluştu.`,
    errorBody: `Bağlantınızı kontrol edip tekrar deneyin.`,
    retry: `Tekrar dene`,
    privacy: `Gizlilik politikası`,
  },
  ru: {
    title: `Настройки писем - WakeSharp`,
    loading: `Проверяем ссылку…`,
    askHeading: `Больше не получать письма с предложениями от WakeSharp?`,
    unsubscribe: `Отписаться`,
    doneHeading: `Вы отписались.`,
    doneBody: `Письма о вашей подписке, например о неудачном платеже, будут приходить и дальше.`,
    subscribeAgain: `Подписаться снова`,
    againHeading: `Вы снова подписаны.`,
    invalidHeading: `Эта ссылка больше не работает.`,
    invalidBody: `Письма с предложениями можно отключить и в настройках приложения WakeSharp.`,
    errorHeading: `Что-то пошло не так.`,
    errorBody: `Проверьте подключение и попробуйте ещё раз.`,
    retry: `Попробовать снова`,
    privacy: `Политика конфиденциальности`,
  },
  ar: {
    title: `تفضيلات البريد الإلكتروني - WakeSharp`,
    loading: `جارٍ التحقق من رابطك…`,
    askHeading: `هل تريد إيقاف رسائل العروض من WakeSharp؟`,
    unsubscribe: `إلغاء الاشتراك`,
    doneHeading: `تم إلغاء اشتراكك.`,
    doneBody: `ستظل تصلك رسائل حول اشتراكك، مثل تعذّر إتمام الدفع.`,
    subscribeAgain: `الاشتراك من جديد`,
    againHeading: `اشتركت من جديد.`,
    invalidHeading: `لم يعد هذا الرابط يعمل.`,
    invalidBody: `يمكنك أيضًا إيقاف رسائل العروض من إعدادات تطبيق WakeSharp.`,
    errorHeading: `حدث خطأ ما.`,
    errorBody: `تحقق من اتصالك وحاول مرة أخرى.`,
    retry: `حاول مرة أخرى`,
    privacy: `سياسة الخصوصية`,
  },
};
