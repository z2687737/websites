// BTF / www / js / test.js

document.getElementById('testForm').addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent the default form submission
  
  fetch('/api/test')
    .then(response => response.json())
    .then(data => {
      document.getElementById('test').value = data.Test; // Corrected to 'Test'
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
});
