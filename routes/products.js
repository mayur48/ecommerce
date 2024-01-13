const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// POST request to create a new product
router.post('/', productController.createProduct);

// GET request to retrieve all products
router.get('/', productController.getAllProducts);

// GET request to retrieve a single product by its ID
router.get('/:productId', productController.getProductById);

// PUT request to update a product by its ID
router.put('/:productId', productController.updateProduct);

// DELETE request to delete a product by its ID
router.delete('/:productId', productController.deleteProduct);

// Export the router
module.exports = router;