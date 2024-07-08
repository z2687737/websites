//  btf/www/js/attendance.js
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('attendance');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const chkInDTS = document.getElementById('chkInDTS').value;
        const chkOutDTS = document.getElementById('chkOutDTS').value;

        // Validate Check-Out DateTime is after Check-In DateTime
        if (chkInDTS >= chkOutDTS) {
            alert('Check-Out DateTime must be after Check-In DateTime');
            return;
        }

        // Calculate time difference
        const checkInTime = new Date(chkInDTS);
        const checkOutTime = new Date(chkOutDTS);
        const timeDifferenceMs = checkOutTime - checkInTime;
        const timeDifferenceHours = timeDifferenceMs / (1000 * 60 * 60);

        // Update time difference field
        document.getElementById('volHours').value = timeDifferenceHours.toFixed(2);

        // Fetch accumulated volunteer hours from the server
        fetch('/attendance/hours')
            .then(response => response.json())
            .then(data => {
                const accumulatedHours = data.aVolHours || 0;
                const newAccumulatedHours = accumulatedHours + timeDifferenceHours;
                document.getElementById('aVolHours').value = newAccumulatedHours.toFixed(2);

                // Prepare data to send to server
                const formData = {
                    chkInDTS,
                    chkOutDTS,
                    volHours: timeDifferenceHours.toFixed(2),
                    aVolHours: newAccumulatedHours.toFixed(2)
                };

                // Send data to server using fetch
                return fetch('/attendance/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
            })
            .then(response => response.json())
            .then(result => {
                console.log(result);
                alert('Attendance taken');
                // Redirect to the desired page after successful submission
                window.location.href = '../index.html';
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Attendance failed!');
            });
    });
});
