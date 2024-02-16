const express = require("express");
const auth = require("../middleware/auth");

const {
  createProductComment,
} = require("../controllers/comment/createProductComment");
const {
  updateProductComment,
  deleteProductComment,
} = require("../controllers/comment");

const router = express.Router();

//get auth//

// router.use(auth);

//GET/ products/  ---> get all product
router.post("/:productId/comments", createProductComment);

// DELETE /products/:workoutId/comments/:commentId
router.delete("/:productId/comments", deleteProductComment);

// PUT /products/:workoutId/comments/:commentId
router.put("/:productId/comments/", updateProductComment);

module.exports = router;
