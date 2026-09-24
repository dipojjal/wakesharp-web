import { shell as en } from '../en/shell';

/**
 * हर पेज पर साझा होने वाले स्ट्रिंग। `{publisher}`, `{year}`, `{email}` और
 * `{date}` टेम्पलेट src/config/site.ts से भरते हैं। अंग्रेज़ी में जो स्ट्रिंग
 * site.ts से आते हैं, वे यहाँ अनुवाद के रूप में लिखे गए हैं।
 */
export const shell = {
  siteDescription: `गहरी नींद वालों के लिए अलार्म: जल्दी से जोड़-घटाव हल करके, किसी जगह की तस्वीर लेकर या चलकर इसे चुप कराएँ, फिर देखें कि आप कितने चुस्त उठे।`,
  tagline: `चुस्त उठें। सिर्फ़ जागे हुए नहीं।`,
  requirements: { ios: `iOS 26 या नया`, android: `Android 8.0 या नया` },
  ogImageAlt: `WakeSharp — चुस्त उठें, सिर्फ़ जागे हुए नहीं।`,
  rssTitle: `WakeSharp ब्लॉग`,
  skipLink: `सामग्री पर जाएँ`,
  brandHome: `WakeSharp — होम`,

  nav: {
    aria: `मुख्य`,
    features: `सुविधाएँ`,
    pricing: `क़ीमत`,
    blog: `ब्लॉग`,
    contact: `संपर्क`,
    faq: `सवाल-जवाब`,
    cta: `WakeSharp लें`,
  },

  language: {
    label: `भाषा`,
    listAria: `साइट की भाषा`,
  },

  footer: {
    product: `उत्पाद`,
    legal: `क़ानूनी`,
    contact: `संपर्क`,
    features: `सुविधाएँ`,
    sharpnessScore: `Sharpness Score`,
    pricing: `क़ीमत`,
    blog: `ब्लॉग`,
    faq: `आम सवाल`,
    privacy: `गोपनीयता नीति`,
    terms: `सेवा की शर्तें`,
    support: `सहायता`,
    deleteAccount: `अपना अकाउंट मिटाएँ`,
    about: `हमारे बारे में`,
    contactForm: `संपर्क फ़ॉर्म`,
    builtBy: `{publisher} का बनाया हुआ — एक छोटा, स्वतंत्र स्टूडियो।`,
    pleaseNote: `ध्यान दें।`,
    /** ज़िम्मेदारी वाला वाक्य। इसे ईमानदारी से अनुवाद करें, कभी हल्का न करें। */
    safetyNotice: `WakeSharp कोई मेडिकल डिवाइस नहीं है। आपके फ़ोन की सेटिंग, बैटरी की पाबंदियाँ या फ़ोन की पावर की हालत किसी भी अलार्म को बजने से रोक सकती है। जिस काम के लिए देर होना आप बर्दाश्त नहीं कर सकते, उसके लिए एक दूसरा, अलग अलार्म भी लगाएँ।`,
    fullSafetyNotice: `पूरी सुरक्षा सूचना`,
    rights: `© {year} {publisher}. सर्वाधिकार सुरक्षित।`,
  },

  /**
   * स्टोर बटन के पास उस स्थानीय पेज पर दिखता है जिसकी भाषा में ऐप ख़ुद उपलब्ध
   * नहीं है (StoreButtons, SITE.appLanguages पढ़ता है), ताकि साइट कभी यह न जताए
   * कि ऐप, मसलन, हिंदी में है। भाषाओं के नाम इसी भाषा में लिखें।
   */
  appLanguageNote: `WakeSharp ऐप अंग्रेज़ी, स्पैनिश, रूसी, तुर्की, जर्मन, फ़्रेंच और अरबी में उपलब्ध है।`,

  legalLayout: {
    lastUpdated: `आख़िरी बार {date} को अपडेट किया गया`,
    questions: `इस पेज के बारे में कोई सवाल? [{email}](email) पर ईमेल करें।`,
  },

  /** शुभंकर की हर मुद्रा का वैकल्पिक टेक्स्ट (src/components/Lark.astro)। */
  lark: {
    hero: `WakeSharp का शुभंकर, मुख्य मुद्रा में`,
    asleep: `WakeSharp का शुभंकर, सोता हुआ`,
    waking: `WakeSharp का शुभंकर, जागता हुआ`,
    focused: `WakeSharp का शुभंकर, ध्यान लगाए हुए`,
    celebrating: `WakeSharp का शुभंकर, जश्न मनाता हुआ`,
    encouraging: `WakeSharp का शुभंकर, हौसला बढ़ाता हुआ`,
  },
} satisfies typeof en;
