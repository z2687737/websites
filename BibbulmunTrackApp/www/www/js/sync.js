
// websites/btf/js/sync.js

function saveReportOffline() {
    const reportData = {
        name: document.getElementById('reporterName').value,
        contact: document.getElementById('reporterContact').value,
        date: document.getElementById('dateTimePicker').value,
        decDist: document.getElementById('decDist').value,
        // Add other fields and photos/videos here
    };
    localStorage.setItem('offlineReport', JSON.stringify(reportData));
    alert('Report saved offline.');
}

function syncReportOnline() {
    const reportData = JSON.parse(localStorage.getItem('offlineReport'));
    if (reportData) {
        // Send data to server
        fetch('/submitReport', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reportData)
        })
        .then(response => response.json())
        .then(data => {
            if (document.getElementById('emailDEC').checked) {
                // Send email
                fetch('/sendEmail', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(reportData)
                })
                .then(response => response.json())
                .then(data => {
                    alert('Report submitted and email sent.');
                })
                .catch(error => console.error('Error sending email:', error));
            } else {
                alert('Report submitted.');
            }
        })
        .catch(error => console.error('Error submitting report:', error));
    } else {
        alert('No offline report found.');
    }
}