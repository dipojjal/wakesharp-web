---
title: "Will Your Alarm Ring on Silent? iPhone and Android, Answered"
description: "Does your alarm ring on silent? Yes on both iPhone and Android, with real exceptions. A platform by platform truth table for Silent, Focus and Do Not Disturb."
pubDate: 2026-09-02T08:00:00-04:00
heroImage: ../../assets/blog/will-alarm-ring-on-silent-dnd/hero.jpg
heroImageAlt: "Flat editorial illustration of a phone lying on a nightstand at night, a small coral mute switch flipped on its side while amber and coral sound waves ring out from the glowing alarm bell on its screen, a cream crescent moon resting beside it against a deep indigo sky."
category: tips-and-tricks
tags: [alarm-troubleshooting, ios, android]
draft: false
---

You put the phone on silent at seven for a film. At midnight it is face up on the nightstand, still silent, and you are lying there doing the arithmetic everyone does. If the ringer is off, is the alarm off too? Is it worth getting up to check?

Most people get up and check. It is one of the small nightly taxes of owning a phone.

The reassuring part is that this is a documented question with a documented answer, and the exceptions are specific enough to name. It is not a question about whether you can be trusted. It is a question about which of roughly six independent switches your phone considers relevant to an alarm, and the answer differs by platform, by which app set the alarm, and in one case by a setting buried inside your phone maker's own Clock app.

## The short answer

