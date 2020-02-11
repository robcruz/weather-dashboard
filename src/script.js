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
    for (let i = 0; arr.length < days; i++) {
      if (i === 0) {
        arr.push(response.list[i])
        prevDate = new Date(response.list[i].dt_txt).getDate()
      } else if (prevDate !== new Date(response.list[i].dt_txt).getDate()) {
        arr.push(response.list[i])
        prevDate = new Date(response.list[i].dt_txt).getDate()
      }
    }

    debugger
    return arr
  })
}

// day1Date
// day1image
// day1temp
// day1humidity

function renderFutureForecast(city) {
  let forecastArr = getFutureForecastArr(city)
  let index = 1;

  if (forecastArr) {
    index = forecastArr.length
  }

  debugger
  for (let i=0; i < index; i++) {
    let dateElem = $(`#day${i+1}Date`)
    let imageElem = $(`#day${i+1}Image`)
    let tempElem = $(`#day${i+1}Temp`)
    let humidityElem = $(`#day${i+1}Humidity`)

    if (forecastArr) {
      tempElem.text(forecastArr[i].main.temp.toFixed(1))
      humidityElem.text(forecastArr[i].main.humidity)
      debugger
    } else {
      tempElem.text('openWeather API is down')
      humidityElem.text('openWeather API is down')
      debugger
    }
  }




}

function renderForecast(event){
  event.preventDefault()
  let city = searchInputElem.val()
  if (city) {
    renderCurrentForecast(city)
    renderFutureForecast(city)
  }
}

