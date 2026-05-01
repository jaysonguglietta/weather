const WEATHER_CODES = {
  0: { label: "Clear sky", group: "clear" },
  1: { label: "Mostly clear", group: "clear" },
  2: { label: "Partly cloudy", group: "cloud" },
  3: { label: "Overcast", group: "cloud" },
  45: { label: "Fog", group: "fog" },
  48: { label: "Rime fog", group: "fog" },
  51: { label: "Light drizzle", group: "rain" },
  53: { label: "Drizzle", group: "rain" },
  55: { label: "Heavy drizzle", group: "rain" },
  56: { label: "Freezing drizzle", group: "rain" },
  57: { label: "Freezing drizzle", group: "rain" },
  61: { label: "Light rain", group: "rain" },
  63: { label: "Rain", group: "rain" },
  65: { label: "Heavy rain", group: "rain" },
  66: { label: "Freezing rain", group: "rain" },
  67: { label: "Freezing rain", group: "rain" },
  71: { label: "Light snow", group: "snow" },
  73: { label: "Snow", group: "snow" },
  75: { label: "Heavy snow", group: "snow" },
  77: { label: "Snow grains", group: "snow" },
  80: { label: "Rain showers", group: "rain" },
  81: { label: "Rain showers", group: "rain" },
  82: { label: "Heavy showers", group: "rain" },
  85: { label: "Snow showers", group: "snow" },
  86: { label: "Snow showers", group: "snow" },
  95: { label: "Thunderstorm", group: "storm" },
  96: { label: "Thunderstorm", group: "storm" },
  99: { label: "Thunderstorm", group: "storm" }
};

const STORAGE_KEYS = {
  cats: "weatherboard.cats",
  locationMode: "weatherboard.locationMode",
  units: "weatherboard.units",
  favorites: "weatherboard.favorites",
  lastLocation: "weatherboard.lastLocation"
};

const CAT_PALETTE = [
  { base: "#f4b05f", blush: "#e87954", spot: "#ffffff", stripe: "#9b5b2f" },
  { base: "#f6f1e8", blush: "#ee8f8f", spot: "#2f3638", stripe: "#9c9690" },
  { base: "#2f3638", blush: "#f09595", spot: "#f6f1e8", stripe: "#5c6467" },
  { base: "#9fc7c9", blush: "#d86445", spot: "#ffffff", stripe: "#137c7f" },
  { base: "#d6a77a", blush: "#db765d", spot: "#fff8ea", stripe: "#7b5036" }
];

const WET_WEATHER_GROUPS = new Set(["rain", "storm", "snow"]);
const LEAF_COLORS = ["#d86445", "#e8aa25", "#9b6f32", "#137c7f", "#7f9b4e"];
const WEATHER_WORDS = [
  {
    definition: "The horizontal movement of air that carries heat, moisture, or smoke from one place to another.",
    example: "A sea breeze pushing cooler ocean air inland is advection at work.",
    groups: ["clear", "cloud", "fog"],
    label: "Air movement",
    term: "Advection"
  },
  {
    definition: "How much sunlight a surface reflects instead of absorbs.",
    example: "Fresh snow has high albedo, so it reflects a lot of incoming sunlight.",
    groups: ["clear", "snow"],
    label: "Sun science",
    term: "Albedo"
  },
  {
    definition: "A tool that measures wind speed.",
    example: "Airport weather stations use anemometers to report the wind in each observation.",
    groups: ["clear", "cloud", "rain", "storm"],
    label: "Instrument",
    term: "Anemometer"
  },
  {
    definition: "A flat, spreading cloud shield at the top of a strong thunderstorm.",
    example: "An anvil cloud can stretch far downwind from the storm that created it.",
    groups: ["storm"],
    label: "Storm shape",
    term: "Anvil"
  },
  {
    definition: "The temperature at which air becomes saturated and water vapor can condense.",
    example: "When air cools to its dew point, fog, clouds, or dew can form.",
    groups: ["fog", "rain", "cloud"],
    label: "Moisture",
    term: "Dew point"
  },
  {
    definition: "A boundary between two air masses with different temperature or humidity.",
    example: "A cold front can bring a wind shift, showers, or a quick temperature drop.",
    groups: ["cloud", "rain", "storm", "snow"],
    label: "Boundary",
    term: "Front"
  },
  {
    definition: "Soft snow pellets that form when supercooled droplets freeze onto snowflakes.",
    example: "Graupel can look like tiny foam beads bouncing off the ground.",
    groups: ["snow", "storm"],
    label: "Frozen stuff",
    term: "Graupel"
  },
  {
    definition: "A line on a weather map connecting points with equal air pressure.",
    example: "Closely packed isobars usually mean stronger wind.",
    groups: ["clear", "cloud", "rain", "storm", "snow"],
    label: "Map reading",
    term: "Isobar"
  },
  {
    definition: "Cool, moist ocean air that spreads inland, often with low clouds or fog.",
    example: "A marine layer can make the coast cloudy while inland areas stay sunny.",
    groups: ["fog", "cloud"],
    label: "Coastal weather",
    term: "Marine layer"
  },
  {
    definition: "A small area with weather that differs from nearby places.",
    example: "A shady park, a downtown block, and a hilltop can each have their own microclimate.",
    groups: ["clear", "cloud", "fog"],
    label: "Local detail",
    term: "Microclimate"
  },
  {
    definition: "Cool air spreading outward from a thunderstorm after rain-cooled air sinks.",
    example: "An outflow boundary can kick up gusty wind before rain reaches you.",
    groups: ["storm", "rain"],
    label: "Storm wind",
    term: "Outflow boundary"
  },
  {
    definition: "A dry area on the downwind side of mountains after air loses moisture on the windward side.",
    example: "Rain shadows help explain why some inland valleys stay much drier than nearby slopes.",
    groups: ["clear", "cloud"],
    label: "Terrain effect",
    term: "Rain shadow"
  },
  {
    definition: "Cooling that happens when the ground loses heat on clear, calm nights.",
    example: "Radiational cooling can make low spots colder than surrounding neighborhoods before sunrise.",
    groups: ["clear", "fog", "snow"],
    label: "Night cooling",
    term: "Radiational cooling"
  },
  {
    definition: "Rain or snow that evaporates or sublimates before reaching the ground.",
    example: "Virga can look like streaks hanging under a cloud with dry air below.",
    groups: ["cloud", "rain", "snow"],
    label: "Sky clue",
    term: "Virga"
  }
];

const elements = {
  adviceSummary: document.querySelector("#adviceSummary"),
  catField: document.querySelector("#catField"),
  catToggle: document.querySelector("#catToggle"),
  clearFavoritesButton: document.querySelector("#clearFavoritesButton"),
  comfortDecision: document.querySelector("#comfortDecision"),
  comfortReason: document.querySelector("#comfortReason"),
  cloudCover: document.querySelector("#cloudCover"),
  currentCondition: document.querySelector("#currentCondition"),
  currentHeading: document.querySelector("#currentHeading"),
  currentTemp: document.querySelector("#currentTemp"),
  dailyList: document.querySelector("#dailyList"),
  dailySummary: document.querySelector("#dailySummary"),
  dogParkDecision: document.querySelector("#dogParkDecision"),
  dogParkReason: document.querySelector("#dogParkReason"),
  extraDecision: document.querySelector("#extraDecision"),
  extraReason: document.querySelector("#extraReason"),
  favoriteList: document.querySelector("#favoriteList"),
  feelsLike: document.querySelector("#feelsLike"),
  gusts: document.querySelector("#gusts"),
  hourlyList: document.querySelector("#hourlyList"),
  hourlySummary: document.querySelector("#hourlySummary"),
  humidity: document.querySelector("#humidity"),
  locationButton: document.querySelector("#locationButton"),
  locationInput: document.querySelector("#locationInput"),
  locationModeInputs: document.querySelectorAll("input[name='locationMode']"),
  newsList: document.querySelector("#newsList"),
  newsSummary: document.querySelector("#newsSummary"),
  outfitDecision: document.querySelector("#outfitDecision"),
  outfitReason: document.querySelector("#outfitReason"),
  precipitation: document.querySelector("#precipitation"),
  pressure: document.querySelector("#pressure"),
  saveFavoriteButton: document.querySelector("#saveFavoriteButton"),
  sceneCanvas: document.querySelector("#sceneCanvas"),
  searchForm: document.querySelector("#searchForm"),
  statusLine: document.querySelector("#statusLine"),
  sunrise: document.querySelector("#sunrise"),
  sunset: document.querySelector("#sunset"),
  timezoneLabel: document.querySelector("#timezoneLabel"),
  trendCanvas: document.querySelector("#trendCanvas"),
  triviaList: document.querySelector("#triviaList"),
  triviaSummary: document.querySelector("#triviaSummary"),
  umbrellaDecision: document.querySelector("#umbrellaDecision"),
  umbrellaReason: document.querySelector("#umbrellaReason"),
  unitInputs: document.querySelectorAll("input[name='units']"),
  updatedAt: document.querySelector("#updatedAt"),
  uvIndex: document.querySelector("#uvIndex"),
  wind: document.querySelector("#wind"),
  wordContext: document.querySelector("#wordContext"),
  wordDefinition: document.querySelector("#wordDefinition"),
  wordExample: document.querySelector("#wordExample"),
  wordLabel: document.querySelector("#wordLabel"),
  wordSummary: document.querySelector("#wordSummary"),
  wordTerm: document.querySelector("#wordTerm")
};

