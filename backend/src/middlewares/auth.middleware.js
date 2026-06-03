const User = require("../models/user.model");
const Captain = require("../models/captain.model");
const BlackListToken = require("../models/blackListToken.model");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../constants/env");

const authUser = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: `Unauthorized` });
    }
    const isBlackListed = await BlackListToken.findOne({ token: token });
    if (isBlackListed) {
        return res.status(401).json({ message: `Unauthorized` });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded._id);
        req.user = user;
        return next();
    } catch (error) {
        return res.status(401).json({ message: `Unauthorized` });
    }
};

const authCaptain = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: `Unauthorized` });
    }
    const isBlackListed = await BlackListToken.findOne({ token: token });
    if (isBlackListed) {
        return res.status(401).json({ message: `Unauthorized` });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const captain = await Captain.findById(decoded._id);
        req.captain = captain;
        return next();
    } catch (error) {
        return res.status(401).json({ message: `Unauthorized` });
    }
};

module.exports = { authUser, authCaptain };
