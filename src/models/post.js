const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  img_url: {
    type: String,
    required: true,
  },
  display_name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", postSchema);
