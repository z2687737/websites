/*formPerthAddress.js*/

/* formPerthAddress.js */

// Define streets for each suburb
const streets = {
    "Subiaco": ["Hay Street", "Rokeby Road"],
    "Fremantle": ["South Terrace", "High Street"],
    "Cottesloe": ["Marine Parade", "Napier Street"]
    // Add more streets for each suburb as needed
};

function updateStreets() {
    const suburbSelect = document.getElementById("suburb");
    const streetSelect = document.getElementById("street");
    const selectedSuburb = suburbSelect.value;

    // Clear current options in the street select
    streetSelect.innerHTML = '<option value="">Select a street</option>';

    // Populate streets based on selected suburb
    if (selectedSuburb && streets[selectedSuburb]) {
        streets[selectedSuburb].forEach(street => {
            const option = document.createElement("option");
            option.value = street;
            option.text = street;
            streetSelect.appendChild(option);
        });
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    const suburbSelect = document.getElementById('suburb');
    if (suburbSelect) {
        suburbSelect.addEventListener('change', updateStreets);
    }
});
