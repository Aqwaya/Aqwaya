const express = require('express');
const { registerUser, loginUser, onboarding } = require('../controllers/usercontroller');
const { protect } = require('../middleware/auth'); // Import the middleware
const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes
router.get("/onboarding", protect);
router.get("/dashboard", protect);


// New route to update firstLogin status
router.patch('/finish-onboarding', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.firstLogin = false;
    await user.save();

    res.json({ message: 'Onboarding completed', firstLogin: user.firstLogin });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
