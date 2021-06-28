const {model, Schema} = require("mongoose");
const bcrypt = require("bcrypt");

const Wallet = require("../models/Wallet");
const {getTokens} = require('../tokens')

const schema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    confirmedEmail: {type: Boolean, default: false},
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    token: {type: String, required: true},
    wallets: [{type: Schema.Types.ObjectId, ref: "Wallet"}],
    fiat: {type: Number, default: Number(0)},
    created_at: {type: Date, default: Date.now},
});

schema.post("save", (u) => {
    if (u.wallets.length === 0) {
        getTokens().then(r => {
            r.forEach(async (t) => {
                let w = await new Wallet({
                    user: u._id,
                    token: t.id,
                    quantity: 0,
                });
                await w.save();
                u.wallets.push(w);
                await u.save();
            });
        })
    }
});

schema.statics.login = async (password, userPassword) => {
    return await bcrypt.compare(password, userPassword)
}

schema.statics.toJSON = (user) => {
    return {
        username: user.username,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        token: user.token,
        wallets: user.wallets
    }
}

module.exports = model("User", schema);
