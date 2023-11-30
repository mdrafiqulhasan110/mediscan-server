const mongoose = require("mongoose");

const testSchema = mongoose.Schema({
  "imageURL": {
    "type": "string",
    "format": "uri",
  },
  "name": {
    "type": "string",
  },
  "description": {
    "type": "string",
  },
  "price": {
    "type": "number",
  },
  "slots": {
    "type": "number",
  },
  "date": {
    "type": "string",
  },
  "isFeatured": {
    "type": "boolean",
    default: "false",
  },
});

const test = new mongoose.model("Test", testSchema);

module.exports = test;
