const mongoose = require("mongoose");
const ProductComment = require("../../models/productComment");

const updateProductComment = async (req, res) => {
  const { comment, commentId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    return res.status(404).json({ message: "Id is not valid" });
  }

  if (!comment) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  try {
    const updatedComment = await ProductComment.findByIdAndUpdate(
      commentId,
      { comment },
      { new: true }
    );

    res.json(updatedComment);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  updateProductComment,
};
