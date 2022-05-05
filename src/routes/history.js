const express = require("express");
const cartSchema = require("../models/cart");

const router = express.Router();

//HISTORY
router.get("/:user_id", async (req, res) => {
  const { user_id } = req.params;
  try {
    const cart = await cartSchema.find({ user_id, is_bought: true });
    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

module.exports = router;