const state = {
  catsEnabled: localStorage.getItem(STORAGE_KEYS.cats) !== "off",
  favorites: readJson(STORAGE_KEYS.favorites, []),
  lastLocation: readJson(STORAGE_KEYS.lastLocation, null),
  location: null,
  locationMode: localStorage.getItem(STORAGE_KEYS.locationMode) || "city",
  news: [],
  units: localStorage.getItem(STORAGE_KEYS.units) || "imperial",
  weather: null
};

const catState = {
  cats: [],
  frame: null,
  lastTime: 0,
  motionQuery: window.matchMedia("(prefers-reduced-motion: reduce)")
};

const sceneState = {
  driftOffset: 0,
  frame: null,
  group: "clear",
  height: 0,
  isDay: true,
  lastTime: 0,
  leaves: [],
  lightning: 0,
  particles: [],
  windMph: 0,
  width: 0
};

function readJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) || fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function unitConfig() {
  if (state.units === "metric") {
    return {
      precipitation: "mm",
      precipitationParam: "mm",
      speed: "km/h",
      speedParam: "kmh",
      temperature: "C",
      temperatureParam: "celsius"
    };
  }

  return {
    precipitation: "in",
    precipitationParam: "inch",
    speed: "mph",
    speedParam: "mph",
    temperature: "F",
    temperatureParam: "fahrenheit"
  };
}

function setStatus(message, type = "info") {
  elements.statusLine.textContent = message;
  elements.statusLine.classList.toggle("is-error", type === "error");
}

function normalizeLocation(raw) {
  const latitude = Number(raw.latitude);
  const longitude = Number(raw.longitude);
  const name = raw.name || raw.city || "Current location";
  const admin = raw.admin1 || raw.admin2 || "";
  const country = raw.country_code || raw.country || "";
  const zip = raw.zip || raw["post code"] || "";

  return {
    id: `${name}-${admin}-${country}-${zip}-${latitude.toFixed(3)}-${longitude.toFixed(3)}`,
    name,
    admin,
    country,
    latitude,
    longitude,
    zip
  };
}

function locationLabel(location) {
  if (!location) {
    return "Choose a location";
  }

  const region = [location.admin, location.zip].filter(Boolean).join(" ");
  const place = [location.name, region].filter(Boolean).join(", ");
  return [place, location.country].filter(Boolean).join(" ");
}

function formatTemp(value) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) {
    return "--";
  }

  return `${Math.round(value)}&deg;${unitConfig().temperature}`;
}

function formatTempText(value) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) {
    return "--";
  }

  return `${Math.round(value)}°${unitConfig().temperature}`;
}

function toFahrenheit(value) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) {
    return null;
  }

  return state.units === "metric" ? (Number(value) * 9) / 5 + 32 : Number(value);
}

function toMph(value) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) {
    return null;
  }

  return state.units === "metric" ? Number(value) / 1.609 : Number(value);
}

function formatNumber(value, digits = 0) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) {
    return "--";
  }

  return Number(value).toLocaleString(undefined, {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits
  });
}

function formatDegreeDelta(value) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) {
    return "--";
  }

  return `${formatNumber(Math.abs(value))}°${unitConfig().temperature}`;
}

function parseLocalTimeMinutes(value) {
  const time = String(value || "").split("T")[1] || "";
  const [hourText, minuteText = "0"] = time.split(":");
  const hour = Number(hourText);
  const minute = Number(minuteText);

  if (Number.isNaN(hour) || Number.isNaN(minute)) {
    return null;
  }

  return hour * 60 + minute;
}

function formatDuration(minutes) {
  if (minutes === null || minutes === undefined || Number.isNaN(Number(minutes)) || minutes <= 0) {
    return "--";
  }

  const hours = Math.floor(minutes / 60);
  const remainder = Math.round(minutes % 60);
  return remainder ? `${hours} hr ${remainder} min` : `${hours} hr`;
}

function directionName(compass) {
  return {
    E: "east",
    N: "north",
    NE: "northeast",
    NW: "northwest",
    S: "south",
    SE: "southeast",
    SW: "southwest",
    W: "west"
  }[compass] || "variable directions";
}

function hashString(value) {
  return Array.from(String(value)).reduce((hash, character) => (
    ((hash << 5) - hash + character.charCodeAt(0)) | 0
  ), 0);
}

function formatHour(value) {
  const time = String(value || "").split("T")[1] || "";
  const [hourText, minuteText = "00"] = time.split(":");
  const hour = Number(hourText);

  if (Number.isNaN(hour)) {
    return "--";
  }

  const suffix = hour >= 12 ? "PM" : "AM";
  const clockHour = hour % 12 || 12;
  return `${clockHour}:${minuteText.padStart(2, "0")} ${suffix}`;
}

function formatDateTime(value) {
  const date = String(value || "").split("T")[0];
  return `${formatDay(date)}, ${formatHour(value)}`;
}

function formatDay(value) {
  const [year, month, day] = String(value || "").split("-").map(Number);
  if (!year || !month || !day) {
    return "--";
  }

  return new Date(year, month - 1, day).toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric"
  });
}

function compassDirection(degrees) {
  if (degrees === null || degrees === undefined || Number.isNaN(Number(degrees))) {
    return "--";
  }

  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return directions[Math.round(Number(degrees) / 45) % directions.length];
}

function weatherGroup(code) {
  return (WEATHER_CODES[code] && WEATHER_CODES[code].group) || "cloud";
}

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Request failed with ${response.status}`);
  }

  return response.json();
}

async function searchLocation(query) {
  const params = new URLSearchParams({
    count: "5",
    format: "json",
    language: "en",
    name: query
  });
  const data = await fetchJson(`https://geocoding-api.open-meteo.com/v1/search?${params}`);
  const results = data.results || [];

  if (!results.length) {
    throw new Error("No matching locations found.");
  }

  return results.map(normalizeLocation);
}

function normalizeZip(zip) {
  const match = queryZipPattern().exec(zip.trim());
  return match ? match[1] : "";
}

function queryZipPattern() {
  return /^(\d{5})(?:-\d{4})?$/;
}

function isZipSearch(query) {
  return queryZipPattern().test(query.trim());
}

async function searchZipCode(query) {
  const zip = normalizeZip(query);
  if (!zip) {
    throw new Error("Enter a valid 5-digit US ZIP code.");
  }

  const data = await fetchJson(`https://api.zippopotam.us/us/${zip}`);
  const place = data.places && data.places[0];

  if (!place) {
    throw new Error("No matching ZIP code found.");
  }

  return normalizeLocation({
    admin1: place["state abbreviation"] || place.state,
    country_code: data["country abbreviation"] || "US",
    latitude: place.latitude,
    longitude: place.longitude,
    name: place["place name"],
    zip: data["post code"] || zip
  });
}

async function reverseGeocode(latitude, longitude) {
  const params = new URLSearchParams({
    format: "json",
    language: "en",
    latitude: String(latitude),
    longitude: String(longitude)
  });

  try {
    const data = await fetchJson(`https://geocoding-api.open-meteo.com/v1/reverse?${params}`);
    const first = data.results && data.results[0];
    if (first) {
      return normalizeLocation(first);
    }
  } catch {
    return null;
  }

  return null;
}

async function fetchForecast(location) {
  const units = unitConfig();
  const params = new URLSearchParams({
    current: [
      "temperature_2m",
      "relative_humidity_2m",
      "apparent_temperature",
      "is_day",
      "precipitation",
      "rain",
      "showers",
      "snowfall",
      "weather_code",
      "cloud_cover",
      "pressure_msl",
      "wind_speed_10m",
      "wind_direction_10m",
      "wind_gusts_10m"
    ].join(","),
    daily: [
      "weather_code",
      "temperature_2m_max",
      "temperature_2m_min",
      "precipitation_probability_max",
      "sunrise",
      "sunset",
      "uv_index_max"
    ].join(","),
    forecast_days: "7",
    hourly: [
      "temperature_2m",
      "precipitation_probability",
      "weather_code",
      "wind_speed_10m"
    ].join(","),
    latitude: String(location.latitude),
    longitude: String(location.longitude),
    precipitation_unit: units.precipitationParam,
    temperature_unit: units.temperatureParam,
    timezone: "auto",
    wind_speed_unit: units.speedParam
  });

  return fetchJson(`https://api.open-meteo.com/v1/forecast?${params}`);
}

