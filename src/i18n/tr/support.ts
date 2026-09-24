import { support as en } from '../en/support';

/**
 * /support in Turkish. Link keys are kept as in English:
 * email, terms-safety, privacy, account-delete, apple-subs, google-subs.
 * `{ios}` and `{android}` are the requirement strings, and `{annual}`,
 * `{monthly}` and `{trialDays}` the prices, all from src/config/site.ts.
 * The app ships in Turkish, so in-app labels, features, missions and the plan
 * use the app's own Turkish strings; iOS and Android settings use Apple's and
 * Google's Turkish names.
 */
export const support = {
  title: `WakeSharp Desteği: Çalmayan Alarm, Görevler ve Ödemeler`,
  description: `WakeSharp için yardım alın: bir alarm neden çalmayabilir, görevler ve Zindelik puanı nasıl çalışır, aboneliğinizi nasıl yönetirsiniz.`,
  heading: `Destek`,
  intro: `WakeSharp küçük bir ekiptir ve e-postaları bir insan yanıtlar.`,

  getInTouch: {
    heading: `İletişime geçin`,
    body: `[{email}](email) adresine yazın. Genellikle **2–3 iş günü** içinde yanıtlarım. Telefon modelinizi, işletim sistemi sürümünüzü ve uygulamanın Ayarlar bölümündeki WakeSharp sürümünü eklemeniz neredeyse her zaman daha hızlı bir yanıt almanızı sağlar.`,
  },

  requirements: {
    heading: `Gereksinimler`,
    body: `WakeSharp, iPhone’da {ios}, Android’de {android} gerektirir. Saat uygulamaları watchOS 26 veya Wear OS 3 gerektirir.`,
  },

  didntRing: {
    heading: `Alarmım çalmadı`,
    callout: `**Buradan değil, uygulamadan başlayın.** WakeSharp → Ayarlar → _Alarm güvenilirliği_ bölümünü açın. Telefonunuzun anlık durumunu okur — izinler, alarm ses düzeyi, Rahatsız Etmeyin, bildirim ayarları, kilit ekranının üzerinde görünme, pil kısıtlamaları — ve önce net bir hüküm verir: çalacak, çalmayabilir ya da çalamaz. Çözüm tek dokunuş uzaktaysa o dokunuşu sunar; telefon bize bir şeyi söylemiyorsa yeşil onay işareti göstermek yerine bunu açıkça belirtir. Ayrıca yatmadan önce de çalışır ve bulduğu en kötü şeyi işaretler.`,
    report: `Bir alarm zaten kaçırıldıysa WakeSharp o sabah bir rapor gösterir; kanıtlayabildiği yerde nedeni adlandırır — izin geri alınmış, alarm ses düzeyi sıfırda, Tamamen sessiz modu, telefon kapalıydı — kanıtlayamadığı yerde ise “Nedenini bilemedik” der. Aşağıdaki kontrol listeleri, bilemediği durumlar içindir.`,
    iphone: {
      heading: `iPhone’da`,
      steps: [
        `**Alarmın gerçekten etkin olduğunu** ana ekrandan kontrol edin; tekrar günlerinin bugünü kapsadığından da emin olun.`,
        `**Alarm iznini kontrol edin.** Ayarlar → WakeSharp. Alarm erişimi reddedildiyse WakeSharp hiçbir şey zamanlayamaz. İzni açın ve alarmı yeniden kaydedin.`,
        `**Ses düzeyini ve sessiz anahtarını kontrol edin.** WakeSharp Sessiz mod ve Odak açıkken de çalar; ama kapalı ya da pili bitmiş bir cihazda çalamaz.`,
        `**Bluetooth’u kontrol edin.** Telefonunuz hâlâ bir kulaklığa ya da arabaya bağlıysa alarm orada çalıyor olabilir.`,
        `**Telefonu yeniden başlatın** ve sorun sürerse alarmı yeniden kaydedin.`,
      ],
    },
    android: {
      heading: `Android’de`,
      steps: [
        `**Alarmın etkin olduğunu** ve tekrar günlerinin bugünü kapsadığını kontrol edin.`,
        `**Bildirimlere izin verin.** Ayarlar → Uygulamalar → WakeSharp → Bildirimler. Çalma ekranı tam ekran bir bildirim olarak gelir; bildirimleri engellemek onu da bastırır.`,
        `**WakeSharp için pil optimizasyonunu kapatın.** Ayarlar → Uygulamalar → WakeSharp → Pil → _Kısıtlanmamış_. Saf Android’den daha agresif olan Samsung, Xiaomi, OPPO, vivo ve OnePlus cihazlarda açık ara en yaygın neden budur. Samsung’da ayrıca Ayarlar → Pil → Arka plan kullanım sınırları bölümünü kontrol edin ve WakeSharp’ın “Uyuyan uygulamalar” ya da “Derin uykudaki uygulamalar” listesinde olmadığından emin olun.`,
        `**Rahatsız Etmeyin’in Tamamen sessiz olarak ayarlanmadığını kontrol edin.** Yalnızca öncelikli ve Yalnızca alarmlar modları alarmları geçirir; Tamamen sessiz onları da susturur ve hiçbir uygulama bunu aşamaz.`,
        `**WakeSharp için “Zorla durdur” kullanmayın.** Zorla durdurmak, uygulamayı yeniden açana kadar zamanlanmış alarmlarını iptal eder.`,
        `**Yeniden başlatmadan sonra WakeSharp’ı bir kez açın.** Alarmlarınızı açılışta yeniden kurar, ama uygulamayı açmak eşitlemenin çalıştığını garantiler.`,
      ],
    },
    warning: `**Uyanmak gerçekten önemliyse başka bir cihazda ikinci bir alarm kurun.** WakeSharp alarmları işletim sistemi aracılığıyla zamanlar ve çalıp çalmayacaklarına işletim sistemi karar verir. Bkz. [güvenlik bildirimi](terms-safety).`,
  },

  ringsThrough: {
    heading: `WakeSharp Sessiz mod, Odak ve Rahatsız Etmeyin açıkken gerçekten çalıyor mu?`,
    body: `Normal koşullarda evet — uygulamanın bütün amacı bu ve her platformda yerleşik saat uygulamasının kullandığı mekanizmanın aynısıdır.`,
    items: [
      `**iPhone’da** WakeSharp, **alarm izni verdikten sonra** Sessiz mod ve Odak açıkken çalmayı destekleyen Apple’ın AlarmKit’ini kullanır. İzni reddeder ya da geri alırsanız WakeSharp hiçbir alarm zamanlayamaz.`,
      `**Android’de** alarm özel alarm ses kanalında çalar; bu kanal sessiz modda da, Rahatsız Etmeyin alarmlara izin veriyorsa o açıkken de çalar (Tamamen sessiz modu, alarmlar dahil her sesi kapatır). Ayrıca kilit ekranının üzerinde tam ekran bir uyarı gösterir — **tam zamanlı alarm, bildirim ve kilit ekranı izinleri yerindeyse**. Alarm ses kanalının kendisi için ek bir izin istemi yoktur; ama engellenmiş bir bildirim ya da bir pil kısıtlaması uyarıyı yine de durdurabilir.`,
    ],
    limit: `İki platformun da yapamadığı şey, kapalı, pili bitmiş ya da uygulamanın izinleri geri alınmış bir telefonda çalmaktır.`,
  },

  missions: {
    heading: `Görevler ve erteleme`,
    items: [
      `**Görev**, size sabahı kazandıran şeydir ve bir düzineden fazla görev var: _Zihin Oyunları_ ve _Renk Çatışması_ gibi aritmetik ve hafıza bulmacaları, bir önceki akşam seçtiğiniz noktanın fotoğrafı (_Fotoğraf Kanıtı_), odanın öbür ucundaki gerçek bir nesne (_Bir Nesne Tara_, _Getir_), adımlar (_Yürüyerek Uyan_), pencere önünde gün ışığı (_İlk Işık_), bir cümle yazmak (_Yazarak Uyan_) ya da sesli yanıt vermek (_Yediyle Sayma_, _Beş Tane Say_). _Beni Şaşırt_ her sabah farklı bir görev seçer. Bir alarm, sizin belirlediğiniz sırayla art arda birkaç görev isteyebilir.`,
      `**Noktalarım ve kodlarım**, _Bir Nesne Tara_ görevinin kişiselleştiği yerdir. Yürüyerek gideceğiniz bir yeri fotoğraflayın — çaydanlık ya da ön kapı gibi — ya da sabahın sizi göndermesi gereken yere, örneğin banyo aynasına veya kahve kutusuna yapıştırdığınız bir QR ya da barkodu kaydedin. Ardından bir alarm o belirli hedefi isteyebilir. Kendi başına bir görev değil, tarama görevinin _içindeki_ bir özelliktir; ne fotoğraf ne de kod saklanır — yalnızca her birinin bir parmak izi.`,
      `**Bir görev o sabah çalışamazsa** — bitmiş bir kamera, adım sayarı olmayan bir telefon — WakeSharp çalışabilecek bir göreve geçer; böylece bitiremeyeceğiniz bir alarmla baş başa kalmazsınız.`,
      `**Ertelemek ve durdurmak sabahı bitirmez.** Alarmı nasıl susturursanız susturun, sabah ancak görev tamamlandığında sayılır. Telefonunuzun kendi denetimleri her zaman çalışır: örneğin telefonu kapatmak asla engellenmez.`,
    ],
  },

  smartAlarms: {
    heading: `Akıllı takvim alarmları`,
    body: `Bir akıllı kural, ilk toplantınızdan belirlediğiniz sayıda dakika önce çalar; sizin seçtiğiniz en erken ve en geç uyanma saatleri arasında sınırlanır. WakeSharp takviminizi gece boyunca yeniden kontrol eder; toplantı kayarsa alarm da kayar. Takvim erişimini reddederseniz diğer her şey yine çalışır — saatleri kendiniz ayarlarsınız, o kadar. Etkinlikleriniz cihazınızdan asla çıkmaz; bkz. [Gizlilik Politikası](privacy).`,
    limits: `Vardiya rotasyonu, haftalık olmayan düzenler içindir — bir başlangıç tarihinden itibaren 4 gün çalışma / 4 gün izin, her aşamanın kendi saati ve gece yatmadan önce kontrol edebilmeniz için bir önizleme takvimi.`,
  },

  sharpness: {
    heading: `Zindelik puanı`,
    body: `Bir görevden sonra isteğe bağlı bir ısınma çalıştırabilirsiniz: her sabah beş zihin oyunundan üçü, dönüşümlü olarak, toplamda yaklaşık iki dakika; görevin az önce size oynattığı oyun atlanır. Puanınız başkalarına göre değil, kendi hareketli taban değerinize göre ölçülür; bu yüzden uygulama sizin normalinizi öğrendikçe 100 civarında oturur. Kötü bir sabah, dünkü hâlinize göre bir düşüştür, o kadar. Bu uygulama içi bir puandır; klinik ya da bilişsel bir test değildir.`,
    physical: `**Puan ısınmadan gelir.** Sizi yataktan kaldıran görevdir; Zindelik puanınızı ise ardından gelen isteğe bağlı zihin ısınması üretir. Böylece mutfağa uzun bir yürüyüş asla aleyhinize sayılmaz.`,
  },

  backup: {
    heading: `Yedekleme ve yeni bir telefona geçiş`,
    body: `Açmanız gereken bir hesap yok ve hiçbir şey bir hesabın arkasına kilitlenmiş değil. İsterseniz **Apple** veya **Google** ile giriş yapabilirsiniz — seçenekler yalnızca bunlardır, e-posta ve parolayla giriş yoktur — tek bir amaçla: alarmlarınızı, ayarlarınızı, puanlarınızı ve serinizi yedeklemek, yeni bir telefonda geri gelsinler diye.`,
    items: [
      `**Varsayılan olarak kapalıdır** ve her özellik oturum açmadan çalışır. Yedekleme, verileriniz değiştikten sonra sessizce çalışır ve bir alarm çalmak için asla ağı beklemez.`,
      `**Yeni bir telefona geçmek için** WakeSharp’ı yükleyin, aynı Apple veya Google hesabıyla giriş yapın ve geri yükleyin. Yeni cihazda zaten bulunan daha yeni değişiklikler korunur.`,
      `**Oturumu kapatmak** her şeyi telefonunuzda tutar ve yalnızca yedeklemeyi durdurur.`,
      `**Hesabı silmek** — uygulamada _Ayarlar → Hesap → Hesabı sil_ yolundan ya da [wakesharp.app/account/delete](account-delete) adresinde anlatıldığı gibi — yedeği ve girişi kalıcı olarak kaldırır; telefonunuzdaki veriler ise korunur.`,
    ],
    subscription: `Abonelik bunların hepsinden ayrıdır: App Store veya Google Play hesabınıza bağlıdır; bu yüzden “Satın alımları geri yükle”, WakeSharp’a hiç giriş yapmasanız bile WakeSharp Sınırsız’ı geri getirir.`,
  },

  purchases: {
    heading: `Satın almalar ve WakeSharp Sınırsız`,
    items: [
      `**WakeSharp Sınırsız** uygulamanın tamamıdır: tüm uyanma görevleri, günlük ısınma rotasyonu, Zindelik geçmişinizin tamamı, akıllı takvim alarmları, vardiya rotasyonları ve profiller, tüm Lark sahneleri ve duvar kâğıtları. Yeni aboneler yıllık planı **{trialDays} gün ücretsiz deneyerek** başlayabilir, ardından yılda {annual} öder; ya da deneme süresi olmayan aylık planı ayda {monthly} karşılığında seçebilir. WakeSharp reklam göstermez.`,
      `**Lifetime** (ömür boyu) tek seferlik bir satın almaydı ve satın alan herkes için geçerliliğini korur: hiç yenilenmez ve iptal edilecek bir şey yoktur.`,
      `**Bir satın almayı geri yüklemek:** Abonelik ekranını açın ve _Geri yükle_ düğmesine dokunun. Satın aldığınız Apple veya Google hesabıyla giriş yapmış olduğunuzdan emin olun.`,
      `**İptal etmek:** [App Store abonelikleri](apple-subs) veya [Google Play abonelikleri](google-subs) üzerinden, istediğiniz zaman; ücretsiz deneme süresi içinde de. Uygulamayı silmek aboneliği iptal etmez.`,
      `**İade işlemleri** biz değil, Apple veya Google tarafından yürütülür — ama bir şeyler ters gittiyse bana yazın, elimden geldiğince yardımcı olurum.`,
    ],
  },

  deleting: {
    heading: `Verilerinizi silmek`,
    body: `WakeSharp’ın kaydettiği her şey telefonunuzda yaşar. Uygulamayı kaldırmak hepsini siler ve bizde kopyası yoktur. Ödeme işlemcimizin tuttuğu anonim abonelik kaydı için bkz. [verilerin ne kadar süre saklandığı](privacy).`,
  },

  feedback: {
    heading: `Hatalar, geri bildirim ve özellik istekleri`,
    body: `Hepsine açığız: [{email}](email). Bir hata için eklenecek en yararlı şeyler telefon modeliniz, işletim sistemi sürümünüz, ne beklediğiniz ve bunun yerine ne olduğudur. Bir alarm çalmadıysa, kurulduğu saat ile telefonu bulduğunuz saat çok işe yarar.`,
  },
} satisfies typeof en;
