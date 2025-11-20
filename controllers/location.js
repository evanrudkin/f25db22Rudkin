const location = require("../models/location");
const Location = require("../models/location");

// List of all Locations
exports.location_list = async function (req, res) {
  try {
    const locations = await Location.find();
    res.send(locations);
  } catch (err) {
    res.status(500);
    res.send(`{"error": "${err}"}`);
  }
};

// Detail for a specific Location
exports.location_detail = async function(req, res) {
    console.log("detail " + req.params.id);
    try {
        let result = await Location.findById(req.params.id);
        res.send(result);
    } catch (error) {
        res.status(500);
        res.send(`{"error": "document for id ${req.params.id} not found"}`);
    }
};


// Handle Costume create on POST.
exports.location_create_post = async function (req, res) {
  console.log(req.body);  // helps verify what’s received

  let document = new Location();
  // Expects JSON like:
  // {"Country":"Brazil","primaryLanguage":"portuguese","Population": 212000000}
  document.Country = req.body.Country;
  document.primaryLanguage = req.body.primaryLanguage;
  document.population = req.body.population;

  try {
    let result = await document.save();
    res.send(result);
  } catch (err) {
    res.status(500);
    res.send(`{"error": ${err}}`);
  }
};


// Handle Location delete on DELETE.
exports.location_delete = async function (req, res) {
  console.log("delete " + req.params.id);
  try {
    const result = await Location.findByIdAndDelete(req.params.id);
    console.log("Removed " + result);
    res.send(result);
  } catch (err) {
    res.status(500);
    res.send(`{"error": "Error deleting ${err}"}`);
  }
};

// VIEWS 
// Handle a show all view 
exports.location_view_all_Page = async function(req, res) { 
    try { 
        const theLocation = await Location.find(); 
        res.render('location', { 
            title: 'Location Search Results', 
            results: theLocation 
        }); 
    } 
    catch (err) { 
        res.status(500); 
        res.send(`{"error": ${err}}`); 
    } 
};

exports.location_update_put = async function(req, res) {
    console.log(`update on id ${req.params.id} with body ${JSON.stringify(req.body)}`);

    try {
        let toUpdate = await Location.findById(req.params.id);

        // Update fields ONLY if provided
        if (req.body.Country) toUpdate.Country = req.body.Country;
        if (req.body.primaryLanguage) toUpdate.primaryLanguage = req.body.primaryLanguage;
        if (req.body.population) toUpdate.population = req.body.population;

        let result = await toUpdate.save();
        console.log("Success " + result);
        res.send(result);
    } catch (err) {
        res.status(500);
        res.send(`{"error": "${err}": Update for id ${req.params.id} failed"}`);
    }
};

// Handle a show one view with id specified by query
exports.location_view_one_Page = async function(req, res) {
    console.log("Single view for id " + req.query.id);
    try {
        let result = await Location.findById(req.query.id);
        res.render('locationdetail', { title: 'Location Detail', toShow: result });
    } catch (err) {
        res.status(500);
        res.send(`{'error': '${err}'}`);
    }
};

// Render the create page for Location
exports.location_create_Page = function(req, res) {
    console.log("Create view");
    try {
        res.render('locationcreate', { title: 'Create Location' });
    } catch (err) {
        res.status(500);
        res.send(`{'error': '${err}'}`);
    }
};

// Handle building the view for updating a location.
// query provides the id
exports.location_update_Page = async function(req, res) {
    console.log("update view for item " + req.query.id);
    try {
        let result = await Location.findById(req.query.id);
        res.render('locationupdate', { 
            title: 'Update Location', 
            toShow: result 
        });
    } catch (err) {
        res.status(500);
        res.send(`{'error': '${err}'}`);
    }
};
