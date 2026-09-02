import { legal as en } from '../en/legal';

/** The legal pages stay in English; only this notice and the titles are Turkish. */
export const legal = {
  privacy: {
    title: `Gizlilik Politikası — WakeSharp`,
    heading: `Gizlilik Politikası`,
  },
  terms: {
    title: `Hizmet Koşulları — WakeSharp`,
    heading: `Hizmet Koşulları`,
  },
  englishOnly: `Bu belge yalnızca İngilizce olarak mevcuttur ve geçerli sürüm aşağıdaki İngilizce metindir. İçinde anlaşılmayan bir şey varsa [{email}](email) adresine yazın; bir insan size açıklasın.`,
} satisfies typeof en;
