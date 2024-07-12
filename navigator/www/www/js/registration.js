console.log( " websites/btf/www/js/registration.js " );

document.addEventListener('DOMContentLoaded', function () {
// Select the registration form by its ID
    const form = document.getElementById('registrationForm');   //goto line 45

    // (A) FORM REGISTRATION SUBURB DROPDOWN STREET OPTIONS

//on the registrationStreetOptions.js

    // (B) FORM SUBMISSION HANDLER

    // Add an event listener for form submission
    form.addEventListener('submit', function (event) {
        event.preventDefault();  // Prevent the form from submitting initially

   //Retrieve form field values, Validate each field before submission
        const registrationData = {      //line 113
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
            
        //    street: visibleStreetSelect?.value.trim(),
            street: document.getElementById('street').value.trim(),   //line 33
            address1: document.getElementById('address1').value.trim(),
            address2: document.getElementById('address2').value.trim(),
            city: document.getElementById('city').value.trim(),
            state: document.getElementById('state').value.trim(),
            zipcode: document.getElementById('zipcode').value.trim(),
            role: document.getElementById('role').value.trim(),
            volCat: document.getElementById('volCat').value.trim(),
            tCert: [], // Initialize array to store selected values
            background: document.getElementById('background').value.trim(),
            
            aVolHours: 0, // Initialize to 0
            created_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
        };


         // Collect selected tCert checkboxes
         const tCertCheckboxes = document.querySelectorAll('input[name="trainingCert"]:checked');
         tCertCheckboxes.forEach(function (checkbox) {
             registrationData.tCert.push(checkbox.value);
         });


//(C) VALIDATION RULES

/*
 Validation to fill up all fields
if (registrationData.loginUserName === '' || 
    registrationData.loginPassword === '' || 
    registrationData.repeatPassword === '' || 
    registrationData.fName === '' || 
    registrationData.lname === '' || 
    registrationData.eMail === '' || 
    registrationData.hPhone === '' || 
    registrationData.streetNumber === '' || 
    registrationData.suburb === '' || 
    registrationData.street === '' || 
    registrationData.address1 === '' || 
    registrationData.city === '' || 
    registrationData.state === '' || 
    registrationData.zipcode === '' || 
    registrationData.role === '' || 
    registrationData.volCat === '' || 
    registrationData.tCert.length === 0) {
            alert('Please fill out all required fields.');
            return;
        }


// Validate password strength (at least 8 characters, uppercase, lowercase, digit)
console.log('Password:', registrationData.loginPassword); // Check the actual value in the console

const password = registrationData.loginPassword;
console.log('Password:', password); // Check the actual value in the console

// Simplified validation (remove regex temporarily)
if (password.length < 8 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/\d/.test(password)) {
    alert('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit.');
    return;
}

// Validate email format
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(registrationData.eMail)) {
    alert('Please enter a valid email address.');
    return;
}

*/

    // If all validations pass, submit the form
//    this.submit();



console.log('Registration Data:', registrationData);

//FETCH DATA FROM HTML SEND TO SERVER
// Send data to server using fetch
        fetch('/api/registration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registrationData)   //line 115
        })
        .then(response => response.json())
        .then(data => {         // this "data" returned from server
            // Handle response
            console.log('Registration response (registration.js line 146):', data); // Log the response from server
            if (data.success) {
alert('Registration successful / Received data! - registration.js line 148  please login');
                // Optionally redirect to another page
               window.location.href = '../html/caseReport.html';
            } else {
                alert('Error Fetching Data / Registration failed: - line 152 ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error (network or js) registering user:', error);
            alert('Registration failed. Please try again later.');
        });
    });
});