async function fetchWeatherNews(location) {
  const params = new URLSearchParams({
    point: `${location.latitude.toFixed(4)},${location.longitude.toFixed(4)}`
  });
  const data = await fetchJson(`https://api.weather.gov/alerts/active?${params}`);
  return data.features || [];
}

async function loadWeather(location) {
  state.location = location;
  setStatus(`Loading ${locationLabel(location)}...`);
  renderNewsLoading(location);
  elements.saveFavoriteButton.disabled = true;

  try {
    const weather = await fetchForecast(location);
    state.weather = weather;
    state.lastLocation = location;
    writeJson(STORAGE_KEYS.lastLocation, location);
    renderWeather();
    setStatus(`Showing ${locationLabel(location)}.`);
    elements.saveFavoriteButton.disabled = false;
    loadWeatherNews(location);
  } catch (error) {
    console.error(error);
    setStatus("Forecast service is unavailable right now.", "error");
    renderNewsError();
  }
}

async function loadWeatherNews(location) {
  try {
    state.news = await fetchWeatherNews(location);
    renderWeatherNews(location);
  } catch (error) {
    console.info("Weather news unavailable.", error);
    renderNewsError();
  }
}

function renderWeather() {
  const weather = state.weather;
  const current = weather.current;
  const units = unitConfig();
  const codeMeta = WEATHER_CODES[current.weather_code] || { label: "Weather unavailable", group: "cloud" };

  document.body.dataset.weather = codeMeta.group;
  elements.currentHeading.textContent = locationLabel(state.location);
  elements.updatedAt.textContent = `Updated ${formatDateTime(current.time)}`;
  elements.currentTemp.innerHTML = formatTemp(current.temperature_2m);
  elements.currentCondition.textContent = codeMeta.label;
  elements.feelsLike.innerHTML = formatTemp(current.apparent_temperature);
  elements.humidity.textContent = `${formatNumber(current.relative_humidity_2m)}%`;
  elements.wind.textContent = `${formatNumber(current.wind_speed_10m)} ${units.speed} ${compassDirection(current.wind_direction_10m)}`;
  elements.pressure.textContent = `${formatNumber(current.pressure_msl)} hPa`;
  elements.cloudCover.textContent = `${formatNumber(current.cloud_cover)}%`;
  elements.precipitation.textContent = `${formatNumber(current.precipitation, units.precipitation === "in" ? 2 : 1)} ${units.precipitation}`;
  elements.gusts.textContent = `${formatNumber(current.wind_gusts_10m)} ${units.speed}`;
  elements.timezoneLabel.textContent = weather.timezone || "--";
  elements.sunrise.textContent = formatHour(weather.daily.sunrise[0]);
  elements.sunset.textContent = formatHour(weather.daily.sunset[0]);
  elements.uvIndex.textContent = formatNumber(weather.daily.uv_index_max[0], 1);

  const hours = getUpcomingHours(weather, 12);
  renderDailyAdvice(current, weather.daily, hours);
  renderWeatherTrivia(current, weather.daily, hours);
  renderWeatherWord(current, weather.daily, hours);
  renderHourly(hours);
  renderDaily(weather.daily);
  drawWeatherScene(codeMeta.group, Boolean(current.is_day), current.wind_speed_10m);
  drawTrendChart(hours);
}

function getUpcomingHours(weather, count) {
  const nowIndex = weather.hourly.time.findIndex((item) => item >= weather.current.time.slice(0, 13));
  const start = Math.max(nowIndex, 0);

  return weather.hourly.time.slice(start, start + count).map((time, index) => {
    const position = start + index;
    return {
      code: weather.hourly.weather_code[position],
      precipitation: weather.hourly.precipitation_probability[position],
      temperature: weather.hourly.temperature_2m[position],
      time,
      wind: weather.hourly.wind_speed_10m[position]
    };
  });
}

function renderHourly(hours) {
  const units = unitConfig();
  const high = Math.max(...hours.map((hour) => hour.temperature));
  const low = Math.min(...hours.map((hour) => hour.temperature));

  elements.hourlySummary.innerHTML = `${formatTemp(low)} to ${formatTemp(high)}`;
  elements.hourlyList.replaceChildren(
    ...hours.map((hour) => {
      const meta = WEATHER_CODES[hour.code] || { label: "Forecast" };
      const card = document.createElement("article");
      card.className = "hour-card";
      card.innerHTML = `
        <time datetime="${hour.time}">${formatHour(hour.time)}</time>
        <strong>${formatTemp(hour.temperature)}</strong>
        <span>${meta.label}</span>
        <span>${formatNumber(hour.precipitation)}% rain - ${formatNumber(hour.wind)} ${units.speed}</span>
      `;
      return card;
    })
  );
}

function renderDaily(daily) {
  const highs = daily.temperature_2m_max;
  const lows = daily.temperature_2m_min;
  const overallLow = Math.min(...lows);
  const overallHigh = Math.max(...highs);
  const spread = Math.max(overallHigh - overallLow, 1);
  elements.dailySummary.innerHTML = `${formatTemp(overallLow)} to ${formatTemp(overallHigh)}`;

  const rows = daily.time.map((date, index) => {
    const meta = WEATHER_CODES[daily.weather_code[index]] || { label: "Forecast" };
    const start = ((lows[index] - overallLow) / spread) * 100;
    const width = Math.max(((highs[index] - lows[index]) / spread) * 100, 8);
    const row = document.createElement("article");
    row.className = "daily-row";
    row.innerHTML = `
      <time datetime="${date}">${index === 0 ? "Today" : formatDay(date)}</time>
      <span class="daily-condition">${meta.label}</span>
      <span class="temp-range">
        <span class="range-track">
          <span class="range-fill" style="--range-start: ${start}%; --range-width: ${width}%;"></span>
        </span>
        <span class="range-label">
          <span>${formatTemp(lows[index])}</span>
          <span>${formatTemp(highs[index])}</span>
        </span>
      </span>
      <span class="precip-label">${formatNumber(daily.precipitation_probability_max[index])}% rain</span>
    `;
    return row;
  });

  elements.dailyList.replaceChildren(...rows);
}

function renderDailyAdvice(current, daily, hours) {
  const advice = buildDailyAdvice(current, daily, hours);
  elements.adviceSummary.textContent = advice.summary;
  elements.umbrellaDecision.textContent = advice.umbrella.title;
  elements.umbrellaReason.textContent = advice.umbrella.reason;
  elements.outfitDecision.textContent = advice.outfit.title;
  elements.outfitReason.textContent = advice.outfit.reason;
  elements.comfortDecision.textContent = advice.comfort.title;
  elements.comfortReason.textContent = advice.comfort.reason;
  elements.dogParkDecision.textContent = advice.dogPark.title;
  elements.dogParkReason.textContent = advice.dogPark.reason;
  elements.extraDecision.textContent = advice.extra.title;
  elements.extraReason.textContent = advice.extra.reason;
}

function renderWeatherTrivia(current, daily, hours) {
  const trivia = buildWeatherTrivia(current, daily, hours, state.location);
  const place = state.location ? state.location.name : "this location";
  elements.triviaSummary.textContent = `${trivia.length} facts for ${place}`;
  elements.triviaList.replaceChildren(...trivia.map(createTriviaCard));
}

function createTriviaCard(item) {
  const card = document.createElement("article");
  card.className = "trivia-card";

  const label = document.createElement("span");
  label.textContent = item.label;

  const title = document.createElement("strong");
  title.textContent = item.title;

  const body = document.createElement("p");
  body.textContent = item.body;

  card.append(label, title, body);
  return card;
}

function buildWeatherTrivia(current, daily, hours, location) {
  const units = unitConfig();
  const place = (location && location.name) || "This location";
  const high = daily.temperature_2m_max[0];
  const low = daily.temperature_2m_min[0];
  const sunrise = daily.sunrise[0];
  const sunset = daily.sunset[0];
  const sunriseMinutes = parseLocalTimeMinutes(sunrise);
  const sunsetMinutes = parseLocalTimeMinutes(sunset);
  const daylight = sunriseMinutes !== null && sunsetMinutes !== null
    ? (sunsetMinutes - sunriseMinutes + 1440) % 1440
    : null;
  const humidity = Number(current.relative_humidity_2m || 0);
  const windCompass = compassDirection(current.wind_direction_10m);
  const gusts = Number(current.wind_gusts_10m || 0);
  const maxPrecip = Math.max(
    daily.precipitation_probability_max[0] || 0,
    ...hours.map((hour) => hour.precipitation || 0)
  );

  return [
    {
      body: `Sunrise is ${formatHour(sunrise)} and sunset is ${formatHour(sunset)} in ${place}.`,
      label: "Sun clock",
      title: `${formatDuration(daylight)} daylight`
    },
    {
      body: `That is the gap between today's forecast low and high, which is why layers can matter more than the headline temperature.`,
      label: "Temp swing",
      title: `${formatDegreeDelta(Number(high) - Number(low))} spread`
    },
    {
      body: humidityTrivia(humidity, current.temperature_2m, current.apparent_temperature),
      label: "Humidity",
      title: `${formatNumber(humidity)}% relative`
    },
    {
      body: windCompass === "--"
        ? `Wind direction is variable right now, with gusts near ${formatNumber(gusts)} ${units.speed}.`
        : `A ${windCompass} wind means the air is arriving from the ${directionName(windCompass)}. Gusts are near ${formatNumber(gusts)} ${units.speed}.`,
      label: "Wind clue",
      title: `${formatNumber(current.wind_speed_10m)} ${units.speed} ${windCompass}`
    },
    {
      body: "Forecast probability is about whether measurable precipitation reaches the area, not how hard it falls once it starts.",
      label: "Rain math",
      title: `${formatNumber(maxPrecip)}% peak chance`
    }
  ];
}

