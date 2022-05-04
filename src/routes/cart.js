const express = require("express");
const cartSchema = require("../models/cart");

const router = express.Router();

//ADD TO CART
router.post("/", async (req, res) => {
  const { user_id, product_id } = req.body;
  try {
    const cart = await cartSchema.create({
      user_id,
      product_id,
    });
    return res.status(201).json(cart);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

//DELETE ITEM FROM CART ITEM_ID
router.delete("/", async (req, res) => {
  const { item_id } = req.query;
  try {
    const cart = await cartSchema.findByIdAndDelete(item_id);
    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

//FETCH CART
router.get("/", async (req, res) => {
  const { user_id } = req.query;
  try {
    const cart = await cartSchema.find({ user_id, state: true });
    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

//BUY CART
router.post("/buy", async (req, res) => {
  const { user_id } = req.body;
  try {
    const cart = await cartSchema.updateMany(
      { user_id, is_bought: false, state: true },
      { is_bought: true, state: false }
    );
    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

module.exports = router;
