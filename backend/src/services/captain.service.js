const Captain = require("../models/captain.model.js");

const createCaptain = async ({ fullname, email, password, vehicle }) => {
    if (!fullname || !email || !password || vehicle) {
        throw new Error("All fields are required!");
    }
    const captain = await Captain.create({
        fullname: {
            firstname: fullname.firstname,
            lastname: fullname.lastname,
        },
        vehicle: {
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType,
        },
    });
    return captain;
};

module.exports = { createCaptain };
