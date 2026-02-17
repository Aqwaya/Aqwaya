// controllers/campaignController.js
const Campaign = require('../models/campaign');

// ===============================
// 🔹 Get All Campaigns (From DB)
// ===============================
exports.getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find({ user: req.user.id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: campaigns.length,
      data: campaigns,
    });
  } catch (err) {
    console.error('Error fetching campaigns:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// ===============================
// 🔹 Get Single Campaign
// ===============================
exports.getCampaignById = async (req, res) => {
  try {
    const campaign = await Campaign.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!campaign) {
      return res.status(404).json({ success: false, message: 'Campaign not found' });
    }

    res.status(200).json({ success: true, data: campaign });
  } catch (err) {
    console.error('Error fetching campaign:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// ===============================
// 🔹 Create Campaign (with Mock AI)
// ===============================
exports.createCampaign = async (req, res) => {
  try {
    const { name, objective, targetAudience, platforms, budget } = req.body;

    if (!name || !objective || !targetAudience) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: name, objective, or targetAudience',
      });
    }

    // 💡 Mock AI-generated insights
    const aiMockResponse = {
      summary: `The "${name}" campaign is designed to achieve ${objective} among ${targetAudience}. Based on your ₦${budget || 100000} budget, AI suggests a multi-platform approach.`,
      strategy: {
        recommendedPlatforms: platforms?.length
          ? platforms
          : ['Instagram', 'LinkedIn', 'Twitter'],
        tone: 'Professional yet relatable',
        bestPostTime: 'Weekdays between 9AM - 12PM',
      },
      contentIdeas: [
        `Post a client success story showcasing measurable results from your IT solutions.`,
        `Create a carousel explaining “Why Digital Transformation Matters in 2025.”`,
        `Run a sponsored ad focusing on ${objective.toLowerCase()} benefits.`,
      ],
      adCopySamples: [
        `Empower your business with OmoolaEx IT Consulting — bridging ideas and innovation.`,
        `Transform your workflow with smarter technology solutions today.`,
      ],
      hashtags: [
        '#OmoolaExIT',
        '#DigitalGrowth',
        '#BusinessTransformation',
        '#TechForSMEs',
      ],
      estimatedCTR: `${(Math.random() * 2 + 3).toFixed(2)}%`,
      aiConfidence: `${(Math.random() * 10 + 85).toFixed(1)}%`,
    };

    // 🧠 Save to DB
    const newCampaign = await Campaign.create({
      user: req.user.id,
      name,
      objective,
      targetAudience,
      platforms: platforms || ['Instagram'],
      budget: budget || 100000,
      status: 'draft',
      aiInsights: aiMockResponse,
    });

    res.status(201).json({
      success: true,
      message: 'Campaign created successfully with AI insights',
      data: newCampaign,
    });
  } catch (err) {
    console.error('Error creating campaign:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// ===============================
// 🔹 Update Campaign
// ===============================
exports.updateCampaign = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    let campaign = await Campaign.findOne({ _id: id, user: req.user.id });
    if (!campaign) {
      return res.status(404).json({ success: false, message: 'Campaign not found' });
    }

    Object.assign(campaign, updates);
    await campaign.save();

    res.status(200).json({
      success: true,
      message: 'Campaign updated successfully',
      data: campaign,
    });
  } catch (err) {
    console.error('Error updating campaign:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// ===============================
// 🔹 Delete Campaign
// ===============================
exports.deleteCampaign = async (req, res) => {
  try {
    const { id } = req.params;

    const campaign = await Campaign.findOneAndDelete({
      _id: id,
      user: req.user.id,
    });

    if (!campaign) {
      return res.status(404).json({ success: false, message: 'Campaign not found' });
    }

    res.status(200).json({
      success: true,
      message: `Campaign "${campaign.name}" deleted successfully`,
    });
  } catch (err) {
    console.error('Error deleting campaign:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
