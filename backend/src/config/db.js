const mongoose = require("mongoose");
const { MONGO_URI } = require("../constants/env");

const connectToDb = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(`Connected to Database`);
  } catch (error) {
    console.error("Error in connecting to database.", error);
    process.exit(1);
  }
};

module.exports = connectToDb;
