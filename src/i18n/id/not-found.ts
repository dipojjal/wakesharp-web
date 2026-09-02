import { notFound as en } from '../en/not-found';

/** Halaman 404. Satu blok per lokal yang aktif dirender di muka; lihat src/pages/404.astro. */
export const notFound = {
  title: `Halaman tidak ditemukan — WakeSharp`,
  mascotAlt: `Maskot WakeSharp, tertidur`,
  heading: { pre: `Halaman ini masih `, accent: `tertidur.`, post: `` },
  body: `Kami tidak bisa menemukan halaman itu. Si Lark (burung maskot kami) menyarankan kembali ke awal.`,
  backHome: `Kembali ke WakeSharp`,
  support: `Dapatkan dukungan`,
} satisfies typeof en;
