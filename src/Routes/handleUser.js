const express = require("express");
const router = express.Router();
const user = require("../Models/userSchema");
const verifyToken = require("../MiddleWare/verifyToken");
const verifyAdmin = require("../MiddleWare/verifyAdmin");

router.get("/", verifyToken, verifyAdmin, async (req, res) => {
  try {
    let users = await user.find({});
    return res.status(200).json(users);
  } catch (err) {
    console.log(err);
    return res.status(401).send(err.message);
  }
});
router.get("/:email", verifyToken, async (req, res) => {
  try {
    let email = req.params.email;
    let users = await user.findOne({ email: email });
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

router.put("/:id", verifyToken, async (req, res) => {
  const id = req.params.id;
  const modifieduser = req.body;
  try {
    await user.updateOne(
      { _id: id },
      {
        $set: modifieduser,
      }
    );
    res.status(201).json({ message: "user Updated" });
  } catch (err) {
    console.log(err);
    return res.status(401).send(err.message);
  }
});
router.put("/changestatus/:id", verifyToken, verifyAdmin, async (req, res) => {
  const id = req.params.id;
  const status = req.body;
  console.log(status);
  try {
    await user.updateOne(
      { _id: id },
      {
        $set: status,
      }
    );
    res.status(201).json({ message: "user Updated" });
  } catch (err) {
    console.log(err);
    return res.status(401).send(err.message);
  }
});

module.exports = router;
