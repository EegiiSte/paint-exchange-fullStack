const Product = require("../../models/product");
const mongoose = require("mongoose");
const User = require("../../models/user");

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const name = req.body.name;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Update by id --> Invalid product id",
    });
  }

  const updatedProduct = await Product.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true }
  )
    .populate({
      path: "comments",
      options: { sort: { createdAt: "desc" } },
      populate: { path: "user", select: ["email", "profilePicUrl", "name"] },
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
      select: ["email", "profilePicUrl", "name"],
    });

  if (!updatedProduct) {
    res.status(404).json({
      message: "Update by id --> Product not found",
    });
    return;
  }
  res.status(200).json(updatedProduct);
};

module.exports = { updateProduct };
