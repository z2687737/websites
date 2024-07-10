console.log('loaded websites/btf/www/js/login.js ');

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('loginForm');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
   // removed     const formData = new FormData(form);
        const loginUserName = document.getElementById('loginUserName').value;
        const loginPassword = document.getElementById('loginPassword').value;

// === validation ensure form is not empty ===
        if (!loginUserName || !loginPassword) {
            alert('Please enter both username and password');
            return;
          }

// === Temporary credentials for testing ===== 
const testUserName = 'Admin';
const testPassword = 'Asdf!234';

// ==== After User passed thru all validation and Login successfully ==== 
if (loginUserName === testUserName && loginPassword === testPassword) {
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

// Fetch request to send data to server for authentication
/* here system will check and match
the user's loginUserName and loginPassword against the table registration */
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

// Fetch user data from the registration table
return fetch(`/api/getUserData/${result.user.IDregistration}`);
})
                .then(response => response.json())
                .then(userData => {
                    handleSuccessfulLogin({
                        userName: userData.name, // Assuming 'name' is the correct property
                        IDregistration: userData.IDregistration,
                        aVolHours: userData.aVolHours
                    });
// Redirect to login landing page
        window.location.href = '../html/loginLanding.html';
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Login failed! Please try again.');
                });
            }
        });

        function handleSuccessfulLogin(userData) {
            // Store user data in localStorage for later use
            localStorage.setItem('userData', JSON.stringify(userData));
            console.log('Stored userData:', userData); // Debug statement
            alert('Login successful, click OK to go to the Login Landing page.');
            window.location.href = '../html/loginLanding.html';
        }
    
        function fetchAccumulatedHoursForUser(IDregistration) {
            fetch(`/api/getAccumulatedHours/${IDregistration}`)
            .then(response => response.json())
            .then(data => {
                console.log('Accumulated hours fetched:', data.aVolHours);
                document.getElementById('aVolHours').textContent = data.aVolHours;
            })
            .catch(error => {
                console.error('Error fetching accumulated hours:', error);
            });
        }
    });