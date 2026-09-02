import { home as en } from '../en/home';

/**
 * The Turkish homepage. Headings keep the {pre, accent, post} split; the hero's
 * `post` renders on its own line after a <br />, so the accent closes line one.
 */
export const home = {
  title: `WakeSharp — Uyanın, hem de zinde. Sadece uyanık değil.`,

  hero: {
    heading: { pre: `Uyanın, hem de `, accent: `zinde.`, post: `Sadece uyanık değil.` },
    lede: `Kaydırmak, yarı baygın birinin bile yapabileceği bir şey. WakeSharp bunun yerine bir görev ister — çözün, fotoğraflayın, tarayın ya da yürüyün — ve ardından gerçekte ne kadar zinde uyandığınızı puanlar.`,
    phoneAlt: `Gece görünümünde WakeSharp ana ekranı; sabah 6:40 alarmı ve bir akıllı takvim kuralı görünüyor`,
  },

  trust: [
    `iPhone’da Sessiz mod ve Odak açıkken de çalar`,
    `Onu neyin durdurabileceğini söyler — bir gece önceden`,
    `Kayıt gerekmez, reklam yok`,
    `Takviminiz ve kameranız telefonunuzdan asla çıkmaz`,
    `Alarmınız sonsuza dek ücretsiz çalar`,
  ],

  ring: {
    alt: `Çalan WakeSharp alarmı; Start Mission (Göreve Başla) ve Snooze (Ertele) düğmeleriyle`,
    heading: { pre: `Görevi tamamlayın, `, accent: `tam puanı`, post: ` alın` },
    lede: `iPhone’da Apple’ın AlarmKit’i kilit ekranının üzerinde bir sistem alarmı gösterir — alarm erişimi verildikten sonra Sessiz mod ve Odak açıkken de, uygulama zorla kapatılmış olsa bile. Android’de ise Rahatsız Etmeyin’in susturmadığı alarm ses kanalında tam zamanlı bir alarm çalar; Extra Loud (ekstra yüksek ses) ve bir anda patlamak yerine kademeli yükselen bir ses rampasıyla. Sistemin kendi durdurma düğmesi her zaman çalışır; sabahı kazandıran şey görevdir.`,
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
    note: `Ücretsizdir, uygulamanın Settings (Ayarlar) bölümündedir ve yatmadan önceki hatırlatıcı en kötü bulguyu da içine katar; böylece düzeltmek için hâlâ vakit varken görürsünüz.`,
  },

  smart: {
    alt: `İlk toplantıdan 90 dakika önce çalacak şekilde ayarlanmış akıllı alarm kuralı düzenleyicisi`,
    heading: { pre: `Sizi `, accent: `ilk toplantınızdan`, post: ` önce uyandırır` },
    lede: `“İlk toplantımdan 90 dakika önce çal.” WakeSharp takviminizi cihazınızın üzerinde okur, gece boyunca yeniden kontrol eder ve toplantı kayarsa alarmı da kaydırır. Salt okunur, isteğe bağlı, hiçbir zaman aktarılmaz.`,
    shifts: `Her hafta da bir hafta değildir. Vardiya rotasyonları haftalık olmayan düzenleri halleder — iki gün gündüz, iki gece, dört gün izin — bir önizleme takvimi ve hiçbir şeyi silmeden tek bir tarihi atlama imkânıyla. Profiller iş, tatil ya da nöbet için bir alarm setinin tamamını tek seferde değiştirir. Arama, sıralama ve Bugün görünümü, alarm sayısı arttığında listeyi düzenli tutar.`,
    labels: `Ne için uyandığınızı söyleyin — antrenman, işe gidiş, kahvaltı — ve etiket kendini yazar. Bir akıllı kural, bir rotasyon ve bir profil ücretsizdir; Plus üçünün de sınırını kaldırır.`,
  },

  mission: {
    alt: `Mind Games görevi: alarmı susturmak için 6 eksi 3’ü çözün`,
    heading: { pre: `Sizi `, accent: `yataktan kaldırmanın`, post: ` beş yolu` },
    lede: `Sabahın sayılması için bir şey olması gerekir; neyin olacağını siz seçersiniz. Mind Games (zihin oyunları) ve Photo Proof (fotoğrafla kanıt) ücretsizdir; geri kalanı Plus ile gelir. Her birinin, Mind Games’te tam puanla biten bir çıkış yolu vardır; böylece bitmiş bir kamera ya da adım sayarı olmayan bir telefon sizi asla çaresiz bırakmaz.`,
    /** The five missions the alarm editor offers, in its order. `tier` is Ücretsiz or Plus. */
    missions: [
      { name: `Mind Games`, tier: `Ücretsiz`, body: `Kolay, standart veya zor düzeyde üç aritmetik problemi. Diğer bütün görevlerin son çare olarak döndüğü görev.` },
      { name: `Photo Proof`, tier: `Ücretsiz`, body: `Gökyüzünü, toplanmış yatağınızı, bir bardak suyu fotoğraflayın. Günlük rotasyonla altı farklı istek; yani bir gece önceden hazırlanacak hiçbir şey yok.` },
      { name: `Scan an Object`, tier: `Plus`, body: `Nesne tarama: kamerayı odanın öbür ucundaki bir şeye tutun. Katalogda yirmi gündelik nesne; hepsi telefonun kendisinde tanınır.` },
      { name: `Walk It Off`, tier: `Plus`, body: `Yürüyerek uyanma: yataktan kalkın ve adımları atın. Adım sayarı okur ve temponuzu izler; yani telefonu sallamak hiçbir işe yaramaz.` },
      { name: `Surprise me`, tier: `Plus`, body: `Sürpriz: Mind Games, bir tarama ya da bir yürüyüş arasından seçer — o gün o alarm için sabittir, yani ne çıktığını alarm çaldığında öğrenirsiniz.` },
    ],
    note: `Görev, alarmı kurarken seçilir, çaldığında asla — üzerinde zaten bir tarama ya da yürüyüş olan bir alarm, aboneliğe ne olursa olsun onu çalıştırmaya devam eder. Strict Mode (katı mod), desteklenen cihazlarda dört yeniden çalmayı önceden ayırtır; erteleme ise size dayatılan bir kural değil, sizin belirlediğiniz bir politikadır.`,
  },

  games: {
    alt: `Memory Match ısınma oyunu`,
    heading: { pre: `İki dakikalık bir `, accent: `ısınma`, post: `, çay demlenirken` },
    lede: `Beş ısınma oyunu: Math Sprint (hızlı matematik), Memory Match (hafıza eşleştirme), Sequence Recall (dizi hatırlama), Word Dash (kelime koşusu) ve Reaction Tap (tepki dokunuşu). Ücretsiz sürüm görevinizden sonra iki oyunluk bir havuzdan bir tane oynatır. Plus her sabah üç tane oynatır ve bunları döndürür; böylece tüm set bir hafta içinde tamamlanır — ve görevin az önce size yaptırdığı şeyi asla tekrarlamaz. Hiçbiri zorunlu değil; o noktada alarm zaten kapanmıştır.`,
  },

  sharp: {
    alt: `Günlük Sharpness Score sonucunun açıklandığı ekran`,
    heading: { pre: `Ne kadar `, accent: `zinde`, post: ` uyandığınızı bilin` },
    lede: `Sharpness Score (zindelik puanı): 100 üzerinden tek bir sayı; yabancılara göre değil, kendi hareketli taban değerinize göre puanlanır. Fiziksel görevler bunun dışında kalır: bir tarama, bir yürüyüş ve bir fotoğraf yalnızca kendileriyle karşılaştırılır, çünkü odayı geçmek bir aritmetik puanı değildir. Sabah 6’da anlamı olan tek ölçüt, dünkü hâlinizdir.`,
  },

  stats: {
    alt: `Seri sayacıyla birlikte Sharpness trend grafiği`,
    heading: { pre: `Gün gün `, accent: `daha zinde`, post: ` olduğunuzu izleyin` },
    lede: `Bir seri, bir trend çizgisi ve her yedi sabahta bir seri dondurma hakkı — iki tane biriktirebilirsiniz, yani hayatın araya girmesine iki kez izin var. Kilometre taşları 7, 30, 100 ve 365’te. Bir sabahı tamamen kaçırırsanız bir telafi görevi zinciri yarım puanla canlı tutar. Yedi günlük geçmiş ücretsiz; Plus ile, ne kadar geriye giderse gitsin, şimdiye kadar kaydettiğiniz her şey.`,
  },

  together: {
    heading: { pre: `Yanınıza `, accent: `birini`, post: ` alın` },
    lede: `Bir bağlantı paylaşın; onu açan telefon aynı alarmı kurar ve sonra kendi başına çalar. Katılacak bir şey yok, kaydolacak bir şey yok, arada sunucu da yok.`,
    cards: [
      { title: `Bir arkadaşınızla uyanın`, body: `Siz bir bağlantı gönderirsiniz; onun telefonu alarmı yerel olarak kurar. Herkes kendi kopyasını tutar, yani sizinkini değiştirmek onunkine dokunmaz.` },
      { title: `Beni geç`, body: `Bir görevi bitirin ve birine birebir aynı problem setiyle meydan okuyun — aynı tohum değeri, aynı turlar, aynı zorluk. Sonra hanginizin gerçekten uyanık olduğunu öğrenin.` },
    ],
    note: `İkisi de ücretsiz ve ikisi de yalnızca birer bağlantı: bağlantıyı alan telefon bütün işi kendisi yapar.`,
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
    captions: {
      '01': `Sıradaki alarmı ve bir akıllı takvim kuralını gösteren ana ekran; başlığı “Wake up sharp. Not just awake.” (Uyanın, hem de zinde. Sadece uyanık değil.)`,
      '02': `Kilit ekranının üzerinde çalan alarm; başlığı “Complete a mission for full credit” (Tam puan için bir görev tamamlayın)`,
      '03': `Alarmı susturan Mind Games görevi; başlığı “Solve to silence” (Susturmak için çözün)`,
      '04': `Isınma oyunları; başlığı “5 brain games. 3 every morning.” (5 zihin oyunu. Her sabah 3 tanesi.) ve rotasyonun WakeSharp Plus ile geldiği notu`,
      '05': `Kendi taban değerinize göre puanlanan günlük Sharpness Score sonucu`,
      '06': `Akıllı alarm kuralı düzenleyicisi; başlığı “Wakes you before your first meeting” (Sizi ilk toplantınızdan önce uyandırır)`,
      '07': `Sharpness trendi ve seri istatistikleri: seriler ve dondurmalar ücretsiz, tam geçmiş WakeSharp Plus ile`,
    },
  },

  yours: {
    heading: { pre: `Sabah `, accent: `sizin`, post: ` olsun` },
    lede: `Gerçekten duymak istediğiniz alarm, gerçekten görmek istediğiniz görselin arkasında.`,
    cards: [
      { title: `13 ses, hepsi ücretsiz`, body: `Dawn’dan (şafak) Smoke Alarm’a (duman alarmı) kadar; üstelik her birinin daha yumuşak bir ikizi de var.` },
      { title: `Duvar kâğıtları ve sahneler`, body: `Üç duvar kâğıdı ücretsiz, Plus ile beş; Lark (maskot kuşumuz) ise her biri kendi kutlamasıyla gelen dört sahne daha kazanır.` },
      { title: `Açık, koyu ya da hiçbiri`, body: `Bir görünüm seçin ya da cihazınıza uymasına izin verin; palet her iki durumda da saate göre değişir.` },
      { title: `Daha yumuşak bir iniş`, body: `iPhone’da Gentle start (yumuşak başlangıç) sesi kısık başlatır ve yaklaşık 25 saniyede tam düzeye çıkarır. Android’de ise bir gün doğumu, alarmdan önce ekranı aydınlatıp sesi yükseltir.` },
    ],
  },

  pricing: {
    heading: { pre: `Alarmınız `, accent: `sonsuza dek ücretsiz`, post: ` çalar` },
    lede: `Reklam da yok. Beş görevden ikisi de ücretsiz; 13 sesin tamamı, Strict Mode, erteleme ön ayarları ve güvenilirlik kontrolü de öyle. Plus, alarmdan sonraki sabah içindir — diğer görevler, daha fazla ısınma oyunu, daha fazla akıllı kural ve geçmişin tamamı.`,
    free: {
      name: `Ücretsiz`,
      price: `$0`,
      tagline: `Kayıt yok, unutulacak bir deneme süresi yok.`,
      /** Mirrors the gates the shipped paywall actually enforces. */
      features: [
        `İhtiyacınız kadar alarm`,
        `İki uyanma görevi — Mind Games ve Photo Proof`,
        `13 alarm sesinin tamamı`,
        `Strict Mode, erteleme ön ayarları ve güvenilirlik kontrolü`,
        `Bir akıllı takvim alarmı, bir vardiya rotasyonu, bir profil`,
        `Arama, sıralama ve Bugün görünümü`,
        `Seriler, dondurma hakları ve kilometre taşları`,
        `Her görevden sonra bir ısınma oyunu ve 7 günlük trendiniz`,
        `Bir arkadaşınızla uyanma ve her iki bilek için saat uygulaması`,
        `Üç alarm duvar kâğıdı ve Classic Lark sahnesi`,
      ],
    },
    plus: {
      name: `WakeSharp Plus`,
      perMonth: `/ay`,
      annual: `veya **yılda {annual}**, {trialDays} günlük ücretsiz denemeyle`,
      lifetime: `veya **tek seferlik {lifetime}** — Lifetime (ömür boyu), hiç yenilenmez`,
      /** Items 2-6 are the paywall's five bullets, in the paywall's order. */
      features: [
        `Ücretsiz sürümdeki her şey`,
        `Mind Games ve Photo Proof dışındaki tüm uyanma görevleri`,
        `Her sabah dönüşümlü üç ısınma oyunu`,
        `Tüm Sharpness geçmişiniz`,
        `Sınırsız akıllı takvim alarmı`,
        `Lark sahneleri, alarm duvar kâğıtları ve kutlamalar`,
        `İstediğiniz kadar vardiya rotasyonu ve profil, ayrıca özel bir erteleme politikası`,
      ],
    },
    lapse: `Plus, alarmı kurarken kontrol edilir, çaldığında değil. Üzerinde zaten bir tarama ya da yürüyüş olan bir alarm, abonelik etkin olsun ya da olmasın onu çalıştırmaya devam eder — daha önce kurduğunuz hiçbir şey çalışmayı bırakmaz. Sona eren şey, yenilerini kurabilmektir.`,
    billing: `Aylık ve yıllık planlar Apple veya Google tarafından faturalandırılır ve iptal edilene kadar yenilenir — mağaza hesabınızdan istediğiniz zaman iptal edebilirsiniz; uygulamayı silmenin aboneliği iptal etmediğini unutmayın. Lifetime tek bir ödemedir ve iptal edilecek bir şey yoktur. Bkz. [Hizmet Koşulları](terms).`,
    /** Shown on localized pages only: the stores localize prices at runtime. */
    usdNote: `Fiyatlar ABD doları cinsinden gösterilmektedir; App Store ve Google Play, ülkeniz için geçerli fiyatı gösterir.`,
  },

  faq: {
    heading: { pre: `Sorular, `, accent: `yanıtlarıyla`, post: `` },
    items: [
      {
        q: `Sessiz modda, Odak’ta veya Rahatsız Etmeyin açıkken gerçekten çalıyor mu?`,
        a: `Davranış platforma göre değişir ve izne bağlıdır. iPhone’da WakeSharp, Apple’ın AlarmKit’ini kullanır; bu, alarm erişimi verdikten sonra Sessiz mod ve Odak açıkken de çalmayı destekler — izni reddeder ya da geri alırsanız WakeSharp hiçbir şey zamanlayamaz. Android’de ise Rahatsız Etmeyin’in susturmadığı özel alarm ses kanalında çalar ve tam zamanlı alarm, bildirim ve kilit ekranı izinleri yerindeyse kilit ekranının üzerinde tam ekran bir uyarı gösterir. Hiçbir uygulamanın yapamadığı şey, kapalı ya da pili bitmiş bir telefonda çalmaktır; bu yüzden gerçekten kaçıramayacağınız her şey için başka bir cihazda ikinci bir alarm kurun.`,
      },
      {
        q: `Alarmımın gerçekten çalacağını nasıl kontrol ederim?`,
        a: `Uygulamada Settings → Alarm reliability (Ayarlar → alarm güvenilirliği) bölümünü açın. WakeSharp, telefonunuzda bir alarmı durdurabilecek koşulları okur — izinler, alarm ses düzeyi, bildirim ayarları, kilit ekranının üzerinde görünme, pil kısıtlamaları — ve söz vermek yerine önce net bir hüküm verir. Platformun bize bir şeyi söylemediği yerde yeşil onay işareti göstermek yerine bunu açıkça belirtir; çünkü bilinmeyenleri sessizce “geçti”ye çeviren bir kontrol listesi, hiç kontrol listesi olmamasından daha kötüdür. Bir alarm gerçekten çalmazsa uygulama size sonrasında kanıtlanabilir nedeni söyleyebilir — ya da nedenini çözemediğini itiraf eder.`,
      },
      {
        q: `Sabah 6’da matematik yapmak zorunda mıyım?`,
        a: `Yalnızca isterseniz. İki ücretsiz görev, üç aritmetik probleminden oluşan Mind Games ve sadece bir şeyin fotoğrafını isteyen Photo Proof’tur — gökyüzü, toplanmış yatağınız, bir bardak su; istek her gün değişir. Plus, odanın öbür ucundaki gerçek bir nesneyi taramayı, belirli sayıda adım atmayı ve “Surprise me”yi (beni şaşırt) ekler; bu sonuncusu birini seçip o gün o alarm için sabitler, yani bir gece önceden sahnelenecek bir şey yoktur. Her görevin Mind Games’te tam puanla biten bir çıkış yolu vardır; böylece bitmiş bir kamera ya da komodinde kalmış bir telefon sizi asla kapana kıstırmaz.`,
      },
      {
        q: `Görevi atlatıp hile yapabilir miyim?`,
        a: `Alarmı görev yapmadan kapatabilirsiniz — telefonunuzun kendi durdurma düğmesi her zaman çalışır ve biz de başka türlüsünü istemezdik. WakeSharp bir sonraki açışınızda borçlu olduğunuz görevi hatırlatan bir ekran gösterir; bir telafi görevi de serinizi yarım puanla canlı tutabilir. Erteleme, size dayatılan bir kural değil, sizin seçtiğiniz bir politikadır: kapalı, beşer dakikalık standart iki erteleme ya da her aralığı kısaltan ve ilerledikçe zorluğu artıran Tighten (sıkılaştır). Her erteleme Sharpness puanınızdan düşer. Strict Mode, desteklenen cihazlarda dört yeniden çalmayı önceden ayırtır — 45 saniye, ardından 4, 8 ve 12 dakika sonra — ve görevi tamamlamak henüz çalmamış olanları iptal eder.`,
      },
      {
        q: `Kamera ne işe yarıyor?`,
        a: `İki görev kullanır; o da yalnızca o görev çalışırken ya da siz onu ayarlarken. Scan an Object (bir nesne tara), seçtiğiniz şeye baktığınızı doğrulamak için kareleri cihazınızda sınıflandırır — iPhone’da Apple’ın Vision altyapısı, Android’de uygulamayla gelen küçük bir model. Photo Proof tek bir fotoğraf ister; doğrulamalı sürümü bunu, yine cihazınızda, kaydettiğiniz bir referansla karşılaştırır. Hiçbir şey yüklenmez, fotoğraf kitaplığınıza hiçbir şey eklenmez ve fotoğrafın tamamı asla saklanmaz — yalnızca küçük bir parmak izi. İzni reddederseniz diğer tüm görevler yine çalışır.`,
      },
      {
        q: `WakeSharp uykumu takip ediyor mu?`,
        a: `Hayır. Hiçbir türde uyku takibi yoktur — gece boyunca dinleyen bir mikrofon yok, uyku evreleri yok, geceniz için bir puan yok, ne zaman uykuya daldığınıza dair bir görüş de yok. Adım sayar yalnızca yürüme görevi sırasında okunur, başka hiçbir zaman değil. WakeSharp kalktıktan sonra ne kadar zinde olduğunuzu ölçer; ondan öncesini değil. İçindeki uykuya benzeyen tek şeyler, kendi belirlediğiniz bir yatma saati ve isteğe bağlı bir gevşeme hatırlatıcısıdır.`,
      },
      {
        q: `Takvimimden tam olarak ne okuyor?`,
        a: `Yaklaşan etkinliklerinizi; salt okunur olarak, tamamen cihazınızda ve tek bir amaçla: sizi saat kaçta uyandıracağını hesaplamak. Hiçbir şey hiçbir yere aktarılmaz. İsteğe bağlıdır; reddederseniz diğer tüm özellikler çalışmaya devam eder.`,
      },
      {
        q: `Hesap açmam gerekiyor mu?`,
        a: `Hayır; hiçbir şey bir hesabın arkasına kilitlenmiş değil — uygulamanın hiçbir yerinde e-posta ya da parola yok. İsterseniz tek bir amaçla Apple veya Google ile giriş yapabilirsiniz: alarmlarınızı, ayarlarınızı, puanlarınızı ve serinizi yedeklemek, yeni bir telefonda geri gelsinler diye. Varsayılan olarak kapalıdır, her özellik oturum açmadan çalışır ve bir alarm çalmak için asla ağı beklemez. Hesabı uygulamada Settings → Account (Ayarlar → Hesap) bölümünden ya da wakesharp.app/account/delete adresinden silebilirsiniz.`,
      },
      {
        q: `Saatimin şarjı biterse ne olur?`,
        a: `Telefonunuz çalar. Önce saat bileğinize dokunarak sizi uyandırır; WakeSharp telefon alarmını yedek olarak birkaç dakika sonraya kaydırır, bu yüzden onu yalnızca saatten yapılan bir kapatma iptal eder. Şarjı bitmiş, menzil dışında kalmış ya da 36 saattir açmadığınız bir saat, telefon alarmını tam olduğu yerde bırakır. Strict Mode’un koruma alarmları her hâlükârda telefonda çalar.`,
      },
      {
        q: `Neler ücretsiz, neler Plus?`,
        a: `Alarmınız sonsuza dek ücretsiz çalar, reklamsız. Ücretsiz sürüm şunları kapsar: ihtiyacınız kadar alarm, Mind Games ve Photo Proof görevleri, 13 alarm sesinin tamamı, Strict Mode, erteleme ön ayarları, güvenilirlik kontrolü, seriler ve dondurma hakları, her görevden sonra bir ısınma oyunu, bir akıllı takvim alarmı, bir vardiya rotasyonu, bir profil, saat uygulaması ve 7 günlük Sharpness trendiniz. Plus şunları ekler: diğer görevler — tarama, yürüyüş ve Surprise me — her sabah dönüşümlü üç ısınma oyunu, sınırsız akıllı takvim alarmı, istediğiniz kadar rotasyon ve profil, tüm Sharpness geçmişiniz, özel bir erteleme politikası ve Lark sahneleri, duvar kâğıtları ve kutlamalar.`,
      },
      {
        q: `Ödemeyi bırakırsam Plus alarmlarıma ne olur?`,
        a: `Çalışmaya devam ederler. Kontrol, alarmı kurarken yapılır, çaldığında değil; bu yüzden üzerinde zaten bir tarama ya da yürüyüş olan bir alarm, abonelik etkin olsun ya da olmasın onu çalıştırmaya devam eder. Kaybettiğiniz şey, yenilerini kurabilmek; bir de ek ısınma oyunları ve tam geçmiş.`,
      },
      {
        q: `Lifetime bir abonelik mi?`,
        a: `Hayır. Lifetime (ömür boyu), aynı WakeSharp Plus özellikleri için tek bir ödemedir — yenilenmez ve iptal edilecek bir şey yoktur. Aylık ve yıllık planlar ise siz durdurana kadar yenilenir. 7 günlük ücretsiz deneme yıllık plana aittir.`,
      },
      {
        q: `Nasıl iptal ederim?`,
        a: `App Store veya Google Play üzerinden, istediğiniz zaman. Uygulamayı silmek aboneliği iptal etmez. Lifetime’da iptal edilecek bir şey yoktur — tek seferlik bir satın almadır ve Restore Purchases (Satın Alınanları Geri Yükle) onu yeni bir telefonda geri getirir.`,
      },
      {
        q: `Beni takip ediyor mu?`,
        a: `Reklam kimliği yok, konum yok, diğer uygulamalar arasında takip yok. Cihazınızdan çıkanlar: anonim kullanım analitiği (rastgele bir kimlik ve hangi ekranları kullandığınız — alarmlarınız, takviminiz ya da kameranız asla), Plus satın alırsanız abonelik verileri ve bir hesap oluşturmayı seçtiyseniz kendi yedeğiniz. Hesabınız analitikle asla birleştirilmez. Gizlilik politikası her baytı listeler.`,
      },
    ],
  },

  cta: {
    heading: { pre: `Yarın sabah `, accent: `bu gece`, post: ` başlar` },
    lede: `Bir alarm kurun. Zinde bir sabahın gerçekte nasıl hissettirdiğini görün.`,
  },
} satisfies typeof en;
