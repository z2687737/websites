console.log('load websites/btf/serverRoute.js');

const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql2'); // Make sure this is mysql2
const port = 3000;

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
    console.log('Connected to the database');
});

//========== MIDDLEWARE =================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'www')));

//========== SET UP ROUTES =================

console.log('serverRoute.js is setting up routes...');

console.log('Loading registration routes');
const registrationRoutes = require('./routes/serverRouteRegistration');
app.use('/api/registration', registrationRoutes(db));

console.log('Loading login routes');
const loginRoutes = require('./routes/serverRouteLogin');
app.use('/api/login', loginRoutes(db));

console.log('Loading attendance routes');
const attendanceRoutes = require('./routes/serverRouteAttendance');
app.use('/api/attendance', attendanceRoutes);


const contactUsRoutes = require('./routes/serverRouteContactUs');
app.use('/api/contactus', contactUsRoutes(db));

console.log('Loading casereport routes');
const casereportRoutes = require('./routes/serverRouteCaseReport');
app.use('/api/casereport', casereportRoutes(db));

console.log('Loading reports routes');
const reportsRoutes = require('./routes/serverRouteReports');
app.use('/api/reports', reportsRoutes(db));

const testGptRoutes = require('./routes/serverRouteTestGPT');
app.use('/api/testgpt', testGptRoutes(db));


//========  500 error ===================

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('line 61: Internal Server Error, something broke!');
});


//========  START SERVER ===================


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
