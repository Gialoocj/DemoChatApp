const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, min: 7, unique: true },
    password: { type: String, required: true, min: 6 },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    sentList: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    recieveList: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    avatar: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
