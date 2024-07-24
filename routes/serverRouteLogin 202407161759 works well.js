console.log(' loaded  websites/BTF/serverRouteLogin.js ');

const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

router.use(bodyParser.json());

module.exports = (db) => {
    console.log('Initializing login routes');

//on login.js Login Authentication route: Route to handle login authentication

/* (ITEM 1) check against table registration*/

router.post('/', (req, res) => {
    const { loginUserName, loginPassword } = req.body;
    console.log(`Received login request for username: ${loginUserName}, password: ${loginPassword}`);

        // Check if username and password match the hardcoded values
        if (loginUserName === "A" && loginPassword === "1") {
            // Redirect to loginLanding.html upon successful login
            res.redirect('/html/loginLanding.html');
            return; // Exit function after redirection
        }

        const query = `
        SELECT 
            IDregistration, 
            loginUserName, 
            loginPassword, 
            repeatPassword, 
            fName, 
            lname, 
            eMail, 
            hPhone, 
            streetNumber, 
            locality, 
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
        FROM registration 
        WHERE loginUserName = ? AND loginPassword = ?
    `;

    console.log('serverRouteLogin.js line 57: Executing query:', query);

    db.query(query, [loginUserName, loginPassword], (err, results) => {
                // Logging the outcome from registration table
console.log('serverRouteLogin.js line 90 Table: registration');
results.forEach(row => {
console.log(`IDregistration: ${row.IDregistration}, 
    loginUserName: ${row.loginUserName}, 
    loginPassword: ${row.loginPassword}, 
    role: ${row.role},
    aVolHours: ${row.aVolHours}`);
});
        if (err) {
            console.error('Error querying database:', err);
            return res.status(500).json({ success: false, message: 'Database error' });
        }

// Log results here to see what's returned
        console.log('serverRouteLogin line 103 Query results:', results); 

        if (results.length === 0) {
            console.log(`No matching user found for username: ${loginUserName}`);
            return res.status(401).json({ 
success: false, message: 'serverRouteAttendance.js line 80 Invalid credentials' });
        }

   // Logging the outcome from registration table
   console.log('serverRouteLogin.js line 82 Table: registration');
   results.forEach(row => {
       console.log(`
           IDregistration: ${row.IDregistration}, 
           loginUserName: ${row.loginUserName}, 
           loginPassword: ${row.loginPassword}, 
           repeatPassword: ${row.repeatPassword}, 
           fName: ${row.fName}, 
           lname: ${row.lname}, 
           eMail: ${row.eMail}, 
           hPhone: ${row.hPhone}, 
           streetNumber: ${row.streetNumber}, 
           locality: ${row.locality}, 
           suburb: ${row.suburb}, 
           street: ${row.street}, 
           address1: ${row.address1}, 
           address2: ${row.address2}, 
           city: ${row.city}, 
           state: ${row.state}, 
           zipcode: ${row.zipcode}, 
           role: ${row.role}, 
           volCat: ${row.volCat}, 
           tCert: ${row.tCert}, 
           background: ${row.background}, 
           aVolHours: ${row.aVolHours}, 
           created_at: ${row.created_at}
       `);
   });

        console.log('Table: registration');
        results.forEach(row => {
            console.log(`serverRouteLogin.js line 118 
                IDregistration: ${row.IDregistration}, 
                loginUserName: ${row.loginUserName}, 
                loginPassword: ${row.loginPassword}, 
                role: ${row.role}, 
                aVolHours: ${row.aVolHours}`);
        });

          // Extract the user role from the results
          const userRole = results[0].role;
          const aVolHours = results[0].aVolHours;

console.log('Retrieved user role:', userRole);
console.log(`User ${loginUserName} authenticated with role: ${userRole}`);
console.log(`Updated aVolHoursPrevious in attendance table for user ${loginUserName}`);


// After retrieving user role and other details
const userData = {
    IDregistration: results[0].IDregistration,
    loginUserName: results[0].loginUserName,
    role: results[0].role,
    aVolHours: results[0].aVolHours
};
// Pass userData to the next route (serverRouteAttendance.js)
res.locals.userData = userData;

//res.redirect('/html/attendance.html'); // Redirect to attendance page cannot have 2 res.


// line 127 User exists, insert into login table
const insertQuery = 'INSERT INTO login (loginUserName, loginPassword, created_at) VALUES (?, ?, NOW())';

db.query(insertQuery, [loginUserName, loginPassword], (err, result) => {
    if (err) {
        console.error('Error inserting data:', err);
        return res.status(500).json({ error: 'Failed to insert data' });
    }
    console.log('serverRouteLogin.js line 135 Data inserted into login table successfully');

/*if the registration.role = "admin" or "uc" or "lec" 
re-direct to loginLanding.html page
all other users redirecto to attendance.html page 

upon successful data insertion redirect based on user role
Redirect based on user role */
       if (userRole === 'admin' || userRole === 'uc' || userRole === 'lec') {
            console.log('Redirecting to loginLanding.html');
            return res.redirect('/html/loginLanding.html');
    
        } else {
            // Handle other roles or default redirection
            console.log('Redirecting to attendance.html');
            return res.redirect('/html/attendance.html');
        }

   // res.status(200).json({ success: true, message: 'Login successful' });

    
});
});
});

return router;
};
