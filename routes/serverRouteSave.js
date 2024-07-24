//  websites/BTF/serverRouteSave.js  (2nd tier)

const express = require('express');
const router = express.Router();


module.exports = (pool) => {

router.get('/', async (req, res) => {
  try {
      const result = await pool.query('SELECT * FROM save');
      res.json(result.rows);
  } catch (err) {
      res.status(500).send(err.message);
  }
});

    // Define other routes...

    return router;


};




/*

// Route to handle case report
router.post('/save', (req, res) => {
  // Handle saving case report logic
  res.send('Case report saved!');
});

// Additional routes
module.exports = router;

*/