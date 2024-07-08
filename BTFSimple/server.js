//BTF/server.js

const express = require('express');
const path = require('path');
const mysql = require('mysql2'); // Import MySQL module
const bodyParser = require('body-parser'); // Import body-parser module
const app = express();
const port = 3000;

// Serve static files from the "www" directory
app.use(express.static(path.join(__dirname, 'www')));

// Parse incoming request bodies in a middleware before your handlers
app.use(bodyParser.json()); // Parse application/json

// MySQL database connection configuration
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root', // Replace with your MySQL username
  password: 'Sq00700&', // Replace with your MySQL password
  database: 'btf', // Replace with your MySQL database name
  port: 3306 
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

// ( 1 ) API endpoint to send a message
app.get('/api/message', (req, res) => {
  res.json({ message: 'Hello from the server!' });
});

app.get('/api/another-message', (req, res) => {
  res.json({ message: 'This is another message from the server!' });
});

// ( 2 ) API Endpoint to response with some test input
app.get('/api/test', (req, res) => {
  res.json({ Test: 'test to submit form and see where the input goes for storage' });
});


// ( 3 ) API endpoint to handle and save form submission
// Update the POST route to /api/save endpoint

app.post('/api/save', (req, res) => {
  
    const saveText = req.body.save; 
    // Assuming 'save' is the key sent in JSON body
    // Assuming 'save' is the name attribute of your input field
    console.log('Received saveText:', saveText); // Log received data

    const sql = 'INSERT INTO save (saveText) VALUES (?)'; // Assuming 'save' is your table name
  
    db.query(sql, [saveText], (err, result) => {
      if (err) {
        console.error('Error inserting data:', err);
        res.status(500).json({ error: 'Error inserting data' });
        return;
      }
      console.log('Data inserted successfully');
      res.status(200).json({ message: 'Data saved successfully' });
    });
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
