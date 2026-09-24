import { home as en } from '../en/home';

/**
 * Beranda. Judul dipecah menjadi {pre, accent, post} karena kata yang disorot
 * adalah <span class="accent"> di templat; spasi di sekelilingnya ikut di dalam
 * string. `{ios}`, `{android}`, `{annual}`, `{monthly}` dan `{trialDays}`
 * berasal dari src/config/site.ts.
 *
 * Setiap klaim di sini harus berlaku untuk versi yang diunduh pembaca hari ini
 * dan untuk versi berikutnya (2.10 sampai 2.13 per 2026-09-24). Karena itu
 * halaman ini menjelaskan misi menurut jenisnya dan tidak pernah menyebut
 * berapa kali alarm kembali berbunyi: mekanisme itu berubah di antara
 * versi-versi tersebut. Sumbernya adalah Docs/marketing-execution/claims-matrix.md
 * di repo aplikasi dan deskripsi App Store. Aplikasinya tidak tersedia dalam
 * bahasa Indonesia, jadi nama fitur tetap dalam bahasa Inggris.
 */
export const home = {
  title: `WakeSharp — Alarm untuk Orang yang Susah Bangun, dengan Misi`,

  hero: {
    /** Ditampilkan di dalam <h1>, di atas slogan: kueri yang dibidik halaman ini. */
    kicker: `Alarm untuk orang yang susah bangun`,
    heading: { pre: `Bangun `, accent: `sigap.`, post: `Bukan sekadar terjaga.` },
    lede: `Untuk orang yang susah bangun dan butuh lebih dari sekadar tombol tunda. Menggeser layar bisa dilakukan orang yang nyaris belum sadar, jadi WakeSharp meminta misi sebagai gantinya: selesaikan soal, ambil foto, berjalan kaki, atau ucapkan jawaban dengan lantang. Setelah itu, WakeSharp menilai seberapa sigap Anda sebenarnya saat bangun.`,
    phoneAlt: `Layar beranda WakeSharp pada malam hari, menampilkan alarm pukul 06.40 dan aturan kalender pintar`,
  },

  trust: [
    `Berbunyi menembus Mode Hening dan Fokus di iPhone`,
    `Memberi tahu apa yang bisa menghentikannya, sejak malam sebelumnya`,
    `Tidak perlu akun WakeSharp`,
    `Pemrosesan kamera dan kalender berlangsung di ponsel Anda`,
    `WakeSharp tidak menampilkan iklan`,
  ],

  ring: {
    alt: `Alarm WakeSharp sedang berbunyi, dengan tombol mulai misi dan tunda`,
    heading: { pre: `Selesaikan misi untuk `, accent: `nilai penuh`, post: `` },
    lede: `Di iPhone, AlarmKit dari Apple menampilkan alarm sistem di atas layar kunci: menembus Mode Hening dan Fokus begitu akses alarm diberikan, bahkan jika aplikasinya sudah ditutup paksa. Di Android, alarm tepat waktu di saluran audio alarm berbunyi menembus mode senyap, dan menembus Jangan Ganggu jika mode itu mengizinkan alarm, dengan Extra Loud (ekstra keras) dan volume yang naik bertahap alih-alih langsung menggelegar. Bagaimanapun cara Anda membungkamnya, pagi Anda baru dihitung setelah misinya selesai.`,
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
    note: `Fitur ini ada di Pengaturan, dan pengingat sebelum tidur menyertakan temuan terburuknya supaya Anda melihatnya selagi masih ada waktu untuk memperbaikinya.`,
  },

  smart: {
    alt: `Editor aturan alarm pintar, diatur untuk berbunyi 90 menit sebelum rapat pertama`,
    heading: { pre: `Membangunkan Anda sebelum `, accent: `rapat pertama`, post: `` },
    lede: `“Bunyikan 90 menit sebelum rapat pertama saya.” WakeSharp membaca kalender di perangkat Anda, memeriksanya ulang sepanjang malam, dan memindahkan alarm saat rapatnya bergeser. Hanya-baca, opsional, dan tidak pernah dikirim ke mana pun.`,
    shifts: `Tidak semua minggu berjalan seperti minggu biasa. Rotasi shift menangani pola yang tidak mingguan (dua hari siang, dua hari malam, empat hari libur) dengan kalender pratinjau dan cara melewati satu tanggal tanpa menghapus apa pun. Profil menukar satu set alarm sekaligus untuk kerja, liburan, atau jaga. Pencarian, pengurutan, dan tampilan Hari Ini menjaga daftar tetap rapi saat alarmnya banyak.`,
    labels: `Sebutkan untuk apa Anda bangun (olahraga, berangkat kerja, sarapan) dan labelnya tertulis dengan sendirinya.`,
  },

  mission: {
    alt: `Misi Mind Games: selesaikan 9 dikurangi 4 untuk mematikan alarm`,
    heading: { pre: `Misi yang `, accent: `membuat Anda bangun`, post: `` },
    lede: `Sesuatu harus terjadi sebelum pagi Anda dihitung, dan Anda yang memilih apa: soal hitung, teka-teki, foto tempat yang Anda pilih semalam, langkah kaki sungguhan, atau jawaban yang diucapkan dengan lantang. Satu alarm bisa meminta beberapa misi berturut-turut, sesuai urutan pilihan Anda, dan jika salah satunya tidak bisa berjalan pagi itu (kamera rusak, ponsel tanpa penghitung langkah), WakeSharp beralih ke misi yang bisa.`,
    /**
     * Setiap misi yang ditawarkan editor alarm (entri GameCatalog.json dengan
     * `supportsMission`), dikelompokkan menurut apa yang dimintanya dari Anda.
     * `kind` adalah label kecil di sudut setiap kartu. Kalimat pendeknya adalah
     * `blurb` dari katalog itu sendiri, yang dinyatakan Supported apa adanya oleh
     * claims-matrix.md. Nama misi tetap dalam bahasa Inggris.
     */
    missions: [
      { name: `Mind Games`, kind: `Otak`, body: `Ronde soal hitung cepat yang harus Anda jawab dengan benar.` },
      { name: `Memory Match`, kind: `Otak`, body: `Balik kartunya dan temukan setiap pasangan.` },
      { name: `Sequence Recall`, kind: `Otak`, body: `Ulangi pola ketukan yang bertambah panjang setiap ronde.` },
      { name: `Colour Clash`, kind: `Otak`, body: `Ketuk warna tintanya, bukan katanya.` },
      { name: `Type It Out`, kind: `Otak`, body: `Ketik ulang satu baris kata demi kata, dengan koreksi otomatis dimatikan.` },
      { name: `Photo Proof`, kind: `Kamera`, body: `Ambil ulang foto tempat yang Anda pilih malam sebelumnya.` },
      { name: `Scan an Object`, kind: `Kamera`, body: `Bangun dan arahkan kamera ke botol, cangkir, atau wastafel.` },
      { name: `Fetch`, kind: `Kamera`, body: `Pergi dan temukan sesuatu yang berwarna biru, atau sesuatu yang Anda pakai untuk minum.` },
      { name: `Face Check`, kind: `Kamera`, body: `Buka mata Anda di depan kamera, lalu ikuti petunjuknya.` },
      { name: `Fruit Slash`, kind: `Kamera`, body: `Tebas buah yang melayang di udara dengan jari Anda.` },
      { name: `Walk It Off`, kind: `Gerak`, body: `Melangkahlah sungguhan, dihitung oleh ponsel Anda.` },
      { name: `First Light`, kind: `Gerak`, body: `Berjalanlah ke jendela dan pegang ponsel Anda di bawah cahaya.` },
      { name: `Serial Sevens`, kind: `Suara`, body: `Hitung mundur dengan selisih tujuh, dengan lantang.` },
      { name: `Name Five`, kind: `Suara`, body: `Sebutkan lima hal dari satu kategori, dengan lantang.` },
      { name: `Surprise Me`, kind: `Apa saja`, body: `Misi yang berbeda setiap pagi.` },
    ],
    note: `Misi adalah bagian dari alarm yang Anda buat, jadi kesepakatannya dibuat malam sebelumnya, bukan ditawar pada pukul 6 pagi.`,
  },

  games: {
    alt: `Permainan pemanasan Memory Match`,
    heading: { pre: `Dua menit `, accent: `pemanasan`, post: ` sambil menunggu air mendidih` },
    lede: `Mind Games, Memory Match, Sequence Recall, Word Dash, dan Reaction Tap: soal hitung, mencocokkan kartu, mengingat urutan, adu kata, dan ketuk reaksi. Tiga di antaranya dimainkan setiap pagi secara bergiliran, sehingga seluruh set berputar dalam seminggu, dan pemanasannya tidak pernah mengulang apa yang baru saja misi minta Anda lakukan. Tidak ada yang wajib; saat itu alarm sudah mati.`,
  },

  sharp: {
    alt: `Pengungkapan Sharpness Score harian`,
    heading: { pre: `Tahu seberapa `, accent: `sigap`, post: ` Anda saat bangun` },
    lede: `Satu angka dari 100 hasil pemanasan, Sharpness Score (skor kesigapan) Anda, dinilai terhadap acuan bergulir Anda sendiri, bukan terhadap orang asing. Ini skor di dalam aplikasi, bukan tes klinis, dan diri Anda kemarin adalah satu-satunya tolok ukur yang berarti pada pukul 6 pagi.`,
  },

  stats: {
    alt: `Grafik tren Sharpness dengan penghitung runtunan`,
    heading: { pre: `Lihat diri Anda makin `, accent: `sigap`, post: `` },
    lede: `Runtunan, garis tren, dan token pembeku untuk pagi-pagi ketika urusan hidup menyela. Tonggak pencapaian menanti di hari ke-7, 30, 100, dan 365, dan riwayat Sharpness lengkap Anda tersimpan sejak pagi pertama Anda.`,
  },

  together: {
    heading: { pre: `Ajak `, accent: `seseorang ikut serta`, post: `` },
    lede: `Bagikan tautan, dan ponsel yang membukanya menyetel alarm yang sama, lalu membunyikannya sendiri. Tidak ada yang perlu diikuti, tidak ada yang perlu didaftar, dan tidak ada server di tengahnya.`,
    cards: [
      { title: `Wake with a friend`, body: `Bangun bersama teman: Anda mengirim tautan; ponsel mereka membuat alarmnya secara lokal. Setiap orang menyimpan salinannya sendiri, jadi mengubah alarm Anda tidak menyentuh alarm mereka.` },
      { title: `Beat my wake`, body: `Kalahkan bangun pagiku: selesaikan misi, dan Anda bisa menantang seseorang dengan set soal yang identik, yaitu seed yang sama, ronde yang sama, tingkat kesulitan yang sama. Lalu ketahuan siapa di antara Anda berdua yang benar-benar sudah bangun.` },
    ],
    note: `Keduanya hanya tautan: ponsel yang menerimanya mengerjakan semuanya sendiri.`,
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
    /**
     * Nomor bingkai → apa yang ditampilkan, termasuk judul (berbahasa Inggris)
     * yang tercetak di dalamnya. Bingkai 04 dan 07 ditahan (StoreGallery.astro)
     * karena gambarnya masih mencetak skema harga lama, jadi keduanya tidak
     * punya keterangan sampai repo aplikasi merender ulang gambarnya.
     */
    captions: {
      '01': `Layar beranda dengan alarm berikutnya dan aturan kalender pintar, berjudul “Wake up sharp. Not just awake.” (Bangun sigap. Bukan sekadar terjaga.)`,
      '02': `Alarm berbunyi di atas layar kunci, berjudul “Complete a mission for full credit” (Selesaikan misi untuk nilai penuh)`,
      '03': `Misi Mind Games yang mematikan alarm, berjudul “Solve to silence” (Selesaikan untuk mematikan)`,
      '05': `Pengungkapan Sharpness Score harian, dinilai terhadap acuan Anda sendiri`,
      '06': `Editor aturan alarm pintar, berjudul “Wakes you before your first meeting” (Membangunkan Anda sebelum rapat pertama)`,
    },
  },

  yours: {
    heading: { pre: `Jadikan pagi `, accent: `milik Anda`, post: `` },
    lede: `Alarm yang benar-benar ingin Anda dengar, di balik gambar yang benar-benar ingin Anda lihat.`,
    cards: [
      { title: `Nada untuk setiap tipe tidur`, body: `Dari Dawn (fajar) hingga Smoke Alarm (alarm asap), dan setiap nada juga punya kembaran yang lebih lembut.` },
      { title: `Wallpaper dan adegan`, body: `Semua wallpaper alarm dan semua adegan si Lark (burung maskot) sudah termasuk, dan setiap adegan membawa perayaannya sendiri.` },
      { title: `Terang, gelap, atau tidak keduanya`, body: `Pilih tampilan atau biarkan mengikuti perangkat Anda; apa pun pilihannya, paletnya bergeser mengikuti jam.` },
      { title: `Pendaratan yang lebih lembut`, body: `Gentle start (awal lembut) di iPhone membuka nada dengan pelan dan naik ke volume penuh sekitar 25 detik kemudian. Di Android, efek matahari terbit mencerahkan layar dan menaikkan volume sebelum alarm.` },
    ],
  },

  pricing: {
    heading: { pre: `Satu paket, `, accent: `semuanya termasuk`, post: `` },
    lede: `WakeSharp Unlimited adalah seluruh aplikasi: setiap misi bangun, pemanasan harian, alarm kalender pintar, rotasi shift dan profil, riwayat Sharpness lengkap Anda, serta setiap adegan Lark dan wallpaper. WakeSharp tidak menampilkan iklan.`,
    unlimited: {
      name: `WakeSharp Unlimited`,
      perYear: `/tahun`,
      /** Uji coba dan harga sesudahnya selalu tampil bersama. */
      trial: `Mulai dengan **uji coba gratis {trialDays} hari**, lalu {annual} per tahun`,
      monthly: `atau **{monthly} per bulan**, tanpa uji coba`,
      features: [
        `Setiap misi bangun, dan beberapa berturut-turut jika Anda mau`,
        `Tiga permainan pemanasan setiap pagi, bergiliran`,
        `Riwayat Sharpness lengkap Anda`,
        `Alarm kalender pintar yang bisa ikut bergeser saat rapat pertama Anda bergeser`,
        `Rotasi shift, profil, dan alarm sebanyak yang Anda butuhkan`,
        `Pemeriksaan keandalan dan semua nada alarm`,
        `Setiap adegan Lark, wallpaper alarm, dan perayaan`,
        `Wake with a friend, dan aplikasi jam tangan untuk kedua pergelangan`,
        `Tanpa iklan`,
      ],
    },
    billing: `Paket tahunan dan bulanan ditagih oleh Apple atau Google dan diperpanjang sampai dibatalkan; batalkan kapan saja di akun toko aplikasi Anda, dan perhatikan bahwa menghapus aplikasi tidak membatalkan langganan. Uji coba gratis berlaku untuk pelanggan baru yang memenuhi syarat. Lihat [Ketentuan](terms).`,
    /** Hanya di halaman terlokalisasi: toko aplikasi melokalkan harga saat runtime. */
    usdNote: `Harga ditampilkan dalam dolar AS; App Store dan Google Play menampilkan harga untuk negara Anda.`,
  },

  faq: {
    heading: { pre: `Pertanyaan, `, accent: `terjawab`, post: `` },
    /** Jawaban boleh memakai {annual}, {monthly} dan {trialDays}; harga tidak pernah ditulis di katalog. */
    items: [
      {
        q: `Apakah benar-benar berbunyi saat Mode Hening, Fokus, atau Jangan Ganggu aktif?`,
        a: `Perilakunya berbeda per platform, dan bergantung pada izin. Di iPhone, WakeSharp memakai AlarmKit dari Apple, yang mendukung bunyi menembus Mode Hening dan Fokus begitu Anda memberikan akses alarm; tolak atau cabut izin itu dan WakeSharp tidak bisa menjadwalkan apa pun sama sekali. Di Android, alarm diputar di saluran audio khusus alarm, yang berbunyi menembus mode senyap, dan menembus Jangan Ganggu jika mode itu mengizinkan alarm (Senyap total membungkam semua suara, termasuk alarm), serta menampilkan peringatan layar penuh di atas layar kunci, asalkan izin alarm tepat waktu, notifikasi, dan layar kunci sudah diberikan. Yang tidak bisa dilakukan aplikasi mana pun adalah berbunyi di ponsel yang mati atau kehabisan baterai, jadi untuk urusan yang benar-benar tidak boleh Anda lewatkan, setel alarm kedua di perangkat lain.`,
      },
      {
        q: `Bagaimana cara memastikan alarm saya benar-benar akan berbunyi?`,
        a: `Buka Pengaturan → Alarm reliability (keandalan alarm). WakeSharp membaca kondisi di ponsel Anda yang bisa menghentikan alarm (izin, volume alarm, pengaturan notifikasi, pengambilalihan layar kunci, pembatasan baterai) dan langsung memberi kesimpulan yang jelas, bukan janji. Saat platform tidak mau memberi tahu sesuatu, WakeSharp mengakuinya alih-alih menampilkan centang hijau, karena daftar periksa yang diam-diam mengubah ketidakpastian menjadi lolos lebih buruk daripada tidak ada daftar periksa sama sekali. Jika alarm sampai gagal, aplikasi bisa memberi tahu penyebab yang bisa dibuktikan setelahnya, atau mengakui bahwa penyebabnya tidak bisa dipastikan.`,
      },
      {
        q: `Apakah saya harus berhitung pada pukul 6 pagi?`,
        a: `Hanya jika Anda mau. Misi hadir dalam beberapa jenis: soal hitung dan teka-teki, foto tempat yang Anda pilih malam sebelumnya, memindai benda nyata di seberang ruangan, berjalan kaki atau menuju jendela, mengetik satu baris, atau menjawab dengan suara lantang. Pilih yang cocok untuk Anda, dan satu alarm bisa meminta lebih dari satu misi. Surprise Me memilih misi yang berbeda setiap pagi, jadi tidak ada yang bisa diatur malam sebelumnya.`,
      },
      {
        q: `Bisakah saya curang dan melewati misi?`,
        a: `Kontrol bawaan ponsel Anda selalu berfungsi; Anda bisa mematikan ponsel, dan tidak ada aplikasi yang semestinya bisa mencegah hal itu. Namun, di dalam WakeSharp, menghentikan atau menunda alarm tidak menuntaskan pagi Anda: pagi baru dihitung setelah misinya selesai.`,
      },
      {
        q: `Apa yang dilakukan kamera?`,
        a: `Hanya misi yang membutuhkannya (di antaranya Photo Proof, Scan an Object, Fetch, Face Check, dan Fruit Slash), dan hanya saat salah satunya berjalan atau saat Anda menyiapkannya. Pengenalan objek dan pencocokan foto dilakukan di perangkat Anda. Tolak izinnya, dan setiap misi yang tidak membutuhkan kamera tetap berfungsi. Kebijakan privasi menjelaskan persis apa yang keluar dari ponsel Anda, jika memang ada, dan kapan.`,
      },
      {
        q: `Apakah WakeSharp melacak tidur saya?`,
        a: `Tidak. Tidak ada pelacakan tidur dalam bentuk apa pun: tidak ada mikrofon yang mendengarkan semalaman, tidak ada tahapan tidur, tidak ada skor untuk malam Anda, dan tidak ada pendapat tentang kapan Anda tertidur. Penghitung langkah dibaca selama misi jalan kaki dan tidak di waktu lain. WakeSharp mengukur seberapa sigap Anda begitu sudah bangun, dan tidak ada apa pun sebelum itu. Satu-satunya hal yang mirip urusan tidur di dalamnya adalah waktu tidur yang Anda rencanakan sendiri dan audio penenang sebelum tidur yang opsional.`,
      },
      {
        q: `Apa persisnya yang dibaca dari kalender saya?`,
        a: `Acara mendatang Anda, hanya-baca, sepenuhnya di perangkat Anda, untuk satu tujuan: menentukan jam berapa harus membangunkan Anda. Tidak ada yang dikirim ke mana pun. Fitur ini opsional, dan semua fitur lain tetap berfungsi jika Anda menolaknya.`,
      },
      {
        q: `Apakah saya perlu akun?`,
        a: `Tidak perlu akun WakeSharp: tidak ada email dan tidak ada kata sandi di mana pun dalam aplikasi. Anda bisa memilih masuk dengan Apple atau Google untuk satu tujuan saja: mencadangkan alarm, pengaturan, skor, dan runtunan Anda supaya kembali di ponsel baru. Fitur ini nonaktif secara default, setiap fitur berfungsi tanpa masuk, dan alarm tidak pernah menunggu jaringan untuk berbunyi. Hapus akun dari Pengaturan → Akun, atau di wakesharp.app/account/delete.`,
      },
      {
        q: `Bagaimana jika jam tangan saya mati?`,
        a: `Ponsel Anda berbunyi. Jam tangan mengetuk Anda lebih dulu, dan WakeSharp menggeser alarm ponsel beberapa menit kemudian sebagai cadangan, jadi hanya pemberhentian di jam tangan yang membatalkannya. Jam tangan yang habis baterai, di luar jangkauan, atau belum Anda buka selama 36 jam sama-sama membiarkan alarm ponsel persis di tempatnya.`,
      },
      {
        q: `Berapa biaya WakeSharp?`,
        a: `Hanya ada satu paket, WakeSharp Unlimited, dan semuanya sudah termasuk. Pelanggan baru bisa memulai dengan uji coba gratis {trialDays} hari untuk paket tahunan, lalu {annual} per tahun, atau memilih paket bulanan seharga {monthly} per bulan, yang tidak punya masa uji coba. Harga dalam dolar AS; App Store dan Google Play menampilkan harga untuk negara Anda. WakeSharp tidak menampilkan iklan.`,
      },
      {
        q: `Saya membeli Lifetime. Apakah tetap milik saya?`,
        a: `Ya. Lifetime (seumur hidup) dulu dibeli dengan sekali bayar, dan tetap menjadi milik Anda: tidak ada yang diperpanjang dan tidak ada yang perlu dibatalkan. Restore Purchases (pulihkan pembelian) mengembalikannya di ponsel baru, dengan akun Apple atau Google yang sama.`,
      },
      {
        q: `Bagaimana cara membatalkan?`,
        a: `Lewat App Store atau Google Play, kapan saja, termasuk selama masa uji coba gratis. Menghapus aplikasi tidak membatalkan langganan.`,
      },
      {
        q: `Apakah aplikasi ini melacak saya?`,
        a: `WakeSharp tidak menampilkan iklan, tetapi memang memasang iklan di tempat lain, dan mengukur iklan atau tautan mana yang membawa Anda ke aplikasi serta apakah itu berujung pada uji coba atau langganan. Di iPhone, WakeSharp bertanya lebih dulu: tolak, dan ID iklan Anda tidak pernah dibaca, sementara jaringan iklan hanya melihat hasil kampanye secara agregat. Di Android, semuanya berjalan seperti yang dijelaskan kebijakan privasi. Analitik produk bisa dimatikan di Pengaturan, dan label alarm serta detail kalender Anda tidak pernah dikirim. Kebijakan privasi mencantumkan persis apa saja yang keluar dari perangkat Anda.`,
      },
    ],
  },

  cta: {
    heading: { pre: `Pagi esok dimulai `, accent: `malam ini`, post: `` },
    lede: `Setel satu alarm. Rasakan sendiri seperti apa pagi yang sigap itu.`,
  },
} satisfies typeof en;
