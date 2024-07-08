//  websites/BTF/serverRouteCaseReport.js

const express = require('express');
const router = express.Router();

module.exports = (db) => {
  // API endpoint to fetch casereport data
  router.get('/api/casereport', (req, res) => {
    const sql = 'SELECT * FROM casereport';
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Error fetching casereport data: ' + err.stack);
        res.status(500).send('Error fetching casereport data');
        return;
      }
      res.json(results);
    });
  });

  // Endpoint to handle form submission
  router.post('/casereport', (req, res) => {
    const {
      IDlogin, dateTimePicker, decDist, campsites, issueType, issuetypeoptions, problem, severity, frequency, emailDEC, issueDescription, latitude, longitude, reporterName, reporterContact
    } = req.body;

    const sql = `
      INSERT INTO casereport (
        IDlogin, dateTimePicker, decDist, campsites, issueType, issuetypeoptions, problem, severity, frequency, emailDEC, issueDescription, latitude, longitude, reporterName, reporterContact, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
    `;

    const values = [IDlogin, dateTimePicker, decDist, campsites, issueType, issuetypeoptions, problem, severity, frequency, emailDEC, issueDescription, latitude, longitude, reporterName, reporterContact];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error inserting data into casereport table:', err);
        return res.status(500).json({ error: 'Failed to insert data' });
      }
      console.log('Data inserted into casereport table:', result);

      const IDcasereport = result.insertId;

      // Optionally handle photos and videos
      const photos = req.body.photos || [];
      const videos = req.body.videos || [];

      photos.forEach(photo => {
        const photoSql = `
          INSERT INTO casereport_photos (IDcasereport, photo, created_at)
          VALUES (?, ?, NOW())
        `;
        db.query(photoSql, [IDcasereport, photo], (photoErr) => {
          if (photoErr) console.error('Error inserting photo:', photoErr);
        });
      });

      videos.forEach(video => {
        const videoSql = `
          INSERT INTO casereport_videos (IDcasereport, video, created_at)
          VALUES (?, ?, NOW())
        `;
        db.query(videoSql, [IDcasereport, video], (videoErr) => {
          if (videoErr) console.error('Error inserting video:', videoErr);
        });
      });

      res.status(200).json({ message: 'Case report submitted successfully', id: IDcasereport });
    });
  });

  // Endpoint to synchronize report online to database
  router.post('/sync-report', (req, res) => {
    const report = req.body;

    const reportSql = `
      INSERT INTO casereport (
        IDlogin, dateTimePicker, decDist, campsites, issueType, issuetypeoptions, problem, severity, frequency, emailDEC, issueDescription, latitude, longitude, reporterName, reporterContact, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
    `;
    const reportValues = [
      report.data.IDlogin,
      report.data.dateTimePicker,
      report.data.decDist,
      report.data.campsites,
      report.data.issueType,
      report.data.issuetypeoptions,
      report.data.problem,
      report.data.severity,
      report.data.frequency,
      report.data.emailDEC,
      report.data.issueDescription,
      report.data.latitude,
      report.data.longitude,
      report.data.reporterName,
      report.data.reporterContact
    ];

    db.query(reportSql, reportValues, (error, results) => {
      if (error) {
        return res.json({ success: false, error: error });
      }

      const IDcasereport = results.insertId;

      // Insert photos
      report.photos.forEach(photo => {
        const photoSql = `
          INSERT INTO casereport_photos (IDcasereport, photo, created_at)
          VALUES (?, ?, NOW())
        `;
        db.query(photoSql, [IDcasereport, photo], (photoErr) => {
          if (photoErr) console.error('Error inserting photo:', photoErr);
        });
      });

      // Insert videos
      report.videos.forEach(video => {
        const videoSql = `
          INSERT INTO casereport_videos (IDcasereport, video, created_at)
          VALUES (?, ?, NOW())
        `;
        db.query(videoSql, [IDcasereport, video], (videoErr) => {
          if (videoErr) console.error('Error inserting video:', videoErr);
        });
      });

      res.json({ success: true });
    });
  });

  return router;
};


  /*
app.post('/submitReport', (req, res) => {
  const report = req.body;
  const sql = 'INSERT INTO casereport (name, contact, date, decDist) VALUES (?, ?, ?, ?)';
  const values = [report.name, report.contact, report.date, report.decDist];
  db.query(sql, values, (err, result) => {
      if (err) throw err;
      res.json({ success: true });
  });
});

app.post('/sendEmail', (req, res) => {
  const report = req.body;
  const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: 'your_email@gmail.com',
          pass: 'your_password'
      }
  });
  const mailOptions = {
      from: 'your_email@gmail.com',
      to: 'dec_email@example.com',
      subject: 'Track Maintenance Report',
      text: `Name: ${report.name}\nContact: ${report.contact}\nDate: ${report.date}\nDEC District: ${report.decDist}`
  };
  transporter.sendMail(mailOptions, (err, info) => {
      if (err) throw err;
      res.json({ success: true });
  });
});




  -- Get the last inserted ID
SET @last_id = LAST_INSERT_ID();

-- Insert photos
INSERT INTO casereport_photos (IDcasereport, photo, created_at)
VALUES (@last_id, ?, NOW());

-- Insert videos
INSERT INTO casereport_videos (IDcasereport, video, created_at)
VALUES (@last_id, ?, NOW());


-- Fetch report
SELECT * FROM casereport WHERE IDcasereport = ?;

-- Fetch associated photos
SELECT photo FROM casereport_photos WHERE IDcasereport = ?;

-- Fetch associated videos
SELECT video FROM casereport_videos WHERE IDcasereport = ?;
*/


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
//module.exports = router;