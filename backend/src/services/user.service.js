const User = require("../models/user.model");

async function createUser({ firstname, lastname, email, password }) {
    if (!firstname || !email || !password) {
        throw new Error(`All fields are required`);
    }
    const newUser = new User({
        fullname: {
            firstname,
            lastname,
        },
        email,
        password,
    });
    if (newUser) {
        await newUser.save();
        return newUser;
    } else {
        throw new Error(`Invalid User Data`);
    }
}

module.exports = { createUser };
