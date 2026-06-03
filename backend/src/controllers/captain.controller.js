const Captain = require("../models/captain.model");
const captainService = require("../services/captain.service");
const { validationResult } = require("express-validator");

const registerCaptain = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password, vehicle } = req.body;

    const isCaptain = await Captain.findOne({ email });
    if (isCaptain) {
        return res.status(409).json({ message: "Captain already exists" });
    }

    const hashedPassword = await Captain.hashPassword(password);
    const captain = await captainService.createCaptain({
        fullname,
        email,
        hashedPassword,
        vehicle,
    });

    const token = captain.generateAuthToken();
    res.cookie("token", token);

    res.status(200).json({ token, captain });
};

module.exports = { registerCaptain };
