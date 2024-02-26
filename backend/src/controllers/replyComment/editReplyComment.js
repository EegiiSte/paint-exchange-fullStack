const mongoose = require("mongoose");
const ProductComment = require("../../models/productComment");
const Product = require("../../models/product");
const ReplyComment = require("../../models/replyComment");

const editReplyComment = async (req, res) => {
  const { productId, commentId, replyId } = req.params;
  const { comment } = req.body;

  if (
    !mongoose.Types.ObjectId.isValid(productId) ||
    !mongoose.Types.ObjectId.isValid(commentId) ||
    !mongoose.Types.ObjectId.isValid(replyId)
  ) {
    return res.status(404).json({ message: "Id is not valid" });
  }

  if (!comment) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  try {
    await ReplyComment.findByIdAndUpdate(replyId, { comment }, { new: true });

    const existingProduct = await Product.findById(productId)
      .populate({
        path: "comments",
        options: { sort: { createdAt: "desc" } },
        populate: { path: "user", select: ["email", "name", "profilePicUrl"] },
      })
      .populate({
        path: "comments",
        options: { sort: { createdAt: "desc" } },
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

    if (!existingProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(existingProduct);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  editReplyComment,
};
