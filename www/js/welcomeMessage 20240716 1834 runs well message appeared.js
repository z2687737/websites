// In welcomeMessage.js or a script included in loginLanding.html
document.addEventListener('DOMContentLoaded', () => {
    const userHeader = document.getElementById('userHeader');
    const userData = JSON.parse(localStorage.getItem('userData')); // Assuming userData is stored in localStorage

    if (userData) {
        userHeader.textContent = `Welcome, ${userData.loginUserName} (${userData.role})`;
    } else {
        // Handle case where userData is not found or login failed
        userHeader.textContent = 'Welcome';
    }
});
