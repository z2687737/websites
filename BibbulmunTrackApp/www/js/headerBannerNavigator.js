/* <script src="js/headerBannerNavigator.js></script>   */

document.addEventListener('DOMContentLoaded', function() {
    fetch('headerBannerNavigator.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('headerPlaceholder').innerHTML = data;
        });
});
