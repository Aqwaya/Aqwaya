// controllers/analyticsController.js

// ===============================
// 🔹 Overview Metrics
// ===============================
exports.getAnalyticsOverview = async (req, res) => {
  try {
    const overview = {
      totalCampaigns: 12,
      activeCampaigns: 7,
      pausedCampaigns: 3,
      totalSpend: 450000,
      totalImpressions: 125000,
      totalClicks: 8450,
      averageCTR: "6.76%",
      conversions: 910,
      updatedAt: new Date().toISOString(),
    };

    res.json({
      success: true,
      data: overview,
    });
  } catch (err) {
    console.error("Error fetching analytics overview:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ===============================
// 🔹 Campaign Performance Breakdown
// ===============================
exports.getCampaignPerformance = async (req, res) => {
  try {
    const dummyData = [
      {
        campaignId: 1,
        name: "October Awareness Campaign",
        impressions: 40000,
        clicks: 2400,
        ctr: "6.0%",
        conversions: 200,
        spend: 120000,
      },
      {
        campaignId: 2,
        name: "Product Launch Q4",
        impressions: 30000,
        clicks: 2100,
        ctr: "7.0%",
        conversions: 180,
        spend: 95000,
      },
      {
        campaignId: 3,
        name: "Tech Conference Promo",
        impressions: 55000,
        clicks: 3950,
        ctr: "7.18%",
        conversions: 260,
        spend: 145000,
      },
    ];

    res.json({
      success: true,
      data: dummyData,
    });
  } catch (err) {
    console.error("Error fetching campaign performance:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ===============================
// 🔹 Traffic Sources
// ===============================
exports.getTrafficSources = async (req, res) => {
  try {
    const sources = [
      { channel: "Organic Search", visits: 5200, conversions: 240 },
      { channel: "Paid Ads", visits: 3600, conversions: 320 },
      { channel: "Social Media", visits: 4200, conversions: 180 },
      { channel: "Email Marketing", visits: 1300, conversions: 80 },
      { channel: "Referral", visits: 800, conversions: 45 },
    ];

    res.json({
      success: true,
      data: sources,
    });
  } catch (err) {
    console.error("Error fetching traffic sources:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ===============================
// 🔹 Audience Demographics
// ===============================
exports.getAudienceDemographics = async (req, res) => {
  try {
    const demographics = {
      ageGroups: [
        { range: "18-24", percentage: 25 },
        { range: "25-34", percentage: 40 },
        { range: "35-44", percentage: 22 },
        { range: "45-54", percentage: 8 },
        { range: "55+", percentage: 5 },
      ],
      gender: [
        { gender: "Male", percentage: 58 },
        { gender: "Female", percentage: 42 },
      ],
      locations: [
        { country: "Nigeria", percentage: 70 },
        { country: "Ghana", percentage: 10 },
        { country: "Kenya", percentage: 8 },
        { country: "South Africa", percentage: 7 },
        { country: "Other", percentage: 5 },
      ],
    };

    res.json({
      success: true,
      data: demographics,
    });
  } catch (err) {
    console.error("Error fetching demographics:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ===============================
// 🔹 Time-Based Analytics
// ===============================
exports.getDailyTrends = async (req, res) => {
  try {
    const trends = Array.from({ length: 7 }, (_, i) => ({
      day: `Day ${i + 1}`,
      impressions: Math.floor(Math.random() * 15000) + 5000,
      clicks: Math.floor(Math.random() * 800) + 200,
      conversions: Math.floor(Math.random() * 100) + 20,
      spend: Math.floor(Math.random() * 30000) + 5000,
    }));

    res.json({
      success: true,
      data: trends,
    });
  } catch (err) {
    console.error("Error fetching daily trends:", err);
    res.status(500).json({ message: "Server error" });
  }
};
