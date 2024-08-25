const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.config');

router.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, dateOfBirth, gender, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 8);
        const user = await User.create({ firstName, lastName, dateOfBirth, gender, email, password: hashedPassword });
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ message: 'Invalid password' });

        const token = jwt.sign({ id: user.id }, authConfig.secret, { expiresIn: 86400 }); // 24 hours
        res.status(200).json({ auth: true, token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/logout', (req, res) => {
    // Logout endpoint implementation
    res.status(200).json({ auth: false, token: null });
});

module.exports = router;
