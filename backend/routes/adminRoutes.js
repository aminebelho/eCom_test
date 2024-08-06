const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// Add a new product
router.post('/products', async (req, res) => {
  const { name, size, quantityBySize, price, hasDiscount, discountPercentage } = req.body;

  // Validate discount percentage
  if (hasDiscount && (discountPercentage < 0 || discountPercentage > 100)) {
    return res.status(400).json({ error: 'Discount percentage must be between 0 and 100.' });
  }

  // Create a new product
  const product = new Product({
    name,
    size,
    quantityBySize,
    price,
    hasDiscount,
    discountPercentage
  });

  try {
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an existing product
router.put('/products/:id', async (req, res) => {
  const { name, size, quantityBySize, price, hasDiscount, discountPercentage } = req.body;

  // Validate discount percentage
  if (hasDiscount && (discountPercentage < 0 || discountPercentage > 100)) {
    return res.status(400).json({ error: 'Discount percentage must be between 0 and 100.' });
  }

  try {
    const product = await Product.findByIdAndUpdate(req.params.id, {
      name,
      size,
      quantityBySize,
      price,
      hasDiscount,
      discountPercentage
    }, { new: true });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a product
router.delete('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single product by ID
router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
