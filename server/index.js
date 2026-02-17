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

app.get("/api/getusers", async(req, res) => {
    try{
        const users = await User.find();
        res.status(200).send({users});
    }
    catch(err){
        console.log("Error Fetching Data", err);
    }
})


app.put("/api/edituser/:id", async(req, res) => {
    const { name } = req.body;
    try{
        await User.updateOne({_id: req.params.id}, {$set: {name: name}});
        res.status(200).send({message: "User updated successfully"});
    }
    catch(err){
        console.log("Error updating user", err);
    }
})




app.listen(2000, () => {
    console.log("Server Started");
})