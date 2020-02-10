//Global Variables
const API_TOKEN = "5c78ecc5505062a812390325cef1bdfc"
let city = "Los Angeles"

let searchInputElem = $("#search")
let searchElem = $("#search-button")
let cityElem = $("#city")
let tempElem = $("#temperature")
let humidityElem = $("#humidity")
let windSpeedElem = $("#wind-speed")
let uvElem = $("#uv")

renderCurrentForecast("Los Angeles")

searchElem.on("click", renderEventCurrentForecast)

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

    $.ajax({
      url: `http://api.openweathermap.org/data/2.5/uvi?appid=${API_TOKEN}&lat=${response.coord.lat}&lon=${response.coord.lon}`,
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

      uvElem.text(response.value)
    })

  })
}

function getDateCreated(unix_date) {
  new Date(1000 * $.parseJSON(`{"date_created":"${unix_date}"}`).date_created).getDate()
}

function renderFutureForecast(weatherItem) {
  console.log(weatherItem)
}

function get5DayForecast(city) {
  $.ajax({
    url: `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${API_TOKEN}`,
    method: "GET"
  }).then(function (response) {

    response.list.forEach((weatherItem, index) => {
      if (index===0){

        renderFutureForecast(weatherItem)
        somethingDate = new Date(1000 * $.parseJSON(`{"date_created":"${weatherItem.dt}"}`).date_created).getDate()

      } else if (somethingDate !== getDateCreated(weatherItem.dt)) {

        renderFutureForecast(weatherItem)
        somethingDate = new Date(1000 * $.parseJSON(`{"date_created":"${weatherItem.dt}"}`).date_created).getDate()

      }
    })
  })
}

function renderEventFutureForecast(city) {
  $.ajax({
    url: `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${API_TOKEN}`,
    method: "GET"
  }).then(function (response) {

    let today = new Date(Date.now()).getDate()
    let weatherObjToday = null
    let weatherObjTodayPlus1 = null
    let weatherObjTodayPlus2= null
    let weatherObjTodayPlus3 = null
    let weatherObjTodayPlus4 = null
    let weatherObjTodayPlus5 = null

    let somethingDate = null

    console.log(response.list)

    response.list.forEach((weatherItem, index) => {

      let myDate = new Date(1000 * $.parseJSON(`{"date_created":"${weatherItem.dt}"}`).date_created)
      console.log(myDate.toLocaleString())

      let forecastDate = new Date(1000 * $.parseJSON(`{"date_created":"${weatherItem.dt}"}`).date_created).getDate()

      switch(forecastDate) {
        case today:
          if (!weatherObjToday) {
            weatherObjToday = weatherItem

          }

          break;
        case today + 1:
          if (!weatherObjTodayPlus1) {
            weatherObjTodayPlus1 = weatherItem

          }

          break;
        case today + 2:
          if (!weatherObjTodayPlus2) {
            weatherObjTodayPlus2 = weatherItem

          }

          break;
        case today + 3:
          if (!weatherObjTodayPlus3) {
            weatherObjTodayPlus3 = weatherItem

          }
          break;
        case today + 4:
          if (!weatherObjTodayPlus4) {
            weatherObjTodayPlus4 = weatherItem

          }
          break;
        case today + 5:
          if (!weatherObjTodayPlus5) {
            weatherObjTodayPlus5 = weatherItem

          }
          break;
      }



    })


  })
}

function renderEventCurrentForecast(event){
  event.preventDefault()
  let city = searchInputElem.val()
  if (city) {
    renderCurrentForecast(city)
    renderEventFutureForecast(city)
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