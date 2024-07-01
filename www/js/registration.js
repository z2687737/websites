document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registrationForm');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const loginUserName = document.getElementById('loginUserName').value;
        const loginPassword = document.getElementById('loginPassword').value;
        const repeatPassword = document.getElementById('repeatPassword').value;
        const fName = document.getElementById('fName').value;
        const lname = document.getElementById('lname').value;
        const eMail = document.getElementById('eMail').value;
        const hPhone = document.getElementById('hPhone').value;
        const rLocality = document.getElementById('rLocality').value;
        const fAddress = document.getElementById('fAddress').value;
        const volCat = document.getElementById('volCat').value;
        const tCert = document.getElementById('tCert').value;
        const background = document.getElementById('background').value;

        if (loginPassword !== repeatPassword) {
            alert('Passwords do not match!');
            return;
        }

        const data = {
            loginUserName,
            loginPassword,
            fName,
            lname,
            eMail,
            hPhone,
            rLocality,
            fAddress,
            volCat,
            tCert,
            background
        };

        console.log(data);  // For now, log the data to the console

        // Assuming you have a server endpoint to handle the registration
        // You would send the data to the server using fetch or AJAX
        // Example with fetch:
        fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            console.log(result);
            alert('Registration successful!');
// Redirect to the desiged page after succesful submission
window.location.href = '../index.html';
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Registration failed!');
        });
    });
});
