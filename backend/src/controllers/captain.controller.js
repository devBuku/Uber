const Captain = require("../models/captain.model");
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

module.exports = { registerCaptain };
