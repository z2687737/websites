document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const loginUserName = document.getElementById('loginUserName').value;
            const loginPassword = document.getElementById('loginPassword').value;

            const data = {
                loginUserName,
                loginPassword
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
                document.getElementById('loginMessage').textContent = result.message;
                // Redirect to another page or show success message
            })
            .catch(error => {
                console.error('Error:', error);
                document.getElementById('loginMessage').textContent = 'Login failed. Please try again.';
            });
        });
    }
});
