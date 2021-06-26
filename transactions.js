const response = require('responses')
const Wallet = require('models/Wallet')
const User = require('models/User')

module.exports.sell = async (req) => {
    await transaction('sell', async (user, quantity) => {
        return {
            quantity: -req.body.quantity,
            fiat: user.fiat + quantity
        }
    })
}

module.exports.buy = async (req) => {
    await transaction('buy', async (user, quantity) => {
        return {
            quantity: req.body.quantity,
            fiat: user.fiat - quantity
        }
    }, req, res)
}

async function transaction(name, strategy, req, res) {
    if (!req.body.token || !req.body.user || !req.body.price || !req.body.quantity) {
        res.status(400);
        res.send(response(false, '"token" & "user" & "price" & "quantity" must be sent'));
    }

    let user = await User.findOne({_id: req.body.user});

    let quantity = req.body.quantity * req.body.price

    if (quantity > user.fiat) {
        res.status(500);
        res.send(response(false, 'quantity to ' + name + ' is bigger than user´s capital'))
    }

    strategy(user, quantity).then(r => {
        Wallet.findOneAndUpdate({
                user: user._id,
                token: req.body.token
            },
            {$inc: {'quantity': r.quantity}}
        ).exec(async (e, d) => {
            if (e) {
                res.status(500)
                res.send(response(false, 'transaction can´t be possible'));
            } else {
                user.fiat = r.fiat
                await user.save()
                res.status(200)
                res.send(response(true, 'transaction OK'));
            }
        })
    })
}