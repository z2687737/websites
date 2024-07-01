//  www/js/contactUs.js


// Example of client-side form validation and submission using JavaScript in contactUs.js

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactUs');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

   // Simple client-side validation
   if (!name || !email || !subject || !message) {
    alert('Please fill out all fields.');
    return;
}
const data = {  // Keeping it as 'data' for consistency
    from: email,
    to: 'your-email@gmail.com',
    subject: 'Contact Us Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`
};

        console.log(data);  // Verify 'data' object structure, log the data to the console

        // Assuming you have a server endpoint to handle the registration
        // You would send the data to the server using fetch or AJAX
 // Send data to server using fetch

        fetch('/contactUs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            console.log(result);
            alert('Contact Us - Message sent successfully');
            // Redirect to the desiged page after succesful submission
            window.location.href = '../index.html';
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Contact Us failed!');
        });
    });
});
