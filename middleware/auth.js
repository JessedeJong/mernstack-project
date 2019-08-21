const config = require('config')
const jwt = require('jsonwebtoken')

function auth(req, res, next) {
    const token = req.header('x-auth-token');

    // Check if token available
    if(!token) return res.status(401).json({ msg: "Token not present, access denied" });

    try {
        // Verify token
        const decoded = jwt.verify(token, config.get("jwtSecret"));

        // Get user from payload
        req.user = decoded;
        next();
    } catch(e) {
        res.status(400).json({
            msg: "Token is invalid"
        })
    }
}

module.exports = auth;