let apiKey = "8c362dd932bee69aa7eece7fea98811a";

function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    if (minutes < 10) {
        minutes = `0${minutes}`;
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
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
}

// JS TAB1

let now = new Date();

let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];
let day = days[now.getDay()];

let date = now.getDate();
let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
let month = months[now.getMonth()];

let tab1 = document.querySelector("#tab-1");
tab1.innerHTML = `${day}, ${date} ${month}`;

// JS TAB2
let tomorrow = new Date();
tomorrow.setDate(now.getDate() + 1);
let dayTomorrow = days[tomorrow.getDay()];
let dateTomorrow = tomorrow.getDate();
let monthTomorrow = months[tomorrow.getMonth()];

let tab2 = document.querySelector("#tab-2");
tab2.innerHTML = `${dayTomorrow}, ${dateTomorrow} ${monthTomorrow}`;

// TABS INTERACTIVE ACTIVATION
function alternateToTab2(event) {
    event.preventDefault();
    // remove active from tab 1
    let tab1Element = document.querySelector("#tab-1");
    tab1Element.classList.remove("active");
    // add active to tab 2
    let tab2Element = document.querySelector("#tab-2");
    tab2Element.classList.add("active");
}

function alternateToTab1(event) {
    event.preventDefault();
    // remove active from tab 1
    let tab2Element = document.querySelector("#tab-2");
    tab2Element.classList.remove("active");
    // add active to tab 2
    let tab1Element = document.querySelector("#tab-1");
    tab1Element.classList.add("active");
}

tab1.addEventListener("click", alternateToTab1);
tab2.addEventListener("click", alternateToTab2);

// SEARCH BOX

function displayUserCityInfo(response) {
    // City name
    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = response.data.name;

    // Last updated
    let dateElement = document.querySelector("#date");
    dateElement.innerHTML = formatDate(response.data.dt * 1000);

    // Weather description
    let descriptionElement = document.querySelector("#description");
    descriptionElement.innerHTML = response.data.weather[0].description;

    // Icon
    let iconElement = document.querySelector("#main-icon");
    iconElement.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    iconElement.setAttribute("alt", response.data.weather[0].description);

    // Main temp
    let temperatureElement = document.querySelector("#main-temperature");
    temperatureElement.innerHTML = `${Math.round(response.data.main.temp)}ºC`;

    // Wind
    let windElement = document.querySelector("#wind");
    windElement.innerHTML = ` Wind: ${response.data.wind.speed}km/h `;

    // Humidity
    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = ` Humidity: ${response.data.main.humidity}% `;

    // MAX
    let maxTemperatureElement = document.querySelector("#maxTemperature");
    maxTemperatureElement.innerHTML = ` ${Math.round(
        response.data.main.temp_max
    )}º max `;

    // MIN
    let minTemperatureElement = document.querySelector("#minTemperature");
    minTemperatureElement.innerHTML = ` ${Math.round(
        response.data.main.temp_min
    )}º min `;

    // For forecast
    getForecast(response.data.coord);
}

function search(city) {
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayUserCityInfo);
}

function handleClick(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    let userCityName = cityInputElement.value;
    search(userCityName);
}

let searchBox = document.querySelector("#city-input");
searchBox.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.querySelector("#search-city-btn").click();
    }
});

let searchBoxBtn = document.querySelector("#search-city-btn");
searchBoxBtn.addEventListener("click", handleClick);

search("Lisbon");

//Forecast
function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[day];
}

function displayForecast(response) {
    let forecast = response.data.daily;
    let forecastElement = document.querySelector("#forecast");
    let forecastHTML = `<div class="row mx-0">`;

    forecast.forEach(function (forecastDay, index) {
        if (index > 0 && index < 6) {
            forecastHTML =
                forecastHTML +
                `<div class="col"">
                        <div class="card text-center bg-light mb-3" style="width: 5.5rem;">
                            <div class="card-body">
                               <div class="weather-forecast-date">${formatDay(
                                   forecastDay.dt
                               )}</div>
                               <img src="http://openweathermap.org/img/wn/${
                                   forecastDay.weather[0].icon
                               }@2x.png" alt="img" width="42" />
                               <div class="weather-forecast-temperature">
                                   <span
                                       class="weather-forecast-temperature-max"
                                   >
                                      ${Math.round(forecastDay.temp.max)}º
                                   </span>
                                   <br/>
                                   <span
                                       class="weather-forecast-temperature-min"
                                   >
                                       ${Math.round(forecastDay.temp.min)}º
                                   </span>
                                      </div>
                           </div>
                               </div>
                           </div>`;
        }
    });

    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
}

