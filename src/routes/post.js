const express = require("express");
const postSchema = require("../models/post");

const router = express.Router();

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

//FETCH USER POSTS
router.get("/", async (req, res) => {
  const { user_id, post_id } = req.query;
  try {
    if (post_id) {
      const post = await postSchema.findById(post_id);
      if (post) {
        return res.status(200).json(post);
      } else {
        return res.status(404).json({ message: "Post not found" });
      }
    } else {
      const posts = await postSchema.find({ owner_id: user_id });
      return res.status(200).json(posts);
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

//FETCH RECENT POSTS
router.get("/recent", async (req, res) => {
  try {
    const posts = await postSchema.find().sort({ created_date: -1 }).limit(5);
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

module.exports = router;
