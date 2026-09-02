import { home as en } from '../en/home';

/**
 * Beranda. Judul dipecah menjadi {pre, accent, post} karena kata yang disorot
 * adalah <span class="accent"> di templat; spasi di sekelilingnya ikut di dalam
 * string. `{ios}`, `{android}`, `{annual}`, `{lifetime}` dan `{trialDays}`
 * berasal dari src/config/site.ts.
 */
export const home = {
  title: `WakeSharp — Bangun sigap. Bukan sekadar terjaga.`,

  hero: {
    heading: { pre: `Bangun `, accent: `sigap.`, post: `Bukan sekadar terjaga.` },
    lede: `Menggeser layar bisa dilakukan orang yang nyaris belum sadar. WakeSharp justru meminta misi: selesaikan soal, ambil foto, pindai objek, atau berjalan kaki. Setelah itu, WakeSharp menilai seberapa sigap Anda sebenarnya saat bangun.`,
    phoneAlt: `Layar beranda WakeSharp pada malam hari, menampilkan alarm pukul 06.40 dan aturan kalender pintar`,
  },

  trust: [
    `Berbunyi menembus Mode Hening dan Fokus di iPhone`,
    `Memberi tahu apa yang bisa menghentikannya, sejak malam sebelumnya`,
    `Tanpa perlu mendaftar, dan tanpa iklan`,
    `Kalender dan kamera Anda tidak pernah keluar dari ponsel`,
    `Alarm Anda berbunyi gratis, selamanya`,
  ],

  ring: {
    alt: `Alarm WakeSharp sedang berbunyi, dengan tombol mulai misi dan tunda`,
    heading: { pre: `Selesaikan misi untuk `, accent: `nilai penuh`, post: `` },
    lede: `Di iPhone, AlarmKit dari Apple menampilkan alarm sistem di atas layar kunci: menembus Mode Hening dan Fokus begitu akses alarm diberikan, bahkan jika aplikasinya sudah ditutup paksa. Di Android, alarm tepat waktu berjalan di saluran audio alarm yang tidak dibungkam Jangan Ganggu, dengan Extra Loud (ekstra keras) dan volume yang naik bertahap alih-alih langsung menggelegar. Tombol berhenti milik sistem selalu berfungsi; misilah yang menebus pagi Anda.`,
  },

  reliable: {
    heading: { pre: `Tahu alarm akan berbunyi, `, accent: `sejak malam sebelumnya`, post: `` },
    lede: `Kebanyakan aplikasi alarm baru tahu bahwa mereka gagal pada saat yang sama dengan Anda. WakeSharp memeriksa hal-hal yang benar-benar menghentikan alarm (izin, volume alarm, pengaturan notifikasi, pengambilalihan layar kunci, pembatasan baterai) dan langsung memberi kesimpulan, bukan janji.`,
    items: [
      { title: `Kesimpulan, bukan daftar periksa`, body: `Satu baris di paling atas: akan berbunyi, mungkin tidak, atau tidak bisa.` },
      { title: `Jujur soal yang tidak bisa dilihatnya`, body: `Saat ponsel tidak mau memberi tahu kami, WakeSharp mengakuinya, dan tidak pernah memberi centang hijau.` },
      { title: `Perbaikan sekali ketuk jika tersedia`, body: `Dan petunjuk yang jelas jika tidak.` },
      { title: `“Alarmnya tidak berbunyi” mendapat jawaban`, body: `Penyebab yang bisa dibuktikan, atau pengakuan bahwa kami tidak bisa memastikannya.` },
    ],
    note: `Fitur ini gratis, ada di Pengaturan, dan pengingat sebelum tidur menyertakan temuan terburuknya supaya Anda melihatnya selagi masih ada waktu untuk memperbaikinya.`,
  },

  smart: {
    alt: `Editor aturan alarm pintar, diatur untuk berbunyi 90 menit sebelum rapat pertama`,
    heading: { pre: `Membangunkan Anda sebelum `, accent: `rapat pertama`, post: `` },
    lede: `“Bunyikan 90 menit sebelum rapat pertama saya.” WakeSharp membaca kalender di perangkat Anda, memeriksanya ulang sepanjang malam, dan memindahkan alarm saat rapatnya bergeser. Hanya-baca, opsional, dan tidak pernah dikirim ke mana pun.`,
    shifts: `Tidak semua minggu berjalan seperti minggu biasa. Rotasi shift menangani pola yang tidak mingguan (dua hari siang, dua hari malam, empat hari libur) dengan kalender pratinjau dan cara melewati satu tanggal tanpa menghapus apa pun. Profil menukar satu set alarm sekaligus untuk kerja, liburan, atau jaga. Pencarian, pengurutan, dan tampilan Hari Ini menjaga daftar tetap rapi saat alarmnya banyak.`,
    labels: `Sebutkan untuk apa Anda bangun (olahraga, berangkat kerja, sarapan) dan labelnya tertulis dengan sendirinya. Satu aturan pintar, satu rotasi, dan satu profil gratis; Plus menghapus ketiga batas itu.`,
  },

  mission: {
    alt: `Misi Mind Games: selesaikan 6 dikurangi 3 untuk mematikan alarm`,
    heading: { pre: `Lima cara untuk `, accent: `membangunkan Anda`, post: `` },
    lede: `Sesuatu harus terjadi sebelum pagi Anda dihitung, dan Anda yang memilih apa. Mind Games (soal hitung) dan Photo Proof (bukti foto) gratis; sisanya hadir bersama Plus. Setiap misi punya jalan keluar yang berakhir di Mind Games dengan nilai penuh, jadi kamera yang mati atau ponsel tanpa penghitung langkah tidak akan pernah membuat Anda terjebak.`,
    /** Lima misi yang ditawarkan editor alarm, sesuai urutannya. `tier` adalah Gratis atau Plus. */
    missions: [
      { name: `Mind Games`, tier: `Gratis`, body: `Tiga soal aritmetika di tingkat mudah, standar, atau sulit. Misi cadangan bagi semua misi lainnya.` },
      { name: `Photo Proof`, tier: `Gratis`, body: `Foto langit, tempat tidur yang sudah dirapikan, segelas air. Enam petunjuk yang bergilir tiap hari, jadi tidak ada yang perlu disiapkan malam sebelumnya.` },
      { name: `Scan an Object`, tier: `Plus`, body: `Pindai objek: arahkan kamera ke sesuatu di seberang ruangan. Dua puluh benda sehari-hari ada di katalognya, dikenali langsung di ponsel.` },
      { name: `Walk It Off`, tier: `Plus`, body: `Jalan kaki dulu: turun dari tempat tidur dan melangkahlah. Misi ini membaca penghitung langkah dan mengamati irama langkah Anda, jadi mengguncang ponsel tidak ada gunanya.` },
      { name: `Surprise me`, tier: `Plus`, body: `Kejutkan saya: mengundi Mind Games, pindai, atau jalan kaki, lalu menguncinya untuk alarm itu pada hari itu, jadi Anda baru tahu saat alarm berbunyi.` },
    ],
    note: `Misi dipilih saat Anda membuat alarm, bukan saat alarm berbunyi: alarm yang sudah membawa misi pindai atau jalan kaki akan terus menjalankannya, apa pun yang terjadi pada langganan. Strict Mode (mode ketat), di perangkat yang mendukung, memesan empat dering ulang di muka, dan menunda alarm adalah kebijakan yang Anda tentukan sendiri, bukan aturan yang dipaksakan kepada Anda.`,
  },

  games: {
    alt: `Permainan pemanasan Memory Match`,
    heading: { pre: `Dua menit `, accent: `pemanasan`, post: ` sambil menunggu air mendidih` },
    lede: `Math Sprint, Memory Match, Sequence Recall, Word Dash, dan Reaction Tap: sprint hitung, mencocokkan memori, mengingat urutan, adu kata, dan ketuk reaksi. Paket Gratis memainkan satu permainan setelah misi Anda, diambil dari dua pilihan. Plus memainkan tiga setiap pagi dan menggilirnya, sehingga seluruh set berputar dalam seminggu, dan tidak pernah mengulang apa yang baru saja misi minta Anda lakukan. Tidak ada yang wajib; saat itu alarm sudah mati.`,
  },

  sharp: {
    alt: `Pengungkapan Sharpness Score harian`,
    heading: { pre: `Tahu seberapa `, accent: `sigap`, post: ` Anda saat bangun` },
    lede: `Satu angka dari 100, Sharpness Score (skor kesigapan) Anda, dinilai terhadap acuan bergulir Anda sendiri, bukan terhadap orang asing. Misi fisik tidak ikut dihitung: pindai, jalan kaki, dan foto hanya pernah dibandingkan dengan dirinya sendiri, karena menyeberangi ruangan bukanlah skor aritmetika. Diri Anda kemarin adalah satu-satunya tolok ukur yang berarti pada pukul 6 pagi.`,
  },

  stats: {
    alt: `Grafik tren Sharpness dengan penghitung runtunan`,
    heading: { pre: `Lihat diri Anda makin `, accent: `sigap`, post: `` },
    lede: `Runtunan, garis tren, dan satu token pembeku setiap tujuh pagi; Anda bisa menyimpan dua, jadi hidup boleh terjadi dua kali. Tonggak pencapaian menanti di hari ke-7, 30, 100, dan 365. Terlewat satu pagi sama sekali, dan misi susulan menjaga rantainya tetap hidup dengan setengah nilai. Tujuh hari riwayat gratis; dengan Plus, semua yang pernah Anda catat, sejauh apa pun ke belakang.`,
  },

  together: {
    heading: { pre: `Ajak `, accent: `seseorang ikut serta`, post: `` },
    lede: `Bagikan tautan, dan ponsel yang membukanya menyetel alarm yang sama, lalu membunyikannya sendiri. Tidak ada yang perlu diikuti, tidak ada yang perlu didaftar, dan tidak ada server di tengahnya.`,
    cards: [
      { title: `Bangun bersama teman`, body: `Anda mengirim tautan; ponsel mereka membuat alarmnya secara lokal. Setiap orang menyimpan salinannya sendiri, jadi mengubah alarm Anda tidak menyentuh alarm mereka.` },
      { title: `Kalahkan bangun pagiku`, body: `Selesaikan misi, dan Anda bisa menantang seseorang dengan set soal yang identik: seed yang sama, ronde yang sama, tingkat kesulitan yang sama. Lalu ketahuan siapa di antara Anda berdua yang benar-benar sudah bangun.` },
    ],
    note: `Keduanya gratis, dan keduanya hanya tautan: ponsel yang menerimanya mengerjakan semuanya sendiri.`,
  },

  platforms: {
    heading: { pre: `Aplikasi yang sama. `, accent: `Kedua ponsel.`, post: `` },
    lede: `Dibangun secara native dua kali: SwiftUI di iOS, Kotlin dan Compose di Android. Bukan pembungkus, dan itulah satu-satunya alasan tiap sisi bisa melakukan hal yang hanya bisa dilakukannya. Memerlukan {ios} atau {android}.`,
    watch: `Ada juga aplikasi jam tangan untuk kedua pergelangan: watchOS 26 atau Wear OS 3. Jam tangan mengetuk Anda sampai bangun sebelum seisi kamar mendengar apa pun, dan alarm ponsel bergeser beberapa menit kemudian sebagai cadangan. Hanya pemberhentian dari jam tangan yang membatalkannya: jam tangan yang habis baterai, di luar jangkauan, atau belum Anda buka selama 36 jam sama-sama membiarkan alarm ponsel persis di tempatnya. Ada pula komplikasi untuk tampilan jam.`,
    account: `Tidak ada akun yang perlu dibuat, tetapi Anda bisa masuk dengan Apple atau Google jika menginginkan satu hal darinya: cadangan, supaya alarm, pengaturan, skor, dan runtunan Anda kembali di ponsel baru. Fitur ini nonaktif secara default, semuanya berfungsi tanpa masuk, dan tidak ada apa pun pada pukul 6 pagi yang pernah menunggu jaringan.`,
  },

  /** Galeri tangkapan layar toko aplikasi (src/components/StoreGallery.astro). */
  gallery: {
    tablistAria: `Pilih platform`,
    rails: {
      ios: { label: `iPhone`, store: `App Store` },
      android: { label: `Android`, store: `Google Play` },
    },
    railHeading: `{label} — seperti yang tampil di {store}`,
    altTemplate: `WakeSharp di {label}: {caption}`,
    fallbackCaption: `tangkapan layar aplikasi`,
    /** Nomor bingkai → apa yang ditampilkan, termasuk judul (berbahasa Inggris) yang tercetak di dalamnya. */
    captions: {
      '01': `Layar beranda dengan alarm berikutnya dan aturan kalender pintar, berjudul “Wake up sharp. Not just awake.” (Bangun sigap. Bukan sekadar terjaga.)`,
      '02': `Alarm berbunyi di atas layar kunci, berjudul “Complete a mission for full credit” (Selesaikan misi untuk nilai penuh)`,
      '03': `Misi Mind Games yang mematikan alarm, berjudul “Solve to silence” (Selesaikan untuk mematikan)`,
      '04': `Permainan pemanasan, berjudul “5 brain games. 3 every morning.” (5 permainan otak. 3 setiap pagi.) dan mencatat bahwa rotasinya hadir bersama WakeSharp Plus`,
      '05': `Pengungkapan Sharpness Score harian, dinilai terhadap acuan Anda sendiri`,
      '06': `Editor aturan alarm pintar, berjudul “Wakes you before your first meeting” (Membangunkan Anda sebelum rapat pertama)`,
      '07': `Statistik tren dan runtunan Sharpness: runtunan dan pembeku gratis, riwayat lengkap dengan WakeSharp Plus`,
    },
  },

  yours: {
    heading: { pre: `Jadikan pagi `, accent: `milik Anda`, post: `` },
    lede: `Alarm yang benar-benar ingin Anda dengar, di balik gambar yang benar-benar ingin Anda lihat.`,
    cards: [
      { title: `13 nada, semuanya gratis`, body: `Dari Dawn (fajar) hingga Smoke Alarm (alarm asap), dan setiap nada juga punya kembaran yang lebih lembut.` },
      { title: `Wallpaper dan adegan`, body: `Tiga wallpaper gratis dan lima dengan Plus, dan si Lark (burung maskot) mendapat empat adegan tambahan, masing-masing dengan perayaannya sendiri.` },
      { title: `Terang, gelap, atau tidak keduanya`, body: `Pilih tampilan atau biarkan mengikuti perangkat Anda; apa pun pilihannya, paletnya bergeser mengikuti jam.` },
      { title: `Pendaratan yang lebih lembut`, body: `Gentle start (awal lembut) di iPhone membuka nada dengan pelan dan naik ke volume penuh sekitar 25 detik kemudian. Di Android, efek matahari terbit mencerahkan layar dan menaikkan volume sebelum alarm.` },
    ],
  },

  pricing: {
    heading: { pre: `Alarm Anda berbunyi `, accent: `gratis, selamanya`, post: `` },
    lede: `Tanpa iklan pula. Dua dari lima misi juga gratis, bersama semua 13 nada, Strict Mode, preset tunda, dan pemeriksaan keandalan. Plus untuk pagi setelah alarm: misi lainnya, lebih banyak permainan pemanasan, lebih banyak aturan pintar, dan seluruh riwayat.`,
    free: {
      name: `Gratis`,
      price: `$0`,
      tagline: `Tanpa pendaftaran, tanpa uji coba yang bisa terlupa.`,
      /** Mencerminkan batasan yang benar-benar diberlakukan paywall yang dirilis. */
      features: [
        `Alarm sebanyak yang Anda butuhkan`,
        `Dua misi bangun: Mind Games dan Photo Proof`,
        `Semua 13 nada alarm`,
        `Strict Mode, preset tunda, dan pemeriksaan keandalan`,
        `Satu alarm kalender pintar, satu rotasi shift, satu profil`,
        `Pencarian, pengurutan, dan tampilan Hari Ini`,
        `Runtunan, token pembeku, dan tonggak pencapaian`,
        `Satu permainan pemanasan setelah setiap misi, dan tren 7 hari Anda`,
        `Bangun bersama teman, dan aplikasi jam tangan untuk kedua pergelangan`,
        `Tiga wallpaper alarm dan adegan Classic Lark`,
      ],
    },
    plus: {
      name: `WakeSharp Plus`,
      perMonth: `/bulan`,
      annual: `atau **{annual}/tahun**, dengan uji coba gratis {trialDays} hari`,
      lifetime: `atau **{lifetime} sekali bayar**, yaitu Lifetime (seumur hidup), yang tidak pernah diperpanjang`,
      /** Item 2-6 adalah lima poin di paywall, sesuai urutannya. */
      features: [
        `Semua yang ada di paket Gratis`,
        `Setiap misi bangun di luar Mind Games dan Photo Proof`,
        `Tiga permainan pemanasan setiap pagi, bergiliran`,
        `Riwayat Sharpness lengkap Anda`,
        `Alarm kalender pintar tanpa batas jumlah`,
        `Adegan Lark, wallpaper alarm, dan perayaan`,
        `Rotasi shift dan profil sebanyak yang Anda mau, dan kebijakan tunda kustom`,
      ],
    },
    lapse: `Plus diperiksa saat Anda membuat alarm, bukan saat alarm berbunyi. Alarm yang sudah membawa misi pindai atau jalan kaki terus menjalankannya, baik langganan masih aktif maupun tidak: tidak ada yang sudah Anda setel yang berhenti berfungsi. Yang berakhir hanyalah kemampuan menyetel yang baru.`,
    billing: `Paket bulanan dan tahunan ditagih oleh Apple atau Google dan diperpanjang sampai dibatalkan; batalkan kapan saja di akun toko aplikasi Anda, dan perhatikan bahwa menghapus aplikasi tidak membatalkan langganan. Lifetime adalah pembayaran tunggal tanpa apa pun yang perlu dibatalkan. Lihat [Ketentuan](terms).`,
    /** Hanya di halaman terlokalisasi: toko aplikasi melokalkan harga saat runtime. */
    usdNote: `Harga ditampilkan dalam dolar AS; App Store dan Google Play menampilkan harga untuk negara Anda.`,
  },

  faq: {
    heading: { pre: `Pertanyaan, `, accent: `terjawab`, post: `` },
    items: [
      {
        q: `Apakah benar-benar berbunyi saat Mode Hening, Fokus, atau Jangan Ganggu aktif?`,
        a: `Perilakunya berbeda per platform, dan bergantung pada izin. Di iPhone, WakeSharp memakai AlarmKit dari Apple, yang mendukung bunyi menembus Mode Hening dan Fokus begitu Anda memberikan akses alarm; tolak atau cabut izin itu dan WakeSharp tidak bisa menjadwalkan apa pun sama sekali. Di Android, alarm diputar di saluran audio khusus alarm, yang tidak dibungkam Jangan Ganggu, dan menampilkan peringatan layar penuh di atas layar kunci, asalkan izin alarm tepat waktu, notifikasi, dan layar kunci sudah diberikan. Yang tidak bisa dilakukan aplikasi mana pun adalah berbunyi di ponsel yang mati atau kehabisan baterai, jadi untuk urusan yang benar-benar tidak boleh Anda lewatkan, setel alarm kedua di perangkat lain.`,
      },
      {
        q: `Bagaimana cara memastikan alarm saya benar-benar akan berbunyi?`,
        a: `Buka Pengaturan → Alarm reliability (keandalan alarm). WakeSharp membaca kondisi di ponsel Anda yang bisa menghentikan alarm (izin, volume alarm, pengaturan notifikasi, pengambilalihan layar kunci, pembatasan baterai) dan langsung memberi kesimpulan yang jelas, bukan janji. Saat platform tidak mau memberi tahu sesuatu, WakeSharp mengakuinya alih-alih menampilkan centang hijau, karena daftar periksa yang diam-diam mengubah ketidakpastian menjadi lolos lebih buruk daripada tidak ada daftar periksa sama sekali. Jika alarm sampai gagal, aplikasi bisa memberi tahu penyebab yang bisa dibuktikan setelahnya, atau mengakui bahwa penyebabnya tidak bisa dipastikan.`,
      },
      {
        q: `Apakah saya harus berhitung pada pukul 6 pagi?`,
        a: `Hanya jika Anda mau. Dua misi gratisnya adalah Mind Games, yaitu tiga soal aritmetika, dan Photo Proof, yang hanya meminta foto sesuatu (langit, tempat tidur yang sudah dirapikan, segelas air) sesuai petunjuk yang bergilir tiap hari. Plus menambahkan memindai benda nyata di seberang ruangan, berjalan sejumlah langkah tertentu, dan “Surprise me”, yang memilih salah satunya dan menguncinya untuk alarm itu pada hari itu, jadi tidak ada yang bisa diatur malam sebelumnya. Setiap misi punya jalan keluar yang berakhir di Mind Games dengan nilai penuh, jadi kamera yang mati atau ponsel yang tertinggal di nakas tidak pernah menjebak Anda.`,
      },
      {
        q: `Bisakah saya curang dan melewati misi?`,
        a: `Anda bisa mematikan alarm tanpa misi: tombol berhenti milik ponsel Anda sendiri selalu berfungsi, dan kami memang tidak ingin sebaliknya. WakeSharp kemudian menampilkan layar misi terutang saat Anda membukanya lagi, dan misi susulan bisa menjaga runtunan Anda tetap hidup dengan setengah nilai. Menunda alarm adalah kebijakan yang Anda pilih, bukan aturan yang dipaksakan: nonaktif, standar dua kali tunda masing-masing lima menit, atau Tighten (makin rapat), yang mempersingkat tiap jeda dan menaikkan kesulitan seiring waktu. Setiap penundaan mengurangi Sharpness. Strict Mode (mode ketat), di perangkat yang mendukung, memesan empat dering ulang di muka (pada 45 detik, lalu 4, 8, dan 12 menit), dan menyelesaikan misi membatalkan dering yang belum sempat berbunyi.`,
      },
      {
        q: `Apa yang dilakukan kamera?`,
        a: `Dua misi memakainya, dan hanya saat misi itu berjalan atau saat Anda menyiapkannya. Scan an Object (pindai objek) mengklasifikasikan bingkai gambar di perangkat Anda (framework Vision dari Apple di iPhone, model kecil bawaan aplikasi di Android) untuk memastikan Anda sedang melihat benda yang Anda pilih. Photo Proof meminta satu foto, dan versi terverifikasinya membandingkan foto itu dengan referensi yang Anda daftarkan, juga di perangkat Anda. Tidak ada yang diunggah, tidak ada yang ditambahkan ke galeri foto Anda, dan foto utuhnya tidak pernah disimpan; hanya sidik jari kecilnya. Tolak izinnya, dan semua misi lain tetap berfungsi.`,
      },
      {
        q: `Apakah WakeSharp melacak tidur saya?`,
        a: `Tidak. Tidak ada pelacakan tidur dalam bentuk apa pun: tidak ada mikrofon yang mendengarkan semalaman, tidak ada tahapan tidur, tidak ada skor untuk malam Anda, dan tidak ada pendapat tentang kapan Anda tertidur. Penghitung langkah dibaca selama misi jalan kaki dan tidak di waktu lain. WakeSharp mengukur seberapa sigap Anda begitu sudah bangun, dan tidak ada apa pun sebelum itu. Satu-satunya hal yang mirip urusan tidur di dalamnya adalah waktu tidur yang Anda tentukan sendiri dan pengingat bersiap tidur yang opsional.`,
      },
      {
        q: `Apa persisnya yang dibaca dari kalender saya?`,
        a: `Acara mendatang Anda, hanya-baca, sepenuhnya di perangkat Anda, untuk satu tujuan: menentukan jam berapa harus membangunkan Anda. Tidak ada yang dikirim ke mana pun. Fitur ini opsional, dan semua fitur lain tetap berfungsi jika Anda menolaknya.`,
      },
      {
        q: `Apakah saya perlu akun?`,
        a: `Tidak, dan tidak ada yang dikunci di balik akun: tidak ada email dan tidak ada kata sandi di mana pun dalam aplikasi. Anda bisa memilih masuk dengan Apple atau Google untuk satu tujuan saja: mencadangkan alarm, pengaturan, skor, dan runtunan Anda supaya kembali di ponsel baru. Fitur ini nonaktif secara default, setiap fitur berfungsi tanpa masuk, dan alarm tidak pernah menunggu jaringan untuk berbunyi. Hapus akun dari Pengaturan → Akun, atau di wakesharp.app/account/delete.`,
      },
      {
        q: `Bagaimana jika jam tangan saya mati?`,
        a: `Ponsel Anda berbunyi. Jam tangan mengetuk Anda lebih dulu, dan WakeSharp menggeser alarm ponsel beberapa menit kemudian sebagai cadangan, jadi hanya pemberhentian di jam tangan yang membatalkannya. Jam tangan yang habis baterai, di luar jangkauan, atau belum Anda buka selama 36 jam sama-sama membiarkan alarm ponsel persis di tempatnya. Alarm penjaga dari Strict Mode tetap berbunyi di ponsel apa pun yang terjadi.`,
      },
      {
        q: `Apa yang gratis dan apa yang Plus?`,
        a: `Alarm Anda berbunyi gratis, selamanya, tanpa iklan. Gratis mencakup alarm sebanyak yang Anda butuhkan, misi Mind Games dan Photo Proof, semua 13 nada alarm, Strict Mode, preset tunda, pemeriksaan keandalan, runtunan dan token pembeku, satu permainan pemanasan setelah setiap misi, satu alarm kalender pintar, satu rotasi shift, satu profil, aplikasi jam tangan, dan tren Sharpness 7 hari Anda. Plus menambahkan misi lainnya (pindai, jalan kaki, dan Surprise me), tiga permainan pemanasan bergiliran setiap pagi, alarm kalender pintar tanpa batas jumlah, rotasi dan profil sebanyak yang Anda mau, riwayat Sharpness lengkap Anda, kebijakan tunda kustom, serta adegan Lark, wallpaper, dan perayaan.`,
      },
      {
        q: `Apa yang terjadi pada alarm Plus saya jika saya berhenti membayar?`,
        a: `Alarm tetap berfungsi. Pemeriksaan terjadi saat Anda membuat alarm, bukan saat alarm berbunyi, jadi alarm yang sudah membawa misi pindai atau jalan kaki terus menjalankannya, baik langganan masih aktif maupun tidak. Yang hilang adalah kemampuan menyetel yang baru, bersama permainan pemanasan tambahan dan riwayat lengkap.`,
      },
      {
        q: `Apakah Lifetime itu langganan?`,
        a: `Bukan. Lifetime adalah pembayaran tunggal untuk fitur WakeSharp Plus yang sama: tidak diperpanjang, dan tidak ada yang perlu dibatalkan. Paket bulanan dan tahunan memang diperpanjang sampai Anda menghentikannya. Uji coba gratis 7 hari melekat pada paket tahunan.`,
      },
      {
        q: `Bagaimana cara membatalkan?`,
        a: `Lewat App Store atau Google Play, kapan saja. Menghapus aplikasi tidak membatalkan langganan. Lifetime tidak punya apa pun untuk dibatalkan: ini pembelian sekali bayar, dan Restore Purchases (pulihkan pembelian) mengembalikannya di ponsel baru.`,
      },
      {
        q: `Apakah aplikasi ini melacak saya?`,
        a: `Tidak ada ID iklan, tidak ada lokasi, dan tidak ada pelacakan lintas aplikasi lain. Yang keluar dari perangkat Anda: analitik penggunaan anonim (ID acak dan layar mana yang Anda pakai; tidak pernah alarm, kalender, atau kamera Anda), data langganan jika Anda membeli Plus, dan cadangan Anda sendiri jika Anda memilih membuat akun. Akun Anda tidak pernah digabungkan dengan analitik. Kebijakan privasi mencantumkan setiap byte-nya.`,
      },
    ],
  },

  cta: {
    heading: { pre: `Pagi esok dimulai `, accent: `malam ini`, post: `` },
    lede: `Setel satu alarm. Rasakan sendiri seperti apa pagi yang sigap itu.`,
  },
} satisfies typeof en;
