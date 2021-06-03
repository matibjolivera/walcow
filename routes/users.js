const express = require("express");
const router = express.Router();
const User = require("../models/User");
/* GET users listing. */
// api/users/
router.get("/", async function (req, res) {
  res.send({ nombre: "asda" });
});
router.post("/register", async function (req, res) {
  let user = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  });

  await user.save();
  res.send(user);
});
module.exports = router;
