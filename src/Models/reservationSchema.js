const mongoose = require("mongoose");

const reservationSchema = mongoose.Schema({
  "userEmail": {
    "type": "string",
  },
  "name": {
    "type": "string",
  },

  "price": {
    "type": "number",
  },
  "result": {
    "type": "string",
    default: "pending",
  },

  "status": {
    "type": "string",
    default: "pending",
  },
});

const reservation = new mongoose.model("Reservation", reservationSchema);

module.exports = reservation;
