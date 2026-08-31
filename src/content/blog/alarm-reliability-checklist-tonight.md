---
title: "Tonight's 6-Point Checklist for an Alarm That Actually Rings"
description: "Six checks to run before bed so your alarm actually rings: volume, permissions, Do Not Disturb, battery limits, the charger, and one backup."
pubDate: 2026-08-31T19:00:00-04:00
heroImage: ../../assets/blog/alarm-reliability-checklist-tonight/hero.jpg
heroImageAlt: "Flat illustration of a phone charging on a bedside table at night, a small checklist floating beside it, in coral and amber against deep indigo."
category: tips-and-tricks
tags: [alarm-reliability, bedtime-checklist, android, iphone]
draft: false
---

You did everything you were supposed to do. You set the alarm for 6:45. You put the phone on the nightstand where you could hear it. You said the words out loud to nobody in particular: tomorrow I get up on time.

You woke at 9:10, in daylight, to a phone that looks completely innocent.

Here is the uncomfortable part. To make sure an alarm goes off, wanting it is not the input that matters. An alarm is a chain of conditions, roughly a dozen of them on a modern phone, and it makes a sound only if every link holds overnight. Nothing on the alarm screen shows you that chain. Nothing warns you when one link is in the wrong position. So the chain fails silently, and the only suspect left in the room in the morning is your character.

