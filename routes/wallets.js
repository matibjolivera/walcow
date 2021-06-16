const express = require("express");
const router = express.Router();

const Token = require("../models/Token");
const Wallet = require("../models/Wallet");
const User = require("../models/User");

const ObjectId = require("mongoose").Types.ObjectId

/**
 * Getters Methods.
 *
 */

router.get("/", async (req, res) => {
    res.send(await Wallet.find());
});

//TODO: Add specific getter.


/**
 * Post Methods.
 *
 */

router.post("/", async function (req, res) {

    if (!req.body || !req.body.token || !req.body.user) {
        return res.status(400).send({
            error: true
            , message: "Mandatory fields was not found in body"
        });
    }

    let token = await Token.findOne({
        code: req.body.token
    });

    if (token) {
        return res.status(404).send({
            error: true
            , message: 'Token not found.'
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


module.exports = router;