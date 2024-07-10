console.log(" loaded websites/btf/www/js/trackMaintenance.js ");

document.addEventListener('DOMContentLoaded', function () {
    const trackMaintenanceLink = document.getElementById('trackMaintenanceReportLink');

    trackMaintenanceLink.addEventListener('click', function (event) {
        event.preventDefault();

        fetchReports(); // Fetch and display all reports initially

        // Optional: Implement click event for each report item to show details
        // Example: reportItem.addEventListener('click', function() { showReportDetails(reportId); });
    });
});

function fetchReports() {
    fetch('/api/reports') // Adjust URL endpoint as per your backend setup
        .then(response => response.json())
        .then(reports => {
            displayReports(reports);
        })
        .catch(error => {
            console.error('Error fetching reports:', error);
            alert('Failed to fetch reports. Please try again later.');
        });
}

function displayReports(reports) {
    const reportList = document.createElement('ul');
    reportList.classList.add('report-list');

    reports.forEach(report => {
        const reportItem = document.createElement('li');
        reportItem.classList.add('report-item');
        reportItem.textContent = `${report.IDcasereport} - ${report.created_at}`;

        reportItem.addEventListener('click', function() {
            showReportDetails(report);
        });

        reportList.appendChild(reportItem);
    });

    const reportDetails = document.getElementById('reportDetails');
    reportDetails.innerHTML = ''; // Clear previous content
    reportDetails.appendChild(reportList);
}

function showReportDetails(report) {
    const detailsContainer = document.createElement('div');
    detailsContainer.classList.add('report-details');

    // Construct details view for the selected report
    detailsContainer.innerHTML = `
        <h3>Report ID: ${report.IDcasereport}</h3>
        <p><strong>Date Created:</strong> ${report.created_at}</p>
        <p><strong>Name:</strong> ${report.reporterName}</p>
        <p><strong>Contact:</strong> ${report.reporterContact}</p>
        <p><strong>Email Address:</strong> ${report.reporterEmailAddress}</p>
        <p><strong>Issue Type:</strong> ${report.issueType}</p>
        <p><strong>Description:</strong> ${report.issueDescription}</p>
        <!-- Add more details as needed -->

        <hr>
        <a href="#" id="backToReports">Back to Reports</a>
    `;

    detailsContainer.querySelector('#backToReports').addEventListener('click', function(event) {
        event.preventDefault();
        fetchReports(); // Reload reports list on going back
    });

    const reportDetails = document.getElementById('reportDetails');
    reportDetails.innerHTML = ''; // Clear previous content
    reportDetails.appendChild(detailsContainer);
}
