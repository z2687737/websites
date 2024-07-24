const express = require('express');
const router = express.Router();

module.exports = (db) => {
    console.log('Initializing login routes');

    // Route to insert new login data
    router.post('/', (req, res) => {
        const { loginUserName, loginPassword } = req.body;
        const sql = `INSERT INTO login (loginUserName, loginPassword, created_at) VALUES (?, ?, NOW())`;
        db.query(sql, [loginUserName, loginPassword], (err, result) => {
            if (err) {
                console.error('Error inserting data:', err);
                return res.status(500).json({ error: 'Failed to insert data' });
            }
            console.log('Data inserted successfully');
           // res.status(200).json({ success: true, message: 'serverRouteLogin.js ine 17 Data saved successfully' });
            // Redirect to loginLanding.html upon successful data insertion
            res.redirect('/html/loginLanding.html');
        });
    });

    // Route to handle login
    router.post('/authenticate', (req, res) => {
        const { loginUserName, loginPassword } = req.body;
        const sql = `SELECT * FROM login WHERE loginUserName = ? AND loginPassword = ?`;
        db.query(sql, [loginUserName, loginPassword], (err, result) => {
            if (err) {
                console.error('Error querying database:', err);
                return res.status(500).json({ error: 'Database error' });
            }

            if (result.length > 0) {
                // Login successful
                res.status(200).json({ success: true, message: 'Login successful' });
            } else {
                // Login failed
                res.status(401).json({ success: false, message: 'Login failed' });
            }
        });
    });

    return router;
};
