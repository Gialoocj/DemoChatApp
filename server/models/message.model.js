const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    min: 1,
    required: true,
  },
  sentAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Message", messageSchema);
