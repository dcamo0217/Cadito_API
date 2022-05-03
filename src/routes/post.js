const express = require("express");
const postSchema = require("../models/post");

const router = express.Router();

//FETCH USER POSTS
router.get("/", async (req, res) => {
  const { user_id } = req.query;
  try {
    const posts = await postSchema.find({ user_id });
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

//CREATE POST
router.post("/", async (req, res) => {
  const { owner_id, img_url, display_name, description, price } = req.body;
  try {
    const post = await postSchema.create({
      owner_id,
      img_url,
      display_name,
      description,
      price,
    });
    return res.status(201).json(post);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

module.exports = router;
