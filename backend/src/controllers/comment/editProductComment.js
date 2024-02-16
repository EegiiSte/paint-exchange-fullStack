const mongoose = require("mongoose");
const ProductComment = require("../../models/productComment");
const Product = require("../../models/product");

const updateProductComment = async (req, res) => {
  const { productId } = req.params;
  const { comment, commentId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    return res.status(404).json({ message: "Id is not valid" });
  }

  if (!comment) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  try {
    await ProductComment.findByIdAndUpdate(
      commentId,
      { comment },
      { new: true }
    );

    const existingProduct = await Product.findById(productId)
      .populate({
        path: "comments",
        populate: { path: "user", select: ["email", "name", "profilePicUrl"] },
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
  updateProductComment,
};
