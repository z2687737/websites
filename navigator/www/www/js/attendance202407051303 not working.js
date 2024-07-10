//  www/btf/js/attendance.js

//event listener: display accumulated volunteered hours, call function submitAttendanceForm();
document.addEventListener('DOMContentLoaded', function () {

    // Fetch and display accumulated volunteered hours
         fetchAccumulatedHours();

    const userData = JSON.parse(localStorage.getItem('userData'));

    // Display aVolHoursPrevious at first field of attendance.html

    });

// Form submission event listener, validate ChkInDTS before chkOutDTS, 
document.getElementById('attendance').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission for now

    // Get values from form
    let chkInDTS = new Date(document.getElementById('chkInDTS').value);
    let chkOutDTS = new Date(document.getElementById('chkOutDTS').value);

    // Perform validation
    if (chkInDTS >= chkOutDTS) {
        alert('Check Out Date Time must be later than Check In Date Time.');
        window.location.href = '../index.html'; // Redirect to index.html on validation failure
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
        aVolHours = aVolHoursPrevious = volHours 

    //update new aVolHours to register/aVolHours;

    //update new aVolHours to attendance/aVolHours;

    // Submit the form
        submitAttendanceForm();
});

    /*
    if (!userData || !userData.IDregistration) {
        alert('User ID not found. Please log in again.');
        window.location.href = '../html/login.html'; // Redirect to login page if user ID is not found
        return;
    }
*/
    const IDregistration = userData.IDregistration;
    const aVolHoursPrevious = userData.aVolHours;

    // Display accumulated volunteer hours on page load
    document.getElementById('aVolHours').value = aVolHoursPrevious;

    const form = document.getElementById('attendance');
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const chkInDTS = document.getElementById('chkInDTS').value;
        const chkOutDTS = document.getElementById('chkOutDTS').value;



function fetchAccumulatedHours() {
    // Fetch request to get accumulated hours
    fetch('/register/aVolHours') // Adjust endpoint as per your backend
        .then(response => response.json())
        .then(data => {
            // Update aVolHours textarea (first line in attendance) with fetched accumulated hours
            document.getElementById('aVolHours').textContent = data.aVolHours;
        })
        .catch(error => {
            console.error('Error fetching accumulated hours:', error);
        });
}

function submitAttendanceForm() {
    // Get values from form
    const chkInDTS = document.getElementById('chkInDTS').value;
    const chkOutDTS = document.getElementById('chkOutDTS').value;
    const data = { chkInDTS, chkOutDTS };

    // Submit form data to backend
    fetch('/attendance/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        // Update form fields with returned data if needed
        document.getElementById('volHours').value = data.volHours;
        document.getElementById('aVolHours').value = data.aVolHours;
    })
    .catch(error => {
        console.error('Error submitting attendance:', error);
    });
}







//BACKEND CONNECTION server.js to database.

        const data = {
            IDregistration: IDregistration,
            chkInDTS: chkInDTS,
            chkOutDTS: chkOutDTS
        };

        fetch('/api/submitAttendance', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            if (result.volHours !== undefined) {
                const volHours = result.volHours;
                document.getElementById('volHours').value = volHours;
                const newAccumulatedHours = parseFloat(aVolHoursPrevious) + parseFloat(volHours);
                document.getElementById('aVolHours').value = newAccumulatedHours;

                // Update aVolHours in localStorage
                userData.aVolHours = newAccumulatedHours;
                localStorage.setItem('userData', JSON.stringify(userData));
            } else {
                alert('Error recording attendance: ' + result.error);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error recording attendance. Please try again.');
        });
    });

