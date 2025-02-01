document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("last-modified").textContent = document.lastModified;


document.addEventListener("DOMContentLoaded", () => {
    const directoryContainer = document.getElementById("directory-container");
    const gridViewBtn = document.getElementById("grid-view");
    const listViewBtn = document.getElementById("list-view");

    async function fetchBusinesses() {
        const response = await fetch("members.json");
        const businesses = await response.json();
        displayBusinesses(businesses);
    }

    function displayBusinesses(businesses) {
        directoryContainer.innerHTML = "";
        businesses.forEach(business => {
            const card = document.createElement("div");
            card.classList.add("business-card");
            card.innerHTML = `
                <img src="${business.image}" alt="${business.name}">
                <h3>${business.name}</h3>
                <p>${business.address}</p>
                <p>${business.phone}</p>
                <a href="${business.website}" target="_blank">Visit Website</a>
            `;
            directoryContainer.appendChild(card);
        });
    }

    gridViewBtn.addEventListener("click", () => directoryContainer.classList.add("grid"));
    listViewBtn.addEventListener("click", () => directoryContainer.classList.remove("grid"));

    fetchBusinesses();
});
