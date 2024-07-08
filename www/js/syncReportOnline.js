
// websites/btf/js/syncReportOnline.js

// Example function to sync reports online
function syncReportsOnline() {
    // Retrieve saved reports from localStorage
    let reports = JSON.parse(localStorage.getItem('reports')) || [];

    if (reports.length === 0) {
        alert("No reports to sync.");
        return;
    }

    // Send each report to the server
    reports.forEach(report => {
        fetch('/sync-report', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(report)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Report synced successfully");

                // Remove the synced report from localStorage
                reports = reports.filter(r => r.id !== report.id);
                localStorage.setItem('reports', JSON.stringify(reports));
            } else {
                alert("Failed to sync report");
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
}

// Example usage
syncReportsOnline();


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