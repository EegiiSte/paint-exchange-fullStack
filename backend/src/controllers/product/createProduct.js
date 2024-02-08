const Product = require("../../models/product");
const User = require("../../models/user");
const createProduct = async (req, res) => {
  const { name, price, description, category, type, image } = req.body;
  const userId = req.user._id;

  if (!name || !price || !description || !category || !type || !image) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }
  try {
    // return res.status(201).json({
    //   message: "You are creating a new product",
    // });

    const product = await Product.create({
      name,
      price,
      description,
      category,
      user: userId,
      type,
      image,
    });

    const user = await User.findById(userId);
    user.products.push(product._id);
    await user.save();

    res.status(200).json({
      product,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = { createProduct };
