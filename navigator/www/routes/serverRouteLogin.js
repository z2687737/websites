console.log(' loaded  websites/BTF/serverRouteLogin.js ');

const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

router.use(bodyParser.json());

module.exports = (db) => {
    console.log('Initializing login routes');

    // On login.js Login Authentication route: Route to handle login authentication
    router.post('/', (req, res) => {
        const { loginUserName, loginPassword } = req.body;
        console.log(`Received login request for username: ${loginUserName}, password: ${loginPassword}`);

        // Check if username and password match the hardcoded values
        if (loginUserName === "A" && loginPassword === "1") {
            // Redirect to loginLanding.html upon successful login
            res.redirect('/html/loginLanding.html');
            return; // Exit function after redirection
        }

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
            console.log('Table: registration');
            results.forEach(row => {
                console.log(`IDregistration: ${row.IDregistration}, loginUserName: ${row.loginUserName}, role: ${row.role}`);
            });

            // Extract the user role from the results
            const userRole = results[0].role;

            // User exists, insert into login table
            const insertQuery = 'INSERT INTO login (loginUserName, loginPassword, created_at) VALUES (?, ?, NOW())';
            db.query(insertQuery, [loginUserName, loginPassword], (err, result) => {
                if (err) {
                    console.error('Error inserting data:', err);
                    return res.status(500).json({ error: 'Failed to insert data' });
                }
                console.log('Data inserted into login table successfully');

                // Redirect based on user role
                if (userRole === 'admin' || userRole === 'uc' || userRole === 'lec') {
                    res.redirect('/html/loginLanding.html');
                } else {
                    res.redirect('/html/attendance.html');
                }

                // res.status(200).json({ success: true, message: 'Login successful' });
            });
        });
    });

    return router;
};
