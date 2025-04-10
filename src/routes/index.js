const express = require('express');
const router = express.Router();

// Import route files
const vehicleRoutes = require('./vehicle');
const serviceRoutes = require('./service');
const partRoutes = require('./part');

// Setup routes
router.use('/vehicles', vehicleRoutes);
router.use('/services', serviceRoutes);
router.use('/parts', partRoutes);

module.exports = router;