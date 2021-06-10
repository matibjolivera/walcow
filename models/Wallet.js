const {model, Schema} = require("mongoose");

module.exports = model("Wallet", new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'}
}));