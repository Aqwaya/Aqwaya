const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { createLead, getLeads } = require('../controllers/leadController');

router.post('/', protect, createLead);
router.get('/', protect, getLeads);

module.exports = router;
