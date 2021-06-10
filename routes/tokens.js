const express = require("express");
const router = express.Router();
const Token = require("../models/Token");
const fetch = require("node-fetch");

const API = 'https://api.coingecko.com/api/v3/';

router.get("/", async function (req, res) {
    res.send(await Token.find());
});

router.post("/", async function (req, res) {
    let token = new Token({
        code: req.body.code,
        name: req.body.name
    });

    await token.save();
    res.send(token);
});

router.patch("/:code", async function (req, res) {
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
    res.send(token);
});

router.get('/price/:id', async (req, res) => {
    if (!req.params.id) {
        res.status(400);
        res.send('"id" must be sent');
    }

    let response = await fetch(`${API}coins/${req.params.id}`)
    let json = await response.json();

    res.send({
        id: json.id,
        symbol: json.symbol,
        name: json.name,
        price: json.market_data.current_price.usd
    });
})

module.exports = router;
