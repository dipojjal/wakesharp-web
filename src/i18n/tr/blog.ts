import { blog as en } from '../en/blog';

export const blog = {
  index: {
    title: `Uyku Bilimi ve Uyanma İpuçları - WakeSharp Blogu`,
    description: `Zamanında ve zinde uyanmak için araştırmalara dayalı rehberler: uyku ataleti, erteleme, çalmayan alarmlar, kafein, melatonin ve daha iyi sabahlar.`,
    heading: `WakeSharp Blogu`,
    intro: `Uyku bilimi, sabah rutinleri ve ara sıra ürün haberleri; gerçekten zinde olup olmadığınızı kontrol eden alarmın yapımcısından.`,
    empty: `İlk yazı yolda; kısa süre sonra tekrar bakın.`,
  },
  /** Appended to a post's title in the browser tab, when the whole title still fits in 60 characters. */
  titleSuffix: ` - WakeSharp`,
  /** The line under a post's headline when the founder has reviewed it. `{name}` is a link to /about. */
  reviewedBy: `{name} tarafından incelendi`,
  allArticles: `← Tüm yazılar`,
  updated: `Güncelleme: {date}`,
  minRead: `{minutes} dk okuma`,
  tagsAria: `Etiketler`,
  related: { aria: `İlgili yazılar`, heading: `Benzer yazılar` },
  cta: {
    aria: `WakeSharp’ı indirin`,
    heading: `Yarın zinde uyanın`,
    /** `{trialDays}` and `{annual}` come from src/config/site.ts; the trial never appears without its price. */
    body: `WakeSharp Sınırsız’ı {trialDays} gün ücretsiz deneyerek başlayın; ardından yıllık ücret {annual}. İlk alarmınızı kurmak yaklaşık on saniye sürer.`,
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
