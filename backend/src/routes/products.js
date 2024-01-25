const express = require("express");

const {
  createProduct,
  deleteProduct,
  getSingleProduct,
  updateProduct,
} = require("../controllers/product");

const auth = require("../middleware/auth");

const { getAllProduct } = require("../controllers/product/getAllProduct");

const router = express.Router();
const Product = require("../models/product");

//get auth//

router.use(auth);

//GET/ products/  ---> get all product
router.get("/", getAllProduct);

//GET/ products/:id  ---> get single product
router.get("/:id", getSingleProduct);

//POST/ products  ---> create new product
router.post("/", createProduct);

//PUT/ products  ---> update single product
router.put("/:id", updateProduct);

//DELETE/ products  ---> delete single product
router.delete("/:id", deleteProduct);

module.exports = router;
