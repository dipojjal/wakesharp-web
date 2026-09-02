import { notFound as en } from '../en/not-found';

/** صفحة 404. تُبنى مسبقًا كتلة واحدة لكل لغة مفعّلة؛ راجع src/pages/404.astro. */
export const notFound = {
  title: `الصفحة غير موجودة — WakeSharp`,
  mascotAlt: `تعويذة WakeSharp، نائمة`,
  heading: { pre: `هذه الصفحة ما زالت `, accent: `نائمة.`, post: `` },
  body: `لم نعثر على تلك الصفحة. ويقترح طائر Lark (القبّرة) العودة إلى البداية.`,
  backHome: `العودة إلى WakeSharp`,
  support: `احصل على الدعم`,
} satisfies typeof en;
