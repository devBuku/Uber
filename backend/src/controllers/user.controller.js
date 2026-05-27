const User = require("../models/user.model.js");
const { validationResult } = require("express-validator");
const { createUser } = require("../services/user.service.js");

const registerUser = async (req, res, next) => {
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

module.exports = { registerUser };
