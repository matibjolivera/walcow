const express = require("express");
const router = express.Router();

const Wallet = require("../models/Wallet");
const User = require("../models/User");

const ObjectId = require("mongoose").Types.ObjectId
const transactions = require('../transactions')
const response = require("../responses");

router.get("/", async (req, res) => {
    try {
        if (req.body.token) {
            const userExist = await User.findOne({
                token: req.body.token,
            });
            if (userExist) {
                let wallets = await Wallet
                    .find({user: userExist._id})
                    .where('quantity').gt(0)
                    .sort('quantity')
                res.json(response(true, wallets));
            } else {
                return res.send({message: "Invalid token", canLogin: false});
            }
        } else {
            res.send({message: "'token' must be sent", canLogin: false});
        }
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

router.post("/", async function (req, res) {

    if (!req.body || !req.body.token || !req.body.user) {
        return res.status(400).send({
            error: true
            , message: "Mandatory fields was not found in body"
        });
    }

    let userId = new ObjectId(req.body.user)

    let foundUser = await User.findOne({
        id: userId
    });

    if (!foundUser) {
        return res.status(404).send({
            error: true
            , message: 'Wallet not found.'
        });
    }

    let existingWallet = await Wallet.findOne({
        user: userId
        , token: req.body.token
    })

    if (existingWallet) {
        return res.status(400).send({
            error: true
            , message: 'Wallet already exists.'
        });
    }

    let newWallet = new Wallet({
        user: userId
        , token: req.body.token
        , quantity: 0
    });

    await newWallet.save();

    res.send(newWallet);
});

router.post('/sell', (req, res) => {
    transactions.sell(req, res)
})

router.post('/buy', (req, res) => {
    transactions.buy(req, res)
})

module.exports = router;