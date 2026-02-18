const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_ATLAS_URL);
    console.log(" MongoDB connected");
  } catch (err) {
    console.error(" DB connection failed");
  }
};

module.exports = connectDB;
