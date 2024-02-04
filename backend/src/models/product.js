const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
    },
    userEmail: {
      type: String,
    },

    price: {
      type: Number,
      required: [true, "Product price is required"],
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
    },
    category: {
      type: String,
      required: [true, "Product category is required"],
    },

    userId: {
      type: String,
      required: [true, "Product userId is required"],
    },
    type: {
      type: String,
      enum: ["public", "private"],
      required: [true, "Product visibility is required"],
    },
    image: {
      type: String,
    },
    // userProduct: [
    //   {
    //     userPicUrl: {
    //       type: String,
    //     },
    //     userEmail: {
    //       type: String,
    //     },
    //   },
    // ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
