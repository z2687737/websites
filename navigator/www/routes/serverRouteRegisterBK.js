//websites/btf/routes/serverRouteRegister.js

const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const bcrypt = require('bcrypt');

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

//=======================================

// Endpoint to handle user registration  (only '/')
router.post('/', (req, res) => {
  const { loginUserName, loginPassword, fName, lname, email } = req.body;

//VALIDATION

 // Check if all required fields are present
 if (!loginUserName || !loginPassword || !fName || !lname || !email) {
  return res.status(400).json({ error: 'All fields are required' });
}
 // Log the received data to verify
 console.log('line 38: Received data from register.html:', req.body);

  // Hash the password
  bcrypt.hash(loginPassword, 10, (err, hashedPassword) => {
    if (err) {
      console.error('Error hashing password:', err);
      return res.status(500).json({ error: 'Error hashing password' });
    }

// Prepare registration data for server to store on MySQL database
    const registrationData = {
      loginUserName,
      loginPassword: hashedPassword,
      fName,
      lname,
      email
    };

    // DATABASE INSERTION Insert data into database
    // Insert data into database
    const sql = 'INSERT INTO registration SET ?';

    db.query(sql, registrationData, (err, result) => {
      if (err) {
        console.error('Error inserting data:', err);
        return res.status(500).json({ error: 'Error inserting data' });
      }
      console.log('Registration successful - line 59');
      res.status(200).json({ success: true, message: 'Registration successful - line 53' });
    });

  });
});

module.exports = router;
