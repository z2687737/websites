console.log(' HERE websites/BTF/routes/serverRouteAttendance.js  ');  
console.log(' 20240716 unable to save to database table attendance ');
console.log(' 20240716 updated aVolHours first field well done.  ');
const express = require('express');
const router = express.Router();

//Attendance Route

/*(1) End point to get userData from serverRouteLogin.js
for the four items:
(1) IDregistration
(2) loginUserName
(3) role
(4) aVolHours

from:

// After retrieving user role and other details
const userData = {
    IDregistration: results[0].IDregistration,
    loginUserName: results[0].loginUserName,
    role: results[0].role,
    aVolHours: results[0].aVolHours
};

*/
console.log("1.  route /attendanceData to get data from serverRouteLogin.js ");
router.get('/attendanceData', (req, res) => {
  
  // ( 3a )   middleware to fetch userData from login
function getUserData(req, res, next) {
  // Simulated user data retrieval, replace with your actual logic
  const userData = {
    //temporary hard code, should be retrieved from serverRouteLogin.js
    IDregistration: 1, 
    loginUserName: Volunteer1
   // role: Volunteer;   - the 3rd and 4th giving red lines and error when node server.js
   // aVolHours: 2;


  };
  res.locals.userData = userData; // Store userData in res.locals for use in routes
  next();
}

// ( 3b ) Middleware to fetch user data
router.use(getUserData);

  // Log userData
  console.log('Received userData in serverRouteAttendance:', userData); 
  res.status(200).json(userData); // Respond with userData
});

// (2)Scan Attendance endpoint to handle attendance.html ===============

// Endpoint to handle attendance scanning
console.log("2.  route /attendance to get data from attendance.html and INSERT into attendance ");
router.post('/api/attendance', (req, res) => {

  /* this portion below of userData come in from serverRouteLogin.js
retrieved from table Registration after matching with the loginUserName:
*/
// Get IDregistration from user data  
const { IDregistration } = res.locals.userData; 
// const userData = res.locals.userData;

/* the cheInDTS cheOutDTS come from attendance.html form user input */
  const { chkInDTS, chkOutDTS } = req.body;

  /* ====== do not thouch below portion:
  all below computation are correct and well done ===== */

  // Calculate volunteer hours
  const chkIn = new Date(chkInDTS);
  const chkOut = new Date(chkOutDTS);
  const timeDiff = Math.abs(chkOut - chkIn); // Difference in milliseconds
  const volHours = timeDiff / (1000 * 60 * 60); // Convert milliseconds to hours

    // line 79  Calculate accumulated volunteer hours (aVolHours)

  // line 80 Query to insert attendance data into the database
  const sql = 'INSERT INTO attendance (IDregistration, chkInDTS, chkOutDTS, volHours, aVolHours, created_at) VALUES (?, ?, ?, ?, ?, NOW())';
  const values = [IDregistration, chkInDTS, chkOutDTS, volHours, aVolHours];

  // Execute the query
  db.query(sql, values, async (err, result) => {
    if (err) {
      console.error('Error inserting data into attendance table:', err);
      return res.status(500).json({ error: 'Failed to store data' });
    }

    console.log('Data inserted into attendance table:', result);

/* can move up aVolHours calculation to line 79 ? 
calculation should be before INSERT into attendance (); */
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