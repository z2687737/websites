const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

router.use(bodyParser.json());

module.exports = (db) => {
    // Inserting Login Data: Route to insert new login data
    router.post('/', (req, res) => {
        const { loginUserName, loginPassword } = req.body;
        const sql = `INSERT INTO login (loginUserName, loginPassword, created_at) VALUES (?, ?, NOW())`;
        db.query(sql, [loginUserName, loginPassword], (err, result) => {
            if (err) {
                console.error('Error inserting data:', err);
                return res.status(500).json({ error: 'Failed to insert data' });
            }
            console.log('serverRouteLogin.js line 20 Data inserted successfully');
            res.status(200).json({ success: true, message: 'serverRouteLogin.js line 24: Data saved successfully' });
        });
    });

    // Login Authentication: Route to authenticate login credentials
    router.post('/api/authenticate', (req, res) => {
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

    // Route to fetch user data
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

    // Route to update user hours
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

    // Route to add attendance record
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

    return router;
};
