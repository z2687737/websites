console.log( "  dynamic load form websites/btfwww/js/headerBannerNavigator.js " ); 

document.addEventListener('DOMContentLoaded', function() {
    fetch('html/login.html')
        .then(response => response.text())
        .then(html => {
            const loginContainer = document.getElementById('loginContainer');
            loginContainer.innerHTML = html;
        })
        .catch(error => {
            console.error('Error fetching login form:', error);
        });
});
