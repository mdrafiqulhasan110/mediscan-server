const express = require("express");
const router = express.Router();
const user = require("../Models/userSchema");
const verifyToken = require("../MiddleWare/verifyToken");
const verifyAdmin = require("../MiddleWare/verifyAdmin");

router.get("/admin/:email", verifyToken, async (req, res) => {
  try {
    const email = req.params.email;

    if (email !== req.user.email) {
      return res.status(403).send({ message: "forbidden access" });
    }

    const query = { email: email };
    const myuser = await user.findOne(query);
    let admin = false;
    if (myuser) {
      admin = myuser?.role === "admin";
    }
    res.send(admin);
  } catch (err) {
    console.log(err);
    return res.status(401).send(err.message);
  }
});

module.exports = router;
