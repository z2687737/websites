//  websites/BTF/serverRouteTemplate.js  (2nd tier)

/*module.exports = router
This is the most common pattern and 
is used when you want to export 
a single object, function, or class from a module. 

In the context of an Express router, 
this pattern is typically used 
to export the router object 
so it can be used in other parts of the application.

Use module.exports = router; 
when you have a standalone router module 
without any dependencies 
or when the dependencies are globally available 
and don't need to be passed dynamically.
*/ 

const express = require('express');
const router = express.Router();



// Route to handle photo upload
router.post('/upload', (req, res) => {
  // Handle photo upload logic
  res.send('Photo uploaded!');
});


// Route to handle video upload
router.post('/upload', (req, res) => {
  // Handle video upload logic
  res.send('Video uploaded!');
});


// Route to handle case report
router.post('/save', (req, res) => {
  // Handle saving case report logic
  res.send('Case report saved!');
});


// Additional routes
module.exports = router;