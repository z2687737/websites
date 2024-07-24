console.log("websites/BTF/routes/serverRoutetestForm.js");

const express = require('express');
const router = express.Router();

// Endpoint to handle testForm scanning
/* router.post('/', (req, res) => {      //this will receive a full red page of error message on terminal. */
router.post('/api/testForm', (req, res) => {

    const { loginUserName, chkInDTS, chkOutDTS } = req.body;

    // Perform computations for volHours and aVolHours
    const volHours = computeVolHours(chkInDTS, chkOutDTS);
    const aVolHours = computeAccumulatedVolHours(volHours);

    // Retrieve IDregistration based on loginUserName
    const query = 'SELECT IDregistration FROM registration WHERE loginUserName = ?';
    db.query(query, [loginUserName], (err, results) => {
        if (err) throw err;

        const IDregistration = results[0].IDregistration;

        // Insert into testform table
        const insertQuery = 'INSERT INTO testform (IDregistration, loginUserName, chkInDTS, chkOutDTS, volHours, aVolHours, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())';
        db.query(insertQuery, [IDregistration, loginUserName, chkInDTS, chkOutDTS, volHours, aVolHours], (err, result) => {
            if (err) throw err;
            res.json({ success: true });
        });
    });
});

function computeVolHours(chkInDTS, chkOutDTS) {
    // Your logic to compute volHours
}

function computeAccumulatedVolHours(volHours) {
    // Your logic to compute accumulated volHours
}

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
