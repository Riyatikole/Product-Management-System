const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const productSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true 
  },
  user: {
    type: ObjectId,
    required: true,
  },
});

const Product = mongoose.model("product", productSchema);

module.exports = Product;
