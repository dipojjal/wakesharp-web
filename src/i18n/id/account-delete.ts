import { accountDelete as en } from '../en/account-delete';

/** /account/delete — sumber penghapusan akun yang ditautkan formulir Keamanan data Google Play. */
export const accountDelete = {
  title: `Hapus akun Anda — WakeSharp`,
  description: `Cara menghapus akun WakeSharp opsional Anda beserta cadangan cloud-nya, dari dalam aplikasi atau lewat email.`,
  heading: `Hapus akun WakeSharp Anda`,
  intro: `Akun WakeSharp bersifat opsional; akun hanya ada untuk mencadangkan alarm, pengaturan, skor, dan runtunan Anda supaya bisa dipulihkan di ponsel baru. Menghapus akun Anda menghapus cadangan itu beserta loginnya, secara permanen.`,
  inApp: {
    heading: `Hapus dari dalam aplikasi`,
    steps: [
      `Buka WakeSharp dan masuk ke **Pengaturan**.`,
      `Ketuk **Akun**.`,
      `Ketuk **Hapus akun** dan konfirmasi.`,
    ],
    body: `Itu saja seluruh alurnya. Tindakan ini menghapus secara permanen login Anda (Masuk dengan Apple atau Google), cadangan cloud Anda (alarm, pengaturan, riwayat bangun, skor, runtunan, dan thumbnail referensi foto atau pindai yang pernah Anda daftarkan) dan, untuk Masuk dengan Apple, mencabut token masuknya di Apple. Tidak ada masa tunggu dan tidak ada penyimpanan sebagian: baris akun dan semua yang melekat padanya dihapus bersamaan.`,
  },
  kept: {
    heading: `Yang tidak dihapus`,
    items: [
      `**Data di ponsel Anda.** Alarm, skor, dan pengaturan tetap ada di perangkat Anda; menghapus akun bukan berarti menghapus alarm Anda. Hapus aplikasinya sendiri jika Anda juga ingin data di perangkat hilang.`,
      `**Pembelian.** WakeSharp Plus melekat pada akun App Store atau Google Play Anda, bukan akun WakeSharp Anda, dan tetap ada setelah penghapusan.`,
      `**Analitik penggunaan anonim**, yang memang sejak awal tidak pernah ditautkan ke akun Anda; lihat [kebijakan privasi](privacy).`,
    ],
  },
  byEmail: {
    heading: `Jika Anda sudah tidak punya aplikasinya`,
    body: `Kirim email ke [{email}](email) dari alamat yang Anda pakai untuk masuk (untuk Masuk dengan Apple dengan alamat tersembunyi, sebutkan perkiraan tanggal pendaftaran sebagai gantinya) dan kami akan menghapus akunnya untuk Anda. Kami memverifikasi permintaan itu dan menyelesaikan penghapusan dalam 30 hari, hampir selalu jauh lebih cepat.`,
  },
} satisfies typeof en;
