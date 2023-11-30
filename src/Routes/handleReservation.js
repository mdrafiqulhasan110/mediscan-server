const express = require("express");
const router = express.Router();
const reservation = require("../Models/reservationSchema");
const verifyToken = require("../MiddleWare/verifyToken");
const verifyAdmin = require("../MiddleWare/verifyAdmin");

router.get("/", verifyToken, verifyAdmin, async (req, res) => {
  try {
    let reservations = await reservation.find({});
    return res.status(200).json(reservations);
  } catch (err) {
    console.log(err);
    return res.status(401).send(err.message);
  }
});

router.put("/changestatus/:id", verifyToken, verifyAdmin, async (req, res) => {
  const id = req.params.id;
  const status = req.body;
  try {
    await reservation.updateOne(
      { _id: id },
      {
        $set: status,
      }
    );
    res.status(201).json({ message: "reservation Updated" });
  } catch (err) {
    console.log(err);
    return res.status(401).send(err.message);
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    let bann = await reservation.findOne({ _id: id });
    return res.status(200).json(bann);
  } catch (err) {
    console.log(err);
    return res.status(401).send(err.message);
  }
});

router.get("/status/featured", async (req, res) => {
  try {
    let bann = await reservation.findOne({ isFeatured: true });
    return res.status(200).json(bann);
  } catch (err) {
    console.log(err);
    return res.status(401).send(err.message);
  }
});

router.post("/", verifyToken, verifyAdmin, async (req, res) => {
  const newReservation = new reservation(req.body);
  try {
    await newReservation.save();
    res.status(201).json({ message: "New Reservation Created" });
  } catch (err) {
    res.status(409).json({ message: err });
  }
});

router.put("/:id", verifyToken, verifyAdmin, async (req, res) => {
  const id = req.params.id;
  const newReservation = req.body;
  try {
    await reservation.updateOne(
      { _id: id },
      {
        $set: newReservation,
      }
    );
    res.status(201).json({ message: "Reservation Updated" });
  } catch (err) {
    res.status(409).json({ message: err });
  }
});

router.delete("/:id", verifyToken, verifyAdmin, async (req, res) => {
  const id = req.params.id;
  try {
    let reservations = await reservation.deleteOne({ _id: id });
    return res.status(200).json(reservations);
  } catch (err) {
    console.log(err);
    return res.status(401).send(err.message);
  }
});

module.exports = router;
