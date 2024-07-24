console.log(' loaded  websites/BTF/serverRouteHashPassword.js ');

const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.use(bodyParser.json());

module.exports = (db) => {
    console.log('Initializing hashPassword routes');

    router.post('/hash-password', async (req, res) => {
        const { plainPassword } = req.body;
        
        try {
            if (!plainPassword) {
                return res.status(400).json({ message: 'Password is required' });
            }
    
            // Hash the password
            const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
            res.json({ hashedPassword });
        } catch (error) {
            console.error('Error hashing password:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    });

    return router;
};
