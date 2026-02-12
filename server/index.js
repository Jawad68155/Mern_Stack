const express = require("express");
const connectDB = require("./config/db_connection");
const User = require("./models/users");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.post("/api/adduser", async(req, res) => {
    try{
        const { nameField } = req.body;
        await User.insertOne({name : nameField});
        res.status(200).send({message: "User added successfully"});
    }
    catch(err){
        console.log("Error Inserting User", err);
    }
})





app.listen(2000, () => {
    console.log("Server Started");
})