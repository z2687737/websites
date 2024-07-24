console.log("websites/btf/www.login.js");

document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const loginUserName = document.getElementById('loginUserName').value;
            const loginPassword = document.getElementById('loginPassword').value;

  /*          const data = {
                loginUserName,
                loginPassword
            };*/

            fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ loginUserName, loginPassword })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Store user data in session or local storage
                    sessionStorage.setItem('userData', JSON.stringify(data.userData));
        
                    // Redirect to the appropriate page
                    window.location.href = data.redirect;
                } else {
                    alert('Login failed: ' + data.message);
                }
            })
            .catch(error => {
                console.error('Error during login:', error);
            });
        });

// Redirect based on user role
if (userRole === 'admin' || userRole === 'uc' || userRole === 'lec') {
    res.redirect('/html/loginLanding.html');
    } else {
    res.redirect('/html/attendance.html');
    }
    
// Redirect to another page or show success message

    // Check if redirectUrl is provided in the response
    if (result.redirectUrl) {
        // Redirect based on server response
        window.location.href = result.redirectUrl;
    } else {
        // Handle other actions or messages here if needed
        console.log('No redirectUrl provided in the response.');
    }
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