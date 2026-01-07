const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Enquiry = require('../models/Enquiry');

// Middleware to check MongoDB connection
const checkConnection = (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ 
      error: 'Database not connected. Please wait and try again.',
      readyState: mongoose.connection.readyState
    });
  }
  next();
};

// GET all enquiries
router.get('/', checkConnection, async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.json(enquiries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CREATE new enquiry
router.post('/', checkConnection, async (req, res) => {
  try {
    const enquiry = new Enquiry(req.body);
    const savedEnquiry = await enquiry.save();
    res.status(201).json(savedEnquiry);
  } catch (error) {
    console.error('Enquiry save error:', error);
    if (error.name === 'ValidationError') {
      res.status(400).json({ error: error.message });
    } else if (error.name === 'MongoNetworkError' || error.message.includes('buffering')) {
      res.status(503).json({ 
        error: 'Database connection timeout. Please check your internet connection and MongoDB settings.',
        details: error.message 
      });
    } else {
      res.status(500).json({ 
        error: 'Failed to save enquiry. Please try again.',
        details: error.message 
      });
    }
  }
});

module.exports = router;

