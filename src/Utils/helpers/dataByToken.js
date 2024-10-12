const jwt = require('jsonwebtoken');

const extractUserIdFromToken = (token) => {
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        return decodedToken.id;
    } catch (error) {
        return res.status(401).json({ message: 'Authentication failed!' });
    }
};

module.exports = {
    extractUserIdFromToken  
}