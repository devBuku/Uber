const User = require("../models/user.model.js");
const { validationResult } = require("express-validator");
const { createUser } = require("../services/user.service.js");

const registerUser = async (req, res, _next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { fullname, email, password } = req.body;

    const hashedPassword = await User.hashPassword(password);

    const user = await createUser({
        fullname,
        email,
        password: hashedPassword,
    });

    const token = user.generateAuthToken();
    res.status(201).json({ token, user });
};

const loginUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return res.status(401).json({ message: `Invalid email or password` });
    }
    console.log(user);
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({ message: `Invalid email or password` });
    }

    const token = user.generateAuthToken();
    res.status(200).json({ token, user });
};

module.exports = { registerUser, loginUser };
