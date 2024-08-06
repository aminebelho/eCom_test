// backend/routes/orderRoutes.js
const express = require('express');
const Order = require('../models/Order');
const router = express.Router();
const nodemailer = require('nodemailer');

// Set up email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password'
  }
});

// Create a new order
router.post('/', async (req, res) => {
  const order = new Order(req.body);
  await order.save();

  // Send confirmation email
  await transporter.sendMail({
    from: 'your-email@gmail.com',
    to: order.customer.email,
    subject: 'Order Confirmation',
    text: `Your order has been placed successfully. Order details: ${JSON.stringify(order)}`,
  });

  res.json(order);
});

// Get all orders (Admin)
router.get('/', async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

module.exports = router;
