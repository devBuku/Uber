const express = require("express");
const { body } = require("express-validator");
const {
    registerUser,
    loginUser,
    getUserProfile,
    logoutUser,
} = require("../controllers/user.controller");
const { authUser } = require("../middlewares/auth.middleware");
const userRouter = express.Router();

userRouter.post(
    "/register",
    [
        body("fullname.firstname")
            .isLength({ min: 3 })
            .withMessage(`First name must be at least 3 characters long`),
        body("email").isEmail().withMessage(`Invalid Email`),
        body("password")
            .isLength({ min: 5 })
            .withMessage("Password must be at least 5 characters long"),
    ],
    registerUser,
);

userRouter.post(
    "/login",
    [
        body("email").isEmail().withMessage("Invalid Email"),
        body("password")
            .isLength({ min: 5 })
            .withMessage("Password must be at least 5 characters long"),
    ],
    loginUser,
);

userRouter.get("/profile", authUser, getUserProfile);

userRouter.get("/logout", authUser, logoutUser);

module.exports = userRouter;
