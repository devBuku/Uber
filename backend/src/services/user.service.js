const User = require("../models/user.model.js");

const createUser = async ({ fullname, email, password }) => {
  if (!fullname || !email || !password) {
    throw new Error(`All fields are required`);
  }

  const user = await User.create({
    fullname: {
      firstname: fullname.firstname,
      lastname: fullname.lastname,
    },
    email,
    password,
  });

  return user;
};

module.exports = { createUser };
