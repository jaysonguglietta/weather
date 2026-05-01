# WeatherBoard

WeatherBoard is a responsive, installable browser weather app. It uses the free Open-Meteo APIs, so it does not need an API key or server-side proxy.

## Features

- Current conditions with temperature, feels-like temperature, humidity, wind, pressure, cloud cover, UV index, sunrise, sunset, and moon phase.
- City search through Open-Meteo geocoding.
- Dedicated US ZIP code entry through Zippopotam.us.
- Browser geolocation support.
- Next-12-hours trend chart and compact hourly forecast cards.
- Daily advice for umbrella, outfit, comfort, dog park conditions, and weather-specific gear.
- Local Weather Trivia cards for daylight, temperature swing, humidity, wind direction, and precipitation odds.
- Weather Word of the Day with a local glossary term tied to the current forecast pattern.
- Today's Horoscope with a saved zodiac sign and forecast-aware daily reading.
- Weather News section with location-specific National Weather Service alerts and weather-resource links.
- Seven-day forecast with high and low temperature ranges.
- Animated weather scene with falling rain, snow, fog drift, storm flashes, and wind-blown leaves.
- Whole-page weather overlay that mirrors current conditions at 90% transparency.
- Saved locations stored locally in the browser.
- Optional floating cat heads that bounce around the screen.
- Static PWA assets cached by a service worker.
- No build step, framework, backend, or paid API required.

## Run Locally

Open `index.html` directly in a browser, or serve the folder locally:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

Serving over HTTP is recommended because service workers are not available from `file://` URLs.

## Deployment

This app can be hosted by any static web host.

For GitHub Pages:

1. Push the repository to GitHub.
2. Open the repository settings.
3. Go to Pages.
4. Choose the default branch and `/root` as the source.
5. Save the setting and wait for the Pages URL to become available.

## API

WeatherBoard calls:

- `https://geocoding-api.open-meteo.com/v1/search`
- `https://geocoding-api.open-meteo.com/v1/reverse`
- `https://api.open-meteo.com/v1/forecast`
- `https://api.zippopotam.us/us/{zip}`
- `https://api.weather.gov/alerts/active?point={lat},{lon}`

See `docs/ARCHITECTURE.md` for implementation details.

## Browser Support

WeatherBoard uses modern browser APIs: Fetch, Canvas, Local Storage, Service Workers, and Geolocation. The core forecast works in current Chrome, Edge, Firefox, and Safari. Geolocation depends on browser permission and local device support.

## License

MIT. See `LICENSE`.
