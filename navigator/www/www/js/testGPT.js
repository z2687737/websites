console.log("websites/btf/www/js/testGPT.js");

document.getElementById('testForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    fetch('/api/testgpt', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email })
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
