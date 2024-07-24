console.log('loaded  websites/BTF/serverRouteLogin.js ');

const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

router.use(bodyParser.json());

module.exports = (db) => {
    console.log('Initializing login routes');

/*login endpoint to verify user login from index.html
 On login.js Login Authentication route: Route to handle login authentication */

    router.post('/', (req, res) => {
        const { loginUserName, loginPassword } = req.body;
        console.log(`Received login request for username: ${loginUserName}, password: ${loginPassword}`);

/* Perform authentication logic*/
/*Check if username and password match the hardcoded values */
        if (loginUserName === "A" && loginPassword === "1") {
            // Redirect to loginLanding.html upon successful login
            res.redirect('/html/loginLanding.html');
            return; // Exit function after redirection
        }

/*check against database - Query database to validate credentials*/
// Check if user input match with registration records
        const query = 'SELECT IDregistration, loginUserName, role FROM registration WHERE loginUserName = ? AND loginPassword = ?';
        console.log('serverRouteLogin.js line 30: Executing query:', query);

        db.query(query, [loginUserName, loginPassword], (err, results) => {
            if (err) {
                console.error('Error querying database:', err);
                return res.status(500).json({ success: false, message: 'Database error' });
            }

            console.log('serverRouteLogin line 35 Query results:', results); // Log results here to see what's returned

            if (results.length === 0) {
                console.log(`No matching user found for username: ${loginUserName}`);
                return res.status(401).json({ success: false, message: 'Invalid credentials' });
            }

// Logging the outcome from registration table
console.log('serverRouteLogin.js line 46 Table: registration');
results.forEach(row => {
console.log(`IDregistration: ${row.IDregistration}, loginUserName: ${row.loginUserName}, role: ${row.role}, aVolHours: ${row.aVolHours}`);
            });

            // Extract the user from the results
            const user = results[0];
            const userRole = user.role;

            // User exists, insert into login table
            const insertQuery = 'INSERT INTO login (loginUserName, loginPassword, created_at) VALUES (?, ?, NOW())';
            db.query(insertQuery, [loginUserName, loginPassword], (err, result) => {
                if (err) {
                    console.error('Error inserting data:', err);
                    return res.status(500).json({ error: 'Failed to insert data' });
                }
                console.log('serverRouteLogin.js line 62 Data inserted into login table successfully');

// Redirect based on user role this not working?
if (userRole === 'admin' || userRole === 'uc' || userRole === 'lec') {
    res.redirect('../html/loginLanding.html');
    } else {
    res.redirect('../html/attendance.html');
    }

/*Data Availability: The script fetches IDregistration, loginUserName, role, and aVolHours. */
/* cannot use this method because it will print out on a white page without re-direction
res.json({
    success: true,
    redirect: userRole === 'admin' || userRole === 'uc' || userRole === 'lec' ? '/html/loginLanding.html' : '/html/attendance.html',
    userData: {
    IDregistration: user.IDregistration,
    loginUserName: user.loginUserName,
    role: user.role,
    aVolHours: user.aVolHours
                    }
            });
 */

        });
    });
});
    return router;
};
