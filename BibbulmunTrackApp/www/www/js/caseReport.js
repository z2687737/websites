console.log( " websites/btf/www/js/CaseReport.js " );

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
        const severity = document.getElementById('severity').value.trim();        const emailCheckbox = document.getElementById('emailDecDist').checked;
        const frequency = document.getElementById('frequency').value.trim();
        const emailDEC = document.getElementById('emailDEC').value.trim();
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

        if (emailCheckbox) {
            const emailData = {
                from: email,
                to: 'decDist@example.com',
                subject: 'Case Report Form Submission',
                text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`
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
                alert('Case Report - Email sent successfully');
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Case Report email failed!');
            });
        }
    });
});

