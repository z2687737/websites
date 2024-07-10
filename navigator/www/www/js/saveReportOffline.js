
// websites/btf/js/sync.js


// Example function to save report offline
function saveReportOffline(reportData, photos, videos) {
    // Generate a unique ID for the report
    const reportId = Date.now(); // Use timestamp as a unique ID

    // Create an object to store the report data
    const report = {
        id: reportId,
        data: reportData,
        photos: photos,
        videos: videos,
        createdAt: new Date().toISOString()
    };

    // Retrieve existing reports from localStorage
    let reports = JSON.parse(localStorage.getItem('reports')) || [];

    // Add the new report to the list
    reports.push(report);

    // Save the updated reports list back to localStorage
    localStorage.setItem('reports', JSON.stringify(reports));

    alert("Report Saved Offline");
}


// Example usage
const reportData = {
    idLogin: 1,
    dateTimePicker: new Date().toISOString(),
    decDist: "example",
    campsites: "example",
    issueType: "example",
    issuetypeoptions: "example",
    problem: "yes",
    severity: "high",
    frequency: "often",
    emailDEC: "yes",
    issueDescription: "example description",
    latitude: 123.456,
    longitude: 78.910,
    reporterName: "John Doe",
    reporterContact: "1234567890"
};

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


const photos = [/* Blob or base64 encoded photo data */];
const videos = [/* Blob or base64 encoded video data */];

saveReportOffline(reportData, photos, videos);

