const mongoose = require("mongoose");
const ProductComment = require("../../models/productComment");
const Product = require("../../models/product");

const deleteProductComment = async (req, res) => {
  const { productId } = req.params;
  const { commentId } = req.body;

  if (
    !mongoose.Types.ObjectId.isValid(productId) ||
    !mongoose.Types.ObjectId.isValid(commentId)
  ) {
    return res.status(404).json({ message: "Id is not valid" });
  }

  const productComment = await ProductComment.findByIdAndDelete(commentId);
  if (!productComment) {
    return res.status(404).json({ message: "Comment not found" });
  }

  const product = await Product.findById(productId);

  if (!product) {
    return res.status(404).json({ message: "product not found" });
  }

  const filteredComments = product.comments.filter(
    (comment) => comment != commentId
  );
  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    { ...req.body, comments: filteredComments },
    { new: true }
  )
    .populate({
      path: "comments",
      populate: { path: "user", select: ["email", "name", "profilePicUrl"] },
    })
    .populate({
      path: "user",
      select: ["email", "name", "profilePicUrl"],
    });

  res.status(200).json(updatedProduct);
};

module.exports = {
  deleteProductComment,
};
