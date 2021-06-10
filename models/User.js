const { model, Schema } = require("mongoose");
const crypto = require("crypto");
module.exports = model(
  "User",
  new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    token: {
      type: String,
      required: true,
      default: crypto.randomBytes(20).toString("hex"),
    },
    created_at: { type: Date, default: Date.now },
    wallet: { type: Schema.Types.ObjectId, ref: "Wallet" },
    fiat: { type: Number, default: 0 },
  })
);
