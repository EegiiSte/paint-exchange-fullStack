const mongoose = require("mongoose");

const replyCommentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: [true, "Comment is required!"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    productComment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductComment",
      required: [true, "Comment is required!"],
    },
    like: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CommentLike",
      },
    ],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("ReplyComment", replyCommentSchema);
