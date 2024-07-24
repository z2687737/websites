console.log("websites/btf/www.login.js");

document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const loginUserName = document.getElementById('loginUserName').value;
            const loginPassword = document.getElementById('loginPassword').value;

            const data = {
                loginUserName,      //line 14
                loginPassword
            };

            fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
// body: JSON.stringify({ loginUserName, loginPassword })
            })

            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log("login.js line 36 Sent from serverRouteLogin.js to login.js:", data);
                if (data.success) {

   // Perform login (e.g., send to server, validate, etc.)
// login.js line 38 On successful login, set sessionStorage:
console.log('login.js line 39 > Setting sessionStorage loginUserName');
sessionStorage.setItem('loginUserName', loginUserName);
console.log('Current sessionStorage loginUserName:', sessionStorage.getItem('loginUserName'));

console.log('login.js: Redirecting to', data.redirect);
         // Small delay to ensure sessionStorage has time to set
         setTimeout(() => {
            window.location.href = data.redirect; // Redirect to the provided URL
        }, 100); // Adjust delay if necessary

     //   window.location.href = '../html/attendance.html';

          //       window.location.href = data.redirect; // Redirect to the provided URL
                } else {
                    alert('Login failed: ' + data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                document.getElementById('loginMessage').textContent = 'Login failed. Please try again.';
            });

/*
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    window.location.href = data.redirect; // Redirect to the provided URL
                } else {
                    alert('Login failed: ' + data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
*/

/* check if data really comes in from serverRouteLogin.js  */
console.log("login.js line 36 Sent from serverRouteLogin.js to login.js:", result);

 // Display login message
 document.getElementById('loginMessage').textContent = result.message;

 /*line 68 Use received data 
 - error F12 login.js:68 Uncaught SyntaxError: 
 Identifier 'loginUserName' has already been declared 
 const { IDregistration, loginUserName, role, aVolHours } = result;  */

 console.log("login.js line 45 Date transfer from serverRouteLogin.js : ", IDregistration, loginUserName, role, aVolHours);

 // Set greeting message (ES6 module)
 displayGreeting(loginUserName, role);

/* Redirect based on user role   -- currently re-direct from serverRouteLogin.js line 64
if (userRole === 'admin' || userRole === 'uc' || userRole === 'lec') {
    window.location.href = '../html/loginLanding.html';
    } else {
        window.location.href = '../html/attendance.html';
    }*/

})
    
.catch(error => {
console.error('Error:', error);
document.getElementById('loginMessage').textContent = 'Login failed. Please try again.';
            });
        }
    });


