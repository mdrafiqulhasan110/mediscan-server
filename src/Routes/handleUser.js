const express = require("express");
const router = express.Router();
const user = require("../Models/userSchema");
const verifyToken = require("../MiddleWare/verifyToken");

router.get("/", verifyToken, async (req, res) => {
  try {
    let users = await user.find({});
    if (!users || !users[0]) throw new Error("No Users Found");
    return res.status(200).json(users);
  } catch (err) {
    console.log(err);
    return res.status(401).send(err.message);
  }
});

router.post("/", async (req, res) => {
  const newUser = new user(req.body);
  try {
    await newUser.save();
    res.status(201).json({ message: "New User Created" });
  } catch (err) {
    res.status(409).json({ message: "This email is already in use." });
  }
});

module.exports = router;
