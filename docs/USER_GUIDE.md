# User Guide

VibeCast opens directly into the forecast experience. Load a place, scan the conditions, then use the daily extras for advice, context, and a little fun.

## Find A Forecast

Choose `City` or `ZIP`, enter the location, and submit the search. City searches use Open-Meteo geocoding. ZIP searches support US 5-digit ZIP codes and ZIP+4 formats through Zippopotam.us.

Select `Use my location` to ask the browser for your device coordinates. If reverse geocoding is unavailable, VibeCast still loads a forecast using the coordinates and labels it as current location.

After a forecast loads, use the star button to save it. Saved locations appear in the sidebar and stay in the current browser.

## Read The Forecast

The current panel shows temperature, feels-like temperature, humidity, wind, pressure, and the active weather condition. The hourly section shows the next 12 hours as both a canvas trend chart and compact cards. The seven-day section shows daily high and low ranges.

The Today panel includes sunrise, sunset, moon phase with approximate illumination, UV index, cloud cover, precipitation, and wind gusts.

Use the `F` and `C` segmented control in the header to switch units. VibeCast refetches the forecast in the selected unit system.

## Get Daily Advice

Today's Advice recommends whether to bring an umbrella, what kind of clothing to wear, whether it is a good dog park day, and any comfort or gear notes based on the selected location's forecast. The dog park recommendation includes sunrise, sunset, and humidity.

## Explore Daily Extras

Local Weather Trivia shows quick facts for the selected forecast, including daylight duration, temperature swing, humidity feel, wind direction, and peak rain chance.

Weather Word of the Day introduces one glossary term for the loaded forecast. It includes a plain-language definition, example, and a note that connects the word to the selected location's conditions.

Enter a zodiac sign in Today's Horoscope and select `Show` to see a daily reading. VibeCast saves the sign in the current browser and tunes the reading to the loaded forecast and moon phase.

One Happy News Story shows a daily positive story from VibeCast's local bright-side set. It changes with the day and selected forecast, and includes a weather tie-in for the loaded location.

Today in History shows selected historical events for the forecast date. It uses Wikimedia's On This Day feed when available and falls back to a local almanac entry if the feed cannot load.

Weather News shows current National Weather Service alerts for the selected location when the API has coverage. If there are no active alerts or alerts cannot load, it shows useful weather resources.

## Enjoy The Effects

The forecast scene animates with the current conditions, including falling rain or snow, drifting fog, storm flashes, clouds, and leaves blowing across the view.

The whole page has a 90% transparent weather overlay that mirrors the selected forecast. It is decorative and click-through, so controls still work normally.

Use the `Cats` button in the header to pause or resume the bouncing cat heads. VibeCast automatically pauses motion effects when reduced motion is enabled in the operating system or browser.

## Manage Saved Data

Use `Clear` in the saved section to remove saved locations from the current browser. This does not affect browser permissions or any external account because VibeCast does not use accounts.

Saved locations, unit preference, city/ZIP mode, horoscope sign, and cat preference are stored locally in your browser.

## Install And Offline Use

Browsers that support Progressive Web Apps can install VibeCast after it is served over HTTP or HTTPS. The app manifest and service worker are included.

When offline, previously cached static app assets may open, but live weather, alerts, and history updates require network access.

## Troubleshooting

- If a search fails, try a nearby city name instead of a neighborhood.
- If ZIP search fails, confirm it is a US ZIP code.
- If geolocation fails, check browser location permissions.
- If the app opens but weather does not load, check network access to `open-meteo.com`.
- If Weather News is empty for a non-US location, the National Weather Service alert API may not cover that point.
- If the app still shows older branding or layout after an update, reload once after the service worker finishes updating.
