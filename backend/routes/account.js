const express = require("express");
const { authMiddleware } = require("../middleware");
const { default: mongoose } = require("mongoose");
const { Account } = require("../db");

const accountRouter = express.Router();

accountRouter.get('/balance', authMiddleware, async (req, res) => {
    const acc = await Account.findOne({
        userId: req.userId
    });

    if (!acc) {
        return res.status(401).json({
            message: 'Account not found'
        });
    }

    res.status(200).json({
        account: {
            _id: acc._id,
            userId: acc.userId,
            balance: acc.balance
        }
    });
});

accountRouter.post('/transfer', authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;

    const account = await Account.findOne({
        userId: req.userId
    }).session(session);

    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }

    const toAccount = await Account.findOne({
        userId: to
    }).session(session);

    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    await Account.updateOne({
        userId: req.userId
    }, {
        $inc: {
            balance: -amount
        }
    }).session(session);

    await Account.updateOne({
        userId: to
    }, {
        $inc: {
            balance: amount
        }
    }).session(session);

    await session.commitTransaction();
    res.status(200).json({
        message: "Transfer successful"
    });
});

module.exports = accountRouter;