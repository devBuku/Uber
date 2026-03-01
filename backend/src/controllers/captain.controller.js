const Captain = require("../models/captain.model");
const Blacklist = require("../models/blacklistToken.model");
const captainService = require("../services/captain.service.js");
const { validationResult } = require("express-validator");

async function registerCaptain(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { fullname, email, password, vehicle } = req.body;
        const alreadyRegistered = await Captain.findOne({ email });
        if (alreadyRegistered) {
            return res
                .status(409)
                .json({ message: `Captain already Registered` });
        }
        const newCaptain = await captainService.createCaptain({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email: email,
            password: password,
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType,
        });
        const token = newCaptain.generateAuthToken();
        res.cookie("jwt", token);
        res.status(201).json({
            message: `Captain successfully registered`,
            token,
            captain: newCaptain,
        });
    } catch (error) {
        console.error(`Error in register captain controller: ${error}`);
        res.status(500).json({ message: `Internal Server Error` });
    }
}

async function loginCaptain(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { email, password } = req.body;
        const captain = await Captain.findOne({ email }).select("+password");
        if (!captain) {
            return res
                .status(401)
                .json({ message: `Invalid email or password` });
        }

        const isValid = await captain.comparePassword(password);
        if (!isValid) {
            return res
                .status(401)
                .json({ message: `Invalid email of password` });
        }
        const token = captain.generateAuthToken();
        res.cookie("jwt", token);
        res.status(200).json({ message: `Captain logged in`, token, captain });
    } catch (error) {
        console.error(`Error in login captain controller: ${error}`);
        res.status(500).json({ message: `Internal server error` });
    }
}

async function getCaptainProfile(req, res) {
    res.status(200).json(req.captain);
}

async function logoutCaptain(req, res) {
    try {
        const token = req.cookies.jwt;
        await Blacklist.create({ token });
        res.clearCookie("jwt");
        res.status(200).json({ message: "Captain logged out " });
    } catch (error) {
        console.error(`Error in logout captain controller: ${error}`);
        res.status(500).json({ message: `Internal Server Error` });
    }
}

module.exports = {
    registerCaptain,
    loginCaptain,
    getCaptainProfile,
    logoutCaptain,
};
