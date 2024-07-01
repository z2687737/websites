//www/js/login.js

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('login');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const loginUserName = document.getElementById('loginUserName').value;
        const loginPassword = document.getElementById('loginPassword').value;

        if (!loginUserName || !loginPassword) {
            alert('Please enter both username and password');
            return;
          }

        // Temporary credentials for testing
        const testUserName = 'Admin';
        const testPassword = 'Asdf!234';

        if (loginUserName === testUserName && loginPassword === testPassword) {
            const userData = {
                userName: loginUserName,
                // Add other user data if needed
            };

            // Store user data in localStorage for later use
            localStorage.setItem('userData', JSON.stringify(userData));

            // Display alert for successful login (optional)
            alert('Login successful, click OK to go Login Landing page.');

            // Redirect to the desired page after successful login
            window.location.href = '../html/loginLanding.html';
        } else {
            // If credentials do not match, proceed with server-side login attempt
            const data = {
                loginUserName,
                loginPassword
            };

            // Example fetch request to send data to server for authentication
            fetch('/login', {
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
                // Assuming result.user contains user information including name
                const userName = result.user.name; // Adjust according to your server response structure
                
                // Store user data in localStorage for later use
                const userData = {
                    userName: userName,
                    // Add other user data if needed
                };
                localStorage.setItem('userData', JSON.stringify(userData));
                
                
                // Display alert for successful login (optional)
                alert('Login successful, click OK to go login landing page');

                // Redirect to the desired page after successful login
                window.location.href = '../html/loginLanding.html';
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Login failed! Please try again.');
            });
        }
    });
});
