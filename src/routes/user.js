const express = require("express");
const userSchema = require("../models/user");

const router = express.Router();

//REGISTER
router.post("/register", (req, res) => {
  const user = userSchema(req.body); //Create a new user with the schema proposed in models/user.js and the body of the request
  user
    .save() //Save the user in the database
    .then((data) => res.json(data)) //Send the user in JSON format if the save is successful
    .catch((error) => res.json({ message: error })); //Send an error message if the save is not successful
});

//LOGIN
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await userSchema.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (password !== user.password) {
      return res.status(401).json({ message: "Password incorrect" });
    } else {
      return res.status(200).json(user);
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

//PREV USERS
router.post("/prev-login", async (req, res) => {
  const { user_id } = req.body;
  try {
    const user = await userSchema.findById(user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      return res.status(200).json(user);
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

//FETCH USER
router.get("/", async (req, res) => {
  const { user_id } = req.query;
  try {
    const user = await userSchema.findById(user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      return res.status(200).json(user);
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

module.exports = router;
