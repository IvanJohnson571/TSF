const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");


const userSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  pass: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
