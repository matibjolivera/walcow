const {model, Schema} = require("mongoose");

module.exports = model("User", new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    token: {type: String, required: true},
    created_at: {type: Date, default: Date.now},
    wallet: {type: Schema.Types.ObjectId, ref: 'Wallet'}
}));