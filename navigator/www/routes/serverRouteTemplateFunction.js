//  websites/BTF/serverRouteTemplate.js  (2nd tier)

/*.

return router; within a function
This pattern is used when you want to export a function that, 
when called, returns an Express router object. 
This can be useful if you need to pass dependencies 
(like a database connection) to the router.

Use module.exports = (db) => { ... return router; }; 
when your router depends on external resources 
(like a database connection) that need to be passed in
 when the router is instantiated.
*/ 

const express = require('express');

module.exports = (db) => {
    const router = express.Router();
  
    router.get('/example', (req, res) => {
      // Use db to fetch data
      res.send('Example route');
    });
  
    return router;
  };