const Product = require("../../models/product");

const getAllProduct = async (req, res) => {
  const userId = req?.user?._id;

  try {
    const sort = { createdAt: -1 };
    const products = await Product.find({
      $or: [{ user: userId }, { type: "public" }],
    })
      .populate({
        path: "comments",
        options: { sort: { createdAt: "desc" } },
        populate: {
          path: "user",
          select: ["email", "profilePicUrl", "name"],
        },
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
      })
      .sort(sort);

    if (!products) {
      res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllProduct };
