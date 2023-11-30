const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.lhlcunc.mongodb.net/?retryWrites=true&w=majority`);
  console.log("connected to database");
};

module.exports = connectDB;
