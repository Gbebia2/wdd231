const menuButton = document.getElementById('menu');
const header = document.querySelector('header');

menuButton.addEventListener('click', () => {
    header.classList.toggle('show-nav');
});

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("discover-container");

    // Fetch JSON data
    fetch("data/discover.json")
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                const card = document.createElement("div");
                card.classList.add("discover-card");

                const title = document.createElement("h2");
                title.textContent = item.name;

                const figure = document.createElement("figure");
                const img = document.createElement("img");
                img.src = item.image;
                img.alt = item.name;
                img.loading = "lazy";
                figure.appendChild(img);

                const address = document.createElement("address");
                address.textContent = item.address;

                const description = document.createElement("p");
                description.textContent = item.description;

                const button = document.createElement("button");
                button.textContent = "Learn More";
                button.addEventListener("click", () => {
                    window.open(item.link, "_blank");
                });

                card.append(title, figure, address, description, button);
                container.appendChild(card);
            });
        })
        .catch(error => console.error("Error fetching discover.json:", error));

    // LocalStorage Visitor Tracking
    const visitMessage = document.getElementById("visit-message");
    const lastVisit = localStorage.getItem("lastVisit");
    const currentDate = Date.now();

    if (!lastVisit) {
        visitMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const daysSinceLastVisit = Math.floor((currentDate - lastVisit) / (1000 * 60 * 60 * 24));
        if (daysSinceLastVisit < 1) {
            visitMessage.textContent = "Back so soon! Awesome!";
        } else {
            visitMessage.textContent = `You last visited ${daysSinceLastVisit} ${daysSinceLastVisit === 1 ? "day" : "days"} ago.`;
        }
    }

    localStorage.setItem("lastVisit", currentDate);
});
