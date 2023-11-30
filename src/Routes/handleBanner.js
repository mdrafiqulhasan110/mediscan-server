const express = require("express");
const router = express.Router();
const banner = require("../Models/bannerSchema");
const verifyToken = require("../MiddleWare/verifyToken");
const verifyAdmin = require("../MiddleWare/verifyAdmin");

router.get("/", verifyToken, verifyAdmin, async (req, res) => {
  try {
    let banners = await banner.find({});
    if (!banners || !banners[0]) throw new Error("No banners Found");
    return res.status(200).json(banners);
  } catch (err) {
    console.log(err);
    return res.status(401).send(err.message);
  }
});
router.put("/active/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await banner.updateMany({
      $set: {
        isActive: false,
      },
    });
    await banner.updateOne(
      { _id: id },
      {
        $set: {
          isActive: true,
        },
      }
    );
    res.status(201).json({ message: "Banner Updated" });
  } catch (err) {
    console.log(err);
    return res.status(401).send(err.message);
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    let bann = await banner.findOne({ _id: id });
    return res.status(200).json(bann);
  } catch (err) {
    console.log(err);
    return res.status(401).send(err.message);
  }
});

router.get("/status/active", async (req, res) => {
  try {
    let bann = await banner.findOne({ isActive: true });
    return res.status(200).json(bann);
  } catch (err) {
    console.log(err);
    return res.status(401).send(err.message);
  }
});

router.post("/", verifyToken, verifyAdmin, async (req, res) => {
  const newBanner = new banner(req.body);
  try {
    await newBanner.save();
    res.status(201).json({ message: "New Banner Created" });
  } catch (err) {
    res.status(409).json({ message: err });
  }
});

router.put("/:id", verifyToken, verifyAdmin, async (req, res) => {
  const id = req.params.id;
  const newBanner = req.body;
  try {
    await banner.updateOne(
      { _id: id },
      {
        $set: {
          title: newBanner.title,
          description: newBanner.description,
          image: newBanner.image,
          couponCode: newBanner.couponCode,
          couponRate: newBanner.couponRate,
        },
      }
    );
    res.status(201).json({ message: "Banner Updated" });
  } catch (err) {
    res.status(409).json({ message: err });
  }
});

router.delete("/:id", verifyToken, verifyAdmin, async (req, res) => {
  const id = req.params.id;
  try {
    let banners = await banner.deleteOne({ _id: id });
    return res.status(200).json(banners);
  } catch (err) {
    console.log(err);
    return res.status(401).send(err.message);
  }
});

module.exports = router;
