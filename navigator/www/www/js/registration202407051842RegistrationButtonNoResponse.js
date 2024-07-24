// websites/btf/www/js/registration.js

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registration');
    const suburbSelect = document.getElementById('suburb');
    const streetSelect = document.getElementById('street');


//(A) FORM REGISTRATION SUBURB DROPDOWN STREET OPTIONS

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


//(B) FORM SUBMISSION HANDLER

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const registrationData = {
            loginUserName: document.getElementById('loginUserName').value.trim(),
            loginPassword: document.getElementById('loginPassword').value.trim(),
            repeatPassword: document.getElementById('repeatPassword').value.trim(),
            fName: document.getElementById('fName').value.trim(),
            lname: document.getElementById('lname').value.trim(),
            eMail: document.getElementById('eMail').value.trim(),
            hPhone: document.getElementById('hPhone').value.trim(),
            role: document.getElementById('role').value.trim(),
            rLocality: document.getElementById('rLocality').value.trim(),
            fAddress: document.getElementById('fAddress').value.trim(),
            street_number: document.getElementById('street_number').value.trim(),
            suburb: document.getElementById('suburb').value.trim(),
            street: document.getElementById('street').value.trim(),
            address1: document.getElementById('address1').value.trim(),
            address2: document.getElementById('address2').value.trim(),
            city: document.getElementById('city').value.trim(),
            state: document.getElementById('state').value.trim(),
            zipcode: document.getElementById('zipcode').value.trim(),
            volCat: document.getElementById('volCat').value.trim(),
            tCert: document.getElementById('tCert').value.trim(),
            background: document.getElementById('background').value.trim(),
            aVolHours: 0, // Initialize to 0
            created_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
        };

        console.log('Registration Data:', registrationData); // Debugging log
 /*
    // Collect values of checked checkboxes
        const trainingCerts = [];
        const checkboxes = document.querySelectorAll('input[name="trainingCert"]:checked');
        checkboxes.forEach((checkbox) => {
        trainingCerts.push(checkbox.value);
        })
        registrationData.trainingCert = trainingCerts;

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
        
        */ 

/* add here????

document.getElementById('registration').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Form data
    const formData = new FormData(this);

    // Convert form data to JSON
    const formDataJSON = {};
    formData.forEach((value, key) => {
        formDataJSON[key] = value;
    });



      // Form data
      const formData = new FormData(this);

      // Convert form data to JSON
      const formDataJSON = {};
      formData.forEach((value, key) => {
          formDataJSON[key] = value;
      });
*/
  // Send data to server using fetch
  fetch('/registration', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(registrationData)
})
.then(response => response.json())
.then(data => {
    // Handle response
    console.log(data);
    if (data.success) {
        alert('Registration successful!');
        // Optionally redirect to another page
        // window.location.href = '/some-other-page';
    } else {
        alert('Registration failed: ' + data.message);
    }
})
.catch(error => {
    console.error('Error:', error);
});
});
});