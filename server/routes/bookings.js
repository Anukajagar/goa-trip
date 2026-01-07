const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Booking = require('../models/Booking');

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

// GET all bookings
router.get('/', checkConnection, async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET single booking by ID
router.get('/:id', checkConnection, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CREATE new booking
router.post('/', checkConnection, async (req, res) => {
  try {
    const booking = new Booking(req.body);
    const savedBooking = await booking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    console.error('Booking save error:', error);
    if (error.name === 'MongoServerError' && error.code === 11000) {
      res.status(400).json({ error: 'Duplicate entry detected' });
    } else if (error.name === 'ValidationError') {
      res.status(400).json({ error: error.message });
    } else if (error.name === 'MongoNetworkError' || error.message.includes('buffering')) {
      res.status(503).json({ 
        error: 'Database connection timeout. Please check your internet connection and MongoDB settings.',
        details: error.message 
      });
    } else {
      res.status(500).json({ 
        error: 'Failed to save booking. Please try again.',
        details: error.message 
      });
    }
  }
});

// UPDATE booking
router.put('/:id', checkConnection, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE booking
router.delete('/:id', checkConnection, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.json({ message: 'Booking deleted successfully', booking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

