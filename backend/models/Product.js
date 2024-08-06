const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  size: { type: [String], required: true },
  quantityBySize: { 
    type: Map, 
    of: Number, 
    required: true 
  },
  price: { type: Number, required: true },
  hasDiscount: { type: Boolean, default: false },
  discountPercentage: { type: Number, min: 0, max: 100, default: 0 },
});

module.exports = mongoose.model('Product', productSchema);
