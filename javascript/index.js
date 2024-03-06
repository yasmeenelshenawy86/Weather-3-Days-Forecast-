"use strict";
// Declare Variable//
const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
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
const citySearch = document.getElementById("citySearch");
const cityData = document.getElementById("cityData");

let data = [];
let spreadArr;
getForecast();

// Get Data Function
async function getForecast(city = "cairo") {
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=d32b34b89d4d4310af822033240101&q=${city}&days=3`
  );
  if (response.ok == true) {
    const finalResponse = await response.json();
    data = finalResponse;
    spreadArr = data.forecast.forecastday;
    for (let i = 0; i < spreadArr.length; i++) {
    }
    displayForecast();
  }
}

// Display Data Function
function displayForecast() {
  let col_1 = `
    <div class="col-md-12 col-lg-6">
      <div class="card text-white mt-5">
        <div class="px-1 card-header mx-auto fs-5">
          <span class="me-5">${
            weekday[new Date(data.current.last_updated).getDay()]
          }</span>
          <span>${[new Date(data.current.last_updated).getDate()]}</span>
          <span>${months[new Date(data.current.last_updated).getMonth()]}</span>
        </div>
        <div class="card-body px-4 d-flex justify-content-between align-items-center">
          
          <div>
          <p><span class="pe-1">${data.location.name}</span>,<span>${
            data.location.country
          }</span></p>
          <h1 class"head_c">${Math.round(data.current.temp_c)}<sup>o</sup>C</h1>
          <h6>${data.current.condition.text}</h6>
          </div>
          <div class="con-icon text-center">
          <img src="${data.current.condition.icon}" class="text-center">
          </div>
          <div class=" d-flex flex-column">
          <span class="pb-1"><i class="fa-regular fa-sun text-warning pe-1"></i>  ${
            spreadArr[0].astro.sunrise
          }</span>
          <span class="pb-1 "><i class="fa-solid fa-moon pe-1"></i>  ${
            spreadArr[0].astro.sunset
          }</span>
          <span class="pb-1"><i class="fa-solid fa-cloud pe-1"></i> ${
            data.current.cloud
          } % </span>
          <span class="pb-1"><i class="fa-solid fa-wind pe-1"></i> ${Math.round(
            data.current.wind_kph
          )} KM/H</span>
          <span class="pb-1"><i class="fa-regular fa-compass pe-1"></i> ${
            data.current.wind_dir
          }</span>
          </div>
        </div>
      </div>
    </div>
  `;
  let cols_2 = `
  <div class="col-sm-12 col-md-12 col-lg-3">
    <div class="card text-white mt-5">
      <div class="card-header text-center fs-6">
      <span class="">${weekday[new Date(spreadArr[1].date).getDay()]}</span>
      <span class="">${[new Date(spreadArr[1].date).getDate()]}</span>
      <span class="">${months[new Date(spreadArr[1].date).getMonth()]}</span>
      </div>
      <div class="card-body text-center">
        <h5 class="py-4">H : ${Math.round(
          spreadArr[1].day.maxtemp_c
        )}<sup>o</sup>C</h5>
        <h5>L : ${Math.round(spreadArr[1].day.mintemp_c)}<sup>o</sup>C</h5>
        <img src="${spreadArr[1].day.condition.icon}">
      </div>
    </div>
  </div>
  `;
  let cols_3 = `
  <div class="col-sm-12 col-md-12 col-lg-3">
    <div class="card text-white mt-5">
      <div class="card-header text-center fs-6">
        <span class="">${weekday[new Date(spreadArr[2].date).getDay()]}</span>
        <span class="">${[new Date(spreadArr[2].date).getDate()]}</span>
        <span class="">${months[new Date(spreadArr[2].date).getMonth()]}</span>
      </div>
      <div class="card-body text-center">
        <h5 class="py-4">H : ${Math.round(
          spreadArr[2].day.maxtemp_c
        )}<sup>o</sup>C</h5>
        <h5>L : ${Math.round(spreadArr[2].day.mintemp_c)}<sup>o</sup>C</h5>
        <img src="${spreadArr[1].day.condition.icon}">
      </div>
    </div>
  </div>
  `;
  document.getElementById("rowData").innerHTML = col_1 + cols_2 + cols_3;
}

// Function to get weather forecast for current location using geolocation
function getForecastForCurrentLocation() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      // Success callback
      function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const city = `${latitude},${longitude}`;
        getForecast(city);
      },
      // Error callback
      function (error) {
        console.error("Error getting geolocation:", error.message);
      }
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
}

// Call the function to get weather forecast for current location when the page loads
getForecastForCurrentLocation();

//  Search City Name Event //
citySearch.addEventListener("keyup", function () {
  getForecast(citySearch.value);
});