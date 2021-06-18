const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Wallet = require("../models/Wallet");
const response = require("../responses");

router.get("/", async function (req, res) {
  res.send(await User.find());
});

router.post("/register", async function (req, res) {
  if (
    !req.body.username ||
    !req.body.password ||
    !req.body.email ||
    !req.body.firstname ||
    !req.body.lastname
  ) {
    res.status(400);
    res.send(
      response(
        false,
        '"username" & "password" & "email" & "firstname" & "lastname" must be sent'
      )
    );
  }

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
        user.password = await bcrypt.hash(user.password, salt);
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
router.post("/changePassword", async (req, res) => {
  try {
    const { username, newPassword } = req.body;
    const user = await User.find({ username: username });

    if (user.length <= 0) {
      return res.send({ message: "User not found", canChangePassword: false });
    } else {
      const salt = await bcrypt.genSalt();
      const newPass = await bcrypt.hash(newPassword, salt);

      await User.updateOne(
        { _id: user[0]._id },
        {
          password: newPass,
        }
      );
      res.send({ message: "Password changed", canChangePassword: true });
    }
  } catch (err) {
    res.send({ message: err.message, canChangePassword: false });
    throw new Error(err);
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
