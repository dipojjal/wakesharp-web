import { contact as en } from '../en/contact';

/**
 * The contact form and its two result pages in Turkish. The <select> keeps its
 * English value= attributes; only the visible labels below are translated.
 */
export const contact = {
  form: {
    title: `İletişim — WakeSharp`,
    description: `WakeSharp’ın geliştiricisine doğrudan yazın — hata bildirimleri, alarm sorunları, abonelik soruları ve özellik istekleri.`,
    heading: `İletişim`,
    intro: `WakeSharp küçük bir ekiptir ve buraya gelen her şeyi bir insan okur.`,
    callout: `Genellikle **2–3 iş günü** içinde yanıtlarım. Kendi e-posta uygulamanızı kullanmayı tercih ederseniz [{email}](email) adresine yazın — aynı gelen kutusuna ulaşır.`,
    nameLabel: `Adınız`,
    emailLabel: `E-posta adresiniz`,
    emailHint: `Yanıt verebilmem için. Başka hiçbir şey için kullanılmaz.`,
    topicLabel: `Konu nedir?`,
    topicPlaceholder: `Birini seçin…`,
    topics: {
      alarm: `Bir alarm çalmadı`,
      bug: `Hata bildirimi`,
      billing: `Abonelik veya faturalandırma`,
      feature: `Özellik isteği`,
      other: `Başka bir şey`,
    },
    deviceLabel: `Telefon ve işletim sistemi sürümü`,
    deviceHint: `— isteğe bağlı, ama takip sorularımın yarısını baştan yanıtlar`,
    devicePlaceholder: `örn. Pixel 9, Android 16`,
    messageLabel: `Mesaj`,
    messageHint: `Bir hata için bana söyleyebileceğiniz en yararlı şey, ne beklediğiniz ve bunun yerine ne olduğudur. Bir alarm çalmadıysa, kurulduğu saat ile telefonu bulduğunuz saat çok işe yarar.`,
    honeypotLabel: `Şirket`,
    submit: `Mesajı gönder`,
    privacyNote: `Mesajınız ve e-posta adresiniz bana e-postayla iletilir ve başka hiçbir yerde saklanmaz. Bkz. [Gizlilik Politikası](privacy).`,
  },
  sent: {
    title: `Mesaj gönderildi — WakeSharp`,
    description: `WakeSharp’a mesajınız gönderildi.`,
    heading: `Mesaj gönderildi`,
    intro: `Teşekkürler — gelen kutuma doğru yola çıktı.`,
    body: `Genellikle **2–3 iş günü** içinde [{email}](email) adresinden yanıtlarım. Ses çıkmazsa, kaybolduğunu varsaymadan önce spam klasörünüzü kontrol edin.`,
    meanwhile: `Beklerken [Destek sayfası](support) en sık sorulan soruları yanıtlar — çalmayan bir alarm için tam kontrol listesi de dahil.`,
    backHome: `Ana sayfaya dön`,
  },
  error: {
    title: `Mesaj gönderilemedi — WakeSharp`,
    description: `WakeSharp iletişim formu mesajınızı iletemedi.`,
    heading: `Bu iletilemedi`,
    intro: `Mesajınız iletilmedi; bunu sizden saklamaktansa söylemeyi tercih ederim.`,
    callout: `Lütfen bunun yerine doğrudan [{email}](email) adresine yazın. Yazdıklarınız saklanmadı, yani yeniden yazmanız gerekecek — bunun için üzgünüm.`,
    body: `Zorunlu bir alan boş geldiyse, e-posta adresi geçerli değilse ya da mesaj formun izin verdiği 4.000 karakter sınırını aştıysa da buraya düşersiniz.`,
    backToForm: `Forma dön`,
    support: `Destek`,
    homepage: `Ana sayfa`,
  },
} satisfies typeof en;
