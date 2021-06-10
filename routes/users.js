const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
/* GET users listing. */
// api/users/
router.get("/", async function (req, res) {
  res.send({ nombre: "OK" });
});
router.post("/register", async function (req, res) {
  let user = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  });
  if (user) {
    try {
      const userExist = await User.find({
        username: req.body.username,
        email: req.body.email,
      });
      console.log(userExist.length);
      if (userExist.length === 0) {
        bcrypt.hash(user.password, 8, async function (err, hash) {
          if (!err) {
            user.password = hash;
            await user.save();
          }
        });

        res.send({ message: "User Registered OK", canRegister: true });
      } else {
        res.send({ message: "User already exist", canRegister: false });
      }
    } catch (err) {
      throw new Error(err);
    }
  }
});
router.post("/login", async function (req, res) {
  let user = {
    username: req.body.username,
    password: req.body.password,
  };
  if (user.password && user.username) {
    const userExist = await User.find({
      username: user.username,
    });
    if (userExist.length > 0) {
      console.log(userExist);
      bcrypt.compare(
        req.body.password,
        userExist.password,
        function (err, result) {
          if (result) {
            res.send("Correct");
          } else {
            res.send("Incorrect password");
          }
        }
      );
    }
  }
});
router.post("/deposit");
module.exports = router;
