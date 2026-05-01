# Architecture

WeatherBoard is intentionally small: it is a static frontend app that talks directly to Open-Meteo from the browser.

## File Map

- `index.html`: semantic app shell, controls, forecast panels, and canvas elements.
- `styles.css`: responsive layout, component styling, accessible focus states, chart containers, and the floating cat layer.
- `app.js`: API calls, state management, rendering, canvas drawing, favorites, unit toggles, floating cat animation, and service worker registration.
- `sw.js`: static asset cache for repeat visits.
- `manifest.webmanifest`: installable app metadata.
- `assets/weather-mark.svg`: app icon and favicon.

## Runtime Flow

1. `app.js` initializes controls and loads the last saved location from `localStorage`.
2. If no saved location exists, the app loads a default New York forecast.
3. Searches call Open-Meteo geocoding and use the first matching result.
4. Forecast data is fetched with current, hourly, and daily fields in the selected unit system.
5. The current panel, hourly chart, seven-day list, and detail panel are rendered from the same forecast response.
6. Favorites and unit preferences are stored in `localStorage`.

## Data Sources

Open-Meteo is used because it supports browser calls without an API key.

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
- `catsEnabled`: floating cat animation preference.

Persistent state is stored under `weatherboard.*` keys in Local Storage.

## Floating Cats

The floating cat heads are generated as inline SVG elements in `app.js` and animated with `requestAnimationFrame`. They are decorative, hidden from assistive technology, and click-through so they do not block forecast controls. The app disables the animation when the browser reports `prefers-reduced-motion: reduce`.

## Offline Behavior

The service worker caches static app assets after the first successful load. Forecast API responses are not cached, so live weather still needs network access.

## Accessibility

- Controls use semantic buttons, labels, and fieldsets.
- Status changes are announced through an `aria-live` region.
- The decorative weather scene is hidden from assistive technology.
- The trend canvas has an accessible label and the same data is also available in the hourly cards.
- Focus styles are visible and keyboard friendly.
