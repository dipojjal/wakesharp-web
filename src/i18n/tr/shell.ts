import { shell as en } from '../en/shell';

/**
 * Turkish shell strings. The three values the English file reads from
 * src/config/site.ts (siteDescription, tagline, footer.safetyNotice) are
 * literal translations here; the placeholders are still supplied by the templates.
 */
export const shell = {
  siteDescription: `Sizi toplantıya hazır uyandıran alarm. Sabahı bir görev kazandırır — çözün, fotoğraflayın, tarayın ya da yürüyün — bir zihin ısınması ne kadar zinde uyandığınızı puanlar ve akıllı alarmlar takviminizi okuyarak sizi ilk toplantınızdan önce uyandırır.`,
  tagline: `Uyanın, hem de zinde. Sadece uyanık değil.`,
  requirements: { ios: `iOS 26 veya üzeri`, android: `Android 8.0 veya üzeri` },
  ogImageAlt: `WakeSharp — uyanın, hem de zinde; sadece uyanık değil.`,
  rssTitle: `WakeSharp Blog`,
  skipLink: `İçeriğe atla`,
  brandHome: `WakeSharp — ana sayfa`,

  nav: {
    aria: `Ana menü`,
    features: `Özellikler`,
    sharpness: `Sharpness`,
    pricing: `Fiyatlar`,
    blog: `Blog`,
    contact: `İletişim`,
    faq: `SSS`,
    cta: `WakeSharp’ı indir`,
  },

  language: {
    label: `Dil`,
    listAria: `Site dili`,
  },

  footer: {
    product: `Ürün`,
    legal: `Yasal`,
    contact: `İletişim`,
    features: `Özellikler`,
    sharpnessScore: `Sharpness Score`,
    pricing: `Fiyatlar`,
    blog: `Blog`,
    faq: `SSS`,
    privacy: `Gizlilik Politikası`,
    terms: `Hizmet Koşulları`,
    support: `Destek`,
    deleteAccount: `Hesabınızı silin`,
    contactForm: `İletişim formu`,
    builtBy: `Küçük ve bağımsız bir stüdyo olan {publisher} tarafından geliştirildi.`,
    pleaseNote: `Lütfen dikkat.`,
    safetyNotice: `WakeSharp bir tıbbi cihaz değildir. Telefonunuzun ayarları, pil kısıtlamaları veya güç durumu herhangi bir alarmın çalmasını engelleyebilir. Geç kalmayı göze alamayacağınız her şey için ikinci, bağımsız bir alarm kullanın.`,
    fullSafetyNotice: `Güvenlik bildiriminin tamamı`,
    rights: `© {year} {publisher}. Tüm hakları saklıdır.`,
  },

  appLanguageNote: `WakeSharp uygulamasının kendisi şu anda İngilizcedir.`,

  legalLayout: {
    lastUpdated: `Son güncelleme: {date}`,
    questions: `Bu sayfayla ilgili sorunuz mu var? [{email}](email) adresine yazın.`,
  },

  lark: {
    hero: `WakeSharp maskotu, ana görsel`,
    asleep: `WakeSharp maskotu, uykuda`,
    waking: `WakeSharp maskotu, uyanıyor`,
    focused: `WakeSharp maskotu, odaklanmış`,
    celebrating: `WakeSharp maskotu, kutlama yapıyor`,
    encouraging: `WakeSharp maskotu, cesaret veriyor`,
  },
} satisfies typeof en;
