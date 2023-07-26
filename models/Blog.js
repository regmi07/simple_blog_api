const mongoose = require("mongoose");

const blogPost = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const blog = mongoose.model("Blogs", blogPost);

module.exports = blog;
