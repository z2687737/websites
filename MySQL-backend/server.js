//  websites/btf/www/MySQL-backend/Server.js
//Express Setup
//First Import all necessary modules
//handle login form
//handle registration form
//handle contactUs

//connecting MySQLto databases
const mysql = require('mysql2');  // Import mysql module
const express = require('express');
//const router = express.Router();

const bodyParser = require('body-parser');


//const mysqlRouter = require('./routes/mysqlRoutes'); // Adjust the path as needed

//const mysqlRouter = require('./mysql-backend/routes/mysqlRoutes'); // Example module for MySQL backend
//const photoVideoRouter = require('./photo-video-backend/routes/photoVideoRoutes'); // Example module for photo-video backend

const nodemailer = require('nodemailer'); // Optional for sending emails
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3001; // You can choose any port, e.g., 3000, 3001, etc.


//const PORT = process.env.PORT || 3000;

/*MySQL Port (3306): Default port for MySQL
used by MySQL Workbench and MySQL server 
to communicate with the database.*/
//const PORT = process.env.PORT || 3306;

/* Backend Server Port (3000 or 3001): 
This is the port used by your Node.js backend server 
to listen for HTTP requests. 
It's separate from the MySQL port.*/

// Middleware (body-parser)
//is configured to handle JSON and URL-encoded data
// Parse application/json requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Routes
//app.use('/mysql', mysqlRouter);
//app.use('/photo-video', photoVideoRouter);

//Manage database connection efficiently
//MySQL Connection
const db = mysql.createConnection({
  host: '127.0.0.1',    // Ensure this matches your MySQL Workbench setup
  user: 'root',         // Ensure this matches your MySQL Workbench setup
  password: 'Sq00700&', // Replace with your actual MySQL root password
  database: 'btf', // Ensure this matches your database name in MySQL Workbench
  port: 3306            // Default MySQL port, Ensure this matches your MySQL Workbench setup
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('MySQL Connected to database.');
});

// Example route
//router.get('/', (req, res) => {
//  res.send('MySQL Router is working!');
//});

//module.exports = router;

//(1.a) Case Report Form endpoint to handle track maintenance report form from index.html ===============
// Case Report Form endpoint
// Endpoint to handle form submission

