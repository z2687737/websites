//  websites/BTFroutes/serverRouteContactUs.js 

// serverRouteContactUs.js

const express = require('express');
const router = express.Router();

router.post('/api/contactUs', (req, res) => {
  const { name, email, subject, message } = req.body;

  // Validate incoming data (optional)
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'Please fill out all fields' });
  }

  console.log(req.body); // Log the received data

  const sql = 'INSERT INTO contactus (name, email, subject, message) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, email, subject, message], (err, result) => {
    if (err) {
      console.error('Error inserting data into database:', err);
      return res.status(500).send('Error saving data');
    }
    console.log('Message stored in database:', result);
    res.status(200).json({ message: 'Message received and stored successfully' });
    res.send('Message sent successfully');
  });
});

module.exports = router;


/*
 let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-email-password'
    }
  });
  
  let data = {
    from: email,
    to: 'your-email@gmail.com',
    subject: 'Contact Us Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`
  };

  transporter.sendMail(data, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).send('Error sending email');
    }
    console.log('Email sent:', info.response);
    res.status(200).send('Message sent successfully');
  });
});

  */