On both platforms, the built-in Clock alarm is deliberately exempted from the controls that silence everything else. Apple says it flatly: "Do Not Disturb, the Ring/Silent switch, and Silent mode don't affect the alarm sound" ([Apple Support](https://support.apple.com/en-us/118444)). Android treats alarms as their own audio stream and their own interruption category, so Do Not Disturb leaves them alone unless you go in and tell it not to.

What actually silences alarms is almost never the mute control. It is volume, the alarm's own sound setting, power, and on Android, background restrictions.

## The truth table

| Switch you flipped | iPhone Clock alarm | Android Clock alarm |
| --- | --- | --- |
| Silent or mute | Rings | Rings, with one Clock-app exception |
| Do Not Disturb, or an iPhone Focus mode | Rings | Rings, allowed by default |
| Volume buttons pressed all the way down | Depends on one setting | No effect on the alarm |
| Media volume at zero | No effect | No effect |
| Alarm's own sound set to None | Silent | Silent |
| Phone powered off or flat | No alarm | No alarm |

Everything below is the reasoning behind those cells, plus the parts the table cannot hold.

## iPhone

### 1. The Ring/Silent switch and the Action button

The switch on the side of an iPhone, and the Action button that replaced it on newer models, controls the ringer and notification sounds. It does not control alarms. Apple's alarm troubleshooting page states that if you use either to turn on Silent mode, or turn on Do Not Disturb, the alarm still sounds.

That orange stripe is not an alarm setting. It never was. Worth stating clearly, because this single misunderstanding produces more bad nights of sleep than any real bug.

One caveat that matters later: this promise covers Clock app alarms. It does not automatically extend to every noise every app on your iPhone wants to make.

### 2. Focus modes on iPhone, including Sleep Focus

Same answer, same Apple page. Do Not Disturb on iOS is one Focus mode among several, and turning it on does not affect the alarm sound. Sleep Focus is the one that unsettles people most, because it dims the lock screen and makes the phone look powered down. The alarm still comes through.

Where Sleep Focus does change something is one step upstream. If your morning alarm comes from a sleep schedule rather than from the Clock app's alarm list, it is a different object with its own sound, volume and haptics, edited over in Health ([Apple Support](https://support.apple.com/en-us/108906)). Two alarms on one iPhone, set ten minutes apart, can sit at completely different volumes, and neither one will mention the other to you.

### 3. The volume slider that applies, and the one that does not

Your iPhone keeps two volumes. Media volume covers music, video and podcasts. Ringtone and alerts volume covers the ringer, notification sounds and alarms. Alarms follow the second one. The physical buttons usually move the first one.

Open Settings, then Sounds and Haptics, and look at the slider under Ringtone and Alerts. Drag it and the phone plays a sample at that level, which is the only honest test. Directly below it sits Change with Buttons. Leave that on and a long press of volume-down in a quiet cinema can drain your alarm to almost nothing, with no alarm-shaped warning at any point. Apple leads its own troubleshooting page with this slider, which tells you how often it turns out to be the answer.

So: the silent switch, no effect. The volume buttons, potentially an enormous effect. Two controls that feel like the same control and are not.

### 4. Third-party alarm apps on iPhone: the part that genuinely changed

For years this was the honest weak spot, and any app claiming otherwise was overselling. Apps outside Clock could not schedule a real system alarm. They scheduled notifications, and a notification obeys Silent mode and a Focus mode like every other notification. The one carve-out is Apple's critical interruption level, which bypasses the mute switch, and it requires an [entitlement Apple grants](https://developer.apple.com/documentation/usernotifications/unnotificationinterruptionlevel/critical) for health, safety and emergency use. Alarm clocks do not qualify.

iOS 26 changed the picture with AlarmKit, Apple's framework for scheduling genuine alarms from a third-party app. Apple's own description of the behavior, from [the WWDC session that introduced it](https://developer.apple.com/videos/play/wwdc2025/230/): when the alert fires, "the alert breaks through the silent mode and the current focus." You grant that permission per app, and you can take it back.

The practical test for any alarm app on your iPhone: did it ask you for alarm permission, or only for notification permission? Those are different prompts backed by different capabilities. An app holding only notification permission is a reminder with ambitions.

## Android

### 5. Do Not Disturb and the alarm exception

Android sorts interruptions into categories, and alarms get their own. On current versions, Do Not Disturb and Modes expose a notification filter that lets you, in Google's wording, "Block or allow alarms, media, touch sounds, reminders, or calendar events" ([Android Help](https://support.google.com/android/answer/9069335?hl=en)). Allowed is the starting position. You have to go in and switch alarms off yourself.

Samsung frames the same thing as an exception list. The Galaxy Do Not Disturb screen asks you to select from options such as "Calls, Alarms and sounds or Apps" ([Samsung](https://www.samsung.com/latin_en/support/mobile-devices/how-to-use-the-do-not-disturb-mode-on-your-galaxy-phone/)), and alarms sit on the allowed side out of the box.

There is one historical exception worth knowing if you use an older device or a hand-me-down. On Android 8.1 and below there was a Total Silence setting that did exactly what its name promised, and Google's own page still notes that under it, "Your alarms won't make noise." If someone in your life swears blind that Do Not Disturb ate their alarm, this is usually what they met.

### 6. Four volume streams, and the alarm has its own

The larger Android difference is volume, because Android does not really have a volume. It has several. The platform documentation puts it plainly: "Android uses separate audio streams for playing music, alarms, notifications, the incoming call ringer, system sounds, in-call volume, and DTMF tones. This allows users to control the volume of each stream independently" ([Android Developers](https://developer.android.com/media/platform/output)).

Which means the volume buttons you press are adjusting whichever stream is active at that moment, usually media, and essentially never the alarm stream. Muting a podcast at 1am does nothing in either direction to your 7am alarm.

The alarm stream has its own slider, in Settings, then Sound and vibration. Set it deliberately once and it stays put. Most Android Clock apps also offer a per-alarm option to [gradually increase volume](https://support.google.com/clock/answer/2840926?hl=en), which is civilized and also, if you sleep heavily, several seconds of quiet noise you can sleep straight through before it gets loud.

### 7. Vibrate mode, and the one setting that can override all of this

Putting an Android phone on vibrate or mute changes the ring and notification streams. It does not touch the alarm stream, so the alarm rings.

Except on some phones, where the Clock app has been handed a veto. Samsung's Clock has shipped a setting worded along the lines of "Alarm sound while in Silent mode," or an option to vibrate only when the phone is set to vibrate or mute, and depending on your One UI version the default is not always the one you would pick. If you own a Galaxy and your alarm has gone quiet specifically on nights when the phone was muted, open Clock, open its settings, and read that line before you blame Do Not Disturb. It is the most common false accusation in this whole category.

The general rule for Android: the system says alarms are exempt, and then an individual app's settings can quietly hand that exemption back.

### 8. What actually goes wrong for third-party alarm apps on Android

Not Do Not Disturb. A third-party alarm app can play on the alarm stream exactly as the built-in Clock does, and the platform's own guidance takes for granted that alarm clocks are the legitimate case for it: "Unless your app is an alarm clock, you should play audio with usage AudioAttributes.USAGE_MEDIA."

What goes wrong sits earlier in the chain. The app is not running when the moment arrives. Doze, app standby, exact-alarm permission, and above all the manufacturer battery managers on Samsung, Xiaomi, OPPO, OnePlus and Huawei can stop an app overnight, and a stopped app has no pending alarm left to fire. That failure is completely silent, it leaves the alarm sitting in the list looking healthy, and it has nothing whatsoever to do with your ringer. We took it apart in [Android alarm not ringing? Blame the battery optimizer](/blog/android-alarm-not-ringing-battery-optimizer).

The iPhone version of the same list, none of which is the silent switch either, is in [iPhone alarm didn't go off? The 7 real causes](/blog/iphone-alarm-didnt-go-off-causes).

## Where WakeSharp fits

The pattern across both platforms is the same: the mute controls are innocent, the quiet controls are guilty, and your phone never volunteers which is which.

WakeSharp's position on this is meant to be boring. On iPhone, its mission alarms are scheduled through Apple's AlarmKit, so once you have granted alarm permission (a separate prompt from notifications) they ring through Silent mode and through a Focus mode the way a Clock alarm does. On Android, WakeSharp plays on the alarm audio stream, which Do Not Disturb allows by default, and that part holds up. What no Android app can promise is that it is still running at 7am, because that decision belongs to your phone maker's battery manager. So the app's free alarm reliability check reads the conditions that actually matter on your specific device, including alarm permission, alarm volume and battery restrictions, and where the platform refuses to tell it something it says so rather than showing a green tick it has not earned. Your alarm rings free, forever. No ads.

The limit is the one every alarm app has, and we would rather write it down than let you discover it: WakeSharp is not a medical device, and settings, battery restrictions or a flat battery can stop any alarm on any phone. For a flight or an exam, set a second alarm on a separate device.

If you would rather check all of this before bed than reconstruct it afterwards, [tonight's 6-point checklist for an alarm that actually rings](/blog/alarm-reliability-checklist-tonight) walks the same ground in about three minutes.

## FAQ

**Will my alarm go off on silent?**
Yes, on both platforms, for the built-in Clock app alarm. Apple states that Silent mode, the Ring/Silent switch and Do Not Disturb do not affect the alarm sound. Android plays alarms on a separate audio stream that mute and vibrate mode do not touch. The exceptions are your alarm's own sound being set to None, a low ringtone and alerts volume on iPhone, a low alarm volume on Android, and a Samsung Clock setting that can silence alarms when the phone is muted.

**Does Do Not Disturb turn off my alarm?**
No, not by default on either platform. On iPhone, Do Not Disturb is a Focus mode and Apple exempts alarms from it. On Android, alarms are an allowed interruption category unless you go into the mode's notification filters and block them. The one real case is Total Silence on Android 8.1 and below, which did mute alarms.

**Will my alarm ring if my Android phone is on vibrate?**
Normally yes, because vibrate mode changes the ring and notification streams while the alarm stream keeps its own volume. The exception is phone-maker specific: some Clock apps, Samsung's in particular, include a setting that makes alarms vibrate only when the phone is muted. Check your Clock app's own settings, not just the system sound settings.

**Do third-party alarm apps ring on silent?**
On iPhone it depends entirely on how the app schedules the alarm. An app using Apple's AlarmKit rings through Silent mode and a Focus mode once you grant it alarm permission; an app that only sends notifications does not. On Android, any app can use the alarm audio stream and get through Do Not Disturb, but battery optimization can stop the app before the alarm ever fires, which is the far more common failure.
