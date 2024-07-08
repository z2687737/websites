//  websites/BTF/server.js  (first tier)

const express = require('express');
const path = require('path');
//const mysql = require('mysql2'); 
const mysql = require('mysql2/promise'); // Import MySQL module promise base version due to async wait

const bodyParser = require('body-parser'); // Import body-parser module
//const mysqlRouter = require('./mysql-backend/routes/mysqlRoutes'); // Example module for MySQL backend
//const photoVideoRouter = require('./photo-video-backend/routes/photoVideoRoutes'); // Example module for photo-video backend

const nodemailer = require('nodemailer'); // Optional for sending emails
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { register } = require('module');

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
//const db = mysql.createConnection({   --> using promise createPool instead of conection
  const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'root', // Replace with your MySQL username
  password: 'Sq00700&', // Replace with your MySQL password
  database: 'btf', // Replace with your MySQL database name
  port: 3306 
});

/*  Using Async/Await:
All the database query calls are now awaited, 
ensuring that the function properly waits for the results before proceeding.
NOTE:  add "promise"  remove all "connection"  use "createPool" instead.
*/

/*    using promise asyn await no need this paragraph
db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});
*/
//================================================

//perform queries using async/await syntax
async function getUserById(IDregistration) {
  const [rows, fields] = await db.query('SELECT * FROM registration WHERE IDregistration = ?', [IDregistration]);
  return rows;
}

getUserById(1).then(registration => {
  console.log(registration);
}).catch(err => {
  console.error('Error fetching registration:', err);
});


//================================================

/*
What is req.body?
In an Express.js application, 
req.body is an object that 
contains data sent by the client 
in the body of the HTTP request. 

When a client (such as a browser or a mobile app) 
submits a form or sends a JSON payload, 
this data is accessible in the server via req.body

For req.body to be populated, 
you need middleware in Express.js to parse the incoming request body. 

Commonly used middleware includes express.json() and express.urlencoded().

--> Middleware to parse JSON bodies
app.use(express.json());

--> Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

*/

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


//================================================ REGISTRATION

/*server.js Registration Endpoint for registration table
 (1.b.i) Registration Form endpoint to 
 handle user registration from index.html.

DESTRUCTURE THE REQUEST BODY:
 destructure the properties from the req.body object 
  into individual variables. 
*/


//Check existing user
// Function to check if a user already exists in the database

async function checkExistingUser(fName, lname, hPhone) {
  const sql = `
      SELECT * FROM registration
      WHERE fName = ? AND lname = ? AND hPhone = ?
  `;
  const values = [fName, lname, hPhone];

  try {
      const [rows, fields] = await db.query(sql, values);
      return rows.length > 0; // Return true if user exists, false otherwise
  } catch (error) {
      console.error('Database query error:', error);
      throw error;
  }
}

// Endpoint to handle user registration

app.post('/api/registration', async (req, res) => {
  console.log('Received registration request:', req.body);

  try {
    // Destructure the request body
    const {
      loginUserName,
      loginPassword,
      repeatPassword,
      fName,
      lname,
      eMail,
      hPhone,
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
      role,
      volCat,
      tCert,
      background,
      aVolHours
    } = req.body;

//VALIDATION RULES

    // Basic input validation
    if (!loginUserName || !loginPassword || !fName || !lname || !eMail || !hPhone || !streetNumber || !suburb || !street || !zipcode || !role || !volCat) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Validate password strength
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(loginPassword)) {
      return res.status(400).json({
        success: false,
        error: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.'
      });
    }

    // Check if passwords match
    if (loginPassword !== repeatPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(loginPassword, 10);
    const hashedRepeatPassword = await bcrypt.hash(repeatPassword, 10);

    // Prepare registration data
    const registrationData = {
      loginUserName,
       loginPassword: hashedPassword,
       repeatPassword: hashedRepeatPassword,
      fName,
      lname,
      eMail,
      hPhone,
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
      role,
      volCat,
      tCert: tCert.join(', '), // Convert array to comma-separated string
      background,
      aVolHours,
      created_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
    };

    console.log('Inserting into database:', registrationData);

    // Insert data into the database (replace with your database logic)
    const sql = `
      INSERT INTO registration 
      SET ?
    `;

    // Execute the query using your MySQL connection
    const [results] = await db.query(sql, registrationData);
    console.log('Registration successful');
    res.status(200).json({ success: true, message: 'Registration successful' });

  } catch (error) {
    console.error('Error processing registration:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//================================================ CONTACT US
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
  db.query(query, data, (err, results) => {
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
  db.query(query, [IDregistration], (err, results) => {
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
  db.query(query, data, (err, results) => {
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
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

/* Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
*/

