const response = require("./responses");
const Wallet = require("./models/Wallet");
const User = require("./models/User");
const ObjectId = require("mongoose").Types.ObjectId

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

    let user = await User.findOne({token: req.header("auth-token")});

    let quantity = req.body.quantity;
    let amount = req.body.amount;

    strategy(user, quantity, amount, req.body.token).then((r) => {
        Wallet.findOneAndUpdate(
            {
                user: user._id,
                token: req.body.token,
            },
            {$inc: {quantity: r.quantity}}
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
        async (user, quantity, amount, token) => {
            let userId = new ObjectId(user.id)

            let wallet = await Wallet.findOne({
                user: userId,
                token: token
            });
            if (quantity > wallet.quantity) {
                res.status(500);
                res.send(
                    response(false, "quantity to " + name + " is bigger than user´s capital")
                );
            }
            console.log("fiat: " + user.fiat)
            console.log("amount: " + amount)
            return {
                quantity: -quantity,
                fiat: user.fiat + parseFloat(amount),
            };
        },
        req,
        res
    );
};

module.exports.buy = async (req, res) => {
    await transaction(
        "buy",
        async (user, quantity, amount, token) => {
            if (amount > user.fiat) {
                res.status(500);
                res.send(
                    response(false, "quantity to " + name + " is bigger than user´s capital")
                );
            }
            return {
                quantity: quantity,
                fiat: user.fiat - parseFloat(amount),
            };
        },
        req,
        res
    );
};
