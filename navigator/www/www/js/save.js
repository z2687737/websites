// BTF / www / js / save.js

document.getElementById('saveForm').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the default form submission
  
    const formData = new FormData(event.target);
    const saveText = formData.get('save'); 
    // Assuming 'save' is the name attribute of your input field 
    // Retrieve value from input field with name 'save'
    console.log('Form Data:', saveText); // Check if data is retrieved correctly
  
    fetch('/api/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ save: saveText })   // Send the correct data structure
    })
    .then(response => response.json())
    .then(data => {
      console.log('Server response:', data);
      // Handle response as needed
    })
    .catch(error => {
      console.error('Error:', error);
      // Handle errors
    });
  });
  