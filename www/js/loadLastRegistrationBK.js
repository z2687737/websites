console.log('loadLastRegistration.js');


document.addEventListener('DOMContentLoaded', function() {
    const lastRegistrationButton = document.querySelector('button[onclick="loadContent(\'lastRegistration\')"]');
    if (lastRegistrationButton) {
        lastRegistrationButton.addEventListener('click', function(event) {
            event.preventDefault();
            fetchLastRegistration();
        });
    }
});


function loadLastRegistration() {
    fetch('/lastRegistration')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const details = data.data;
                let detailHtml = '<h3>Last Registration Details</h3>';
                for (const key in details) {
                    if (details.hasOwnProperty(key)) {
                        detailHtml += `<p><strong>${key}:</strong> ${details[key]}</p>`;
                    }
                }
                document.getElementById('lastRegistrationDetails').innerHTML = detailHtml;
            } else {
                document.getElementById('lastRegistrationDetails').innerHTML = '<p>No registration data found.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching last registration:', error);
            document.getElementById('lastRegistrationDetails').innerHTML = '<p>Error fetching data.</p>';
        });
}