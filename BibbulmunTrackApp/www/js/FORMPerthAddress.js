
    const streets = {
        "Subiaco": ["Hay Street", "Rokeby Road"],
        "Fremantle": ["South Terrace", "High Street"],
        "Cottesloe": ["Marine Parade", "Napier Street"]
        // Add more streets for each suburb as needed
    };

    function updateStreets() {

        const suburbSelect = document.getElementById('suburb');
console.log("The function is being called when you select a suburb.")
        
        const streetSelect = document.getElementById('street');
console.log("The streets object is correctly defined and accessible.")
        
        const selectedSuburb = suburbSelect.value;

        // Clear current street options
        streetSelect.innerHTML = '<option value="">Select a street</option>';

        if (streets[selectedSuburb]) {
            streets[selectedSuburb].forEach(street => {
                const option = document.createElement('option');
                option.value = street;
                option.textContent = street;
                streetSelect.appendChild(option);
console.log("The streetSelect dropdown is correctly identified and updated with options based on the selected suburb.")
                
            });
        }
    }

