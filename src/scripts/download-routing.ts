import { safeContext } from '../lib/download';
import { localeByCode } from '../i18n/config';
// Rendered HTML always contains the complete OneLink. Desktop browsers can
// reach our QR page directly, including while AppsFlyer's allowlist is pending.
// The phone scanning the QR follows OneLink and receives the original context.
const mobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
if (!mobile) for (const link of document.querySelectorAll<HTMLAnchorElement>('a[data-download]:not([data-platform])')) {
  const context = safeContext({pageId:link.dataset.page ?? 'home',placement:link.dataset.placement ?? 'download',locale:link.dataset.locale ?? 'en'});
  const locale = localeByCode(context.locale)!;
  const path = `${locale.code === 'en' ? '' : '/' + locale.path}/download`;
  // Avoid repeated QR navigation from the download page's own header/footer.
  if (location.pathname.replace(/\/$/,'') === path) { link.href = '#download-options'; continue; }
  link.href = path + '?' + new URLSearchParams({page:context.pageId,placement:context.placement});
}
