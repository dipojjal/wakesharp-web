import { shell as en } from '../en/shell';

/**
 * السلاسل المشتركة بين كل الصفحات. تُزوَّد `{publisher}` و`{year}` و`{email}`
 * و`{date}` من القوالب انطلاقًا من src/config/site.ts. أما السلاسل التي تأتي في
 * الإنجليزية من site.ts فمكتوبة هنا نصًّا مترجمًا.
 */
export const shell = {
  siteDescription: `المنبه الذي يجعلك جاهزًا لاجتماعك الأول. مهمة تستحق بها صباحك — حلّها أو صوّرها أو امسحها أو امشِ لها — وإحماء ذهني يقيس مدى صفاء ذهنك عند الاستيقاظ، ومنبهات ذكية تقرأ تقويمك لتستيقظ قبل أول اجتماع لك.`,
  tagline: `استيقظ صافي الذهن. لا مجرد مستيقظ.`,
  requirements: { ios: `iOS 26 أو أحدث`, android: `Android 8.0 أو أحدث` },
  ogImageAlt: `WakeSharp — استيقظ صافي الذهن، لا مجرد مستيقظ.`,
  rssTitle: `مدونة WakeSharp`,
  skipLink: `تخطَّ إلى المحتوى`,
  brandHome: `WakeSharp — الصفحة الرئيسية`,

  nav: {
    aria: `رئيسي`,
    features: `المزايا`,
    pricing: `الأسعار`,
    blog: `المدونة`,
    contact: `تواصل معنا`,
    faq: `أسئلة شائعة`,
    cta: `حمّل WakeSharp`,
  },

  language: {
    label: `اللغة`,
    listAria: `لغة الموقع`,
  },

  footer: {
    product: `المنتج`,
    legal: `قانوني`,
    contact: `تواصل معنا`,
    features: `المزايا`,
    sharpnessScore: `Sharpness Score`,
    pricing: `الأسعار`,
    blog: `المدونة`,
    faq: `الأسئلة الشائعة`,
    privacy: `سياسة الخصوصية`,
    terms: `شروط الخدمة`,
    support: `الدعم`,
    deleteAccount: `حذف حسابك`,
    contactForm: `نموذج التواصل`,
    builtBy: `من صنع {publisher}، وهو استوديو صغير مستقل.`,
    pleaseNote: `يُرجى الانتباه.`,
    /** جملة المسؤولية. تُترجم بأمانة ولا تُخفَّف أبدًا. */
    safetyNotice: `WakeSharp ليس جهازًا طبيًا. قد تمنع إعدادات هاتفك أو قيود البطارية أو حالة الطاقة أي منبه من أن يصدر صوتًا. استخدم منبهًا ثانيًا مستقلًا لكل ما لا يمكنك أن تتأخر عنه.`,
    fullSafetyNotice: `إشعار السلامة الكامل`,
    rights: `© {year} {publisher}. جميع الحقوق محفوظة.`,
  },

  /**
   * يظهر بجوار أزرار المتاجر في كل صفحة مترجمة (ولا يظهر أبدًا في الإنجليزية).
   * التطبيقات بالإنجليزية فقط؛ ويجب ألا يوحي الموقع بغير ذلك.
   */
  appLanguageNote: `تطبيق WakeSharp نفسه باللغة الإنجليزية حاليًا.`,

  legalLayout: {
    lastUpdated: `آخر تحديث {date}`,
    questions: `أسئلة عن هذه الصفحة؟ راسلنا على [{email}](email).`,
  },

  /** النص البديل لكل وضعية من وضعيات التعويذة (src/components/Lark.astro). */
  lark: {
    hero: `تعويذة WakeSharp، الوضعية الرئيسية`,
    asleep: `تعويذة WakeSharp، نائمة`,
    waking: `تعويذة WakeSharp، تستيقظ`,
    focused: `تعويذة WakeSharp، مركِّزة`,
    celebrating: `تعويذة WakeSharp، تحتفل`,
    encouraging: `تعويذة WakeSharp، تشجّع`,
  },
} satisfies typeof en;
