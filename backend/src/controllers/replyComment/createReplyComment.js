const ProductComment = require("../../models/productComment");
const Product = require("../../models/product");
const ReplyComment = require("../../models/replyComment");

const createReplyComment = async (req, res) => {
  const { replyComment } = req.body;
  const { commentId, productId } = req.params;
  const userId = req.user._id;

  console.log("createReplyComment", commentId);

  try {
    if (!replyComment) {
      return res.status(400).json({
        message: "Reply comment text is required",
      });
    }

    const existingComment = await ProductComment.findById(commentId);

    if (!existingComment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    const newReplyComment = await ReplyComment.create({
      comment: replyComment,
      user: userId,
      productComment: commentId,
    });

    const updatedProductComment = await ProductComment.findByIdAndUpdate(
      commentId,
      { $push: { replyComments: newReplyComment._id } },
      { new: true }
    );

    const updatedProduct = await Product.findByIdAndUpdate(productId, {
      new: true,
    })
      .populate({
        path: "comments",
        options: { sort: { createdAt: "desc" } },
        populate: { path: "user", select: ["email", "name", "profilePicUrl"] },
      })
      .populate({
        path: "comments",
        options: { sort: { createdAt: "desc" } },
        populate: {
          path: "user",
          select: ["email", "name", "profilePicUrl"],
        },
        populate: {
          path: "replyComments",
          options: { sort: { createdAt: "desc" } },
          populate: {
            path: "user",
            select: ["email", "name", "profilePicUrl"],
          },
        },
      })
      .populate({
        path: "user",
        select: ["email", "name", "profilePicUrl"],
      });

    res.status(201).json({
      updatedProduct,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = { createReplyComment };
