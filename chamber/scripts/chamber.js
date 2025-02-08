// Footer: Update year and last modified date
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("year").textContent = new Date().getFullYear();
    document.getElementById("last-modified").textContent = document.lastModified;
});

// Toggle navigation menu for mobile
const menuButton = document.getElementById('menu');
const header = document.querySelector('header');
menuButton.addEventListener('click', () => {
    header.classList.toggle('show-nav');
});

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

// Display random business spotlights
async function getSpotlights() {
    try {
        const response = await fetch('chamber/data/members.json'); // Ensure the correct path
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const members = await response.json();
        const spotlightMembers = members.filter(member => member.membership_level === 2 || member.membership_level === 3);
        displaySpotlights(randomizeSpotlights(spotlightMembers));
    } catch (error) {
        console.error('Error fetching member data:', error);
    }
}

function randomizeSpotlights(members) {
    return members.sort(() => 0.5 - Math.random()).slice(0, 3);
}

function displaySpotlights(members) {
    const spotlightsContainer = document.getElementById('spotlight-container');
    members.forEach(member => {
        const spotlight = document.createElement('div');
        spotlight.classList.add('spotlight');
        spotlight.innerHTML = `
            <img src="images/${member.images}" alt="${member.name}">
            <h4>${member.name}</h4>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
        `;
        spotlightsContainer.appendChild(spotlight);
    });
}