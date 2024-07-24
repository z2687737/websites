//import express, body-parser and mongoose
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Middleware is set up to parse JSON data using 'body-parser.json()'
app.use(bodyParser.json());

// MongoDB connection (replace with your connection string)
mongoose.connect('mongodb://localhost:27017/bibbulmuntrack', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Define a schema
const userSchema = new mongoose.Schema({
    loginUserName: String,
    loginPassword: String,
    fName: String,
    lname: String,
    eMail: String,
    hPhone: String,
    rLocality: String,
    fAddress: String,
    volCat: String,
    tCert: String,
    background: String
});

// Define a model
const User = mongoose.model('User', userSchema);

// Handle registration
app.post('/register', (req, res) => {
    const newUser = new User(req.body);
    newUser.save((err) => {
        if (err) {
            return res.status(500).send('Error registering user.');
        }
        res.status(200).send('User registered successfully.');
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
