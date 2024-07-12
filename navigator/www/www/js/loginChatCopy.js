document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent default form submission

            const loginUserName = document.getElementById('loginUserName').value;
            const loginPassword = document.getElementById('loginPassword').value;

            const data = {
                loginUserName: loginUserName,
                loginPassword: loginPassword
            };

            fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Login failed');
                }
                return response.json();
            })
            .then(result => {
                console.log('Login successful:', result);
                alert('Login successful!');
                // Optionally redirect to another page after successful login
                window.location.href = '/path/to/dashboard'; // Replace with your actual redirect URL
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Login failed! Please try again.');
            });
        });
    }
});
