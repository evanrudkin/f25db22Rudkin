var express = require('express');
const location_controller = require('../controllers/location');
var router = express.Router();

function requireLogin(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/auth/login');
}

// GET all locations (page)
router.get('/', requireLogin, location_controller.location_view_all_Page);

// GET detail page for one location
router.get('/detail', requireLogin, location_controller.location_view_one_Page);

// GET create location page
router.get('/create', requireLogin, location_controller.location_create_Page);

// GET update location page
router.get('/update', requireLogin, location_controller.location_update_Page);

// GET delete location page
router.get('/delete', requireLogin, location_controller.location_delete_Page);

module.exports = router;

