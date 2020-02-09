//Global Variables
const API_TOKEN = "5c78ecc5505062a812390325cef1bdfc"
let city = "London"

function doIt(event){
  event.preventDefault()

  $.ajax({
    url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_TOKEN}`,
    method: "GET"
  }).then(function (response) {
    console.log(response)
  })
}


$("#search-button").on("click", doIt);

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