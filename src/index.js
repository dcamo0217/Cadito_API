const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const userRoutes = require("./routes/user"); //import routes of user
const postRoutes = require("./routes/post"); //import routes of post
const cartRoutes = require("./routes/cart"); //import routes of cart
const historyRoutes = require("./routes/history"); //import routes of history
const reviewRoutes = require("./routes/review"); //import routes of review
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3001;

//midleware
app.use(express.json());
app.use(cors());
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/cart", cartRoutes);
app.use("/history", historyRoutes);
app.use("/reviews", reviewRoutes);

//routes
app.get("/", (req, res) => {
  res.send("Welcome to Cadito API");
});

//MongoBD Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) => console.log(error));
app.listen(port, () => console.log("Server listening on port", port));
