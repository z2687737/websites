console.log( " websites/btf/www/js/caseReport.js " );

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('caseReport');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const IDlogin = document.getElementById('IDlogin').checked;
        const reporterName = document.getElementById('reporterName').value.trim();
        const reporterContact = document.getElementById('reporterContact').value.trim();
        const dateTimePicker = document.getElementById('dateTimePicker').value.trim();
        const decDist = document.getElementById('decDist').value.trim();
        const campsite = document.getElementById('campsite').checked;
        const issueType = document.getElementById('issueType').value.trim();
        const issuetypeoptions = document.getElementById('issuetypeoptions').value.trim();
        const problem = document.getElementById('problem').value.trim();
        const severity = document.getElementById('severity').value.trim();        
        
        const frequency = document.getElementById('frequency').value.trim();
        const emailDEC = document.getElementById('emailDEC').value.trim();
//const emailCheckbox = document.getElementById('emailDecDist').checked;
        const issueDescription = document.getElementById('issueDescription').value.trim();
        const latitude = document.getElementById('latitude').value.trim();
        const longitude = document.getElementById('longitude').value.trim();

        const data = {
            IDlogin,
            reporterName,
            reporterContact,
            dateTimePicker,
            decDist,
            campsite,
            issueType,
            issuetypeoptions,
            problem,
            severity,
            
            frequency,
            emailDEC,
            issueDescription,
            latitude,
            longitude,
        };

        fetch('/api/caseReport', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
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

//if (emailCheckbox) {
 if (document.getElementById('emailDEC').value === 'yes') {
            const emailData = {
                from: email,
                to: 'decDist@example.com',
                subject: 'Case Report Form Submission',
                text: `Name: ${decDist}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`
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

function saveReportOffline() {
    const formData = new FormData(document.getElementById('caseReport'));
    const data = {};

    formData.forEach((value, key) => {
        data[key] = value;
    });

    localStorage.setItem('caseReportData', JSON.stringify(data));
    alert('Form data saved locally!');
}

/* duplicate ? */

    function saveFormData(event) {
        event.preventDefault(); // Prevent form submission

        // Collect form data
        let formData = {
            IDlogin: document.getElementById('IDlogin').value,
            reporterName: document.getElementById('reporterName').value,
            reporterContact: document.getElementById('reporterContact').value,
            dateTimePicker: document.getElementById('dateTimePicker').value,
            decDist: document.getElementById('decDist').value,

            campsite: document.getElementById('campsite').value,
            issueType: document.getElementById('issueType').value,
            issuetypeoptions: document.getElementById('issuetypeoptions').value,
            problem: document.getElementById('problem').value,
            severity: document.getElementById('severity').value,

            frequency: document.getElementById('frequency').value,
            emailDEC: document.getElementById('emailDEC').value,
            issueDescription: document.getElementById('issueDescription').value,
            latitude: document.getElementById('latitude').value,
            longitude: document.getElementById('longitude').value,

// Collect all the form data
        photo: document.getElementById('photoInput').files[0],
        video: document.getElementById('videoInput').files[0],

            created_at: document.getElementById('created_at').value,

            // Add other form fields as needed
        };

/* duplicate?
 Store the data in local storage
    localStorage.setItem('reportData', JSON.stringify(reportData));
    alert('Report saved offline');
*/
        // Convert data to JSON string
        let jsonData = JSON.stringify(formData);

        // Save data to localStorage
        localStorage.setItem('formData', jsonData);

        // Optional: Provide feedback to the user
        alert('Form data saved locally!');

        // Clear the form fields if needed
        document.getElementById('caseReport').reset();
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
function syncDataOnline() {
    const reportData = JSON.parse(localStorage.getItem('reportData'));

    if (reportData) {
        const formData = new FormData();
        formData.append('photo', reportData.photo);
        formData.append('video', reportData.video);
        // Append other fields to formData

        fetch('/saveReport', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            alert('Report synced successfully');
            localStorage.removeItem('reportData');
        })
        .catch(error => console.error('Error syncing data:', error));
    } else {
        alert('No report data found to sync');
    }
}

document.getElementById('syncData').addEventListener('click', syncDataOnline);




