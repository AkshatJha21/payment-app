const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://adminAkshat:Akshat2134@cluster0.hast5ds.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
console.log("MongoDB connected successfully");

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
});

const accountSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const User = mongoose.model("user", userSchema);
const Account = mongoose.model("account", accountSchema);

module.exports = {
    User,
    Account
}