const express = require("express");
const { signupUser } = require("../types");
const { User } = require("../db");

const userRouter = express.Router();

userRouter.post('/signup', async (req, res, next) => {
    const newUserPayload = req.body;
    const parsedPayload = signupUser.safeParse(newUserPayload);

    if (!parsedPayload.success) {
        res.status(401).json({
            message: "Incorrect inputs"
        });
        return;
    }

    const existingUser = await User.findOne({
        email: newUserPayload.email
    });

    if (existingUser) {
        res.status(401).json({
            message: "Email already taken"
        });
        return;
    }

    await User.create({
        email: newUserPayload.email,
        password: newUserPayload.password,
        firstName: newUserPayload.firstName,
        lastName: newUserPayload.lastName,
    });

    res.status(200).json({
        message: "User added"
    });
    next();
});

module.exports = userRouter;