const User = require("../models/user.model");
const BlacklistToken = require("../models/blacklistToken.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");

async function registerUser(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { fullname, email, password } = req.body;
        const isUserAlready = await User.findOne({ email });
        if (isUserAlready) {
            return res.status(409).json({ message: `User already exists` });
        }
        const newUser = await userService.createUser({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password,
        });
        const token = newUser.generateAuthToken();
        res.cookie("jwt", token);
        res.status(201).json({
            message: `User successfully registered`,
            token,
            newUser,
        });
    } catch (error) {
        console.error(`Error in Register User Controller: ${error}`);
        res.status(500).json({ message: `Internal Server Error` });
    }
}

async function loginUser(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { email, password } = req.body;
        const isUser = await User.findOne({ email }).select("+password");
        if (!isUser) {
            return res
                .status(401)
                .json({ message: `Invalid email or password` });
        }
        const isValidPassword = isUser.comparePassword(password);
        if (!isValidPassword) {
            return res
                .status(401)
                .json({ message: `Invalid email or password` });
        }
        const token = isUser.generateAuthToken();
        res.cookie("jwt", token);
        res.status(200).json({
            message: `User logged in`,
            token,
            isUser,
        });
    } catch (error) {
        console.error(`Error in Login User Controller: ${error}`);
        res.status(500).json({ message: `Internal Server Error` });
    }
}

async function getUserProfile(req, res) {
    res.status(200).json(req.user);
}

async function logoutUser(req, res) {
    try {
        const token = req.cookies.jwt;
        await BlacklistToken.create({ token });
        res.clearCookie("jwt");
        res.status(200).json({ message: `User Logged out` });
    } catch (error) {
        console.error(`Error in Logout User Controller: ${error}`);
        res.status(500).json({ message: `Internal Server Error` });
    }
}

module.exports = { registerUser, loginUser, getUserProfile, logoutUser };