This is the evening half of a pair. The morning half, [iPhone alarm didn't go off? the 7 real causes](/blog/iphone-alarm-didnt-go-off-causes), is a post-mortem for a morning that already went wrong. This one runs the other direction: six things you check tonight, each in well under thirty seconds, so tomorrow morning has nothing to investigate.

## An alarm is not one thing

It helps to see what you are actually checking. Between "the alarm fires" and "a sound loud enough to reach a sleeping adult leaves the speaker" there are five separate systems, and each of them was designed by someone whose main worry was that your phone might be too noisy.

**Operating system defaults.** Modern phones are built around not interrupting you. Quiet is the default posture, and alarms are an exception carved out of that posture. Exceptions have edges.

**Permissions.** If your alarm comes from an app rather than the built-in clock, it needs specific permission to schedule an alarm at an exact minute. On Android, that permission is not always granted, and can be taken back.

**Power management.** Both platforms aggressively limit what apps do while you sleep. That is usually good. Once in a while it removes the one thing you needed.

**Physical state.** A phone at zero percent does not ring. Neither does one on a cable that was never quite seated, or one face down in a duvet.

**You.** Even a perfect alarm ends up in the hands of someone who is barely conscious. No checklist fixes that, but it changes what a good setup looks like.

Five checks cover the first four systems. The sixth covers you.

## The six-point check

### 1. Give the alarm a sound, and give the sound a volume

Open the alarm itself. Three things have to be true on that one screen: it is switched on, it is armed for tomorrow rather than for a weekday you are not currently in, and its sound is not None. None is a real, selectable option on both platforms. An alarm set to it fires exactly on time, lights the screen, offers you a Stop button, and makes no noise at all.

Then the volume, which is not the volume you have been adjusting all evening. On iPhone, alarms follow the Ringtone and Alerts slider in Settings, Sounds and Haptics, not the media volume your side buttons usually move. On Android, alarms have their own stream: open the Clock app, then Settings, then the Alarm volume slider, or press a volume button and open the menu to reach it.

Google's Clock app will actually tell you the morning after if [your alarm volume was below 30% and may be too low](https://support.google.com/pixelphone/answer/2840926). Useful information, delivered about nine hours late.

While you are there, pick a tone with a hard start and a low pitch rather than a melody that eases in. This is not folklore. In a study of what actually rouses sleeping adults, a low-pitched square wave signal around 520 Hz produced significantly lower auditory arousal thresholds than the high-pitched tone conventional smoke alarms use, meaning it woke people at lower volumes ([Bruck and colleagues, Journal of Sleep Research, 2009](https://pubmed.ncbi.nlm.nih.gov/19302343/)).

### 2. Confirm the app is still allowed to ring

Skip this one if you use the phone's built-in clock. If your alarm comes from an app, this is the link that breaks quietly.

On Android, ringing at an exact minute requires a specific permission. Since Android 14, the permission that grants it [is no longer pre-granted to most newly installed apps](https://developer.android.com/about/versions/14/changes/schedule-exact-alarms), and dedicated alarm apps rely on a separate permission granted at install. Either way, you can see the state of it yourself: Settings, Apps, Special app access, Alarms and reminders. Your alarm app should be listed and allowed. Check that notifications are allowed too.

On iPhone, an app that rings through Apple's alarm system asks for authorization once, and [that authorization is a real setting](https://developer.apple.com/documentation/alarmkit) that can be turned back off later. If you have ever tidied up your permissions in a decluttering mood, confirm tonight that you did not tidy this one away.

Thirty seconds. This is the check that most often finds something.

### 3. Settle the Do Not Disturb question for your actual platform

The two platforms genuinely differ here, and most advice on the internet gets one of them wrong.

On iPhone, this is a non-issue and you can stop worrying about it. Apple states plainly that [Do Not Disturb, the Ring/Silent switch and Silent mode do not affect the alarm sound](https://support.apple.com/en-us/118444), and an Apple Focus mode does not mute a Clock alarm either. If your iPhone alarm was silent last week, the switch on the side of the phone was almost certainly not the reason.

On Android, it is a real issue. Do Not Disturb can silence alarms, and Google's own Clock app has a message for exactly this morning-after conversation: ["Do Not Disturb silenced your alarm. Allow alarms in DND settings to prevent this in the future."](https://support.google.com/pixelphone/answer/2840926) Alarms sit in the Alarms and other interruptions section of your Do Not Disturb or Modes settings, where they can be blocked or allowed.

Tonight: Android users, open that setting and make sure alarms are allowed. iPhone users, spend the thirty seconds on the volume slider instead.

### 4. Take your alarm app off the battery-saving list

This is mostly an Android point, and it is the one that produces the most baffling failures, because the alarm worked fine for three weeks and then stopped for no visible reason.

Android limits what apps can do while a device sits idle, and Battery Saver tightens that further. Google says so directly: [Battery Saver may have prevented your alarm from going off](https://support.google.com/pixelphone/answer/2840926), and suggests turning it off or marking your clock app as essential.

Manufacturer power management goes further than Android's own. Samsung devices put unused apps to sleep, and the practical effect is documented plainly: [after three days any unused app will not be able to start from the background, which means alarms stop working](https://dontkillmyapp.com/samsung). Go away for a long weekend, come back, and the alarm you have trusted for a month is now a decoration.

Tonight, on Android: Settings, Apps, your alarm app, Battery, set it to Unrestricted. On Samsung, also open Device care, Battery, and remove the app from the sleeping and deep sleeping lists, then turn off "Put unused apps to sleep" so it cannot quietly come back.

On iPhone, you have fewer knobs here, which for once is the setting you want.

### 5. Plug it in, and watch the screen confirm it

The least interesting failure on this list is also one of the most common, and it does not care which phone you own. A device that reaches zero percent at 3am is not running an alarm at 6:45. Neither is one on a cable that was not quite seated, a charger on a switched socket somebody turned off, or a battery pack that quietly died weeks ago.

So do not plug in and walk away. Plug in and wait for the screen to acknowledge it. Two seconds of looking is the whole check.

While the phone is in your hand, put it somewhere the sound can leave it: a hard surface, speaker grille clear, not face down on a duvet and not under a pillow. Soft furnishings absorb a startling amount of a small speaker.

### 6. Set the backup, on something that is not this phone

The first five checks reduce the chance of a failure. They do not remove it. Phones ship alarm bugs, updates reboot devices overnight, and settings drift on their own.

There is also the failure that no setting touches. Waking is not a switch you flip. Sleep inertia is a measurable state in which sleep-like impairment persists past the moment of waking, and it is at its worst when you are pulled out of the biological night ([Trotti, Sleep Medicine Reviews, 2017](https://pubmed.ncbi.nlm.nih.gov/27692973/)). Enough of you comes online to find the phone and silence it. Not enough of you comes online to remember doing it, which is why [people sleep through alarms they do not remember dismissing](/blog/sleep-through-alarm-dismissed-no-memory) and wake up certain the alarm never rang.

So for anything you genuinely cannot be late for, a flight, an exam, a 7am interview, set a second alarm on a different device, and put it where you have to stand up to reach it. Not because you are unreliable. Because everything on the list above is a single point of failure, and redundancy is the only honest answer to that.

If you are running this checklist at 1am on a regular basis, the checklist is not your real problem. That is [revenge bedtime procrastination](/blog/revenge-bedtime-procrastination), and it needs a different fix.

## What a checklist cannot do

Be clear about the limits, because most articles in this category are not.

Everything above is about whether a sound gets made. None of it is about whether a sound wakes you. Arousal thresholds move with sleep debt, sleep stage, alcohol, illness and age, and a volume that works on a Tuesday can be inaudible to the version of you that slept five hours on Thursday.

Settings also drift. An operating system update can reset a permission. A power-saving change can arrive without an announcement. A check you ran tonight is a statement about tonight, not a warranty.

And no configuration, on any platform, can promise you will wake up. Anyone claiming otherwise is selling something.

## Where WakeSharp fits

Every item on that list shares a shape: the phone knew, hours ahead of time, that the conditions were wrong, and had no reason to mention it.

That is what WakeSharp's alarm reliability check does, and it is free. It runs this same class of check on your device and names the specific thing that would have silenced you: a missing permission, an alarm volume set too low, notification settings, battery restrictions. The point is the naming. It leads with a plain verdict rather than a reassuring green tick, and where the platform will not tell it something, it says that instead of guessing. On iPhone, WakeSharp rings through Apple's AlarmKit, so once alarm permission is granted, the alarm sounds through Silent mode and Focus the way the Clock app does.

The honest limits: a checker can only see what the operating system chooses to expose, so it cannot rule out every cause, and it cannot promise you will wake up. WakeSharp is not a medical device. For a morning you cannot afford to miss, still set that second, independent alarm. Your alarm rings free, forever. No ads.

## FAQ

**How do I make sure my alarm goes off in the morning?**
Check six things before bed. The alarm is switched on and armed for tomorrow with a sound that is not None; the alarm volume is set on the right slider (Ringtone and Alerts on iPhone, the Clock app's Alarm volume on Android); your alarm app has permission to ring; Do Not Disturb allows alarms if you are on Android; the app is not restricted by battery saving; and the phone is charging on a hard surface. Then set a second alarm on another device for anything critical.

**Will my alarm go off if my phone is on silent?**
On iPhone, yes. Apple states that Do Not Disturb, the Ring/Silent switch and Silent mode do not affect the alarm sound, and an Apple Focus mode does not mute it either. On Android it depends: Do Not Disturb can silence alarms unless alarms are allowed in the Alarms and other interruptions section of your Do Not Disturb or Modes settings.

**Does Do Not Disturb turn off alarms on Android?**
It can. Google's Clock app shows a message afterwards saying Do Not Disturb silenced your alarm and telling you to allow alarms in Do Not Disturb settings. Turn alarms on as an allowed interruption tonight and it stops being a question.

**Will my alarm go off if my phone is turned off or dies overnight?**
No. A powered-off or flat phone runs nothing, alarms included. This is why the charger check matters more than it sounds, and why a phone that keeps hitting single digits by bedtime deserves a second alarm somewhere else in the room.
