console.log('Loaded websites/BTF/routes/serverRouteCaseReport.js');

  const express = require('express');
  const router = express.Router();
  
  module.exports = (db) => {
    
// API endpoint to submit a case report
      router.post('/', (req, res) => {
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
  
// Insert into casereport table
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
  photos,
  videos,
  created_at) VALUES (?, ?, ?, ?, ?,   ?, ?, ?, ?, ?,   ?, ?, ?, ?, ?,    ?, ?, ?, now())`;
          
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

// Insert photos into casereport_photos table
    if (photos && photos.length > 0) {
        const photoQueries = photos.map(photo => new Promise((resolve, reject) => {
            const sqlPhoto = `INSERT INTO casereport_photos (IDcasereport, photo, created_at) VALUES (?, ?, NOW())`;
            db.query(sqlPhoto, [IDcasereport, photo], (err, result) => {
                if (err) {
                    console.error('Error inserting photo:', err);
                    return reject(err);
                }
                resolve(result);
            });
        }));

        Promise.all(photoQueries)
            .then(results => console.log('Photos inserted successfully'))
            .catch(err => console.error('Error inserting photos:', err));
    }

    // Insert videos into casereport_videos table
    if (videos && videos.length > 0) {
        const videoQueries = videos.map(video => new Promise((resolve, reject) => {
            const sqlVideo = `INSERT INTO casereport_videos (IDcasereport, video, created_at) VALUES (?, ?, NOW())`;
            db.query(sqlVideo, [IDcasereport, video], (err, result) => {
                if (err) {
                    console.error('Error inserting video:', err);
                    return reject(err);
                }
                resolve(result);
            });
        }));

        Promise.all(videoQueries)
            .then(results => console.log('Videos inserted successfully'))
            .catch(err => console.error('Error inserting videos:', err));
    }

    res.json({ success: true, reportId: IDcasereport });
});
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

return router;
};

