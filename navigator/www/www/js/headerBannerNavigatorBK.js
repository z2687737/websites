console.log( "  dynamic load form websites/btfwww/js/headerBannerNavigator.js " ); 

document.addEventListener('DOMContentLoaded', function() {
    fetch('headerBannerNavigator.html')
        .then(response => response.text())
        .then(data => {

//const name is the pick up div id name.
            const headerPlaceholder = document.getElementById('headerPlaceholder');
            if (headerPlaceholder) {
                headerPlaceholder.innerHTML = data;
                
                // Additional operations after setting innerHTML
                const userData = JSON.parse(localStorage.getItem('userData'));
                if (userData && userData.userName) {
                    const userHeader = document.getElementById('userHeader');
                    if (userHeader) {
                        userHeader.innerHTML = `<p>Hello, ${userData.userName}!</p>`;
                    }
                }
            } else {
                console.error('Element with ID "headerPlaceholder" not found.');
            }
        })
        .catch(error => {
            console.error('Error fetching header content:', error);
        });
});





/* on .html, add after <body>   <div id="headerPlaceholder"></div>    
 on .html, add before </body> <script src="../js/headerBannerNavigator.js"></script>  */