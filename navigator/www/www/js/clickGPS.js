//  www/js/clickGPS.js

//fetching coordinates 
//displaying a map
//map initialization

document.getElementById('getGPS').addEventListener('click', function() {
    console.log('Get GPS button clicked');
    // Functionality for getting GPS coordinates
    getGPS()
});

function getGPS() {
    if (navigator.geolocation) {
        console.log('Geolocation supported');
        navigator.geolocation.getCurrentPosition(showPosition, showError, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    console.log('Position obtained:', position);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    document.getElementById('latitude').value = latitude;
    document.getElementById('longitude').value = longitude;

    // Initialize the map
    const map = L.map('map').setView([latitude, longitude], 13);

    // Set up the tile layer (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add a marker
    L.marker([latitude, longitude]).addTo(map)
        .bindPopup('You are here.')
        .openPopup();
}

function showError(error) {
    console.log('Error obtaining position:', error);
    let errorMessage = '';

    switch (error.code) {
        case error.PERMISSION_DENIED:
            errorMessage = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            errorMessage = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            errorMessage = "An unknown error occurred.";
            break;
    }
    alert(errorMessage);
}
