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

// SEARCH BOX

function displayUserCityInfo(response) {
    console.log(response.data);
    // City name
    let cityElement = document.querySelector("h1");
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
}

function handleClick(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    let userCityName = cityInputElement.value;
    let apiKey = "8c362dd932bee69aa7eece7fea98811a";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userCityName}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(displayUserCityInfo);
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
