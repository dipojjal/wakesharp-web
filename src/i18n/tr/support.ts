import type { en } from '../en';
export const support = {
  "title": "WakeSharp Desteği: Çalmayan Alarm, Görevler ve Ödemeler",
  "description": "WakeSharp için yardım alın: bir alarm neden çalmayabilir, görevler ve Zindelik puanı nasıl çalışır, aboneliğinizi nasıl yönetirsiniz.",
  "heading": "Destek",
  "intro": "WakeSharp küçük bir ekiptir ve e-postaları bir insan yanıtlar.",
  "getInTouch": {
    "heading": "İletişime geçin",
    "body": "[{email}](email) adresine yazın. Genellikle **2–3 iş günü** içinde yanıtlarım. Telefon modelinizi, işletim sistemi sürümünüzü ve uygulamanın Ayarlar bölümündeki WakeSharp sürümünü eklemeniz neredeyse her zaman daha hızlı bir yanıt almanızı sağlar."
  },
  "requirements": {
    "heading": "Gereksinimler",
    "body": "WakeSharp, iPhone’da {ios}, Android’de {android} gerektirir. Saat uygulamaları watchOS 26 veya Wear OS 3 gerektirir."
  },
  "didntRing": {
    "heading": "Alarmım çalmadı",
    "callout": "**Buradan değil, uygulamadan başlayın.** WakeSharp → Ayarlar → _Alarm güvenilirliği_ bölümünü açın. Telefonunuzun anlık durumunu okur (izinler, alarm ses düzeyi, Rahatsız Etmeyin, bildirim ayarları, kilit ekranının üzerinde görünme, pil kısıtlamaları) ve önce net bir hüküm verir: çalacak, çalmayabilir ya da çalamaz. Çözüm tek dokunuş uzaktaysa o dokunuşu sunar; telefon bize bir şeyi söylemiyorsa yeşil onay işareti göstermek yerine bunu açıkça belirtir. Ayrıca yatmadan önce de çalışır ve bulduğu en kötü şeyi işaretler.",
    "report": "Bir alarm zaten kaçırıldıysa WakeSharp o sabah bir rapor gösterir; kanıtlayabildiği yerde nedeni adlandırır (izin geri alınmış, alarm ses düzeyi sıfırda, Tamamen sessiz modu, telefon kapalıydı) kanıtlayamadığı yerde ise “Nedenini bilemedik” der. Aşağıdaki kontrol listeleri, bilemediği durumlar içindir.",
    "iphone": {
      "heading": "iPhone’da",
      "steps": [
        "**Alarmın gerçekten etkin olduğunu** ana ekrandan kontrol edin; tekrar günlerinin bugünü kapsadığından da emin olun.",
        "**Alarm iznini kontrol edin.** Ayarlar → WakeSharp. Alarm erişimi reddedildiyse WakeSharp hiçbir şey zamanlayamaz. İzni açın ve alarmı yeniden kaydedin.",
        "**Ses düzeyini ve sessiz anahtarını kontrol edin.** WakeSharp Sessiz mod ve Odak açıkken de çalar; ama kapalı ya da pili bitmiş bir cihazda çalamaz.",
        "**Bluetooth’u kontrol edin.** Telefonunuz hâlâ bir kulaklığa ya da arabaya bağlıysa alarm orada çalıyor olabilir.",
        "**Telefonu yeniden başlatın** ve sorun sürerse alarmı yeniden kaydedin."
      ]
    },
    "android": {
      "heading": "Android’de",
      "steps": [
        "**Alarmın etkin olduğunu** ve tekrar günlerinin bugünü kapsadığını kontrol edin.",
        "**Bildirimlere izin verin.** Ayarlar → Uygulamalar → WakeSharp → Bildirimler. Çalma ekranı tam ekran bir bildirim olarak gelir; bildirimleri engellemek onu da bastırır.",
        "**WakeSharp için pil optimizasyonunu kapatın.** Ayarlar → Uygulamalar → WakeSharp → Pil → _Kısıtlanmamış_. Saf Android’den daha agresif olan Samsung, Xiaomi, OPPO, vivo ve OnePlus cihazlarda açık ara en yaygın neden budur. Samsung’da ayrıca Ayarlar → Pil → Arka plan kullanım sınırları bölümünü kontrol edin ve WakeSharp’ın “Uyuyan uygulamalar” ya da “Derin uykudaki uygulamalar” listesinde olmadığından emin olun.",
        "**Rahatsız Etmeyin’in Tamamen sessiz olarak ayarlanmadığını kontrol edin.** Yalnızca öncelikli ve Yalnızca alarmlar modları alarmları geçirir; Tamamen sessiz onları da susturur ve hiçbir uygulama bunu aşamaz.",
        "**WakeSharp için “Zorla durdur” kullanmayın.** Zorla durdurmak, uygulamayı yeniden açana kadar zamanlanmış alarmlarını iptal eder.",
        "**Yeniden başlatmadan sonra WakeSharp’ı bir kez açın.** Alarmlarınızı açılışta yeniden kurar, ama uygulamayı açmak eşitlemenin çalıştığını garantiler."
      ]
    },
    "warning": "**Uyanmak gerçekten önemliyse başka bir cihazda ikinci bir alarm kurun.** WakeSharp alarmları işletim sistemi aracılığıyla zamanlar ve çalıp çalmayacaklarına işletim sistemi karar verir. Bkz. [güvenlik bildirimi](terms-safety).",
    "guidesHeading": "Ayrıntılı rehberler"
  },
  "ringsThrough": {
    "heading": "WakeSharp Sessiz mod, Odak ve Rahatsız Etmeyin açıkken gerçekten çalıyor mu?",
    "body": "Normal koşullarda evet: uygulamanın bütün amacı bu ve her platformda yerleşik saat uygulamasının kullandığı mekanizmanın aynısıdır.",
    "items": [
      "**iPhone’da** WakeSharp, **alarm izni verdikten sonra** Sessiz mod ve Odak açıkken çalmayı destekleyen Apple’ın AlarmKit’ini kullanır. İzni reddeder ya da geri alırsanız WakeSharp hiçbir alarm zamanlayamaz.",
      "**Android’de** alarm özel alarm ses kanalında çalar; bu kanal sessiz modda da, Rahatsız Etmeyin alarmlara izin veriyorsa o açıkken de çalar (Tamamen sessiz modu, alarmlar dahil her sesi kapatır). Ayrıca kilit ekranının üzerinde tam ekran bir uyarı gösterir: **tam zamanlı alarm, bildirim ve kilit ekranı izinleri yerindeyse**. Alarm ses kanalının kendisi için ek bir izin istemi yoktur; ama engellenmiş bir bildirim ya da bir pil kısıtlaması uyarıyı yine de durdurabilir."
    ],
    "limit": "İki platformun da yapamadığı şey, kapalı, pili bitmiş ya da uygulamanın izinleri geri alınmış bir telefonda çalmaktır."
  },
  "missions": {
    "heading": "Görevler ve erteleme",
    "items": [
      "Aşağıdaki görevlerden birini seç veya birkaçını sıraya koy. Bu liste iPhone 2.14’ün herkese açık seçimidir. Kamera, hareket ve ses görevleri ilgili izinleri ve desteklenen donanımı gerektirir.",
      "Şişe, kupa veya lavabo gibi bir hedef seç. Alarm çaldığında kamerayı o nesneye yönelt. Yeşil eşleşme onayı, WakeSharp’ın nesneyi tanıdığını gösterir. Nesne tanıma telefonunda çalışır.",
      "**Bir görev o sabah çalışamazsa** (bitmiş bir kamera, adım sayarı olmayan bir telefon), WakeSharp çalışabilecek bir göreve geçer; böylece bitiremeyeceğiniz bir alarmla baş başa kalmazsınız.",
      "iPhone 2.14’te durdurmak veya ertelemek alarmı bir dakika geciktirir. Görev tamamlanmazsa en fazla bir saat tekrarlanabilir. Telefonun kendi kontrolleri çalışmaya devam eder."
    ]
  },
  "smartAlarms": {
    "heading": "Akıllı takvim alarmları",
    "body": "Bir akıllı kural, ilk toplantınızdan belirlediğiniz sayıda dakika önce çalar; sizin seçtiğiniz en erken ve en geç uyanma saatleri arasında sınırlanır. WakeSharp takviminizi gece boyunca yeniden kontrol eder; toplantı kayarsa alarm da kayar. Takvim erişimini reddederseniz diğer her şey yine çalışır: saatleri kendiniz ayarlarsınız, o kadar. Etkinlikleriniz cihazınızdan asla çıkmaz; bkz. [Gizlilik Politikası](privacy).",
    "limits": "Vardiya rotasyonu, haftalık olmayan düzenler içindir: bir başlangıç tarihinden itibaren 4 gün çalışma / 4 gün izin, her aşamanın kendi saati ve gece yatmadan önce kontrol edebilmeniz için bir önizleme takvimi."
  },
  "sharpness": {
    "heading": "Zindelik puanı",
    "body": "Sharpness, uygulama içindeki günlük bir puandır. Geçmişin, serilerin ve rozetlerinle birlikte incele; Nest’te Lark ile ilerlemeni gör. Bu bir uyku puanı veya tıbbi değerlendirme değildir. Güvenle araç kullanıp çalışabileceğini belirlemez.",
    "physical": "Zihin ısınması isteğe bağlıdır. Matematik Problemleri, Hafıza Eşleştirme ve Sıra Hatırlama alarm görevi de olabilir. Word Dash ve Reaction Tap ısınma oyunlarıdır, alarm görevi değildir."
  },
  "backup": {
    "heading": "Yedekleme ve yeni bir telefona geçiş",
    "body": "WakeSharp hesabı gerekmez. Apple veya Google ile isteğe bağlı giriş; alarmları, geçmişi, tercihleri ve küçük fotoğraf hedefi ön izlemelerini yedekler. Fotoğraf eşleştirme ve takvim işlemleri cihazda yapılır. Takvim etkinliklerinin içeriği cihazda kalır. Ayrıntılar gizlilik politikasındadır.",
    "items": [
      "**Varsayılan olarak kapalıdır** ve her özellik oturum açmadan çalışır. Yedekleme, verileriniz değiştikten sonra sessizce çalışır ve bir alarm çalmak için asla ağı beklemez.",
      "**Yeni bir telefona geçmek için** WakeSharp’ı yükleyin, aynı Apple veya Google hesabıyla giriş yapın ve geri yükleyin. Yeni cihazda zaten bulunan daha yeni değişiklikler korunur.",
      "**Oturumu kapatmak** her şeyi telefonunuzda tutar ve yalnızca yedeklemeyi durdurur.",
      "**Hesabı silmek** (uygulamada _Ayarlar → Hesap → Hesabı sil_ yolundan ya da [wakesharp.app/account/delete](account-delete) adresinde anlatıldığı gibi) yedeği ve girişi kalıcı olarak kaldırır; telefonunuzdaki veriler ise korunur."
    ],
    "subscription": "Abonelik bunların hepsinden ayrıdır: App Store veya Google Play hesabınıza bağlıdır; bu yüzden “Satın alımları geri yükle”, WakeSharp’a hiç giriş yapmasanız bile WakeSharp Sınırsız’ı geri getirir."
  },
  "purchases": {
    "heading": "Satın almalar ve WakeSharp Sınırsız",
    "items": [
      "**WakeSharp Sınırsız** uygulamanın tamamıdır: tüm uyanma görevleri, günlük ısınma rotasyonu, Zindelik geçmişinizin tamamı, akıllı takvim alarmları, vardiya rotasyonları ve profiller, tüm Lark sahneleri ve duvar kâğıtları. Yeni aboneler yıllık planı **{trialDays} gün ücretsiz deneyerek** başlayabilir, ardından yılda {annual} öder; ya da deneme süresi olmayan aylık planı ayda {monthly} karşılığında seçebilir. WakeSharp reklam göstermez.",
      "**Lifetime** (ömür boyu) tek seferlik bir satın almaydı ve satın alan herkes için geçerliliğini korur: hiç yenilenmez ve iptal edilecek bir şey yoktur.",
      "**Bir satın almayı geri yüklemek:** Abonelik ekranını açın ve _Geri yükle_ düğmesine dokunun. Satın aldığınız Apple veya Google hesabıyla giriş yapmış olduğunuzdan emin olun.",
      "**İptal etmek:** [App Store abonelikleri](apple-subs) veya [Google Play abonelikleri](google-subs) üzerinden, istediğiniz zaman; ücretsiz deneme süresi içinde de. Uygulamayı silmek aboneliği iptal etmez.",
      "**İade işlemleri** biz değil, Apple veya Google tarafından yürütülür, ama bir şeyler ters gittiyse bana yazın, elimden geldiğince yardımcı olurum."
    ]
  },
  "deleting": {
    "heading": "Verilerinizi silmek",
    "body": "Uygulamayı kaldırmak yerel verileri siler, ancak bulut yedeğini veya aboneliği silmez. Yedeği Ayarlar → Hesap → Hesabı sil yolundan ya da hesap silme sayfasından kaldır. Aboneliği mağazada ayrıca yönet. [WakeSharp](privacy)."
  },
  "feedback": {
    "heading": "Hatalar, geri bildirim ve özellik istekleri",
    "body": "Hepsine açığız: [{email}](email). Bir hata için eklenecek en yararlı şeyler telefon modeliniz, işletim sistemi sürümünüz, ne beklediğiniz ve bunun yerine ne olduğudur. Bir alarm çalmadıysa, kurulduğu saat ile telefonu bulduğunuz saat çok işe yarar."
  }
} satisfies typeof en.support;
