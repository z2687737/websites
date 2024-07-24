//www/js/loginLanding.js 


/* 
Paste on html:
any place after <body> 
<!-- This is where the "Hello loginUserName" will appear -->
<div id="userHeader" style="text-align: left;">  </div

right before </body>
 <script src="../js/loginLanding.js" defer></script> 



//on loginLanding.js
document.addEventListener('DOMContentLoaded', () => {

// Retrieve user data from localStorage
        const userData = JSON.parse(localStorage.getItem('userData'));

// Check if userData exists and contains necessary properties
    if (userData && userData.loginUserName && userData.IDregistration && userData.role && userData.aVolHours) {
        const userHeader = document.getElementById('userHeader');

// Display user information in the userHeader element
      userHeader.innerHTML = `<p>Hello, ${userData.loginUserName}! ID: ${userData.IDregistration}, Role: ${userData.role}, Volunteer Hours: ${userData.aVolHours}</p>`;
    } else {
        // Handle case where userData is not found or incomplete
        console.error('User data not found or incomplete.');
    }
});

*/


/* line 18 
  <div id="userHeader" style="text-align: left;">  </div>
  <!-- This is where the "Hello loginUserName" will appear -->
*/

/* (1) Display user data from localStorage  */
document.addEventListener('DOMContentLoaded', () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData && userData.userName) {
        const userHeader = document.getElementById('userHeader');
        userHeader.innerHTML = `<p>Hello, ${userData.userName}!</p>`;
    }

  /* (2)  Load content based on user selection  */
// (3) loading different page for different selection on the left tab.
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

/*  (3) Fetch reports and report details  */
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



/* (4) Fetch the last registration */

document.addEventListener('DOMContentLoaded', function() {
    const lastRegistrationButton = document.querySelector('button[onclick="loadContent(\'lastRegistrtion\')"]');
    if (lastRegistrationButton) {
        lastRegistrationButton.addEventListener('click', function(event) {
            event.preventDefault();
            fetchLastRegistration();
        });
    }
});

function fetchLastRegistration() {
    fetch('/api/lastRegistration')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                displayLastRegistration(data.data);
            } else {
                console.error('Failed to fetch last registration:', data.message);
            }
        })
        .catch(error => console.error('Error fetching last registration:', error));
}

function displayLastRegistration(registration) {
    const displayArea = document.getElementById('displayArea');
    displayArea.innerHTML = `
        <h2>Last Registration</h2>
        <p><strong>Username:</strong> ${registration.loginUserName}</p>
        <p><strong>Email:</strong> ${registration.eMail}</p>
        <p><strong>First Name:</strong> ${registration.fName}</p>
        <p><strong>Last Name:</strong> ${registration.lname}</p>
        <!-- Add more fields as needed -->
    `;
}