/ Endpoint to handle case report form submission
app.post('/casereport', (req, res) => {
  const {
    caseType, caseDescription, dateOfEvent, locationOfEvent,
    decDist, campsites, issueType, issuetypeoptions, problem,
    severity, frequency, emailDEC, issueDescription, latitude,
    longitude, photo, reporterName, reporterContact, created_at
  } = req.body;

  const sql = `
    INSERT INTO casereport (
      caseType, caseDescription, dateOfEvent, locationOfEvent,
      decDist, campsites, issueType, issuetypeoptions, problem,
      severity, frequency, emailDEC, issueDescription, latitude,
      longitude, photo, reporterName, reporterContact, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [
    caseType, caseDescription, dateOfEvent, locationOfEvent,
    decDist, campsites, issueType, issuetypeoptions, problem,
    severity, frequency, emailDEC, issueDescription, latitude,
    longitude, photo, reporterName, reporterContact, created_at
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting data into casereport table:', err);
      return res.status(500).json({ error: 'Failed to insert data' });
    }
    console.log('Data inserted into casereport table:', result);
    res.status(200).json({ message: 'Case report submitted successfully' });
  });
});

  console.log(req.body); // Before inserting into database




//Registration Route
// (1.b.i) Registration Form endpoint to handle user registration from index.html =========================
// Registration Endpoint for users table
app.post('/register', async (req, res) => {
  console.log('Received registration request:', req.body);
  const { 
    loginUserName, loginPassword, repeatPassword, fName, lname, eMail, hPhone, role, rLocality, 
    fAddress, streetNumber, suburb, street, address1, address2, city, state, zipcode, volCat, 
    tCert, background 
  } = req.body;
  

  if (loginPassword !== repeatPassword) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  const hashedPassword = await bcrypt.hash(loginPassword, 10);
    
  const user = { 
    loginUserName, 
    loginPassword: hashedPassword, 
    repeatPassword: hashedPassword, 
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
    background 
  };
  
  console.log(req.body); // Before inserting into database

  const sql = 'INSERT INTO registration SET ?';
  db.query(sql, user, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database query error' });
    }
    res.status(200).json({ message: 'User registered successfully' });
  });
});

//Login Route
// (1.b.ii) Login endpoint to verify user login from index.html =========================
app.post('/login', (req, res) => {
  console.log('Received login request:', req.body);
  const { loginUserName, loginPassword } = req.body;

    // Perform authentication logic here, e.g., check against database
  // Example: Query database to validate credentials
  const sql = 'SELECT * FROM users WHERE userName = ? AND password = ?';
  db.query(sql, [loginUserName, loginPassword], async (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ error: 'Database query error' });
    }
    
    if (results.length > 0) {
      // Successful login
      return res.status(200).json({ success: true, message: 'Login successful' });
    } else {
      // Invalid credentials
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    
  });
});

// Example of a protected route
app.get('/protected', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, 'your_jwt_secret', (err, user) => {
      if (err) return res.sendStatus(403);
      res.json({ message: 'Protected route accessed', user });
  });
});

// Example route to handle MySQL queries
app.get('/users', (req, res) => {
  const sql = 'SELECT * FROM users';
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error retrieving users');
    }
    res.json(results);
  });
});

//Build API Endpoints to handle CRUD

app.get('/', (req, res) => {
  res.send('Server is running for MySQL-backend');
});

// Example route to handle MySQL queries
app.get('/users', (req, res) => {
  const sql = 'SELECT * FROM users';
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error retrieving users');
    }
    res.json(results);
  });
});

// Example route to handle insert into MySQL
app.post('/users', (req, res) => {
  const { username, email } = req.body;
  const sql = 'INSERT INTO users (userName, eMail) VALUES (?, ?)';
  db.query(sql, [username, email], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error inserting user');
    }
    res.send('User added to MySQL');
  });
});

//Contact Us Route
// (2)Contus Form endpoint to handle Contact Us Form contactus.html ===============

// Assuming you have required nodemailer and set up your transporter

//ENDPOINT contactUs and send email - handling POST request
// This endpoint will receive data from the client-side form submission.
// Endpoint to handle POST requests from the contact form

app.post('/contactUs', (req, res) => {
  // Handle the form data here  -->   Extract data from request body
  const { name, email, subject, message } = req.body;

      // Validate incoming data (optional)
// Example validation (ensure all fields are present)
if (!name || !email || !subject || !message) {
  return res.status(400).json({ error: 'Please fill out all fields' });
}

console.log(req.body); // Before inserting into database


// Example: Save data to the database or perform other operations
const sql = 'INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)';
db.query(sql, [name, email, subject, message], (err, result) => {
  if (err) {
    console.error('Error inserting data into database:', err);
    return res.status(500).json({ error: 'Failed to store data' });
  }
  console.log('Message stored in database:', result);
  res.status(200).json({ message: 'Message received and stored successfully' });
});

  // Example: Send an email with the form data (using nodemailer)
 let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-email-password'
    }
  });
  
  let data = {
    from: email,
    to: 'your-email@gmail.com',
    subject: 'Contact Us Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`
  };

  transporter.sendMail(data, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).send('Error sending email');
    }
    console.log('Email sent:', info.response);
    res.status(200).send('Message sent successfully');
  });
});


//Attendance Route
// (3)Scan Attendance endpoint to handle attendance.html ===============

app.post('/attendance', (req, res) => {
  console.log('Received scan attendance request:', req.body);
  // Handle the form data here  -->   Extract data from request body
  const {
    chkInDTS,
    chkOutDTS, 
    volHours, 
    aVolHours
     } = req.body;

      // Validate incoming data (optional)
// Example validation (ensure all fields are present)
if (   !chkInDTS || !ChkOutDTS || !volHours || ! aVolHours   ) {
  return res.status(400).json({ error: 'Please fill out all fields' });
}

console.log(req.body); // Before inserting into database

// Example: Save data to the database or perform other operations
const sql = 'INSERT INTO contact_messages (
chkInDTS,
chkOutDTS, 
volHours, 
aVolHours
) VALUES (?, ?, ?, ?)';

db.query(sql, [
  chkInDTS,
  chkOutDTS, 
  volHours, 
  aVolHours
  ], (err, result) => {
  if (err) {
    console.error('Error inserting data into database:', err);
    return res.status(500).json({ error: 'Failed to store data' });
  }
  console.log('Message stored in database:', result);
  res.status(200).json({ message: 'Message received and stored successfully' });
});





// Example error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`MySQL-backend Server is running on port ${PORT}`);
});