function humidityTrivia(humidity, temperature, apparentTemperature) {
  const apparentDelta = Number(apparentTemperature) - Number(temperature);

  if (Number.isFinite(apparentDelta) && Math.abs(apparentDelta) >= 2) {
    const direction = apparentDelta > 0 ? "warmer" : "cooler";
    return `The feels-like reading is ${formatDegreeDelta(apparentDelta)} ${direction} than the thermometer, helped by humidity, wind, and sun angle.`;
  }

  if (humidity >= 80) {
    return "Moist air slows evaporation from skin, so warm temperatures can feel heavier than the number suggests.";
  }

  if (humidity <= 35) {
    return "Dry air lets moisture evaporate quickly, which can make shade and evening air feel sharper.";
  }

  return "That sits in a moderate range: enough moisture to notice, but not usually the sticky end of the scale.";
}

function renderWeatherWord(current, daily, hours) {
  const word = buildWeatherWord(current, daily, hours, state.location);
  elements.wordSummary.textContent = word.summary;
  elements.wordLabel.textContent = word.label;
  elements.wordTerm.textContent = word.term;
  elements.wordDefinition.textContent = word.definition;
  elements.wordExample.textContent = word.example;
  elements.wordContext.textContent = word.context;
}

function buildWeatherWord(current, daily, hours, location) {
  const date = String(current.time || new Date().toISOString()).split("T")[0];
  const group = weatherGroup(current.weather_code);
  const matchingWords = WEATHER_WORDS.filter((word) => word.groups.includes(group));
  const wordPool = matchingWords.length ? matchingWords : WEATHER_WORDS;
  const seed = Math.abs(hashString(`${date}-${group}-${location ? location.id : "default"}`));
  const word = wordPool[seed % wordPool.length];

  return {
    ...word,
    context: buildWeatherWordContext(word, current, daily, hours, location),
    summary: `${formatDay(date)} glossary`
  };
}

function buildWeatherWordContext(word, current, daily, hours, location) {
  const units = unitConfig();
  const group = weatherGroup(current.weather_code);
  const place = (location && location.name) || "this location";
  const meta = WEATHER_CODES[current.weather_code] || { label: "local weather" };
  const high = daily.temperature_2m_max[0];
  const low = daily.temperature_2m_min[0];
  const maxPrecip = Math.max(
    daily.precipitation_probability_max[0] || 0,
    ...hours.map((hour) => hour.precipitation || 0)
  );
  const groupNotes = {
    clear: `Today has ${meta.label.toLowerCase()} in ${place}, with a ${formatDegreeDelta(Number(high) - Number(low))} temperature spread to notice.`,
    cloud: `${place} is seeing ${meta.label.toLowerCase()}, so cloud cover and pressure patterns are worth watching.`,
    fog: `${place} has ${meta.label.toLowerCase()}, with humidity near ${formatNumber(current.relative_humidity_2m)}%.`,
    rain: `${place} has ${meta.label.toLowerCase()} in the forecast, and rain chances peak near ${formatNumber(maxPrecip)}%.`,
    snow: `${place} has ${meta.label.toLowerCase()} in the forecast, with temperatures ranging from ${formatTempText(low)} to ${formatTempText(high)}.`,
    storm: `${place} has ${meta.label.toLowerCase()} in the forecast, with gusts near ${formatNumber(current.wind_gusts_10m)} ${units.speed}.`
  };

  return `${groupNotes[group] || `Today's forecast for ${place} gives you a fresh weather pattern to read.`} ${word.term} helps explain one piece of that setup.`;
}

function buildDailyAdvice(current, daily, hours) {
  const currentGroup = weatherGroup(current.weather_code);
  const dailyGroup = weatherGroup(daily.weather_code[0]);
  const hourGroups = hours.map((hour) => weatherGroup(hour.code));
  const wetHours = hourGroups.some((group) => WET_WEATHER_GROUPS.has(group));
  const stormLikely = [currentGroup, dailyGroup, ...hourGroups].includes("storm");
  const snowLikely = [currentGroup, dailyGroup, ...hourGroups].includes("snow");
  const rainLikely = [currentGroup, dailyGroup, ...hourGroups].includes("rain") || stormLikely;
  const maxPrecip = Math.max(
    daily.precipitation_probability_max[0] || 0,
    ...hours.map((hour) => hour.precipitation || 0)
  );
  const currentPrecip = Number(current.precipitation || 0);
  const high = daily.temperature_2m_max[0];
  const low = daily.temperature_2m_min[0];
  const apparent = current.apparent_temperature ?? current.temperature_2m;
  const apparentF = toFahrenheit(apparent);
  const highF = toFahrenheit(high);
  const lowF = toFahrenheit(low);
  const windMph = toMph(current.wind_speed_10m) || 0;
  const uv = Number(daily.uv_index_max[0] || 0);
  const humidity = Number(current.relative_humidity_2m || 0);
  const sunrise = daily.sunrise[0];
  const sunset = daily.sunset[0];

  return {
    comfort: buildComfortAdvice({ highF, humidity, maxPrecip, uv, windMph }),
    dogPark: buildDogParkAdvice({
      highF,
      humidity,
      lowF,
      maxPrecip,
      rainLikely,
      snowLikely,
      stormLikely,
      sunrise,
      sunset,
      uv,
      windMph
    }),
    extra: buildExtraAdvice({ highF, lowF, maxPrecip, rainLikely, snowLikely, stormLikely, windMph }),
    outfit: buildOutfitAdvice({ apparentF, high, highF, low, lowF, snowLikely }),
    summary: `${summarizeUmbrella({ currentPrecip, maxPrecip, rainLikely, wetHours })} · ${formatTempText(low)}-${formatTempText(high)}`,
    umbrella: buildUmbrellaAdvice({ currentPrecip, maxPrecip, rainLikely, snowLikely, wetHours })
  };
}

function summarizeUmbrella({ currentPrecip, maxPrecip, rainLikely, wetHours }) {
  if (currentPrecip > 0 || maxPrecip >= 50 || rainLikely || wetHours) {
    return "Umbrella advised";
  }

  if (maxPrecip >= 25) {
    return "Umbrella optional";
  }

  return "No umbrella needed";
}

function buildUmbrellaAdvice({ currentPrecip, maxPrecip, rainLikely, snowLikely, wetHours }) {
  if (currentPrecip > 0 || maxPrecip >= 50 || rainLikely || wetHours) {
    return {
      reason: snowLikely
        ? `Wet weather is possible today, with precipitation chances up to ${formatNumber(maxPrecip)}%.`
        : `Rain chances reach ${formatNumber(maxPrecip)}% today, so it is worth carrying one.`,
      title: "Bring one"
    };
  }

  if (maxPrecip >= 25) {
    return {
      reason: `Precipitation chances peak near ${formatNumber(maxPrecip)}%, so a compact umbrella is optional.`,
      title: "Maybe"
    };
  }

  return {
    reason: `Only about ${formatNumber(maxPrecip)}% precipitation risk in the near forecast.`,
    title: "Skip it"
  };
}

function buildOutfitAdvice({ apparentF, high, highF, low, lowF, snowLikely }) {
  const range = `Today's range is ${formatTempText(low)} to ${formatTempText(high)}.`;

  if (snowLikely || apparentF <= 32 || lowF <= 28) {
    return {
      reason: `${range} Warm accessories and sturdy shoes make sense.`,
      title: "Heavy coat"
    };
  }

  if (apparentF <= 45 || lowF <= 40) {
    return {
      reason: `${range} Start with warm layers you can remove later.`,
      title: "Jacket layers"
    };
  }

  if (apparentF <= 60 || lowF <= 55) {
    return {
      reason: `${range} A light jacket or sweater should cover the cooler parts.`,
      title: "Light jacket"
    };
  }

  if (highF >= 85) {
    return {
      reason: `${range} Choose breathable fabric and keep water nearby.`,
      title: "Light clothes"
    };
  }

  if (highF >= 76) {
    return {
      reason: `${range} Short sleeves or light layers should feel comfortable.`,
      title: "Easy layers"
    };
  }

  return {
    reason: `${range} Regular layers should work well.`,
    title: "Everyday layers"
  };
}

