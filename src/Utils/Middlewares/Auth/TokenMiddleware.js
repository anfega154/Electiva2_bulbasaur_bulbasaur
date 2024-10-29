const jwt = require('jsonwebtoken');

const getToken = (req) => {
    return req.headers['authorization']?.split(' ')[1];
};

const getIdOnsession = (req) => {
    const token = getToken(req);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.id;
};

module.exports = { getToken, getIdOnsession };