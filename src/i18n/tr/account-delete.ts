import { accountDelete as en } from '../en/account-delete';

/** /account/delete in Turkish. In-app labels are the app's own Turkish labels (the app ships in Turkish). */
export const accountDelete = {
  title: `Hesabınızı silin - WakeSharp`,
  description: `İsteğe bağlı WakeSharp hesabınızı ve bulut yedeğini uygulama içinden ya da e-postayla nasıl silersiniz.`,
  heading: `WakeSharp hesabınızı silin`,
  intro: `WakeSharp hesapları isteğe bağlıdır: yalnızca alarmlarınızı, ayarlarınızı, puanlarınızı ve serinizi yedeklemek için vardır; yeni bir telefonda geri yükleyebilesiniz diye. Hesabınızı silmek o yedeği ve girişin kendisini kalıcı olarak kaldırır.`,
  inApp: {
    heading: `Uygulamada silin`,
    steps: [
      `WakeSharp’ı açın ve **Ayarlar** bölümüne gidin.`,
      `**Hesap** öğesine dokunun.`,
      `**Hesabı sil** öğesine dokunun ve onaylayın.`,
    ],
    body: `Bütün akış bu kadar. Girişinizi (Apple veya Google ile giriş), bulut yedeğinizi (alarmlar, ayarlar, uyanma geçmişi, puanlar, seri ve kayıtlı fotoğraf ya da tarama referanslarının küçük resimleri) kalıcı olarak siler ve Apple ile giriş için giriş belirtecini Apple nezdinde iptal eder. Bekleme süresi yoktur: hesap kaydı ve yedeğinizde onunla birlikte saklanan her şey birlikte kaldırılır. Aşağıda listelenen bazı kayıtlar daha uzun süre saklanır.`,
  },
  kept: {
    heading: `Silinmeyenler`,
    items: [
      `**Telefonunuzdaki veriler.** Alarmlarınız, puanlarınız ve ayarlarınız cihazınızda kalır: hesabı silmek, alarmlarınızı silmek değildir. Cihazdaki verilerin de gitmesini istiyorsanız uygulamanın kendisini kaldırın.`,
      `**Satın almalar.** WakeSharp Sınırsız aboneliği, tıpkı bir Lifetime (ömür boyu) satın alımı gibi, WakeSharp hesabınıza değil, App Store veya Google Play hesabınıza aittir ve silme işleminden etkilenmez.`,
      `**Satın alma olaylarının bizdeki kopyası.** RevenueCat’in bize gönderdiği her abonelik olayı, hesap silindikten sonra bile 400 gün saklanır ve ardından silinir.`,
      `**İptal yanıtlarının ve destek mesajlarının e-posta kopyaları.** Bunlar, ihtiyacımız kalmayana kadar destek posta kutumuzda kalır; silinmelerini istiyorsanız bize e-posta gönderin.`,
      `**PostHog ve AppsFlyer’daki analitik ve pazarlama kayıtları.** Giriş yaptıktan sonra hesabınızla ilişkilendirilebilen takma adlı kimlikler kullanırlar ve talep üzerine silinirler: bkz. [gizlilik politikası](privacy).`,
    ],
  },
  byEmail: {
    heading: `Uygulama artık sizde yoksa`,
    body: `Giriş yaptığınız adresten [{email}](email) adresine yazın (gizli adresli Apple ile giriş için bunun yerine yaklaşık kayıt tarihini belirtin); hesabı sizin için biz silelim. İsteği doğrular ve silme işlemini 30 gün içinde tamamlarız: neredeyse her zaman çok daha erken.`,
  },
} satisfies typeof en;
