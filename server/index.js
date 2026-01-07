const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Prometheus Metrics Setup
const client = require('prom-client');
const register = new client.Registry();

// Add a default label which is added to all metrics
register.setDefaultLabels({
  app: 'goa-holiday-packages'
});

// Enable the collection of default metrics
client.collectDefaultMetrics({ register });

// Metrics endpoint
app.get('/metrics', async (req, res) => {
  res.setHeader('Content-Type', register.contentType);
  res.send(await register.metrics());
});

// Middleware
app.use(cors());
app.use(express.json());

// Disable mongoose buffering (set globally before connecting)
mongoose.set('bufferCommands', false);

// MongoDB Connection with improved timeout settings
const connectDB = async (retries = 3) => {
  const options = {
    serverSelectionTimeoutMS: 30000, // 30 seconds
    socketTimeoutMS: 45000, // 45 seconds
    connectTimeoutMS: 30000, // 30 seconds
    maxPoolSize: 10,
    retryWrites: true,
    w: 'majority'
  };

  for (let i = 0; i < retries; i++) {
    try {
      console.log(`Attempting to connect to MongoDB... (Attempt ${i + 1}/${retries})`);
      await mongoose.connect(process.env.MONGODB_URI, options);
      console.log('✅ Connected to MongoDB successfully!');
      return;
    } catch (error) {
      console.error(`❌ Connection attempt ${i + 1} failed:`, error.message);
      if (i < retries - 1) {
        console.log(`Retrying in 3 seconds...`);
        await new Promise(resolve => setTimeout(resolve, 3000));
      } else {
        console.error('\n❌ MongoDB connection failed after all retries');
        console.error('\nPlease check:');
        console.error('1. Your internet connection');
        console.error('2. MongoDB Atlas IP whitelist (should allow 0.0.0.0/0 for testing)');
        console.error('3. Connection string in .env file is correct');
        console.error('4. MongoDB Atlas cluster is running');
        console.error('\nConnection string format:');
        console.error('MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database');
        process.exit(1);
      }
    }
  }
};

// Handle connection events
mongoose.connection.on('disconnected', () => {
  console.log('⚠️ MongoDB disconnected. Attempting to reconnect...');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err);
});

// Connect to database
connectDB();

// Routes
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/enquiries', require('./routes/enquiries'));

// Health check
app.get('/api/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState;
  const statusMessages = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };

  res.json({
    status: dbStatus === 1 ? 'OK' : 'WARNING',
    message: 'Server is running',
    database: statusMessages[dbStatus] || 'unknown',
    readyState: dbStatus
  });
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, '../dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

