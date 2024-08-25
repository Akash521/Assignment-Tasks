const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.config');
const User = require('../models/user.model');

const authMiddleware = async (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(403).json({ message: 'No token provided' });

    jwt.verify(token, authConfig.secret, async (err, decoded) => {
        if (err) return res.status(500).json({ message: 'Failed to authenticate token' });

        const user = await User.findByPk(decoded.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        req.userId = decoded.id;
        next();
    });
};

module.exports = authMiddleware;
