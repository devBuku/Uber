const { validationResult } = require("express-validator");
const User = require("../models/user.model.js");
const userService = require("../services/user.service.js");

async function registerUser(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password } = req.body;

  const hashedPassword = await User.hashPassword(password);

  const user = await userService.createUser({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email: email,
    password: hashedPassword,
  });

  const token = user.generateAuthToken();
  res.status(201).json({
    token,
    user: {
      fullname: {
        firstname: fullname.firstname,
        lastname: fullname.lastname,
      },
      email: email,
    },
  });
}

async function loginUser(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res.status(401).json({ message: `Invalid email or password` });
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({ message: `Invalid email or password` });
  }

  const token = user.generateAuthToken();
  res.status(200).json({
    token,
    user: {
      fullname: {
        firstname: user.fullname.firstname,
        lastname: user.fullname.lastname,
      },
      email: user.email,
      _id: user._id,
    },
  });
}

module.exports = { registerUser, loginUser };
