// btf/www/js/contactUs.js

console.log('Contact Us page loaded');

function handleSubmitForm(event) {
    event.preventDefault();

    const formData = new FormData(document.getElementById('contactUsForm'));

    fetch('/api/contactus', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log('Response from server:', data);
        alert('Message submitted successfully!');
        // Optionally redirect or update UI based on response
    })
    .catch(error => {
        console.error('Error submitting message:', error);
        alert('Failed to submit message. Please try again.');
    });
}

document.getElementById('contactUsForm').addEventListener('submit', handleSubmitForm);
