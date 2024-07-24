console.log("websites/btf/www/js/testForm.js");

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('testForm');
   const loginUserName = document.getElementById('loginForm');

/* ===== working on saving to database=========== 
===== get data from serverRouteLogin.js =========== 
===== cookie of aVolHourPrevious did not clear upon logout =========== 
===== it should be replaced 
by the transfer of new aVolHoursPrevious from serverRouteLogin.js =========== 
if you remove the hardcoded, the submit button has no response.
 ==============  */
 
// Hardcoded for testing
const hardcodedUserName = 'A'; 
    const userData = {
        userName: hardcodedUserName,
        IDregistration: 1, // Hardcoded ID for testing
        loginUserName: 
        tVolHours: 3,
        taVolHours: 1, // Hardcoded accumulated volunteer hours for testing
        taVolHoursPrevious: 20 // Hardcoded accumulated volunteer hours for testing
    };

// Form submission event listener, validate ChkInDTS before chkOutDTS
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent form submission for now

        /* Get values from form*/
        let chkInDTS = new Date(document.getElementById('chkInDTS').value);
        let chkOutDTS = new Date(document.getElementById('chkOutDTS').value);

/*Perform validation*/
        if (tchkInDTS >= tchkOutDTS) {
            alert('Check Out Date Time must be later than Check In Date Time.');
            return;
        }


/* Prepare data for submission*
Submitting attendance line 107 */ 

const  IDregistration = IDregistration;
const loginUserName = document.getElementById('loginUserName').value;
const  chkInDTS = document.getElementById('tchkInDTS').value;
const  chkOutDTS = document.getElementById('tchkOutDTS').value;
const  volHours = document.getElementById('tvolHours').value;
const  aVolHours = document.getElementById('tatVolHours').value;

fetch('/api/testForm', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(
        IDregistration,
        loginUserName,
        chkInDTS,
        chkOutDTS,
        volHours,
        aVolHours        
    )
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
    alert('testForm.js line 122 Computation ok. Error recording attendance. Please submit one more time to observe the change on the first accumulated v hours field. debugging otw...');
});

    });
});