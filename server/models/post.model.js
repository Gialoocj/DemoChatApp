const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    image: { type: String, required: true },
    title: { type: String },
    likeNumber: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
