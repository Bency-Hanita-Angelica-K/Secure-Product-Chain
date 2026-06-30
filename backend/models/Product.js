const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productId: { type: String, required: true, unique: true, trim: true },
  productName: { type: String, required: true, trim: true },
  manufacturer: { type: String, required: true, trim: true },
  category: { type: String, trim: true },
  batchNo: { type: String, trim: true },
  manufacturingDate: { type: Date },
  description: { type: String, trim: true },
  blockchainTxHash: { type: String, trim: true },
  qrCode: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
