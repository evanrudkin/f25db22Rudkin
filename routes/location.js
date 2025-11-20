var express = require('express');
const location_controller = require('../controllers/location');
var router = express.Router();

// GET all locations (page)
router.get('/', location_controller.location_view_all_Page);

// GET detail page for one location
router.get('/detail', location_controller.location_view_one_Page);

// GET create location page
router.get('/create', location_controller.location_create_Page);

// GET update location page
router.get('/update', location_controller.location_update_Page);

/* GET delete location page */
router.get('/delete', location_controller.location_delete_Page);


module.exports = router;

