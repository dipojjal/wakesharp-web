import { shell as en } from '../en/shell';

/**
 * String yang dipakai bersama oleh setiap halaman. `{publisher}`, `{year}`,
 * `{email}` dan `{date}` disediakan templat dari src/config/site.ts. Tiga
 * string yang dalam bahasa Inggris diimpor dari site.ts ditulis di sini
 * sebagai teks literal.
 */
export const shell = {
  siteDescription: `Alarm untuk orang yang susah bangun: bungkam dengan soal hitung cepat, foto satu tempat, atau berjalan kaki, lalu lihat seberapa sigap Anda saat bangun.`,
  tagline: `Bangun sigap. Bukan sekadar terjaga.`,
  requirements: { ios: `iOS 26 atau lebih baru`, android: `Android 8.0 atau lebih baru` },
  ogImageAlt: `WakeSharp — bangun sigap, bukan sekadar terjaga.`,
  rssTitle: `Blog WakeSharp`,
  skipLink: `Langsung ke konten`,
  brandHome: `WakeSharp — beranda`,

  nav: {
    aria: `Utama`,
    features: `Fitur`,
    pricing: `Harga`,
    blog: `Blog`,
    contact: `Kontak`,
    faq: `Tanya Jawab`,
    cta: `Unduh WakeSharp`,
  },

  language: {
    label: `Bahasa`,
    listAria: `Bahasa situs`,
  },

  footer: {
    product: `Produk`,
    legal: `Legal`,
    contact: `Kontak`,
    features: `Fitur`,
    sharpnessScore: `Sharpness Score`,
    pricing: `Harga`,
    blog: `Blog`,
    faq: `Tanya jawab`,
    privacy: `Kebijakan Privasi`,
    terms: `Ketentuan Layanan`,
    support: `Dukungan`,
    deleteAccount: `Hapus akun Anda`,
    about: `Tentang`,
    contactForm: `Formulir kontak`,
    builtBy: `Dibuat oleh {publisher}, sebuah studio independen kecil.`,
    pleaseNote: `Perhatian.`,
    /** Kalimat tanggung jawab. Terjemahkan apa adanya; jangan pernah dilunakkan. */
    safetyNotice: `WakeSharp bukan perangkat medis. Pengaturan ponsel, pembatasan baterai, atau kondisi daya ponsel Anda dapat mencegah alarm apa pun berbunyi. Gunakan alarm kedua yang terpisah untuk urusan apa pun yang tidak boleh sampai terlambat.`,
    fullSafetyNotice: `Pemberitahuan keselamatan lengkap`,
    rights: `© {year} {publisher}. Hak cipta dilindungi undang-undang.`,
  },

  /**
   * Ditampilkan di dekat tombol toko pada halaman terlokalisasi yang bahasanya
   * tidak tersedia di aplikasi itu sendiri (StoreButtons membaca
   * SITE.appLanguages), supaya situs tidak pernah menyiratkan aplikasi berbahasa
   * Indonesia. Sebutkan bahasa-bahasanya dalam bahasa lokal ini.
   */
  appLanguageNote: `Aplikasi WakeSharp tersedia dalam bahasa Inggris, Spanyol, Rusia, Turki, Jerman, Prancis, dan Arab.`,

  legalLayout: {
    lastUpdated: `Terakhir diperbarui {date}`,
    questions: `Ada pertanyaan tentang halaman ini? Kirim email ke [{email}](email).`,
  },

  lark: {
    hero: `Maskot WakeSharp, pose utama`,
    asleep: `Maskot WakeSharp, tertidur`,
    waking: `Maskot WakeSharp, sedang bangun`,
    focused: `Maskot WakeSharp, fokus`,
    celebrating: `Maskot WakeSharp, merayakan`,
    encouraging: `Maskot WakeSharp, menyemangati`,
  },
} satisfies typeof en;
