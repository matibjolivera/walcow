const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
/* GET users listing. */
// api/users/
router.get("/", async function (req, res) {
  res.send(await User.find());
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
      if (userExist.length === 0) {
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(user.password, salt);
        user.password = passwordHash;
        await user.save();
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
  try {
    let user = {
      username: req.body.username,
      password: req.body.password,
    };
    if (user.password && user.username) {
      const userExist = await User.find({
        username: user.username,
      });
      if (userExist.length > 0) {
        bcrypt.compare(
          user.password,
          userExist[0].password,
          function (err, result) {
            console.log(result);
            if (!err) {
              result
                ? res.send({ message: "Login succes", canLogin: true })
                : res.send({ message: "Invalid credentials", canLogin: false });
            }
          }
        );
      } else {
        return res.send({ message: "Invalid credentials", canLogin: false });
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.patch("/deposit/:id", async function (req, res) {
  const value = req.body.value;
  console.log(value);
  if (value && value > 0) {
    try {
      await User.updateOne(
        {
          _id: req.params.id,
        },
        {
          $inc: {
            fiat: value,
          },
        }
      );
    } catch (err) {
      throw new Error(err);
    }

    res.send({ message: "Deposit finished", depositFinished: true });
  } else {
    res.send({ message: "Invalid Value", depositFinished: false });
  }
});
module.exports = router;
