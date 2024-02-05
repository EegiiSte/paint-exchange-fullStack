const Product = require("../../models/product");

const getAllProduct = async (req, res) => {
  const userId = req.user._id;

  try {
    const sort = { createdAt: -1 };
    const products = await Product.find({
      $or: [{ userId }, { type: "public" }],
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
