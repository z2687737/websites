document.addEventListener("DOMContentLoaded', function(){
        const suburbSelect = document.getElementById('suburd');
        const streetSelect = document.getElementById('street');

        suburbSelect.addEventListener('change', function(){
                updateStreets(suburdSelect.value);
        });

function updateStreets(suburb) {
        // Clear current options
        streetSelect.innerHTML = '<option value="">Select a street</option>';

//Define streets for each suburb
const streets = {
        "Subiaco": ["Hay Street", "Rokeby Road"],
        "Fremantle": ["South Terrace", "High Street"],
        "Cottesloe": ["Marine Parade", "Napier Street"]
        // Add more streets for each suburb as needed
    };
        
        // Populate the street select box
        if (suburb && streets[suburb]) {
            streets[suburb].forEach(function (street) {
                const option = document.createElement('option');
                option.value = street;
                option.textContent = street;
                streetSelect.appendChild(option);
            });
        }
    }
});
