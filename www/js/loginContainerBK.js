console.log( "  dynamic load form websites/btfwww/js/loginContainer.js " ); 



document.addEventListener('DOMContentLoaded', function() {
    fetch('login.html')
        .then(response => response.text())
        .then(html => {
            const loginContainer = document.getElementById('loginContainer');
            loginContainer.innerHTML = html;
        })
        .catch(error => {
            console.error('Error fetching login form:', error);
        });
});




