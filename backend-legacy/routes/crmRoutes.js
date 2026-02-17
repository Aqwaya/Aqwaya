const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getAllLeads,
  getLeadById,
  addLead,
  updateLeadStatus,
  deleteLead,
} = require('../controllers/crmController');

// ===============================
// 🔹 CRM Lead Routes (Protected)
// ===============================
router.get('/', protect, getAllLeads);
router.get('/:id', protect, getLeadById);
router.post('/', protect, addLead);
router.patch('/:id/status', protect, updateLeadStatus);
router.delete('/:id', protect, deleteLead);

module.exports = router;
