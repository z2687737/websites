console.log('serverRoute.js');

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

console.log('Setting up routes...');

const testGptRoutes = require('./routes/serverRouteTestGPT');
app.use('/api/testgpt', testGptRoutes(db));

const contactUsRoutes = require('./routes/serverRouteContactUs');
app.use('/api/contactus', contactUsRoutes(db));

console.log('Loading registration routes');
const registrationRoutes = require('./routes/serverRouteRegistration');
app.use('/api/registration', registrationRoutes(db));

console.log('Loading login routes');
const loginRoutes = require('./routes/serverRouteLogin');
app.use('/api/login', loginRoutes(db));


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('line 38: Internal Server Error, something broke!');
});


//========  START SERVER ===================


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
