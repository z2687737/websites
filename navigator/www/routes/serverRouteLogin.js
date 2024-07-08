console.log('websites/BTF/serverRouteLogin.js ');

const express = require('express');

module.exports = (db) => {
    const router = express.Router();

    router.post('/', (req, res) => {
        const { 
          loginUserName,
          loginPassword,
           } = req.body;

        const sql = `INSERT INTO login (
loginUserName,
loginPassword,
created_at
) VALUES (?, ?, NOW())`;
        db.query(sql, [loginUserName, loginPassword,
          ], (err, result) => {
            if (err) {
                console.error('Error inserting data:', err);
                return res.status(500).json({ error: 'Failed to insert data' });
            }
            console.log('Data inserted successfully');
            res.json({ success: true });
        });
    });

    return router;
};
