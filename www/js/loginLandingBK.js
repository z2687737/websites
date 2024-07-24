document.addEventListener('DOMContentLoaded', () => {
    // Display user data from localStorage
    displayUserData();

    // Setup content loading based on user selection
    setupContentLoading();

    // Fetch and display reports
    fetchReports();

    // Setup fetching last registration on button click
    setupLastRegistrationButton();
});

function displayUserData() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData && userData.loginUserName) {
        const userHeader = document.getElementById('userHeader');
        userHeader.innerHTML = `<p>Hello, ${userData.loginUserName}! ID: ${userData.IDregistration}, Role: ${userData.role}, Volunteer Hours: ${userData.aVolHours}</p>`;
    } else {
        console.error('User data not found or incomplete.');
    }
}

function setupContentLoading() {
    document.querySelectorAll('[data-section]').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const section = event.target.getAttribute('data-section');
            loadContent(section);
        });
    });
}

function loadContent(section) {
    let content = '';
    switch (section) {
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

async function fetchReports() {
    try {
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
    } catch (error) {
        console.error('Error fetching reports:', error);
    }
}

async function fetchReportDetails(reportId) {
    try {
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
    } catch (error) {
        console.error('Error fetching report details:', error);
    }
}

function setupLastRegistrationButton() {
    const lastRegistrationButton = document.querySelector('button[onclick="loadContent(\'lastRegistration\')"]');
    if (lastRegistrationButton) {
        lastRegistrationButton.addEventListener('click', (event) => {
            event.preventDefault();
            fetchLastRegistration();
        });
    }
}

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
