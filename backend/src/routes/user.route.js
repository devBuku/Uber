const express = require("express");
const { body } = require("express-validator");
const { registerUser } = require("../controllers/user.controller");
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

module.exports = userRouter;
