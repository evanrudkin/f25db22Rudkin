var express = require("express");
var router = express.Router();

// Require controller modules.
var api_controller = require("../controllers/api");
var location_controller = require("../controllers/location");

// API route
router.get("/", api_controller.api);

// LOCATION ROUTES
router.post("/locations", location_controller.location_create_post);
router.delete("/locations/:id", location_controller.location_delete);
router.put("/locations/:id", location_controller.location_update_put);
router.get("/locations/:id", location_controller.location_detail);
router.get("/locations", location_controller.location_list);
router.put('/locations/:id', location_controller.location_update_put);


module.exports = router;
