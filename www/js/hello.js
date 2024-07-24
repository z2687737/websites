// hello.js

function displayGreeting(xloginUserName) {
    const xhelloDiv = document.getElementById('xhello');
    if (xhelloDiv) {
        xhelloDiv.textContent = `Hello Hi Hi , ${loginUserName}`;
    }
}

/* This function can be called with the username after a successful login


Include hello.js in Your HTML
  <div id="hello"></div> <!-- The div for the greeting message -->

  */
