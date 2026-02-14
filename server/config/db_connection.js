const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/");
        console.log("DB Connected!!!");
    }
    catch (err) {
        console.log("Error Connecting DB", err);
    }
}

connectDB(); 

module.exports = connectDB;
