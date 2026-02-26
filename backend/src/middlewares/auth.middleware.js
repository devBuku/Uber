const User = require("../models/user.model");
const BlacklistToken = require("../models/blacklistToken.model");
const jwt = require("jsonwebtoken");
async function authUser(req, res, next) {
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).json({ message: `Unauthorized` });
    }
    const isBlacklisted = await BlacklistToken.findOne({ token: token });
    if (isBlacklisted) {
        return res.status(401).json({ message: `Unauthorized` });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: `Unauthorized` });
    }
}

module.exports = { authUser };
