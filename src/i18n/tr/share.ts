import { share as en } from '../en/share';

/**
 * The link-landing pages in Turkish: /c (a challenge), /p (the wake-up pact,
 * the shared alarm before group alarms; old links still open in the app) and
 * /g (a group alarm invite). `{name}`, `{rounds}`, `{difficulty}`,
 * `{seconds}`, `{time}` and `{days}` are filled in by each page's inline script.
 */
export const share = {
  challenge: {
    title: `Bir uyanma meydan okuması - WakeSharp`,
    description: `Biri size bir WakeSharp sabahı için meydan okudu.`,
    heading: `Beat my wake (uyanışımı geçin)`,
    intro: `Biri sizden daha zinde uyandığını düşünüyor.`,
    opening: `Meydan okuma açılıyor…`,
    cta: `Aynı sabah görevini aynı tohum değeriyle oynamak ve onu geçip geçemediğinizi görmek için bu bağlantıyı WakeSharp yüklü telefonunuzda açın.`,
    error: `Bu bağlantı okunamadı. Sohbet uygulamaları bazen uzun bağlantıları ikiye böler; gönderen kişiden yeniden göndermesini isteyin.`,
    script: {
      anonymous: `Birisi`,
      summary: `{name} {rounds} {difficulty} turu {seconds} saniyede çözdü.`,
      difficulty: { easy: `kolay`, standard: `standart`, hard: `zor` },
    },
  },
  pact: {
    title: `Bir uyanma daveti - WakeSharp`,
    description: `Biri sizinle bir WakeSharp alarmı paylaştı.`,
    heading: `Bir uyanma daveti`,
    intro: `Biri sizinle birlikte uyanmak istiyor.`,
    opening: `Davetiniz açılıyor…`,
    cta: `Bu bağlantıyı WakeSharp yüklü telefonunuzda açın; alarmı sizin için kursun. Saatten başka hiçbir şey paylaşılmaz: telefonunuz alarmı kendi başına çalar, işin içinde ne hesap ne de sunucu vardır.`,
    error: `Bu bağlantı okunamadı. Sohbet uygulamaları bazen uzun bağlantıları ikiye böler; gönderen kişiden yeniden göndermesini isteyin.`,
    script: {
      invited: `{name} sizi davet etti: {time} · {days}`,
      invitedAnonymous: `Davet edildiniz: {time} · {days}`,
      once: `bir kez`,
      /** Sunday first, matching the codec's weekday mask. */
      days: [`Paz`, `Pzt`, `Sal`, `Çar`, `Per`, `Cum`, `Cmt`],
    },
  },
  group: {
    title: `Bir grup alarmı daveti - WakeSharp`,
    description: `Biri sizi bir WakeSharp grup alarmına davet etti.`,
    heading: `Bir grup alarmı daveti`,
    intro: `Biri sizinle birlikte uyanmak istiyor.`,
    opening: `Davetiniz açılıyor…`,
    /** Shown once the link's code checks out. */
    cta: `Gruba katılmak için bu bağlantıyı WakeSharp yüklü bir iPhone’da açın. Herkesin alarmı aynı saatte, kendi telefonunda çalar ve grup kimin kalktığını görebilir. Katılmak için WakeSharp hesabı gerekir; böylece arkadaşlarınız kalktığınızı görebilir. Grup alarmları şimdilik iPhone’da: Google Play’in 2.9 sürümünde yok.`,
    /** The button that hands the code to the installed app. */
    open: `WakeSharp’ı aç`,
    error: `Bu bağlantı okunamadı. Gönderen kişiden yeniden göndermesini ya da gruptan yeni bir davet bağlantısı paylaşmasını isteyin.`,
    script: {
      /** When the link carries the schedule. */
      invited: `Bir grup alarmına davet edildiniz: {time} · {days}`,
      /** When it does not (an older app's link). */
      invitedNoTime: `Bir grup alarmına davet edildiniz.`,
      once: `bir kez`,
      /** Sunday first, matching the app's weekday mask. */
      days: [`Paz`, `Pzt`, `Sal`, `Çar`, `Per`, `Cum`, `Cmt`],
    },
  },
  get: {
    heading: `WakeSharp’ı indirin`,
    /** `{trialDays}` and `{annual}` come from src/config/site.ts; the trial never appears without its price. */
    body: `WakeSharp Sınırsız’ı {trialDays} gün ücretsiz deneyerek başlayın; ardından yıllık ücret {annual}. İlk alarmınızı kurmak yaklaşık on saniye sürer.`,
  },
} satisfies typeof en;
