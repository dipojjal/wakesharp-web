import { shell as en } from '../en/shell';

/**
 * Turkish shell strings. The three values the English file reads from
 * src/config/site.ts (siteDescription, tagline, footer.safetyNotice) are
 * literal translations here; the placeholders are still supplied by the templates.
 * siteDescription stays at or under 155 characters and leads with the query the
 * homepage targets ("ağır uyuyanlar için alarm saati").
 */
export const shell = {
  siteDescription: `Ağır uyuyanlar için alarm saati: susturmak için hızlı işlem çözün, bir noktayı fotoğraflayın ya da yürüyün, sonra ne kadar zinde uyandığınızı görün.`,
  tagline: `Uyanın, hem de zinde. Sadece uyanık değil.`,
  requirements: { ios: `iOS 26 veya üzeri`, android: `Android 8.0 veya üzeri` },
  ogImageAlt: `WakeSharp — uyanın, hem de zinde; sadece uyanık değil.`,
  rssTitle: `WakeSharp Blog`,
  skipLink: `İçeriğe atla`,
  brandHome: `WakeSharp — ana sayfa`,

  nav: {
    aria: `Ana menü`,
    features: `Özellikler`,
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
    sharpnessScore: `Zindelik puanı`,
    pricing: `Fiyatlar`,
    blog: `Blog`,
    faq: `SSS`,
    privacy: `Gizlilik Politikası`,
    terms: `Hizmet Koşulları`,
    support: `Destek`,
    deleteAccount: `Hesabınızı silin`,
    about: `Hakkımızda`,
    contactForm: `İletişim formu`,
    builtBy: `Küçük ve bağımsız bir stüdyo olan {publisher} tarafından geliştirildi.`,
    pleaseNote: `Lütfen dikkat.`,
    safetyNotice: `WakeSharp bir tıbbi cihaz değildir. Telefonunuzun ayarları, pil kısıtlamaları veya güç durumu herhangi bir alarmın çalmasını engelleyebilir. Geç kalmayı göze alamayacağınız her şey için ikinci, bağımsız bir alarm kullanın.`,
    fullSafetyNotice: `Güvenlik bildiriminin tamamı`,
    rights: `© {year} {publisher}. Tüm hakları saklıdır.`,
  },

  /**
   * Shown near the store buttons only on a localized page whose language the app
   * does not ship in (StoreButtons reads SITE.appLanguages). The app ships in
   * Turkish, so Turkish pages never show it, but every catalog carries the key.
   */
  appLanguageNote: `WakeSharp uygulaması İngilizce, İspanyolca, Rusça, Türkçe, Almanca, Fransızca ve Arapça olarak kullanılabilir.`,

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
