console.log('Loaded websites/BTF/routes/serverRouteCaseReport.js');

const express = require('express');
const router = express.Router();

module.exports = (db) => {

    // Function to insert photos
    const insertPhotos = (IDcasereport, photos, callback) => {
        if (photos && photos.length > 0) {
            let completed = 0;
            for (let photo of photos) {
                const sqlPhoto = `INSERT INTO casereport_photos (IDcasereport, photo, created_at) VALUES (?, ?, NOW())`;
                db.query(sqlPhoto, [IDcasereport, photo], (err, result) => {
                    if (err) {
                        console.error('Error inserting photo:', err);
                        return callback(err);
                    }
                    completed++;
                    if (completed === photos.length) {
                        callback(null);
                    }
                });
            }
        } else {
            callback(null);
        }
    };

    // Function to insert videos
    const insertVideos = (IDcasereport, videos, callback) => {
        if (videos && videos.length > 0) {
            let completed = 0;
            for (let video of videos) {
                const sqlVideo = `INSERT INTO casereport_videos (IDcasereport, video, created_at) VALUES (?, ?, NOW())`;
                db.query(sqlVideo, [IDcasereport, video], (err, result) => {
                    if (err) {
                        console.error('Error inserting video:', err);
                        return callback(err);
                    }
                    completed++;
                    if (completed === videos.length) {
                        callback(null);
                    }
                });
            }
        } else {
            callback(null);
        }
    };

    // Function to insert case report
    const insertCaseReport = (req, res) => {
        const { 
            IDlogin,
            reporterName,
            reporterContact,
            reporterEmailAddress, 
            dateTimePicker,
            decDist,
            campsite,
            issueType,
            issuetypeoptions,
            problem,
            severity,
            frequency,
            emailDEC,
            issueDescription,
            latitude,
            longitude,
            photos,
            videos
        } = req.body;

        const sql = `INSERT INTO casereport (
            IDlogin,
            reporterName,
            reporterContact,
            reporterEmailAddress, 
            dateTimePicker,
            decDist,
            campsite,
            issueType,
            issuetypeoptions,
            problem,
            severity,
            frequency,
            emailDEC,
            issueDescription,
            latitude,
            longitude,
            created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, now())`;

        db.query(sql, [
            IDlogin,
            reporterName,
            reporterContact,
            reporterEmailAddress, 
            dateTimePicker,
            decDist,
            campsite,
            issueType,
            issuetypeoptions,
            problem,
            severity,
            frequency,
            emailDEC,
            issueDescription,
            latitude,
            longitude
        ], (err, result) => {
            if (err) {
                console.error('Error inserting case report:', err);
                return res.status(500).json({ error: 'Failed to insert case report' });
            }

            const IDcasereport = result.insertId;
            console.log('Case report inserted successfully with ID:', IDcasereport);

            insertPhotos(IDcasereport, photos, (err) => {
                if (err) {
                    return res.status(500).json({ error: 'Failed to insert photos' });
                }

                insertVideos(IDcasereport, videos, (err) => {
                    if (err) {
                        return res.status(500).json({ error: 'Failed to insert videos' });
                    }

                    res.json({ success: true, reportId: IDcasereport });
                });
            });
        });
    };

    // API endpoint to submit a case report
    router.post('/', (req, res) => {
        insertCaseReport(req, res);
    });

    // API endpoint to fetch all case reports
    router.get('/', (req, res) => {
        const sql = 'SELECT * FROM casereport ORDER BY IDcasereport DESC';
        db.query(sql, (err, results) => {
            if (err) {
                console.error('Error fetching case reports:', err);
                return res.status(500).json({ error: 'Failed to fetch case reports' });
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

    // API endpoint to fetch a single case report by ID
    router.get('/:id', (req, res) => {
        const sql = 'SELECT * FROM casereport WHERE IDcasereport = ?';
        const reportId = req.params.id;
        db.query(sql, [reportId], (err, result) => {
            if (err) {
                console.error('Error fetching case report:', err);
                return res.status(500).json({ error: 'Failed to fetch case report' });
            }
            res.json(result[0]);
        });
    });

    // Additional sync-data endpoint if needed
    router.post('/sync-data', (req, res) => {
        insertCaseReport(req, res);
    });

    return router;
};
