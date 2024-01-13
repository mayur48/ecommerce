const mongoose = require('mongoose');
const VariantSchema = require('./variant').schema;

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  variants: [VariantSchema]
});

module.exports = mongoose.model('Product', productSchema)