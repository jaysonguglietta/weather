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
  units: "weatherboard.units",
  favorites: "weatherboard.favorites",
  lastLocation: "weatherboard.lastLocation"
};

const elements = {
  clearFavoritesButton: document.querySelector("#clearFavoritesButton"),
  cloudCover: document.querySelector("#cloudCover"),
  currentCondition: document.querySelector("#currentCondition"),
  currentHeading: document.querySelector("#currentHeading"),
  currentTemp: document.querySelector("#currentTemp"),
  dailyList: document.querySelector("#dailyList"),
  dailySummary: document.querySelector("#dailySummary"),
  favoriteList: document.querySelector("#favoriteList"),
  feelsLike: document.querySelector("#feelsLike"),
  gusts: document.querySelector("#gusts"),
  hourlyList: document.querySelector("#hourlyList"),
  hourlySummary: document.querySelector("#hourlySummary"),
  humidity: document.querySelector("#humidity"),
  locationButton: document.querySelector("#locationButton"),
  locationInput: document.querySelector("#locationInput"),
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
  unitInputs: document.querySelectorAll("input[name='units']"),
  updatedAt: document.querySelector("#updatedAt"),
  uvIndex: document.querySelector("#uvIndex"),
  wind: document.querySelector("#wind")
};

const state = {
  favorites: readJson(STORAGE_KEYS.favorites, []),
  lastLocation: readJson(STORAGE_KEYS.lastLocation, null),
  location: null,
  units: localStorage.getItem(STORAGE_KEYS.units) || "imperial",
  weather: null
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

  return {
    id: `${name}-${admin}-${country}-${latitude.toFixed(3)}-${longitude.toFixed(3)}`,
    name,
    admin,
    country,
    latitude,
    longitude
  };
}

function locationLabel(location) {
  if (!location) {
    return "Choose a location";
  }

  const place = [location.name, location.admin].filter(Boolean).join(", ");
  return [place, location.country].filter(Boolean).join(" ");
}

function formatTemp(value) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) {
    return "--";
  }

  return `${Math.round(value)}&deg;${unitConfig().temperature}`;
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

async function loadWeather(location) {
  state.location = location;
  setStatus(`Loading ${locationLabel(location)}...`);
  elements.saveFavoriteButton.disabled = true;

  try {
    const weather = await fetchForecast(location);
    state.weather = weather;
    state.lastLocation = location;
    writeJson(STORAGE_KEYS.lastLocation, location);
    renderWeather();
    setStatus(`Showing ${locationLabel(location)}.`);
    elements.saveFavoriteButton.disabled = false;
  } catch (error) {
    console.error(error);
    setStatus("Forecast service is unavailable right now.", "error");
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
  renderHourly(hours);
  renderDaily(weather.daily);
  drawWeatherScene(codeMeta.group, Boolean(current.is_day));
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

function drawWeatherScene(group = "clear", isDay = true) {
  const canvas = elements.sceneCanvas;
  const context = canvas.getContext("2d");
  const rect = canvas.getBoundingClientRect();
  const ratio = window.devicePixelRatio || 1;
  canvas.width = Math.max(1, Math.floor(rect.width * ratio));
  canvas.height = Math.max(1, Math.floor(rect.height * ratio));
  context.setTransform(ratio, 0, 0, ratio, 0, 0);

  const width = rect.width;
  const height = rect.height;
  const sky = context.createLinearGradient(0, 0, width, height);
  sky.addColorStop(0, isDay ? "#9dd8e8" : "#233d5d");
  sky.addColorStop(0.55, isDay ? "#d7f0ed" : "#496d89");
  sky.addColorStop(1, isDay ? "#ffe2a7" : "#0f202f");
  context.fillStyle = sky;
  context.fillRect(0, 0, width, height);

  if (isDay) {
    drawSun(context, width * 0.72, height * 0.28, Math.min(width, height) * 0.12);
  } else {
    drawMoon(context, width * 0.72, height * 0.28, Math.min(width, height) * 0.11);
  }

  drawCloud(context, width * 0.43, height * 0.46, width * 0.34, isDay ? "rgba(255,255,255,0.9)" : "rgba(232,240,244,0.72)");
  drawCloud(context, width * 0.22, height * 0.34, width * 0.22, "rgba(255,255,255,0.58)");

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
  context.strokeStyle = "rgba(73,109,137,0.72)";
  context.lineWidth = 2;
  for (let index = 0; index < 34; index += 1) {
    const x = ((index * 53) % width) + width * 0.02;
    const y = height * 0.48 + ((index * 29) % (height * 0.36));
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x - 12, y + 28);
    context.stroke();
  }

  if (storm) {
    context.fillStyle = "#f5ce4b";
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
}

function drawSnow(context, width, height) {
  context.fillStyle = "rgba(255,255,255,0.9)";
  for (let index = 0; index < 38; index += 1) {
    const x = ((index * 47) % width) + width * 0.02;
    const y = height * 0.46 + ((index * 31) % (height * 0.42));
    context.beginPath();
    context.arc(x, y, 2 + (index % 3), 0, Math.PI * 2);
    context.fill();
  }
}

function drawFog(context, width, height) {
  context.strokeStyle = "rgba(255,255,255,0.72)";
  context.lineWidth = 9;
  context.lineCap = "round";
  for (let index = 0; index < 5; index += 1) {
    const y = height * (0.42 + index * 0.09);
    context.beginPath();
    context.moveTo(width * 0.12, y);
    context.bezierCurveTo(width * 0.32, y - 18, width * 0.52, y + 18, width * 0.88, y);
    context.stroke();
  }
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

function bindEvents() {
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

  window.addEventListener("resize", () => {
    if (!state.weather) {
      drawWeatherScene("clear", true);
      return;
    }

    const current = state.weather.current;
    const meta = WEATHER_CODES[current.weather_code] || { group: "cloud" };
    drawWeatherScene(meta.group, Boolean(current.is_day));
    drawTrendChart(getUpcomingHours(state.weather, 12));
  });
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
  renderFavorites();
  drawWeatherScene("clear", true);
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
