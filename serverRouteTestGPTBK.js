const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql2'); // Make sure this is mysql2

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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'www')));

const testGptRoutes = require('./routes/serverRouteTestGPT');
app.use('/api/testgpt', testGptRoutes(db));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
