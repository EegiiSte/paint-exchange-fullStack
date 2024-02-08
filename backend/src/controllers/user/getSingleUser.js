const User = require("../../models/user");
const mongoose = require("mongoose");
const Product = require("../../models/product");

const getSingleUser = async (req, res) => {
  const { id } = req.params;

  const userId = id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "User by id --> Invalid user id",
    });
  }

  const user = await User.findById(id).populate({ path: "products" });

  if (!user) {
    res.status(404).json({
      message: "Get by id --> User not found",
    });

    return;
  }
  res.status(200).json({
    user,
  });
};

module.exports = { getSingleUser };
