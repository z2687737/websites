console.log("websites/btf/www/js/attendance.js");

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('attendanceForm');


/* ===== working on saving to database=========== 
===== get data from serverRouteLogin.js =========== 
===== cookie of aVolHourPrevious did not clear upon logout =========== 
===== it should be replaced 
by the transfer of new aVolHoursPrevious from serverRouteLogin.js =========== 
 ==============  
 without releaseing this hardcoded codes, the Submit button has no response.
 */
const hardcodedUserName = 'A'; // Hardcoded for testing
    const userData = {
        userName: hardcodedUserName,
        IDregistration: 1, // Hardcoded ID for testing
        aVolHours: 3,
        aVolHoursPrevious: 5 // Hardcoded accumulated volunteer hours for testing
    };

/* Retrieve user data from localStorage 
here the userData comes from serverRouteAttendance.js 
which were retrieved from table registration after matching with the loginUserName*/

 const userData = JSON.parse(localStorage.getItem('userData'));

   if (userData) {
       // Display accumulated volunteer hours on page load
       document.getElementById('aVolHoursPrevious').value = userData.aVolHours;
   } else {
       alert('User data not found. Please log in again.');
       window.location.href = '/html/caseReport.html'; // Redirect to login page if user data is missing
       return; // Stop further execution
   }


//    localStorage.setItem('userData', JSON.stringify(userData));

    // Display accumulated volunteer hours on page load
 //   document.getElementById('aVolHoursPrevious').value = userData.aVolHours;

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

        // Update volHours textarea (4th field)
        document.getElementById('volHours').textContent = volHours;

        // Update aVolHours textarea if volHours is valid
        if (!isNaN(volHours)) {
            updateAccumulatedHours(volHours);  //see function below line 85
        }

        // Calculate new aVolHours
        let aVolHours = parseFloat(userData.aVolHours) + volHours;

        // Update accumulated hours display (5th field)
        document.getElementById('aVolHours').value = aVolHours.toFixed(2);
        
        // replace previous accumulated hours display (1st field)
        document.getElementById('aVolHoursPrevious').value = aVolHours.toFixed(2);

        // Update user data in local storage
        userData.aVolHours = aVolHours;
        localStorage.setItem('userData', JSON.stringify(userData));

        // Prepare data for submission
        const data = {
            IDregistration: userData.IDregistration,
            chkInDTS: chkInDTS.toISOString(),
            chkOutDTS: chkOutDTS.toISOString(),
            volHours: volHours,
            aVolHours: aVolHours
        };

// insert attendance data to database via serverRouteAttendance.js
        insertAttendance(data);
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

function insertAttendance(data) {
    fetch('/api/attendance', {
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
        console.error('attandance.js line 107 Error submitting attendance:', error);
        alert('attendance.js line 122 Error recording attendance. Please try again.');
    });
}
