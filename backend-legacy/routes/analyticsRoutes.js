const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getAnalyticsOverview,
  getCampaignPerformance,
  getTrafficSources,
  getAudienceDemographics,
  getDailyTrends,
} = require('../controllers/analyticsController');

// ===============================
// 🔹 Analytics Routes (Protected)
// ===============================
router.get('/overview', protect, getAnalyticsOverview);
router.get('/campaign-performance', protect, getCampaignPerformance);
router.get('/traffic-sources', protect, getTrafficSources);
router.get('/demographics', protect, getAudienceDemographics);
router.get('/daily-trends', protect, getDailyTrends);

module.exports = router;
