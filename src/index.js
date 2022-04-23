const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const userRoutes = require("./routes/user"); //import routes of user

const app = express();
const port = process.env.PORT || 3000;

//midleware
app.use(express.json());
app.use("/api", userRoutes);

//routes
app.get("/", (req, res) => {
  res.send("Welcome to my API");
});

//MongoBD Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) => console.log(error));
app.listen(port, () => console.log("Server listening on port", port));
