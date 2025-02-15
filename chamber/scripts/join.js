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
    document.getElementById("timestamp").value = new Date().toISOString();
});

document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".learn-more");
    const modals = document.querySelectorAll(".modal");
    const closeButtons = document.querySelectorAll(".close");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const modalId = button.getAttribute("data-modal");
            document.getElementById(modalId).style.display = "block";
        });
    });

    closeButtons.forEach(close => {
        close.addEventListener("click", () => {
            close.parentElement.parentElement.style.display = "none";
        });
    });

    window.addEventListener("click", (event) => {
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    });
});

