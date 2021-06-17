const express = require("express");
const router = express.Router();

const Token = require("../models/Token");
const Wallet = require("../models/Wallet");
const User = require("../models/User");

const ObjectId = require("mongoose").Types.ObjectId

const response = require('../responses')

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

router.post('/sell', async (req, res) => {
    if (!req.body.token || !req.body.user || !req.body.price || !req.body.quantity) {
        res.status(400);
        res.send(response(false, '"token" & "user" & "price" & "quantity" must be sent'));
    }

    let user = await User.findOne({_id: req.body.user});

    let quantity = req.body.quantity * req.body.price

    if (quantity > user.fiat) {
        res.status(500);
        res.send(response(false, 'quantity to sell is bigger than user´s capital'));
    }

    let token = await Token.findOne({code: req.body.token})

    await Wallet.findOneAndUpdate({
            user: user._id,
            token: token._id
        },
        {$inc: {'quantity': -req.body.quantity}}
    ).exec(async (e, d) => {
        if (e) {
            res.status(500)
            res.send(response(false, 'transaction can´t be possible'));
        } else {
            user.fiat = user.fiat + quantity
            await user.save()
            res.status(200)
            res.send(response(true, 'transaction OK'));
        }
    })
})

router.post('/buy', async (req, res) => {
    if (!req.body.token || !req.body.user || !req.body.price || !req.body.quantity) {
        res.status(400);
        res.send(response(false, '"token" & "user" & "price" & "quantity" must be sent'));
    }

    let user = await User.findOne({_id: req.body.user});

    let quantity = req.body.quantity * req.body.price

    if (quantity > user.fiat) {
        res.status(500);
        res.send(response(false, 'quantity to buy is bigger than user´s capital'));
    }

    let token = await Token.findOne({code: req.body.token})

    await Wallet.findOneAndUpdate({
            user: user._id,
            token: token._id
        },
        {$inc: {'quantity': req.body.quantity}}
    ).exec(async (e, d) => {
        if (e) {
            res.status(500)
            res.send(response(false, 'transaction can´t be possible'));
        } else {
            user.fiat = user.fiat - quantity
            await user.save()
            res.status(200)
            res.send(response(true, 'transaction OK'));
        }
    })
})

module.exports = router;