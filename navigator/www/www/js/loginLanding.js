//www/js/loginLanding.js 

document.addEventListener('DOMContentLoaded', () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData && userData.userName) {
        const userHeader = document.getElementById('userHeader');
        userHeader.innerHTML = `<p>Hello, ${userData.userName}!</p>`;
    }

    document.querySelectorAll('[data-section]').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const section = event.target.getAttribute('data-section');
            loadContent(section);
        });
    });
});

function loadContent(section) {
    let content = '';
    switch(section) {
        case 'volunteerProfile':
            content = '<h2>Volunteer Profile</h2><p>Here you can view and edit the volunteer profile.</p>';
            break;
        case 'attendanceInfo':
            content = '<h2>Attendance Information</h2><p>Here you can view and edit attendance information.</p>';
            break;
        case 'maintenanceReport':
            content = '<h2>Track Maintenance Report</h2><p>Here you can view and edit the track maintenance report.</p>';
            break;
        case 'contactUs':
            content = '<h2>Contact Us</h2><p>Here you can view the contact information.</p>';
            break;
        default:
            content = '<p>Welcome! Please select an option from the navigation menu.</p>';
    }
    document.getElementById('displayArea').innerHTML = content;
}


//trackMaintenance.js serverRouteReports.js

async function fetchReports() {
    const response = await fetch('/api/reports');
    const reports = await response.json();
    const reportList = document.getElementById('reportList');
    reportList.innerHTML = '';

    reports.forEach(report => {
        const listItem = document.createElement('li');
        listItem.textContent = `ID: ${report.IDcasereport}, Date: ${report.created_at}`;
        listItem.addEventListener('click', () => fetchReportDetails(report.IDcasereport));
        reportList.appendChild(listItem);
    });
}

async function fetchReportDetails(reportId) {
    const response = await fetch(`/api/report/${reportId}`);
    const report = await response.json();
    const reportDetails = document.getElementById('reportDetails');
    reportDetails.innerHTML = `
        <p>ID: ${report.IDcasereport}</p>
        <p>Name: ${report.reporterName}</p>
        <p>Contact: ${report.reporterContact}</p>
        <p>Email: ${report.reporterEmailAddress}</p>
        <p>Issue Type: ${report.issueType}</p>
        <p>Description: ${report.issueDescription}</p>
        <p>Created At: ${report.created_at}</p>
    `;
}

document.addEventListener('DOMContentLoaded', fetchReports);