//www/js/attendance.js

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('attendance');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const chkInDTS = document.getElementById('chkInDTS').value;
        const chkOutDTS = document.getElementById('chkOutDTS').value;
        const volHours = document.getElementById('volHours').value;
        const aVolHours = document.getElementById('aVolHours').value;

        const data = {
            chkInDTS,
            chkOutDTS,
            volHours,
            aVolHours
        };

        console.log(data);  // For now, log the data to the console

        // Assuming you have a server endpoint to handle the registration
        // You would send the data to the server using fetch or AJAX
 // Example fetch request to send data to server
        fetch('/attendance', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            console.log(result);
            alert('Attendance taken');
// Redirect to the desiged page after succesful submission
window.location.href = '../index.html';
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Attendance failed!');
        });
    });
});
