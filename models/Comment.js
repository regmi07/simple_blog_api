const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blogs",
  },
});

const comment = mongoose.model("Comments", commentSchema);

module.exports = comment;
