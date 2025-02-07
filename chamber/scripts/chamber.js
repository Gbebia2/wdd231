document.addEventListener('DOMContentLoaded', () => {
    // Footer: Update year and last modified date
    const yearElement = document.getElementById("year");
    const lastModifiedElement = document.getElementById("last-modified");
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    if (lastModifiedElement) {
        lastModifiedElement.textContent = document.lastModified;
    }

    // Mobile Menu Toggle
    const menuButton = document.getElementById('menu');
    const header = document.querySelector('header');
    if (menuButton && header) {
        menuButton.addEventListener('click', () => {
            header.classList.toggle('show-nav');
        });
    }

    // Detect current page
    const currentPage = window.location.pathname.split("/").pop();

    // Functions specific to Homepage
    if (currentPage === "index.html" || currentPage === "") {
        // Weather API Setup
        const apiKey = '310659e1bc63153e4206d2dbd5a6206b'; // Replace with your API key
        const weatherUrl = `http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=${apiKey}`;

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
            // ...existing code...
        }

        getWeather();
    }
});