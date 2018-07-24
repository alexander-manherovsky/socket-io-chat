const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const messageSchema = Schema({
    _user: { type: Schema.Types.ObjectId, ref: "User" },
    body: String,
    createdAt: Number
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
