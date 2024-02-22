const express = require("express");
const auth = require("../middleware/auth");

const {
  createReplyComment,
} = require("../controllers/replyComment/createReplyComment");
const {
  deleteReplyComment,
} = require("../controllers/replyComment/deleteReplyComment");

const router = express.Router();

//get auth//

// router.use(auth);

//GET/ products/  ---> get all product
router.post("/:productId/comments/:commentId", createReplyComment);

// DELETE /products/:workoutId/comments/:commentId/:replyCommentId
router.delete(
  "/:productId/comments/:commentId/:replyCommentId",
  deleteReplyComment
);

// // PUT /products/:workoutId/comments/:commentId
// router.put("/:productId/comments/:commentId", updateProductComment);

module.exports = router;
