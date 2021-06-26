const {model, Schema} = require("mongoose");

const crypto = require("crypto");

module.exports = model("Wallet", new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    token: {type: String, required: true},
    quantity: {type: Number, required: true},
    address: {type: String, required: true, default: crypto.randomBytes(20).toString('hex')}
}));