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