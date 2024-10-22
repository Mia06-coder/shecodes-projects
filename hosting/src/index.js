// Show current date and time
function displayCurrentDateTime() {
  let currentDateElement = document.querySelector("#current-date");
  currentDateElement.innerHTML = formatDate(new Date());
}

// Format date into readable string
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let dayIndex = date.getDay();

  // Add leading zero for single-digit hours/minutes
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[dayIndex];
  return `${formattedDay} ${hours}:${minutes}`;
}

// Update DOM with current weather data only on successful fetch
function updateCurrentWeather(weatherData) {
  document.querySelector("#current-city").innerHTML = weatherData.city;
  document.querySelector(".current-temperature-value").innerHTML = Math.round(
    weatherData.temperature.current
  );
  document.querySelector(".weather-condition").innerHTML =
    weatherData.condition.description;
  document.querySelector(".humidity").innerHTML = Math.round(
    weatherData.temperature.humidity
  );
  document.querySelector(".wind-speed").innerHTML = Math.round(
    weatherData.wind.speed
  );
  document.querySelector(
    ".current-temperature-icon"
  ).innerHTML = `<img src="${weatherData.condition.icon_url}" alt="Weather icon">`;
}

// Search weather data by city
function search(event) {
  event.preventDefault();

  let searchInputElement = document.querySelector("#search-input");
  let apiKey = "f9b9501odb4d5cd3642t33644963aae9";
  let unit = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${searchInputElement.value}&key=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then((response) => {
    updateCurrentWeather(response.data);
  });
}

// Display current date and time on page load
displayCurrentDateTime();

// Display default weather details on page load
function loadDefaultWeather() {
  const defaultCity = "Toronto";
  const apiKey = "f9b9501odb4d5cd3642t33644963aae9";
  const unit = "metric";
  const currentWeatherUrl = `https://api.shecodes.io/weather/v1/current?query=${defaultCity}&key=${apiKey}&units=${unit}`;

  axios.get(currentWeatherUrl).then((response) => {
    updateCurrentWeather(response.data); // Update UI on successful fetch
  });
}

// Event listener for search form submission
document.querySelector("#search-form").addEventListener("submit", search);

// Call this function when the page loads
document.addEventListener("DOMContentLoaded", loadDefaultWeather);
