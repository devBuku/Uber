const express = require("express");
const captainRouter = express.Router();
const { body } = require("express-validator");
const {
    registerCaptain,
    loginCaptain,
    getCaptainProfile,
    logoutCaptain,
} = require("../controllers/captain.controller");
const { authCaptain } = require("../middlewares/auth.middleware");

captainRouter.post(
    "/register",
    [
        body("fullname.firstname")
            .isLength({ min: 3 })
            .withMessage(`First name must be at least 3 characters long`),
        body("fullname.lastname")
            .isLength({ min: 3 })
            .withMessage("Last name must be at least 3 characters long"),
        body("email")
            .isEmail()
            .withMessage(`Invalid Email`)
            .isLength({ min: 5 })
            .withMessage("Email must be at least 5 characters long"),
        body("password")
            .isLength({ min: 5 })
            .withMessage("Password must be at least 5 characters long"),
        body("vehicle.color")
            .isLength({ min: 3 })
            .withMessage("Color must be at least 3 characters long"),
        body("vehicle.plate")
            .isLength({ min: 3 })
            .withMessage("Plate must be at least 3 characters long"),
        body("vehicle.capacity")
            .isInt({ min: 1 })
            .withMessage("Capacity must be at least 1"),
        body("vehicle.vehicleType")
            .isIn(["car", "motorcycle", "auto"])
            .withMessage("Vehicle type must be car, motorcycle, or auto"),
    ],
    registerCaptain,
);

captainRouter.post(
    "/login",
    [
        body("email").isEmail().withMessage(`Invalid Email`),
        body("password")
            .isLength({ min: 5 })
            .withMessage("Password must be at least 5 characters long"),
    ],
    loginCaptain,
);

captainRouter.get("/profile", authCaptain, getCaptainProfile);
captainRouter.get("/logout", authCaptain, logoutCaptain);

module.exports = captainRouter;
