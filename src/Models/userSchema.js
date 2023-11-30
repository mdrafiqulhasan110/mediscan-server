const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, lowercase: true, trim: true },
  imageURL: {
    type: String,
    required: true,
  },
  bloodGroup: String,
  district: String,
  upazila: String,
  status: {
    type: String,
    default: "active",
  },
  role: {
    type: String,
    default: "user",
  },
});

const user = new mongoose.model("User", userSchema);

module.exports = user;
