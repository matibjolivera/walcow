const {model, Schema} = require("mongoose");

const crypto = require("crypto");

module.exports = model("TokenWallet", new Schema({
    wallet: {type: Schema.Types.ObjectId, ref: 'Wallet'},
    token: {type: Schema.Types.ObjectId, ref: 'Token'},
    quantity: {type: Number, required: true},
    address: {type: String, required: true, default: crypto.randomBytes(20).toString('hex')}
}));