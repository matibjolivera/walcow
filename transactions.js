const response = require("./responses");
const Wallet = require("./models/Wallet");
const User = require("./models/User");

async function transaction(name, strategy, req, res) {
  if (
    !req.body.token ||
    !req.header("auth-token") ||
    !req.body.amount ||
    !req.body.quantity
  ) {
    res.status(400);
    res.send(
      response(false, '"token" & "user" & "price" & "quantity" must be sent')
    );
  }

  let user = await User.findOne({ token: req.header("auth-token") });

  let quantity = req.body.quantity;
  let amount = req.body.amount;

  if (amount > user.fiat) {
    res.status(500);
    res.send(
      response(false, "quantity to " + name + " is bigger than user´s capital")
    );
  }

  strategy(user, quantity, amount).then((r) => {
    Wallet.findOneAndUpdate(
      {
        user: user._id,
        token: req.body.token,
      },
      { $inc: { quantity: r.quantity } }
    ).exec(async (e, d) => {
      if (e) {
        res.status(500);
        res.send(response(false, "transaction can´t be possible"));
      } else {
        user.fiat = r.fiat;
        await user.save();
        res.status(200);
        res.send(response(true, "transaction OK"));
      }
    });
  });
}

module.exports.sell = async (req, res) => {
  await transaction(
    "sell",
    async (user, quantity, amount) => {
      return {
        quantity: -quantity,
        fiat: user.fiat + amount,
      };
    },
    req,
    res
  );
};

module.exports.buy = async (req, res) => {
  await transaction(
    "buy",
    async (user, quantity, amount) => {
      return {
        quantity: quantity,
        fiat: user.fiat - amount,
      };
    },
    req,
    res
  );
};
