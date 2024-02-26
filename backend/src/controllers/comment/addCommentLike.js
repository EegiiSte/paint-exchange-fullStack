const ProductComment = require("../../models/productComment");
const Product = require("../../models/product");

const addCommentLike = async (req, res) => {
  const { productId } = req.params;
  const userId = req.user._id;

  //   console.log("createProductComment", productId);

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

    const NewLike = await Like.create({
      user: userId,
      product: productId,
    });

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { $push: { like: NewLike } },
      { new: true }
    )
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

    res.status(201).json({
      updatedProduct,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = { addCommentLike };