function buildComfortAdvice({ highF, humidity, maxPrecip, uv, windMph }) {
  if (uv >= 6) {
    return {
      reason: `UV index peaks near ${formatNumber(uv, 1)}. Sunglasses and sunscreen are a good call.`,
      title: "Sun protection"
    };
  }

  if (windMph >= 20) {
    return {
      reason: `Winds are around ${formatNumber(windMph)} mph, so secure loose layers.`,
      title: "Windy"
    };
  }

  if (humidity >= 80 && highF >= 75) {
    return {
      reason: `Humidity is near ${formatNumber(humidity)}%, so breathable clothing will help.`,
      title: "Humid"
    };
  }

  if (maxPrecip >= 40) {
    return {
      reason: "Water-resistant shoes or a rain layer could keep the day easier.",
      title: "Stay dry"
    };
  }

  return {
    reason: "No major comfort issues stand out in today's forecast.",
    title: "Comfortable"
  };
}

function buildDogParkAdvice({ highF, humidity, lowF, maxPrecip, rainLikely, snowLikely, stormLikely, sunrise, sunset, uv, windMph }) {
  const daylight = `Sunrise ${formatHour(sunrise)}, sunset ${formatHour(sunset)}, humidity ${formatNumber(humidity)}%.`;

  if (stormLikely) {
    return {
      reason: `Skip the park if storms are nearby. ${daylight}`,
      title: "Skip today"
    };
  }

  if (highF >= 90 || (highF >= 85 && humidity >= 70)) {
    return {
      reason: `Too hot for hard play. Go near sunrise, keep it short, and bring water. ${daylight}`,
      title: "Early only"
    };
  }

  if (snowLikely || lowF <= 25) {
    return {
      reason: `Cold or snowy conditions may be rough on paws. Try a short walk instead. ${daylight}`,
      title: "Short walk"
    };
  }

  if (rainLikely || maxPrecip >= 50) {
    return {
      reason: `Likely wet or muddy, with rain chances near ${formatNumber(maxPrecip)}%. ${daylight}`,
      title: "Maybe later"
    };
  }

  if (windMph >= 25) {
    return {
      reason: `Wind around ${formatNumber(windMph)} mph could make the park uncomfortable. ${daylight}`,
      title: "Not ideal"
    };
  }

  if (uv >= 7 && highF >= 78) {
    return {
      reason: `Good weather, but avoid peak sun. Morning or evening is best. ${daylight}`,
      title: "Go off-peak"
    };
  }

  if (maxPrecip >= 25) {
    return {
      reason: `Looks usable, though there is a ${formatNumber(maxPrecip)}% shower chance. ${daylight}`,
      title: "Good window"
    };
  }

  return {
    reason: `Comfortable conditions for park time. ${daylight}`,
    title: "Good day"
  };
}

function buildExtraAdvice({ highF, lowF, maxPrecip, rainLikely, snowLikely, stormLikely, windMph }) {
  if (stormLikely) {
    return {
      reason: "Check alerts before heading out and be ready to move indoors.",
      title: "Storm risk"
    };
  }

  if (snowLikely) {
    return {
      reason: "Allow extra travel time and choose shoes with traction.",
      title: "Snow gear"
    };
  }

  if (rainLikely || maxPrecip >= 50) {
    return {
      reason: "A rain jacket or water-resistant outer layer is worth it.",
      title: "Rain layer"
    };
  }

  if (highF >= 90) {
    return {
      reason: "Plan for shade, water, and lighter activity during the hottest part of the day.",
      title: "Heat care"
    };
  }

  if (lowF <= 32) {
    return {
      reason: "Morning and evening may feel cold enough for gloves or a hat.",
      title: "Cold start"
    };
  }

  if (windMph >= 15) {
    return {
      reason: "A layer that blocks wind may feel better than a loose sweater.",
      title: "Wind layer"
    };
  }

  return {
    reason: "No big weather curveballs are showing for the day.",
    title: "Easy day"
  };
}

function renderNewsLoading(location) {
  elements.newsSummary.textContent = "Loading";
  elements.newsList.replaceChildren(createNewsCard({
    source: "NWS",
    title: `Checking alerts for ${locationLabel(location)}`,
    body: "Pulling current watches, warnings, and advisories from the National Weather Service."
  }));
}

function renderNewsError() {
  elements.newsSummary.textContent = "Unavailable";
  elements.newsList.replaceChildren(
    createNewsCard({
      source: "NWS",
      title: "Weather news is unavailable",
      body: "The forecast still works, but live alerts could not be loaded right now.",
      url: "https://www.weather.gov/"
    }),
    ...createFallbackNewsCards()
  );
}

function renderWeatherNews(location) {
  const alerts = state.news
    .map((feature) => feature.properties)
    .filter(Boolean)
    .slice(0, 3);

  if (!alerts.length) {
    elements.newsSummary.textContent = "No active alerts";
    elements.newsList.replaceChildren(
      createNewsCard({
        source: "NWS",
        title: `No active alerts for ${locationLabel(location)}`,
        body: "There are no current National Weather Service watches, warnings, or advisories for this location.",
        url: "https://www.weather.gov/alerts"
      }),
      ...createFallbackNewsCards().slice(0, 2)
    );
    return;
  }

  elements.newsSummary.textContent = `${alerts.length} active ${alerts.length === 1 ? "alert" : "alerts"}`;
  elements.newsList.replaceChildren(...alerts.map((alert) => createAlertCard(alert)));
}

function createAlertCard(alert) {
  const title = alert.headline || alert.event || "Weather alert";
  const area = alert.areaDesc ? ` Areas: ${alert.areaDesc}` : "";
  const instruction = alert.instruction || alert.description || "Review the latest guidance from the National Weather Service.";
  const body = `${instruction}${area}`.slice(0, 210);

  return createNewsCard({
    body: body.length >= 210 ? `${body}...` : body,
    className: "is-alert",
    source: `${alert.severity || "NWS"} alert`,
    time: alert.effective || alert.sent,
    title,
    url: alert["@id"] || alert.uri || "https://www.weather.gov/alerts"
  });
}

function createFallbackNewsCards() {
  return [
    createNewsCard({
      source: "Weather.gov",
      title: "Weather safety resources",
      body: "Preparedness guidance for severe storms, heat, flooding, winter weather, and more.",
      url: "https://www.weather.gov/safety/"
    }),
    createNewsCard({
      source: "SPC",
      title: "Severe weather outlooks",
      body: "National convective outlooks from the NOAA Storm Prediction Center.",
      url: "https://www.spc.noaa.gov/products/outlook/"
    }),
    createNewsCard({
      source: "NHC",
      title: "Tropical weather updates",
      body: "Hurricane and tropical storm updates from the National Hurricane Center.",
      url: "https://www.nhc.noaa.gov/"
    })
  ];
}

function createNewsCard(item) {
  const card = document.createElement("article");
  card.className = `news-card ${item.className || ""}`.trim();

  const safeBody = item.body || "Open the source for the latest weather information.";
  const meta = document.createElement(item.time ? "time" : "span");
  meta.textContent = item.time ? formatDateTime(item.time) : item.source || "Weather";
  if (item.time) {
    meta.dateTime = item.time;
  } else {
    meta.className = "news-source";
  }

  const title = document.createElement("h3");
  title.textContent = item.title || "Weather update";

  const body = document.createElement("p");
  body.textContent = safeBody;

  card.append(meta, title, body);

  if (item.url) {
    const link = document.createElement("a");
    link.href = item.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "Read update";
    card.append(link);
  }

  return card;
}

function drawWeatherScene(group = "clear", isDay = true, windSpeed = 0) {
  stopWeatherScene();
  sceneState.group = group;
  sceneState.isDay = isDay;
  sceneState.windMph = toMph(windSpeed) || 0;

  if (!setupSceneCanvas()) {
    return;
  }

  seedWeatherScene();
  drawWeatherSceneFrame();

  if (!catState.motionQuery.matches) {
    sceneState.frame = requestAnimationFrame(animateWeatherScene);
  }
}

function stopWeatherScene() {
  if (sceneState.frame) {
    cancelAnimationFrame(sceneState.frame);
    sceneState.frame = null;
  }

  sceneState.lastTime = 0;
}

function setupSceneCanvas() {
  const canvas = elements.sceneCanvas;
  const context = canvas.getContext("2d");
  const rect = canvas.getBoundingClientRect();
  const ratio = window.devicePixelRatio || 1;
  const width = Math.max(1, rect.width || canvas.clientWidth || 560);
  const height = Math.max(1, rect.height || canvas.clientHeight || 320);
  canvas.width = Math.max(1, Math.floor(width * ratio));
  canvas.height = Math.max(1, Math.floor(height * ratio));
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  sceneState.width = width;
  sceneState.height = height;

  return true;
}

