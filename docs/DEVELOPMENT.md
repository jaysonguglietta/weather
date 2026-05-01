# Development

## Requirements

- A modern browser.
- Python 3 if you want a simple local static server.
- Node.js for JavaScript syntax checks.

No package manager or build system is required.

## Local Server

```bash
python3 -m http.server 8000
```

Visit `http://localhost:8000`. Any open port is fine, including `8003` if the Codex preview is already using `http://127.0.0.1:8003/`.

## Validation

Basic checks:

```bash
node --check app.js
node --check sw.js
git diff --check
python3 -m http.server 8000
```

Then load the app in a browser and confirm:

- The default forecast loads.
- A city or ZIP search loads a new forecast.
- ZIP mode accepts a 5-digit US ZIP code and loads a forecast.
- Browser geolocation loads a forecast after permission is granted.
- Today's Advice updates after each forecast load and after unit changes, including the dog park recommendation.
- Moon phase renders in the Today panel with a phase name and illumination percentage.
- Local Weather Trivia updates after each forecast load and unit change.
- Weather Word of the Day renders a term, definition, example, and local forecast context.
- Today's Horoscope accepts zodiac sign names, saves the selected sign, and updates after forecast changes.
- One Happy News Story renders a single daily story with a forecast-aware weather tie-in.
- Today in History renders Wikimedia events for the forecast date or the local fallback when the feed is unavailable.
- Weather News loads National Weather Service alerts or shows fallback resource cards.
- The weather scene animates for rain, snow, fog, storm, and leaf motion, and becomes still when reduced motion is active.
- The 90% transparent page overlay mirrors the active weather group without blocking clicks.
- Unit switching refetches values.
- Saving and removing locations works.
- The layout remains usable on a narrow viewport.
- The page title and header show `VibeCast`.
- Browser console has no new JavaScript errors.

## Documentation Checklist

When adding or changing features, update:

- `README.md` for the feature list, APIs, local setup, or data/privacy notes.
- `docs/USER_GUIDE.md` for user-facing workflows and troubleshooting.
- `docs/ARCHITECTURE.md` for data flow, state, generated content, or offline behavior.
- `docs/DEVELOPMENT.md` for validation steps and maintenance notes.
- `CHANGELOG.md` with a new version entry.

## Coding Notes

- Keep the app static unless a backend becomes necessary.
- Keep Open-Meteo field lists explicit so API changes are easy to review.
- Render user-facing text with `textContent` when possible.
- The hourly chart is supplemental; the hourly cards carry the same information for accessibility.
- Keep existing `weatherboard.*` Local Storage keys unless there is a migration plan.
- Bump `CACHE_NAME` in `sw.js` when shipped static app assets change.
