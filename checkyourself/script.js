(function() {
    'use strict';

    const data = {
        january: 3,
        february: 2,
        march: 4,
        april: 2
    };

    const totalSlots = 10;

    function openOverlay(month) {
        const times = data[month];

        document.getElementById("overlay-month").textContent = month.charAt(0).toUpperCase() + month.slice(1);

        const stampCard = document.getElementById("stamp-card");
        stampCard.innerHTML = "";

        const card = document.createElement("div");
        card.classList.add("card-wrapper");

        const stampsContainer = document.createElement("div");
        stampsContainer.classList.add("stamps-container");

        for (let i = 1; i <= totalSlots; i++) {
            const slot = document.createElement("div");
            slot.classList.add("stamp-slot");

            if (i <= times) {
                const img = document.createElement("img");
                img.src = "images/froyo.png";
                img.alt = "froyo stamp";
                img.classList.add("stamp-img");
                slot.appendChild(img);
            }

            stampsContainer.appendChild(slot);
        }

        card.appendChild(stampsContainer);
        stampCard.appendChild(card);

        document.getElementById("overlay").classList.remove("hidden");
    }

    function closeOverlay() {
        document.getElementById("overlay").classList.add("hidden");
    }

    window.openOverlay = openOverlay;
    window.closeOverlay = closeOverlay;

})();