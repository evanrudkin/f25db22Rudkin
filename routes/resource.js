var express = require('express');
var router = express.Router();

var location_controller = require('../controllers/location');

// Authentication middleware
function requireLogin(req, res, next) {
    if (req.isAuthenticated && req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ error: "Unauthorized" });
}

// ---------- PROTECTED REST API ROUTES ----------

// List all locations (GET) — usually protected too
router.get('/locations', requireLogin, location_controller.location_list);

// Get a single location
router.get('/locations/:id', requireLogin, location_controller.location_detail);

// Create a location
router.post('/locations', requireLogin, location_controller.location_create_post);

// Update a location
router.put('/locations/:id', requireLogin, location_controller.location_update_put);

// Delete a location
router.delete('/locations/:id', requireLogin, location_controller.location_delete);

module.exports = router;
