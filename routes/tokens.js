const express = require("express");
const router = express.Router();
const Token = require("../models/Token");

router.get("/", async function (req, res) {
  res.send(await Token.find());
});
router.get("/:code", async function (req, res) {
  res.send(await Token.find({ code: req.params.code }));
});
router.post("/", async function (req, res) {
  let token = new Token({
    code: req.body.code,
    name: req.body.name,
  });

  await token.save();
  res.send(token);
});
router.patch("/:code", async function (req, res) {
  if (!req.params.code) {
    res.status(400);
    res.send('"code" must be sent');
  }

  let token = await Token.findOne({ code: req.params.code });

  for (let k in req.body) {
    let v = req.body[k];
    if (Token.schema.obj.hasOwnProperty(k)) {
      token[k] = v;
    }
  }

  await token.save();
  res.send(token);
});

module.exports = router;
