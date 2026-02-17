const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    campaign: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Campaign',
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'converted'],
      default: 'new',
    },
    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Lead', leadSchema);
