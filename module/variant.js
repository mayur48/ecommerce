const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
  name: String,
  sku: String,
  additionalCost: Number,
  stockCount: Number
});

module.exports = mongoose.model('Variant', variantSchema);