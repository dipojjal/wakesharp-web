import { notFound as en } from '../en/not-found';

/** 404 पेज। हर चालू भाषा के लिए एक ब्लॉक पहले से बनता है; देखें src/pages/404.astro। */
export const notFound = {
  title: `पेज नहीं मिला — WakeSharp`,
  mascotAlt: `WakeSharp का शुभंकर, सोता हुआ`,
  heading: { pre: `यह पेज अब भी `, accent: `सो रहा है।`, post: `` },
  body: `वह पेज हमें नहीं मिला। Lark (हमारा शुभंकर पंछी) की सलाह है कि शुरुआत पर लौट चलें।`,
  backHome: `WakeSharp पर वापस`,
  support: `सहायता लें`,
} satisfies typeof en;
