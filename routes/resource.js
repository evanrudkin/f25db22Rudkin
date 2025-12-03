var express = require("express");
var router = express.Router();

// Require controller modules.
var api_controller = require("../controllers/api");
var location_controller = require("../controllers/location");

// API route
router.get("/", api_controller.api);

const requireLogin = require('../helpers/requireLogin');

// LOCATION ROUTES
router.post("/locations", location_controller.location_create_post);
router.delete("/locations/:id", location_controller.location_delete);
router.put("/locations/:id", location_controller.location_update_put);
router.get("/locations/:id", location_controller.location_detail);
router.get("/locations", location_controller.location_list);
router.post('/locations', requireLogin, location_controller.location_create_post);
router.put('/locations/:id', requireLogin, location_controller.location_update_put);
router.delete('/locations/:id', requireLogin, location_controller.location_delete);


module.exports = router;
