//Global Variables
const API_TOKEN = "5c78ecc5505062a812390325cef1bdfc"
let city = "London"

let searchInput = $("#search")
let searchButton = $("#search-button")
let citySpan = $("#city")
let tempSpan = $("#temperature")
let humiditySpan = $("#humidity")
let windSpeedSpan = $("#wind-speed")
let uvSpan = $("#uv")

renderCurrentForecast("San Francisco")

function renderCurrentForecast(city){
  $.ajax({
    url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${API_TOKEN}`,
    method: "GET"
  }).then(function (response) {
    citySpan.text(`${response.name} (${moment().format("M/D/YYYY")})`)
    tempSpan.text(`${response.main.temp.toFixed(1)} °F`)
    humiditySpan.text(`${response.main.humidity}%`)
    windSpeedSpan.text(`${response.wind.speed} MPH`)

    $.ajax({
      url: `http://api.openweathermap.org/data/2.5/uvi?appid=${API_TOKEN}&lat=${response.coord.lat}&lon=${response.coord.lon}`,
      method: "GET"
    }).then(function (response) {
      if (Math.floor(response.value) >= 1 && Math.floor(response.value) <= 2) {
        uvSpan.css("background-color", "green")
        uvSpan.css("color", "white")
      } else if (Math.floor(response.value) >= 3 && Math.floor(response.value) <= 5) {
        uvSpan.css("background-color", "yellow")
        uvSpan.css("color", "black")
      } else if (Math.floor(response.value) >= 6 && Math.floor(response.value) <= 7) {
        uvSpan.css("background-color", "orange")
        uvSpan.css("color", "black")
      } else if (Math.floor(response.value) >= 8 && Math.floor(response.value) <= 10) {
        uvSpan.css("background-color", "red")
        uvSpan.css("color", "white")
      } else {
        uvSpan.css("background-color", "purple")
        uvSpan.css("color", "white")
      }
      uvSpan.text(`${response.value}`)
      console.log(response)
    })

    console.log(`Temperature: ${response.main.temp}`)
    console.log(`Humidity: ${response.main.humidity}`)
    console.log(`Wind Speed: ${response.wind.speed}`)
    console.log(`UV: ${response}`)
    console.log(response)
  })
}

function renderEventCurrentForecast(event){
  event.preventDefault()
  let city = searchInput.val()
  if (city) {
    renderCurrentForecast(city)
  }
}


searchButton.on("click", renderEventCurrentForecast);

/* 
Put all variables that will be usedthroughout the js file Here.
If Variables are used only in one function, declare them within that function's scope.
*/

//DOM Elements and Jquery Wrappers
/*
If a DOM Element or Jquery Wrapper is important to the project, declare it as a variable here.
*/

//Useful Functions
/*
This is where we will define functions that we may be calling often,
or that would be useful to have defined as functions instead of standard code.
*/

//Event Functions
/*
This is where we will define functions that are called by event handlers,
Such as click methods for buttons
*/

//Event Assignment
/*
This is where we will assign the events of various elements to their functions.
*/

//Code to run on Page load
/*
This is where we will put any code that needs to be run after the page has loaded.
*/