const Product = require("../../models/product");
const User = require("../../models/user");
const createProduct = async (req, res) => {
  const { name, price, description, category, type, image, userPicUrl } =
    req.body;
  const userId = req.user._id;
  const userEmail = req.user.email;

  const userProduct = await User.findById(userId);

  if (
    !name ||
    !price ||
    !description ||
    !category ||
    !userId ||
    !type ||
    !image
  ) {
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
      userId,
      type,
      image,
    });
    res.status(200).json({
      product: {
        product,
        userProduct: {
          email: userProduct.email,
          profilePicUrl: userProduct.profilePicUrl,
        },
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = { createProduct };
