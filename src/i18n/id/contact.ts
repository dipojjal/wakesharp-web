import { contact as en } from '../en/contact';

/**
 * Formulir kontak dan dua halaman hasilnya. `<select>` mempertahankan atribut
 * `value=` berbahasa Inggris di setiap lokal (src/templates/ContactPage.astro)
 * supaya kotak masuk dukungan membaca satu kosakata; hanya label yang terlihat
 * di bawah ini yang diterjemahkan.
 */
export const contact = {
  form: {
    title: `Kontak — WakeSharp`,
    description: `Kirim pesan langsung ke pengembang WakeSharp: laporan bug, masalah alarm, pertanyaan langganan, dan permintaan fitur.`,
    heading: `Kontak`,
    intro: `WakeSharp adalah tim kecil, dan semua yang masuk ke sini dibaca oleh manusia.`,
    callout: `Saya biasanya membalas dalam **2–3 hari kerja**. Jika Anda lebih suka memakai aplikasi email sendiri, tulis ke [{email}](email); pesannya sampai ke kotak masuk yang sama.`,
    nameLabel: `Nama Anda`,
    emailLabel: `Email Anda`,
    emailHint: `Supaya saya bisa membalas. Tidak dipakai untuk hal lain.`,
    topicLabel: `Tentang apa ini?`,
    topicPlaceholder: `Pilih satu…`,
    topics: {
      alarm: `Alarm tidak berbunyi`,
      bug: `Laporan bug`,
      billing: `Langganan atau penagihan`,
      feature: `Permintaan fitur`,
      other: `Hal lain`,
    },
    deviceLabel: `Ponsel dan versi OS`,
    deviceHint: `— opsional, tetapi menjawab separuh pertanyaan lanjutan saya`,
    devicePlaceholder: `mis. Pixel 9, Android 16`,
    messageLabel: `Pesan`,
    messageHint: `Untuk bug, apa yang Anda harapkan dan apa yang justru terjadi adalah hal paling berguna yang bisa Anda sampaikan. Jika alarm gagal, jam alarm disetel dan jam Anda menemukan ponsel sangat membantu.`,
    honeypotLabel: `Perusahaan`,
    submit: `Kirim pesan`,
    privacyNote: `Pesan dan alamat email Anda dikirim ke saya lewat email dan tidak disimpan di tempat lain. Lihat [Kebijakan Privasi](privacy).`,
  },
  sent: {
    title: `Pesan terkirim — WakeSharp`,
    description: `Pesan Anda untuk WakeSharp telah terkirim.`,
    heading: `Pesan terkirim`,
    intro: `Terima kasih; pesannya sedang menuju kotak masuk saya.`,
    body: `Saya biasanya membalas dalam **2–3 hari kerja**, dari [{email}](email). Jika tidak ada kabar, periksa folder spam Anda sebelum menganggapnya hilang.`,
    meanwhile: `Sambil menunggu, [halaman Dukungan](support) membahas pertanyaan yang paling sering muncul, termasuk daftar periksa lengkap untuk alarm yang tidak berbunyi.`,
    backHome: `Kembali ke beranda`,
  },
  error: {
    title: `Pesan tidak terkirim — WakeSharp`,
    description: `Formulir kontak WakeSharp tidak dapat mengirimkan pesan Anda.`,
    heading: `Yang ini tidak sampai`,
    intro: `Pesan Anda tidak terkirim, dan saya lebih memilih memberi tahu daripada berpura-pura sebaliknya.`,
    callout: `Silakan tulis langsung ke [{email}](email) sebagai gantinya. Tidak ada yang Anda ketik yang tersimpan, jadi pesannya perlu diketik ulang; maaf soal itu.`,
    body: `Anda juga akan sampai di sini jika ada kolom wajib yang kosong, alamat emailnya tidak valid, atau pesannya melebihi batas 4.000 karakter yang diizinkan formulir.`,
    backToForm: `Kembali ke formulir`,
    support: `Dukungan`,
    homepage: `Beranda`,
  },
} satisfies typeof en;
