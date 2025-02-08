document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("year").textContent = new Date().getFullYear();
    document.getElementById("last-modified").textContent = document.lastModified;
});

const menuButton = document.getElementById('menu');
const header = document.querySelector('header');

menuButton.addEventListener('click', () => {
    header.classList.toggle('show-nav');
});

document.addEventListener("DOMContentLoaded", () => {
    const directoryContainer = document.getElementById("directory-container");
    const gridViewBtn = document.getElementById("grid-view");
    const listViewBtn = document.getElementById("list-view");

    // Use a single fetch method to get members
    async function getMembers() {
        try {
            const response = await fetch("data/members.json");
            const members = await response.json();
            displayMembers(members);
        } catch (error) {
            console.error('Error fetching member data:', error);
        }
    }

    // Display members in grid or list format
    function displayMembers(members) {
        directoryContainer.innerHTML = ""; // Clear any previous content

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

    // Toggle between grid and list views
    gridViewBtn.addEventListener('click', () => {
        directoryContainer.classList.add('grid-view');
        directoryContainer.classList.remove('list-view');
    });

    listViewBtn.addEventListener('click', () => {
        directoryContainer.classList.add('list-view');
        directoryContainer.classList.remove('grid-view');
    });

    // Initialize the page
    getMembers();
});