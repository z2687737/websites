//btf/www/routes/serverRouteregistration.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = (db) => {
    const router = express.Router();

    // Function to check for duplicate usernames
    function checkDuplicateUsername(loginUserName, callback) {
        db.query('SELECT COUNT(*) as count FROM registration WHERE loginUserName = ?', [loginUserName], (error, results) => {
            if (error) {
                console.error('Database query error:', error);
                return callback(error, null);
            }
            const count = results[0].count;
            callback(null, count > 0); // Returns true if duplicate exists
        });
    }

    // Route to handle registration
    router.post('/', (req, res) => {
        const {
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
            tCert = '', // Default to empty string if not provided
            background,
            aVolHours
        } = req.body;

        console.log('Received registration data:', req.body);

        checkDuplicateUsername(loginUserName, (error, isDuplicate) => {
            if (error) {
                return res.status(500).json({ message: 'Server error' });
            }

            if (isDuplicate) {
                return res.status(400).json({ message: 'sRR.js line 80 Username already exists' });
            }

            /* Hash the password
            bcrypt.hash(loginPassword, saltRounds, (err, hashedPassword) => {
                if (err) {
                    console.error('Error hashing password:', err);
                    return res.status(500).json({ message: 'Server error' });
                } */

                const sql = `INSERT INTO registration (
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
                    aVolHours,
                    created_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`;

                db.query(sql, [
                    loginUserName,
               //     hashedPassword,
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
                    JSON.stringify(tCert), // Convert tCert to JSON string
                    background,
                    aVolHours || 0 // Default to 0 if not provided
                ], (error, results) => {
                    if (error) {
                        console.error('Error registering user:', error);
                        return res.status(500).json({ message: 'Server error' });
                    }

                    console.log('User successfully registered');
                    res.json({ success: true, role: role });
                });
//HashPassword });
        });
    });

    return router;
};



