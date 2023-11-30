const express = require("express");
const router = express.Router();
const banner = require("../Models/bannerSchema");

router.get("/", async (req, res) => {
  try {
    let banners = await banner.find({});
    if (!banners || !banners[0]) throw new Error("No banners Found");
    return res.status(200).json(banners);
  } catch (err) {
    console.log(err);
    return res.status(401).send(err.message);
  }
});
router.get("/active", async (req, res) => {
  try {
    let banners = await banner.find({ isActive: true });
    if (!banners || !banners[0]) throw new Error("No banner Found");
    return res.status(200).json(banners);
  } catch (err) {
    console.log(err);
    return res.status(401).send(err.message);
  }
});

router.post("/", async (req, res) => {
  const newBanner = new banner(req.body);
  try {
    await newBanner.save();
    res.status(201).json({ message: "New Banner Created" });
  } catch (err) {
    res.status(409).json({ message: err });
  }
});

module.exports = router;
