const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: "string",
      required: [true, "Product name is required"],
    },
    userEmail: {
      type: "string",
    },
    price: {
      type: "number",
      required: [true, "Product price is required"],
    },
    description: {
      type: "string",
      required: [true, "Product description is required"],
    },
    category: {
      type: "string",
      required: [true, "Product category is required"],
    },

    userId: {
      type: "string",
      required: [true, "Product userId is required"],
    },
    type: {
      type: "string",
      enum: ["public", "private"],
      required: [true, "Product visibility is required"],
    },
    image: {
      type: "string",
    },
    userPicUrl: {
      type: "string",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
