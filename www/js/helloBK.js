// hello.js

function displayGreeting(loginUserName) {
    const helloDiv = document.getElementById('hello');
    if (helloDiv) {
        helloDiv.textContent = `Hello, ${loginUserName}`;
    }
}

/* This function can be called with the username after a successful login


Include hello.js in Your HTML
  <div id="hello"></div> <!-- The div for the greeting message -->

  */
