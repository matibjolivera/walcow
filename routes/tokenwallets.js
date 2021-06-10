const express = require("express");
const router = express.Router();

const Token = require("../models/Token");

const Wallet = require("../models/Token");
const TokenWallet = require("../models/TokenWallet");


/**
 * Getters Methods.
 * 
 */

router.get("/", async (req, res) => {
    res.send(await TokenWallet.find());
});

//TODO: Add specific getter.


/**
 * Post Methods.
 * 
 */

 router.post("/", async function (req, res) {

    if (!req.body
            || !req.body.token
            || !req.body.wallet
            ) {

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

    let foundWallet = await Wallet.findOne({
        user: req.body.wallet
    });

    if (foundWallet) {
        return res.status(404).send({
            error: true
            , message: 'Wallet not found.'
        });
    }


    let existingTkWallet = await TokenWallet.findOne({
        wallet: req.body.wallet
        , token: req.body.token
    })


    if (existingTkWallet) {
        return res.status(400).send({
            error: true
            , message: 'TokenWallet already exists.'
        });
    }


    let newTokenWallet = new TokenWallet({
        wallet: req.body.wallet
        , token: req.body.token
        , quantity: 0
    });


    await newTokenWallet.save();

    res.send(newTokenWallet);
});


module.exports = router;