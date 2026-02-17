const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Helper function to generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

// Register User
exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    // Create user
    const user = await User.create({ username, email, password });

    const token = generateToken(user._id);

    // Exclude password in response
    const userResponse = {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };

    res.status(201).json({ user: userResponse, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Send firstLogin in response
    const userResponse = {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      firstLogin: user.firstLogin, // critical for flow
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };

    res.json({ user: userResponse, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Onboarding route (protected)
exports.onboarding = async (req, res) => {
  try {
    // req.user is set in the protect middleware
    if (!req.user) return res.status(401).json({ message: 'Not authorized' });

    res.json({
      message: `Welcome ${req.user.username}! Complete your onboarding.`,
      user: req.user
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
