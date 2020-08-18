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

let $search = $("#search")
let $submit = $("#submit"); // submit button
let $history = $("#history"); // div with h3 title "Search History"
let $data = $("#data"); // div with h3 title "Current Weather Details"
// let weatherData = [];
let apiKey = "&appid=" + "a3eb3962d6ab7a827bdc360f52280af9";
let future1 = $(".future1")
let future2 = $(".future2")
let future3 = $(".future3")
let future4 = $(".future4")
let future5 = $(".future5")

/* ------------------------- FUNCTIONS ------------------------- */

//date, weather icon, temp, humidity, windspeed, UV index

// Trigger ajax onclick
$($submit).on("click", function(event){
      event.preventDefault();
      let cityName = $search.val().trim();
       console.log(cityName);

      currentWeather(cityName);
      futureWeather(cityName);

});


function futureWeather(cityName) {
      let apiBaseURL = "https://api.openweathermap.org/data/2.5/forecast?";
      let finalURL = apiBaseURL + "q=" + cityName + "&temperature" + "&humidity" + "&wind" + apiKey;

      $.ajax({
        url: finalURL,
        method: "GET"
        }).then(function(response) {
          let result = response.list; // shorten path of response
          console.log(result);

          let tempK = $("<div>").text("Temperature (K): " + result[0].main.temp);
          future1.append(tempK);



        });
}


function currentWeather(cityName) {
//date, weather icon, temp, humidity, windspeed, UV index
      let apiBaseURL = "https://api.openweathermap.org/data/2.5/weather?";
      let finalURL = apiBaseURL + "q=" + cityName + "&temperature" + "&humidity" + "&weather"+ "&wind" + apiKey;

      $.ajax({
        url: finalURL,
        method: "GET"
        }).then(function(response) {
           console.log(response);

          // Convert the temp to fahrenheit
          let tempF = (response.main.temp - 273.15) * 1.80 + 32;
          // let iconCode = response.weather[0].icon);
          // let iconFinal = $("<img>").attr("src", "images/" + iconCode + ".png");

          // $(".icon").text(iconFinal);
          $(".tempK").text("Temperature (K): " + response.main.temp);
          $(".tempF").text("Temperature (F): " + tempF.toFixed(2));
          $(".humidity").text("Humidity: " + response.main.humidity);
          $(".windspeed").text("Wind Speed: " + response.wind.speed);

        });
}



// $("#emptycontentswiththisfunction").empty();


// End

// let cityParam = "q=" + $search;
//.val().trim(); // city input field
