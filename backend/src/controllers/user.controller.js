const userService = require("../services/user.service");
const { validationResult } = require("express-validator");

async function registerUser(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { fullname, email, password } = req.body;
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

module.exports = { registerUser };
