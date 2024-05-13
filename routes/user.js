const express = require("express");
const { signupUser, loginUser } = require("../types");
const { User } = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const userRouter = express.Router();

userRouter.post('/signup', async (req, res) => {
    const newUserPayload = req.body;
    const parsedPayload = signupUser.safeParse(newUserPayload);

    if (!parsedPayload.success) {
        res.status(411).json({
            message: "Incorrect inputs"
        });
        return;
    }

    const existingUser = await User.findOne({
        email: newUserPayload.email
    });

    if (existingUser) {
        res.status(411).json({
            message: "Email already taken"
        });
        return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newUserPayload.password, salt);

    const newUser = await User.create({
        email: newUserPayload.email,
        password: hashedPassword,
        firstName: newUserPayload.firstName,
        lastName: newUserPayload.lastName,
    });

    const userId = newUser._id;

    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.status(200).json({
        message: "User added successfully",
        token: token
    });
});

userRouter.post('/signin', async (req, res) => {
    const loginPayload = req.body;
    const parsedPayload = loginUser.safeParse(loginPayload);

    if (!parsedPayload.success) {
        res.status(411).json({
            message: "Incorrect inputs"
        });
        return;
    };

    const user = await User.findOne({
        email: loginPayload.email
    });

    if (user === null) {
        return res.status(411).json({
            message: "User not found"
        })
    } else {

        const validPassword = await bcrypt.compare(loginPayload.password, user.password);

        if (!validPassword) {
            return res.status(411).json({
                message: "Incorrect password"
            });
        } else {
            const token = jwt.sign({
                userId: user._id
            }, JWT_SECRET);
            
            return res.status(200).json({
                message: "User logged in successfully",
                token: token
            });
        }
    }

});

module.exports = userRouter;