function seedWeatherScene() {
  const { group, height, width } = sceneState;
  const wind = Math.min(sceneState.windMph, 40);
  sceneState.driftOffset = Math.random() * width;
  sceneState.lightning = group === "storm" && catState.motionQuery.matches ? 0.75 : 0;
  sceneState.particles = [];

  if (group === "rain" || group === "storm") {
    const count = Math.min(96, Math.max(42, Math.round(width / (group === "storm" ? 7 : 9))));
    sceneState.particles = Array.from({ length: count }, () => ({
      drift: -42 - wind * 3.4 - Math.random() * 38,
      length: 20 + Math.random() * 28,
      opacity: 0.38 + Math.random() * 0.38,
      speed: 420 + Math.random() * 360 + (group === "storm" ? 130 : 0),
      x: Math.random() * width,
      y: Math.random() * height
    }));
  }

  if (group === "snow") {
    const count = Math.min(90, Math.max(36, Math.round(width / 10)));
    sceneState.particles = Array.from({ length: count }, () => ({
      opacity: 0.56 + Math.random() * 0.34,
      phase: Math.random() * Math.PI * 2,
      size: 1.8 + Math.random() * 3.6,
      speed: 28 + Math.random() * 58,
      wobble: 1.4 + Math.random() * 2.4,
      x: Math.random() * width,
      y: Math.random() * height
    }));
  }

  if (group === "fog") {
    const count = 7;
    sceneState.particles = Array.from({ length: count }, (_, index) => ({
      opacity: 0.24 + Math.random() * 0.2,
      phase: Math.random() * Math.PI * 2,
      speed: 6 + Math.random() * 18 + wind * 0.3,
      thickness: 8 + Math.random() * 8,
      width: width * (0.74 + Math.random() * 0.32),
      x: Math.random() * width - width * 0.5,
      y: height * (0.34 + index * 0.075)
    }));
  }

  seedLeaves(width, height, group);
}

function seedLeaves(width, height, group) {
  const baseCount = Math.min(20, Math.max(9, Math.round(width / 58)));
  const conditionBonus = ["clear", "cloud", "fog"].includes(group) ? 5 : 2;
  const windBonus = Math.round(Math.min(sceneState.windMph, 30) / 6);
  const count = baseCount + conditionBonus + windBonus;
  sceneState.leaves = Array.from({ length: count }, () => {
    const leaf = {};
    resetLeaf(leaf, width, height, false);
    return leaf;
  });
}

function resetLeaf(leaf, width, height, startOffscreen = true) {
  const wind = Math.min(Math.max(sceneState.windMph, 5), 36);
  leaf.color = LEAF_COLORS[Math.floor(Math.random() * LEAF_COLORS.length)];
  leaf.phase = Math.random() * Math.PI * 2;
  leaf.rotation = Math.random() * Math.PI * 2;
  leaf.rotationSpeed = (Math.random() > 0.5 ? 1 : -1) * (1.4 + Math.random() * 3.2);
  leaf.size = 7 + Math.random() * 10;
  leaf.speedX = 28 + wind * 2.2 + Math.random() * 54;
  leaf.speedY = 8 + Math.random() * 24;
  leaf.wave = 1.8 + Math.random() * 2.8;
  leaf.x = startOffscreen ? -40 - Math.random() * width * 0.35 : Math.random() * width;
  leaf.y = startOffscreen ? Math.random() * height * 0.68 : Math.random() * height;
}

function animateWeatherScene(time = 0) {
  if (catState.motionQuery.matches) {
    return;
  }

  const elapsed = sceneState.lastTime ? Math.min((time - sceneState.lastTime) / 1000, 0.05) : 0;
  sceneState.lastTime = time;
  updateWeatherScene(elapsed);
  drawWeatherSceneFrame();
  sceneState.frame = requestAnimationFrame(animateWeatherScene);
}

function updateWeatherScene(elapsed) {
  const { group, height, width } = sceneState;
  const wind = Math.min(sceneState.windMph, 42);
  sceneState.driftOffset += elapsed * (10 + wind * 1.35);

  if (group === "rain" || group === "storm") {
    sceneState.particles.forEach((drop) => {
      drop.x += drop.drift * elapsed;
      drop.y += drop.speed * elapsed;

      if (drop.y > height + drop.length || drop.x < -80) {
        drop.x = Math.random() * (width + 120) + 40;
        drop.y = -drop.length - Math.random() * 80;
      }
    });
  }

  if (group === "snow") {
    sceneState.particles.forEach((flake) => {
      flake.phase += elapsed * flake.wobble;
      flake.x += (Math.sin(flake.phase) * 20 + wind * 1.15) * elapsed;
      flake.y += flake.speed * elapsed;

      if (flake.y > height + 10 || flake.x > width + 30) {
        flake.x = Math.random() * width - 20;
        flake.y = -10 - Math.random() * 60;
      }
    });
  }

  if (group === "fog") {
    sceneState.particles.forEach((strip) => {
      strip.x += strip.speed * elapsed;

      if (strip.x > width + strip.width) {
        strip.x = -strip.width;
      }
    });
  }

  if (group === "storm") {
    if (sceneState.lightning > 0) {
      sceneState.lightning = Math.max(0, sceneState.lightning - elapsed * 1.8);
    } else if (Math.random() < elapsed * 0.36) {
      sceneState.lightning = 0.95;
    }
  }

  sceneState.leaves.forEach((leaf) => {
    leaf.phase += elapsed * leaf.wave;
    leaf.rotation += leaf.rotationSpeed * elapsed;
    leaf.x += (leaf.speedX + Math.sin(leaf.phase) * 22) * elapsed;
    leaf.y += (leaf.speedY + Math.cos(leaf.phase * 0.72) * 12) * elapsed;

    if (leaf.x > width + 50 || leaf.y > height + 36) {
      resetLeaf(leaf, width, height);
    }
  });
}

function drawWeatherSceneFrame() {
  const canvas = elements.sceneCanvas;
  const context = canvas.getContext("2d");
  const { group, height, isDay, width } = sceneState;
  const stormy = group === "storm";
  const rainy = group === "rain";
  const sky = context.createLinearGradient(0, 0, width, height);
  sky.addColorStop(0, stormy ? "#5f8398" : rainy ? "#82b5c5" : isDay ? "#9dd8e8" : "#233d5d");
  sky.addColorStop(0.55, stormy ? "#8ba4ac" : rainy ? "#b9d8da" : isDay ? "#d7f0ed" : "#496d89");
  sky.addColorStop(1, stormy ? "#2c485d" : rainy ? "#d7cbb1" : isDay ? "#ffe2a7" : "#0f202f");
  context.fillStyle = sky;
  context.fillRect(0, 0, width, height);

  if (stormy && sceneState.lightning > 0) {
    context.fillStyle = `rgba(255, 247, 190, ${sceneState.lightning * 0.24})`;
    context.fillRect(0, 0, width, height);
  }

  if (isDay) {
    drawSun(context, width * 0.72, height * 0.28, Math.min(width, height) * 0.12);
  } else {
    drawMoon(context, width * 0.72, height * 0.28, Math.min(width, height) * 0.11);
  }

  const cloudDrift = (sceneState.driftOffset % (width * 0.32)) - width * 0.16;
  const cloudColor = stormy
    ? "rgba(69,82,91,0.7)"
    : rainy
      ? "rgba(232,240,244,0.8)"
      : isDay ? "rgba(255,255,255,0.9)" : "rgba(232,240,244,0.72)";
  drawCloud(context, width * 0.43 + cloudDrift * 0.16, height * 0.46, width * 0.34, cloudColor);
  drawCloud(context, width * 0.22 - cloudDrift * 0.22, height * 0.34, width * 0.22, "rgba(255,255,255,0.58)");

  if (stormy) {
    drawCloud(context, width * 0.7 + cloudDrift * 0.1, height * 0.38, width * 0.26, "rgba(58,68,76,0.58)");
  }

  if (group === "rain" || group === "storm") {
    drawRain(context, width, height, group === "storm");
  }

  if (group === "snow") {
    drawSnow(context, width, height);
  }

  if (group === "fog") {
    drawFog(context, width, height);
  }

  drawHorizon(context, width, height);
  drawLeaves(context, width, height);
}

function drawSun(context, x, y, radius) {
  const glow = context.createRadialGradient(x, y, radius * 0.3, x, y, radius * 2.2);
  glow.addColorStop(0, "rgba(255,255,255,0.95)");
  glow.addColorStop(0.32, "rgba(232,170,37,0.85)");
  glow.addColorStop(1, "rgba(232,170,37,0)");
  context.fillStyle = glow;
  context.beginPath();
  context.arc(x, y, radius * 2.2, 0, Math.PI * 2);
  context.fill();
  context.fillStyle = "#f7c84b";
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2);
  context.fill();
}

function drawMoon(context, x, y, radius) {
  context.fillStyle = "rgba(255,255,255,0.85)";
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2);
  context.fill();
  context.fillStyle = "#233d5d";
  context.beginPath();
  context.arc(x + radius * 0.35, y - radius * 0.14, radius * 0.9, 0, Math.PI * 2);
  context.fill();
}

