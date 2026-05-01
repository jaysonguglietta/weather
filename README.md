# WeatherBoard

WeatherBoard is a responsive, installable browser weather app. It uses the free Open-Meteo APIs, so it does not need an API key or server-side proxy.

## Features

- Current conditions with temperature, feels-like temperature, humidity, wind, pressure, cloud cover, UV index, sunrise, and sunset.
- City or ZIP search through Open-Meteo geocoding.
- Browser geolocation support.
- Next-12-hours trend chart and compact hourly forecast cards.
- Seven-day forecast with high and low temperature ranges.
- Saved locations stored locally in the browser.
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

See `docs/ARCHITECTURE.md` for implementation details.

## Browser Support

WeatherBoard uses modern browser APIs: Fetch, Canvas, Local Storage, Service Workers, and Geolocation. The core forecast works in current Chrome, Edge, Firefox, and Safari. Geolocation depends on browser permission and local device support.

## License

MIT. See `LICENSE`.
