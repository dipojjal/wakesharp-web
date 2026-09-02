import { share as en } from '../en/share';

/**
 * Dua halaman pendaratan tautan, /c (tantangan "Kalahkan bangun pagiku") dan
 * /p (pakta bangun pagi). String `script` dibaca oleh dekoder inline tiap
 * halaman; `{name}`, `{rounds}`, `{difficulty}`, `{seconds}`, `{time}` dan
 * `{days}` diisi skrip itu dari tautannya sendiri.
 */
export const share = {
  challenge: {
    title: `Tantangan bangun pagi — WakeSharp`,
    description: `Seseorang menantang Anda untuk pagi ala WakeSharp.`,
    heading: `Kalahkan bangun pagiku`,
    intro: `Seseorang yakin bangunnya lebih sigap daripada Anda nanti.`,
    opening: `Membuka tantangan…`,
    cta: `Buka tautan ini di ponsel Anda yang sudah terpasang WakeSharp untuk memainkan misi pagi yang sama, dengan seed yang sama, dan lihat apakah Anda bisa mengalahkannya.`,
    error: `Tautan ini tidak bisa dibaca. Aplikasi chat kadang memotong tautan panjang menjadi dua, jadi minta pengirimnya mengirim ulang.`,
    script: {
      anonymous: `Seseorang`,
      summary: `{name} menyelesaikan {rounds} ronde {difficulty} dalam {seconds} detik.`,
      difficulty: { easy: `mudah`, standard: `standar`, hard: `sulit` },
    },
  },
  pact: {
    title: `Undangan bangun pagi — WakeSharp`,
    description: `Seseorang membagikan alarm WakeSharp kepada Anda.`,
    heading: `Undangan bangun pagi`,
    intro: `Seseorang ingin bangun bersama Anda.`,
    opening: `Membuka undangan Anda…`,
    cta: `Buka tautan ini di ponsel Anda yang sudah terpasang WakeSharp, dan alarmnya akan disetel untuk Anda. Tidak ada yang dibagikan selain waktunya: ponsel Anda membunyikannya sendiri, tanpa akun dan tanpa server yang terlibat.`,
    error: `Tautan ini tidak bisa dibaca. Aplikasi chat kadang memotong tautan panjang menjadi dua, jadi minta pengirimnya mengirim ulang.`,
    script: {
      invited: `{name} mengajak Anda bangun pukul {time} · {days}`,
      invitedAnonymous: `Anda diajak bangun pukul {time} · {days}`,
      once: `sekali`,
      /** Minggu lebih dulu, sesuai mask hari dalam codec. */
      days: [`Min`, `Sen`, `Sel`, `Rab`, `Kam`, `Jum`, `Sab`],
    },
  },
  get: {
    heading: `Unduh WakeSharp`,
    body: `Gratis, dan menyetel alarm pertama Anda hanya butuh sekitar sepuluh detik.`,
  },
} satisfies typeof en;
