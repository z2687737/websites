//  websites/BTF/routes/serverRouteAttendance.js

const express = require('express');
const router = express.Router();

//Attendance Route
// (3)Scan Attendance endpoint to handle attendance.html ===============

// Endpoint to handle attendance scanning
router.post('/api/attendance', (req, res) => {
  const { IDregistration, chkInDTS, chkOutDTS } = req.body;

  // Calculate volunteer hours
  const chkIn = new Date(chkInDTS);
  const chkOut = new Date(chkOutDTS);
  const timeDiff = Math.abs(chkOut - chkIn); // Difference in milliseconds
  const volHours = timeDiff / (1000 * 60 * 60); // Convert milliseconds to hours

    // Calculate accumulated volunteer hours (aVolHours)
    const aVolHours = 0;  // You need to calculate this based on your requirements

  // Query to insert attendance data into the database
  const sql = 'INSERT INTO attendance (IDregistration, chkInDTS, chkOutDTS, volHours, aVolHours, created_at) VALUES (?, ?, ?, ?, ?, NOW())';
  const values = [IDregistration, chkInDTS, chkOutDTS, volHours, aVolHours];

  // Execute the query
  db.query(sql, values, async (err, result) => {
    if (err) {
      console.error('Error inserting data into attendance table:', err);
      return res.status(500).json({ error: 'Failed to store data' });
    }

    console.log('Data inserted into attendance table:', result);

    try {
      // Calculate accumulated volunteer hours
      const sqlSum = 'SELECT SUM(volHours) AS accumulatedHours FROM attendance';
      const [rows] = await db.promise().query(sqlSum);
      const accumulatedHours = rows[0].accumulatedHours;

      console.log('Accumulated volunteer hours:', accumulatedHours);

      // Respond with success message and accumulated hours
      res.status(200).json({ message: 'Attendance data stored successfully', accumulatedHours });
    } catch (error) {
      console.error('Error calculating accumulated volunteer hours:', error);
      res.status(500).json({ error: 'Error calculating accumulated hours' });
    }
  });
});


// Handle POST request to /api/attendance
router.post('/api/submitAttendance', (req, res) => {
  const formData = req.body; // Form data sent from frontend
  console.log('Received form data:', formData);
  
  // Process the form data (e.g., save to database)
  // Example: Database operation, data validation, etc.
  
  res.json({ success: true, message: 'Form data received and processed' });
});



    //on login.js Login Authentication route: Route to handle login authentication
/* (ITEM 1) check against table registration*/

router.post('/api/login', (req, res) => {
  const { loginUserName, loginPassword } = req.body;
  console.log(`Received login request for username: ${loginUserName}`);

  const query = 'SELECT IDregistration, loginUserName, aVolHours FROM registration WHERE loginUserName = ? AND loginPassword = ?';
  db.query(query, [loginUserName, loginPassword], (err, results) => {
      if (err) {
          console.error('Error querying database:', err);
          return res.status(500).json({ success: false, message: 'Database error' });
      }
      if (results.length === 0) {
          return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
      const userData = results[0];
      res.status(200).json({ success: true, user: userData });
  });
});


    // (ITEM 3 )  Route to fetch user data
    router.get('/api/getUserData/:IDregistration', (req, res) => {
      const IDregistration = req.params.IDregistration;
      const query = 'SELECT IDregistration, aVolHours FROM registration WHERE IDregistration = ?';
      db.query(query, [IDregistration], (err, results) => {
          if (err) {
              console.error('Error fetching user data:', err);
              return res.status(500).send('Error fetching user data');
          }
          if (results.length === 0) {
              return res.status(404).send('User not found');
          }
          res.json(results[0]);
      });
  });


  // (ITEM 4)  Route to update user hours
  router.post('/api/updateUserHours/:IDregistration', (req, res) => {
      const IDregistration = req.params.IDregistration;
      const { aVolHours } = req.body;
      const query = 'UPDATE registration SET aVolHours = ? WHERE IDregistration = ?';
      db.query(query, [aVolHours, IDregistration], (err) => {
          if (err) {
              console.error('Error updating user hours:', err);
              return res.status(500).send('Error updating user hours');
          }
          res.send('User hours updated successfully');
      });
  });


  // (ITEM 5) Route to add attendance record
  router.post('/api/addAttendance', (req, res) => {
      const { IDregistration, chkInDTS, chkOutDTS, volHours, aVolHours } = req.body;
      const query = 'INSERT INTO attendance (IDregistration, chkInDTS, chkOutDTS, volHours, aVolHours, created_at) VALUES (?, ?, ?, ?, ?, NOW())';
      db.query(query, [IDregistration, chkInDTS, chkOutDTS, volHours, aVolHours], (err) => {
          if (err) {
              console.error('Error adding attendance record:', err);
              return res.status(500).send('Error adding attendance record');
          }
          res.send('Attendance record added successfully');
      });
  });



module.exports = router;