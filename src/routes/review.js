const express = require("express");
const reviewSchema = require("../models/review");

const router = express.Router();

//POST REVIEW
router.post("/", async (req, res) => {
  const { user_id, product_id, rating, description } = req.body;
  try {
    const review = await reviewSchema.create({
      user_id,
      product_id,
      rating,
      description,
    });
    console.log(review);
    return res.status(201).json(review);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

//FETCH REVIEWS
router.get("/", async (req, res) => {
  const { product_id, user_id } = req.query;
  try {
    if (product_id) {
      const review = await reviewSchema.find({ product_id });
      return res.status(200).json(review);
    }
    if (user_id) {
      const review = await reviewSchema.find({ user_id });
      return res.status(200).json(review);
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

module.exports = router;
