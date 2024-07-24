//  websites/BTFroutes/serverRouteContactUs.js  (first tier)

const express = require('express');
const router = express.Router();


//Registration Route
// (1.b.i) Registration Form endpoint to handle user registration from index.html ==============
// Registration Endpoint for users table
router.post('/registration', async (req, res) => {
  console.log('Received registration request:', req.body);
  const { 
    loginUserName, loginPassword, repeatPassword, fName, lname, eMail, hPhone, role, rLocality, 
    fAddress, streetNumber, suburb, street, address1, address2, city, state, zipcode, volCat, 
    tCert, background 
  } = req.body;
  
  if (loginPassword !== repeatPassword) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  const hashedPassword = await bcrypt.hash(loginPassword, 10);
    
  const login = { 
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
  };
  
  console.log(req.body); // Before inserting into database

  const sql = 'INSERT INTO registration SET ?';
  db.query(sql, login, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database query error' });
    }
    res.status(200).json({ message: 'User registered successfully' });
  });
});


module.exports = router;