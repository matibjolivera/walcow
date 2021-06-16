const { model, Schema } = require("mongoose");
const crypto = require("crypto");

const Wallet = require("../models/Wallet");
const Token = require("../models/Token");

const ObjectId = require("mongoose").Types.ObjectId

const schema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    token: {
        type: String,
        required: true,
        default: crypto.randomBytes(20).toString("hex"),
    },
    wallet: [{type: Schema.Types.ObjectId, ref: "Wallet"}],
    fiat: {type: Number, default: Number(0)},
    created_at: {type: Date, default: Date.now},
});

schema.post('save', function (u) {
    Token.find().map(async t => {
        await new Wallet({
            user: new ObjectId(u._id),
            token: new ObjectId(t._id),
            quantity: 0
        }).save()
    })
});

const User = model(
    "User",
    schema
);

module.exports(User)
