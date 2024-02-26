const mongoose = require("mongoose");

const commentLikeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    productComment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CommentLike",
      required: [true, "ProductComment is required!"],
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("CommentLike", commentLikeSchema);
