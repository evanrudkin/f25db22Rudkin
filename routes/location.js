var express = require('express');
const location_controller = require('../controllers/location');
var router = express.Router();

/* GET location page. */
router.get('/', function(req, res, next) {
  res.render('location', { title: 'Search Results – Location' });
});

router.get('/', location_controller.location_view_all_Page);


module.exports = router;

