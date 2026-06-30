const express = require('express');
const QRCode = require('qrcode');
const Product = require('../models/Product');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth(['admin', 'manufacturer']), async (req, res) => {
  try {
    const verifyUrl = `${process.env.FRONTEND_URL || 'http://127.0.0.1:5500/frontend'}/pages/verify.html?id=${encodeURIComponent(req.body.productId)}`;
    const qrCode = await QRCode.toDataURL(verifyUrl);
    const product = await Product.create({ ...req.body, qrCode, createdBy: req.user.id });
    res.status(201).json({ message: 'Product metadata saved', product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/', auth(['admin', 'manufacturer']), async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
});

router.get('/:productId', async (req, res) => {
  const product = await Product.findOne({ productId: req.params.productId });
  if (!product) return res.status(404).json({ message: 'Product metadata not found' });
  res.json(product);
});

module.exports = router;
