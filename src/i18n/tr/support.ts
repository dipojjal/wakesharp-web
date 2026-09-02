import { support as en } from '../en/support';

/**
 * /support in Turkish. Link keys are kept as in English:
 * email, terms-safety, privacy, account-delete, apple-subs, google-subs.
 * In-app labels stay in English (the app ships in English) with a Turkish gloss;
 * iOS and Android settings use Apple's and Google's Turkish names.
 */
export const support = {
  title: `Destek — WakeSharp`,
  description: `WakeSharp için yardım alın: bir alarm neden çalmayabilir, görevler ve Sharpness Score nasıl çalışır, aboneliğinizi nasıl yönetirsiniz.`,
  heading: `Destek`,
  intro: `WakeSharp küçük bir ekiptir ve e-postaları bir insan yanıtlar.`,

  getInTouch: {
    heading: `İletişime geçin`,
    body: `[{email}](email) adresine yazın. Genellikle **2–3 iş günü** içinde yanıtlarım. Telefon modelinizi, işletim sistemi sürümünüzü ve uygulamanın Settings (Ayarlar) bölümündeki WakeSharp sürümünü eklemeniz neredeyse her zaman daha hızlı bir yanıt almanızı sağlar.`,
  },

  requirements: {
    heading: `Gereksinimler`,
    body: `WakeSharp, iPhone’da {ios}, Android’de {android} gerektirir. Saat uygulamaları watchOS 26 veya Wear OS 3 gerektirir.`,
  },

  didntRing: {
    heading: `Alarmım çalmadı`,
    callout: `**Buradan değil, uygulamadan başlayın.** WakeSharp → Settings → _Alarm reliability_ (Ayarlar → alarm güvenilirliği) bölümünü açın. Telefonunuzun anlık durumunu okur — izinler, alarm ses düzeyi, Rahatsız Etmeyin, bildirim ayarları, kilit ekranının üzerinde görünme, pil kısıtlamaları — ve önce net bir hüküm verir: çalacak, çalmayabilir ya da çalamaz. Çözüm tek dokunuş uzaktaysa o dokunuşu sunar; telefon bize bir şeyi söylemiyorsa yeşil onay işareti göstermek yerine bunu açıkça belirtir. Ayrıca yatmadan önce de çalışır ve bulduğu en kötü şeyi işaretler.`,
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
      `**Android’de** alarm, Rahatsız Etmeyin’in susturmadığı özel alarm ses kanalında çalar ve kilit ekranının üzerinde tam ekran bir uyarı gösterir — **tam zamanlı alarm, bildirim ve kilit ekranı izinleri yerindeyse**. Alarm ses kanalının kendisi için ek bir izin istemi yoktur; ama engellenmiş bir bildirim ya da bir pil kısıtlaması uyarıyı yine de durdurabilir.`,
    ],
    limit: `İki platformun da yapamadığı şey, kapalı, pili bitmiş ya da uygulamanın izinleri geri alınmış bir telefonda çalmaktır.`,
  },

  missions: {
    heading: `Görevler, erteleme ve Strict Mode`,
    items: [
      `**Görev**, sabah için size tam puanı kazandıran şeydir. İkisi ücretsizdir: kolay, standart veya zor düzeyde üç hızlı aritmetik problemi olan _Mind Games_ (zihin oyunları) ve tek bir fotoğraf isteyen _Photo Proof_ (fotoğrafla kanıt) — günün dönüşümlü isteği ya da o alarm için kaydettiğiniz bir hedef. WakeSharp Plus; _Memory Match_ (hafıza eşleştirme), _Sequence Recall_ (dizi hatırlama), _Scan an Object_ (bir nesne tara), _Walk It Off_ (yürüyerek uyanma) ve sizin yerinize birini seçip o gün o alarm için sabitleyen, böylece bir gece önceden sahneleyemediğiniz _Surprise Me_ (beni şaşırt) görevlerini ekler. **Seçim, bir alarm oluştururken ya da düzenlerken kilitlenir, alarm çaldığında asla** — zaten bir Plus görevine ayarlanmış bir alarm onu çalıştırmaya devam eder.`,
      `**My spots & codes** (yerlerim ve kodlarım), _Scan an Object_ görevinin kişiselleştiği yerdir. Yürüyerek gideceğiniz bir yeri fotoğraflayın — çaydanlık ya da ön kapı gibi — ya da sabahın sizi göndermesi gereken yere, örneğin banyo aynasına veya kahve kutusuna yapıştırdığınız bir QR ya da barkodu kaydedin. Ardından bir alarm o belirli hedefi isteyebilir. Kendi başına bir görev değil, tarama görevinin _içindeki_ bir özelliktir; ne fotoğraf ne de kod saklanır — yalnızca her birinin bir parmak izi.`,
      `**Her görevin bir çıkış yolu vardır** ve bu yol Mind Games’te tam puanla biter; böylece bitmiş bir kamera ya da adım sayarı olmayan bir telefon, sizi susturamadığınız bir alarmla asla baş başa bırakamaz.`,
      `**Erteleme**, sabit bir kural değil, alarm başına bir ayardır. _Off_ (kapalı) düğmeyi tamamen kaldırır. _Standard_ (standart) beşer dakikalık iki ertelemeye izin verir; her biri 5 Sharpness puanına mal olur ve gün için −10’dan kötüsü olmaz. _Tighten_ (sıkılaştır) üç ertelemeye izin verir — 10, sonra 5, sonra 2 dakika — her seferinde görevin zorluğunu artırır ve −15’te durur. Üç ön ayar da ücretsizdir; tamamen özel bir politika WakeSharp Plus’ın parçasıdır.`,
      `**Strict Mode** (katı mod), desteklenen cihazlarda dört koruma alarmını önceden zamanlar — 45 saniye sonra, ardından 4, 8 ve 12. dakikalarda. Bunlar önceden ayırtılmış gerçek alarmlardır; yani uygulama çalışıyor olsun ya da olmasın çalarlar ve görevi tamamlamak henüz çalmamış olanları iptal eder. Sonsuz bir döngü değil, dört yeniden çalmadır; sistemin kendi durdurma düğmesi her birini yine sonlandırır. Alarm başına açılır.`,
      `**Görev yapmadan kapatmak** mümkündür — sistemin kendi durdurma düğmesi her zaman çalışır. WakeSharp bir sonraki açışınızda borçlu olduğunuz görevi hatırlatan bir ekran gösterir; böylece seriniz yine de onarılabilir.`,
    ],
  },

  smartAlarms: {
    heading: `Akıllı takvim alarmları`,
    body: `Bir akıllı kural, ilk toplantınızdan belirlediğiniz sayıda dakika önce çalar; sizin seçtiğiniz en erken ve en geç uyanma saatleri arasında sınırlanır. WakeSharp takviminizi gece boyunca yeniden kontrol eder; toplantı kayarsa alarm da kayar. Takvim erişimini reddederseniz diğer her şey yine çalışır — saatleri kendiniz ayarlarsınız, o kadar. Etkinlikleriniz cihazınızdan asla çıkmaz; bkz. [Gizlilik Politikası](privacy).`,
    limits: `Ücretsiz sürüm bir akıllı kural, bir vardiya rotasyonu ve bir alarm profili içerir; Plus üç sınırı da kaldırır. Vardiya rotasyonu, haftalık olmayan düzenler içindir — bir başlangıç tarihinden itibaren 4 gün çalışma / 4 gün izin, her aşamanın kendi saati ve gece yatmadan önce kontrol edebilmeniz için bir önizleme takvimi.`,
  },

  sharpness: {
    heading: `Sharpness Score (zindelik puanı)`,
    body: `Bir görevden sonra isteğe bağlı bir ısınma çalıştırabilirsiniz. Ücretsiz sürüm, Mind Games ve Reaction Tap oyunlarından oluşan iki oyunluk bir havuzdan bir oyun çeker; Plus her sabah beş oyundan üçünü dönüşümlü olarak oynatır, toplamda yaklaşık iki dakika. Her iki durumda da ısınma, görevin az önce size oynattığı oyunu atlar; yani alarmı susturmak için aritmetik çözmek, size ısınma olarak asla daha fazla aritmetik vermez. Puanınız başkalarına göre değil, kendi hareketli taban değerinize göre ölçülür; bu yüzden uygulama sizin normalinizi öğrendikçe 100 civarında oturur. Kötü bir sabah, dünkü hâlinize göre bir düşüştür, o kadar. Bu klinik ya da bilişsel bir test değildir.`,
    physical: `**Fiziksel görevler puanı beslemez.** Scan an Object, Walk It Off ve Photo Proof eksiksiz kaydedilir; ama yalnızca kendileriyle karşılaştırılırlar. Banyoya yürümek otuz saniye, zihinden bir toplama iki saniye sürer; birini doğruluk ve hızdan kurulu bir puana katmak, kusursuz bir sabahı tabana yakın bir yere çivilerdi. Kalkmak sayılır — sadece zindelik olarak değil.`,
  },

  backup: {
    heading: `Yedekleme ve yeni bir telefona geçiş`,
    body: `Açmanız gereken bir hesap yok ve hiçbir şey bir hesabın arkasına kilitlenmiş değil. İsterseniz **Apple** veya **Google** ile giriş yapabilirsiniz — seçenekler yalnızca bunlardır, e-posta ve parolayla giriş yoktur — tek bir amaçla: alarmlarınızı, ayarlarınızı, puanlarınızı ve serinizi yedeklemek, yeni bir telefonda geri gelsinler diye.`,
    items: [
      `**Varsayılan olarak kapalıdır** ve her özellik oturum açmadan çalışır. Yedekleme, verileriniz değiştikten sonra sessizce çalışır ve bir alarm çalmak için asla ağı beklemez.`,
      `**Yeni bir telefona geçmek için** WakeSharp’ı yükleyin, aynı Apple veya Google hesabıyla giriş yapın ve geri yükleyin. Yeni cihazda zaten bulunan daha yeni değişiklikler korunur.`,
      `**Oturumu kapatmak** her şeyi telefonunuzda tutar ve yalnızca yedeklemeyi durdurur.`,
      `**Hesabı silmek** — uygulamada _Settings → Account → Delete account_ (Ayarlar → Hesap → Hesabı sil) yolundan ya da [wakesharp.app/account/delete](account-delete) adresinde anlatıldığı gibi — yedeği ve girişi kalıcı olarak kaldırır; telefonunuzdaki veriler ise korunur.`,
    ],
    subscription: `Abonelik bunların hepsinden ayrıdır: App Store veya Google Play hesabınıza bağlıdır; bu yüzden Restore Purchases (Satın Alınanları Geri Yükle), WakeSharp’a hiç giriş yapmasanız bile Plus’ı geri getirir.`,
  },

  purchases: {
    heading: `Satın almalar ve WakeSharp Plus`,
    items: [
      `**Plus’ın eklediği:** Mind Games ve Photo Proof dışındaki tüm uyanma görevleri, her sabah dönüşümlü üç ısınma oyunu, tüm Sharpness geçmişiniz, sınırsız akıllı takvim alarmı ve Lark (maskot kuşumuz) sahneleri, alarm duvar kâğıtları ve kutlamalar. Ayrıca alarm profilleri ve vardiya rotasyonlarındaki birer tane sınırını kaldırır, iki Plus duvar kâğıdını ve dört Plus Lark sahnesini açar ve özel bir erteleme politikası yazmanıza izin verir. **Alarmınız sonsuza dek ücretsiz çalar. Reklam yok.** Kurduğunuz her alarm, iki ücretsiz görev, desteklenen cihazlarda Strict Mode, erteleme ön ayarları, 13 alarm sesinin tamamı, seriler ve dondurmalar ve güvenilirlik kontrolü hiçbir ücrete tabi değildir.`,
      `**Plus Lifetime** (ömür boyu) bir abonelik değil, tek seferlik bir satın almadır: hiç yenilenmez ve iptal edilecek bir şey yoktur.`,
      `**Bir satın almayı geri yüklemek:** Plus satın alma ekranını açın ve _Restore_ (Geri Yükle) düğmesine dokunun. Satın aldığınız Apple veya Google hesabıyla giriş yapmış olduğunuzdan emin olun.`,
      `**İptal etmek:** [App Store abonelikleri](apple-subs) veya [Google Play abonelikleri](google-subs). Uygulamayı silmek aboneliği iptal etmez.`,
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
