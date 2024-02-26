const mongoose = require("mongoose");

const gallerySchema = mongoose.Schema({
  path: { type: String, required: true }
});

module.exports = mongoose.model("Gallery", gallerySchema);
