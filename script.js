$(document).ready(() => {

var currentDate = moment().format("MM.DD.YYYY");


$("#submitBtn").on("click", function(){
    event.preventDefault();
    var city = $("#city").val();

    var apiKey = "eab6d01fa24f92ffa99be7e88ac10b4b";
    var queryURL = ("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey);
    var fiveDayQueryURL = ("https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + apiKey);

    $.ajax({url: queryURL, method: "GET"}).then(function(response){
        var city = response.name,
            lonCoord = response.coord.lon,
            latCoord = response.coord.lat,
            iconcode = response.weather[0].icon,
            temp = response.main.temp,
            humidity = response.main.humidity,
            windSpeed = response.wind.speed;
            iconURL = ("http://openweathermap.org/img/w/" + iconcode + ".png");
        localStorage.setItem("search", city)
        cityResultBlock()
        
        $(".cityCard").text(city + " " + currentDate + " ")
        $("#wicon").attr("src", iconURL);
        $(".temp span").text(temp + "F");
        $(".humidity span").text(humidity + "%");
        $(".windSpeed span").text(windSpeed + "MPH")

        //*uv results
        var uvURL = ("http://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + latCoord + "&lon=" + lonCoord);
        $.ajax({url: uvURL, method: "GET"}).then(function(response){
            var uvIndex = response.value;
            var uvIndexBtnEl = $("<button></button>")
            uvIndexBtnEl.text(uvIndex);
            $(".uvIndex span").append(uvIndexBtnEl);
        })


        //*five day results
        var fiveDayQueryURL = ("https://api.openweathermap.org/data/2.5/onecall?lat=" + latCoord + "&lon=" + lonCoord + "&units=imperial&exclude=hourly,current&appid=" + apiKey);
        $.ajax({url: fiveDayQueryURL, method: "GET"}).then(function(response){
            console.log(response)
            // timeStamp = new Date((response.daily[i].dt)*1000);
                var formattedDate1 = new Date((response.daily[1].dt)*1000);
                var d = formattedDate1.getDate();
                var m = formattedDate1.getMonth();
                m +=1
                var y = formattedDate1.getFullYear();
                $("#dateDay_1").text(m + "." + d + "." + y)

                var formattedDate2 = new Date((response.daily[2].dt)*1000);
                var d = formattedDate2.getDate();
                var m = formattedDate2.getMonth();
                m +=1
                var y = formattedDate2.getFullYear();
                $("#dateDay_2").text(m + "." + d + "." + y)

                var formattedDate3 = new Date((response.daily[3].dt)*1000);
                var d = formattedDate3.getDate();
                var m = formattedDate3.getMonth();
                m +=1
                var y = formattedDate3.getFullYear();
                $("#dateDay_3").text(m + "." + d + "." + y)

                var formattedDate4 = new Date((response.daily[4].dt)*1000);
                var d = formattedDate4.getDate();
                var m = formattedDate4.getMonth();
                m +=1
                var y = formattedDate4.getFullYear();
                $("#dateDay_4").text(m + "." + d + "." + y)

                var formattedDate5 = new Date((response.daily[5].dt)*1000);
                var d = formattedDate5.getDate();
                var m = formattedDate5.getMonth();
                m +=1
                var y = formattedDate5.getFullYear();
                $("#dateDay_5").text(m + "." + d + "." + y)
        
            
            //*icon five day
            $(".iconFiveDay").each(function(i){
                $(this).attr("src", ("http://openweathermap.org/img/w/" + response.daily[i].weather[0].icon + ".png"));
            })

            //*temp five day
            $(".tempFiveDay").each(function(i){
                $(this).text("Temp: " + response.daily[i].temp.day + " F");
            })

            //*humidity five day
            $(".humidityFiveDay").each(function(i){
                // var i = 1
                $(this).text("Humidity: " + response.daily[i].humidity +"%");
                console.log(this)
            });
            
    
        })
    })


})//submit closing bracket

function cityResultBlock(){
    
    var cityResult = localStorage.getItem("search");
    console.log(cityResult)
    var resultEl = $("<p></p>").text(cityResult);
    $(".submit").append(resultEl);
    
}
//get the city val on click and combine qureryURL/API
//view file to get parameters
//get value and append to search block by creating a new element first
//store paraments and append to page


})//ready closing bracket