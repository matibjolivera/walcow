const {model, Schema} = require("mongoose");

module.exports = model("Token", new Schema({
    code: {type: String, required: true},
    name: {type: String, required: true}
}));