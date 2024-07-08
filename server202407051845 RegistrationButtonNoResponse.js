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

//(3) fetch Save for testing see save.js
// Ensure this is your server code
app.post('/api/save', (req, res) => {
  const saveText = req.body.save; 
  console.log('Received saveText:', saveText); // This should log the correct value

  const sql = 'INSERT INTO save (saveText) VALUES (?)';

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

//================================================

//(1.a) API endpoint to fetch casereport data   =========
app.get('/api/casereport', (req, res) => {
  const sql = 'SELECT * FROM casereport';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching casereport data: ' + err.stack);
      res.status(500).send('Error fetching casereport data');
      return;
    }
    res.json(results);
  });
});

// Case Report Form endpoint
// Endpoint to handle form submission

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


/*EMAIL TO DEC DIST

app.post('/api/emailCaseReport', (req, res) => {
  const { from, to, subject, text } = req.body;

  if (!from || !to || !subject || !text) {
      return res.status(400).json({ error: 'Please fill out all fields' });
  }

  const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: 'your-email@gmail.com',
          pass: 'your-email-password'
      }
  });

  const mailOptions = {
      from: from,
      to: to,
      subject: subject,
      text: text
  };

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.error('Error sending email:', error);
          return res.status(500).json({ error: 'Failed to send email' });
      }
      res.status(200).json({ message: 'Email sent successfully' });
  });
});

*/


//================================================

//server.js Registration Endpoint for registration table
// (1.b.i) Registration Form endpoint to handle user registration from index.html ==============


app.post('/registration', async (req, res) => {
  console.log('Received registration request:', req.body);
  const { 
    loginUserName, 
    loginPassword, 
    repeatPassword, 
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
  

  //check password matching
  if (loginPassword !== repeatPassword) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  const hashedPassword = await bcrypt.hash(loginPassword, 10);
    
  const login = { 
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

    background, 
    aVolHours, 
    created_at: new Date() // This will use the current server time

  };
  
  console.log(req.body); // Before inserting into database

  const sql = 'INSERT INTO registration SET ?';
  db.query(sql, login, (err, result) => {
    if (err) {
      console.error(err);
      console.error('SQL Query:', sql);
      console.error('Query Data:', login);
      console.error('Database query error:', err);
      return res.status(500).json({ error: 'Database query error', details: err.message });
    }
    res.status(200).json({ message: 'User registered successfully' });
  });
});

//================================================

//Login Route
// (1.b.ii) Login endpoint to verify user login from index.html ===========
app.post('/login', (req, res) => {
  console.log('Received login request:', req.body);
  const { loginUserName, loginPassword } = req.body;

    // Perform authentication logic here, e.g., check against database
  // Example: Query database to validate credentials
  const sql = 'SELECT * FROM logins WHERE userName = ?';
  db.query(sql, [loginUserName], async (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ error: 'Database query error' });
    }
    
    if (results.length > 0) {
      const user = results[0];
      const passwordMatch = await bcrypt.compare(loginPassword, user.password);
      
      if (passwordMatch) {
        // Successful login
        // Generate JWT token
        const token = jwt.sign({ user }, 'your_jwt_secret', { expiresIn: '1h' });
      
        return res.status(200).json({ success: true, message: 'Login successful', token });
      } else {
        // Invalid credentials
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
    } else {
      // User not found
      return res.status(401).json({ success: false, message: 'User not found' });
    }
  });
});

//================================================
//Contact Us Route
// (2)Contus Form endpoint to handle Contact Us Form contactus.html ===============

// Assuming you have required nodemailer and set up your transporter

//ENDPOINT contactUs and send email - handling POST request
// This endpoint will receive data from the client-side form submission.
// Endpoint to handle POST requests from the contact form

app.post('/api/contactUs', (req, res) => {
  // Handle the form data here  -->   Extract data from request body
  const { name, email, subject, message } = req.body;

// Validate incoming data (optional)
// Example validation (ensure all fields are present)
if (!name || !email || !subject || !message) {
  return res.status(400).json({ error: 'Please fill out all fields' });
}

console.log(req.body); // Before inserting into database

// Example: Save data to the database or perform other operations
const sql = 'INSERT INTO contactus (name, email, subject, message) VALUES (?, ?, ?, ?)';
db.query(sql, [name, email, subject, message], (err, result) => {
  if (err) {
    console.error('Error inserting data into database:', err);
    return res.status(500).json({ error: 'Failed to store data' });
  }
  console.log('Message stored in database:', result);
  res.status(200).json({ message: 'Message received and stored successfully' });
});
});

