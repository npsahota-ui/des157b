
function openOverlay(month) {
    document.getElementById("overlay-month").textContent = month.charAt(0).toUpperCase() + month.slice(1);

    document.getElementById("overlay").classList.remove("hidden");
}

function closeOverlay() {
    document.getElementById("overlay").classList.add("hidden");
}