document.getElementById('fetchMessage').addEventListener('click', () => {
    fetch('/api/message')
      .then(response => response.json())
      .then(data => {
        document.getElementById('message').innerText = data.message;
      });
  });
  
  document.getElementById('fetchMessage1').addEventListener('click', () => {
    fetch('/api/another-message')
      .then(response => response.json())
      .then(data => {
        document.getElementById('message1').innerText = data.message;
      });
  });
  

// Optional: Handle form submission via JavaScript for a better user experience
//index.html <form id="login"  line 66 id="message" 
       document.querySelector('form').addEventListener('submit', async function(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const response = await fetch('/api/login', {
            method: 'POST',
            body: formData
        });
        const result = await response.json();
        document.getElementById('message').textContent = result.message || 'Login successful';
    });