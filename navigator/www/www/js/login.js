document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const loginUserName = document.getElementById('loginUserName').value;
            const loginPassword = document.getElementById('loginPassword').value;

            const data = {
                loginUserName,
                loginPassword
            };

            fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Login failed');
                }
                return response.json();
            })
            .then(result => {
                console.log('Login successful:', result);
                document.getElementById('loginMessage').textContent = result.message;

//==========
 // Store user data in localStorage
 const userData = {
    IDregistration: result.IDregistration,
    aVolHours: result.aVolHours
    // Add other relevant user data if needed
};
localStorage.setItem('userData', JSON.stringify(userData));
//==========

// Redirect to another page or show success message

    // Check if redirectUrl is provided in the response
    if (result.redirectUrl) {
        // Redirect based on server response
        window.location.href = result.redirectUrl;
    } else {
        // Handle other actions or messages here if needed
        console.log('No redirectUrl provided in the response.');
    }


//display greeting ===================

// Set welcome message based on user role
let welcomeMessage;
if (userData.userRole === 'admin') {
    welcomeMessage = `Welcome, ${userData.loginUserName} (Administrator)!`;
} else {
    welcomeMessage = `Welcome, ${userData.loginUserName}!`;
}

// Display welcome message in HTML
const welcomeMessageElement = document.getElementById('welcomeMessage');
if (welcomeMessageElement) {
    welcomeMessageElement.innerText = welcomeMessage;
} else {
    console.error('Element with ID "welcomeMessage" not found.');
}




    // Display greeting ===============
         displayGreeting(loginUserName);
})
            .catch(error => {
                console.error('Error:', error);
                document.getElementById('loginMessage').textContent = 'Login failed. Please try again.';
            });
        });
    }
});



function displayGreeting(loginUserName) {
    const helloDiv = document.getElementById('hello');
    if (helloDiv) {
        helloDiv.textContent = `Hello! welcome ${loginUserName}, You login as a registered ${role} `;
    }
}

/* This function can be called with the username after a successful login

Include hello.js in Your HTML
  <div id="hello"></div> <!-- The div for the greeting message -->

  */



