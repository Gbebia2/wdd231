const apiKey = '310659e1bc63153e4206d2dbd5a6206b';
const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=Lagos,NG&units=metric&appid=${apiKey}`;

async function getWeather() {
    try {
        const response = await fetch(weatherUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function displayWeather(data) {
    const weatherContainer = document.getElementById('weather-temp');
    const weatherDescription = document.getElementById('weather-desc');
    const forecastContainer = document.getElementById('weather-forecast');

    const currentWeather = data.list[0];

    weatherContainer.textContent = `Temperature: ${currentWeather.main.temp}°C`;
    weatherDescription.textContent = `Condition: ${currentWeather.weather[0].description}`;

    const forecastHTML = data.list.slice(1, 4).map(day => `
        <p>${new Date(day.dt_txt).toLocaleDateString()}: ${day.main.temp}°C</p>
    `).join('');

    forecastContainer.innerHTML = forecastHTML;
}

document.addEventListener('DOMContentLoaded', () => {
    getWeather();
});
