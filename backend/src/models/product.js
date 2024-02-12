const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
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

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required!"],
    },
    type: {
      type: String,
      enum: ["public", "private"],
      required: [true, "Product visibility is required"],
    },
    image: {
      type: String,
    },

    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductComment",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
