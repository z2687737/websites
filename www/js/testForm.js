document.addEventListener('DOMContentLoaded', function () {
    const testForm = document.getElementById('testForm');
    const helloHiHiHi = document.getElementById('helloHiHiHi'); // Ensure this is correctly referenced

 //   const loginForm = document.getElementById('loginForm');
    // Collect login user name (assuming user has already logged in)
  //  const loginUserName = document.getElementById('loginUserName').value;

  console.log('testForm.js line 9 display sessionsStorage');

    //testForm.js line 9 Collect login user name from sessionStorage
    const loginUserName = sessionStorage.getItem('loginUserName');

       // Display loginUserName if it exists
       if (loginUserName) {
        displayLoginUserName(loginUserName);
    } else {
        console.error('testForm.js line 16 No loginUserName found in sessionStorage');
    }

/* line 8 display userLoginName from login.js sessionStorage */
//displayLoginUserName();

function displayLoginUserName(loginUserName) {
    if (helloHiHiHi) {
        helloHiHiHi.textContent = `Hello from testForm.js line 24, ${loginUserName}`;
    } else {
        console.error('Element with id "helloHiHiHi" not found');
    }
}

if (testForm) {
    testForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const chkInDTS = document.getElementById('chkInDTS').value;
        const chkOutDTS = document.getElementById('chkOutDTS').value;

        // Prepare data to send to the server
        const formData = {
            loginUserName: loginUserName,
            chkInDTS: chkInDTS,
            chkOutDTS: chkOutDTS
        };

        // Send data to the server
        fetch('/api/testForm', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });
}  //if testForm {}
});
