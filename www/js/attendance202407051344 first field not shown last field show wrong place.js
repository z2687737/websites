document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('attendance');

    const hardcodedUserName = 'Admin'; // Hardcoded for testing

    const userData = {
        userName: hardcodedUserName,
        IDregistration: 1, // Hardcoded ID for testing
        aVolHours: 0 // Hardcoded accumulated volunteer hours for testing
    };

    localStorage.setItem('userData', JSON.stringify(userData));

    // Display accumulated volunteer hours on page load
    document.getElementById('aVolHoursPrevious').value = userData.aVolHours;

    // Form submission event listener, validate ChkInDTS before chkOutDTS
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent form submission for now

        // Get values from form
        let chkInDTS = new Date(document.getElementById('chkInDTS').value);
        let chkOutDTS = new Date(document.getElementById('chkOutDTS').value);

        // Perform validation
        if (chkInDTS >= chkOutDTS) {
            alert('Check Out Date Time must be later than Check In Date Time.');
            return;
        }

        // Calculate volHours
        let volHours = calculateVolunteeredHours(chkInDTS, chkOutDTS);

        // Update volHours textarea
        document.getElementById('volHours').textContent = volHours;

        // Update aVolHours textarea if volHours is valid
        if (!isNaN(volHours)) {
            updateAccumulatedHours(volHours);
        }

        // Calculate new aVolHours
        let aVolHours = parseFloat(userData.aVolHours) + volHours;

        // Update accumulated hours display
        document.getElementById('aVolHours').value = aVolHours.toFixed(2);

        // Update user data in local storage
        userData.aVolHours = aVolHours;
        localStorage.setItem('userData', JSON.stringify(userData));

        // Prepare data for submission
        const data = {
            IDregistration: userData.IDregistration,
            chkInDTS: chkInDTS.toISOString(),
            chkOutDTS: chkOutDTS.toISOString(),
            volHours: volHours
        };

        // Submit attendance data
        submitAttendanceForm(data);
    });
});

function calculateVolunteeredHours(chkInDTS, chkOutDTS) {
    return (chkOutDTS - chkInDTS) / 3600000; // Convert milliseconds to hours
}

function updateAccumulatedHours(volHours) {
    const aVolHoursElement = document.getElementById('aVolHours');
    const currentHours = parseFloat(aVolHoursElement.value) || 0;
    aVolHoursElement.value = (currentHours + volHours).toFixed(2);
}

function submitAttendanceForm(data) {
    fetch('/api/submitAttendance', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        if (result.error) {
            alert('Error recording attendance: ' + result.error);
        } else {
            alert('Attendance recorded successfully');
        }
    })
    .catch(error => {
        console.error('Error submitting attendance:', error);
        alert('Error recording attendance. Please try again.');
    });
}