// C to F
function convertCelsiusToFahrenheit(celsiusTemperature) {
    let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
    return fahrenheitTemperature;
}

// F to C
function convertFahrenheitToCelsius(fahrenheitTemperature) {
    let celsiusTemperature = ((fahrenheitTemperature - 32) * 5) / 9;
    return celsiusTemperature;
}

let currentUnit = "C";
function handleSwitch(event) {
    if (currentUnit === "C") {
        // Main temperature F
        let temperatureElement = document.querySelector("#main-temperature");
        let celsiusTemperature = temperatureElement.innerHTML.replace("ºC", "");
        temperatureElement.innerHTML = `${Math.round(
            convertCelsiusToFahrenheit(celsiusTemperature)
        )}F`;

        // Max and Min temperature
        let maxTemperatureElement = document.querySelector("#maxTemperature");
        let maxCelsiusTemperature = maxTemperatureElement.innerHTML.replace(
            "º max",
            ""
        );
        maxTemperatureElement.innerHTML = `${Math.round(
            convertCelsiusToFahrenheit(maxCelsiusTemperature)
        )}F max`;

        let minTemperatureElement = document.querySelector("#minTemperature");
        let minCelsiusTemperature = minTemperatureElement.innerHTML.replace(
            "º min",
            ""
        );
        minTemperatureElement.innerHTML = `${Math.round(
            convertCelsiusToFahrenheit(minCelsiusTemperature)
        )}F min`;

        // Max temperature Forecast
        let maxTemperatureElements = document.querySelectorAll(
            ".weather-forecast-temperature-max"
        );
        maxTemperatureElements.forEach(function (element) {
            let maxCelsiusTemperature = element.innerHTML
                .trim()
                .replace("º", "");
            element.innerHTML = `${Math.round(
                convertCelsiusToFahrenheit(maxCelsiusTemperature)
            )}F`;
        });

        // Min temperature Forecast
        let minTemperatureElements = document.querySelectorAll(
            ".weather-forecast-temperature-min"
        );
        minTemperatureElements.forEach(function (element) {
            let minCelsiusTemperature = element.innerHTML
                .trim()
                .replace("º", "");
            element.innerHTML = `${Math.round(
                convertCelsiusToFahrenheit(minCelsiusTemperature)
            )}F`;
        });

        // Update units
        currentUnit = "F";
    } else {
        // Conversions to Celsius
        // Main temperature F
        let temperatureElement = document.querySelector("#main-temperature");
        let fahrenheitTemperature = temperatureElement.innerHTML.replace(
            "F",
            ""
        );
        temperatureElement.innerHTML = `${Math.round(
            convertFahrenheitToCelsius(fahrenheitTemperature)
        )}ºC`;

        // Max and Min temperature
        let maxTemperatureElement = document.querySelector("#maxTemperature");
        let maxfahrenheitTemperature = maxTemperatureElement.innerHTML.replace(
            "F max",
            ""
        );
        maxTemperatureElement.innerHTML = `${Math.round(
            convertFahrenheitToCelsius(maxfahrenheitTemperature)
        )}º max`;

        let minTemperatureElement = document.querySelector("#minTemperature");
        let minfahrenheitTemperature = minTemperatureElement.innerHTML.replace(
            "F min",
            ""
        );
        minTemperatureElement.innerHTML = `${Math.round(
            convertFahrenheitToCelsius(minfahrenheitTemperature)
        )}º min`;

        // Max temperature Forecast
        let maxTemperatureElements = document.querySelectorAll(
            ".weather-forecast-temperature-max"
        );
        maxTemperatureElements.forEach(function (element) {
            let maxFahrenheitTemperature = element.innerHTML
                .trim()
                .replace("F", "");
            element.innerHTML = `${Math.round(
                convertFahrenheitToCelsius(maxFahrenheitTemperature)
            )}º`;
        });

        // Min temperature Forecast
        let minTemperatureElements = document.querySelectorAll(
            ".weather-forecast-temperature-min"
        );
        minTemperatureElements.forEach(function (element) {
            let minFahrenheitTemperature = element.innerHTML
                .trim()
                .replace("F", "");
            element.innerHTML = `${Math.round(
                convertFahrenheitToCelsius(minFahrenheitTemperature)
            )}º`;
        });
        // Update units
        currentUnit = "C";
    }
}

let unitsToggle = document.querySelector("#units-toggle");
unitsToggle.addEventListener("click", handleSwitch);
