//  websites/BTF/route/serverRouteTestSave.js 

const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

// Route to handle testSave
router.post('/testSave', (req, res) => {
  const { number, text } = req.body;
  const sql = 'INSERT INTO testsave (number, text, created_at) VALUES (?, ?, NOW())';
  db.query(sql, [number, text], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).send('Error saving data');
    }
    res.send('Form Saved!');
  });
});

// Route to handle saveForm
router.post('/save', (req, res) => {
  const { save } = req.body;
  // You can handle the save logic here as per your requirements
  res.send('Form Saved!');
});


// Additional routes
module.exports = router;