const express = require("express");
const { signupUser, loginUser, updateUser } = require("../types");
const { User } = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");

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

userRouter.put('/', authMiddleware, async (req, res) => {
    const updatePayload = req.body;
    const parsedPayload = updateUser.safeParse(updatePayload);

    if (!parsedPayload.success) {
        return res.status(411).json({
            message: "Failed to update"
        });
    }

    if (updatePayload.password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(updatePayload.password, salt);
        updatePayload.password = hashedPassword;
    }

    await User.updateOne({
        _id: req.userId
    }, updatePayload);

    res.status(200).json({
        message: "Updated succesfully"
    })
});

userRouter.get('/bulk', async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    });

    res.status(200).json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    });
});

module.exports = userRouter;