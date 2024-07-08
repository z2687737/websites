//  websites/BTF/routes/serverRouteAttendance.js

const express = require('express');
const router = express.Router();

//Attendance Route
// (3)Scan Attendance endpoint to handle attendance.html ===============

// Endpoint to handle attendance scanning
router.post('/attendance', (req, res) => {
  const { chkInDTS, chkOutDTS } = req.body;

  // Calculate volunteer hours
  const chkIn = new Date(chkInDTS);
  const chkOut = new Date(chkOutDTS);
  const timeDiff = Math.abs(chkOut - chkIn); // Difference in milliseconds
  const volHours = timeDiff / (1000 * 60 * 60); // Convert milliseconds to hours

  // Query to insert attendance data
  const sql = 'INSERT INTO attendance (chkInDTS, chkOutDTS, volHours) VALUES (?, ?, ?)';
  const values = [chkInDTS, chkOutDTS, volHours];

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


module.exports = router;