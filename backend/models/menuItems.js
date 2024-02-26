const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  _id: { type: Object, required: true },
  Description: { type: String, required: true },
  Item: { type: String, required: true }
});

module.exports = mongoose.model("menuItems", postSchema);
