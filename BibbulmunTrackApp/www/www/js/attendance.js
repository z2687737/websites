// websites/btf/www/js/attendance.js

/* Fetch and display accumulated volunteered hours 
on attendance.html's first field <div id="aVolHoursPrevious">
when the page load */

document.addEventListener('DOMContentLoaded', function () {

    await fetchAccumulatedHours();

    // Display aVolHoursPrevious at the first field of attendance.html
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData && userData.IDregistration) {
        const aVolHoursPrevious = userData.aVolHours;
        document.getElementById('aVolHoursPrevious').value = aVolHoursPrevious;
    } else {
        alert('User not found. Please log in again.');
        window.location.href = '../html/login.html';
    }
});


//Display of aVolHours After Form Submission
/*CLLICK Submit Button, 
here handles form submission (attendance form). 
server calculate volHours, 
updates attendance.html > aVolHours input (5th/last) field. 
*/ 

document.getElementById('attendance').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission for now

    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData || !userData.IDregistration) {
        alert('User not found. Please log in again.');
        window.location.href = '../html/login.html';
        return;
    }

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
    document.getElementById('volHours').value = volHours;

    // Update aVolHours textarea if volHours is valid
    if (!isNaN(volHours)) {
        updateAccumulatedHours(volHours);
    }

    // Submit the form
    submitAttendanceForm();
});

//Fetch Accumulated Hours from the Backend

/* 
This function fetches the accumulated hours (aVolHours) 
from the backend (/register/aVolHours) 
based on the user's IDregistration and 
updates the aVolHoursPrevious input field.
 */

async function fetchAccumulatedHours() {
    try {
        // Fetch data from backend API
        const response = await fetch('/api/getAccumulatedHours/:IDregistration');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // Store data in localStorage or handle as needed
        localStorage.setItem('userData', JSON.stringify(data));
    } catch (error) {
        console.error('Error fetching accumulated hours:', error);
        // Handle error gracefully
    }
}



/*
function fetchAccumulatedHours() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData || !userData.IDregistration) {
        alert('User not found. Please log in again.');
        window.location.href = '../html/login.html';
        return;
    }

    fetch('/register/aVolHours?IDregistration=' + userData.IDregistration)
        .then(response => response.json())
        .then(data => {
            document.getElementById('aVolHoursPrevious').value = data.aVolHours;
        })
        .catch(error => {
            console.error('Error fetching accumulated hours:', error);
        });
}

*/


// Correct Display of aVolHours on attendance.html

/* 
This function submits the attendance form data 
to server.js > /attendance/submit endpoint on the server, 
updates aVolHours on the form (aVolHours input field (last field)), 
and then updates userData in localStorage with the new aVolHours.
*/

function submitAttendanceForm() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const IDregistration = userData.IDregistration;
    const aVolHoursPrevious = parseFloat(userData.aVolHours);

    let chkInDTS = new Date(document.getElementById('chkInDTS').value).toISOString().slice(0, 19).replace('T', ' ');
    let chkOutDTS = new Date(document.getElementById('chkOutDTS').value).toISOString().slice(0, 19).replace('T', ' ');
    const volHours = parseFloat(document.getElementById('volHours').value);
    const aVolHours = aVolHoursPrevious + volHours;

    const data = { IDregistration, chkInDTS, chkOutDTS, volHours, aVolHours };


/* fetching server.js's ENDPOINT attendance/submit,
 at the end, to post on attendance.html aVolHours field
  and save aVolHours on localStorage */

    fetch('/attendance/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            document.getElementById('aVolHours').value = aVolHours;
            userData.aVolHours = aVolHours;
            localStorage.setItem('userData', JSON.stringify(userData));
        } else {
            alert('Error recording attendance: ' + result.error);
        }
    })
    .catch(error => {
        console.error('Error submitting attendance:', error);
        alert('Error recording attendance. Please try again.');
    });
}

function calculateVolunteeredHours(chkInDTS, chkOutDTS) {
    const diff = chkOutDTS - chkInDTS;
    const hours = diff / (1000 * 60 * 60);
    return Math.max(0, hours); // Ensure non-negative
}

function updateAccumulatedHours(volHours) {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
        const aVolHoursPrevious = parseFloat(userData.aVolHours) || 0;
        const aVolHours = aVolHoursPrevious + volHours;
        document.getElementById('aVolHours').value = aVolHours;
    }
}
