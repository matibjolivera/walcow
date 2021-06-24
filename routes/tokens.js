const express = require("express");
const router = express.Router();

const Token = require("../models/Token");
const User = require("../models/User");
const Wallet = require("../models/Wallet");

const fetch = require("node-fetch");

const response = require('../responses')

const API = 'https://api.coingecko.com/api/v3/';

router.get("/", async function (req, res) {
    res.send(await Token.find());
});

router.get("/:code", async function (req, res) {
    res.send(await Token.find({code: req.params.code}));
});
router.post("/", async (req, res) => {
    let token = new Token({
        code: req.body.code,
        name: req.body.name,
    });

    await token.save();
    res.send(response(true, token));
});
router.patch("/:code", async (req, res) => {
    if (!req.params.code) {
        res.status(400);
        res.send('"code" must be sent');
    }

    let token = await Token.findOne({code: req.params.code});

    for (let k in req.body) {
        let v = req.body[k];
        if (Token.schema.obj.hasOwnProperty(k)) {
            token[k] = v;
        }
    }

    await token.save();
    res.send(response(true, token));
});

router.get('/price/:id', async (req, res) => {
    if (!req.params.id) {
        res.status(400);
        res.send('"id" must be sent');
    }

    let result = await fetch(`${API}coins/${req.params.id}`)
    let json = await result.json();

    res.send(response(true, {
        token: {
            id: json.id,
            symbol: json.symbol,
            name: json.name,
            price: json.market_data.current_price.usd
        }
    }));
})

module.exports = router;
