const express = require('express');

module.exports = (db) => {
    const router = express.Router();

    router.post('/', (req, res) => {
        const { name, email, subject, message} = req.body;

        const sql = `INSERT INTO contactus (name, email, subject, message, created_at) VALUES (?, ?, ?, ?, NOW())`;

        db.query(sql, [
          name,
          email,
          subject,
          message,
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


