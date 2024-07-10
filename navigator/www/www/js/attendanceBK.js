console.log('loaded websites/btf/www/js/attendance.js');

// Handle attendance form submission
document.getElementById('attendanceForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData || !userData.IDregistration) {
        alert('attendance.js line 20 User not found. Please log in again.');
        window.location.href = '../html/login.html';
        return;
    }

    const chkInDTS = new Date(document.getElementById('chkInDTS').value);
    const chkOutDTS = new Date(document.getElementById('chkOutDTS').value);

    if (chkInDTS >= chkOutDTS) {
        alert('Check Out Date Time must be later than Check In Date Time.');
        return;
    }

    const volHours = calculateVolunteeredHours(chkInDTS, chkOutDTS);
    const aVolHours = volHours + parseFloat(userData.aVolHours);

    document.getElementById('volHours').value = volHours.toFixed(2);
    document.getElementById('aVolHours').value = aVolHours.toFixed(2);

    updateAccumulatedHours(userData.IDregistration, aVolHours)
        .then(() => addAttendanceRecord(userData.IDregistration, chkInDTS, chkOutDTS, volHours, aVolHours))
        .then(() => {
            alert('Attendance recorded successfully');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to record attendance');
        });
});

function calculateVolunteeredHours(chkInDTS, chkOutDTS) {
    const diff = chkOutDTS - chkInDTS;
    const hours = diff / (1000 * 60 * 60);
    return Math.max(0, hours); // Ensure non-negative
}

function updateAccumulatedHours(IDregistration, aVolHours) {
    return fetch(`/api/updateUserHours/${IDregistration}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ aVolHours })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to update user hours');
        }
        return response.json();
    });
}

function addAttendanceRecord(IDregistration, chkInDTS, chkOutDTS, volHours, aVolHours) {
    const attendanceData = {
        IDregistration,
        chkInDTS: chkInDTS.toISOString().slice(0, 19).replace('T', ' '),
        chkOutDTS: chkOutDTS.toISOString().slice(0, 19).replace('T', ' '),
        volHours,
        aVolHours
    };

    return fetch('/api/addAttendance', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(attendanceData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to add attendance record');
        }
        return response.json();
    });
}


// Function to handle post-login actions
// Fetch and display accumulated volunteered hours on page load
function handlePostLogin() {
    // Execute this block only if user is logged in
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData && userData.IDregistration) {
        // Fetch and display accumulated volunteered hours on page load
        document.getElementById('aVolHoursPrevious').value = userData.aVolHours;
    } else {
        // Handle case where user data is not found
        alert('User not found. Please log in again.');
        window.location.href = '../html/login.html'; // Redirect to login page if user data is not found
    }
}

// Call handlePostLogin after DOM content is loaded
document.addEventListener('DOMContentLoaded', handlePostLogin);