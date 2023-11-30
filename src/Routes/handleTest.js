const express = require("express");
const router = express.Router();
const test = require("../Models/testSchema");
const verifyToken = require("../MiddleWare/verifyToken");
const verifyAdmin = require("../MiddleWare/verifyAdmin");

router.get("/", async (req, res) => {
  try {
    let tests = await test.find({});
    return res.status(200).json(tests);
  } catch (err) {
    console.log(err);
    return res.status(401).send(err.message);
  }
});

router.put("/changestatus/:id", verifyToken, verifyAdmin, async (req, res) => {
  const id = req.params.id;
  const status = req.body;
  try {
    await test.updateOne(
      { _id: id },
      {
        $set: status,
      }
    );
    res.status(201).json({ message: "test Updated" });
  } catch (err) {
    console.log(err);
    return res.status(401).send(err.message);
  }
});
router.put("/slots/:id", verifyToken, async (req, res) => {
  const id = req.params.id;
  try {
    await test.updateOne({ _id: id }, { $inc: { slots: -1 } });
    res.status(201).json({ message: "test Updated" });
  } catch (err) {
    console.log(err);
    return res.status(401).send(err.message);
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    let bann = await test.findOne({ _id: id });
    return res.status(200).json(bann);
  } catch (err) {
    console.log(err);
    return res.status(401).send(err.message);
  }
});

router.get("/status/featured", async (req, res) => {
  try {
    let bann = await test.findOne({ isFeatured: true });
    return res.status(200).json(bann);
  } catch (err) {
    console.log(err);
    return res.status(401).send(err.message);
  }
});

router.post("/", verifyToken, verifyAdmin, async (req, res) => {
  const newTest = new test(req.body);
  try {
    await newTest.save();
    res.status(201).json({ message: "New Test Created" });
  } catch (err) {
    res.status(409).json({ message: err });
  }
});

router.put("/:id", verifyToken, verifyAdmin, async (req, res) => {
  const id = req.params.id;
  const newTest = req.body;
  try {
    await test.updateOne(
      { _id: id },
      {
        $set: newTest,
      }
    );
    res.status(201).json({ message: "Test Updated" });
  } catch (err) {
    res.status(409).json({ message: err });
  }
});

router.delete("/:id", verifyToken, verifyAdmin, async (req, res) => {
  const id = req.params.id;
  try {
    let tests = await test.deleteOne({ _id: id });
    return res.status(200).json(tests);
  } catch (err) {
    console.log(err);
    return res.status(401).send(err.message);
  }
});

module.exports = router;
