const Product = require("../../models/product");
const mongoose = require("mongoose");

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  //   const name = req.body.name;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "ProductDel by id --> Invalid product id",
    });
  }

  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    res.status(404).json({
      message: "Delete by id --> Product not found",
    });
    return;
  }
  res.status(200).json(product);
};

module.exports = { deleteProduct };
