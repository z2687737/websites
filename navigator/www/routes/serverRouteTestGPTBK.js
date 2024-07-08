//btf/www/routes/serverRouteTestGPT.js

const express = require('express');

module.exports = (db) => {
    const router = express.Router();

    router.post('/', (req, res) => {
        const { name, email } = req.body;

        const sql = `INSERT INTO testgpt (name, email, created_at) VALUES (?, ?, NOW())`;
        db.query(sql, [name, email], (err, result) => {
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
