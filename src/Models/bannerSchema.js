const mongoose = require("mongoose");

const bannerSchema = mongoose.Schema({
  "image": {
    "type": "string",
    "format": "uri",
  },
  "title": {
    "type": "string",
  },
  "description": {
    "type": "string",
  },
  "couponCode": {
    "type": "string",
  },
  "couponRate": {
    "type": "number",
    "minimum": 0,
    "maximum": 100,
  },
  "isActive": {
    "type": "boolean",
    default: "false",
  },
});

const banner = new mongoose.model("Banner", bannerSchema);

module.exports = banner;
