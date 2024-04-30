const apiKey = '3945167616df44bea84155038242904';
const apiUrl1 = "https://api.weatherapi.com/v1/forecast.json?key=" + apiKey;

const searchBox = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

async function checkWeather(city){
    const response = await fetch(`${apiUrl1}&q=${city}`);
    const data = await response.json();

    console.log(data);
    document.querySelector(".temp").innerHTML = Math.round(data.current.temp_c) + "°C";
    document.querySelector(".city").innerHTML = data.location.name;
    document.querySelector(".humidity").innerHTML = data.current.humidity + "%";
    document.querySelector(".wind").innerHTML = data.current.wind_kph + " km/h";
    document.querySelector(".wind").innerHTML = data.current.wind_kph + " km/h";
    document.querySelector(".weather-icon").src = "https:" + data.current.condition.icon;

}

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
});
