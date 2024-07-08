console.log  ("  load btf/www/js/contactUs.js ");

document.addEventListener('DOMContentLoaded', function() {

document.getElementById('contactus').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;    
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    fetch('/api/contactus', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            name,
            email,
            subject,
            message,
            })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Data submitted successfully!');
        } else {
            alert('Failed to submit data');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred');
    });
});
});