function drawCloud(context, x, y, width, color) {
  const height = width * 0.28;
  context.fillStyle = color;
  context.beginPath();
  context.ellipse(x, y + height * 0.35, width * 0.42, height * 0.55, 0, 0, Math.PI * 2);
  context.ellipse(x - width * 0.22, y + height * 0.28, width * 0.26, height * 0.48, 0, 0, Math.PI * 2);
  context.ellipse(x + width * 0.22, y + height * 0.2, width * 0.28, height * 0.58, 0, 0, Math.PI * 2);
  context.ellipse(x + width * 0.02, y, width * 0.33, height * 0.72, 0, 0, Math.PI * 2);
  context.fill();
}

function drawRain(context, width, height, storm) {
  context.save();
  context.lineCap = "round";
  context.lineWidth = storm ? 2.2 : 1.8;
  sceneState.particles.forEach((drop) => {
    context.strokeStyle = `rgba(73,109,137,${drop.opacity})`;
    context.beginPath();
    context.moveTo(drop.x, drop.y);
    context.lineTo(drop.x + drop.drift * 0.07, drop.y + drop.length);
    context.stroke();
  });

  if (storm && sceneState.lightning > 0) {
    context.fillStyle = `rgba(245,206,75,${0.45 + sceneState.lightning * 0.45})`;
    context.beginPath();
    context.moveTo(width * 0.52, height * 0.48);
    context.lineTo(width * 0.45, height * 0.66);
    context.lineTo(width * 0.53, height * 0.63);
    context.lineTo(width * 0.47, height * 0.82);
    context.lineTo(width * 0.66, height * 0.56);
    context.lineTo(width * 0.57, height * 0.59);
    context.closePath();
    context.fill();
  }
  context.restore();
}

function drawSnow(context, width, height) {
  context.save();
  sceneState.particles.forEach((flake) => {
    context.fillStyle = `rgba(255,255,255,${flake.opacity})`;
    context.beginPath();
    context.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
    context.fill();
  });
  context.restore();
}

function drawFog(context, width, height) {
  context.save();
  context.lineCap = "round";
  sceneState.particles.forEach((strip) => {
    const y = strip.y + Math.sin(sceneState.driftOffset / 46 + strip.phase) * 10;
    context.strokeStyle = `rgba(255,255,255,${strip.opacity})`;
    context.lineWidth = strip.thickness;

    [strip.x, strip.x - strip.width - width * 0.1].forEach((x) => {
      context.beginPath();
      context.moveTo(x, y);
      context.bezierCurveTo(x + strip.width * 0.25, y - 22, x + strip.width * 0.58, y + 22, x + strip.width, y);
      context.stroke();
    });
  });
  context.restore();
}

function drawLeaves(context, width, height) {
  context.save();
  sceneState.leaves.forEach((leaf) => {
    context.save();
    context.translate(leaf.x, leaf.y);
    context.rotate(leaf.rotation);
    context.fillStyle = leaf.color;
    context.strokeStyle = "rgba(73,64,48,0.32)";
    context.lineWidth = 1;
    context.beginPath();
    context.ellipse(0, 0, leaf.size * 0.62, leaf.size * 0.25, 0, 0, Math.PI * 2);
    context.fill();
    context.beginPath();
    context.moveTo(-leaf.size * 0.44, 0);
    context.lineTo(leaf.size * 0.44, 0);
    context.stroke();
    context.restore();
  });
  context.restore();
}

function drawHorizon(context, width, height) {
  const ground = context.createLinearGradient(0, height * 0.72, 0, height);
  ground.addColorStop(0, "rgba(19,124,127,0.45)");
  ground.addColorStop(1, "rgba(12,87,89,0.9)");
  context.fillStyle = ground;
  context.beginPath();
  context.moveTo(0, height * 0.78);
  context.bezierCurveTo(width * 0.25, height * 0.7, width * 0.48, height * 0.86, width, height * 0.75);
  context.lineTo(width, height);
  context.lineTo(0, height);
  context.closePath();
  context.fill();
}

function drawTrendChart(hours) {
  const canvas = elements.trendCanvas;
  const context = canvas.getContext("2d");
  const rect = canvas.getBoundingClientRect();
  const ratio = window.devicePixelRatio || 1;
  canvas.width = Math.max(1, Math.floor(rect.width * ratio));
  canvas.height = Math.max(1, Math.floor(rect.height * ratio));
  context.setTransform(ratio, 0, 0, ratio, 0, 0);

  const width = rect.width;
  const height = rect.height;
  const padding = { bottom: 42, left: 46, right: 22, top: 28 };
  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;
  const temperatures = hours.map((hour) => hour.temperature);
  const high = Math.max(...temperatures);
  const low = Math.min(...temperatures);
  const spread = Math.max(high - low, 1);

  context.clearRect(0, 0, width, height);
  context.strokeStyle = "rgba(93,107,106,0.18)";
  context.lineWidth = 1;
  context.fillStyle = "#5d6b6a";
  context.font = "700 12px system-ui, sans-serif";

  for (let index = 0; index <= 3; index += 1) {
    const y = padding.top + (plotHeight / 3) * index;
    context.beginPath();
    context.moveTo(padding.left, y);
    context.lineTo(width - padding.right, y);
    context.stroke();
  }

  const points = hours.map((hour, index) => {
    const x = padding.left + (plotWidth / Math.max(hours.length - 1, 1)) * index;
    const y = padding.top + plotHeight - ((hour.temperature - low) / spread) * plotHeight;
    return { hour, x, y };
  });

  points.forEach(({ hour, x }, index) => {
    const barHeight = (Math.max(hour.precipitation, 2) / 100) * (plotHeight * 0.58);
    context.fillStyle = "rgba(73,109,137,0.28)";
    context.fillRect(x - 6, padding.top + plotHeight - barHeight, 12, barHeight);

    if (index % 2 === 0) {
      context.fillStyle = "#5d6b6a";
      context.fillText(formatHour(hour.time).replace(":00", ""), x - 16, height - 16);
    }
  });

  const line = context.createLinearGradient(padding.left, 0, width - padding.right, 0);
  line.addColorStop(0, "#3777b6");
  line.addColorStop(0.5, "#e8aa25");
  line.addColorStop(1, "#d86445");
  context.strokeStyle = line;
  context.lineWidth = 4;
  context.lineJoin = "round";
  context.lineCap = "round";
  context.beginPath();
  points.forEach((point, index) => {
    if (index === 0) {
      context.moveTo(point.x, point.y);
    } else {
      context.lineTo(point.x, point.y);
    }
  });
  context.stroke();

  points.forEach((point) => {
    context.fillStyle = "#ffffff";
    context.strokeStyle = "#137c7f";
    context.lineWidth = 3;
    context.beginPath();
    context.arc(point.x, point.y, 5, 0, Math.PI * 2);
    context.fill();
    context.stroke();
  });
}

function renderFavorites() {
  elements.clearFavoritesButton.disabled = state.favorites.length === 0;

  if (!state.favorites.length) {
    const empty = document.createElement("p");
    empty.className = "status-line";
    empty.textContent = "No saved locations.";
    elements.favoriteList.replaceChildren(empty);
    return;
  }

  const items = state.favorites.map((favorite) => {
    const wrapper = document.createElement("div");
    wrapper.className = "favorite-item";

    const select = document.createElement("button");
    select.className = "favorite-select";
    select.type = "button";
    select.textContent = locationLabel(favorite);
    select.addEventListener("click", () => loadWeather(favorite));

    const remove = document.createElement("button");
    remove.className = "favorite-remove";
    remove.type = "button";
    remove.setAttribute("aria-label", `Remove ${locationLabel(favorite)}`);
    remove.textContent = "x";
    remove.addEventListener("click", () => removeFavorite(favorite.id));

    wrapper.append(select, remove);
    return wrapper;
  });

  elements.favoriteList.replaceChildren(...items);
}

function saveFavorite() {
  if (!state.location) {
    return;
  }

  const exists = state.favorites.some((favorite) => favorite.id === state.location.id);
  if (!exists) {
    state.favorites = [state.location, ...state.favorites].slice(0, 8);
    writeJson(STORAGE_KEYS.favorites, state.favorites);
    renderFavorites();
  }

  setStatus(`${locationLabel(state.location)} saved.`);
}

function removeFavorite(id) {
  state.favorites = state.favorites.filter((favorite) => favorite.id !== id);
  writeJson(STORAGE_KEYS.favorites, state.favorites);
  renderFavorites();
}

async function handleSearch(event) {
  event.preventDefault();
  const query = elements.locationInput.value.trim();
  if (!query) {
    return;
  }

  setStatus("Searching...");
  try {
    if (state.locationMode === "zip" || isZipSearch(query)) {
      await loadWeather(await searchZipCode(query));
      return;
    }

    const matches = await searchLocation(query);
    await loadWeather(matches[0]);
  } catch (error) {
    console.error(error);
    setStatus(error.message || "Location search failed.", "error");
  }
}

