# Development

## Requirements

- A modern browser.
- Python 3 if you want a simple local static server.

No package manager or build system is required.

## Local Server

```bash
python3 -m http.server 8000
```

Visit `http://localhost:8000`.

## Validation

Basic checks:

```bash
node --check app.js
python3 -m http.server 8000
```

Then load the app in a browser and confirm:

- The default forecast loads.
- A city or ZIP search loads a new forecast.
- ZIP mode accepts a 5-digit US ZIP code and loads a forecast.
- Today's Advice updates after each forecast load and after unit changes, including the dog park recommendation.
- Local Weather Trivia updates after each forecast load and unit change.
- Weather News loads National Weather Service alerts or shows fallback resource cards.
- The weather scene animates for rain, snow, fog, storm, and leaf motion, and becomes still when reduced motion is active.
- Unit switching refetches values.
- Saving and removing locations works.
- The layout remains usable on a narrow viewport.

## Coding Notes

- Keep the app static unless a backend becomes necessary.
- Keep Open-Meteo field lists explicit so API changes are easy to review.
- Render user-facing text with `textContent` when possible.
- The hourly chart is supplemental; the hourly cards carry the same information for accessibility.
