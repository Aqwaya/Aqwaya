const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userroutes');
const { logger } = require('./middleware/logger');
const leadRoutes = require('./routes/leadRoutes');
const campaignRoutes = require('./routes/campaignRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');


dotenv.config();

const app = express();

// 🔹 Middleware
app.use(cors());
app.use(express.json()); // <-- This parses JSON body
app.use(logger);
app.use(express.urlencoded({ extended: true })); // Optional for form-data

// 🔹 Routes
app.use('/api/users', userRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/analytics', analyticsRoutes);

app.get('/', (req, res) => res.send('Aqwaya Backend is Running!'));

// Connect DB and start server
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
