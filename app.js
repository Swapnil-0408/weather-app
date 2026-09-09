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
const url =  "https://api.openweathermap.org/data/2.5/weather?";
const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?";
const apikey = "0ead3ca1215aad52a6ffdb85d6a96fb7";
async function getWeatherData(city){
  loader.classList.remove("inactive");
  iconBox.classList.add("inactive");
  tempBox.classList.add("inactive");
  extraDetails.classList.add("inactive");
  let finalurl=`${url}q=${city}&appid=${apikey}`;
  try{
  const response=await fetch(finalurl)
  const weatherData=await response.json();
  console.log(weatherData);
  if(weatherData.cod===404){
    mainBox2.classList.add("inactive");
    mainBox3.classList.remove("inactive");
  }else{
    desc.innerHTML=weatherData.weather[0].description;
    temp.innerHTML=Math.round(weatherData.main.temp-273.15)+"°C";
    cityName.innerHTML=weatherData.name;
    wind.innerHTML=weatherData.wind.speed+ " km/h";
    humidity.innerHTML=weatherData.main.humidity+"%"; 
  let weatherMain = weatherData.weather[0].main;

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
icon.src = weatherImages[weatherMain] || "images/clear.png";
getForecast(city);
iconBox.classList.remove("inactive");
tempBox.classList.remove("inactive");
extraDetails.classList.remove("inactive");
  }
} 
catch(error){
     console.error(error);
     alert("something went wrong.please check your internet connection.");
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

        desc.innerHTML = weatherData.weather[0].description;
        temp.innerHTML = Math.round(weatherData.main.temp - 273.15) + "°C";
        cityName.innerHTML = weatherData.name;
        getForecast(weatherData.name);
        wind.innerHTML = weatherData.wind.speed + " km/h";
        humidity.innerHTML = weatherData.main.humidity + "%";

        let weatherMain = weatherData.weather[0].main;

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

        icon.src = weatherImages[weatherMain] || "images/clear.png";
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
