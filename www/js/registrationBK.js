console.log(" websites/btf/www/js/registration.js ");

document.addEventListener('DOMContentLoaded', function () {
    // Select the registration form by its ID
    const form = document.getElementById('registrationForm');

    if (form) {

        /* (A) FORM REGISTRATION SUBURB DROPDOWN STREET OPTIONS
           on the registrationStreetOptions.js  */

        // (B) FORM SUBMISSION HANDLER
        // Add an event listener for form submission
        form.addEventListener('submit', function (event) {
            event.preventDefault();

            // Disable the submit button to prevent multiple submissions
            const submitButton = form.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            // Log to confirm form submission handling
            console.log('Form submission triggered');

            //Retrieve form field values, Validate each field before submission
            const registrationData = {
                loginUserName: document.getElementById('loginUserName').value.trim(),
                loginPassword: document.getElementById('loginPassword').value.trim(),
                repeatPassword: document.getElementById('repeatPassword').value.trim(),
                fName: document.getElementById('fName').value.trim(),
                lname: document.getElementById('lname').value.trim(),
                eMail: document.getElementById('eMail').value.trim(),
                hPhone: document.getElementById('hPhone').value.trim(),
                streetNumber: document.getElementById('streetNumber').value.trim(),
                locality: document.getElementById('locality').value.trim(),
                suburb: document.getElementById('suburb').value.trim(),
                street: document.getElementById('street').value.trim(),
                address1: document.getElementById('address1').value.trim(),
                address2: document.getElementById('address2').value.trim(),
                city: document.getElementById('city').value.trim(),
                state: document.getElementById('state').value.trim(),
                zipcode: document.getElementById('zipcode').value.trim(),
                role: document.getElementById('role').value.trim(),
                volCat: document.getElementById('volCat').value.trim(),
                tCert: [],
                background: document.getElementById('background').value.trim(),
                aVolHours: 0,
                created_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
            };

            const tCertCheckboxes = document.querySelectorAll('input[name="trainingCert"]:checked');
            tCertCheckboxes.forEach(function (checkbox) {
                registrationData.tCert.push(checkbox.value);
            });

            // Validate password
            const password = registrationData.loginPassword;
            const repeatPassword = registrationData.repeatPassword;
            if (!validatePassword(password)) {
                alert('Password must be at least 8 characters long, and include uppercase, lowercase, and special characters.');
                return;
            }

            // Validate password match
            if (password !== repeatPassword) {
                alert('Password and Repeat password do not match.');
                return;
            }

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(registrationData.eMail)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Validate zip code
            if (!validateZipCode(registrationData.zipcode)) {
                alert('Zip code must be exactly 4 digits.');
                return;
            }

            console.log('Registration Data:', registrationData);    // line 119

            // Proceed with registration
            registerUser(registrationData)
                .then(data => {
                    if (data.success) {
                        alert('Registration successful! Click OK and please login.');
                        window.location.href = getRedirectURL(data.role); // Redirect based on role
                    } else {
                        alert('Registration failed: ' + data.message);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Registration failed. Please try again later.');
                })
                .finally(() => {
                    // Re-enable the submit button in case of an error
                    submitButton.disabled = false;
                });
        });
    }

    function registerUser(data) {
        console.log('Registering user');
        return fetch('/api/registration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.json());
    }

    function validatePassword(password) {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[a-zA-Z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
        return regex.test(password);
    }

    function validateZipCode(zipcode) {
        const regex = /^\d{4}$/;
        return regex.test(zipcode);
    }

    function getRedirectURL(role) {
        switch (role) {
            case 'admin':
                return '../html/caseReport.html';
            case 'volunteer':
                return '../html/caseReport.html';
            case 'user':
            default:
                return '../html/caseReport.html';
        }
    }
});
