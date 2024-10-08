function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");

  let apiKey = "f9b9501odb4d5cd3642t33644963aae9";
  let unit = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${searchInputElement.value}&key=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(showTemperature);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);

function showTemperature(response) {
  let weatherData = response.data;
  let currentTemperature = Math.round(weatherData.temperature.current);
  let currentTemperatureElement = document.querySelector(
    ".current-temperature-value"
  );

  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = weatherData.city;
  currentTemperatureElement.innerHTML = currentTemperature;
}
