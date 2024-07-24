//BibbulmunTrackApp/photo-video-backend/Server.js

const express = require('express');
const mysql = require('mysql');  // Import mysql module
const multer = require('multer');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3002;

//Middleware
//Use bodyParser.json() for parsing JSON request bodies.
app.use(bodyParser.json());
//Enable CORS to allow cross-origin requests if needed.
app.use(cors());


// MySQL Connection
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'Sq00700&',
  database: 'bibbulmun_track_app'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.stack);
    return;
  }
  console.log('Connected to MySQL database as ID:', connection.threadId);
});


//Multer Setup 
//Define storage configuration for multer to specify 
//where files will be stored and how they will be named.
// Set up storage for file uploads

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../www/uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Route to handle photo uploads
app.post('/upload-photo', upload.single('photo'), (req, res) => {
  // Handle photo upload logic here
  // Example: save photo to filesystem
  console.log('Received photo upload request:', req.body);
  res.status(200).send('Photo uploaded successfully');
});

// Route to handle video uploads
app.post('/upload-video', upload.single('video'), (req, res) => {
    // Handle video upload logic here
  // Example: save video to MySQL database or filesystem
  res.status(200).send('Video uploaded successfully');
  console.log('Received video upload request:', req.body);
//Example response
  res.json({ message: 'Video uploaded successfully!' });
});

//Start Server
app.listen(PORT, () => {
  console.log(`Photo-video backend listening at http://localhost:${PORT}`);
});
