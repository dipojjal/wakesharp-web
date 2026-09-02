import { blog as en } from '../en/blog';

/**
 * Kerangka blog: halaman indeks, bingkai artikel, dan kartu di akhir artikel.
 * Isi artikel berupa Markdown di src/content/blog/<jalur lokal>/, bukan di sini.
 * `{date}` dan `{minutes}` disediakan oleh tata letak.
 */
export const blog = {
  index: {
    title: `Blog — WakeSharp`,
    description: `Sains tidur, rutinitas pagi, dan kabar produk dari pembuat WakeSharp, alarm yang membuat Anda siap rapat.`,
    heading: `Blog WakeSharp`,
    intro: `Sains tidur, rutinitas pagi, dan sesekali pembaruan produk, dari pembuat alarm yang memastikan Anda benar-benar sigap.`,
    empty: `Artikel pertama sedang dalam perjalanan; cek lagi sebentar lagi.`,
  },
  titleSuffix: ` — Blog WakeSharp`,
  allArticles: `← Semua artikel`,
  updated: `Diperbarui {date}`,
  minRead: `{minutes} menit baca`,
  tagsAria: `Tag`,
  related: { aria: `Artikel terkait`, heading: `Bacaan terkait` },
  cta: {
    aria: `Unduh WakeSharp`,
    heading: `Bangun sigap besok pagi`,
    body: `Alarm Anda berbunyi gratis, selamanya, tanpa iklan. Mind Games, Photo Proof, dan pemeriksaan keandalan sudah termasuk. Menyetel alarm pertama Anda hanya butuh sekitar sepuluh detik.`,
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
