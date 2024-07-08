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
app.use('/mysql', mysqlRouter);
app.use('/photo-video', photoVideoRouter);

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

// Make the database connection available in the routes
app.use((req, res, next) => {
    req.db = db;
    next();
  });
  
//================================================
// POST endpoint for 



//================================================
//Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

