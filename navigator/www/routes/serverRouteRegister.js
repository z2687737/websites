console.log("btf/www/routes/serverRouteRegistration.js");
const express = require('express');
//const router = express.Router();

module.exports = (db) => {
    const router = express.Router();

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
          tCert,
          background,
          
          aVolHours,
        
        } = req.body;
        
        console.log('Received registration data:', registrationData);
        res.json({ success: true, message: 'Registration successful!' });

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
        ], (err, result) => {
            if (err) {
                console.error('Error inserting data:', err);
                return res.status(500).json({ error: 'Failed to insert data' });
            }
            console.log('Data inserted successfully');
            res.json({ success: true, message: 'Registration successful!' });
        });
    });

    return router;
};
