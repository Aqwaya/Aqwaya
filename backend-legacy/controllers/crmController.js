// controllers/crmController.js

// ===============================
// 🔹 Get All Leads
// ===============================
exports.getAllLeads = async (req, res) => {
  try {
    const leads = [
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        company: "TechNova Ltd",
        phone: "+2348012345678",
        status: "New",
        source: "Website Form",
        createdAt: "2025-10-01T09:12:00Z",
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@agency.com",
        company: "Creative Agency NG",
        phone: "+2348098765432",
        status: "Contacted",
        source: "LinkedIn",
        createdAt: "2025-10-02T11:30:00Z",
      },
      {
        id: 3,
        name: "David Johnson",
        email: "david@enterprise.com",
        company: "Enterprise NG",
        phone: "+2348022345678",
        status: "Qualified",
        source: "Referral",
        createdAt: "2025-10-03T15:10:00Z",
      },
      {
        id: 4,
        name: "Emily Brown",
        email: "emily@startup.io",
        company: "Startup.io",
        phone: "+2348076543210",
        status: "Closed Won",
        source: "Email Campaign",
        createdAt: "2025-10-04T10:05:00Z",
      },
    ];

    res.json({ success: true, data: leads });
  } catch (err) {
    console.error("Error fetching leads:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ===============================
// 🔹 Get Lead by ID
// ===============================
exports.getLeadById = async (req, res) => {
  try {
    const { id } = req.params;

    const lead = {
      id,
      name: "Sample Lead",
      email: "samplelead@example.com",
      company: "Demo Corp",
      phone: "+2348088888888",
      status: "Qualified",
      notes: "Interested in demo next week.",
      source: "Google Ads",
      createdAt: "2025-10-05T08:00:00Z",
      updatedAt: "2025-10-06T12:30:00Z",
    };

    res.json({ success: true, data: lead });
  } catch (err) {
    console.error("Error fetching lead:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ===============================
// 🔹 Add New Lead
// ===============================
exports.addLead = async (req, res) => {
  try {
    const { name, email, company, phone, source } = req.body;

    const newLead = {
      id: Math.floor(Math.random() * 10000),
      name,
      email,
      company,
      phone,
      source: source || "Website",
      status: "New",
      createdAt: new Date().toISOString(),
    };

    res.status(201).json({
      success: true,
      message: "Lead added successfully",
      data: newLead,
    });
  } catch (err) {
    console.error("Error adding lead:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ===============================
// 🔹 Update Lead Status
// ===============================
exports.updateLeadStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    res.json({
      success: true,
      message: `Lead #${id} status updated to ${status}`,
      data: { id, status },
    });
  } catch (err) {
    console.error("Error updating lead:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ===============================
// 🔹 Delete Lead
// ===============================
exports.deleteLead = async (req, res) => {
  try {
    const { id } = req.params;
    res.json({
      success: true,
      message: `Lead #${id} deleted successfully`,
    });
  } catch (err) {
    console.error("Error deleting lead:", err);
    res.status(500).json({ message: "Server error" });
  }
};
