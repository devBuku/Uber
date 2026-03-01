const User = require("../models/user.model");
const Captain = require("../models/captain.model");
const BlacklistToken = require("../models/blacklistToken.model");
const jwt = require("jsonwebtoken");
async function authUser(req, res, next) {
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).json({ message: `Unauthorized` });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const isBlacklisted = await BlacklistToken.findOne({ token: token });
        if (isBlacklisted) {
            return res.status(401).json({ message: `Unauthorized` });
        }
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: `Unauthorized` });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: `Unauthorized` });
    }
}

async function authCaptain(req, res, next) {
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).json({ message: `Unauthorized` });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const isBlacklisted = await BlacklistToken.findOne({ token: token });
        if (isBlacklisted) {
            return res.status(401).json({ message: `Unauthorized` });
        }
        const captain = await Captain.findById(decoded.id);
        if (!captain) {
            return res.status(401).json({ message: `Unauthorized` });
        }
        req.captain = captain;
        next();
    } catch (error) {
        return res.status(401).json({ message: `Unauthorized` });
    }
}

module.exports = { authUser, authCaptain };
