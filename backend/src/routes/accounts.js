const express = require("express");
const { changeProfile } = require("../controllers/accounts/changeProfile");
const auth = require("../middleware/auth");

const router = express.Router();

router.use(auth);

router.put("/changeProfile", changeProfile);

module.exports = router;
