console.log('websites/BTF/route/serverRouteCaseReport.js

  const express = require('express');
  
  module.exports = (db) => {
      const router = express.Router();
  
      router.post('/', (req, res) => {
          const { 
  IDlogin,
  reporterName,
  reporterContact,
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
   } = req.body;
  
          const sql = `INSERT INTO casereport (
  IDlogin,
  reporterName,
  reporterContact,
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
  created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, now())`;
          db.query(sql, [
  IDlogin,
  reporterName,
  reporterContact,
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
                  console.error('Error inserting data:', err);
                  return res.status(500).json({ error: 'Failed to insert data' });
              }
              console.log('Data inserted successfully');
              res.json({ success: true });
          });
      });
  
      return router;
  };
  