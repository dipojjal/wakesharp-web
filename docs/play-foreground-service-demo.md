# Play Console evidence

`public/play/foreground-service-media-playback.mp4`, served at
https://wakesharp.app/play/foreground-service-media-playback.mp4, is the demonstration
Google Play asks for with the FOREGROUND_SERVICE_MEDIA_PLAYBACK declaration (App content →
Foreground service permissions). It is a screen recording of the Android app: WakeSharp is
put in the background, the alarm fires on its own, and its ongoing notification appears
over the launcher while the alarm tone plays; reopening the app returns to the ringing
screen.

Not linked from the site. It exists only so the declaration has a stable public URL that
we control, rather than a third-party account. vercel.json sends `X-Robots-Tag: noindex`
for everything under /play/, so the recording stays out of search results; robots.txt
must not disallow /play/, or crawlers would never see that header. Re-record it if the
ring screen or the notification changes materially.

This note lived beside the video in public/play/ until it was moved here: anything in
public/ is published, and the note was served as https://wakesharp.app/play/README.md.
