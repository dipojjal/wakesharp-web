import { home as en } from '../en/home';

/**
 * The Turkish homepage. Headings keep the {pre, accent, post} split; the hero's
 * `post` renders on its own line after a <br />, so the accent closes line one.
 * `{ios}`, `{android}`, `{annual}`, `{monthly}` and `{trialDays}` come from
 * src/config/site.ts.
 *
 * Every claim here has to hold for the build a reader downloads today and for
 * the next one (2.10 through 2.13 as of 2026-09-24), which is why the page
 * describes missions by kind and never how many times the alarm comes back.
 *
 * The app ships in Turkish, so feature, mission and plan names are the app's own
 * Turkish strings (Localizable.xcstrings, GameCatalog.tr.json), never translated
 * afresh. Alt text and gallery captions describe the English screenshots, so they
 * keep the English names printed in the image.
 */
export const home = {
  title: `WakeSharp — Ağır Uyuyanlar İçin Alarm Saati, Görevlerle`,

  hero: {
    /** Rendered inside the <h1>, above the tagline: the query the page targets. */
    kicker: `Ağır uyuyanlar için alarm saati`,
    heading: { pre: `Uyanın, hem de `, accent: `zinde.`, post: `Sadece uyanık değil.` },
    lede: `Erteleme düğmesinden fazlasına ihtiyaç duyan ağır uyuyanlar için. Kaydırmak, yarı baygın birinin bile yapabileceği bir şey; bu yüzden WakeSharp bunun yerine bir görev ister — çözün, fotoğraflayın, yürüyün ya da sesli söyleyin — ve ardından gerçekte ne kadar zinde uyandığınızı puanlar.`,
    phoneAlt: `Gece görünümünde WakeSharp ana ekranı; sabah 6:40 alarmı ve bir akıllı takvim kuralı görünüyor`,
  },

  trust: [
    `iPhone’da Sessiz mod ve Odak açıkken de çalar`,
    `Onu neyin durdurabileceğini söyler — bir gece önceden`,
    `WakeSharp hesabı gerekmez`,
    `Kamera ve takvim işleme telefonunuzda gerçekleşir`,
    `WakeSharp reklam göstermez`,
  ],

  ring: {
    alt: `Çalan WakeSharp alarmı; Start Mission (Göreve Başla) ve Snooze (Ertele) düğmeleriyle`,
    heading: { pre: `Görevi tamamlayın, `, accent: `tam puanı`, post: ` alın` },
    lede: `iPhone’da Apple’ın AlarmKit’i kilit ekranının üzerinde bir sistem alarmı gösterir — alarm erişimi verildikten sonra Sessiz mod ve Odak açıkken de, uygulama zorla kapatılmış olsa bile. Android’de ise alarm ses kanalındaki tam zamanlı alarm sessiz modda da çalar, Rahatsız Etmeyin alarmlara izin veriyorsa o açıkken de; Extra Loud (ekstra yüksek ses) ve bir anda patlamak yerine kademeli yükselen bir ses rampasıyla. Alarmı nasıl susturursanız susturun, sabah ancak görev tamamlandığında sayılır.`,
  },

  reliable: {
    heading: { pre: `Çalacağını `, accent: `bir gece önceden`, post: ` bilin` },
    lede: `Çoğu alarm uygulaması başarısız olduğunu sizinle aynı anda öğrenir. WakeSharp alarmları gerçekten durduran şeyleri kontrol eder — izinler, alarm ses düzeyi, bildirim ayarları, kilit ekranının üzerinde görünme, pil kısıtlamaları — ve söz vermek yerine önce hükmünü verir.`,
    items: [
      { title: `Kontrol listesi değil, hüküm`, body: `En üstte tek satır: çalacak, çalmayabilir ya da çalamaz.` },
      { title: `Göremediği konusunda dürüst`, body: `Telefonun bize söylemediği yerde bunu açıkça belirtir — asla yeşil onay işareti göstermez.` },
      { title: `Mümkün olan yerde tek dokunuşla çözüm`, body: `Olmayan yerde ise açık, sade talimatlar.` },
      { title: `“Çalmadı” bir yanıt alır`, body: `Kanıtlanabilir neden — ya da nedenini bilemediğimizin itirafı.` },
    ],
    note: `Uygulamanın Ayarlar bölümündedir ve yatmadan önceki hatırlatıcı en kötü bulguyu da içine katar; böylece düzeltmek için hâlâ vakit varken görürsünüz.`,
  },

  smart: {
    alt: `İlk toplantıdan 90 dakika önce çalacak şekilde ayarlanmış akıllı alarm kuralı düzenleyicisi`,
    heading: { pre: `Sizi `, accent: `ilk toplantınızdan`, post: ` önce uyandırır` },
    lede: `“İlk toplantımdan 90 dakika önce çal.” WakeSharp takviminizi cihazınızın üzerinde okur, gece boyunca yeniden kontrol eder ve toplantı kayarsa alarmı da kaydırır. Salt okunur, isteğe bağlı, hiçbir zaman aktarılmaz.`,
    shifts: `Her hafta da bir hafta değildir. Vardiya rotasyonları haftalık olmayan düzenleri halleder — iki gün gündüz, iki gece, dört gün izin — bir önizleme takvimi ve hiçbir şeyi silmeden tek bir tarihi atlama imkânıyla. Profiller iş, tatil ya da nöbet için bir alarm setinin tamamını tek seferde değiştirir. Arama, sıralama ve Bugün görünümü, alarm sayısı arttığında listeyi düzenli tutar.`,
    labels: `Ne için uyandığınızı söyleyin — antrenman, işe gidiş, kahvaltı — ve etiket kendini yazar.`,
  },

  mission: {
    alt: `Mind Games görevi: alarmı susturmak için 9 eksi 4’ü çözün`,
    heading: { pre: `Sizi `, accent: `yataktan kaldıran`, post: ` görevler` },
    lede: `Sabahın sayılması için bir şey olması gerekir; neyin olacağını siz seçersiniz: aritmetik, bir bulmaca, dün akşam seçtiğiniz noktanın fotoğrafı, gerçek adımlar ya da sesli söylenen bir yanıt. Bir alarm, sizin belirlediğiniz sırayla art arda birkaç görev isteyebilir; biri o sabah çalışamazsa — bitmiş bir kamera, adım sayarı olmayan bir telefon — WakeSharp çalışabilecek bir göreve geçer.`,
    /**
     * Every mission the alarm editor offers (GameCatalog.json entries with
     * `supportsMission`), grouped by what they ask of you. `kind` is the small
     * label in each card's corner, using the app's own category names (Zihin,
     * Kamera, Hareket, Ses). Names and one-liners follow the app's
     * GameCatalog.tr.json; claims-matrix.md rules the English `blurb`s Supported
     * as written.
     */
    missions: [
      { name: `Zihin Oyunları`, kind: `Zihin`, body: `Doğru yapmanız gereken hızlı aritmetik turları.` },
      { name: `Hafıza Eşleme`, kind: `Zihin`, body: `Kartları çevirin ve her çifti bulun.` },
      { name: `Sıra Hatırlama`, kind: `Zihin`, body: `Her turda uzayan dokunma desenini tekrarlayın.` },
      { name: `Renk Çatışması`, kind: `Zihin`, body: `Kelimeye değil, mürekkebin rengine dokunun.` },
      { name: `Yazarak Uyan`, kind: `Zihin`, body: `Bir cümleyi kelimesi kelimesine yazın, otomatik düzeltme kapalı.` },
      { name: `Fotoğraf Kanıtı`, kind: `Kamera`, body: `Bir önceki akşam seçtiğiniz yerin fotoğrafını yeniden çekin.` },
      { name: `Bir Nesne Tara`, kind: `Kamera`, body: `Kalkın ve kamerayı bir şişeye, kupaya ya da lavaboya doğrultun.` },
      { name: `Getir`, kind: `Kamera`, body: `Gidin ve mavi bir şey ya da içmek için kullandığınız bir şey bulun.` },
      { name: `Yüz Kontrolü`, kind: `Kamera`, body: `Kameraya karşı gözlerinizi açın, sonra yönergeyi izleyin.` },
      { name: `Meyve Kesme`, kind: `Kamera`, body: `Havadaki meyveleri parmağınızla kesin.` },
      { name: `Yürüyerek Uyan`, kind: `Hareket`, body: `Telefonunuzun saydığı gerçek adımlar atın.` },
      { name: `İlk Işık`, kind: `Hareket`, body: `Bir pencereye gidin ve telefonunuzu ışığa tutun.` },
      { name: `Yediyle Sayma`, kind: `Ses`, body: `Yedişer yedişer geriye, sesli sayın.` },
      { name: `Beş Tane Say`, kind: `Ses`, body: `Bir kategoriden beş şeyi sesli söyleyin.` },
      { name: `Beni Şaşırt`, kind: `Her tür`, body: `Her sabah farklı bir görev.` },
    ],
    note: `Görevler kurduğunuz alarmın parçasıdır; anlaşma sabah 6’da pazarlıkla değil, bir gece önceden yapılır.`,
  },

  games: {
    alt: `Memory Match ısınma oyunu`,
    heading: { pre: `İki dakikalık bir `, accent: `ısınma`, post: `, çay demlenirken` },
    lede: `Beş ısınma oyunu: Zihin Oyunları, Hafıza Eşleme, Sıra Hatırlama, Kelime Koşusu ve Tepki Dokunuşu. Her sabah üçü dönüşümlü olarak oynanır; böylece tüm set bir hafta içinde tamamlanır — ve ısınma, görevin az önce size yaptırdığı şeyi asla tekrarlamaz. Hiçbiri zorunlu değil; o noktada alarm zaten kapanmıştır.`,
  },

  sharp: {
    alt: `Günlük Sharpness Score sonucunun açıklandığı ekran`,
    heading: { pre: `Ne kadar `, accent: `zinde`, post: ` uyandığınızı bilin` },
    lede: `Zindelik puanı: ısınmadan gelen, 100 üzerinden tek bir sayı; yabancılara göre değil, kendi hareketli taban değerinize göre puanlanır. Uygulama içi bir puandır, klinik bir test değildir; sabah 6’da anlamı olan tek ölçüt de dünkü hâlinizdir.`,
  },

  stats: {
    alt: `Seri sayacıyla birlikte Sharpness trend grafiği`,
    heading: { pre: `Gün gün `, accent: `daha zinde`, post: ` olduğunuzu izleyin` },
    lede: `Bir seri, bir trend çizgisi ve hayatın araya girdiği sabahlar için seri dondurma hakları. Kilometre taşları 7, 30, 100 ve 365’te; Zindelik geçmişinizin tamamı da ilk sabahınıza kadar uzanır.`,
  },

  together: {
    heading: { pre: `Yanınıza `, accent: `birini`, post: ` alın` },
    lede: `Bir bağlantı paylaşın; onu açan telefon aynı alarmı kurar ve sonra kendi başına çalar. Katılacak bir şey yok, kaydolacak bir şey yok, arada sunucu da yok.`,
    cards: [
      { title: `Bir arkadaşla uyan`, body: `Siz bir bağlantı gönderirsiniz; onun telefonu alarmı yerel olarak kurar. Herkes kendi kopyasını tutar, yani sizinkini değiştirmek onunkine dokunmaz.` },
      { title: `Beat my wake`, body: `Uyanışımı geçme çağrısı: bir görevi bitirin ve birine birebir aynı problem setiyle meydan okuyun — aynı tohum değeri, aynı turlar, aynı zorluk. Sonra hanginizin gerçekten uyanık olduğunu öğrenin.` },
    ],
    note: `İkisi de yalnızca birer bağlantı: bağlantıyı alan telefon bütün işi kendisi yapar.`,
  },

  platforms: {
    heading: { pre: `Aynı uygulama. `, accent: `İki telefonda da.`, post: `` },
    lede: `İki kez, yerel olarak geliştirildi — iOS’ta SwiftUI, Android’de Kotlin ve Compose. Bir kabuk uygulama değil; her tarafın yalnızca kendisine özgü şeyleri yapabilmesinin tek nedeni bu. Gereksinim: {ios} veya {android}.`,
    watch: `Her iki bilek için bir saat uygulaması da var — watchOS 26 veya Wear OS 3. Oda daha hiçbir şey duymadan bileğinize dokunarak sizi uyandırır; telefon alarmı ise yedek olarak birkaç dakika sonraya kayar. Onu yalnızca saatten yapılan bir kapatma iptal eder: şarjı bitmiş, menzil dışında kalmış ya da 36 saattir açmadığınız bir saat, telefon alarmını tam olduğu yerde bırakır. Saat kadranı için bir komplikasyon da var.`,
    account: `Açmanız gereken bir hesap yok; ama ondan tek bir şey istiyorsanız Apple veya Google ile giriş yapabilirsiniz: bir yedek — alarmlarınız, ayarlarınız, puanlarınız ve seriniz yeni bir telefonda geri gelsin diye. Varsayılan olarak kapalıdır, her şey oturum açmadan çalışır ve sabah 6’da hiçbir şey asla ağı beklemez.`,
  },

  /** The store-screenshot gallery. The frames are the English store screenshots, so their baked-in headlines are quoted as shown and glossed. */
  gallery: {
    tablistAria: `Bir platform seçin`,
    rails: {
      ios: { label: `iPhone`, store: `App Store` },
      android: { label: `Android`, store: `Google Play` },
    },
    railHeading: `{label} — {store} üzerinde göründüğü gibi`,
    altTemplate: `{label} üzerinde WakeSharp: {caption}`,
    fallbackCaption: `uygulama ekran görüntüsü`,
    /**
     * Frames 04 and 07 are withheld (StoreGallery.astro) because their artwork
     * still prints the pricing retired with 2.10 and the old plan name, so they
     * have no caption until the app repo re-renders them.
     */
    captions: {
      '01': `Sıradaki alarmı ve bir akıllı takvim kuralını gösteren ana ekran; başlığı “Wake up sharp. Not just awake.” (Uyanın, hem de zinde. Sadece uyanık değil.)`,
      '02': `Kilit ekranının üzerinde çalan alarm; başlığı “Complete a mission for full credit” (Tam puan için bir görev tamamlayın)`,
      '03': `Alarmı susturan Mind Games görevi; başlığı “Solve to silence” (Susturmak için çözün)`,
      '05': `Kendi taban değerinize göre puanlanan günlük Sharpness Score sonucu`,
      '06': `Akıllı alarm kuralı düzenleyicisi; başlığı “Wakes you before your first meeting” (Sizi ilk toplantınızdan önce uyandırır)`,
    },
  },

  yours: {
    heading: { pre: `Sabah `, accent: `sizin`, post: ` olsun` },
    lede: `Gerçekten duymak istediğiniz alarm, gerçekten görmek istediğiniz görselin arkasında.`,
    cards: [
      { title: `Her uykucuya uygun sesler`, body: `Dawn’dan (şafak) Smoke Alarm’a (duman alarmı) kadar; üstelik her birinin daha yumuşak bir ikizi de var.` },
      { title: `Duvar kâğıtları ve sahneler`, body: `Tüm alarm duvar kâğıtları ve tüm Lark (maskot kuşumuz) sahneleri dahildir; her sahne kendi kutlamasıyla gelir.` },
      { title: `Açık, koyu ya da hiçbiri`, body: `Bir görünüm seçin ya da cihazınıza uymasına izin verin; palet her iki durumda da saate göre değişir.` },
      { title: `Daha yumuşak bir iniş`, body: `iPhone’da Yumuşak başlangıç özelliği sesi kısık başlatır ve yaklaşık 25 saniyede tam düzeye çıkarır. Android’de ise bir gün doğumu, alarmdan önce ekranı aydınlatıp sesi yükseltir.` },
    ],
  },

  pricing: {
    heading: { pre: `Tek plan, `, accent: `her şey dahil`, post: `` },
    lede: `WakeSharp Sınırsız uygulamanın tamamıdır: tüm uyanma görevleri, günlük ısınma, akıllı takvim alarmları, vardiya rotasyonları ve profiller, Zindelik geçmişinizin tamamı, tüm Lark sahneleri ve duvar kâğıtları. WakeSharp reklam göstermez.`,
    unlimited: {
      name: `WakeSharp Sınırsız`,
      perYear: `/yıl`,
      /** The trial and the price that follows it always travel together. */
      trial: `**{trialDays} gün ücretsiz deneyerek** başlayın, ardından yılda {annual}`,
      monthly: `ya da **ayda {monthly}**, deneme süresi olmadan`,
      features: [
        `Tüm uyanma görevleri; isterseniz art arda birkaç tane`,
        `Her sabah dönüşümlü üç ısınma oyunu`,
        `Zindelik geçmişinizin tamamı`,
        `İlk toplantınız kaydığında onunla birlikte kayabilen akıllı takvim alarmları`,
        `Vardiya rotasyonları, profiller ve ihtiyacınız kadar alarm`,
        `Güvenilirlik kontrolü ve tüm alarm sesleri`,
        `Tüm Lark sahneleri, alarm duvar kâğıtları ve kutlamalar`,
        `“Bir arkadaşla uyan” ve her iki bilek için saat uygulaması`,
        `Reklam yok`,
      ],
    },
    billing: `Yıllık ve aylık planlar Apple veya Google tarafından faturalandırılır ve iptal edilene kadar yenilenir — mağaza hesabınızdan istediğiniz zaman iptal edebilirsiniz; uygulamayı silmenin aboneliği iptal etmediğini unutmayın. Ücretsiz deneme, koşulları karşılayan yeni aboneler içindir. Bkz. [Hizmet Koşulları](terms).`,
    /** Shown on localized pages only: the stores localize prices at runtime. */
    usdNote: `Fiyatlar ABD doları cinsinden gösterilmektedir; App Store ve Google Play, ülkeniz için geçerli fiyatı gösterir.`,
  },

  faq: {
    heading: { pre: `Sorular, `, accent: `yanıtlarıyla`, post: `` },
    /** Answers may use {annual}, {monthly} and {trialDays}; prices never appear in a catalog. */
    items: [
      {
        q: `Sessiz modda, Odak’ta veya Rahatsız Etmeyin açıkken gerçekten çalıyor mu?`,
        a: `Davranış platforma göre değişir ve izne bağlıdır. iPhone’da WakeSharp, Apple’ın AlarmKit’ini kullanır; bu, alarm erişimi verdikten sonra Sessiz mod ve Odak açıkken de çalmayı destekler — izni reddeder ya da geri alırsanız WakeSharp hiçbir şey zamanlayamaz. Android’de ise özel alarm ses kanalında çalar; bu kanal sessiz modda da, Rahatsız Etmeyin alarmlara izin veriyorsa o açıkken de çalar (Tamamen sessiz modu, alarmlar dahil her sesi kapatır). Ayrıca tam zamanlı alarm, bildirim ve kilit ekranı izinleri yerindeyse kilit ekranının üzerinde tam ekran bir uyarı gösterir. Hiçbir uygulamanın yapamadığı şey, kapalı ya da pili bitmiş bir telefonda çalmaktır; bu yüzden gerçekten kaçıramayacağınız her şey için başka bir cihazda ikinci bir alarm kurun.`,
      },
      {
        q: `Alarmımın gerçekten çalacağını nasıl kontrol ederim?`,
        a: `Uygulamada Ayarlar → Alarm güvenilirliği bölümünü açın. WakeSharp, telefonunuzda bir alarmı durdurabilecek koşulları okur — izinler, alarm ses düzeyi, bildirim ayarları, kilit ekranının üzerinde görünme, pil kısıtlamaları — ve söz vermek yerine önce net bir hüküm verir. Platformun bize bir şeyi söylemediği yerde yeşil onay işareti göstermek yerine bunu açıkça belirtir; çünkü bilinmeyenleri sessizce “geçti”ye çeviren bir kontrol listesi, hiç kontrol listesi olmamasından daha kötüdür. Bir alarm gerçekten çalmazsa uygulama size sonrasında kanıtlanabilir nedeni söyleyebilir — ya da nedenini çözemediğini itiraf eder.`,
      },
      {
        q: `Sabah 6’da matematik yapmak zorunda mıyım?`,
        a: `Yalnızca isterseniz. Görevlerin birkaç türü var: aritmetik ve bulmacalar, bir önceki akşam seçtiğiniz noktanın fotoğrafı, odanın öbür ucundaki gerçek bir nesneyi taramak, yürümek ya da bir pencereye gitmek, bir cümle yazmak veya sesli yanıt vermek. Size uyanları seçin; bir alarm birden fazlasını isteyebilir. Beni Şaşırt her sabah farklı bir görev seçer; yani bir gece önceden sahnelenecek bir şey yoktur.`,
      },
      {
        q: `Görevi atlatıp hile yapabilir miyim?`,
        a: `Telefonunuzun kendi denetimleri her zaman çalışır — telefonu kapatabilirsiniz ve hiçbir uygulama bunu engelleyememeli. Ama WakeSharp içinde alarmı durdurmak ya da ertelemek sabahı bitirmez: sabah ancak görev tamamlandığında sayılır.`,
      },
      {
        q: `Kamera ne işe yarıyor?`,
        a: `Yalnızca ona ihtiyaç duyan görevler kullanır — Fotoğraf Kanıtı, Bir Nesne Tara, Getir, Yüz Kontrolü ve Meyve Kesme bunlar arasındadır — o da yalnızca bu görevlerden biri çalışırken ya da siz onu ayarlarken. Nesne tanıma ve fotoğraf eşleştirme cihazınızda gerçekleşir. İzni reddederseniz kameraya ihtiyaç duymayan her görev yine çalışır. Telefonunuzdan neyin, ne zaman çıktığını — çıkıyorsa — gizlilik politikası tam olarak açıklar.`,
      },
      {
        q: `WakeSharp uykumu takip ediyor mu?`,
        a: `Hayır. Hiçbir türde uyku takibi yoktur — gece boyunca dinleyen bir mikrofon yok, uyku evreleri yok, geceniz için bir puan yok, ne zaman uykuya daldığınıza dair bir görüş de yok. Adım sayar yalnızca yürüme görevi sırasında okunur, başka hiçbir zaman değil. WakeSharp kalktıktan sonra ne kadar zinde olduğunuzu ölçer; ondan öncesini değil. İçindeki uykuya benzeyen tek şeyler, kendi planladığınız bir yatma saati ve isteğe bağlı gevşeme sesleridir.`,
      },
      {
        q: `Takvimimden tam olarak ne okuyor?`,
        a: `Yaklaşan etkinliklerinizi; salt okunur olarak, tamamen cihazınızda ve tek bir amaçla: sizi saat kaçta uyandıracağını hesaplamak. Hiçbir şey hiçbir yere aktarılmaz. İsteğe bağlıdır; reddederseniz diğer tüm özellikler çalışmaya devam eder.`,
      },
      {
        q: `Hesap açmam gerekiyor mu?`,
        a: `WakeSharp hesabı gerekmez — uygulamanın hiçbir yerinde e-posta ya da parola yok. İsterseniz tek bir amaçla Apple veya Google ile giriş yapabilirsiniz: alarmlarınızı, ayarlarınızı, puanlarınızı ve serinizi yedeklemek, yeni bir telefonda geri gelsinler diye. Varsayılan olarak kapalıdır, her özellik oturum açmadan çalışır ve bir alarm çalmak için asla ağı beklemez. Hesabı uygulamada Ayarlar → Hesap bölümünden ya da wakesharp.app/account/delete adresinden silebilirsiniz.`,
      },
      {
        q: `Saatimin şarjı biterse ne olur?`,
        a: `Telefonunuz çalar. Önce saat bileğinize dokunarak sizi uyandırır; WakeSharp telefon alarmını yedek olarak birkaç dakika sonraya kaydırır, bu yüzden onu yalnızca saatten yapılan bir kapatma iptal eder. Şarjı bitmiş, menzil dışında kalmış ya da 36 saattir açmadığınız bir saat, telefon alarmını tam olduğu yerde bırakır.`,
      },
      {
        q: `WakeSharp’ın fiyatı nedir?`,
        a: `Tek bir plan var: WakeSharp Sınırsız; her şey dahildir. Yeni aboneler yıllık planı {trialDays} gün ücretsiz deneyerek başlayabilir, ardından yılda {annual} öder; ya da deneme süresi olmayan aylık planı ayda {monthly} karşılığında seçebilir. Fiyatlar ABD doları cinsindendir; App Store ve Google Play ülkeniz için geçerli fiyatı gösterir. WakeSharp reklam göstermez.`,
      },
      {
        q: `Lifetime (ömür boyu) satın aldım. Bende kalıyor mu?`,
        a: `Evet. Lifetime tek seferlik bir ödemeydi ve sizde kalır: hiçbir şey yenilenmez, iptal edilecek bir şey de yoktur. “Satın alımları geri yükle”, aynı Apple veya Google hesabıyla onu yeni bir telefonda geri getirir.`,
      },
      {
        q: `Nasıl iptal ederim?`,
        a: `App Store veya Google Play üzerinden, istediğiniz zaman; ücretsiz deneme süresi içinde de. Uygulamayı silmek aboneliği iptal etmez.`,
      },
      {
        q: `Beni takip ediyor mu?`,
        a: `WakeSharp reklam göstermez ama başka yerlerde reklam satın alır ve sizi uygulamaya hangi reklamın ya da bağlantının getirdiğini, bunun bir denemeye ya da aboneliğe dönüşüp dönüşmediğini ölçer. iPhone’da önce izin ister: reddederseniz reklam kimliğiniz asla okunmaz ve reklam ağları yalnızca toplu kampanya sonuçlarını görür. Android’de ise her şey gizlilik politikasında anlatıldığı gibi işler. Ürün analitiği Ayarlar’dan kapatılabilir; alarm adlarınız ve takvim ayrıntılarınız asla gönderilmez. Cihazınızdan tam olarak neyin çıktığını gizlilik politikası listeler.`,
      },
    ],
  },

  /** The "From the blog" block; shown only where this language has the featured posts. */
  fromBlog: {
    heading: { pre: ``, accent: `Blog`, post: `’dan` },
    more: `Tüm yazılar`,
  },

  cta: {
    heading: { pre: `Yarın sabah `, accent: `bu gece`, post: ` başlar` },
    lede: `Bir alarm kurun. Zinde bir sabahın gerçekte nasıl hissettirdiğini görün.`,
  },
} satisfies typeof en;
