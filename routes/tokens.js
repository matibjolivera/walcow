const express = require("express");
const router = express.Router();

const response = require('../responses')
const tokens = require('../tokens')

router.get("/", async function (req, res) {
    res.send(await tokens.getTokens());
});

router.get("/:code", async function (req, res) {
    res.send(await tokens.getToken(req.params.code));
});

router.get('/price/:id', async (req, res) => {
    if (!req.params.id) {
        res.status(400);
        res.send('"id" must be sent');
    }

    let token = await tokens.getPrice(req.params.id)

    res.send(response(true, token));
})

module.exports = router;
