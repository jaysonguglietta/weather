# User Guide

## Search

Choose `City` or `ZIP`, enter the location, and submit the search. City searches use Open-Meteo geocoding. ZIP searches support US 5-digit ZIP codes and ZIP+4 formats.

## Use Current Location

Select `Use my location` and approve the browser permission request. If reverse geocoding is unavailable, VibeCast still loads a forecast using the device coordinates.

## Weather News

Weather News shows current National Weather Service alerts for the selected location. If there are no active alerts, it shows useful national weather resources.

## Weather Scene

The forecast scene animates with the current conditions, including falling rain or snow, drifting fog, storm flashes, clouds, and leaves blowing across the view. It becomes a still image when reduced motion is enabled.

## Page Weather Effect

The whole page has a 90% transparent weather overlay that mirrors the selected forecast. It is decorative and click-through, so controls still work normally.

## Today's Advice

Today's Advice recommends whether to bring an umbrella, what kind of clothing to wear, whether it is a good dog park day, and any comfort or gear notes based on the selected location's forecast. The dog park recommendation includes sunrise, sunset, and humidity.

The Today panel also shows the day's moon phase and approximate illumination percentage.

## Local Weather Trivia

Local Weather Trivia shows quick facts for the selected forecast, including daylight duration, temperature swing, humidity feel, wind direction, and peak rain chance.

## Weather Word of the Day

Weather Word of the Day introduces one glossary term for the loaded forecast. It includes a plain-language definition, example, and a note that connects the word to the selected location's conditions.

## Today's Horoscope

Enter a zodiac sign and select `Show` to see a daily reading. VibeCast saves the sign in the current browser and tunes the reading to the loaded forecast and moon phase.

## One Happy News Story

One Happy News Story shows a daily positive story from VibeCast's local bright-side set. It changes with the day and selected forecast, and includes a weather tie-in for the loaded location.

## Today in History

Today in History shows selected historical events for the forecast date. It uses Wikimedia's On This Day feed when available and falls back to a local almanac entry if the feed cannot load.

## Change Units

Use the `F` and `C` segmented control in the header. VibeCast refetches the forecast using the selected unit system.

## Save Locations

After a forecast loads, use the star button beside the location action. Saved locations appear in the sidebar and are stored in the current browser.

## Floating Cats

Use the `Cats` button in the header to pause or resume the bouncing cat heads. VibeCast automatically pauses them when reduced motion is enabled in the operating system or browser.

## Clear Saved Locations

Use `Clear` in the saved section. This only removes saved locations from the current browser.

## Install

Browsers that support Progressive Web Apps can install VibeCast after it is served over HTTP or HTTPS. The app manifest and service worker are included.

## Troubleshooting

- If a search fails, try a nearby city name instead of a neighborhood.
- If geolocation fails, check browser location permissions.
- If the app opens but weather does not load, check network access to `open-meteo.com`.
- If offline, previously cached app assets may open, but live forecast updates require the network.
