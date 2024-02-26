const mongoose = require("mongoose");

const audioSchema = mongoose.Schema({
  _id: { type: Object, required: true },
  url: { type: String, required: true },
  title: { type: String, required: true },
  cover: { type: String, required: true }
});

module.exports = mongoose.model("Audio", audioSchema);
