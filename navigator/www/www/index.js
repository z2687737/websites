//websites/btf/www/index.js  ==>  index.html


//synchronise

//Handling Offline Mode:
//Ensure that your application checks if there's internet connectivity 
//(navigator.onLine) to determine whether to save data locally 
//or submit it directly to the server.


//Front End


    // Function to save form data to localStorage
    function saveFormData(event) {
        event.preventDefault(); // Prevent form submission

        // Collect form data
        let formData = {
            reporterName: document.getElementById('reporterName').value,
            reporterContact: document.getElementById('reporterContact').value,
            dateTimePicker: document.getElementById('dateTimePicker').value,
            decDist: document.getElementById('decDist').value,
            // Add other form fields as needed
        };

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



/*OThER AREAS TO CONSIDER

Validate form inputs to ensure data integrity.
Encrypt sensitive data before storing locally.
Handle updates or deletions of saved data as per your application's requirements.
*/

//Back End

//fetch case report form input from index.html send to server.js

document.getElementById('caseReport').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = {
        caseType: document.getElementById('caseType').value,
        caseDescription: document.getElementById('caseDescription').value,
        dateOfEvent: document.getElementById('dateOfEvent').value,
        locationOfEvent: document.getElementById('locationOfEvent').value,
        // Add other form fields here
        decDist: document.getElementById('decDist').value,
        campsites: document.getElementById('campsites').value,
        issueType: document.getElementById('issueType').value,
        issuetypeoptions: document.getElementById('issuetypeoptions').value,
        problem: document.getElementById('problem').value,
        severity: document.getElementById('severity').value,
        frequency: document.getElementById('frequency').value,
        emailDEC: document.getElementById('emailDEC').value,
        issueDescription: document.getElementById('issueDescription').value,
        latitude: document.getElementById('latitude').value,
        longitude: document.getElementById('longitude').value,
        photo: document.getElementById('photo').value,
        reporterName: document.getElementById('reporterName').value,
        reporterContact: document.getElementById('reporterContact').value,
        created_at: new Date().toISOString()
    };

    fetch('/casereport', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert('Case report submitted successfully!');
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to submit case report');
    });
});
