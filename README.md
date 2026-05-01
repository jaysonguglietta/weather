# VibeCast

VibeCast is a responsive, installable browser weather app with live forecasts, practical daily advice, playful animations, and a stack of daily extras. It uses free browser-friendly APIs, so it does not need an API key, account, paid service, or server-side proxy.

## Highlights

- Forecast basics: current conditions, next-12-hour trend chart, hourly cards, and seven-day forecast.
- Location options: city search, dedicated US ZIP code entry, browser geolocation, and saved locations.
- Daily details: humidity, wind, pressure, cloud cover, UV index, sunrise, sunset, moon phase, and precipitation.
- Practical guidance: umbrella, outfit, comfort, dog park, and weather gear recommendations.
- Daily extras: Local Weather Trivia, Weather Word of the Day, Today's Horoscope, One Happy News Story, and Today in History.
- Weather News: National Weather Service alerts when available, plus fallback weather-resource cards.
- Motion: animated forecast scene, rain/snow/fog/storm effects, wind-blown leaves, 90% transparent page weather overlay, and optional floating cat heads.
- PWA support: installable manifest and service worker caching for static app assets.
- Simple stack: static HTML, CSS, and JavaScript with no build step or framework.

## Documentation

- `docs/USER_GUIDE.md`: how to use each app section.
- `docs/ARCHITECTURE.md`: runtime flow, data sources, state, rendering, and offline behavior.
- `docs/DEVELOPMENT.md`: local setup, validation checklist, and maintenance notes.
- `CHANGELOG.md`: versioned feature and documentation history.

## Run Locally

Open `index.html` directly in a browser, or serve the folder locally:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

Serving over HTTP is recommended because service workers are not available from `file://` URLs. Any available local port works, for example `python3 -m http.server 8003` if your preview is already pointed at `http://127.0.0.1:8003/`.

## Deployment

This app can be hosted by any static web host.

For GitHub Pages:

1. Push the repository to GitHub.
2. Open the repository settings.
3. Go to Pages.
4. Choose the default branch and `/root` as the source.
5. Save the setting and wait for the Pages URL to become available.

## API

VibeCast calls:

- `https://geocoding-api.open-meteo.com/v1/search`
- `https://geocoding-api.open-meteo.com/v1/reverse`
- `https://api.open-meteo.com/v1/forecast`
- `https://api.zippopotam.us/us/{zip}`
- `https://api.weather.gov/alerts/active?point={lat},{lon}` for US alert coverage
- `https://en.wikipedia.org/api/rest_v1/feed/onthisday/selected/{MM}/{DD}`

Trivia, word of the day, horoscope, happy news, advice, moon phase, and visual effects are generated locally in the browser from the loaded forecast.

## Data And Privacy

VibeCast does not have accounts, analytics, or a backend. Saved locations, units, city/ZIP mode, horoscope sign, and cat preference stay in the current browser's Local Storage under legacy `weatherboard.*` keys so existing users keep their preferences after the VibeCast rename. Weather APIs receive the search text or coordinates needed to return a forecast.

See `docs/ARCHITECTURE.md` for implementation details.

## Browser Support

VibeCast uses modern browser APIs: Fetch, Canvas, Local Storage, Service Workers, and Geolocation. The core forecast works in current Chrome, Edge, Firefox, and Safari. Geolocation depends on browser permission and local device support. Motion-heavy effects respect reduced-motion preferences.

## License

MIT. See `LICENSE`.
