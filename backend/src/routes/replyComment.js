const express = require("express");
const auth = require("../middleware/auth");

const {
  createReplyComment,
} = require("../controllers/replyComment/createReplyComment");
const {
  deleteReplyComment,
} = require("../controllers/replyComment/deleteReplyComment");
const {
  editReplyComment,
} = require("../controllers/replyComment/editReplyComment");

const router = express.Router();

//get auth//

// router.use(auth);

//GET/ products/  ---> get all product
router.post("/:productId/comments/:commentId/replies", createReplyComment);

// DELETE /products/:workoutId/comments/:commentId/replies/:replyId
router.delete(
  "/:productId/comments/:commentId/replies/:replyId",
  deleteReplyComment
);

// PUT /products/:workoutId/comments/:commentId
router.put(
  "/:productId/comments/:commentId/replies/:replyId",
  editReplyComment
);

module.exports = router;
