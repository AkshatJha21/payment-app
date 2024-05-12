const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL);
console.log("MongoDB connected successfully");

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
});

const User = mongoose.model("user", userSchema);

module.exports = {
    User
}