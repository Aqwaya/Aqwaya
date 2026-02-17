const Lead = require('../models/lead');

exports.createLead = async (req, res) => {
  try {
    const { name, email, phone, campaign, notes } = req.body;

    const lead = await Lead.create({
      user: req.user.id,
      name,
      email,
      phone,
      campaign,
      notes,
    });

    res.status(201).json({
      message: 'Lead created successfully',
      lead,
    });
  } catch (error) {
    console.error('Error creating lead:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getLeads = async (req, res) => {
  try {
    const leads = await Lead.find({ user: req.user.id }).populate('campaign');
    res.json(leads);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
