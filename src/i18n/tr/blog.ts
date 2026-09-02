import { blog as en } from '../en/blog';

export const blog = {
  index: {
    title: `Blog — WakeSharp`,
    description: `Uyku bilimi, sabah rutinleri ve ürün haberleri; sizi toplantıya hazır uyandıran alarm WakeSharp’ın yapımcısından.`,
    heading: `WakeSharp Blogu`,
    intro: `Uyku bilimi, sabah rutinleri ve ara sıra ürün haberleri; gerçekten zinde olup olmadığınızı kontrol eden alarmın yapımcısından.`,
    empty: `İlk yazı yolda; kısa süre sonra tekrar bakın.`,
  },
  titleSuffix: ` — WakeSharp Blogu`,
  allArticles: `← Tüm yazılar`,
  updated: `Güncelleme: {date}`,
  minRead: `{minutes} dk okuma`,
  tagsAria: `Etiketler`,
  related: { aria: `İlgili yazılar`, heading: `Benzer yazılar` },
  cta: {
    aria: `WakeSharp’ı indirin`,
    heading: `Yarın zinde uyanın`,
    body: `Alarmınız sonsuza dek ücretsiz çalar, reklamsız. Mind Games, Photo Proof ve güvenilirlik kontrolü dahildir. İlk alarmınızı kurmak yaklaşık on saniye sürer.`,
  },
  categories: {
    'sleep-science': `Uyku bilimi`,
    'morning-routines': `Sabah rutinleri`,
    productivity: `Verimlilik`,
    'product-updates': `Ürün haberleri`,
    'tips-and-tricks': `İpuçları`,
    company: `Şirket`,
  },
} satisfies typeof en;
