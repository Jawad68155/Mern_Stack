const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// DB connect
mongoose
  .connect("mongodb://127.0.0.1:27017/cruddb")
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

// schema
const userSchema = new mongoose.Schema({
  name: String,
});

const User = mongoose.model("User", userSchema);

// GET users
app.get("/api/getusers", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send("Error fetching users");
  }
});

// UPDATE user
app.put("/api/edituser/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );

    res.status(200).send({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    res.status(500).send("Update failed");
  }
});

// server
app.listen(5000, () => {
  console.log("Server started on port 5000");
});