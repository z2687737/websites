// websites/btf/server.js

const express = require('express');
const mysql = require('mysql'); // Import MySQL module
const app = express();
const port = 3000;

// MySQL Connection configuration
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'Sq00700&',
  database: 'btf'
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('MySQL Connected to database.');
});

// Example route to retrieve data from MySQL
app.get('/users', (req, res) => {
  const sql = 'SELECT * FROM users';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error retrieving users:', err);
      return res.status(500).send('Error retrieving users');
    }
    res.json(results);
  });
});

// Example root route
app.get('/', (req, res) => {
  res.send('Hello World! MySQL connection established.');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

