console.log('Loaded websites/BTF/routes/serverRouteReports.js');

const express = require('express');
const router = express.Router();

module.exports = (db) => {
    // API endpoint to fetch all reports
    router.get('/', (req, res) => {
        const sql = 'SELECT * FROM casereport ORDER BY IDcasereport DESC';
        db.query(sql, (err, results) => {
            if (err) {
                console.error('Error fetching reports:', err);
                return res.status(500).json({ error: 'Failed to fetch reports' });
            }
            res.json(results);
        });
    });

    // API endpoint to fetch a list of reports with ID and created_at
    router.get('/list', (req, res) => {
        const sql = 'SELECT IDcasereport, created_at FROM casereport ORDER BY created_at DESC';
        db.query(sql, (err, results) => {
            if (err) {
                console.error('Error fetching report list:', err);
                return res.status(500).json({ error: 'Failed to fetch report list' });
            }
            res.json(results);
        });
    });

    // API endpoint to fetch a single report by ID
    router.get('/:id', (req, res) => {
        const sql = 'SELECT * FROM casereport WHERE IDcasereport = ?';
        const reportId = req.params.id;
        db.query(sql, [reportId], (err, result) => {
            if (err) {
                console.error('Error fetching report:', err);
                return res.status(500).json({ error: 'Failed to fetch report' });
            }
            res.json(result[0]);
        });
    });

    return router;
};
