//  btf/www/js/registration.js (button not response)

document.addEventListener('DOMContentLoaded', function () {
// Select the registration form by its ID
    const form = document.getElementById('registrationForm');   //goto line 45
    const suburbSelect = document.getElementById('suburb');
    const streetSelect = document.getElementById('street');

    // (A) FORM REGISTRATION SUBURB DROPDOWN STREET OPTIONS
    suburbSelect.addEventListener('change', function () {
        updateStreets(suburbSelect.value);
    });

    function updateStreets(suburb) {
        // Clear current options
        streetSelect.innerHTML = '';

        // Define streets for each suburb
        const streets = {
            Subiaco: ['Ada Street', 'Ambrose Lane', 'Hay Street'],
            Fremantle: ['Beach Street', 'Brennan Street', 'High Street'],
            Cottesloe: ['Clapham Lane', 'Curtin Avenue', 'Napier Street']
            // Add more suburbs and streets as needed
        };

        // Populate the street select box
        if (streets[suburb]) {
            streets[suburb].forEach(function (street) {
                const option = document.createElement('option');
                option.value = street;
                option.textContent = street;
                streetSelect.appendChild(option);
            });
        } else {
            const option = document.createElement('option');
            option.value = '';
            option.textContent = 'No streets available';
            streetSelect.appendChild(option);
        }
    }

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
            
            rLocality: document.getElementById('rLocality').value.trim(),
            fAddress: document.getElementById('fAddress').value.trim(),
            streetNumber: document.getElementById('streetNumber').value.trim(),
            suburb: document.getElementById('suburb').value.trim(),
            street: document.getElementById('street').value.trim(),
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
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
if (!passwordRegex.test(registrationData.loginPassword)) {
    alert('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit.');
    return;
}

// Ensure passwords match
if (registrationData.loginPassword !== registrationData.repeatPassword) {
    alert('Passwords do not match!');
    return;
}

// Validate email format
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(registrationData.eMail)) {
    alert('Please enter a valid email address.');
    return;
}

    // If all validations pass, submit the form
//    this.submit();

//FETCH DATA FROM HTML SEND TO SERVER
// Send data to server using fetch
        fetch('/api/registration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registrationData)   //line 49
        })
        .then(response => response.json())
        .then(data => {
            // Handle response
            console.log('Registration response:', data);
            if (data.success) {
                alert('Registration successful!  please login');
                // Optionally redirect to another page
               window.location.href = '../index.html';
            } else {
                alert('Registration failed: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error registering user:', error);
            alert('Registration failed. Please try again later.');
     
        });
    });
});
