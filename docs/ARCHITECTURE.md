# Architecture

WeatherBoard is intentionally small: it is a static frontend app that talks directly to Open-Meteo from the browser.

## File Map

- `index.html`: semantic app shell, controls, forecast panels, and canvas elements.
- `styles.css`: responsive layout, component styling, accessible focus states, chart containers, and decorative animation layers.
- `app.js`: API calls, state management, rendering, weather trivia, animated canvas drawing, favorites, unit toggles, floating cat animation, and service worker registration.
- `sw.js`: static asset cache for repeat visits.
- `manifest.webmanifest`: installable app metadata.
- `assets/weather-mark.svg`: app icon and favicon.

## Runtime Flow

1. `app.js` initializes controls and loads the last saved location from `localStorage`.
2. If no saved location exists, the app loads a default New York forecast.
3. City searches call Open-Meteo geocoding and use the first matching result.
4. ZIP searches call Zippopotam.us to resolve a US ZIP code to coordinates.
5. Forecast data is fetched with current, hourly, and daily fields in the selected unit system.
6. Weather News fetches active National Weather Service alerts for the selected coordinates.
7. Daily advice and local weather trivia are computed from current, hourly, and daily forecast values, including dog park guidance.
8. The current panel, advice panel, trivia panel, animated scene, hourly chart, Weather News section, seven-day list, and detail panel are rendered from the response data.
9. Favorites and unit preferences are stored in `localStorage`.

## Data Sources

Open-Meteo is used because it supports browser calls without an API key.
Zippopotam.us is used for no-key US ZIP code lookup.
The National Weather Service alerts API is used for location-specific Weather News.

Forecast endpoint fields:

- `current`: temperature, apparent temperature, humidity, weather code, cloud cover, precipitation, pressure, wind speed, wind direction, and gusts.
- `hourly`: temperature, precipitation probability, weather code, and wind speed.
- `daily`: weather code, high and low temperatures, precipitation probability, sunrise, sunset, and UV index.

## State

The app keeps state in a single in-memory object:

- `units`: `imperial` or `metric`.
- `favorites`: saved normalized locations.
- `lastLocation`: last loaded normalized location.
- `location`: current normalized location.
- `weather`: last forecast response.
- `news`: last National Weather Service alert list.
- `catsEnabled`: floating cat animation preference.
- `locationMode`: selected City or ZIP search mode.

Persistent state is stored under `weatherboard.*` keys in Local Storage.

## Floating Cats

The floating cat heads are generated as inline SVG elements in `app.js` and animated with `requestAnimationFrame`. They are decorative, hidden from assistive technology, and click-through so they do not block forecast controls. The app disables the animation when the browser reports `prefers-reduced-motion: reduce`.

## Weather Scene

The decorative weather scene is a canvas rendered from the active weather code group, day/night flag, and wind speed. Rain, snow, fog, storm flashes, drifting clouds, and wind-blown leaves share one `requestAnimationFrame` loop. When reduced motion is enabled, the app renders a still scene instead of starting the animation loop.

## Local Weather Trivia

The trivia panel is generated locally from the active forecast response. It summarizes daylight duration, daily temperature spread, humidity feel, wind direction, and peak precipitation probability without adding another network request.

## Offline Behavior

The service worker caches static app assets after the first successful load. Forecast API responses are not cached, so live weather still needs network access.

## Accessibility

- Controls use semantic buttons, labels, and fieldsets.
- Status changes are announced through an `aria-live` region.
- The decorative weather scene is hidden from assistive technology.
- The trend canvas has an accessible label and the same data is also available in the hourly cards.
- Focus styles are visible and keyboard friendly.
