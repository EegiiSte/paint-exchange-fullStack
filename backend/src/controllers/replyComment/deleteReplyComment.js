const mongoose = require("mongoose");
const ProductComment = require("../../models/productComment");
const Product = require("../../models/product");
const ReplyComment = require("../../models/replyComment");

const deleteReplyComment = async (req, res) => {
  const { productId, commentId, replyCommentId } = req.params;

  if (
    !mongoose.Types.ObjectId.isValid(productId) ||
    !mongoose.Types.ObjectId.isValid(commentId) ||
    !mongoose.Types.ObjectId.isValid(replyCommentId)
  ) {
    return res.status(404).json({ message: "Id is not valid" });
  }

  const productComment = await ProductComment.findByIdAndDelete(commentId);
  if (!productComment) {
    return res.status(404).json({ message: "Comment not found" });
  }
  const replyComment = await ReplyComment.findByIdAndDelete(replyCommentId);
  if (!productComment) {
    return res.status(404).json({ message: "Reply comment not found" });
  }

  const product = await Product.findById(productId);

  if (!product) {
    return res.status(404).json({ message: "product not found" });
  }

  const filteredReplyComments = productComment.replyComments.filter(
    (comment) => comment != replyCommentId
  );

  const updatedComments = await ProductComment.findByIdAndUpdate(
    commentId,
    { ...req.body, replyComments: filteredReplyComments },
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

  res.status(200).json(updatedProduct);
};

module.exports = {
  deleteReplyComment,
};
