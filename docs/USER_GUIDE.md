# User Guide

## Search

Choose `City` or `ZIP`, enter the location, and submit the search. City searches use Open-Meteo geocoding. ZIP searches support US 5-digit ZIP codes and ZIP+4 formats.

## Use Current Location

Select `Use my location` and approve the browser permission request. If reverse geocoding is unavailable, WeatherBoard still loads a forecast using the device coordinates.

## Change Units

Use the `F` and `C` segmented control in the header. WeatherBoard refetches the forecast using the selected unit system.

## Save Locations

After a forecast loads, use the star button beside the location action. Saved locations appear in the sidebar and are stored in the current browser.

## Floating Cats

Use the `Cats` button in the header to pause or resume the bouncing cat heads. WeatherBoard automatically pauses them when reduced motion is enabled in the operating system or browser.

## Clear Saved Locations

Use `Clear` in the saved section. This only removes saved locations from the current browser.

## Install

Browsers that support Progressive Web Apps can install WeatherBoard after it is served over HTTP or HTTPS. The app manifest and service worker are included.

## Troubleshooting

- If a search fails, try a nearby city name instead of a neighborhood.
- If geolocation fails, check browser location permissions.
- If the app opens but weather does not load, check network access to `open-meteo.com`.
- If offline, previously cached app assets may open, but live forecast updates require the network.
