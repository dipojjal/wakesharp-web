import { support as en } from '../en/support';

/**
 * /support - URL dukungan di App Store Connect. Kunci tautan yang dipakai di
 * bawah: email, terms-safety, privacy, account-delete, apple-subs, google-subs.
 * `{ios}` dan `{android}` adalah string persyaratan, sedangkan `{annual}`,
 * `{monthly}` dan `{trialDays}` adalah harganya, semuanya dari src/config/site.ts.
 */
export const support = {
  title: `Dukungan WakeSharp: Alarm Tidak Berbunyi, Misi & Tagihan`,
  description: `Dapatkan bantuan untuk WakeSharp: mengapa alarm mungkin tidak berbunyi, cara kerja misi dan Sharpness Score, serta cara mengelola langganan Anda.`,
  heading: `Dukungan`,
  intro: `WakeSharp adalah tim kecil, dan emailnya dijawab oleh manusia.`,

  getInTouch: {
    heading: `Hubungi kami`,
    body: `Kirim email ke [{email}](email). Saya biasanya membalas dalam **2–3 hari kerja**. Menyertakan model ponsel, versi OS, dan versi WakeSharp dari Pengaturan hampir selalu membuat jawabannya lebih cepat.`,
  },

  requirements: {
    heading: `Persyaratan`,
    body: `WakeSharp memerlukan {ios} di iPhone, atau {android} di Android. Aplikasi jam tangannya memerlukan watchOS 26 atau Wear OS 3.`,
  },

  didntRing: {
    heading: `Alarm saya tidak berbunyi`,
    callout: `**Mulai dari aplikasi, bukan dari sini.** Buka WakeSharp → Pengaturan → _Alarm reliability_ (keandalan alarm). Fitur ini membaca kondisi ponsel Anda saat itu juga (izin, volume alarm, Jangan Ganggu, pengaturan notifikasi, pengambilalihan layar kunci, pembatasan baterai) dan langsung memberi kesimpulan yang jelas: akan berbunyi, mungkin tidak, atau tidak bisa. Jika perbaikannya tinggal satu ketukan, ketukan itu ditawarkan; jika ponsel tidak mau memberi tahu sesuatu, hal itu disampaikan apa adanya alih-alih menampilkan centang hijau. Fitur ini juga berjalan sebelum tidur dan menandai temuan terburuknya.`,
    report: `Jika alarm sudah telanjur terlewat, WakeSharp menampilkan laporan pagi itu yang menyebutkan penyebabnya bila bisa dibuktikan (izin dicabut, volume alarm nol, Senyap total, ponsel mati) dan mengatakan “Kami tidak bisa memastikan penyebabnya” bila tidak. Daftar periksa di bawah ini untuk saat WakeSharp tidak bisa memastikannya.`,
    iphone: {
      heading: `Di iPhone`,
      steps: [
        `**Pastikan alarm benar-benar aktif** di layar Beranda, dan hari pengulangannya mencakup hari ini.`,
        `**Periksa izin alarm.** Pengaturan → WakeSharp. Jika akses alarm ditolak, WakeSharp tidak bisa menjadwalkan apa pun. Aktifkan, lalu simpan ulang alarmnya.`,
        `**Periksa volume dan sakelar hening.** WakeSharp berbunyi menembus Mode Hening dan Fokus, tetapi tidak bisa berbunyi di perangkat yang mati atau kehabisan baterai.`,
        `**Periksa Bluetooth.** Jika ponsel Anda masih terhubung ke headphone atau mobil, alarm mungkin berbunyi di sana.`,
        `**Mulai ulang ponsel** dan simpan ulang alarmnya jika masih bermasalah.`,
      ],
    },
    android: {
      heading: `Di Android`,
      steps: [
        `**Pastikan alarm aktif** dan hari pengulangannya mencakup hari ini.`,
        `**Izinkan notifikasi.** Pengaturan → Aplikasi → WakeSharp → Notifikasi. Layar dering muncul sebagai notifikasi layar penuh; memblokir notifikasi berarti membungkamnya.`,
        `**Matikan pengoptimalan baterai untuk WakeSharp.** Pengaturan → Aplikasi → WakeSharp → Baterai → _Tidak dibatasi_. Ini penyebab paling umum di perangkat Samsung, Xiaomi, OPPO, vivo, dan OnePlus, yang lebih agresif daripada Android murni. Di Samsung, periksa juga Pengaturan → Baterai → Batas penggunaan latar belakang dan pastikan WakeSharp tidak ada di “Aplikasi tidur” atau “Aplikasi tidur nyenyak”.`,
        `**Pastikan Jangan Ganggu tidak disetel ke Senyap total.** Mode Hanya prioritas dan Hanya alarm tetap meloloskan alarm; Senyap total membungkamnya juga, dan tidak ada aplikasi yang bisa mengesampingkannya.`,
        `**Jangan “Paksa berhenti” WakeSharp.** Menghentikan paksa membatalkan alarm terjadwalnya sampai Anda membuka aplikasi lagi.`,
        `**Setelah mulai ulang, buka WakeSharp sekali.** Aplikasi mengaktifkan ulang alarm Anda saat ponsel menyala, tetapi membukanya memastikan sinkronisasinya sudah berjalan.`,
      ],
    },
    warning: `**Jika dibangunkan benar-benar penting, setel alarm kedua di perangkat lain.** WakeSharp menjadwalkan alarm lewat sistem operasi, dan OS-lah yang memutuskan apakah alarm itu berbunyi. Lihat [pemberitahuan keselamatan](terms-safety).`,
    /** Heading over the same-language troubleshooting posts, when there are any. */
    guidesHeading: `Panduan lengkap`,
  },

  ringsThrough: {
    heading: `Apakah WakeSharp benar-benar berbunyi menembus Mode Hening, Fokus, dan Jangan Ganggu?`,
    body: `Dalam kondisi normal, ya; itulah inti aplikasi ini, dan mekanismenya sama dengan yang dipakai aplikasi jam bawaan di tiap platform.`,
    items: [
      `**Di iPhone**, WakeSharp memakai AlarmKit dari Apple, yang mendukung bunyi menembus Mode Hening dan Fokus **begitu Anda memberikan izin alarm**. Tolak atau cabut izin itu dan WakeSharp tidak bisa menjadwalkan alarm sama sekali.`,
      `**Di Android**, alarm diputar di saluran audio khusus alarm, yang berbunyi menembus mode senyap, dan menembus Jangan Ganggu jika mode itu mengizinkan alarm (Senyap total membungkam semua suara, termasuk alarm), serta menampilkan peringatan layar penuh di atas layar kunci, **saat izin alarm tepat waktu, notifikasi, dan layar kunci sudah diberikan**. Tidak ada permintaan izin tambahan untuk saluran alarm itu sendiri, tetapi notifikasi yang diblokir atau pembatasan baterai tetap bisa menghentikan peringatannya.`,
    ],
    limit: `Yang tidak bisa dilakukan kedua platform adalah berbunyi di ponsel yang dimatikan, kehabisan baterai, atau izin aplikasinya sudah dicabut.`,
  },

  missions: {
    heading: `Misi dan tunda`,
    items: [
      `**Misi** adalah yang menebus pagi Anda, dan jumlahnya lebih dari selusin: teka-teki hitung dan memori seperti _Mind Games_ dan _Colour Clash_, foto tempat yang Anda pilih malam sebelumnya (_Photo Proof_), benda nyata di seberang ruangan (_Scan an Object_, _Fetch_), langkah kaki (_Walk It Off_), cahaya siang di jendela (_First Light_), mengetik satu baris (_Type It Out_), atau menjawab dengan suara lantang (_Serial Sevens_, _Name Five_). _Surprise Me_ (kejutkan saya) memilih misi yang berbeda setiap pagi. Satu alarm bisa meminta beberapa misi berturut-turut, sesuai urutan pilihan Anda.`,
      `**My spots & codes** (tempat & kode saya) adalah bagian yang membuat _Scan an Object_ terasa personal. Foto tempat yang akan Anda datangi, seperti ketel atau pintu depan, atau daftarkan kode QR atau barcode yang Anda tempel di tempat yang seharusnya Anda tuju di pagi hari, seperti cermin kamar mandi atau kaleng kopi. Alarm kemudian bisa meminta target spesifik itu. Ini fitur _di dalam_ misi pindai, bukan misi tersendiri, dan baik foto maupun kodenya tidak disimpan; hanya sidik jari dari masing-masing.`,
      `**Jika sebuah misi tidak bisa berjalan** pagi itu (kamera rusak, ponsel tanpa penghitung langkah), WakeSharp beralih ke misi yang bisa, jadi Anda tidak terjebak dengan alarm yang tidak bisa Anda selesaikan.`,
      `**Menunda dan menghentikan alarm tidak menuntaskan pagi Anda.** Bagaimanapun cara Anda membungkam alarm, pagi baru dihitung setelah misinya selesai. Kontrol bawaan ponsel Anda selalu berfungsi: mematikan ponsel, misalnya, tidak pernah dihalangi.`,
    ],
  },

  smartAlarms: {
    heading: `Alarm kalender pintar`,
    body: `Aturan pintar berbunyi sekian menit sebelum rapat pertama Anda, dibatasi antara waktu bangun paling awal dan paling akhir yang Anda pilih. WakeSharp memeriksa ulang kalender Anda sepanjang malam, jadi jika rapatnya bergeser, alarmnya ikut bergeser. Jika Anda menolak akses kalender, semua yang lain tetap berfungsi; Anda hanya perlu menyetel waktunya sendiri. Acara Anda tidak pernah keluar dari perangkat; lihat [Kebijakan Privasi](privacy).`,
    limits: `Rotasi shift ditujukan untuk pola yang tidak mingguan (4 hari kerja / 4 hari libur dari tanggal jangkar, tiap fase dengan waktunya sendiri) dan kalender pratinjau supaya Anda bisa memeriksanya sebelum mempercayakan tidur Anda padanya.`,
  },

  sharpness: {
    heading: `Sharpness Score (skor kesigapan)`,
    body: `Setelah misi, Anda bisa menjalankan pemanasan opsional: tiga dari lima permainan otak setiap pagi, secara bergiliran, sekitar dua menit semuanya, dengan melewati permainan apa pun yang baru saja misi minta Anda mainkan. Skor Anda diukur terhadap acuan bergulir Anda sendiri, bukan terhadap orang lain, jadi skornya menetap di sekitar 100 seiring aplikasi mempelajari kondisi normal Anda. Pagi yang buruk hanyalah penurunan dibanding diri Anda kemarin, tidak lebih. Ini skor di dalam aplikasi, bukan tes klinis maupun tes kognitif.`,
    physical: `**Skornya berasal dari pemanasan.** Misilah yang membuat Anda bangun; pemanasan otak opsional sesudahnya yang menghasilkan Sharpness Score Anda, jadi berjalan jauh ke dapur tidak pernah merugikan skor Anda.`,
  },

  backup: {
    heading: `Cadangan, dan pindah ke ponsel baru`,
    body: `Tidak ada akun yang perlu dibuat, dan tidak ada yang dikunci di balik akun. Anda bisa memilih masuk dengan **Apple** atau **Google** (hanya itu pilihannya, dan tidak ada login dengan email dan kata sandi) untuk satu tujuan saja: mencadangkan alarm, pengaturan, skor, dan runtunan Anda supaya kembali di ponsel baru.`,
    items: [
      `**Nonaktif secara default**, dan setiap fitur berfungsi tanpa masuk. Pencadangan berjalan diam-diam setelah data Anda berubah, dan alarm tidak pernah menunggu jaringan untuk berbunyi.`,
      `**Untuk pindah ke ponsel baru**, pasang WakeSharp, masuk dengan akun Apple atau Google yang sama, lalu pulihkan. Perubahan yang lebih baru yang sudah ada di perangkat baru tetap disimpan.`,
      `**Keluar** menyimpan semuanya di ponsel Anda dan hanya menghentikan pencadangannya.`,
      `**Menghapus akun** (di aplikasi lewat _Pengaturan → Akun → Hapus akun_, atau seperti dijelaskan di [wakesharp.app/account/delete](account-delete)) menghapus cadangan dan login secara permanen, sementara data di ponsel Anda tetap ada.`,
    ],
    subscription: `Langganan terpisah dari semua ini: langganan melekat pada akun App Store atau Google Play Anda, jadi Restore Purchases (pulihkan pembelian) mengembalikan WakeSharp Unlimited, baik Anda pernah masuk ke WakeSharp maupun tidak.`,
  },

  purchases: {
    heading: `Pembelian dan WakeSharp Unlimited`,
    items: [
      `**WakeSharp Unlimited** adalah seluruh aplikasi: setiap misi bangun, rotasi pemanasan harian, riwayat Sharpness lengkap Anda, alarm kalender pintar, rotasi shift dan profil, serta setiap adegan Lark dan wallpaper. Pelanggan baru bisa memulai dengan **uji coba gratis {trialDays} hari** untuk paket tahunan, lalu {annual} per tahun, atau memilih paket bulanan seharga {monthly} per bulan, yang tidak punya masa uji coba. WakeSharp tidak menampilkan iklan.`,
      `**Lifetime** (seumur hidup) dulu dijual sebagai pembelian sekali bayar, dan tetap berlaku bagi semua yang sudah membelinya: tidak pernah diperpanjang, dan tidak ada yang perlu dibatalkan.`,
      `**Memulihkan pembelian:** buka halaman langganan dan ketuk _Restore_ (pulihkan). Pastikan Anda masuk dengan akun Apple atau Google yang sama dengan yang Anda pakai saat membeli.`,
      `**Membatalkan:** [langganan App Store](apple-subs) atau [langganan Google Play](google-subs), kapan saja, termasuk selama masa uji coba gratis. Menghapus aplikasi tidak membatalkan langganan.`,
      `**Pengembalian dana** ditangani oleh Apple atau Google, bukan oleh kami; tetapi kirimi saya email jika ada yang salah, dan saya akan membantu sebisa saya.`,
    ],
  },

  deleting: {
    heading: `Menghapus data Anda`,
    body: `Semua yang dicatat WakeSharp tersimpan di ponsel Anda. Mencopot aplikasi menghapus semuanya, dan kami tidak menyimpan salinannya. Untuk catatan langganan anonim yang disimpan pemroses pembayaran kami, lihat [berapa lama data disimpan](privacy).`,
  },

  feedback: {
    heading: `Bug, masukan, dan permintaan fitur`,
    body: `Semuanya diterima dengan senang hati, di [{email}](email). Untuk bug, hal paling berguna untuk disertakan adalah model ponsel Anda, versi OS, apa yang Anda harapkan, dan apa yang justru terjadi. Jika alarm gagal berbunyi, jam alarm disetel dan jam Anda menemukan ponsel sangat membantu.`,
  },
} satisfies typeof en;
