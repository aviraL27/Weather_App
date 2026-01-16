const cityInput = document.querySelector(".city-input");
const searchBtn = document.querySelector(".search-btn");
const cityName = document.querySelector(".city-name");
const temp = document.querySelector(".temp");
const condition = document.querySelector(".condition");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const errorMessage = document.querySelector(".error-message");
const weatherIcon = document.querySelector(".weather-icon");

const API_KEY = "d2190e5baaff9d1fec14dcaf5860696d";

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();

    if(city===""){
        showError("Please enter a city name");
        return;
    }
    fetchWeather(city);
});

cityInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        searchBtn.click();
    }
});

async function fetchWeather(city) {
    try{
        errorMessage.textContent = "";
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        );
        if(!response.ok){
            throw new Error("City not found");
        }
        const data = await response.json();
        updateUI(data);
    }
    catch(error){
        showError(error.message);
    }
}

function updateUI(data) {
    cityName.textContent = data.name;
    temp.textContent = Math.round(data.main.temp);
    condition.textContent = data.weather[0].description;
    humidity.textContent = data.main.humidity;
    wind.textContent = Math.round(data.wind.speed);

    const iconCode = data.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    weatherIcon.style.display = "block";
}


function showError(message) {
    errorMessage.textContent = message;
    weatherIcon.style.display = "none";
}
