<script>
    const streets = {
        "Subiaco": ["Hay Street", "Rokeby Road"],
        "Fremantle": ["South Terrace", "High Street"],
        "Cottesloe": ["Marine Parade", "Napier Street"]
        // Add more streets for each suburb as needed
    };

    function updateStreets() {
        const suburbSelect = document.getElementById('suburb');
        const streetSelect = document.getElementById('street');
        const selectedSuburb = suburbSelect.value;

        // Clear current street options
        streetSelect.innerHTML = '<option value="">Select a street</option>';

        if (streets[selectedSuburb]) {
            streets[selectedSuburb].forEach(street => {
                const option = document.createElement('option');
                option.value = street;
                option.textContent = street;
                streetSelect.appendChild(option);
            });
        }
    }
</script>
