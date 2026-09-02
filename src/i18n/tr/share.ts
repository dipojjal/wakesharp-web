import { share as en } from '../en/share';

/**
 * The two link-landing pages in Turkish. `{name}`, `{rounds}`, `{difficulty}`,
 * `{seconds}`, `{time}` and `{days}` are filled in by each page's inline script.
 */
export const share = {
  challenge: {
    title: `Bir uyanma meydan okuması — WakeSharp`,
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
    title: `Bir uyanma daveti — WakeSharp`,
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
  get: {
    heading: `WakeSharp’ı indirin`,
    body: `Ücretsizdir ve ilk alarmınızı kurmak yaklaşık on saniye sürer.`,
  },
} satisfies typeof en;
