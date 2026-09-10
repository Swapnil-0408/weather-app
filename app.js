const iconBox = document.querySelector(".iconbox");
const tempBox = document.querySelector(".tempbox");
const locationBtn = document.querySelector("#locationBtn");
console.log(locationBtn);
const forecastcards = document.querySelector(".forecastcards");
const extraDetails = document.querySelector(".extradetails");
const startBtn=document.querySelector(".start");
const search=document.querySelector("#inputfield");
const searchIcon = document.querySelector("#searchicon");
const desc=document.querySelector("#desc");
const temp=document.querySelector("#temp");
const cityName=document.querySelector("#city");
const wind = document.querySelector("#windspeed");
const humidity=document.querySelector("#humidityper");
const goHome = document.querySelector(".homebtn");
const icon=document.querySelector("#icon");
const loader=document.querySelector("#loader");
const mainBox1=document.querySelector(".mainBox1");
const mainBox2=document.querySelector(".mainBox2");
const mainBox3=document.querySelector(".mainBox3");
const feelsLike = document.querySelector("#feelsLike");
const sunrise = document.querySelector("#sunrise");
const sunset = document.querySelector("#sunset");
const additionalDetails = document.querySelector(".additionalDetails");
const forecast = document.querySelector(".forecast");
additionalDetails.classList.add("inactive");
forecast.classList.add("inactive");
const weatherImages = {
    Clouds: "images/clouds.png",
    Clear: "images/clear.png",
    Rain: "images/rain.png",
    Drizzle: "images/drizzle.png",
    Snow: "images/snow.png",
    Thunderstorm: "images/rain.png",
    Mist: "images/mist.png",
    Haze: "images/mist.png",
    Fog: "images/mist.png"
};
const url =  "https://api.openweathermap.org/data/2.5/weather?";
const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?";
const apikey = "0ead3ca1215aad52a6ffdb85d6a96fb7";
function updateWeatherUI(weatherData) {
    temp.textContent = Math.round(weatherData.main.temp - 273.15) + "°C";
    desc.textContent = weatherData.weather[0].description;
    cityName.textContent = weatherData.name;
    wind.textContent = weatherData.wind.speed + " km/h";
    humidity.textContent = weatherData.main.humidity + "%";
    feelsLike.textContent =
        Math.round(weatherData.main.feels_like - 273.15) + "°C";
    sunrise.textContent =
        new Date(weatherData.sys.sunrise * 1000)
        .toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        });
    sunset.textContent =
        new Date(weatherData.sys.sunset * 1000)
        .toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        });
    icon.src =
        weatherImages[weatherData.weather[0].main] ||
        "images/clear.png";
}
async function getWeatherData(city){
  loader.classList.remove("inactive");
  iconBox.classList.add("inactive");
  tempBox.classList.add("inactive");
  extraDetails.classList.add("inactive");
  let finalurl=`${url}q=${city}&appid=${apikey}`;
  try{
  const response=await fetch(finalurl)
  const weatherData=await response.json();
  if(weatherData.cod===404){
    mainBox2.classList.add("inactive");
    mainBox3.classList.remove("inactive");
  }else{
    updateWeatherUI(weatherData);
getForecast(city);
additionalDetails.classList.remove("inactive");
forecast.classList.remove("inactive");
iconBox.classList.remove("inactive");
tempBox.classList.remove("inactive");
extraDetails.classList.remove("inactive");
  }
} 
catch(error){
     console.error("error:",error);
     alert("error.message");
}
finally{
  loader.classList.add("inactive");
}
}
    searchIcon.addEventListener("click",()=>{
    getWeatherData(search.value);
});
async function getForecast(city) {
    const finalurl=`${forecastUrl}q=${city}&appid=${apikey}`;
    try{
      const response=await fetch(finalurl);
      if (!response.ok) {
    throw new Error("Forecast API failed");
}
      const forecastData=await response.json();
      console.log(forecastData);
      forecastcards.innerHTML="";
      forecastData.list.forEach((item, index) => {

    if(item.dt_txt.includes("12:00:00")){
    const weatherMain = item.weather[0].main;
    const icon = weatherImages[weatherMain] || "images/clear.png";
    const date = new Date(item.dt_txt);

const day = date.toLocaleDateString("en-US", {
    weekday: "short"
});
    forecastcards.innerHTML += `
    <div class="card">
     <h4>${day}</h4>
     <img src="${icon}">
     <p>${Math.round(item.main.temp - 273.15)}°C</p>
</div>
`;
    }

});
    }
    catch(error)
    {
      console.log(error);
    }
  }

async function getWeatherByLocation(lat, lon) {

    loader.classList.remove("inactive");
    iconBox.classList.add("inactive");
    tempBox.classList.add("inactive");
    extraDetails.classList.add("inactive");

    const finalurl = `${url}lat=${lat}&lon=${lon}&appid=${apikey}`;

    try {

        const response = await fetch(finalurl);
        const weatherData = await response.json();
        updateWeatherUI(weatherData);
        getForecast(weatherData.name);
        additionalDetails.classList.remove("inactive");
        forecast.classList.remove("inactive"); 
        iconBox.classList.remove("inactive");
        tempBox.classList.remove("inactive");
        extraDetails.classList.remove("inactive");

    } catch (error) {
        console.error(error);
        alert("Something went wrong.");
    } finally {
        loader.classList.add("inactive");
    }
}
function success(position){
  const latitude=position.coords.latitude;
  const longitude=position.coords.longitude;
  console.log("latitude:",latitude);
  console.log("longitude:",longitude);
  getWeatherByLocation(latitude, longitude);
}
function error()
{
  alert("location access denied.");
}
startBtn.addEventListener("click",()=>{
    mainBox1.classList.add("inactive");
    mainBox2.classList.remove("inactive");
});
search.addEventListener("keypress",(e)=>{
    if(e.key==="Enter"){
        getWeatherData(search.value); 
    }
});
goHome.addEventListener("click", () => {
  mainBox3.classList.add("inactive");
  mainBox1.classList.remove("inactive");
  search.value = ""; // clear input
});
locationBtn.addEventListener("click", () => {
    console.log("Button clicked");

    if (!navigator.geolocation) {
        console.log("Geolocation is not supported");
        return;
    }

    navigator.geolocation.getCurrentPosition(success, error);
});
