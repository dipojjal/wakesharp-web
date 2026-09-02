import { accountDelete as en } from '../en/account-delete';

/** /account/delete in Turkish. In-app labels stay in English (the app ships in English) with a Turkish gloss. */
export const accountDelete = {
  title: `Hesabınızı silin — WakeSharp`,
  description: `İsteğe bağlı WakeSharp hesabınızı ve bulut yedeğini uygulama içinden ya da e-postayla nasıl silersiniz.`,
  heading: `WakeSharp hesabınızı silin`,
  intro: `WakeSharp hesapları isteğe bağlıdır — yalnızca alarmlarınızı, ayarlarınızı, puanlarınızı ve serinizi yedeklemek için vardır; yeni bir telefonda geri yükleyebilesiniz diye. Hesabınızı silmek o yedeği ve girişin kendisini kalıcı olarak kaldırır.`,
  inApp: {
    heading: `Uygulamada silin`,
    steps: [
      `WakeSharp’ı açın ve **Settings** (Ayarlar) bölümüne gidin.`,
      `**Account** (Hesap) öğesine dokunun.`,
      `**Delete account** (Hesabı sil) öğesine dokunun ve onaylayın.`,
    ],
    body: `Bütün akış bu kadar. Girişinizi (Apple veya Google ile giriş), bulut yedeğinizi — alarmlar, ayarlar, uyanma geçmişi, puanlar, seri ve kayıtlı fotoğraf ya da tarama referanslarının küçük resimleri — kalıcı olarak siler ve Apple ile giriş için giriş belirtecini Apple nezdinde iptal eder. Bekleme süresi ve kısmi saklama yoktur: hesap kaydı ve ona bağlı her şey birlikte kaldırılır.`,
  },
  kept: {
    heading: `Silinmeyenler`,
    items: [
      `**Telefonunuzdaki veriler.** Alarmlarınız, puanlarınız ve ayarlarınız cihazınızda kalır — hesabı silmek, alarmlarınızı silmek değildir. Cihazdaki verilerin de gitmesini istiyorsanız uygulamanın kendisini kaldırın.`,
      `**Satın almalar.** WakeSharp Plus, WakeSharp hesabınıza değil, App Store veya Google Play hesabınıza aittir ve silme işleminden etkilenmez.`,
      `**Anonim kullanım analitiği**; zaten en başından beri hesabınızla hiç ilişkilendirilmemişti — bkz. [gizlilik politikası](privacy).`,
    ],
  },
  byEmail: {
    heading: `Uygulama artık sizde yoksa`,
    body: `Giriş yaptığınız adresten [{email}](email) adresine yazın (gizli adresli Apple ile giriş için bunun yerine yaklaşık kayıt tarihini belirtin); hesabı sizin için biz silelim. İsteği doğrular ve silme işlemini 30 gün içinde tamamlarız — neredeyse her zaman çok daha erken.`,
  },
} satisfies typeof en;
