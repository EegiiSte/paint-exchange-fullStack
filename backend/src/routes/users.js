const express = require("express");
const {
  signUpUser,
  signInUser,
  getSingleUser,
} = require("../controllers/user");
const { getAllUsers } = require("../controllers/user/getAllUsers");

const router = express.Router();

router.post("/sign-in", signInUser);
router.post("/sign-up", signUpUser);

//GET/ user/  ---> get all users
router.get("/", getAllUsers);

//GET/ user/:id  ---> get single user
router.get("/:id", getSingleUser);

module.exports = router;
