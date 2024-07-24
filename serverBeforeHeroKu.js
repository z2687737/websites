console.log('load websites/btf/serverRoute.js');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql2'); // Make sure this is mysql2
//const port = 3000;
const PORT = process.env.PORT || 3000;

//====== DATABASE CONNECTION ========

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'Sq00700&',
    database: 'btf',
    port: 3306
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to database as id', db.threadId);
});

//========== MIDDLEWARE =================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'www')));

//========== SET UP ROUTES =================

console.log('serverRoute.js is setting up routes...');
console.log('Route Mounting in server.js:');

// ========= registration  path ============>
console.log('Loading registration routes');
const registrationRoutes = require('./routes/serverRouteRegistration');
app.use('/api/registration', registrationRoutes(db));

// ========= login  path ============>
console.log('Loading login routes');
const loginRoutes = require('./routes/serverRouteLogin');
app.use('/api/login', loginRoutes(db)); //---->  today

/*  ========= hashPassword  path ============>  
const hashPasswordRoute = require('./routes/hashPasswordRoute');
app.use('/api/hashPassword', hashPasswordRoute);    */

// ========= testForm  path ============>
    console.log('Loading testForm routes');
const testFormRoutes = require('./routes/serverRouteAttendance');
app.use('/api/testForm', testFormRoutes);

//app.use('/api', testForm); // This line includes the attendance route
//---->  today

// ========= attendance  path ============>
console.log('Loading attendance routes');
const attendanceRoutes = require('./routes/serverRouteAttendance');
app.use('/api/attendance', attendanceRoutes);
app.use('/api/attendanceData', attendanceRoutes);
//app.use('/api', attendanceRoutes); // This line includes the attendance route
//---->  today


// ========= Contact Us ============>
const contactUsRoutes = require('./routes/serverRouteContactUs');
app.use('/api/contactus', contactUsRoutes(db));




// ========= caseReport Path ============>
console.log('Loading casereport routes');
const casereportRoutes = require('./routes/serverRouteCaseReport');

app.use('/api/casereport', casereportRoutes(db));
app.post('/sync-data', (req, res) => {
    // Handle sync-data request
    console.log('Sync data:', req.body);
    res.status(200).json({ message: 'Data synced' });
});

app.get('/fetch-data', (req, res) => {
    // Handle fetch-data request
    res.status(200).json({ data: [] });
});

// ========= Report Path ============>

console.log('Loading reports routes');
const reportsRoutes = require('./routes/serverRouteReports');
app.use('/api/reports', reportsRoutes(db));

const testGptRoutes = require('./routes/serverRouteTestGPT');
app.use('/api/testgpt', testGptRoutes(db));

//========  500 error ===================

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('server.js line 61: Internal Server Error, something broke!');
});

//========  START SERVER ===================

app.listen(port, () => {
    console.log(`Server is running on port ${PORT}`);
   // console.log(`Server is running on http://localhost:${port}`);
});
