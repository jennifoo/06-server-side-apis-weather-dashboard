/* ------------------------- PSEUDO CODE ------------------------- */
/* Create a form that lets user input the city name.

  Results:
  • Current weather conditions for the city
      - City Name
      - Date
      - Icon representing weather condition
      - The Temperature
      - The Humidity
      - The Wind Speed
      - UV Index
          * When viewing UV index, presented with color the indicates wether the conditions are favorable, moderate or severe.
  • Future weather conditions for the city
          * When viewing future conditions, presented with a 5-day forecasts that displays the date, an icon representation of weather conditions, the temperature, and the humidity.

Add city to the search history
          * When clicking on a city in the search history, presented with the current and future conditions for that city.

When opening up the weather dashboard, presented with the last searched city forecast.
*/

/* ------------------------- GLOBAL VARIABLES ------------------------- */

let $search = $("#search"); // search input field
let $submit = $("#submit"); // submit button
let $history = $("#history"); // div with h3 title "Search History"
let $data = $("#data"); // div with h3 title "Current Weather Details"
// let weatherData = [];




/* ------------------------- FUNCTIONS ------------------------- */

// runQuery("bear", 1990, 2020);
// api.openweathermap.org/data/2.5/forecast?q={city name}&appid={your api key}
// let forecastURL = "api.openweathermap.org/data/2.5/forecast?";
// – – – – –
// api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}

let apiKey = "&appid=" + "a3eb3962d6ab7a827bdc360f52280af9";
let cityInput ="Houston"; // user to provide this information via input field.
let cityParam = "q=" + cityInput;
let apiBaseURL = "https://api.openweathermap.org/data/2.5/weather?";


function currentWeather() {
//date, weather icon, temp, humidity, windspeed, UV index


  var finalURL = apiBaseURL + cityParam + "&temperature" + "&humidity" + "&wind" + apiKey;
  $.ajax({
    url: finalURL,
    method: "GET"
    }).then(function(response) {
      console.log(response);

      // Convert the temp to fahrenheit
      let tempF = (response.main.temp - 273.15) * 1.80 + 32;

      $(".tempK").text("Temperature (K) " + response.main.temp);
      $(".tempF").text("Temperature (F) " + tempF.toFixed(2));
      $(".humidity").text("Humidity: " + response.main.humidity);
      $(".windspeed").text("Wind Speed: " + response.wind.speed);

    });
}


currentWeather();


// $("#emptycontentswiththisfunction").empty();


// End
