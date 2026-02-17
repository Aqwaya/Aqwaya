// routes/campaignRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

const {
  getAllCampaigns,
  getCampaignById,
  createCampaign,
  updateCampaign,
  deleteCampaign,
} = require('../controllers/campaignController');

// ===============================
// 🔹 Campaign Routes (Protected)
// ===============================
router.get('/', protect, getAllCampaigns);
router.get('/:id', protect, getCampaignById);
router.post('/', protect, createCampaign);
router.patch('/:id', protect, updateCampaign);
router.delete('/:id', protect, deleteCampaign);

module.exports = router;
