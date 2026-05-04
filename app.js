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
const mainBox1=document.querySelector(".mainBox1");
const mainBox2=document.querySelector(".mainBox2");
const mainBox3=document.querySelector(".mainBox3");
const url = "https://api.openweathermap.org/data/2.5/weather?";
const apikey = "0ead3ca1215aad52a6ffdb85d6a96fb7";
async function getWeatherData(city){
  let finalurl=`${url}q=${city}&appid=${apikey}`;
  let weatherData=await fetch(finalurl).then(res=>res.json());
  console.log(weatherData);
  if(weatherData.cod=="404"){
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
  Clouds: "/images/clouds.png",
  Clear: "/images/clear.png",
  Rain: "/images/rain.png",
  Drizzle: "/images/drizzle.png",
  Snow: "/images/snow.png",
  Thunderstorm: "/images/rain.png",
  Mist: "/images/mist.png",
  Haze: "/images/mist.png",
  Fog: "/images/mist.png"
};

console.log("Weather:", weatherMain);

icon.src = weatherImages[weatherMain] || "/images/clear.png";
  }
} 
    searchIcon.addEventListener("click",()=>{
    getWeatherData(search.value);
});
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
