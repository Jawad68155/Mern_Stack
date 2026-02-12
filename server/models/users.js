const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
    name : String
});

module.exports = mongoose.model("User", usersSchema);