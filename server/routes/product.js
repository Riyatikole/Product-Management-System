const express = require("express");
const router = express.Router();
const { addProduct, getProducts, getProductById, updateProduct, deleteProduct} = require("../controllers/productController")
const {decodeToken} = require("../controllers/authController")


router.post("/", decodeToken, addProduct);             // Add a new product
router.get("/", decodeToken, getProducts);             // Get all products
router.get("/:id", decodeToken, getProductById);       // Get a single product by ID
router.put("/:id", decodeToken, updateProduct);        // Update a product by ID
router.delete("/:id", decodeToken, deleteProduct);     // Delete a product by ID

module.exports = router;
