//  websites/BTF/server.js  (first tier)

const express = require('express');
const path = require('path');
const mysql = require('mysql2'); // Import MySQL module

const bodyParser = require('body-parser'); // Import body-parser module
//const mysqlRouter = require('./mysql-backend/routes/mysqlRoutes'); // Example module for MySQL backend
//const photoVideoRouter = require('./photo-video-backend/routes/photoVideoRoutes'); // Example module for photo-video backend

const nodemailer = require('nodemailer'); // Optional for sending emails
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const port = 3000;

const app = express();

// Serve static files from the "www" directory
app.use(express.static(path.join(__dirname, 'www')));

// Parse incoming request bodies in a middleware before your handlers
app.use(bodyParser.json()); // Parse application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Routes
//app.use('/mysql', mysqlRouter);
//app.use('/photo-video', photoVideoRouter);

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

//================================================
// POST endpoint for registration
app.post('/registration', (req, res) => {
  // Retrieve registration data from request body
  const {
      loginUserName,
      loginPassword,
      fName,
      lname,
      eMail,
      hPhone,
      role,
      rLocality,
      fAddress,
      streetNumber,
      suburb,
      street,
      address1,
      address2,
      city,
      state,
      zipcode,
      volCat,
      tCert,
      background,
      aVolHours,
      created_at
  } = req.body;

  try {
      // Insert data into database
      const sql = `INSERT INTO registration (loginUserName, loginPassword, fName, lname, eMail, hPhone, role, rLocality, fAddress, streetNumber, suburb, street, address1, address2, city, state, zipcode, volCat, tCert, background, aVolHours, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      db.query(sql, [loginUserName, loginPassword, fName, lname, eMail, hPhone, role, rLocality, fAddress, streetNumber, suburb, street, address1, address2, city, state, zipcode, volCat, tCert, background, aVolHours, created_at], (err, result) => {
          if (err) {
              console.error('Database error:', err);
              return res.status(500).json({ success: false, message: 'Database error', error: err.message });
          }
          console.log('Registration successful:', result);
          return res.status(200).json({ success: true, message: 'User registered successfully' });
      });
  } catch (error) {
      console.error('Error registering user:', error);
      return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});