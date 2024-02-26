const mongoose = require("mongoose");

const audioSchema = mongoose.Schema({
  _id: { type: Object, required: true },
  nameBG: { type: String, required: true },
  nameEN: { type: String, required: true },
  videoId: { type: String, required: true }
});

module.exports = mongoose.model("Video", audioSchema);
