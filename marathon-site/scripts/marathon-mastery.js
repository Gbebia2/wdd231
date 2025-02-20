document.addEventListener('DOMContentLoaded', () => {
    // Update the year
    document.getElementById("year").textContent = new Date().getFullYear();
    
    // Update the last modified date
    document.getElementById("last-modified").textContent = document.lastModified;
});


// Toggle navigation menu for mobile
const menuButton = document.getElementById('menu');
const header = document.querySelector('header');
menuButton.addEventListener('click', () => {
    header.classList.toggle('show-nav');
});