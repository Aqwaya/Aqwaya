const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    objective: {
      type: String,
      required: true,
    },
    targetAudience: {
      type: String,
    },
    platforms: {
      type: [String],
    },
    budget: {
      type: Number,
    },
    aiInsights: {
      summary: String,
      contentIdeas: [String],
      hashtags: [String],
    },
    status: {
      type: String,
      enum: ['draft', 'active', 'paused', 'completed'],
      default: 'draft',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Campaign', campaignSchema);
