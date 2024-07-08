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
  