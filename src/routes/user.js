const express = require("express");
const user = require("../models/user");
const userSchema = require("../models/user");

const router = express.Router();

//Create user
router.post("/users", (req, res) => {
  const user = userSchema(req.body); //Create a new user with the schema proposed in models/user.js and the body of the request
  user
    .save() //Save the user in the database
    .then((data) => res.json(data)) //Send the user in JSON format if the save is successful
    .catch((error) => res.json({ message: error })); //Send an error message if the save is not successful
});

//Get all users
router.get("/users", (req, res) => {
  userSchema
    .find()
    .then((data) => res.json(data)) //Send the user in JSON format if the save is successful
    .catch((error) => res.json({ message: error })); //Send an error message if the save is not successful
});

//Get a user by id
router.get("/users/:id", (req, res) => {
  const { id } = req.params; //Get the id of the user from params of the request
  userSchema
    .findById(id) //Find the user in the database with the id
    .then((data) => res.json(data)) //Send the user in JSON format if the save is successful
    .catch((error) => res.json({ message: error })); //Send an error message if the save is not successful
});

//Update a user by id
router.put("/users/:id", (req, res) => {
  const { id } = req.params; //Get the id of the user from params of the request
  const { name, age, email } = req.body; //Get the name, age and email of the user from the body of the request
  userSchema
    .updateOne({ _id: id }, { $set: { name: name, age: age, email: email } }) //Update the user in the database with the id and the name, age and email of the user
    .then((data) => res.json(data)) //Send the user in JSON format if the save is successful
    .catch((error) => res.json({ message: error })); //Send an error message if the save is not successful
});

//Delete a user by id
router.delete("/users/:id", (req, res) => {
  const { id } = req.params; //Get the id of the user from params of the request

  userSchema
    .remove({ _id: id })
    .then((data) => res.json(data)) //Send the user in JSON format if the save is successful
    .catch((error) => res.json({ message: error })); //Send an error message if the save is not successful
});

module.exports = router;
