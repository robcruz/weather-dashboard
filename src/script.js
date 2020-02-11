//Global Variables
const API_TOKEN = "5c78ecc5505062a812390325cef1bdfc"

let searchInputElem = $("#search")
let searchElem = $("#search-button")
let cityElem = $("#city")
let tempElem = $("#temperature")
let humidityElem = $("#humidity")
let windSpeedElem = $("#wind-speed")
let uvElem = $("#uv")

let city = "Los Angeles"
renderCurrentForecast(city)
renderFutureForecast(city)

searchElem.on("click", renderForecast)

function renderCurrentForecast(city){
  $.ajax({
    url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${API_TOKEN}`,
    method: "GET"
  }).then(function (response) {
    cityElem.html(`<h2>${response.name} (${moment().format("M/D/YYYY")})</h2>`)
    tempElem.text(response.main.temp.toFixed(1))
    humidityElem.text(response.main.humidity)
    windSpeedElem.text(response.wind.speed)
    // uvElem.text('rob')

    console.log(`Lat: ${response.coord.lat}`)
    console.log(`Long: ${response.coord.lon}`)
    $.ajax({
      url: `https://api.openweathermap.org/data/2.5/uvi?appid=${API_TOKEN}&lat=${response.coord.lat}&lon=${response.coord.lon}`,
      method: "GET"
    }).then(function (response) {
      if (Math.floor(response.value) >= 1 && Math.floor(response.value) <= 2) {
        uvElem.css("background-color", "green")
        uvElem.css("color", "white")
      } else if (Math.floor(response.value) >= 3 && Math.floor(response.value) <= 5) {
        uvElem.css("background-color", "yellow")
        uvElem.css("color", "black")
      } else if (Math.floor(response.value) >= 6 && Math.floor(response.value) <= 7) {
        uvElem.css("background-color", "orange")
        uvElem.css("color", "black")
      } else if (Math.floor(response.value) >= 8 && Math.floor(response.value) <= 10) {
        uvElem.css("background-color", "red")
        uvElem.css("color", "white")
      } else {
        uvElem.css("background-color", "purple")
        uvElem.css("color", "white")
      }

      console.log(`UV: ${response.value}`)
      uvElem.text(response.value)
    })

  })
}

function getFutureForecastArr(city, days = 5) {
  let arr = []
  let prevDate = null

  $.ajax({
    url: `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${API_TOKEN}`,
    method: "GET"
  }).then(function (response) {
    debugger
    response.list.forEach((forecast, index) => {
      debugger
      if (index===0){
        arr.push(forecast)
        prevDate = new Date(forecast.dt_txt).getDate()

      } else if (prevDate !== new Date(forecast.dt_txt).getDate()) {
        arr.push(forecast)
        prevDate = new Date(forecast.dt_txt).getDate()
      }

      if (arr.length === days) {
        return arr
      }
    })

    return arr
  })
}

// day1Date
// day2Date
// day3Date
// day4Date
// day5Date
function renderFutureForecast(city) {
  let forecastArr = getFutureForecastArr(city)

  forecastArr.forEach((forecast, index) => {

  })


}

function renderForecast(event){
  event.preventDefault()
  let city = searchInputElem.val()
  if (city) {
    renderCurrentForecast(city)
    renderFutureForecast(city)

  }
}



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