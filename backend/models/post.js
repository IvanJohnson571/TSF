const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  //title: { type: String, required: true },
  //content: { type: String, required: true },
  big: { type: String, required: true },
  medium: { type: String, required: true },
  small: { type: String, required: true },
  //creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

module.exports = mongoose.model("Post", postSchema);
