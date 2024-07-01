// www/js/headerBannerNavigator.js

/* on .html, add after <body>   <div id="headerPlaceholder"></div>    */
/* on .html, add before </body> <script src="../js/headerBannerNavigator.js"></script>  */

document.addEventListener('DOMContentLoaded', function() {
    fetch('headerBannerNavigator.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('headerPlaceholder').innerHTML = data;
            
            //after Volunteer Login - Update the user name after loading the header
            const userData = JSON.parse(localStorage.getItem('userData'));
            if (userData && userData.userName) {
                const userHeader = document.getElementById('userHeader');
                userHeader.innerHTML = `<p>Hello, ${userData.userName}!</p>`;
            }
        });
});