const Product = require('../models/Product');

exports.getProduct = async (req, res) => {
    try {
      const productId = req.params.productId;
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }  
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  exports.createProduct = async (req, res) => {
    try {
      const newProduct = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        variants: req.body.variants // Assuming variants are provided in the request
      });
  
      const savedProduct = await newProduct.save();
      res.status(201).json(savedProduct);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  exports.updateProduct = async (req, res) => {
    try {
      const product = await Product.findById(req.params.productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      // Update fields
      product.name = req.body.name || product.name;
      product.description = req.body.description || product.description;
      product.price = req.body.price || product.price;
      if (req.body.variants) product.variants = req.body.variants;
  
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  exports.deleteProduct = async (req, res) => {
    try {
      const product = await Product.findById(req.params.productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      await product.remove();
      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  exports.getAllProducts = async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };