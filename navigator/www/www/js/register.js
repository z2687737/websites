// www/js/register.js

// Example JavaScript code for registration page functionality
console.log('Register page loaded');

// Example function to handle form submission
function handleRegistrationForm(event) {
    event.preventDefault(); // Prevent default form submission
  
/*
    // Get form data
    const formData = new FormData(event.target);
    
    // Send form data to server using fetch API
    fetch('/register', {
        method: 'POST',
        body: formData
    })
*/

    fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          loginUserName: 'username',
          loginPassword: 'password',
          fName: 'First',
          lname: 'Last',
          email: 'email@example.com',
        }),
      })

    .then(response => response.json())
    .then(data => {
        console.log('line 37 - Registration response:', data);
        alert('Registration successful! - line 38');
        // Optionally redirect or update UI based on response
    })
    .catch(error => {
        console.error('Error registering:', error);
        alert('alert Registration failed. Please try again. -- line 26');
    });
}

// Attach event listener to form submission
const registrationForm = document.getElementById('registrationForm');
registrationForm.addEventListener('submit', handleRegistrationForm);
