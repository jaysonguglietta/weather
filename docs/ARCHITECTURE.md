# Architecture

VibeCast is intentionally small: it is a static frontend app that talks directly to public weather and almanac APIs from the browser. No server, build step, account system, or API key is required.

## Design Goals

- Keep the first screen useful as an actual app, not a landing page.
- Keep forecast calls transparent and browser-friendly.
- Generate playful daily extras locally when possible.
- Preserve user preferences locally without adding accounts or tracking.
- Respect reduced-motion preferences for decorative animation.

## File Map

- `index.html`: semantic app shell, controls, forecast panels, and canvas elements.
- `styles.css`: responsive layout, component styling, accessible focus states, chart containers, and decorative animation layers.
- `app.js`: API calls, state management, rendering, weather trivia, weather glossary terms, horoscope generation, happy story generation, Today in History rendering, animated canvas drawing, whole-page weather overlay, favorites, unit toggles, floating cat animation, and service worker registration.
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
7. Daily advice, local weather trivia, moon phase, horoscope text, one happy story, and the Weather Word of the Day are computed from current, hourly, and daily forecast values, including dog park guidance.
8. Today in History fetches Wikimedia On This Day events for the forecast date and falls back to local events if unavailable.
9. The current panel, advice panel, trivia panel, word panel, horoscope panel, happy story panel, Today in History section, animated scene, 90% transparent page overlay, hourly chart, Weather News section, seven-day list, and detail panel are rendered from the response data.
10. Favorites, selected zodiac sign, and unit preferences are stored in `localStorage`.
11. The service worker registers after initialization and caches static assets for repeat visits.

## Data Sources

Open-Meteo is used because it supports browser calls without an API key.
Zippopotam.us is used for no-key US ZIP code lookup.
The National Weather Service alerts API is used for location-specific Weather News where US alert coverage is available.
Wikimedia's On This Day feed is used for Today in History cards.
Local deterministic generators provide daily advice, Local Weather Trivia, Weather Word of the Day, Today's Horoscope, One Happy News Story, moon phase, and visual effects.

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
- `horoscopeSign`: selected zodiac sign for the daily horoscope panel.

Persistent state is stored under legacy `weatherboard.*` keys in Local Storage so saved locations and preferences survive the VibeCast rename. No state is sent to a VibeCast backend because there is no backend.

## Floating Cats

The floating cat heads are generated as inline SVG elements in `app.js` and animated with `requestAnimationFrame`. They are decorative, hidden from assistive technology, and click-through so they do not block forecast controls. The app disables the animation when the browser reports `prefers-reduced-motion: reduce`.

## Weather Scene

The decorative weather scene is a canvas rendered from the active weather code group, day/night flag, and wind speed. Rain, snow, fog, storm flashes, drifting clouds, and wind-blown leaves share one `requestAnimationFrame` loop. When reduced motion is enabled, the app renders a still scene instead of starting the animation loop.

## Weather Overlay

The full-page overlay is a fixed, click-through canvas at 10% opacity, making it 90% transparent. It mirrors the active forecast with rain streaks, snow, fog bands, storm flashes, or light drifting particles and switches to a still frame when reduced motion is enabled.

## Advice Engine

Today's Advice is generated from current, hourly, and daily forecast values. It checks precipitation risk for umbrella guidance, temperature and apparent temperature for clothing, humidity and wind for comfort, daylight and precipitation windows for dog park guidance, and UV, gusts, snow, storm, or heat signals for extra gear notes.

## Moon Phase

The Today detail panel calculates moon phase locally from the forecast date using a synodic-month approximation. It renders the phase name and approximate illumination percentage without adding another network request.

## Local Weather Trivia

The trivia panel is generated locally from the active forecast response. It summarizes daylight duration, daily temperature spread, humidity feel, wind direction, and peak precipitation probability without adding another network request.

## Weather Word of the Day

The word panel is generated from a local glossary. The selected term is deterministic for the forecast date, location, and active weather group, then paired with a short definition, example, and local forecast context.

## Today's Horoscope

The horoscope panel accepts zodiac sign names and common aliases, then saves the normalized sign locally. The daily reading is generated in the browser from the sign, forecast date, current weather group, and calculated moon phase; it does not call an external horoscope API.

## One Happy News Story

The happy story panel is generated from a local set of positive, evergreen story prompts. The selected story is deterministic for the forecast date, location, and weather group, then paired with a short weather tie-in without calling another news API.

## Today in History

The history panel requests selected events from Wikimedia's On This Day REST feed using the forecast date. Events are rendered with `textContent`, and article links open in a new tab. A small local fallback covers the current launch date and a generic almanac message if the feed is unavailable.

## Failure Handling

Search, forecast, alert, and history failures are caught and shown as status text or fallback cards instead of breaking the page. Weather News falls back to resource cards, Today in History falls back to local entries, and generated daily extras continue to render from any successfully loaded forecast.

## Offline Behavior

The service worker caches static app assets after the first successful load. Forecast, alert, and history API responses are not cached, so live weather, alerts, and fresh history events still need network access. When shipped assets change, update `CACHE_NAME` in `sw.js` so browsers pick up the new static files.

## Accessibility

- Controls use semantic buttons, labels, and fieldsets.
- Status changes are announced through an `aria-live` region.
- Decorative weather canvases and floating cats are hidden from assistive technology.
- The trend canvas has an accessible label and the same data is also available in the hourly cards.
- Focus styles are visible and keyboard friendly.
- Motion-heavy effects respect `prefers-reduced-motion`.
