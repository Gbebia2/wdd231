// Footer: Update year and last modified date
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("last-modified").textContent = document.lastModified;

// Mobile Menu Toggle
const menuButton = document.getElementById('menu');
const header = document.querySelector('header');
menuButton.addEventListener('click', () => {
    header.classList.toggle('show-nav');
});

// Detect current page
const currentPage = window.location.pathname.split("/").pop();

// Functions specific to Homepage
if (currentPage === "index.html" || currentPage === "") {
    // Weather API Setup
    const apiKey = '78034b37d2b845af835163429250702'; // Replace with your API key
    const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=Lagos,NG&units=metric&appid=${apiKey}`;

    async function getWeather() {
        try {
            const response = await fetch(weatherUrl);
            const data = await response.json();
            displayWeather(data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    }

    function displayWeather(data) {
        const weatherContainer = document.getElementById('weather');
        const currentWeather = data.list[0];
        
        weatherContainer.innerHTML = `
            <h3>Current Weather</h3>
            <p>Temperature: ${currentWeather.main.temp}°C</p>
            <p>Condition: ${currentWeather.weather[0].description}</p>
            <h4>3-Day Forecast</h4>
            <ul>
                ${data.list.slice(1, 4).map(day => `
                    <li>${new Date(day.dt_txt).toLocaleDateString()}: ${day.main.temp}°C</li>
                `).join('')}
            </ul>
        `;
    }

    async function getSpotlights() {
        try {
            const response = await fetch('data/members.json');
            const members = await response.json();
            const spotlightMembers = members.filter(member => member.membership_level >= 2); // Silver or Gold
            displaySpotlights(randomizeSpotlights(spotlightMembers));
        } catch (error) {
            console.error('Error fetching member data:', error);
        }
    }

    function randomizeSpotlights(members) {
        return members.sort(() => 0.5 - Math.random()).slice(0, 3);
    }

    function displaySpotlights(members) {
        const spotlightsContainer = document.getElementById('spotlights');
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

    // Run homepage features
    document.addEventListener('DOMContentLoaded', () => {
        getWeather();
        getSpotlights();
    });
}

// Functions specific to Directory Page
if (currentPage === "directory.html") {
    document.addEventListener("DOMContentLoaded", () => {
        const directoryContainer = document.getElementById("directory-container");
        const gridViewBtn = document.getElementById("grid-view");
        const listViewBtn = document.getElementById("list-view");

        async function getMembers() {
            try {
                const response = await fetch("data/members.json");
                const members = await response.json();
                displayMembers(members);
            } catch (error) {
                console.error('Error fetching member data:', error);
            }
        }

        function displayMembers(members) {
            directoryContainer.innerHTML = ""; // Clear previous content

            members.forEach(member => {
                const memberCard = document.createElement('div');
                memberCard.classList.add('member-card');
                memberCard.innerHTML = `
                    <img src="images/${member.images}" alt="${member.name}">
                    <h3>${member.name}</h3>
                    <p>Address: ${member.address}</p>
                    <p>Phone: ${member.phone}</p>
                    <p>Website: <a href="${member.website}" target="_blank">${member.website}</a></p>
                    <p>Membership Level: ${member.membership_level === 1 ? 'Member' : member.membership_level === 2 ? 'Silver' : 'Gold'}</p>
                    <p>${member.additional_info}</p>
                `;
                directoryContainer.appendChild(memberCard);
            });
        }

        gridViewBtn.addEventListener('click', () => {
            directoryContainer.classList.add('grid-view');
            directoryContainer.classList.remove('list-view');
        });

        listViewBtn.addEventListener('click', () => {
            directoryContainer.classList.add('list-view');
            directoryContainer.classList.remove('grid-view');
        });

        // Run directory feature
        getMembers();
    });
}
