const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  package: {
    type: String,
    required: true,
    enum: ['platinum', 'gold', 'silver']
  },
  packageName: {
    type: String,
    required: true
  },
  persons: {
    type: Number,
    required: true,
    min: 1,
    max: 20
  },
  newYearVoucher: {
    type: Boolean,
    default: false
  },
  basePrice: {
    type: Number,
    required: true
  },
  discount: {
    type: Number,
    required: true
  },
  discountAmount: {
    type: Number,
    required: true
  },
  priceAfterDiscount: {
    type: Number,
    required: true
  },
  voucherDiscount: {
    type: Number,
    default: 0
  },
  totalPrice: {
    type: Number,
    required: true
  },
  bookingDate: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Booking', bookingSchema);

