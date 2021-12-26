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
