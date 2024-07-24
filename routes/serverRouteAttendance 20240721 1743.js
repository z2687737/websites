console.log("websites/BTF/routes/serverRouteAttendance.js");

const express = require('express');
const router = express.Router();

// Endpoint to handle attendance scanning
router.post('/api/attendance', (req, res) => {
  const { IDregistration, loginUserName, chkInDTS, chkOutDTS, volHours, aVolHours } = req.body;

  // Simple validation for essential fields
  if (!IDregistration || !loginUserName || !chkInDTS || !chkOutDTS || volHours === undefined || aVolHours === undefined) {
    console.error('Missing required fields:', req.body); // Log missing fields
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Query to insert attendance data
  const sql = 'INSERT INTO attendance (IDregistration, loginUserName, chkInDTS, chkOutDTS, volHours, aVolHours, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())';
  const values = [IDregistration, loginUserName, chkInDTS, chkOutDTS, volHours, aVolHours];

  // Execute the SQL query
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.status(200).json({ message: 'Attendance recorded successfully' });
  });
});

module.exports = router;

  /*
  // Execute the query to insert data
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting data into attendance table:', err);
      return res.status(500).json({ error: 'Failed to store data' });
    }

    console.log('Data inserted into attendance table:', result);

    // Query to calculate accumulated volunteer hours
    //const sqlSum = 'SELECT SUM(volHours) AS accumulatedHours FROM attendance';
    
  //  db.query(sqlSum, (err, rows) => {
   //   if (err) {
   //     console.error('Error calculating accumulated volunteer hours:', err);
   //     return res.status(500).json({ error: 'Error calculating accumulated hours' });
   //   }

   //   const accumulatedHours = rows[0].accumulatedHours || 0;
   //   console.log('Accumulated volunteer hours:', accumulatedHours);

      // Respond with success message and accumulated hours
    //  res.status(200).json({ message: 'Attendance data stored successfully', accumulatedHours });
 //   });
  });
});


module.exports = router;

*/



