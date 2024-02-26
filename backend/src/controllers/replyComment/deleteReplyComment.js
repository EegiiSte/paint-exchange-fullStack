const mongoose = require("mongoose");
const ProductComment = require("../../models/productComment");
const Product = require("../../models/product");
const ReplyComment = require("../../models/replyComment");

const deleteReplyComment = async (req, res) => {
  const { productId, commentId, replyId } = req.params;

  if (
    !mongoose.Types.ObjectId.isValid(productId) ||
    !mongoose.Types.ObjectId.isValid(commentId) ||
    !mongoose.Types.ObjectId.isValid(replyId)
  ) {
    return res.status(404).json({ message: "Id is not valid" });
  }

  const replyComment = await ReplyComment.findByIdAndDelete(replyId);
  if (!replyComment) {
    return res.status(404).json({ message: "Reply comment not found" });
  }

  const product = await Product.findById(productId);

  if (!product) {
    return res.status(404).json({ message: "product not found" });
  }

  const productComment = await ProductComment.findById(commentId);

  const filteredReplyComments = productComment.replyComments.filter(
    (comment) => comment != replyId
  );

  await ProductComment.findByIdAndUpdate(
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
