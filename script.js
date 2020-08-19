
/* ------------------------- GLOBAL VARIABLES ------------------------- */

let now = moment().format("l");

let $search = $("#search")
let $submit = $("#submit"); // submit button
let $historyResults = $("#history-results");
let $data = $("#data"); // div with h3 title "Current Weather Details"
let apiKey = "&appid=" + "a3eb3962d6ab7a827bdc360f52280af9";
let future = $(".future")


let searchHistory = [];

/* ------------------------- FUNCTIONS ------------------------- */

// Trigger ajax onclick
$($submit).on("click", function(event){
      $(future).empty(); // Empty Contents of Previous Results
      $(".history-submit").empty(); // Empty Contents of Previous Results
      event.preventDefault();
      let cityName = $search.val().trim();

      if (cityName !== null){
              searchHistory.push(cityName); // Add city name to array
              currentWeather(cityName);
              futureWeather(cityName);
              for (let i=0; i < searchHistory.length; i++){
                  localStorage.setItem(i, searchHistory[i]);
            }
            reDisplayKeys();
      }
});

function displayKeys(){
      $(".history-submit").empty(); // Empty Contents of Previous Results
      for (let i=0; i < 10; i++){
              cityNameStored = localStorage.getItem(i);

              if (cityNameStored !== null){
                  searchHistory.push(cityNameStored);
              }
              let makeDiv = $("<button>").attr("class", "history-submit");
              let searchItem = makeDiv.append(searchHistory[i]);
              $historyResults.append(searchItem);
      }

      let lastSearchIndex = (searchHistory.length-1);
      currentWeather(searchHistory[lastSearchIndex]);
      futureWeather(searchHistory[lastSearchIndex]);
}
displayKeys();


function reDisplayKeys(){
      for (let i=0; i < searchHistory.length; i++){
            let makeDiv = $("<button>").attr("class", "history-submit");
            let searchItem = makeDiv.append(searchHistory[i]);
            $historyResults.append(searchItem);
      }
}

$(document).on("click", ".history-submit", historyClick);

function historyClick(event){
    event.preventDefault();
    var getCityName = ($(this).text());
    $(future).empty(); // Empty Contents of Previous Results
    currentWeather(getCityName);
    futureWeather(getCityName);
}


function futureWeather(cityName) {
    let apiBaseURL = "https://api.openweathermap.org/data/2.5/forecast?";
    let finalURL = apiBaseURL + "q=" + cityName + "&temperature" + "&humidity" + "&wind" + apiKey;

    $.ajax({
      url: finalURL,
      method: "GET"
      }).then(function(response) {
        let result = response.list; // shorten path of response

        $(".nameDiv").empty();
        let name = $("<div>").text(response.city.name);
        $(".nameDiv").append(name);

          for (let i = 0; i < 5; i++){
                let newDiv = $("<div>").attr("class", "future-div col-md-2");

                let date = $("<div>").text(moment().add(i+1, 'days').format("l"));
                newDiv.append(date);

                /* Icon */
                let iconCode = result[i].weather[0].icon; // Get icon ID
                let iconURL = "http://openweathermap.org/img/wn/" + iconCode + ".png";
                let iconFinal = $("<img>").attr("src", iconURL);
                newDiv.append(iconFinal);
                /* End Icon Code */

                let tempK = $("<div>").text("Temperature (K): " + result[i].main.temp);
                newDiv.append(tempK);

                let tempFcalc = (result[i].main.temp - 273.15) * 1.80 + 32;
                let tempF = $("<div>").text("Temperature (F): " + tempFcalc.toFixed(2));
                newDiv.append(tempF);

                let humidity = $("<div>").text("Humidity: " + result[i].main.humidity);
                newDiv.append(humidity);

                let windspeed = $("<div>").text("Windspeed: " + result[i].wind.speed);
                newDiv.append(windspeed);

                future.append(newDiv);
          }
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
      // console.log(response);
        /* Icon */
        $(".icon").empty();
        let iconCode = response.weather[0].icon; // Get icon ID
        let iconURL = "http://openweathermap.org/img/wn/" + iconCode + ".png";
        let iconFinal = $("<img>").attr("src", iconURL);
        $(".icon").append(iconFinal);
        /* End Icon Code */

        let latCoord = response.coord.lat;
        let lonCoord = response.coord.lon;

        $(".name").text(response.name + " " + now);
        $(".tempK").text("Temperature (K): " + response.main.temp);
        let tempF = (response.main.temp - 273.15) * 1.80 + 32;
        $(".tempF").text("Temperature (F): " + tempF.toFixed(2));
        $(".humidity").text("Humidity: " + response.main.humidity);
        $(".windspeed").text("Wind Speed: " + response.wind.speed);
        uvIndex(latCoord, lonCoord);
      });
}

function uvIndex(lat, lon) {
    let apiBaseURL = "http://api.openweathermap.org/data/2.5/uvi?";
    let finalURL = apiBaseURL + apiKey + "&lat=" + lat + "&lon=" + lon;

    $.ajax({
      url: finalURL,
      method: "GET"
      }).then(function(response) {
        let uvIndex = response.value;
        $(".uv").text("UV Index: ");
        let uvIndexDiv = $("<span>").attr("class", "uv-span").text(uvIndex);
        $(".uv").append(uvIndexDiv);

        if (uvIndex <= 2){
          uvIndexDiv.addClass("favorable")
        } else if (uvIndex <= 7){
          uvIndexDiv.addClass("moderate")
        } else {
          uvIndexDiv.addClass("severe")
        };

      });
}
