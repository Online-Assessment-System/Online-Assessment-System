const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  // TODO : Create User Schema
);

const User = mongoose.model("User", userSchema);
module.exports = User;