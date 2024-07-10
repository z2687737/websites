console.log(" loaded websites/btf/www/js/caseReport.js ");

/*The DOMContentLoaded event listener 
ensures the script executes when the DOM is fully loaded.*/
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('caseReport');

/*
The submit event listener on the caseReport form 
prevents the default form submission behavior 
and collects all form data into a FormData object.
*/
    form.addEventListener('submit', function (event) {
        event.preventDefault();

/*
Data Handling: 
The form data is serialized into 
a JavaScript object (data) and 
sent to the server 
using fetch() in JSON format.
*/

        const formData = new FormData(form);
        const data = {
            IDlogin: formData.get('IDlogin'),
            reporterName: formData.get('reporterName'),
            reporterContact: formData.get('reporterContact'),
            reporterEmailAddress: formData.get('reporterEmailAddress'),
            dateTimePicker: formData.get('dateTimePicker'),
            decDist: formData.get('decDist'),
            campsite: formData.get('campsite'),
            issueType: formData.get('issueType'),
            issuetypeoptions: formData.get('issuetypeoptions'),
            problem: formData.get('problem'),
            severity: formData.get('severity'),
            frequency: formData.get('frequency'),
            emailDEC: formData.get('emailDEC'),
            issueDescription: formData.get('issueDescription'),
            latitude: formData.get('latitude'),
            longitude: formData.get('longitude'),
            photo: formData.get('photo'),
            video: formData.get('video'),
            created_at: formData.get('created_at')
        };

        fetch('/api/caseReport', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(result => {
            console.log(result);
            alert('Case Report - Submitted successfully');
            window.location.href = '../index.html';
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Case Report submission failed!');
        });
/*
Email Selection Logic: 
When emailDEC is set to "yes", 
the script retrieves the selected decDist value from the form. 
It then uses an object (emailAddresses) 
to map decDist values to corresponding email addresses.
*/
        if (formData.get('emailDEC') === 'yes') {
            const decDistrict = formData.get('decDist');
            const emailAddresses = {
                albany: 'albany@AlbanyDECDist.com',
                blackwood: 'blackwood@BlackwoodDECDist.com',
                dManjimup: 'dManjimup@DonnellyManjimupDECDist.com',
                dPemberton: 'dPemberton@DonnellyPembertonDECDist.com',
                frankland: 'frankland@FranklandDECDist.com',
                perthHillsDwellingup: 'perthHillsDwellingup@Perth HillsDwellingupDECDist.com',
                perthHillsMundaring: 'perthHillsMundaring@Perth HillsMundaringDECDist.com',
                wellington: 'wellington@WellingtonDECDist.com'
            };
/*
Email Sending: 
The selected email address (to) is dynamically set 
based on the decDist value selected by the user.
*/
            const emailData = {
                from: formData.get('reporterEmailAddress'),
                to: emailAddresses[decDistrict],
                subject: 'Case Report Form Submission',
                text: `Name: ${formData.get('decDist')}\nEmail: ${formData.get('reporterEmailAddress')}\nSubject: Case Report\nMessage: ${formData.get('issueDescription')}`
            };

            fetch('/api/emailCaseReport', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(emailData)
            })
            .then(response => response.json())
            .then(result => {
                console.log(result);
                alert('Case Report - Email DEC District sent successfully');
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Case Report email failed!');
            });
        }
    });
});

// Function to save caseReport data to localStorage

/*
Offline Storage: 
saveReportOffline() saves form data to localStorage as a JSON string.
 */

function saveReportOffline() {
    const formData = new FormData(document.getElementById('caseReport'));
    const data = {};

    formData.forEach((value, key) => {
        data[key] = value;
    });

    localStorage.setItem('caseReportData', JSON.stringify(data));
    alert('Form data saved locally!');
}


//  function to retrieve saved data
function retrieveSavedData() {
    let savedData = localStorage.getItem('formData');
    if (savedData) {
        let formData = JSON.parse(savedData);
        // Use formData as needed, e.g., send to server
    }
}


// Function to sync data when online
/*
 Data Sync: 
 syncDataOnline() retrieves form data from localStorage, 
 sends it to the server via fetch(), 
 and removes it from localStorage upon successful sync.
 */

function syncDataOnline() {
    const formData = JSON.parse(localStorage.getItem('formData'));

    if (formData) {
        const data = new FormData();
        data.append('photo', formData.photo);
        data.append('video', formData.video);
        // Append other fields to data as needed

        fetch('/saveReport', {
            method: 'POST',
            body: data
        })
        .then(response => response.json())
        .then(data => {
            alert('Report synced successfully');
            localStorage.removeItem('formData');
        })
        .catch(error => console.error('Error syncing data:', error));
    } else {
        alert('No report data found to sync');
    }
}

document.getElementById('syncData').addEventListener('click', syncDataOnline);


/*
Email Functionality: The email functionality checks if emailDEC is 'yes' and sends an email with relevant form data to a specified endpoint.
Event Listeners: syncDataOnline is attached to the syncData button for online synchronization.
*/
