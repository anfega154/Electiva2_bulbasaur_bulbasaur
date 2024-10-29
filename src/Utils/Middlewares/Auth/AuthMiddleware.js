const jwt = require('jsonwebtoken');
const HttpStatus = require('../../helpers/Httpstatus');
const { isTokenBlacklisted } = require('./Logout');

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Token not provided' });
    }
    if (isTokenBlacklisted(token)) {
        console.log('Token has been invalidated');
        return res.status(HttpStatus.FORBIDDEN).json({ message: 'Token has been invalidated' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();
    } catch (error) {
        return res.status(HttpStatus.FORBIDDEN).json({ message: 'Invalid or expired token' });
    }
};

module.exports = authMiddleware;