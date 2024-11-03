const Product = require("../models/productModel");
const mongoose = require("mongoose");

exports.addProduct = async (req, res) => {
  try {
    const product = new Product({
      ...req.body,
      user: new mongoose.Types.ObjectId(req.user._id), 
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: "Failed to add product", details: error.message });
  }
};


exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({ user: new mongoose.Types.ObjectId(req.user._id) });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve products", details: error.message });
  }
};


exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      user: new mongoose.Types.ObjectId(req.user._id),
    });
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve product", details: error.message });
  }
};


exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, user: new mongoose.Types.ObjectId(req.user._id) },
      req.body,
      { new: true }
    );
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: "Failed to update product", details: error.message });
  }
};


exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({
      _id: req.params.id,
      user: new mongoose.Types.ObjectId(req.user._id),
    });
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Failed to delete product", details: error.message });
  }
};
