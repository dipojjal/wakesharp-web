import { blog as en } from '../en/blog';

/**
 * Kerangka blog: halaman indeks, bingkai artikel, dan kartu di akhir artikel.
 * Isi artikel berupa Markdown di src/content/blog/<jalur lokal>/, bukan di sini.
 * `{date}` dan `{minutes}` disediakan oleh tata letak.
 */
export const blog = {
  index: {
    title: `Sains Tidur & Tips Bangun Pagi: Blog WakeSharp`,
    description: `Panduan berbasis riset untuk bangun tepat waktu dengan kepala jernih: inersia tidur, menunda alarm, alarm gagal, kafein, melatonin, dan pagi lebih baik.`,
    heading: `Blog WakeSharp`,
    intro: `Sains tidur, rutinitas pagi, dan sesekali pembaruan produk, dari pembuat alarm yang memastikan Anda benar-benar sigap.`,
    empty: `Artikel pertama sedang dalam perjalanan; cek lagi sebentar lagi.`,
  },
  /** Ditambahkan ke judul artikel di tab browser, jika seluruh judulnya masih muat dalam 60 karakter. */
  titleSuffix: ` - WakeSharp`,
  /** Baris di bawah judul artikel jika pendiri sudah meninjaunya. `{name}` adalah tautan ke /about. */
  reviewedBy: `Ditinjau oleh {name}`,
  allArticles: `← Semua artikel`,
  updated: `Diperbarui {date}`,
  minRead: `{minutes} menit baca`,
  tagsAria: `Tag`,
  related: { aria: `Artikel terkait`, heading: `Bacaan terkait` },
  cta: {
    aria: `Unduh WakeSharp`,
    heading: `Bangun sigap besok pagi`,
    /** `{trialDays}` dan `{annual}` berasal dari src/config/site.ts; uji coba tidak pernah tampil tanpa harganya. */
    body: `Mulai dengan uji coba gratis {trialDays} hari untuk WakeSharp Unlimited, lalu {annual} per tahun. Menyetel alarm pertama Anda hanya butuh sekitar sepuluh detik.`,
  },
  /** Satu label per kategori di src/lib/blog-categories.ts; kategori baru butuh label di setiap lokal. */
  categories: {
    'sleep-science': `Sains Tidur`,
    'morning-routines': `Rutinitas Pagi`,
    productivity: `Produktivitas`,
    'product-updates': `Pembaruan Produk`,
    'tips-and-tricks': `Tips & Trik`,
    company: `Perusahaan`,
  },
} satisfies typeof en;
