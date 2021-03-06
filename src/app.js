let apiKey = "8c362dd932bee69aa7eece7fea98811a";
let currentUnit = "C";

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
let tab2 = document.querySelector("#tab-2");

// TABS INTERACTIVE ACTIVATION

function handleTempUserLocation(position) {
    let apiUrl;
    if (currentUnit === "C") {
        apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
    } else {
        apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
    }
    axios.get(apiUrl).then(displayUserCityInfo);
}

function activateTab2(event) {
    event.preventDefault();

    // add active to tab 2
    let tab2Element = document.querySelector("#tab-2");
    tab2Element.classList.add("active");

    // alert slow API request
    alert(
        "Working on getting the weather for your location. It may take a while."
    );

    // display weather for the current location
    navigator.geolocation.getCurrentPosition(handleTempUserLocation);
}

tab2.addEventListener("click", activateTab2);

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

    if (currentUnit === "C") {
        temperatureElement.innerHTML = `${Math.round(
            response.data.main.temp
        )}??C`;
    } else {
        temperatureElement.innerHTML = `${Math.round(
            response.data.main.temp
        )}F`;
    }

    // Wind
    let windElement = document.querySelector("#wind");
    windElement.innerHTML = ` Wind: ${response.data.wind.speed}km/h `;

    // Humidity
    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = ` Humidity: ${response.data.main.humidity}% `;

    // MAX
    let maxTemperatureElement = document.querySelector("#maxTemperature");

    if (currentUnit === "C") {
        maxTemperatureElement.innerHTML = ` ${Math.round(
            response.data.main.temp_max
        )}?? max `;
    } else {
        maxTemperatureElement.innerHTML = ` ${Math.round(
            response.data.main.temp_max
        )}F max `;
    }

    // MIN
    let minTemperatureElement = document.querySelector("#minTemperature");

    if (currentUnit === "C") {
        minTemperatureElement.innerHTML = ` ${Math.round(
            response.data.main.temp_min
        )}?? min `;
    } else {
        minTemperatureElement.innerHTML = ` ${Math.round(
            response.data.main.temp_min
        )}F min `;
    }

    // For forecast
    getForecast(response.data.coord);
}

function search(city) {
    let apiUrl;
    if (currentUnit === "C") {
        apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    } else {
        apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    }
    axios.get(apiUrl).then(displayUserCityInfo);
}

function handleClick(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    let userCityName = cityInputElement.value;
    search(userCityName);

    // Remove active from tab 2
    let tab2Element = document.querySelector("#tab-2");
    tab2Element.classList.remove("active");
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

    let unitSign;
    if (currentUnit === "C") {
        unitSign = "??";
    } else {
        unitSign = "F";
    }

    forecast.forEach(function (forecastDay, index) {
        if (index > 0 && index < 6) {
            forecastHTML =
                forecastHTML +
                `<div class="col"">
                        <div class="card text-center .bg-white" style="width: 5.5rem;">
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
                                      ${Math.round(
                                          forecastDay.temp.max
                                      )}${unitSign}
                                   </span>
                                   <br/>
                                   <span
                                       class="weather-forecast-temperature-min"
                                   >
                                       ${Math.round(
                                           forecastDay.temp.min
                                       )}${unitSign}
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
    let apiUrl;
    if (currentUnit === "C") {
        apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    } else {
        apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
    }
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

function handleSwitch(event) {
    if (currentUnit === "C") {
        // Main temperature F
        let temperatureElement = document.querySelector("#main-temperature");
        let celsiusTemperature = temperatureElement.innerHTML.replace("??C", "");
        temperatureElement.innerHTML = `${Math.round(
            convertCelsiusToFahrenheit(celsiusTemperature)
        )}F`;

        // Max and Min temperature
        let maxTemperatureElement = document.querySelector("#maxTemperature");
        let maxCelsiusTemperature = maxTemperatureElement.innerHTML.replace(
            "?? max",
            ""
        );
        maxTemperatureElement.innerHTML = `${Math.round(
            convertCelsiusToFahrenheit(maxCelsiusTemperature)
        )}F max`;

        let minTemperatureElement = document.querySelector("#minTemperature");
        let minCelsiusTemperature = minTemperatureElement.innerHTML.replace(
            "?? min",
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
                .replace("??", "");
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
                .replace("??", "");
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
        )}??C`;

        // Max and Min temperature
        let maxTemperatureElement = document.querySelector("#maxTemperature");
        let maxfahrenheitTemperature = maxTemperatureElement.innerHTML.replace(
            "F max",
            ""
        );
        maxTemperatureElement.innerHTML = `${Math.round(
            convertFahrenheitToCelsius(maxfahrenheitTemperature)
        )}?? max`;

        let minTemperatureElement = document.querySelector("#minTemperature");
        let minfahrenheitTemperature = minTemperatureElement.innerHTML.replace(
            "F min",
            ""
        );
        minTemperatureElement.innerHTML = `${Math.round(
            convertFahrenheitToCelsius(minfahrenheitTemperature)
        )}?? min`;

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
            )}??`;
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
            )}??`;
        });
        // Update units
        currentUnit = "C";
    }
}

let unitsToggle = document.querySelector("#units-toggle");
unitsToggle.addEventListener("click", handleSwitch);
