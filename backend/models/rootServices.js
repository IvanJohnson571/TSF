const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  _id: { type: Object, required: true },
  url: { type: String, required: true },
  name: { type: String, required: true }
});

module.exports = mongoose.model("rootServices", postSchema);
