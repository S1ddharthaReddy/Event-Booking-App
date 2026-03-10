
const express = require("express");
const router = express.Router();
const {protect, admin} = require("../middleware/auth");
const { getAllEvents, getEventById, createEvent, updateEvent, deleteEvent} = require('../controller/eventController');

// Get all Events
router.get('/', getAllEvents);

// Get Event by ID
router.get('/:id', getEventById);

// Create Event (Admin ONLY)
router.post('/', protect, admin, createEvent);

// Update Event (Admin ONLY)
router.put('/:id', protect, admin, updateEvent);

// Delete Event (Admin ONLY)
router.delete('/:id', protect, admin, deleteEvent);

module.exports = router;

