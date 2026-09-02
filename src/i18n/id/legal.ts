import { legal as en } from '../en/legal';

/**
 * Kebijakan privasi dan ketentuan layanan tetap berbahasa Inggris: itulah teks
 * yang mengikat, dan kedua aplikasi menautkan URL bahasa Inggrisnya. Rute
 * terlokalisasi ada supaya pemilih bahasa tidak buntu, dan membawa
 * pemberitahuan ini di atas teks bahasa Inggris. Hanya string di bawah ini
 * yang diterjemahkan.
 */
export const legal = {
  privacy: {
    title: `Kebijakan Privasi — WakeSharp`,
    heading: `Kebijakan Privasi`,
  },
  terms: {
    title: `Ketentuan Layanan — WakeSharp`,
    heading: `Ketentuan Layanan`,
  },
  englishOnly: `Dokumen ini hanya tersedia dalam bahasa Inggris, dan teks bahasa Inggris di bawah inilah versi yang berlaku. Jika ada bagian yang kurang jelas, kirim email ke [{email}](email) dan orang sungguhan akan menjelaskannya.`,
} satisfies typeof en;