function handleGeolocation() {
  if (!navigator.geolocation) {
    setStatus("Location services are not available in this browser.", "error");
    return;
  }

  setStatus("Getting your position...");
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;
      const reverse = await reverseGeocode(latitude, longitude);
      const location = reverse || normalizeLocation({
        latitude,
        longitude,
        name: "Current location"
      });
      loadWeather(location);
    },
    () => {
      setStatus("Location permission was not granted.", "error");
    },
    { enableHighAccuracy: false, maximumAge: 300000, timeout: 10000 }
  );
}

function createCatMarkup(palette, index) {
  const eyeTilt = index % 2 === 0 ? "M28 44h.1M68 44h.1" : "M27 43l4 3M69 43l-4 3";
  const mouth = index % 3 === 0 ? "M43 61c3 3 7 3 10 0" : "M43 59c2 5 8 5 10 0";
  const whiskerLift = index % 2 === 0 ? 0 : 3;

  return `
    <svg viewBox="0 0 96 96" aria-hidden="true">
      <path fill="${palette.base}" d="M14 13 34 26a37 37 0 0 1 28 0l20-13v30c3 5 5 11 5 18 0 18-17 31-39 31S9 79 9 61c0-7 2-13 5-18V13Z"/>
      <path fill="${palette.spot}" d="M30 28c10-7 26-7 36 0-6 5-12 7-18 7s-12-2-18-7Z" opacity=".72"/>
      <path fill="#ffd9d0" d="m20 27 10 7-11 7V27Zm56 0L66 34l11 7V27Z"/>
      <path fill="${palette.stripe}" d="M43 18h10l-5 13-5-13Zm-20 1 9 6-8 5-1-11Zm50 0-1 11-8-5 9-6Z" opacity=".6"/>
      <circle cx="30" cy="55" r="6" fill="${palette.blush}" opacity=".42"/>
      <circle cx="66" cy="55" r="6" fill="${palette.blush}" opacity=".42"/>
      <path d="${eyeTilt}" stroke="#172120" stroke-width="6" stroke-linecap="round"/>
      <path d="M48 50 42 57h12l-6-7Z" fill="#172120"/>
      <path d="${mouth}" fill="none" stroke="#172120" stroke-width="4" stroke-linecap="round"/>
      <path d="M18 ${57 - whiskerLift}h18M17 ${66 - whiskerLift}l19-4M78 ${57 - whiskerLift}H60M79 ${66 - whiskerLift}l-19-4" stroke="#172120" stroke-width="3" stroke-linecap="round" opacity=".72"/>
    </svg>
  `;
}

function preferredCatCount() {
  if (window.innerWidth < 680) {
    return 4;
  }

  if (window.innerWidth < 1100) {
    return 6;
  }

  return 8;
}

function createCats() {
  elements.catField.replaceChildren();
  catState.cats = [];

  const count = preferredCatCount();
  const width = window.innerWidth;
  const height = window.innerHeight;

  for (let index = 0; index < count; index += 1) {
    const node = document.createElement("div");
    const size = 48 + Math.round(Math.random() * 34);
    const palette = CAT_PALETTE[index % CAT_PALETTE.length];
    node.className = "cat-head";
    node.style.setProperty("--cat-size", `${size}px`);
    node.innerHTML = createCatMarkup(palette, index);
    elements.catField.append(node);

    catState.cats.push({
      node,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 36,
      size,
      vx: (Math.random() > 0.5 ? 1 : -1) * (34 + Math.random() * 50),
      vy: (Math.random() > 0.5 ? 1 : -1) * (28 + Math.random() * 46),
      x: Math.random() * Math.max(width - size, 1),
      y: Math.random() * Math.max(height - size, 1)
    });
  }
}

function animateCats(time = 0) {
  if (!state.catsEnabled || catState.motionQuery.matches) {
    return;
  }

  const elapsed = catState.lastTime ? Math.min((time - catState.lastTime) / 1000, 0.04) : 0;
  catState.lastTime = time;
  const width = window.innerWidth;
  const height = window.innerHeight;

  catState.cats.forEach((cat) => {
    cat.x += cat.vx * elapsed;
    cat.y += cat.vy * elapsed;
    cat.rotation += cat.rotationSpeed * elapsed;

    if (cat.x <= 0 || cat.x + cat.size >= width) {
      cat.vx *= -1;
      cat.x = Math.max(0, Math.min(cat.x, width - cat.size));
    }

    if (cat.y <= 0 || cat.y + cat.size >= height) {
      cat.vy *= -1;
      cat.y = Math.max(0, Math.min(cat.y, height - cat.size));
    }

    cat.node.style.transform = `translate3d(${cat.x}px, ${cat.y}px, 0) rotate(${cat.rotation}deg)`;
  });

  catState.frame = requestAnimationFrame(animateCats);
}

function stopCats() {
  if (catState.frame) {
    cancelAnimationFrame(catState.frame);
    catState.frame = null;
  }

  catState.lastTime = 0;
}

function updateCatToggle() {
  const active = state.catsEnabled && !catState.motionQuery.matches;
  document.body.classList.toggle("cats-paused", !active);
  elements.catToggle.setAttribute("aria-pressed", String(active));
  elements.catToggle.disabled = catState.motionQuery.matches;
}

function startCats() {
  stopCats();
  updateCatToggle();

  if (!state.catsEnabled || catState.motionQuery.matches) {
    return;
  }

  createCats();
  catState.frame = requestAnimationFrame(animateCats);
}

function toggleCats() {
  if (catState.motionQuery.matches) {
    setStatus("Cat heads are paused by your reduced motion setting.");
    updateCatToggle();
    return;
  }

  state.catsEnabled = !state.catsEnabled;
  localStorage.setItem(STORAGE_KEYS.cats, state.catsEnabled ? "on" : "off");
  startCats();
  setStatus(state.catsEnabled ? "Floating cat heads activated." : "Floating cat heads paused.");
}

function drawCurrentWeatherScene() {
  if (!state.weather) {
    drawWeatherScene("clear", true, 0);
    return;
  }

  const current = state.weather.current;
  const meta = WEATHER_CODES[current.weather_code] || { group: "cloud" };
  drawWeatherScene(meta.group, Boolean(current.is_day), current.wind_speed_10m);
}

function handleMotionPreferenceChange() {
  startCats();
  drawCurrentWeatherScene();
}

function updateLocationMode() {
  const zipMode = state.locationMode === "zip";
  elements.locationInput.placeholder = zipMode ? "Enter ZIP code" : "City, town, or ZIP";
  elements.locationInput.inputMode = zipMode ? "numeric" : "search";
  elements.locationInput.autocomplete = zipMode ? "postal-code" : "address-level2";
  if (zipMode) {
    elements.locationInput.pattern = "\\d{5}(-\\d{4})?";
  } else {
    elements.locationInput.removeAttribute("pattern");
  }
  elements.locationInput.setAttribute(
    "aria-label",
    zipMode ? "ZIP code" : "City, town, or ZIP"
  );
}

function bindEvents() {
  elements.catToggle.addEventListener("click", toggleCats);
  elements.searchForm.addEventListener("submit", handleSearch);
  elements.locationButton.addEventListener("click", handleGeolocation);
  elements.saveFavoriteButton.addEventListener("click", saveFavorite);
  elements.clearFavoritesButton.addEventListener("click", () => {
    state.favorites = [];
    writeJson(STORAGE_KEYS.favorites, state.favorites);
    renderFavorites();
    setStatus("Saved locations cleared.");
  });

  elements.unitInputs.forEach((input) => {
    input.checked = input.value === state.units;
    input.addEventListener("change", () => {
      state.units = input.value;
      localStorage.setItem(STORAGE_KEYS.units, state.units);
      if (state.location) {
        loadWeather(state.location);
      }
    });
  });

  elements.locationModeInputs.forEach((input) => {
    input.checked = input.value === state.locationMode;
    input.addEventListener("change", () => {
      state.locationMode = input.value;
      localStorage.setItem(STORAGE_KEYS.locationMode, state.locationMode);
      updateLocationMode();
    });
  });

  window.addEventListener("resize", () => {
    if (state.catsEnabled && !catState.motionQuery.matches) {
      createCats();
    }

    drawCurrentWeatherScene();

    if (state.weather) {
      drawTrendChart(getUpcomingHours(state.weather, 12));
    }
  });

  catState.motionQuery.addEventListener("change", handleMotionPreferenceChange);
}

async function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) {
    return;
  }

  try {
    await navigator.serviceWorker.register("sw.js");
  } catch (error) {
    console.info("Service worker registration skipped.", error);
  }
}

function init() {
  bindEvents();
  updateLocationMode();
  renderFavorites();
  drawWeatherScene("clear", true, 0);
  startCats();
  registerServiceWorker();

  if (state.lastLocation) {
    loadWeather(state.lastLocation);
  } else {
    loadWeather(normalizeLocation({
      admin1: "NY",
      country_code: "US",
      latitude: 40.7128,
      longitude: -74.006,
      name: "New York"
    }));
  }
}

init();
