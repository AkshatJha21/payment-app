const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://adminAkshat:Akshat2134@cluster0.hast5ds.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
console.log("MongoDB connected successfully");

const userSchema = mongoose.Schema({
    email: String,
    password: String,
    firstName: String,
    lastName: String,
});

const User = mongoose.model("user", userSchema);

module.exports = {
    User
}