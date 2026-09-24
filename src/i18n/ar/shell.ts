import { shell as en } from '../en/shell';

/**
 * السلاسل المشتركة بين كل الصفحات. تُزوَّد `{publisher}` و`{year}` و`{email}`
 * و`{date}` من القوالب انطلاقًا من src/config/site.ts. أما السلاسل التي تأتي في
 * الإنجليزية من site.ts فمكتوبة هنا نصًّا مترجمًا.
 */
export const shell = {
  /** 155 حرفًا على الأكثر، ويبدأ بعبارة البحث التي تستهدفها الصفحة الرئيسية. «أسكِته» لا «أطفئه»: عناصر التحكم في الهاتف نفسه تعمل دائمًا. */
  siteDescription: `منبه لمن ينامون نومًا عميقًا: أسكِته بحل مسائل حساب سريعة، أو بتصوير مكان اخترته، أو بالمشي، ثم اعرف مدى صفاء ذهنك حين استيقظت.`,
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
    sharpnessScore: `درجة اليقظة`,
    pricing: `الأسعار`,
    blog: `المدونة`,
    faq: `الأسئلة الشائعة`,
    privacy: `سياسة الخصوصية`,
    terms: `شروط الخدمة`,
    support: `الدعم`,
    deleteAccount: `حذف حسابك`,
    about: `من نحن`,
    contactForm: `نموذج التواصل`,
    builtBy: `من صنع {publisher}، وهو استوديو صغير مستقل.`,
    pleaseNote: `يُرجى الانتباه.`,
    /** جملة المسؤولية. تُترجم بأمانة ولا تُخفَّف أبدًا. */
    safetyNotice: `WakeSharp ليس جهازًا طبيًا. قد تمنع إعدادات هاتفك أو قيود البطارية أو حالة الطاقة أي منبه من أن يصدر صوتًا. استخدم منبهًا ثانيًا مستقلًا لكل ما لا يمكنك أن تتأخر عنه.`,
    fullSafetyNotice: `إشعار السلامة الكامل`,
    rights: `© {year} {publisher}. جميع الحقوق محفوظة.`,
  },

  /**
   * يظهر بجوار أزرار المتاجر في الصفحات المترجمة إلى لغة لا يتوفر بها التطبيق
   * نفسه (يقرأ StoreButtons القائمة SITE.appLanguages)، كي لا يوحي الموقع بتطبيق
   * باليابانية مثلًا. سمِّ اللغات بلغة هذه الصفحة.
   */
  appLanguageNote: `يتوفر تطبيق WakeSharp باللغات الإنجليزية والإسبانية والروسية والتركية والألمانية والفرنسية والعربية.`,

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
