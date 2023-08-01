const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  role: {
    type: String,
    default: "normal",
    required: true,
  },
  token: {
    type: String,
  },
});

const user = mongoose.model("User", userSchema);
module.exports = user;
