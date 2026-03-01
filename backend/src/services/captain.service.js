const Captain = require("../models/captain.model");

async function createCaptain({
    firstname,
    lastname,
    email,
    password,
    color,
    plate,
    capacity,
    vehicleType,
}) {
    if (
        !firstname ||
        !email ||
        !password ||
        !color ||
        !plate ||
        !capacity ||
        !vehicleType
    ) {
        throw new Error(`All fields are required!`);
    }
    const newCaptain = new Captain({
        fullname: {
            firstname,
            lastname,
        },
        email,
        password,
        vehicle: {
            color,
            plate,
            capacity,
            vehicleType,
        },
    });
    if (newCaptain) {
        await newCaptain.save();
        return newCaptain;
    } else {
        throw new Error(`Invalid Captain Data`);
    }
}

module.exports = { createCaptain };
