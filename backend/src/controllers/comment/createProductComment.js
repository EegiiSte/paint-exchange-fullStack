const ProductComment = require("../../models/productComment");
const Product = require("../../models/product");

const createProductComment = async (req, res) => {
  const { comment } = req.body;
  const { productId } = req.params;
  const userId = req.user._id;
  const userEmail = req.user.email;

  console.log("createProductComment", productId);

  try {
    if (!comment) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingProduct = await Product.findById(productId);

    if (!existingProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const NewComment = await ProductComment.create({
      comment: comment,
      user: userId,
      product: productId,
    });

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { $push: { comments: NewComment._id } },
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

    res.status(201).json({
      updatedProduct,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = { createProductComment };
