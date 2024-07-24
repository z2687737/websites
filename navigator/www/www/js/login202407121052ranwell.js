console.log('loaded websites/btf/www/js/login.js ');

document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');

 if (loginForm) {
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const loginUserName = document.getElementById('loginUserName').value;
        const loginPassword = document.getElementById('loginPassword').value;

// === validation ensure form is not empty ===
        if (!loginUserName || !loginPassword) {
            alert('Please enter both username and password');
            return;
          }

// === Temporary credentials for testing ===== 
const testUserName = 'A';
const testPassword = '1';

// ==== After User passed thru all validation and Login successfully ==== 
if (loginUserName === testUserName && loginPassword === testPassword) {
    console.log('Testing Mode', A1); 
    console.log('userName:', loginUserName); 
    console.log('IDregistration:', 1); 
    console.log('aVolHours - Response:', 0); 
// Proceed with the login process for test credentials
     handleSuccessfulLogin({
        userName: loginUserName,
        IDregistration: 1,
        aVolHours: 0 // Placeholder for testing
     });


} else {
// If credentials do not match, proceed with server-side login attempt
    const data = {
        loginUserName,
        loginPassword
    };
    console.log('login.js line 36 Data sent to server:', data); 
    // Add this line to check what data is being sent

// Fetch request to send data to server for authentication
/* here system will check and match
the user's loginUserName and loginPassword against the table registration */
// Fetch request to send data to server for authentication
                fetch('/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                .then(response => {
                    console.log('login.js line 50 - Response:', response); 
                    // Corrected log statement
                  
                    if (!response.ok) {
                        throw new Error('Login failed');
                    }
                    return response.json();
                })

            .then(result => {
                console.log('lognis.js line 59 Login successful:', result); 
                // Ensure this logs successfully
                handleSuccessfulLogin(result.user);

                // Redirect to login landing page
                window.location.href = '../html/loginLanding.html';
                console.log('Redirecting...'); 
                // Add this to ensure it reaches here
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Login failed! Please try again.');
             });
        }
    });
}

    function handleSuccessfulLogin(userData) {
        // Store user data in localStorage for later use
        localStorage.setItem('userData', JSON.stringify(userData));
        console.log('Stored userData:', userData); // Debug statement
    
        // Notify user and redirect to login landing page
        alert('Login successful! Click OK to proceed.');
        console.log('Redirecting to login landing page...');
        window.location.href = '../html/loginLanding.html'; // Redirect to login landing page
    }

});