/*
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

  */
//================================================
//Attendance Route 

/* user clicks submit button:

server.js handles the /attendance/submit endpoint 
to process attendance submissions 
and update the accumulated hours (aVolHours) in the database.

This endpoint '/attendance/submit'  receives the attendance data
 (IDregistration, chkInDTS, chkOutDTS, volHours) 
 from the client attendance.html input, 
 inserts the attendance record into the attendance table, and
 updates the aVolHours in the registration table for the respective user.
 */

 app.post('/attendance/submit', (req, res) => {
  const data = req.body;
  const query = 'INSERT INTO attendance SET ?';
  connection.query(query, data, (err, results) => {
      if (err) {
          console.error('Error inserting attendance data:', err);
          res.status(500).json({ success: false, error: 'Database error' });
          return;
      }
      res.json({ success: true });
  });
});

app.get('/register/aVolHours', (req, res) => {
  // Assuming you pass the user ID as a query parameter
  const IDregistration = req.query.IDregistration;
  const query = 'SELECT aVolHours FROM registration WHERE IDregistration = ?';
  connection.query(query, [IDregistration], (err, results) => {
      if (err) {
          console.error('Error fetching accumulated hours:', err);
          res.status(500).json({ success: false, error: 'Database error' });
          return;
      }
      if (results.length > 0) {
          res.json({ aVolHours: results[0].aVolHours });
      } else {
          res.json({ aVolHours: 0 });
      }
  });
});

// Fetch user details by userName
app.get('/api/getUserDetails/:userName', (req, res) => {
  const userName = req.params.userName;
  const sql = 'SELECT IDregistration, aVolHours FROM registration WHERE loginUserName = ?';

  db.query(sql, [userName], (err, result) => {
      if (err) {
          res.status(500).json({ error: err.message });
          return;
      }
      if (result.length === 0) {
          res.status(404).json({ error: 'User not found' });
          return;
      }
      res.json({
          IDregistration: result[0].IDregistration,
          aVolHours: result[0].aVolHours
      });
  });
});

// Fetch accumulated volunteer hours for a user
app.get('/api/getAccumulatedHours/:IDregistration', (req, res) => {
  const IDregistration = req.params.IDregistration;
  const sql = 'SELECT aVolHours FROM registration WHERE IDregistration = ?';

  db.query(sql, [IDregistration], (err, result) => {
      if (err) {
          res.status(500).json({ error: err.message });
          return;
      }
      if (result.length === 0) {
          res.status(404).json({ error: 'User not found' });
          return;
      }
      res.json({ aVolHours: result[0].aVolHours });
  });
});

//update table registration column aVolHours of this IDregistration
app.post('/registration', (req, res) => {
  const data = req.body;
  const query = 'INSERT INTO registration SET ?';
  connection.query(query, data, (err, results) => {
      if (err) {
          console.error('Error inserting registration data:', err);
          res.status(500).json({ success: false, error: 'Database error' });
          return;
      }
      res.json({ success: true });
  });
});

// Submit attendance
app.post('/api/submitAttendance', (req, res) => {
  const { IDregistration, chkInDTS, chkOutDTS, volHours } = req.body;
  const sql = 'INSERT INTO attendance (IDregistration, chkInDTS, chkOutDTS, volHours) VALUES (?, ?, ?, ?)';

  db.query(sql, [IDregistration, chkInDTS, chkOutDTS, volHours], (err, result) => {
      if (err) {
          res.status(500).json({ error: err.message });
          return;
      }

      // Optionally update accumulated hours in registration table
      const updateSql = 'UPDATE registration SET aVolHours = aVolHours + ? WHERE IDregistration = ?';
      db.query(updateSql, [volHours, IDregistration], (updateErr) => {
          if (updateErr) {
              res.status(500).json({ error: updateErr.message });
              return;
          }
          res.json({ success: true });
      });
  });
});

//================================================

// Example error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});
//================================================

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


